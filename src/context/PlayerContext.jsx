import { useState, createContext, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const PlayerContext = createContext();

export function PlayerProvider({ children }) {
  console.log("PlayerProvider loaded");

  const [playerName, setPlayerName] = useState("Guest");

  // These two now use localStorage instead of plain useState
  const [gamesPlayed, setGamesPlayed] = useLocalStorage("gamesPlayed", 0);
  const [highScores, setHighScores] = useLocalStorage("highScores", []);

  console.log("Current player state:", { playerName, gamesPlayed, highScores });

  return (
    <PlayerContext.Provider
      value={{
        playerName,
        setPlayerName,
        gamesPlayed,
        setGamesPlayed,
        highScores,
        setHighScores,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const context = useContext(PlayerContext);
  console.log("usePlayer hook called, context value:", context);
  return context;
}
