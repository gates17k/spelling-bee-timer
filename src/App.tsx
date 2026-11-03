/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  ROUNDS_CONFIG,
  RoundId,
  formatTimerMMSSMS,
  INITIAL_MEDICAL_WORD_BOX,
  MedicalWordBoxItem,
  clampSpeechRate,
  getCategoryWordPool,
} from './utils/competitionRules';
import {
  soundEngine,
  pronounceBritishEnglish,
  pronounceWordAndMeaningBritishEnglish,
} from './utils/soundEffects';
import { KinesisBannerHeader } from './components/KinesisBannerHeader';
import { RoundProgressionStrip } from './components/RoundProgressionStrip';
import { DigitalStageTimer } from './components/DigitalStageTimer';
import { ActiveRoundRulesFooter } from './components/ActiveRoundRulesFooter';
import {
  CategoryWordManagerModal,
  OfficialRulesAndThemeModal,
} from './components/DrawerModals';

export default function App() {
  // Active Category / Round & Tie-Breaker State (Starts on Trial Run before Round 1)
  const [activeRoundId, setActiveRoundId] = useState<RoundId>('trial');
  const [isTieBreaker, setIsTieBreaker] = useState<boolean>(false);
  const currentRound = ROUNDS_CONFIG[activeRoundId];

  // Timer State (in milliseconds)
  const [remainingMs, setRemainingMs] = useState<number>(currentRound.durationMs);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [msDigits, setMsDigits] = useState<2 | 3>(2);

  // Category Word Box & Pronunciation State
  const [wordBox, setWordBox] = useState<MedicalWordBoxItem[]>(() => INITIAL_MEDICAL_WORD_BOX);
  const [selectedWordId, setSelectedWordId] = useState<string | null>('tr-1');
  const [hasPronouncedCurrentWord, setHasPronouncedCurrentWord] = useState<boolean>(false);
  const [isMeaningVisibleOnStage, setIsMeaningVisibleOnStage] = useState<boolean>(false);
  const [revealSpellingOnStage, setRevealSpellingOnStage] = useState<boolean>(false);

  // Independent Pronunciation Speed Controls for Word and Meaning
  const [wordSpeechRate, setWordSpeechRate] = useState<number>(0.80);
  const [meaningSpeechRate, setMeaningSpeechRate] = useState<number>(0.90);

  // Stage Audio, Fullscreen, and Modals State
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isWordManagerOpen, setIsWordManagerOpen] = useState<boolean>(false);
  const [isRulesOpen, setIsRulesOpen] = useState<boolean>(false);

  // Refs for drift-free countdown
  const endTimeRef = useRef<number | null>(null);
  const lastWholeSecondRef = useRef<number | null>(null);

  // Pronunciation and Clock Synchronization State
  const [isPronouncingBeforeClock, setIsPronouncingBeforeClock] = useState<boolean>(false);
  const cancelSpeechRef = useRef<(() => void) | null>(null);

  // Filter words for the currently active category:
  // - Trial Run: 10 Trial words (CODE #01 to CODE #10)
  // - Round 1, Round 2, Round 3: 50 Finalised Round words (CODE #01 to CODE #50)
  // - Tie-Breaker: 20 Finalised Tie-Breaker words (TB-01 to TB-20)
  const categoryWords = getCategoryWordPool(wordBox, activeRoundId, isTieBreaker);

  const currentWordItem =
    categoryWords.find((w) => w.id === selectedWordId) || categoryWords[0] || null;

  // Format current timer into MM:SS:MS
  const formattedTimer = formatTimerMMSSMS(remainingMs, currentRound.durationMs, msDigits);

  // Request Screen Wake Lock so projector never dims or sleeps
  useEffect(() => {
    let wakeLock: WakeLockSentinel | null = null;
    const requestWakeLock = async () => {
      try {
        if ('wakeLock' in navigator) {
          wakeLock = await navigator.wakeLock.request('screen');
        }
      } catch {
        // Ignore if unsupported
      }
    };
    requestWakeLock();
    return () => {
      wakeLock?.release().catch(() => {});
    };
  }, []);

  // High-precision countdown loop (uses both rAF and 25ms interval)
  useEffect(() => {
    if (!isRunning) {
      endTimeRef.current = null;
      return;
    }

    endTimeRef.current = performance.now() + remainingMs;
    lastWholeSecondRef.current = Math.ceil(remainingMs / 1000);

    const updateClock = () => {
      if (endTimeRef.current === null) return;
      const now = performance.now();
      const nextRemaining = Math.max(0, endTimeRef.current - now);
      setRemainingMs(nextRemaining);

      const wholeSec = Math.ceil(nextRemaining / 1000);
      if (
        wholeSec > 0 &&
        wholeSec <= 10 &&
        wholeSec !== lastWholeSecondRef.current
      ) {
        lastWholeSecondRef.current = wholeSec;
        soundEngine.playTick(wholeSec <= 5);
      }

      if (nextRemaining <= 0) {
        endTimeRef.current = null;
        setIsRunning(false);
        soundEngine.playTimeUpBuzzer();
      }
    };

    const intervalId = window.setInterval(updateClock, 25);
    let rafId = requestAnimationFrame(function tick() {
      updateClock();
      if (endTimeRef.current !== null) {
        rafId = requestAnimationFrame(tick);
      }
    });

    return () => {
      window.clearInterval(intervalId);
      cancelAnimationFrame(rafId);
    };
  }, [isRunning]);

  // Switch Category / Round Handler (Selects first unused Code Number silently without pronouncing)
  const handleSelectRound = useCallback(
    (roundId: RoundId) => {
      cancelSpeechRef.current?.();
      setIsPronouncingBeforeClock(false);
      const targetConfig = ROUNDS_CONFIG[roundId];
      setIsRunning(false);
      endTimeRef.current = null;
      setActiveRoundId(roundId);
      setIsTieBreaker(false);
      setRemainingMs(targetConfig.durationMs);
      setHasPronouncedCurrentWord(false);
      setIsMeaningVisibleOnStage(false);
      setRevealSpellingOnStage(false);

      const pool = getCategoryWordPool(wordBox, roundId, false);
      const firstUnused = pool.find((w) => !w.used) || pool[0];
      setSelectedWordId(firstUnused ? firstUnused.id : null);
    },
    [wordBox]
  );

  // Toggle Tie-Breaker Category Mode (Selects first unused Tie-Breaker Code Number silently)
  const handleToggleTieBreaker = useCallback(() => {
    cancelSpeechRef.current?.();
    setIsPronouncingBeforeClock(false);
    setIsRunning(false);
    endTimeRef.current = null;
    setIsTieBreaker((prev) => {
      const next = !prev;
      const pool = getCategoryWordPool(wordBox, activeRoundId, next);
      const firstUnused = pool.find((w) => !w.used) || pool[0];
      setSelectedWordId(firstUnused ? firstUnused.id : null);
      return next;
    });
    setRemainingMs(currentRound.durationMs);
    setHasPronouncedCurrentWord(false);
    setIsMeaningVisibleOnStage(false);
    setRevealSpellingOnStage(false);
  }, [activeRoundId, currentRound.durationMs, wordBox]);

  // Select a Code Number ONLY (SILENT — does NOT pronounce the word yet; waits for "PRONOUNCE & START CLOCK")
  const handleSelectCodeNumberOnly = useCallback(
    (word: MedicalWordBoxItem) => {
      cancelSpeechRef.current?.();
      setIsPronouncingBeforeClock(false);
      setIsRunning(false);
      endTimeRef.current = null;
      setSelectedWordId(word.id);
      setRemainingMs(currentRound.durationMs);
      setHasPronouncedCurrentWord(false);
      setIsMeaningVisibleOnStage(false);
      setRevealSpellingOnStage(false);
    },
    [currentRound.durationMs]
  );

  // Start / Pause Clock Handler
  const handleStartPause = useCallback(() => {
    if (isPronouncingBeforeClock) {
      cancelSpeechRef.current?.();
      setIsPronouncingBeforeClock(false);
      return;
    }
    setIsRunning((prev) => {
      if (!prev) {
        if (remainingMs <= 0) {
          setRemainingMs(currentRound.durationMs);
        }
        soundEngine.playStartBell();
        return true;
      }
      return false;
    });
  }, [remainingMs, currentRound.durationMs, isPronouncingBeforeClock]);

  // Reset Clock Handler
  const handleReset = useCallback(() => {
    cancelSpeechRef.current?.();
    setIsPronouncingBeforeClock(false);
    setIsRunning(false);
    endTimeRef.current = null;
    setRemainingMs(currentRound.durationMs);
  }, [currentRound.durationMs]);

  // UK English Software Pronouncer Handlers (Repeat / Slow Repeat)
  const handlePronounceWord = useCallback(
    (rate?: number) => {
      if (!currentWordItem) return;
      const effectiveRate = clampSpeechRate(rate ?? wordSpeechRate);
      setHasPronouncedCurrentWord(true);
      cancelSpeechRef.current?.();
      cancelSpeechRef.current = pronounceBritishEnglish(
        currentWordItem.ttsWord || currentWordItem.britishSpelling.toLowerCase(),
        effectiveRate
      );
    },
    [currentWordItem, wordSpeechRate]
  );

  // Rule 2 & 7: Pronounce the selected Code Number's word in UK English at wordSpeechRate.
  // The countdown clock starts ONLY after the word has been pronounced fully, giving contestants their complete allotted time.
  const handlePronounceAndStartClock = useCallback(() => {
    if (!currentWordItem || isPronouncingBeforeClock) return;

    // Cancel any prior speech utterance
    cancelSpeechRef.current?.();

    // Mark lot code as used immediately (Rule 7: used status)
    setWordBox((prev) =>
      prev.map((w) => (w.id === currentWordItem.id ? { ...w, used: true } : w))
    );

    // Update stage word locked state and hide spelling
    setHasPronouncedCurrentWord(true);
    setRevealSpellingOnStage(false);
    setIsMeaningVisibleOnStage(false);

    // Keep clock in ready state at full allotted duration until speech completes
    setIsRunning(false);
    endTimeRef.current = null;
    setRemainingMs(currentRound.durationMs);
    setIsPronouncingBeforeClock(true);

    // Pre-initialize AudioContext so start bell plays instantly with zero lag
    soundEngine.initAudioContext();

    const wordToSpeak = currentWordItem.ttsWord || currentWordItem.britishSpelling.toLowerCase();

    // Pronounce the word in UK English; countdown timer commences precisely on speech completion
    cancelSpeechRef.current = pronounceBritishEnglish(
      wordToSpeak,
      wordSpeechRate,
      () => {
        setIsPronouncingBeforeClock(false);
        soundEngine.playStartBell();
        setRemainingMs(currentRound.durationMs);
        endTimeRef.current = performance.now() + currentRound.durationMs;
        setIsRunning(true);
      }
    );
  }, [currentWordItem, isPronouncingBeforeClock, currentRound.durationMs, wordSpeechRate]);

  // Rule 4 & 5: Speak meaning at meaningSpeechRate (inclusive of allotted time)
  const handlePronounceMeaning = useCallback(() => {
    if (!currentWordItem) return;
    setHasPronouncedCurrentWord(true);
    setIsMeaningVisibleOnStage(true);
    cancelSpeechRef.current?.();
    cancelSpeechRef.current = pronounceWordAndMeaningBritishEnglish(
      currentWordItem.ttsWord || currentWordItem.britishSpelling.toLowerCase(),
      currentWordItem.meaning,
      wordSpeechRate,
      meaningSpeechRate
    );
  }, [currentWordItem, wordSpeechRate, meaningSpeechRate]);

  // Toggle Word Used / Available status (manual operator override or lot draw sync)
  const handleToggleWordUsed = useCallback((wordId: string) => {
    setWordBox((prev) =>
      prev.map((w) => (w.id === wordId ? { ...w, used: !w.used } : w))
    );
  }, []);

  // Toggle Fullscreen
  const handleToggleFullscreen = useCallback(async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
        setIsFullscreen(true);
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch {
      setIsFullscreen((prev) => !prev);
    }
  }, []);

  // Keyboard shortcuts for stage operator (Space = Start/Pause, R = Reset, P = Pronounce, 0/1/2/3 = Categories)
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;

      if (e.code === 'Space') {
        e.preventDefault();
        handleStartPause();
      } else if (e.key === 'r' || e.key === 'R') {
        e.preventDefault();
        handleReset();
      } else if (e.key === 'p' || e.key === 'P') {
        e.preventDefault();
        handlePronounceWord();
      } else if (e.key === '0') {
        handleSelectRound('trial');
      } else if (e.key === '1') {
        handleSelectRound('round1');
      } else if (e.key === '2') {
        handleSelectRound('round2');
      } else if (e.key === '3') {
        handleSelectRound('round3');
      } else if (e.key === 't' || e.key === 'T') {
        handleToggleTieBreaker();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [
    handleStartPause,
    handleReset,
    handlePronounceWord,
    handleSelectRound,
    handleToggleTieBreaker,
  ]);

  return (
    <div className="min-h-screen w-screen bg-[#020813] text-white flex items-center justify-center overflow-x-hidden p-0 sm:p-1">
      {/* 16:9 Landscape Stage Banner Container - Adaptive to any viewport */}
      <div
        data-testid="landscape-16-9-banner"
        className="relative w-full max-w-[min(100vw,calc(100vh*16/9))] h-screen max-h-screen bg-gradient-to-b from-[#041022] via-[#071d3d] to-[#030b18] border-2 border-[#d4af37] shadow-[0_0_70px_rgba(0,0,0,0.95)] flex flex-col justify-between overflow-y-auto"
      >
        {/* 1. KINESIS 2026 SHILLONG MEDICAL COLLEGE HEADER BANNER */}
        <KinesisBannerHeader
          isFullscreen={isFullscreen}
          onToggleFullscreen={handleToggleFullscreen}
          isMuted={isMuted}
          onToggleMute={() => {
            soundEngine.isMuted = !isMuted;
            setIsMuted(!isMuted);
          }}
          onOpenWordManager={() => setIsWordManagerOpen(true)}
          onOpenRules={() => setIsRulesOpen(true)}
        />

        {/* Main Competition Projection Stage */}
        <main className="flex-1 flex flex-col justify-between min-h-0">
          {/* 2. CATEGORY / ROUND PROGRESSION & HIGHLIGHTED CURRENT LEVEL BANNER */}
          <RoundProgressionStrip
            activeRoundId={activeRoundId}
            isTieBreaker={isTieBreaker}
            onSelectRound={handleSelectRound}
            onToggleTieBreaker={handleToggleTieBreaker}
          />

          {/* 3. CENTERPIECE PITCH-BLACK & RED DIGITAL TIMER (MM:SS:MS) & UK ENGLISH PRONOUNCER */}
          <DigitalStageTimer
            round={currentRound}
            isTieBreaker={isTieBreaker}
            timer={formattedTimer}
            isRunning={isRunning}
            msDigits={msDigits}
            onToggleMsDigits={() => setMsDigits((prev) => (prev === 2 ? 3 : 2))}
            onStartPause={handleStartPause}
            onReset={handleReset}
            currentWordItem={currentWordItem}
            hasPronouncedCurrentWord={hasPronouncedCurrentWord}
            isPronouncingBeforeClock={isPronouncingBeforeClock}
            isMeaningVisibleOnStage={isMeaningVisibleOnStage}
            revealSpellingOnStage={revealSpellingOnStage}
            onToggleRevealSpelling={() => setRevealSpellingOnStage((prev) => !prev)}
            wordSpeechRate={wordSpeechRate}
            meaningSpeechRate={meaningSpeechRate}
            onPronounceWord={handlePronounceWord}
            onPronounceAndStartClock={handlePronounceAndStartClock}
            onPronounceMeaning={handlePronounceMeaning}
            onToggleWordUsed={handleToggleWordUsed}
          />

          {/* 4. INTERACTIVE CATEGORY CODE NUMBER LOT DECK + WORD & MEANING SPEED CONTROLS */}
          <ActiveRoundRulesFooter
            round={currentRound}
            isTieBreaker={isTieBreaker}
            categoryWords={categoryWords}
            selectedWordId={currentWordItem?.id ?? null}
            hasPronouncedCurrentWord={hasPronouncedCurrentWord}
            onSelectCodeNumberOnly={handleSelectCodeNumberOnly}
            onToggleWordUsed={handleToggleWordUsed}
            wordSpeechRate={wordSpeechRate}
            meaningSpeechRate={meaningSpeechRate}
            onChangeWordSpeechRate={setWordSpeechRate}
            onChangeMeaningSpeechRate={setMeaningSpeechRate}
          />
        </main>
      </div>

      {/* Modals for Category Word Management and Official Rules */}
      <CategoryWordManagerModal
        isOpen={isWordManagerOpen}
        onClose={() => setIsWordManagerOpen(false)}
        wordBox={wordBox}
        wordSpeechRate={wordSpeechRate}
        meaningSpeechRate={meaningSpeechRate}
        onChangeWordSpeechRate={setWordSpeechRate}
        onChangeMeaningSpeechRate={setMeaningSpeechRate}
        onToggleWordUsed={handleToggleWordUsed}
        onAddCustomWord={(newWord) => {
          const id = `custom-${Date.now()}`;
          const created: MedicalWordBoxItem = { ...newWord, id, used: false };
          setWordBox((prev) => [...prev, created]);
          setSelectedWordId(id);
          setHasPronouncedCurrentWord(false);
          setIsMeaningVisibleOnStage(false);
          setRevealSpellingOnStage(false);
        }}
        onSelectWordForStage={(item) => {
          if (item.isTieBreaker) {
            setIsTieBreaker(true);
          } else if (item.roundId === 'trial') {
            setActiveRoundId('trial');
            setRemainingMs(ROUNDS_CONFIG.trial.durationMs);
            setIsTieBreaker(false);
          } else {
            if (activeRoundId === 'trial') {
              setActiveRoundId('round1');
              setRemainingMs(ROUNDS_CONFIG.round1.durationMs);
            }
            setIsTieBreaker(false);
          }
          setIsRunning(false);
          endTimeRef.current = null;
          setSelectedWordId(item.id);
          setHasPronouncedCurrentWord(false);
          setIsMeaningVisibleOnStage(false);
          setRevealSpellingOnStage(false);
        }}
      />

      <OfficialRulesAndThemeModal
        isOpen={isRulesOpen}
        onClose={() => setIsRulesOpen(false)}
      />
    </div>
  );
}
