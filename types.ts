export type PuzzleType = 'MULTIPLE_CHOICE' | 'TRUE_FALSE' | 'FILL_IN_THE_BLANK';

// Base interface that all puzzles share
export interface BasePuzzle {
  puzzleType: PuzzleType;
  question: string;
}

// Interface for Multiple Choice questions
export interface MultipleChoicePuzzle extends BasePuzzle {
  puzzleType: 'MULTIPLE_CHOICE';
  options: string[];
  correctAnswer: string;
}

// Interface for True/False questions
export interface TrueFalsePuzzle extends BasePuzzle {
  puzzleType: 'TRUE_FALSE';
  correctAnswer: boolean;
}

// Interface for Fill in the Blank puzzles
export interface FillInTheBlankPuzzle extends BasePuzzle {
  puzzleType: 'FILL_IN_THE_BLANK';
  sentence: string; // e.g., "The capital of France is ___."
  correctAnswer: string;
}

// A union type representing any possible puzzle
export type Puzzle = MultipleChoicePuzzle | TrueFalsePuzzle | FillInTheBlankPuzzle;

export interface ImagePart {
  mimeType: string;
  data: string; // base64 encoded string
}
