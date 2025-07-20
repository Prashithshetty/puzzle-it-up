
import React, { useState } from 'react';
import type { TrueFalsePuzzle } from '../../types';
import { COLORS } from '../../constants';

interface Props {
  puzzle: TrueFalsePuzzle;
  onSolve: (isCorrect: boolean) => void;
  isAnswered: boolean;
}

const TrueFalse: React.FC<Props> = ({ puzzle, onSolve, isAnswered }) => {
    const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null);

    const handleAnswerClick = (answer: boolean) => {
        if (isAnswered) return;
        setSelectedAnswer(answer);
        onSolve(answer === puzzle.correctAnswer);
    };

    const getButtonStateStyles = (isTrueButton: boolean) => {
        const baseColor = isTrueButton ? COLORS.primary.skyBlue : COLORS.primary.coral;
        const answer = isTrueButton;

        if (isAnswered) {
            if (answer === puzzle.correctAnswer) {
                return { backgroundColor: COLORS.feedback.correct, color: COLORS.text.dark, borderColor: '#5cb85c', transform: 'scale(1.05)' };
            }
            if (answer === selectedAnswer) {
                return { backgroundColor: COLORS.feedback.incorrect, color: COLORS.text.dark, borderColor: '#d9534f', opacity: 0.7 };
            }
            return { backgroundColor: '#f0f0f0', color: '#aaa', cursor: 'not-allowed', opacity: 0.6 };
        }
        return { backgroundColor: baseColor, color: COLORS.text.light };
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
                onClick={() => handleAnswerClick(true)}
                disabled={isAnswered}
                style={getButtonStateStyles(true)}
                className={`w-full p-4 md:p-6 text-xl font-semibold rounded-xl border-b-4 transition-all duration-200 disabled:cursor-not-allowed ${!isAnswered ? 'hover:opacity-90 active:scale-95' : ''}`}
            >
                True
            </button>
            <button
                onClick={() => handleAnswerClick(false)}
                disabled={isAnswered}
                style={getButtonStateStyles(false)}
                className={`w-full p-4 md:p-6 text-xl font-semibold rounded-xl border-b-4 transition-all duration-200 disabled:cursor-not-allowed ${!isAnswered ? 'hover:opacity-90 active:scale-95' : ''}`}
            >
                False
            </button>
        </div>
    );
};

export default TrueFalse;
