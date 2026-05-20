type AudioListener = (playing: boolean) => void;

export class AudioEngine {
  private ctx: AudioContext | null = null;
  private source: AudioBufferSourceNode | null = null;
  private gainNode: GainNode | null = null;
  private buffer: AudioBuffer | null = null;
  private initialized = false;
  private pauseTimer: ReturnType<typeof setTimeout> | null = null;
  private listeners = new Set<AudioListener>();

  public isPlaying = false;

  subscribe(listener: AudioListener): () => void {
    this.listeners.add(listener);
    listener(this.isPlaying);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    this.listeners.forEach((l) => l(this.isPlaying));
  }

  async init() {
    if (this.initialized || typeof window === "undefined") return;
    this.initialized = true;

    try {
      this.ctx = new AudioContext();
      const res = await fetch("/audio/ambient-loop.mp3");
      if (!res.ok) {
        throw new Error(`Failed to load ambient audio (${res.status})`);
      }
      const arr = await res.arrayBuffer();
      this.buffer = await this.ctx.decodeAudioData(arr);

      this.gainNode = this.ctx.createGain();
      this.gainNode.gain.value = 0;
      this.gainNode.connect(this.ctx.destination);
    } catch (err) {
      console.warn("AudioEngine init failed:", err);
      this.initialized = false;
    }
  }

  private async ensureReady() {
    if (!this.initialized) await this.init();
    if (!this.ctx || !this.buffer || !this.gainNode) return false;
    if (this.ctx.state === "suspended") await this.ctx.resume();
    return true;
  }

  private stopSource() {
    if (this.pauseTimer) {
      clearTimeout(this.pauseTimer);
      this.pauseTimer = null;
    }
    try {
      this.source?.stop();
    } catch {
      /* already stopped */
    }
    this.source?.disconnect();
    this.source = null;
  }

  async play() {
    const ready = await this.ensureReady();
    if (!ready || !this.ctx || !this.buffer || !this.gainNode) return;

    this.stopSource();

    this.source = this.ctx.createBufferSource();
    this.source.buffer = this.buffer;
    this.source.loop = true;
    this.source.connect(this.gainNode);

    const now = this.ctx.currentTime;
    this.gainNode.gain.cancelScheduledValues(now);
    this.gainNode.gain.setValueAtTime(0, now);
    this.gainNode.gain.linearRampToValueAtTime(0.15, now + 2);

    this.source.start(0);
    this.isPlaying = true;
    this.notify();
  }

  pause() {
    if (!this.gainNode || !this.ctx) return;

    const now = this.ctx.currentTime;
    this.gainNode.gain.cancelScheduledValues(now);
    this.gainNode.gain.setValueAtTime(this.gainNode.gain.value, now);
    this.gainNode.gain.linearRampToValueAtTime(0, now + 0.8);

    const source = this.source;
    this.pauseTimer = setTimeout(() => {
      try {
        source?.stop();
      } catch {
        /* noop */
      }
      source?.disconnect();
      if (this.source === source) this.source = null;
    }, 800);

    this.isPlaying = false;
    this.notify();
  }

  async toggle() {
    if (this.isPlaying) {
      this.pause();
    } else {
      await this.play();
    }
  }
}

export const audioEngine = new AudioEngine();

/** @deprecated Use audioEngine */
export const audioManager = audioEngine;

export function bindFirstInteractionAudio() {
  if (typeof window === "undefined") return () => {};

  const handler = () => {
    void audioEngine.init();
  };

  window.addEventListener("click", handler, { once: true, passive: true });
  window.addEventListener("scroll", handler, { once: true, passive: true });

  return () => {
    window.removeEventListener("click", handler);
    window.removeEventListener("scroll", handler);
  };
}
