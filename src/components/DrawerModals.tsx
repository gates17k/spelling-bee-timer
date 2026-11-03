import React, { useState } from 'react';
import {
  X,
  BookOpen,
  Volume2,
  Plus,
  ListMusic,
  BookOpenCheck,
  Gauge,
} from 'lucide-react';
import {
  COMPETITION_METADATA,
  GENERAL_RULES,
  JUDGE_ROLES,
  MedicalWordBoxItem,
  ROUNDS_CONFIG,
  ROUND_ORDER,
  formatCodeNumber,
  formatSpeechRate,
  clampSpeechRate,
  SPEECH_RATE_MIN,
  SPEECH_RATE_MAX,
  SPEECH_RATE_STEP,
} from '../utils/competitionRules';
import {
  pronounceBritishEnglish,
  pronounceWordAndMeaningBritishEnglish,
} from '../utils/soundEffects';

interface CategoryWordManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  wordBox: MedicalWordBoxItem[];
  wordSpeechRate: number;
  meaningSpeechRate: number;
  onChangeWordSpeechRate: (rate: number) => void;
  onChangeMeaningSpeechRate: (rate: number) => void;
  onAddCustomWord: (word: Omit<MedicalWordBoxItem, 'used' | 'id'>) => void;
  onSelectWordForStage: (word: MedicalWordBoxItem) => void;
  onToggleWordUsed?: (wordId: string) => void;
}

