type HeroVideoListener = (audible: boolean) => void;

/** Controls the homepage hero background video (real audio from homepage.mp4). */
class HeroVideoEngine {
  private el: HTMLVideoElement | null = null;
  private listeners = new Set<HeroVideoListener>();
  private audible = false;

  subscribe(listener: HeroVideoListener): () => void {
    this.listeners.add(listener);
    listener(this.audible);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.listeners.forEach((l) => l(this.audible));
  }

  register(el: HTMLVideoElement): () => void {
    this.el = el;
    this.audible = !el.muted;
    this.notify();
    return () => {
      if (this.el === el) this.el = null;
    };
  }

  get isAudible() {
    return this.audible;
  }

  get element() {
    return this.el;
  }

  async toggle() {
    const el = this.el;
    if (!el) return;

    if (this.audible) {
      el.muted = true;
      this.audible = false;
      this.notify();
      return;
    }

    el.muted = false;
    el.volume = 0.9;
    try {
      if (el.paused) await el.play();
      this.audible = true;
    } catch {
      el.muted = true;
      this.audible = false;
    }
    this.notify();
  }

  mute() {
    const el = this.el;
    if (!el) return;
    el.muted = true;
    this.audible = false;
    this.notify();
  }
}

export const heroVideoEngine = new HeroVideoEngine();
