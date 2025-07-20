
import React, { useState, useCallback } from 'react';
import { generatePuzzles } from './services/geminiService';
import type { Puzzle, ImagePart } from './types';
import HomeScreen from './components/HomeScreen';
import PuzzleScreen from './components/PuzzleScreen';
import LoadingSpinner from './components/LoadingSpinner';
import { COLORS } from './constants';

type GameState = 'HOME' | 'GENERATING' | 'PUZZLE' | 'COMPLETED';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>('HOME');
  const [puzzles, setPuzzles] = useState<Puzzle[]>([]);
  const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState(0);
  const [xp, setXp] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const handleGeneratePuzzles = useCallback(async (payload: { text: string; images?: ImagePart[] }) => {
    setGameState('GENERATING');
    setError(null);
    try {
      const generatedPuzzles = await generatePuzzles(payload);
      if (generatedPuzzles && generatedPuzzles.length > 0) {
        setPuzzles(generatedPuzzles);
        setCurrentPuzzleIndex(0);
        setXp(0);
        setGameState('PUZZLE');
      } else {
        setError('Could not generate puzzles from the input. Please try again with different text or clearer images.');
        setGameState('HOME');
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred while communicating with the AI. Please check your connection and API key.');
      setGameState('HOME');
    }
  }, []);

  const handleNextPuzzle = useCallback(() => {
    if (currentPuzzleIndex < puzzles.length - 1) {
      setCurrentPuzzleIndex(prev => prev + 1);
    } else {
      setGameState('COMPLETED');
    }
  }, [currentPuzzleIndex, puzzles.length]);

  const handleCorrectAnswer = useCallback(() => {
    setXp(prevXp => prevXp + 10); // Award 10 XP for each correct answer
  }, []);

  const handleRestart = () => {
    setGameState('HOME');
    setPuzzles([]);
    setCurrentPuzzleIndex(0);
    setXp(0);
    setError(null);
  };

  const renderContent = () => {
    switch (gameState) {
      case 'HOME':
        return <HomeScreen onStart={handleGeneratePuzzles} error={error} />;
      case 'GENERATING':
        return <LoadingSpinner text="Your puzzle master is thinking..." />;
      case 'PUZZLE':
        return (
          <PuzzleScreen
            puzzle={puzzles[currentPuzzleIndex]}
            onCorrectAnswer={handleCorrectAnswer}
            onNextPuzzle={handleNextPuzzle}
            puzzleNumber={currentPuzzleIndex + 1}
            totalPuzzles={puzzles.length}
            xp={xp}
          />
        );
      case 'COMPLETED':
        return (
          <div className="flex flex-col items-center justify-center h-full text-center">
             <h1 className="text-5xl font-bold text-yellow-500 mb-4">You did it!</h1>
             <p className="text-2xl text-slate-700 mb-8">You earned {xp} XP. Great job!</p>
             <button
                onClick={handleRestart}
                style={{ backgroundColor: COLORS.primary.green }}
                className="px-8 py-4 text-white font-bold text-2xl rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-200"
             >
                Play Again
             </button>
          </div>
        );
      default:
        return <HomeScreen onStart={handleGeneratePuzzles} error={error} />;
    }
  };

  return (
    <main style={{ backgroundColor: COLORS.background.softCream }} className="min-h-screen w-full flex items-center justify-center p-4">
      <div style={{ backgroundColor: COLORS.background.skyCloud }} className="w-full max-w-2xl h-[90vh] max-h-[800px] rounded-3xl shadow-2xl p-6 md:p-10 border-4 border-slate-200">
        {renderContent()}
      </div>
    </main>
  );
};

export default App;
