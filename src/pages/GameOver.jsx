import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGame } from "../context/GameContext";
import { usePlayer } from "../context/PlayerContext";

export default function GameOver() {
  console.log("GameOver page loaded");

  const navigate = useNavigate();
  const { score, setScore, setGameStatus, difficulty } = useGame();
  const { gamesPlayed, setGamesPlayed, highScores, setHighScores } =
    usePlayer();

  console.log("Final score:", score);
  console.log("Current high scores:", highScores);

  // When this page loads, save the score and update games played
  useEffect(function () {
    console.log("GameOver useEffect running - saving score");

    // Add 1 to games played
    const newGamesPlayed = gamesPlayed + 1;
    setGamesPlayed(newGamesPlayed);
    console.log("Games played updated to:", newGamesPlayed);

    // Build a new score object to save
    const newScoreObject = {
      score: score,
      difficulty: difficulty,
      date: new Date().toLocaleDateString(),
    };
    console.log("New score object:", newScoreObject);

    // Add it to the high scores array immutably
    const updatedHighScores = [...highScores, newScoreObject];
    console.log("Updated high scores array:", updatedHighScores);
    setHighScores(updatedHighScores);
  }, []);
  // The empty array means this useEffect only runs once when the page loads

  function handlePlayAgain() {
    console.log("Play again clicked - resetting game state");
    setScore(0);
    setGameStatus("idle");
    navigate("/");
  }

  function handleViewLeaderboard() {
    console.log("View leaderboard clicked");
    navigate("/leaderboard");
  }

  // Find the best score from all saved scores
  const bestScore =
    highScores.length > 0
      ? Math.max(
          ...highScores.map(function (scoreObj) {
            return scoreObj.score;
          }),
        )
      : 0;
  console.log("Best score so far:", bestScore);

  const isNewHighScore = score > bestScore;
  console.log("Is new high score:", isNewHighScore);

  return (
    <div className="gameover-page">
      <h1>Game Over!</h1>

      {isNewHighScore && <p>🏆 New High Score!</p>}

      <div className="score-display">
        <p>Your Score</p>
        <h2>{score}</h2>
      </div>

      <div className="score-display">
        <p>Best Score</p>
        <h2>{bestScore}</h2>
      </div>

      <p>Difficulty: {difficulty}</p>

      <button onClick={handlePlayAgain}>Play Again</button>
      <button onClick={handleViewLeaderboard}>View Leaderboard</button>
    </div>
  );
}
