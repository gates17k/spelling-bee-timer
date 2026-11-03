import React, { useState } from 'react';
import {
  Volume2,
  Hash,
  Gauge,
  Lock,
  Minus,
  Plus,
  X,
} from 'lucide-react';
import {
  MedicalWordBoxItem,
  RoundConfig,
  formatCodeNumber,
  formatSpeechRate,
  clampSpeechRate,
  SPEECH_RATE_MIN,
  SPEECH_RATE_MAX,
  SPEECH_RATE_STEP,
} from '../utils/competitionRules';
import { pronounceBritishEnglish } from '../utils/soundEffects';

interface ActiveRoundRulesFooterProps {
  round: RoundConfig;
  isTieBreaker: boolean;
  categoryWords: MedicalWordBoxItem[];
  selectedWordId: string | null;
  hasPronouncedCurrentWord: boolean;
  onSelectCodeNumberOnly: (word: MedicalWordBoxItem) => void;
  onToggleWordUsed?: (wordId: string) => void;
  wordSpeechRate: number;
  meaningSpeechRate: number;
  onChangeWordSpeechRate: (rate: number) => void;
  onChangeMeaningSpeechRate: (rate: number) => void;
}

export const ActiveRoundRulesFooter: React.FC<ActiveRoundRulesFooterProps> = ({
  round,
  isTieBreaker,
  categoryWords,
  selectedWordId,
  hasPronouncedCurrentWord,
  onSelectCodeNumberOnly,
  wordSpeechRate,
  meaningSpeechRate,
  onChangeWordSpeechRate,
  onChangeMeaningSpeechRate,
}) => {
  const [customWord, setCustomWord] = useState<string>('');
  const [quickCodeInput, setQuickCodeInput] = useState<string>('');

  const handleCustomSpeak = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customWord.trim()) return;
    pronounceBritishEnglish(customWord.trim().toLowerCase(), wordSpeechRate);
  };

  const handleQuickJumpCode = (e: React.FormEvent) => {
    e.preventDefault();
    const num = Number(quickCodeInput.trim());
    if (!Number.isFinite(num) || num <= 0) return;
    const match = categoryWords.find((w) => w.boxNumber === num);
    if (match) {
      onSelectCodeNumberOnly(match);
      setQuickCodeInput('');
    }
  };

  const isDense50Grid = categoryWords.length > 20;

  return (
    <section
      aria-label="Category Code Number Lot Box and Pronunciation Speed Controller"
      className="w-full shrink-0 px-3 pb-1 pt-0.5 sm:px-4 sm:pb-1.5"
    >
      <div className="grid grid-cols-12 gap-1.5 sm:gap-2.5">
        {/* Left 8 Columns: Interactive Code Number Lots for Current Category (Trial Run #01-#10 / Round #01-#50 / Tie-Breaker TB-01-TB-20) */}
        <div className="col-span-8 flex flex-col justify-between rounded-lg sm:rounded-xl border border-[#d4af37]/60 bg-[#071a38]/95 px-2.5 py-1 sm:px-3 sm:py-1.5 shadow-lg">
          <div className="mb-0.5 flex flex-wrap items-center justify-between gap-1.5 border-b border-[#d4af37]/30 pb-0.5">
            <div className="flex items-center gap-1">
              <Hash className="h-3 w-3 text-amber-300 shrink-0" />
              <h3 className="font-display-serif text-[11px] sm:text-xs font-black tracking-wider text-white">
                {isTieBreaker
                  ? 'TIE-BREAKER CODES (TB-01 TO TB-20) — STEP 1: SELECT CODE'
                  : round.id === 'trial'
                  ? 'TRIAL RUN CODES (#01 TO #10) — STEP 1: SELECT CODE'
                  : `${round.title.toUpperCase()} CODES (#01 TO #50) — STEP 1: SELECT CODE`}
              </h3>
            </div>

            <div className="flex items-center gap-1.5">
              <span
                data-testid="used-legend-badge"
                className="inline-flex items-center gap-0.5 rounded bg-red-950/90 border border-red-600/70 px-1.5 py-0.2 text-[9px] sm:text-[10px] font-extrabold text-red-300"
              >
                <X className="h-2.5 w-2.5 stroke-[3.5] text-red-400" />
                <span>✕ = Used</span>
              </span>

              <form onSubmit={handleQuickJumpCode} className="flex items-center gap-1">
                <input
                  type="number"
                  min={1}
                  max={categoryWords.length}
                  value={quickCodeInput}
                  onChange={(e) => setQuickCodeInput(e.target.value)}
                  placeholder={`1–${categoryWords.length}`}
                  aria-label="Quick select code number"
                  className="w-16 rounded border border-[#d4af37]/50 bg-[#041024] px-1 py-0.2 text-[10px] sm:text-[11px] font-bold text-white placeholder:text-slate-400 focus:border-amber-300 focus:outline-none"
                />
                <button
                  type="submit"
                  className="rounded bg-amber-400/20 border border-amber-400/50 px-1.5 py-0.2 text-[9px] sm:text-[10px] font-extrabold text-amber-200 hover:bg-amber-400/30 cursor-pointer"
                >
                  Select
                </button>
              </form>
              <span className="text-[9px] sm:text-[10px] font-bold text-amber-300 whitespace-nowrap">
                Step 2: Pronounce &amp; Start
              </span>
            </div>
          </div>

          <div className="grid grid-cols-10 gap-0.5 sm:gap-1">
            {categoryWords.map((item) => {
              const isSelected = item.id === selectedWordId;
              const fullCodeLabel = formatCodeNumber(item.boxNumber, item.isTieBreaker);
              const compactLabel = item.isTieBreaker
                ? `TB-${String(item.boxNumber).padStart(2, '0')}`
                : isDense50Grid
                ? `#${String(item.boxNumber).padStart(2, '0')}`
                : fullCodeLabel;

              return (
                <button
                  key={item.id}
                  type="button"
                  data-testid={`code-btn-${item.boxNumber}`}
                  onClick={() => onSelectCodeNumberOnly(item)}
                  aria-pressed={isSelected}
                  className={`group relative flex items-center justify-between rounded border transition-all cursor-pointer ${
                    isDense50Grid ? 'px-1 py-0.2' : 'px-1.5 py-0.5 sm:py-1'
                  } ${
                    isSelected
                      ? item.used
                        ? 'border-2 border-red-500 bg-[#350a0f] shadow-[0_0_12px_rgba(239,68,68,0.55)] ring-1 ring-amber-300'
                        : 'border-2 border-amber-300 bg-gradient-to-r from-[#173f7a] to-[#0f2c59] shadow-[0_0_10px_rgba(212,175,55,0.45)] ring-1 ring-amber-300'
                      : item.used
                      ? 'border-red-600/80 bg-[#220508]/90 text-red-200 hover:border-red-400 hover:bg-[#30080d]'
                      : 'border-[#d4af37]/30 bg-[#041024]/90 hover:border-amber-300/80 hover:bg-[#0c244a]'
                  }`}
                  title={`${fullCodeLabel} — ${
                    item.used ? 'Selected & Used Already (✕)' : 'Available'
                  }`}
                >
                  <span
                    className={`font-digital-led font-black whitespace-nowrap ${
                      isDense50Grid ? 'text-[11px]' : 'text-xs'
                    } ${
                      item.used
                        ? 'text-red-300 line-through decoration-red-500 decoration-2'
                        : 'text-amber-300'
                    }`}
                  >
                    {compactLabel}
                  </span>
                  {item.used ? (
                    <span
                      data-testid={`code-used-cross-${item.boxNumber}`}
                      className="flex items-center gap-0.5"
                      title="Selected & Used Already (Cross Mark)"
                    >
                      <X className="h-3.5 w-3.5 text-red-400 stroke-[3.5] shrink-0 drop-shadow-[0_0_3px_rgba(239,68,68,0.9)]" />
                    </span>
                  ) : isSelected ? (
                    hasPronouncedCurrentWord ? (
                      <Volume2 className="h-3 w-3 text-emerald-300 shrink-0" />
                    ) : (
                      <Lock className="h-3 w-3 text-amber-300 shrink-0" />
                    )
                  ) : (
                    <Lock className="h-2.5 w-2.5 text-slate-500 group-hover:text-amber-200 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right 4 Columns: Word & Meaning Pronunciation Speed Controller + Instant UK Pronouncer */}
        <div className="col-span-4 flex flex-col justify-between rounded-xl border border-[#d4af37]/60 bg-[#071a38]/95 px-3 py-1.5 shadow-lg">
          <div className="flex items-center justify-between gap-2 border-b border-[#d4af37]/30 pb-1">
            <div className="flex items-center gap-1.5">
              <Gauge className="h-4 w-4 text-amber-300 shrink-0" />
              <h3 className="font-display-serif text-xs font-black tracking-wider text-white sm:text-sm">
                PRONUNCIATION SPEED CONTROL (WORD &amp; MEANING)
              </h3>
            </div>
            <span className="text-[11px] font-extrabold text-amber-300 whitespace-nowrap">
              UK English (en-GB)
            </span>
          </div>

          {/* Dual Speed Controls: Word Pronunciation Speed & Meaning Pronunciation Speed */}
          <div className="my-1 grid grid-cols-2 gap-2">
            {/* 1. WORD PRONUNCIATION SPEED */}
            <div className="flex flex-col justify-between rounded-lg border border-[#d4af37]/40 bg-[#041024] px-2.5 py-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-extrabold tracking-wide text-amber-200">
                  WORD SPEED
                </span>
                <span
                  data-testid="word-speed-value"
                  className="rounded bg-amber-400/20 px-1.5 py-0.5 font-digital-led text-[11px] font-black text-amber-300"
                >
                  {formatSpeechRate(wordSpeechRate)}
                </span>
              </div>
              <div className="mt-1 flex items-center gap-1">
                <button
                  type="button"
                  data-testid="word-speed-dec"
                  onClick={() =>
                    onChangeWordSpeechRate(clampSpeechRate(wordSpeechRate - SPEECH_RATE_STEP))
                  }
                  aria-label="Decrease Word Pronunciation Speed"
                  className="rounded border border-amber-400/40 bg-[#0a2144] p-1 text-amber-300 hover:bg-[#14376d] cursor-pointer"
                >
                  <Minus className="h-3 w-3" />
                </button>
                <input
                  type="range"
                  data-testid="word-speed-slider"
                  aria-label="Word Pronunciation Speed"
                  min={SPEECH_RATE_MIN}
                  max={SPEECH_RATE_MAX}
                  step={SPEECH_RATE_STEP}
                  value={wordSpeechRate}
                  onChange={(e) => onChangeWordSpeechRate(clampSpeechRate(Number(e.target.value)))}
                  className="h-1.5 w-full accent-amber-400 cursor-pointer"
                />
                <button
                  type="button"
                  data-testid="word-speed-inc"
                  onClick={() =>
                    onChangeWordSpeechRate(clampSpeechRate(wordSpeechRate + SPEECH_RATE_STEP))
                  }
                  aria-label="Increase Word Pronunciation Speed"
                  className="rounded border border-amber-400/40 bg-[#0a2144] p-1 text-amber-300 hover:bg-[#14376d] cursor-pointer"
                >
                  <Plus className="h-3 w-3" />
                </button>
              </div>
            </div>

            {/* 2. MEANING PRONUNCIATION SPEED */}
            <div className="flex flex-col justify-between rounded-lg border border-[#d4af37]/40 bg-[#041024] px-2.5 py-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-extrabold tracking-wide text-emerald-200">
                  MEANING SPEED
                </span>
                <span
                  data-testid="meaning-speed-value"
                  className="rounded bg-emerald-400/20 px-1.5 py-0.5 font-digital-led text-[11px] font-black text-emerald-300"
                >
                  {formatSpeechRate(meaningSpeechRate)}
                </span>
              </div>
              <div className="mt-1 flex items-center gap-1">
                <button
                  type="button"
                  data-testid="meaning-speed-dec"
                  onClick={() =>
                    onChangeMeaningSpeechRate(
                      clampSpeechRate(meaningSpeechRate - SPEECH_RATE_STEP)
                    )
                  }
                  aria-label="Decrease Meaning Pronunciation Speed"
                  className="rounded border border-emerald-400/40 bg-[#0a2144] p-1 text-emerald-300 hover:bg-[#14376d] cursor-pointer"
                >
                  <Minus className="h-3 w-3" />
                </button>
                <input
                  type="range"
                  data-testid="meaning-speed-slider"
                  aria-label="Meaning Pronunciation Speed"
                  min={SPEECH_RATE_MIN}
                  max={SPEECH_RATE_MAX}
                  step={SPEECH_RATE_STEP}
                  value={meaningSpeechRate}
                  onChange={(e) =>
                    onChangeMeaningSpeechRate(clampSpeechRate(Number(e.target.value)))
                  }
                  className="h-1.5 w-full accent-emerald-400 cursor-pointer"
                />
                <button
                  type="button"
                  data-testid="meaning-speed-inc"
                  onClick={() =>
                    onChangeMeaningSpeechRate(
                      clampSpeechRate(meaningSpeechRate + SPEECH_RATE_STEP)
                    )
                  }
                  aria-label="Increase Meaning Pronunciation Speed"
                  className="rounded border border-emerald-400/40 bg-[#0a2144] p-1 text-emerald-300 hover:bg-[#14376d] cursor-pointer"
                >
                  <Plus className="h-3 w-3" />
                </button>
              </div>
            </div>
          </div>

          {/* Instant Custom UK Pronouncer Form */}
          <form onSubmit={handleCustomSpeak} className="flex items-center gap-1.5">
            <input
              type="text"
              placeholder="Type any word or meaning to pronounce..."
              aria-label="Type any medical word to pronounce in UK English"
              value={customWord}
              onChange={(e) => setCustomWord(e.target.value)}
              className="flex-1 rounded-lg border border-[#d4af37]/50 bg-[#041024] px-2.5 py-1 text-xs font-bold text-white placeholder:text-slate-400 focus:border-amber-300 focus:outline-none"
            />
            <button
              type="submit"
              className="inline-flex items-center gap-1 rounded-lg bg-gold-metallic px-2.5 py-1 text-xs font-black text-[#051329] hover:brightness-110 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Volume2 className="h-3.5 w-3.5 shrink-0" />
              <span>Speak ({formatSpeechRate(wordSpeechRate)})</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
