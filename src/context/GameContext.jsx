import { useState, createContext, useContext } from "react";

const GameContext = createContext();

export function GameProvider({ children }) {
  console.log("GameProvider loaded");

  const [gameStatus, setGameStatus] = useState("idle");
  const [score, setScore] = useState(0);
  const [difficulty, setDifficulty] = useState("MEDIUM");
  const [timeRemaining, setTimeRemaining] = useState(60);

  // Add selected theme here so Game page can read it
  const [selectedTheme, setSelectedTheme] = useState("Nature");

  console.log("Current game state:", {
    gameStatus,
    score,
    difficulty,
    timeRemaining,
    selectedTheme,
  });

  return (
    <GameContext.Provider
      value={{
        gameStatus,
        setGameStatus,
        score,
        setScore,
        difficulty,
        setDifficulty,
        timeRemaining,
        setTimeRemaining,
        selectedTheme,
        setSelectedTheme,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  console.log("useGame hook called, context value:", context);
  return context;
}
