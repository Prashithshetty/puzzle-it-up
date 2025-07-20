
import React, { useState } from 'react';
import type { MultipleChoicePuzzle } from '../../types';
import { COLORS, PRIMARY_COLORS_CYCLE } from '../../constants';

interface Props {
  puzzle: MultipleChoicePuzzle;
  onSolve: (isCorrect: boolean) => void;
  isAnswered: boolean;
}

const MultipleChoice: React.FC<Props> = ({ puzzle, onSolve, isAnswered }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const handleAnswerClick = (option: string) => {
    if (isAnswered) return;
    setSelectedAnswer(option);
    onSolve(option === puzzle.correctAnswer);
  };

  const getButtonStateStyles = (option: string, baseColor: string) => {
    if (isAnswered) {
      if (option === puzzle.correctAnswer) {
        return { backgroundColor: COLORS.feedback.correct, color: COLORS.text.dark, borderColor: '#5cb85c', transform: 'scale(1.05)' };
      }
      if (option === selectedAnswer) {
        return { backgroundColor: COLORS.feedback.incorrect, color: COLORS.text.dark, borderColor: '#d9534f', opacity: 0.7 };
      }
      return { backgroundColor: '#f0f0f0', color: '#aaa', cursor: 'not-allowed', opacity: 0.6 };
    }
    return { backgroundColor: baseColor, color: COLORS.text.light };
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {puzzle.options.map((option, index) => {
        const baseColor = PRIMARY_COLORS_CYCLE[index % PRIMARY_COLORS_CYCLE.length];
        const styles = getButtonStateStyles(option, baseColor);

        return (
          <button
            key={option}
            onClick={() => handleAnswerClick(option)}
            disabled={isAnswered}
            style={styles}
            className={`w-full p-4 md:p-5 text-lg font-semibold rounded-xl border-b-4 transition-all duration-200 disabled:cursor-not-allowed ${!isAnswered ? 'hover:opacity-90 active:scale-95' : ''}`}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
};

export default MultipleChoice;
