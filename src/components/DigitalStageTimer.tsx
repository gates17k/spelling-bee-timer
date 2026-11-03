import React from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  BookOpenCheck,
  Eye,
  EyeOff,
  AlertTriangle,
  Sparkles,
  Repeat,
  Lock,
  CheckCircle2,
  X,
} from 'lucide-react';
import {
  FormattedTimer,
  MedicalWordBoxItem,
  RoundConfig,
  formatCodeNumber,
  formatSpeechRate,
} from '../utils/competitionRules';

interface DigitalStageTimerProps {
  round: RoundConfig;
  isTieBreaker: boolean;
  timer: FormattedTimer;
  isRunning: boolean;
  msDigits: 2 | 3;
  onToggleMsDigits: () => void;
  onStartPause: () => void;
  onReset: () => void;
  currentWordItem: MedicalWordBoxItem | null;
  hasPronouncedCurrentWord: boolean;
  isPronouncingBeforeClock?: boolean;
  isMeaningVisibleOnStage: boolean;
  revealSpellingOnStage: boolean;
  onToggleRevealSpelling: () => void;
  wordSpeechRate: number;
  meaningSpeechRate: number;
  onPronounceWord: (rate?: number) => void;
  onPronounceAndStartClock: () => void;
  onPronounceMeaning: () => void;
  onToggleWordUsed?: (wordId: string) => void;
}

