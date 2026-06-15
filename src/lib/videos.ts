/** Video paths — all assets live under /public/videos */



export const HERO_VIDEO = "/videos/hero/homepage.mp4";



/** RecunAI section — three AI capability demos */

export const RECUN_AI_VIDEOS = {

  aiClone: "/videos/extras/ai-clone-videos.mp4",

  generativeBrand: "/videos/extras/generative-brand-videos.mp4",

  aiWebsite: "/videos/extras/ai-website-software.mp4",

} as const;



export const recunAIVideoList = [

  RECUN_AI_VIDEOS.aiClone,

  RECUN_AI_VIDEOS.generativeBrand,

  RECUN_AI_VIDEOS.aiWebsite,

] as const;



export const showcaseVideos = [

  ...recunAIVideoList,

  "/videos/extras/img-2432.mp4",

] as const;



export const mainVideos = [

  "/videos/main/video-2.mp4",

  "/videos/main/video-1.mp4",

  ...showcaseVideos,

];



export const subVideos = [

  "/videos/sub/video-1.mp4",

  "/videos/sub/video-2.mp4",

  "/videos/sub/video-3.mp4",

  "/videos/sub/video-4.mp4",

  "/videos/sub/video-5.mp4",

  "/videos/sub/video-6.mp4",

  "/videos/sub/video-7.mp4",

  "/videos/sub/video-8.mp4",

  "/videos/sub/video-9.mp4",

  "/videos/sub/video-10.mp4",

  "/videos/sub/video-11.mp4",

  "/videos/sub/video-12.mp4",

  "/videos/sub/video-13.mp4",

  "/videos/sub/video-14.mp4",

  "/videos/sub/video-15.mp4",

  "/videos/sub/video-16.mp4",

  "/videos/sub/video-17.mp4",

  "/videos/sub/video-18.mp4",

  "/videos/sub/video-19.mp4",

  "/videos/sub/video-20.mp4",

  "/videos/sub/video-21.mp4",

  "/videos/sub/video-22.mp4",

  "/videos/sub/video-23.mp4",

];



const half = Math.ceil(subVideos.length / 2);

export const leftVideos = subVideos.slice(0, half);

export const rightVideos = [...subVideos.slice(half)].reverse();



/** Preload hero + first main reel for faster first paint */

export const PRELOAD_VIDEOS = [HERO_VIDEO, mainVideos[0]] as const;



export function isGif(src: string) {

  return src.toLowerCase().endsWith(".gif");

}


