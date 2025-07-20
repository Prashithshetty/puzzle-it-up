
import React, { useState } from 'react';
import type { FillInTheBlankPuzzle } from '../../types';
import Button from '../Button';
import { COLORS } from '../../constants';

interface Props {
  puzzle: FillInTheBlankPuzzle;
  onSolve: (isCorrect: boolean) => void;
  isAnswered: boolean;
  isCorrect: boolean | null;
}

const FillInTheBlank: React.FC<Props> = ({ puzzle, onSolve, isAnswered, isCorrect }) => {
  const [userAnswer, setUserAnswer] = useState('');

  const handleSubmit = () => {
    if (isAnswered || !userAnswer.trim()) return;
    const isCorrect = userAnswer.trim().toLowerCase() === puzzle.correctAnswer.toLowerCase();
    onSolve(isCorrect);
  };

  const sentenceWithInput = puzzle.sentence.replace('___', '______');

  const getInputStyles = (): React.CSSProperties => {
      if (!isAnswered) {
          return {};
      }
      return {
          backgroundColor: isCorrect ? COLORS.background.mintMist : '#FFEBEF',
          borderColor: isCorrect ? COLORS.feedback.correct : COLORS.feedback.incorrect,
          color: COLORS.text.dark,
          boxShadow: `0 0 0 3px ${isCorrect ? 'rgba(144, 238, 144, 0.5)' : 'rgba(255, 182, 193, 0.6)'}`
      };
  };
  
  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <p className="text-xl md:text-2xl text-slate-700 font-medium tracking-wide">
        {sentenceWithInput}
      </p>
      <input
        type="text"
        value={userAnswer}
        onChange={(e) => setUserAnswer(e.target.value)}
        disabled={isAnswered}
        onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
        placeholder="Type your answer"
        style={getInputStyles()}
        className="w-full max-w-sm p-4 border-2 border-gray-300 rounded-2xl text-lg text-center focus:ring-4 focus:ring-yellow-300/50 focus:border-yellow-400 transition-all duration-300 disabled:opacity-90"
      />
      {!isAnswered && (
          <Button 
            onClick={handleSubmit}
            text="Check Answer"
            disabled={!userAnswer.trim()}
            color={COLORS.primary.green}
          />
      )}
    </div>
  );
};

export default FillInTheBlank;
