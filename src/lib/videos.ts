/** Video paths for reel showcase — main = center stage, sub = scrolling columns */

export const HERO_VIDEO = "/videos/hero/homepage.MOV";

export const mainVideos = ["/videos/main/video-2.mp4", "/videos/main/video -1.gif"];

export const subVideos = [
  "/videos/sub/video-1.mp4",
  "/videos/sub/video-2.mp4",
  "/videos/sub/video-3.mp4",
  "/videos/sub/video-4.mp4",
  "/videos/sub/video-5.mp4",
  "/videos/sub/video-6.gif",
  "/videos/sub/video-7.gif",
  "/videos/sub/video-8.gif",
  "/videos/sub/video-9.gif",
  "/videos/sub/video-10.mp4",
  "/videos/sub/video-11.gif",
  "/videos/sub/video-12.gif",
  "/videos/sub/video-13.gif",
  "/videos/sub/video-14.mp4",
  "/videos/sub/video-15.mp4",
  "/videos/sub/video-16.mp4",
  "/videos/sub/video-17.mp4",
  "/videos/sub/video-18.mp4",
  "/videos/sub/video-19.mp4",
  "/videos/sub/video-20.mp4",
  "/videos/sub/video-21.mp4",
  "/videos/sub/video-22.gif",
  "/videos/sub/video-23.mp4",
];

const half = Math.ceil(subVideos.length / 2);
export const leftVideos = subVideos.slice(0, half);
export const rightVideos = [...subVideos.slice(half)].reverse();

export function isGif(src: string) {
  return src.toLowerCase().endsWith(".gif");
}
