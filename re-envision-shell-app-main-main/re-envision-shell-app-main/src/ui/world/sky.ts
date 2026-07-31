import * as THREE from 'three';

// Physically-motivated sky: Rayleigh scattering for the blue gradient, Mie for
// the haze and the glow around the sun, both integrated along the view ray.
// This is the same family of model three's own Sky example uses, written out
// here so the whole scene stays dependency-light — and because the result is
// then captured through PMREM as the environment map, every material in the
// world is lit by the actual sky rather than a guessed ambient colour.

export interface SkyOptions {
  /** Sun elevation in radians above the horizon. */
  elevation: number;
  /** Sun compass angle in radians. */
  azimuth: number;
  /** Air thickness. Higher = hazier, warmer horizon. */
  turbidity: number;
  /** Rayleigh coefficient. Higher = deeper blue. */
  rayleigh: number;
  /** Mie scattering, the aerosol haze. */
  mie: number;
  /** Mie directional bias — how tight the glow hugs the sun. */
  mieDirectionalG: number;
  /** Tints the whole result, so a biome can read cold or volcanic. */
  tint: THREE.Color;
}

export function sunDirection(elevation: number, azimuth: number): THREE.Vector3 {
  const phi = Math.PI / 2 - elevation;
  const theta = azimuth;
  return new THREE.Vector3(
    Math.sin(phi) * Math.cos(theta),
    Math.cos(phi),
    Math.sin(phi) * Math.sin(theta),
  ).normalize();
}

export function createSky(opts: SkyOptions): { mesh: THREE.Mesh; uniforms: Record<string, THREE.IUniform> } {
  const sun = sunDirection(opts.elevation, opts.azimuth);
  const uniforms: Record<string, THREE.IUniform> = {
    uSun: { value: sun },
    uTurbidity: { value: opts.turbidity },
    uRayleigh: { value: opts.rayleigh },
    uMie: { value: opts.mie },
    uMieG: { value: opts.mieDirectionalG },
    uTint: { value: opts.tint.clone() },
  };

  const mesh = new THREE.Mesh(
    new THREE.SphereGeometry(400, 48, 32),
    new THREE.ShaderMaterial({
      side: THREE.BackSide,
      depthWrite: false,
      uniforms,
      vertexShader: /* glsl */ `
        varying vec3 vWorldPos;
        void main() {
          vec4 wp = modelMatrix * vec4(position, 1.0);
          vWorldPos = wp.xyz;
          gl_Position = projectionMatrix * viewMatrix * wp;
        }`,
      fragmentShader: /* glsl */ `
        varying vec3 vWorldPos;
        uniform vec3 uSun;
        uniform float uTurbidity, uRayleigh, uMie, uMieG;
        uniform vec3 uTint;

        const float PI = 3.141592653589793;
        // wavelength-dependent scattering: why the sky is blue and sunsets red
        const vec3 lambda = vec3(680e-9, 550e-9, 450e-9);
        const vec3 K = vec3(0.686, 0.678, 0.666);
        const float n = 1.0003;   // refractive index of air
        const float N = 2.545e25; // molecules per cubic metre
        const float depolarization = 0.035;

        vec3 totalRayleigh() {
          return (8.0 * pow(PI, 3.0) * pow(n * n - 1.0, 2.0) * (6.0 + 3.0 * depolarization))
               / (3.0 * N * pow(lambda, vec3(4.0)) * (6.0 - 7.0 * depolarization));
        }

        vec3 totalMie(float T) {
          float c = 0.2 * T * 10e-18;
          return 0.434 * c * PI * pow((2.0 * PI) / lambda, vec3(2.0)) * K;
        }

        float rayleighPhase(float cosT) {
          return (3.0 / (16.0 * PI)) * (1.0 + pow(cosT, 2.0));
        }

        float miePhase(float cosT, float g) {
          float g2 = g * g;
          return (1.0 / (4.0 * PI)) * ((1.0 - g2) / pow(1.0 - 2.0 * g * cosT + g2, 1.5));
        }

        void main() {
          vec3 dir = normalize(vWorldPos);
          float up = max(dir.y, -0.08);
          float sunUp = max(uSun.y, 0.0);

          // optical depth along the view ray, thicker toward the horizon
          float zenith = acos(clamp(up, 0.0, 1.0));
          float denom = cos(zenith) + 0.15 * pow(93.885 - degrees(zenith), -1.253);
          float sR = 8.4e3 / denom;
          float sM = 1.25e3 / denom;

          vec3 betaR = totalRayleigh() * uRayleigh;
          vec3 betaM = totalMie(uTurbidity) * uMie;
          vec3 extinction = exp(-(betaR * sR + betaM * sM));

          float cosT = dot(dir, uSun);
          vec3 inscatter = (betaR * rayleighPhase(cosT) + betaM * miePhase(cosT, uMieG))
                         / (betaR + betaM);
          vec3 col = inscatter * (1.0 - extinction) * (0.6 + 1.6 * sunUp);

          // sun disc with a soft limb, plus its bloom
          float d = 1.0 - smoothstep(0.9993, 0.99975, cosT);
          col += vec3(2.6, 2.3, 1.9) * (1.0 - d) * 6.0;
          col += vec3(1.0, 0.78, 0.52) * pow(max(cosT, 0.0), 20.0) * 0.22;

          // ground haze below the horizon so the dome never shows a hard edge
          col = mix(col * 0.55 + vec3(0.16, 0.15, 0.14), col, smoothstep(-0.06, 0.06, dir.y));

          col *= uTint;
          gl_FragColor = vec4(col, 1.0);
        }`,
    }),
  );
  mesh.frustumCulled = false;
  return { mesh, uniforms };
}

/**
 * Render the sky into an environment map. Every PBR surface then reflects the
 * real sky — the single biggest step from "3D shapes" toward "a place".
 */
export function skyEnvironment(renderer: THREE.WebGLRenderer, skyMesh: THREE.Mesh): THREE.Texture {
  const pmrem = new THREE.PMREMGenerator(renderer);
  pmrem.compileEquirectangularShader();
  const scene = new THREE.Scene();
  const clone = skyMesh.clone();
  scene.add(clone);
  const rt = pmrem.fromScene(scene, 0.02);
  pmrem.dispose();
  clone.geometry.dispose();
  return rt.texture;
}
