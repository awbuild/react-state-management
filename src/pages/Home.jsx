import { useNavigate } from "react-router-dom";
import { useGame } from "../context/GameContext";
import { usePlayer } from "../context/PlayerContext";

export default function Home() {
  console.log("Home page loaded");

  const navigate = useNavigate();
  const { difficulty, setDifficulty } = useGame();
  const { playerName, gamesPlayed, highScores } = usePlayer();

  const difficultyOptions = [
    { name: "EASY", pairs: 4, time: 90, emoji: "😊" },
    { name: "MEDIUM", pairs: 8, time: 60, emoji: "🤔" },
    { name: "HARD", pairs: 12, time: 45, emoji: "😤" },
  ];

  function handleDifficultySelect(selectedDifficulty) {
    console.log("Difficulty selected:", selectedDifficulty);
    setDifficulty(selectedDifficulty);
  }

  function handleStartGame() {
    console.log("Start game clicked, difficulty:", difficulty);
    navigate("/game");
  }

  const bestScore =
    highScores.length > 0
      ? Math.max(
          ...highScores.map(function (scoreObj) {
            return scoreObj.score;
          }),
        )
      : 0;
  console.log("Best score calculated:", bestScore);

  return (
    <div className="home-page">
      <h1>🧠 Memory Master</h1>
      <p>Welcome back, {playerName}!</p>

      {/* Player stats */}
      <div className="stats-row">
        <div className="stat-box">
          <p>Games Played</p>
          <h2>{gamesPlayed}</h2>
        </div>
        <div className="stat-box">
          <p>Best Score</p>
          <h2>{bestScore}</h2>
        </div>
        <div className="stat-box">
          <p>Achievements</p>
          <h2>0</h2>
        </div>
      </div>

      {/* Difficulty selector */}
      <h2>Choose Your Challenge</h2>
      <div className="difficulty-row">
        {difficultyOptions.map(function (option) {
          return (
            <div
              key={option.name}
              className={
                difficulty === option.name
                  ? "difficulty-card selected"
                  : "difficulty-card"
              }
              onClick={function () {
                handleDifficultySelect(option.name);
              }}
            >
              <p>{option.emoji}</p>
              <h3>{option.name}</h3>
              <p>{option.pairs} pairs</p>
              <p>{option.time}s timer</p>
            </div>
          );
        })}
      </div>

      <p>
        Selected: <strong>{difficulty}</strong>
      </p>

      <button onClick={handleStartGame}>Start Game 🚀</button>
    </div>
  );
}
