import { useNavigate } from "react-router-dom";
import { usePlayer } from "../context/PlayerContext";

export default function Leaderboard() {
  console.log("Leaderboard page loaded");

  const navigate = useNavigate();
  const { highScores, gamesPlayed } = usePlayer();

  console.log("High scores on leaderboard:", highScores);
  console.log("Games played:", gamesPlayed);

  // Sort the scores from highest to lowest
  const sortedScores = [...highScores].sort(function (a, b) {
    return b.score - a.score;
  });
  console.log("Sorted scores:", sortedScores);

  function handlePlayAgain() {
    console.log("Play again clicked from leaderboard");
    navigate("/");
  }

  return (
    <div className="leaderboard-page">
      <h1>🏆 Leaderboard</h1>
      <p>Total games played: {gamesPlayed}</p>

      {sortedScores.length === 0 && (
        <p>No scores yet! Play a game to get on the board.</p>
      )}

      {sortedScores.length > 0 && (
        <div className="scores-list">
          {sortedScores.map(function (scoreObj, index) {
            return (
              <div key={index} className="score-row">
                <p>#{index + 1}</p>
                <p>{scoreObj.score} points</p>
                <p>{scoreObj.difficulty}</p>
                <p>{scoreObj.date}</p>
              </div>
            );
          })}
        </div>
      )}

      <button onClick={handlePlayAgain}>Play Again</button>
    </div>
  );
}
