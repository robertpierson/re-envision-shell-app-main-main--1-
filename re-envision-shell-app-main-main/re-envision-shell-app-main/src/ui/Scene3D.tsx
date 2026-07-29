import React, { useCallback, useEffect, useRef, useState } from 'react';

// A tiltable 3D stage. Drag it (mouse, finger, or arrow keys) and the whole
// world rotates; let go and it springs back. Children opt into depth with
// `translateZ`, so the island, the trail and the level markers separate out
// as it turns. Built on CSS 3D transforms — no WebGL, nothing to download.

interface Scene3DProps {
  children: React.ReactNode;
  /** Degrees of yaw/pitch at the edge of a drag. */
  maxTilt?: number;
  className?: string;
}

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

const Scene3D: React.FC<Scene3DProps> = ({ children, maxTilt = 18, className = '' }) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const start = useRef<{ px: number; py: number; tx: number; ty: number } | null>(null);
  const reduceMotion = useRef(false);

  useEffect(() => {
    reduceMotion.current =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    // Level markers keep their own clicks — dragging starts from the scenery only.
    if ((e.target as HTMLElement).closest('button, a')) return;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    start.current = { px: e.clientX, py: e.clientY, tx: tilt.x, ty: tilt.y };
    setDragging(true);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!start.current) return;
    const dx = e.clientX - start.current.px;
    const dy = e.clientY - start.current.py;
    setTilt({
      x: clamp(start.current.tx - dy / 12, -maxTilt, maxTilt),
      y: clamp(start.current.ty + dx / 12, -maxTilt, maxTilt),
    });
  };

  const release = useCallback(() => {
    start.current = null;
    setDragging(false);
    setTilt({ x: 0, y: 0 }); // spring home
  }, []);

  const onKeyDown = (e: React.KeyboardEvent) => {
    const step = 6;
    if (e.key === 'ArrowLeft') setTilt((t) => ({ ...t, y: clamp(t.y - step, -maxTilt, maxTilt) }));
    else if (e.key === 'ArrowRight') setTilt((t) => ({ ...t, y: clamp(t.y + step, -maxTilt, maxTilt) }));
    else if (e.key === 'ArrowUp') setTilt((t) => ({ ...t, x: clamp(t.x + step, -maxTilt, maxTilt) }));
    else if (e.key === 'ArrowDown') setTilt((t) => ({ ...t, x: clamp(t.x - step, -maxTilt, maxTilt) }));
    else return;
    e.preventDefault();
  };

  return (
    <div
      className={`[perspective:1200px] [perspective-origin:50%_45%] touch-none select-none ${className}`}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={release}
      onPointerCancel={release}
      onKeyDown={onKeyDown}
      onBlur={release}
      role="group"
      tabIndex={0}
      aria-label="3D world map — drag or use the arrow keys to look around"
    >
      <div
        className="relative [transform-style:preserve-3d]"
        style={{
          transform: `rotateX(${12 + tilt.x}deg) rotateZ(0deg) rotateY(${tilt.y}deg)`,
          transition: dragging || reduceMotion.current ? 'none' : 'transform 700ms cubic-bezier(.22,1.4,.36,1)',
          cursor: dragging ? 'grabbing' : 'grab',
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Scene3D;
