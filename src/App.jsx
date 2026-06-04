import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Game from "./pages/Game";
import GameOver from "./pages/GameOver";
import Leaderboard from "./pages/Leaderboard";
import { GameProvider } from "./context/GameContext";
import { PlayerProvider } from "./context/PlayerContext";
import Navigation from "./components/Navigation";

function App() {
  console.log("App component loaded");

  return (
    <PlayerProvider>
      <GameProvider>
        <BrowserRouter>
          <Navigation />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/game" element={<Game />} />
            <Route path="/gameover" element={<GameOver />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
          </Routes>
        </BrowserRouter>
      </GameProvider>
    </PlayerProvider>
  );
}

export default App;
