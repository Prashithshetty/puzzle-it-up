
import React from 'react';
import type { Puzzle } from '../types';
import MultipleChoice from './puzzles/MultipleChoice';
import TrueFalse from './puzzles/TrueFalse';
import FillInTheBlank from './puzzles/FillInTheBlank';

interface PuzzleRendererProps {
  puzzle: Puzzle;
  onSolve: (isCorrect: boolean) => void;
  isAnswered: boolean;
  isCorrect: boolean | null;
}

const PuzzleRenderer: React.FC<PuzzleRendererProps> = ({ puzzle, onSolve, isAnswered, isCorrect }) => {
  switch (puzzle.puzzleType) {
    case 'MULTIPLE_CHOICE':
      return <MultipleChoice puzzle={puzzle} onSolve={onSolve} isAnswered={isAnswered} />;
    case 'TRUE_FALSE':
      return <TrueFalse puzzle={puzzle} onSolve={onSolve} isAnswered={isAnswered} />;
    case 'FILL_IN_THE_BLANK':
        return <FillInTheBlank puzzle={puzzle} onSolve={onSolve} isAnswered={isAnswered} isCorrect={isCorrect} />;
    default:
      // This should not happen with proper typing, but it's a good fallback.
      const exhaustiveCheck: never = puzzle;
      console.error(`Unknown puzzle type: ${exhaustiveCheck}`);
      return <div className="text-red-500">Error: Unknown puzzle type!</div>;
  }
};

export default PuzzleRenderer;
