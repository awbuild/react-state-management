import { Link } from "react-router-dom";

export default function Navigation() {
  console.log("Navigation component loaded");

  return (
    <nav>
      <Link to="/">Home</Link>
      {" | "}
      <Link to="/game">Game</Link>
      {" | "}
      <Link to="/gameover">Game Over</Link>
      {" | "}
      <Link to="/leaderboard">Leaderboard</Link>
    </nav>
  );
}
