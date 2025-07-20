
import React, { useState, useEffect } from 'react';
import type { Puzzle } from '../types';
import ProgressBar from './ProgressBar';
import XPBar from './XPBar';
import PuzzleRenderer from './PuzzleRenderer';
import { COLORS } from '../constants';

interface PuzzleScreenProps {
  puzzle: Puzzle;
  onCorrectAnswer: () => void;
  onNextPuzzle: () => void;
  puzzleNumber: number;
  totalPuzzles: number;
  xp: number;
}

const PuzzleScreen: React.FC<PuzzleScreenProps> = ({
  puzzle,
  onCorrectAnswer,
  onNextPuzzle,
  puzzleNumber,
  totalPuzzles,
  xp,
}) => {
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  useEffect(() => {
    setIsAnswered(false);
    setIsCorrect(null);
  }, [puzzle]);

  const handleSolve = (correct: boolean) => {
    setIsAnswered(true);
    setIsCorrect(correct);
    if (correct) {
      onCorrectAnswer();
    }
  };
  
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-4 gap-4">
        <ProgressBar current={puzzleNumber} total={totalPuzzles} />
        <XPBar xp={xp} />
      </div>
      
      <div style={{ backgroundColor: COLORS.background.mintMist }} className="flex-grow flex flex-col items-center justify-center text-center p-4 rounded-2xl mb-6">
        <h2 style={{ color: COLORS.text.dark }} className="text-2xl md:text-3xl font-bold">
          {puzzle.question}
        </h2>
      </div>

      <PuzzleRenderer puzzle={puzzle} onSolve={handleSolve} isAnswered={isAnswered} isCorrect={isCorrect} />

      {isAnswered && (
         <div className="mt-auto pt-6 text-center">
          <button
            onClick={onNextPuzzle}
            style={{ 
              backgroundColor: isCorrect ? COLORS.feedback.correct : COLORS.primary.skyBlue,
              color: isCorrect ? COLORS.text.dark : COLORS.text.light
            }}
            className={`w-full md:w-auto px-10 py-3 text-xl font-bold rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-200`}
          >
            {puzzleNumber === totalPuzzles ? 'Finish' : 'Next'}
          </button>
        </div>
      )}
    </div>
  );
};

export default PuzzleScreen;
