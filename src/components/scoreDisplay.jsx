export default function ScoreDisplay({
  score,
  timeRemaining,
  matchedPairs,
  totalPairs,
  difficulty,
}) {
  console.log(
    "ScoreDisplay component loaded, score:",
    score,
    "timeRemaining:",
    timeRemaining,
  );

  return (
    <div className="score-display-bar">
      <p>
        Difficulty: <strong>{difficulty}</strong>
      </p>
      <p>
        Score: <strong>{score}</strong>
      </p>
      <p>
        Time: <strong>{timeRemaining}s</strong>
      </p>
      <p>
        Pairs:{" "}
        <strong>
          {matchedPairs} / {totalPairs}
        </strong>
      </p>
    </div>
  );
}