export const DigitalStageTimer: React.FC<DigitalStageTimerProps> = ({
  round,
  isTieBreaker,
  timer,
  isRunning,
  msDigits,
  onToggleMsDigits,
  onStartPause,
  onReset,
  currentWordItem,
  hasPronouncedCurrentWord,
  isPronouncingBeforeClock = false,
  isMeaningVisibleOnStage,
  revealSpellingOnStage,
  onToggleRevealSpelling,
  wordSpeechRate,
  meaningSpeechRate,
  onPronounceWord,
  onPronounceAndStartClock,
  onPronounceMeaning,
  onToggleWordUsed,
}) => {
  const codeLabel = currentWordItem
    ? formatCodeNumber(currentWordItem.boxNumber, currentWordItem.isTieBreaker)
    : null;

  return (
    <section
      aria-label="Centerpiece Black and Red Digital Competition Timer and UK English Pronouncer"
      className="w-full flex-1 flex flex-col justify-between px-2 py-0.5 sm:px-4 sm:py-1 min-h-0"
    >
      {/* Outer Gold & Royal Blue Stage Frame - Expands to fill available stage height */}
      <div className="flex flex-col justify-between rounded-xl sm:rounded-2xl border-2 sm:border-3 border-[#d4af37] bg-gradient-to-b from-[#0b2349] via-[#06152e] to-[#040d1e] px-2.5 py-2 sm:px-4 sm:py-3 shadow-[0_10px_35px_rgba(0,0,0,0.85)] flex-1 min-h-0">
        {/* ======================================================================= */}
        {/* THE CENTERPIECE: PURE PITCH-BLACK BACKGROUND & GIANT RED DIGITAL TIMER  */}
        {/* ======================================================================= */}
        <div
          data-testid="black-red-digital-timer"
          className={`relative overflow-hidden rounded-lg sm:rounded-xl border-2 sm:border-3 bg-[#000000] px-3 py-2 sm:px-5 sm:py-3 shadow-[inset_0_0_80px_rgba(0,0,0,1)] transition-colors flex-1 flex flex-col justify-between min-h-0 ${
            timer.isExpired
              ? 'border-[#ff1a1a] ring-2 ring-red-600/50'
              : timer.isCritical
              ? 'border-[#ff2e2e]'
              : 'border-[#d4af37]'
          }`}
        >
          {/* Top Digital Housing Status Header */}
          <div className="mb-1 flex flex-wrap items-center justify-between gap-1.5 border-b border-red-950/80 pb-1 text-[10px] sm:text-xs">
            <div className="flex items-center gap-2">
              <span className="rounded bg-red-950/90 border border-red-700/60 px-2 py-0.5 font-digital-led text-[10px] sm:text-xs font-bold tracking-widest text-[#ff3b3b]">
                {isTieBreaker
                  ? `TIE-BREAKER CATEGORY · ${round.shortTitle}`
                  : round.id === 'trial'
                  ? `TRIAL RUN · PRACTICE DEMO`
                  : `CATEGORY LEVEL ${round.levelNumber} · ${round.shortTitle}`}
              </span>
              <span className="font-digital-led text-[10px] sm:text-xs font-bold tracking-wider text-red-400/90">
                ALLOTTED TIME: {round.durationSeconds} SECONDS (INCLUSIVE OF REPEAT &amp; MEANING)
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-digital-led text-[10px] sm:text-xs font-bold tracking-widest text-amber-300">
                SPEED: WORD {formatSpeechRate(wordSpeechRate)} · MEANING {formatSpeechRate(meaningSpeechRate)}
              </span>
              <span className="font-digital-led text-[10px] sm:text-xs font-bold tracking-widest text-red-400">
                MINUTES : SECONDS : MILLISECONDS
              </span>
              <button
                type="button"
                onClick={onToggleMsDigits}
                className="rounded border border-red-800/80 bg-red-950/50 px-2 py-0.5 font-digital-led text-[10px] sm:text-xs font-bold text-red-300 hover:bg-red-900/60 cursor-pointer"
                title="Toggle 2-digit or 3-digit milliseconds precision"
              >
                MS: {msDigits === 3 ? '000 (3-Digit)' : '00 (2-Digit)'}
              </button>
            </div>
          </div>

          {/* Enlarged High-Contrast Red Digital Numbers on Pure Black */}
          <div className="flex flex-col items-center justify-center flex-1 py-1 sm:py-2">
            <div
              role="timer"
              aria-live="off"
              aria-label={`Competition Countdown Timer ${timer.formatted}`}
              className="grid grid-cols-11 items-baseline justify-items-center gap-1 sm:gap-2.5 w-full max-w-[1360px]"
            >
              {/* MINUTES BLOCK */}
              <div className="col-span-3 flex flex-col items-center w-full">
                <span className="mb-1 font-digital-led text-[11px] sm:text-xs md:text-sm font-bold tracking-[0.25em] text-[#ff4d4d]">
                  MINUTES
                </span>
                <div className="relative flex items-center justify-center rounded-lg sm:rounded-xl border border-red-950/90 bg-[#050000] px-2.5 py-1.5 sm:px-4 sm:py-2.5 md:py-3 w-full shadow-inner">
                  <span
                    aria-hidden="true"
                    className="led-ghost pointer-events-none select-none font-digital-led text-6xl sm:text-7xl md:text-8xl lg:text-[6.85rem] xl:text-[8rem] 2xl:text-[9.25rem] font-bold leading-none"
                  >
                    88
                  </span>
                  <span
                    data-testid="timer-minutes"
                    className={`absolute font-digital-led text-6xl sm:text-7xl md:text-8xl lg:text-[6.85rem] xl:text-[8rem] 2xl:text-[9.25rem] font-bold leading-none tracking-wider ${
                      timer.isCritical || timer.isExpired
                        ? 'led-red-critical'
                        : 'led-red-glow'
                    }`}
                  >
                    {timer.minutes}
                  </span>
                </div>
              </div>

              {/* COLON SEPARATOR 1 */}
              <div className="col-span-1 flex flex-col items-center justify-center self-center pt-3 sm:pt-4">
                <span
                  className={`font-digital-led text-5xl sm:text-6xl md:text-7xl lg:text-[6rem] xl:text-[7.25rem] 2xl:text-[8.25rem] font-black leading-none ${
                    timer.isCritical || timer.isExpired ? 'led-red-critical' : 'led-red-glow'
                  }`}
                >
                  :
                </span>
              </div>

              {/* SECONDS BLOCK */}
              <div className="col-span-3 flex flex-col items-center w-full">
                <span className="mb-1 font-digital-led text-[11px] sm:text-xs md:text-sm font-bold tracking-[0.25em] text-[#ff4d4d]">
                  SECONDS
                </span>
                <div className="relative flex items-center justify-center rounded-lg sm:rounded-xl border border-red-950/90 bg-[#050000] px-2.5 py-1.5 sm:px-4 sm:py-2.5 md:py-3 w-full shadow-inner">
                  <span
                    aria-hidden="true"
                    className="led-ghost pointer-events-none select-none font-digital-led text-6xl sm:text-7xl md:text-8xl lg:text-[6.85rem] xl:text-[8rem] 2xl:text-[9.25rem] font-bold leading-none"
                  >
                    88
                  </span>
                  <span
                    data-testid="timer-seconds"
                    className={`absolute font-digital-led text-6xl sm:text-7xl md:text-8xl lg:text-[6.85rem] xl:text-[8rem] 2xl:text-[9.25rem] font-bold leading-none tracking-wider ${
                      timer.isCritical || timer.isExpired
                        ? 'led-red-critical'
                        : 'led-red-glow'
                    }`}
                  >
                    {timer.seconds}
                  </span>
                </div>
              </div>

              {/* COLON SEPARATOR 2 */}
              <div className="col-span-1 flex flex-col items-center justify-center self-center pt-3 sm:pt-4">
                <span
                  className={`font-digital-led text-5xl sm:text-6xl md:text-7xl lg:text-[6rem] xl:text-[7.25rem] 2xl:text-[8.25rem] font-black leading-none ${
                    timer.isCritical || timer.isExpired ? 'led-red-critical' : 'led-red-glow'
                  }`}
                >
                  :
                </span>
              </div>

              {/* MILLISECONDS BLOCK */}
              <div className="col-span-3 flex flex-col items-center w-full">
                <span className="mb-1 font-digital-led text-[11px] sm:text-xs md:text-sm font-bold tracking-[0.2em] text-[#ff4d4d]">
                  MILLISECONDS
                </span>
                <div className="relative flex items-center justify-center rounded-lg sm:rounded-xl border border-red-950/90 bg-[#050000] px-2.5 py-1.5 sm:px-4 sm:py-2.5 md:py-3 w-full shadow-inner">
                  <span
                    aria-hidden="true"
                    className={`led-ghost pointer-events-none select-none font-digital-led font-bold leading-none ${
                      msDigits === 3
                        ? 'text-5xl sm:text-6xl md:text-7xl lg:text-[5.75rem] xl:text-[6.75rem] 2xl:text-[7.75rem]'
                        : 'text-6xl sm:text-7xl md:text-8xl lg:text-[6.85rem] xl:text-[8rem] 2xl:text-[9.25rem]'
                    }`}
                  >
                    {msDigits === 3 ? '888' : '88'}
                  </span>
                  <span
                    data-testid="timer-milliseconds"
                    className={`absolute font-digital-led font-bold leading-none tracking-wider ${
                      msDigits === 3
                        ? 'text-5xl sm:text-6xl md:text-7xl lg:text-[5.75rem] xl:text-[6.75rem] 2xl:text-[7.75rem]'
                        : 'text-6xl sm:text-7xl md:text-8xl lg:text-[6.85rem] xl:text-[8rem] 2xl:text-[9.25rem]'
                    } ${
                      timer.isCritical || timer.isExpired
                        ? 'led-red-critical'
                        : 'led-red-glow'
                    }`}
                  >
                    {timer.milliseconds}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Selected Lot Code Number & Pronunciation Status Strip */}
          <div className="mt-1.5 flex flex-wrap items-center justify-between gap-2 rounded-lg border border-red-900/60 bg-[#0b0000] px-3 py-1.5 text-xs">
            {timer.isExpired ? (
              <div className="mx-auto flex items-center gap-2 text-base font-black tracking-wider text-[#ff1a1a] sm:text-lg">
                <AlertTriangle className="h-5 w-5 shrink-0" />
                <span>TIME UP! 00:00:00 — SPELLING WINDOW CLOSED</span>
              </div>
            ) : currentWordItem && codeLabel ? (
              <>
                <div className="flex flex-wrap items-center gap-2.5 text-xs sm:text-sm">
                  <span
                    data-testid="selected-code-badge"
                    className={`rounded px-2.5 py-0.5 font-digital-led font-bold inline-flex items-center gap-1.5 ${
                      currentWordItem.used
                        ? 'bg-red-950/90 border-2 border-red-500 text-red-200 shadow-[0_0_8px_rgba(239,68,68,0.5)]'
                        : 'bg-red-950 border border-red-700/60 text-amber-300'
                    }`}
                  >
                    <span>SELECTED LOT: {codeLabel}</span>
                    {currentWordItem.used ? (
                      <span className="inline-flex items-center gap-0.5 text-red-400 font-black">
                        <X className="h-3.5 w-3.5 stroke-[3.5]" />
                        <span className="text-[10px] tracking-wider uppercase">USED (✕)</span>
                      </span>
                    ) : (
                      <span className="text-[10px] text-emerald-400 font-semibold tracking-wider uppercase">
                        AVAILABLE
                      </span>
                    )}
                  </span>

                  {onToggleWordUsed && (
                    <button
                      type="button"
                      data-testid="toggle-word-used-btn"
                      onClick={() => onToggleWordUsed(currentWordItem.id)}
                      className={`rounded border px-2 py-0.5 text-[10px] font-extrabold cursor-pointer transition-colors ${
                        currentWordItem.used
                          ? 'border-emerald-500/70 bg-emerald-950/80 text-emerald-300 hover:bg-emerald-900'
                          : 'border-red-500/70 bg-red-950/80 text-red-300 hover:bg-red-900'
                      }`}
                      title="Toggle whether this code number is marked as used already"
                    >
                      {currentWordItem.used ? 'MARK LOT AVAILABLE' : 'MARK LOT USED (✕)'}
                    </button>
                  )}

                  {!hasPronouncedCurrentWord ? (
                    <span
                      data-testid="pronunciation-status-text"
                      className="inline-flex items-center gap-1.5 font-bold text-amber-200"
                    >
                      <Lock className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                      <span>
                        Word Locked (Not Pronounced Yet) — Click &ldquo;PRONOUNCE &amp; START CLOCK&rdquo; when contestant is ready
                      </span>
                    </span>
                  ) : isPronouncingBeforeClock ? (
                    <span
                      data-testid="pronunciation-status-text"
                      className="inline-flex items-center gap-1.5 font-bold text-amber-300 animate-pulse"
                    >
                      <Volume2 className="h-4 w-4 text-amber-400 shrink-0 animate-bounce" />
                      <span>
                        Pronouncing Word in UK English... Countdown Clock Starts Once Spoken Fully
                      </span>
                    </span>
                  ) : isMeaningVisibleOnStage ? (
                    <span
                      data-testid="pronunciation-status-text"
                      className="text-slate-100 font-medium"
                    >
                      <strong className="text-amber-300">Meaning:</strong> {currentWordItem.meaning}
                    </span>
                  ) : (
                    <span
                      data-testid="pronunciation-status-text"
                      className="inline-flex items-center gap-1.5 font-bold text-emerald-300"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                      <span>
                        Word Pronounced ({formatSpeechRate(wordSpeechRate)}) &amp; Clock Running — Click &ldquo;REPEAT WORD&rdquo; or &ldquo;SPEAK MEANING&rdquo; if requested
                      </span>
                    </span>
                  )}
                </div>

                {revealSpellingOnStage ? (
                  <div className="flex items-center gap-2 rounded-lg border-2 border-amber-400 bg-amber-950/90 px-3 py-0.5">
                    <span className="font-digital-led text-sm font-black tracking-[0.16em] text-amber-300 sm:text-base">
                      UK SPELLING: {currentWordItem.britishSpelling}
                    </span>
                    {currentWordItem.phoneticHint && (
                      <span className="text-xs font-semibold text-amber-100">
                        ({currentWordItem.phoneticHint})
                      </span>
                    )}
                  </div>
                ) : (
                  <span className="font-digital-led text-xs font-bold tracking-wider text-slate-400">
                    SPELLING HIDDEN FOR CONTESTANT
                  </span>
                )}
              </>
            ) : (
              <div className="mx-auto text-xs font-bold text-slate-400">
                Select a Lot Code Number below first, then click &ldquo;PRONOUNCE &amp; START CLOCK&rdquo;
              </div>
            )}
          </div>

          {/* High-Contrast Red Digital Progress Bar at Base of Black Display */}
          <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-[#1a0000] p-0.5 border border-red-950">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#990000] via-[#ff1a1a] to-[#ff4d4d] transition-all duration-75"
              style={{ width: `${timer.progressPercent}%` }}
            />
          </div>
        </div>

        {/* ======================================================================= */}
        {/* TIMER & UK ENGLISH SOFTWARE PRONOUNCER ACTION BAR                       */}
        {/* ======================================================================= */}
        <div className="mt-2 sm:mt-2.5 flex flex-wrap items-center justify-between gap-1.5">
          {/* Primary Countdown Clock Controls */}
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              type="button"
              onClick={onStartPause}
              className={`flex items-center justify-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-black tracking-wider shadow-sm transition-transform active:scale-95 whitespace-nowrap shrink-0 cursor-pointer sm:text-sm ${
                isRunning
                  ? 'bg-amber-400 text-[#051329] hover:bg-amber-300'
                  : 'bg-[#ff1a1a] text-white hover:bg-[#e60000] ring-1 ring-red-400/50'
              }`}
            >
              {isRunning ? (
                <>
                  <Pause className="h-3.5 w-3.5 fill-current shrink-0" />
                  <span>PAUSE (SPACE)</span>
                </>
              ) : (
                <>
                  <Play className="h-3.5 w-3.5 fill-current shrink-0" />
                  <span>
                    {timer.totalRemainingMs < round.durationMs && timer.totalRemainingMs > 0
                      ? 'RESUME CLOCK'
                      : `START ${round.durationSeconds}s CLOCK`}
                  </span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={onReset}
              className="flex items-center justify-center gap-1 rounded-lg border border-[#d4af37] bg-[#0a2246] px-2.5 py-1.5 text-xs font-extrabold tracking-wider text-amber-200 hover:bg-[#123469] hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer sm:text-sm"
            >
              <RotateCcw className="h-3.5 w-3.5 shrink-0" />
              <span>RESET</span>
            </button>
          </div>

          {/* UK English (en-GB) Software Pronouncer Controls */}
          <div className="flex flex-wrap items-center justify-end gap-1.5">
            <button
              type="button"
              data-testid="pronounce-and-start-btn"
              onClick={onPronounceAndStartClock}
              disabled={!currentWordItem || isPronouncingBeforeClock}
              className="inline-flex items-center gap-1.5 rounded-lg bg-gold-metallic px-3 py-1.5 text-xs font-black tracking-wide text-[#051329] shadow-[0_0_15px_rgba(212,175,55,0.45)] ring-1 ring-amber-200 hover:brightness-110 disabled:opacity-50 whitespace-nowrap shrink-0 cursor-pointer sm:text-sm"
              title={`Rule 7: Pronounce the selected Code Number's word at ${formatSpeechRate(wordSpeechRate)} and start the countdown clock once spoken fully`}
            >
              {isPronouncingBeforeClock ? (
                <>
                  <Volume2 className="h-3.5 w-3.5 animate-pulse text-[#051329] shrink-0" />
                  <span className="animate-pulse">PRONOUNCING... CLOCK STARTS NEXT</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-3.5 w-3.5 shrink-0" />
                  <span>PRONOUNCE &amp; START CLOCK</span>
                </>
              )}
            </button>

            <button
              type="button"
              data-testid="repeat-word-btn"
              onClick={() => onPronounceWord(wordSpeechRate)}
              disabled={!currentWordItem}
              className="inline-flex items-center gap-1 rounded-lg border border-amber-400 bg-[#0e2d5c] px-2.5 py-1.5 text-xs font-extrabold text-amber-200 hover:bg-[#163f7d] hover:text-white disabled:opacity-40 whitespace-nowrap shrink-0 cursor-pointer sm:text-sm"
              title={`Rule 4: Repeat the word in UK English at ${formatSpeechRate(wordSpeechRate)}`}
            >
              <Volume2 className="h-3.5 w-3.5 text-amber-300 shrink-0" />
              <span>REPEAT</span>
            </button>

            <button
              type="button"
              onClick={() => onPronounceWord(Math.max(0.45, Number((wordSpeechRate - 0.2).toFixed(2))))}
              disabled={!currentWordItem}
              className="inline-flex items-center gap-1 rounded-lg border border-amber-400/50 bg-[#0a2144] px-2 py-1.5 text-xs font-bold text-amber-200 hover:bg-[#133568] disabled:opacity-40 whitespace-nowrap shrink-0 cursor-pointer sm:text-sm"
              title="Repeat extra slowly in UK English"
            >
              <Repeat className="h-3.5 w-3.5 text-amber-300 shrink-0" />
              <span>EXTRA SLOW</span>
            </button>

            <button
              type="button"
              data-testid="speak-meaning-btn"
              onClick={onPronounceMeaning}
              disabled={!currentWordItem}
              className="inline-flex items-center gap-1 rounded-lg border border-amber-400/50 bg-[#0a2144] px-2.5 py-1.5 text-xs font-bold text-amber-200 hover:bg-[#133568] disabled:opacity-40 whitespace-nowrap shrink-0 cursor-pointer sm:text-sm"
              title={`Rule 4 & 5: Speak and reveal the word's meaning at ${formatSpeechRate(meaningSpeechRate)}`}
            >
              <BookOpenCheck className="h-3.5 w-3.5 text-amber-300 shrink-0" />
              <span>SPEAK MEANING</span>
            </button>

            <button
              type="button"
              onClick={onToggleRevealSpelling}
              disabled={!currentWordItem}
              className="inline-flex items-center gap-1 rounded-lg border border-slate-400/50 bg-[#041024] px-2.5 py-1.5 text-xs font-bold text-slate-200 hover:text-white disabled:opacity-40 whitespace-nowrap shrink-0 cursor-pointer sm:text-sm"
              title="Reveal or hide official UK English spelling on the projector"
            >
              {revealSpellingOnStage ? (
                <>
                  <EyeOff className="h-3.5 w-3.5 text-amber-300 shrink-0" />
                  <span>HIDE SPELLING</span>
                </>
              ) : (
                <>
                  <Eye className="h-3.5 w-3.5 text-amber-300 shrink-0" />
                  <span>REVEAL SPELLING</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