export const CategoryWordManagerModal: React.FC<CategoryWordManagerModalProps> = ({
  isOpen,
  onClose,
  wordBox,
  wordSpeechRate,
  meaningSpeechRate,
  onChangeWordSpeechRate,
  onChangeMeaningSpeechRate,
  onAddCustomWord,
  onSelectWordForStage,
  onToggleWordUsed,
}) => {
  const [activeCategoryTab, setActiveCategoryTab] = useState<'trial' | 'rounds' | 'tb'>('rounds');
  const [newBoxNum, setNewBoxNum] = useState<string>('51');
  const [newSpelling, setNewSpelling] = useState<string>('');
  const [newPhonetic, setNewPhonetic] = useState<string>('');
  const [newMeaning, setNewMeaning] = useState<string>('');

  if (!isOpen) return null;

  const filteredWords = wordBox.filter((w) =>
    activeCategoryTab === 'tb'
      ? w.isTieBreaker
      : activeCategoryTab === 'trial'
      ? !w.isTieBreaker && w.roundId === 'trial'
      : !w.isTieBreaker && w.roundId !== 'trial'
  );

  const handleCreateWord = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSpelling.trim() || !newMeaning.trim()) return;
    const parsedNum = Number(newBoxNum) || filteredWords.length + 1;
    onAddCustomWord({
      boxNumber: parsedNum,
      britishSpelling: newSpelling.trim().toUpperCase(),
      ttsWord: newSpelling.trim().toLowerCase(),
      phoneticHint: newPhonetic.trim(),
      meaning: newMeaning.trim(),
      roundId: activeCategoryTab === 'trial' ? 'trial' : 'round1',
      isTieBreaker: activeCategoryTab === 'tb',
    });
    setNewBoxNum(String(parsedNum + 1));
    setNewSpelling('');
    setNewPhonetic('');
    setNewMeaning('');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Manage Category Words and UK English Pronunciation"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
    >
      <div className="flex max-h-[90vh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl border-2 border-[#d4af37] bg-[#061631] text-white shadow-2xl">
        {/* Modal Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#d4af37]/40 bg-[#041024] px-6 py-4">
          <div className="flex items-center gap-3">
            <ListMusic className="h-6 w-6 text-amber-300" />
            <div>
              <h2 className="font-display-serif text-xl font-black tracking-wide text-white">
                FINALISED MEDICAL WORDS &amp; UK ENGLISH PRONOUNCER
              </h2>
              <p className="text-xs text-amber-200/80">
                10 Trial Run Words (#01–#10) · 50 Round Words (#01–#50) · 20 Tie-Breaker Words (TB-01–TB-20)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Category Filter Tabs */}
            <div className="flex flex-wrap rounded-lg border border-[#d4af37]/40 bg-[#081d3d] p-1 gap-1">
              <button
                type="button"
                onClick={() => setActiveCategoryTab('trial')}
                className={`rounded-md px-3 py-1.5 text-xs font-extrabold transition-colors cursor-pointer ${
                  activeCategoryTab === 'trial'
                    ? 'bg-emerald-400 text-[#041f18]'
                    : 'text-emerald-200 hover:text-white'
                }`}
              >
                Trial Run (Code #01–#10)
              </button>
              <button
                type="button"
                onClick={() => setActiveCategoryTab('rounds')}
                className={`rounded-md px-3 py-1.5 text-xs font-extrabold transition-colors cursor-pointer ${
                  activeCategoryTab === 'rounds'
                    ? 'bg-gold-metallic text-[#051329]'
                    : 'text-slate-200 hover:text-white'
                }`}
              >
                Rounds 1, 2 &amp; 3 (Code #01–#50)
              </button>
              <button
                type="button"
                onClick={() => setActiveCategoryTab('tb')}
                className={`rounded-md px-3 py-1.5 text-xs font-extrabold transition-colors cursor-pointer ${
                  activeCategoryTab === 'tb'
                    ? 'bg-orange-500 text-black'
                    : 'text-orange-300 hover:text-white'
                }`}
              >
                Tie-Breaker (TB-01–TB-20)
              </button>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close Category Word Manager Modal"
              className="rounded-lg border border-white/20 p-2 text-slate-300 hover:bg-white/10 hover:text-white cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {/* Speed Calibration Bar inside Modal */}
          <div className="grid grid-cols-1 gap-4 rounded-xl border border-[#d4af37]/40 bg-[#041024] p-4 sm:grid-cols-2">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Gauge className="h-4 w-4 text-amber-300" />
                <span className="text-xs font-extrabold text-amber-200">
                  WORD PRONUNCIATION SPEED:
                </span>
                <span className="rounded bg-amber-400/20 px-2 py-0.5 font-digital-led text-xs font-black text-amber-300">
                  {formatSpeechRate(wordSpeechRate)}
                </span>
              </div>
              <input
                type="range"
                min={SPEECH_RATE_MIN}
                max={SPEECH_RATE_MAX}
                step={SPEECH_RATE_STEP}
                value={wordSpeechRate}
                onChange={(e) => onChangeWordSpeechRate(clampSpeechRate(Number(e.target.value)))}
                className="w-44 accent-amber-400 cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Gauge className="h-4 w-4 text-emerald-300" />
                <span className="text-xs font-extrabold text-emerald-200">
                  MEANING PRONUNCIATION SPEED:
                </span>
                <span className="rounded bg-emerald-400/20 px-2 py-0.5 font-digital-led text-xs font-black text-emerald-300">
                  {formatSpeechRate(meaningSpeechRate)}
                </span>
              </div>
              <input
                type="range"
                min={SPEECH_RATE_MIN}
                max={SPEECH_RATE_MAX}
                step={SPEECH_RATE_STEP}
                value={meaningSpeechRate}
                onChange={(e) =>
                  onChangeMeaningSpeechRate(clampSpeechRate(Number(e.target.value)))
                }
                className="w-44 accent-emerald-400 cursor-pointer"
              />
            </div>
          </div>

          {/* Add Custom Word to Selected Category Form */}
          <form
            onSubmit={handleCreateWord}
            className="grid grid-cols-1 gap-3 rounded-xl border border-[#d4af37]/40 bg-[#041024] p-4 sm:grid-cols-12"
          >
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-amber-300">Code Number</label>
              <input
                type="number"
                value={newBoxNum}
                onChange={(e) => setNewBoxNum(e.target.value)}
                className="mt-1 w-full rounded border border-white/20 bg-[#081d3d] px-2.5 py-1.5 text-xs font-bold text-white"
              />
            </div>
            <div className="sm:col-span-3">
              <label className="block text-xs font-bold text-amber-300">
                UK Medical Word
              </label>
              <input
                type="text"
                placeholder="e.g. DIPHTHERIA"
                value={newSpelling}
                onChange={(e) => setNewSpelling(e.target.value)}
                className="mt-1 w-full rounded border border-white/20 bg-[#081d3d] px-2.5 py-1.5 text-xs font-bold text-white"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-amber-300">
                UK Phonetic Guide
              </label>
              <input
                type="text"
                placeholder="e.g. dif-THEER-ee-uh"
                value={newPhonetic}
                onChange={(e) => setNewPhonetic(e.target.value)}
                className="mt-1 w-full rounded border border-white/20 bg-[#081d3d] px-2.5 py-1.5 text-xs text-white"
              />
            </div>
            <div className="sm:col-span-3">
              <label className="block text-xs font-bold text-amber-300">One-Line Meaning</label>
              <input
                type="text"
                placeholder="Standard dictionary definition..."
                value={newMeaning}
                onChange={(e) => setNewMeaning(e.target.value)}
                className="mt-1 w-full rounded border border-white/20 bg-[#081d3d] px-2.5 py-1.5 text-xs text-white"
              />
            </div>
            <div className="sm:col-span-2 flex items-end">
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-1 rounded-lg bg-gold-metallic px-3 py-2 text-xs font-black text-[#051329] cursor-pointer"
              >
                <Plus className="h-4 w-4" />
                <span>Add Code Lot</span>
              </button>
            </div>
          </form>

          {/* Word Box Grid for Selected Category */}
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {filteredWords.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-3 rounded-xl border border-[#d4af37]/30 bg-[#041024] p-3.5"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded bg-amber-400/20 px-2 py-0.5 font-digital-led text-xs font-bold text-amber-300">
                      {formatCodeNumber(item.boxNumber, item.isTieBreaker)} ·{' '}
                      {item.isTieBreaker
                        ? 'Tie-Breaker'
                        : item.roundId === 'trial'
                        ? 'Trial Run'
                        : 'Round Word'}
                    </span>
                    <span className="font-digital-led text-base font-black tracking-wider text-white">
                      {item.britishSpelling}
                    </span>
                    {item.phoneticHint && (
                      <span className="text-xs font-medium text-amber-200/80">
                        ({item.phoneticHint})
                      </span>
                    )}
                    {item.used ? (
                      <span className="inline-flex items-center gap-1 rounded bg-red-950 border border-red-500/70 px-2 py-0.5 text-xs font-black text-red-300">
                        <X className="h-3 w-3 stroke-[3.5] text-red-400" />
                        <span>USED (✕)</span>
                      </span>
                    ) : (
                      <span className="rounded bg-emerald-950/80 border border-emerald-600/50 px-2 py-0.5 text-[10px] font-bold text-emerald-300">
                        AVAILABLE
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-xs text-slate-300">{item.meaning}</p>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  {onToggleWordUsed && (
                    <button
                      type="button"
                      onClick={() => onToggleWordUsed(item.id)}
                      className={`rounded-lg border px-2 py-1.5 text-xs font-bold transition-colors cursor-pointer ${
                        item.used
                          ? 'border-emerald-500/60 bg-emerald-950/70 text-emerald-300 hover:bg-emerald-900'
                          : 'border-red-500/60 bg-red-950/70 text-red-300 hover:bg-red-900'
                      }`}
                      title="Toggle whether word is used or available"
                    >
                      {item.used ? 'Mark Avail' : 'Mark Used ✕'}
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() =>
                      pronounceBritishEnglish(
                        item.ttsWord || item.britishSpelling.toLowerCase(),
                        wordSpeechRate
                      )
                    }
                    className="rounded-lg border border-amber-400/40 bg-[#0c274e] p-2 text-amber-300 hover:bg-[#153c75] cursor-pointer"
                    title={`Test Word Pronunciation at ${formatSpeechRate(wordSpeechRate)}`}
                  >
                    <Volume2 className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      pronounceWordAndMeaningBritishEnglish(
                        item.ttsWord || item.britishSpelling.toLowerCase(),
                        item.meaning,
                        wordSpeechRate,
                        meaningSpeechRate
                      )
                    }
                    className="rounded-lg border border-amber-400/40 bg-[#0c274e] p-2 text-amber-200 hover:bg-[#153c75] cursor-pointer"
                    title={`Test Word (${formatSpeechRate(wordSpeechRate)}) & Meaning (${formatSpeechRate(meaningSpeechRate)})`}
                  >
                    <BookOpenCheck className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      onSelectWordForStage(item);
                      onClose();
                    }}
                    className="rounded-lg bg-gold-metallic px-3 py-1.5 text-xs font-black text-[#051329] cursor-pointer"
                  >
                    Select Code Lot
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

interface RulesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OfficialRulesAndThemeModal: React.FC<RulesModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Official Spelling Bee Rules and Kinesis 2026 Schedule"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
    >
      <div className="flex max-h-[90vh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl border-2 border-[#d4af37] bg-[#061631] text-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-[#d4af37]/40 bg-[#041024] px-6 py-4">
          <div className="flex items-center gap-3">
            <BookOpen className="h-6 w-6 text-amber-300" />
            <div>
              <h2 className="font-display-serif text-xl font-black tracking-wide text-white">
                SPELLING BEE COMPETITION RULES &amp; KINESIS 2026 PROGRAMME
              </h2>
              <p className="text-xs text-amber-200/80">
                Participants: 8 · Trial Run + 3 Rounds · Judge: {COMPETITION_METADATA.judge} · UK English Standard
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close Official Rules Modal"
            className="rounded-lg border border-white/20 p-2 text-slate-300 hover:bg-white/10 hover:text-white cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="grid flex-1 grid-cols-1 gap-6 overflow-y-auto p-6 lg:grid-cols-12">
          {/* Left 7 Cols: Complete Rules from PDF */}
          <div className="space-y-5 lg:col-span-7">
            <div className="rounded-xl border border-[#d4af37]/40 bg-[#041024] p-4">
              <h3 className="font-display-serif text-lg font-black text-amber-300">
                GENERAL RULES (1–11)
              </h3>
              <ol className="mt-2.5 list-decimal space-y-1.5 pl-5 text-xs text-slate-200 sm:text-sm">
                {GENERAL_RULES.map((rule, idx) => (
                  <li key={idx}>{rule}</li>
                ))}
              </ol>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {ROUND_ORDER.map((rId) => {
                const r = ROUNDS_CONFIG[rId];
                return (
                  <div
                    key={r.id}
                    className="rounded-xl border border-[#d4af37]/40 bg-[#041024] p-3.5"
                  >
                    <div className="text-xs font-black text-amber-300">
                      {r.id === 'trial' ? 'PRACTICE DEMO' : `LEVEL ${r.levelNumber}`} · {r.durationSeconds} SECONDS
                    </div>
                    <h4 className="mt-0.5 font-display-serif text-base font-black text-white">
                      {r.title}
                    </h4>
                    <ul className="mt-2 space-y-1 text-xs text-slate-300">
                      {r.bulletRules.map((b, i) => (
                        <li key={i}>• {b}</li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>

            <div className="rounded-xl border border-[#d4af37]/40 bg-[#041024] p-4">
              <h3 className="font-display-serif text-lg font-black text-amber-300">
                ROLE OF JUDGES — {COMPETITION_METADATA.judge.toUpperCase()}
              </h3>
              <ol className="mt-2.5 list-decimal space-y-1.5 pl-5 text-xs text-slate-200 sm:text-sm">
                {JUDGE_ROLES.map((role, idx) => (
                  <li key={idx}>{role}</li>
                ))}
              </ol>
            </div>
          </div>

          {/* Right 5 Cols: Official Uploaded Kinesis 2026 Banner & Programme Schedule Poster */}
          <div className="space-y-4 lg:col-span-5">
            <div className="overflow-hidden rounded-xl border-2 border-[#d4af37] bg-[#041024]">
              <div className="border-b border-[#d4af37]/30 px-3 py-2 text-xs font-extrabold text-amber-300">
                OFFICIAL KINESIS 2026 FESTIVAL BANNER
              </div>
              <img
                src={COMPETITION_METADATA.bannerWideAsset}
                alt="Official Kinesis 2026 Banner"
                referrerPolicy="no-referrer"
                className="w-full object-contain"
              />
            </div>

            <div className="overflow-hidden rounded-xl border-2 border-[#d4af37] bg-[#041024]">
              <div className="border-b border-[#d4af37]/30 px-3 py-2 text-xs font-extrabold text-amber-300">
                ACADEMIC &amp; LITERARY EVENTS SCHEDULE (3RD NOV 2026)
              </div>
              <img
                src={COMPETITION_METADATA.schedulePosterAsset}
                alt="Kinesis 2026 Academic and Literary Events Programme Schedule"
                referrerPolicy="no-referrer"
                className="w-full object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
