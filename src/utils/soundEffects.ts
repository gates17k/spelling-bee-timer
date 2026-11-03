class StageSoundEngine {
  private ctx: AudioContext | null = null;
  public isMuted: boolean = false;

  private getContext(): AudioContext | null {
    if (this.isMuted || typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public initAudioContext(): void {
    this.getContext();
  }

  public playStartBell() {
    const ctx = this.getContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, now);
    osc.frequency.exponentialRampToValueAtTime(1320, now + 0.12);
    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.45);
  }

  public playTick(isCritical: boolean = false) {
    const ctx = this.getContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = isCritical ? 'triangle' : 'sine';
    osc.frequency.setValueAtTime(isCritical ? 1046.5 : 700, now);
    gain.gain.setValueAtTime(isCritical ? 0.18 : 0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.09);
  }

  public playTimeUpBuzzer() {
    const ctx = this.getContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    [165, 220, 330].forEach((freq) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, now);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.15);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 1.15);
    });
  }

  public playCorrectChime() {
    const ctx = this.getContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      const startTime = now + idx * 0.08;
      osc.frequency.setValueAtTime(freq, startTime);
      gain.gain.setValueAtTime(0.25, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.45);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(startTime);
      osc.stop(startTime + 0.45);
    });
  }

  public playIncorrectBuzzer() {
    const ctx = this.getContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const notes = [240, 180];
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      const startTime = now + idx * 0.18;
      osc.frequency.setValueAtTime(freq, startTime);
      gain.gain.setValueAtTime(0.22, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.35);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(startTime);
      osc.stop(startTime + 0.35);
    });
  }
}

export const soundEngine = new StageSoundEngine();

// Pre-cache voices to eliminate initial delay when user triggers pronunciation
if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  try {
    window.speechSynthesis.getVoices();
    window.speechSynthesis.onvoiceschanged = () => {
      window.speechSynthesis.getVoices();
    };
  } catch {
    // Ignore environments where speechSynthesis is partially mocked or restricted
  }
}

function selectBritishVoice(): SpeechSynthesisVoice | undefined {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return undefined;
  const voices = window.speechSynthesis.getVoices();
  return (
    voices.find((v) => v.lang === 'en-GB' && v.name.toLowerCase().includes('female')) ||
    voices.find((v) => v.lang === 'en-GB') ||
    voices.find((v) => v.lang.startsWith('en-'))
  );
}

/**
 * Software Pronouncer using British English (en-GB) SpeechSynthesis.
 * Accepts optional onEnd and onStart callbacks to synchronize the countdown timer so that
 * the clock starts only AFTER the word is pronounced fully with zero audio lag.
 * Returns a cancel function.
 */
export function pronounceBritishEnglish(
  text: string,
  rate: number = 0.82,
  onEnd?: () => void,
  onStart?: () => void
): () => void {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    onEnd?.();
    return () => {};
  }

  // Pre-wake speech engine and clear prior utterances without delay
  try {
    window.speechSynthesis.cancel();
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
    }
  } catch {
    // Ignore
  }

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'en-GB';
  utterance.rate = rate;
  utterance.pitch = 1.0;

  const gbVoice = selectBritishVoice();
  if (gbVoice) {
    utterance.voice = gbVoice;
  }

  let completed = false;
  let safetyTimeout: ReturnType<typeof setTimeout> | null = null;

  const finish = () => {
    if (completed) return;
    completed = true;
    if (safetyTimeout) {
      clearTimeout(safetyTimeout);
      safetyTimeout = null;
    }
    onEnd?.();
  };

  utterance.onstart = () => {
    onStart?.();
  };

  utterance.onend = () => {
    finish();
  };

  utterance.onerror = (e) => {
    // If canceled by another deliberate user action, don't execute finish as completion
    if (e.error !== 'canceled') {
      finish();
    }
  };

  // Safety fallback: if speech synthesis drops onend (known browser quirk),
  // guarantee the timer still starts after word duration + safety buffer
  const estimatedDurationMs = Math.max(
    1400,
    Math.ceil((text.length * 150) / Math.max(0.4, rate)) + 800
  );
  safetyTimeout = setTimeout(() => {
    finish();
  }, estimatedDurationMs);

  window.speechSynthesis.speak(utterance);

  return () => {
    if (safetyTimeout) {
      clearTimeout(safetyTimeout);
      safetyTimeout = null;
    }
    completed = true;
    try {
      window.speechSynthesis.cancel();
    } catch {
      // Ignore
    }
  };
}

/**
 * Pronounces the word at `wordRate` followed by its meaning at `meaningRate` in British English (en-GB).
 */
export function pronounceWordAndMeaningBritishEnglish(
  word: string,
  meaning: string,
  wordRate: number = 0.82,
  meaningRate: number = 0.90,
  onEnd?: () => void
): () => void {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    onEnd?.();
    return () => {};
  }

  try {
    window.speechSynthesis.cancel();
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
    }
  } catch {
    // Ignore
  }

  const gbVoice = selectBritishVoice();

  const wordUtterance = new SpeechSynthesisUtterance(word);
  wordUtterance.lang = 'en-GB';
  wordUtterance.rate = wordRate;
  wordUtterance.pitch = 1.0;
  if (gbVoice) wordUtterance.voice = gbVoice;

  const meaningUtterance = new SpeechSynthesisUtterance(`Meaning: ${meaning}`);
  meaningUtterance.lang = 'en-GB';
  meaningUtterance.rate = meaningRate;
  meaningUtterance.pitch = 1.0;
  if (gbVoice) meaningUtterance.voice = gbVoice;

  let completed = false;
  const finish = () => {
    if (completed) return;
    completed = true;
    onEnd?.();
  };

  meaningUtterance.onend = () => finish();
  meaningUtterance.onerror = (e) => {
    if (e.error !== 'canceled') finish();
  };

  window.speechSynthesis.speak(wordUtterance);
  window.speechSynthesis.speak(meaningUtterance);

  return () => {
    completed = true;
    try {
      window.speechSynthesis.cancel();
    } catch {
      // Ignore
    }
  };
}
