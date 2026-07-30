// Short-form lesson videos — one per lesson, 60-90 seconds, the "watch it
// instead of reading it" path. Three per unit, 96 in total.
//
// Fill in a `src` as each video is produced; anything still empty shows a
// "not filmed yet" card rather than a broken player, so shipping is not
// blocked on the whole set being finished. Files belong in
// public/videos/ (or paste any direct URL / embed page).
export interface LessonVideo {
  /** Direct video file (mp4/webm) served from public/, or an embed URL. */
  src: string;
  /** Roughly how long, in seconds — shown before they commit to watching. */
  seconds?: number;
  /** true when `src` is a page to iframe (YouTube/Vimeo) rather than a file. */
  embed?: boolean;
}

/** Keyed by `<lessonId>#lesson-<n>`, matching the question bank. */
export const lessonVideos: Record<string, LessonVideo> = {
  // 'course-1-deep-learning/unit1#lesson-1': { src: '/videos/c1u1l1.mp4', seconds: 75 },
};

export function videoFor(levelKey: string): LessonVideo | undefined {
  const v = lessonVideos[levelKey];
  return v && v.src ? v : undefined;
}
