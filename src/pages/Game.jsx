import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGame } from "../context/GameContext";
import { useTimer } from "../hooks/useTimer";
import { useFetch } from "../hooks/useFetch";
import ScoreDisplay from "../components/ScoreDisplay";

const themeSets = {
  Nature: [
    "🌲",
    "🌸",
    "🍀",
    "🌻",
    "🍁",
    "🌊",
    "🏔️",
    "🌈",
    "🌙",
    "🌺",
    "🍄",
    "🦋",
  ],
  Animals: [
    "🐶",
    "🐱",
    "🐭",
    "🐹",
    "🐰",
    "🦊",
    "🐻",
    "🐼",
    "🐨",
    "🐯",
    "🦁",
    "🐮",
  ],
  Food: [
    "🍕",
    "🍔",
    "🌮",
    "🍜",
    "🍣",
    "🍩",
    "🍦",
    "🍉",
    "🍇",
    "🍓",
    "🥑",
    "🌽",
  ],
  Space: [
    "🚀",
    "🌙",
    "⭐",
    "🪐",
    "☄️",
    "🛸",
    "🌍",
    "🔭",
    "👨‍🚀",
    "🌟",
    "💫",
    "🌌",
  ],
  Ocean: [
    "🐠",
    "🐙",
    "🦈",
    "🐬",
    "🦀",
    "🐡",
    "🦞",
    "🐳",
    "🦑",
    "🐚",
    "🌊",
    "⚓",
  ],
  Sports: [
    "⚽",
    "🏀",
    "🎾",
    "🏈",
    "⚾",
    "🥊",
    "🏊",
    "🚴",
    "🎿",
    "🏋️",
    "🤸",
    "🎯",
  ],
  Music: [
    "🎸",
    "🎹",
    "🥁",
    "🎺",
    "🎻",
    "🎵",
    "🎤",
    "🎧",
    "🪗",
    "🎷",
    "🪘",
    "🎼",
  ],
  Travel: [
    "✈️",
    "🗼",
    "🗽",
    "🏰",
    "🗿",
    "🏝️",
    "🌁",
    "🎡",
    "🏜️",
    "🗺️",
    "🧳",
    "🚂",
  ],
};

function buildCardsFromImages(imageList, numberOfPairs) {
  console.log("buildCardsFromImages called, numberOfPairs:", numberOfPairs);
  const selectedImages = imageList.slice(0, numberOfPairs);
  const pairedImages = [...selectedImages, ...selectedImages];
  const shuffled = pairedImages.sort(function () {
    return Math.random() - 0.5;
  });
  const cards = shuffled.map(function (image, index) {
    return {
      id: index,
      imageUrl: image.download_url,
      imageId: image.id,
      isFlipped: false,
      isMatched: false,
    };
  });
  console.log("Final cards from images:", cards);
  return cards;
}

export default function Game() {
  console.log("Game page loaded");

  const navigate = useNavigate();
  const { difficulty, score, setScore, setGameStatus } = useGame();

  const difficultySettings = {
    EASY: { pairs: 4, time: 90 },
    MEDIUM: { pairs: 8, time: 60 },
    HARD: { pairs: 12, time: 45 },
  };

  const currentSettings =
    difficultySettings[difficulty] || difficultySettings["MEDIUM"];
  console.log("Current settings:", currentSettings);

  const apiUrl = "https://picsum.photos/v2/list?page=1&limit=20";
  const { data: imageData, isLoading, error } = useFetch(apiUrl);

  console.log("imageData:", imageData);
  console.log("isLoading:", isLoading);
  console.log("error:", error);

  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [isChecking, setIsChecking] = useState(false);

  useEffect(
    function () {
      console.log("imageData useEffect running, imageData:", imageData);
      if (imageData && imageData.length > 0) {
        console.log("Images loaded, building cards");
        const newCards = buildCardsFromImages(imageData, currentSettings.pairs);
        setCards(newCards);
      }
    },
    [imageData],
  );

  function handleTimeUp() {
    console.log("Time is up! Navigating to game over");
    setGameStatus("gameOver");
    navigate("/gameover");
  }

  const { timeRemaining, isRunning, startTimer, stopTimer } = useTimer(
    currentSettings.time,
    handleTimeUp,
  );

  useEffect(function () {
    console.log("Game page mounted - starting timer");
    startTimer();
    return function () {
      console.log("Game page unmounted - stopping timer");
      stopTimer();
    };
  }, []);

  function handleCardClick(clickedCard) {
    console.log("Card clicked:", clickedCard);

    if (isChecking) {
      console.log("Currently checking a pair, ignoring click");
      return;
    }
    if (clickedCard.isMatched) {
      console.log("Card already matched, ignoring click");
      return;
    }
    if (clickedCard.isFlipped) {
      console.log("Card already flipped, ignoring click");
      return;
    }

    const updatedCards = cards.map(function (card) {
      if (card.id === clickedCard.id) {
        return { ...card, isFlipped: true };
      }
      return card;
    });
    setCards(updatedCards);

    const newFlippedCards = [...flippedCards, clickedCard];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      console.log("Two cards flipped, checking for match...");
      setIsChecking(true);
      checkForMatch(newFlippedCards, updatedCards);
    }
  }

  function checkForMatch(twoCards, currentCards) {
    const firstCard = twoCards[0];
    const secondCard = twoCards[1];
    console.log(
      "Checking match between imageId:",
      firstCard.imageId,
      "and",
      secondCard.imageId,
    );

    if (firstCard.imageId === secondCard.imageId) {
      console.log("MATCH FOUND!");

      const cardsAfterMatch = currentCards.map(function (card) {
        if (card.id === firstCard.id || card.id === secondCard.id) {
          return { ...card, isMatched: true };
        }
        return card;
      });

      setCards(cardsAfterMatch);

      const newMatchedPairs = matchedPairs + 1;
      setMatchedPairs(newMatchedPairs);
      console.log("New matched pairs count:", newMatchedPairs);

      setScore(function (previousScore) {
        console.log("Adding 10 points, previous score:", previousScore);
        return previousScore + 10;
      });

      setFlippedCards([]);
      setIsChecking(false);

      if (newMatchedPairs === currentSettings.pairs) {
        console.log("ALL PAIRS MATCHED - game over!");
        setGameStatus("gameOver");
        navigate("/gameover");
      }
    } else {
      console.log("No match, flipping cards back over");

      setTimeout(function () {
        const cardsFlippedBack = currentCards.map(function (card) {
          if (card.id === firstCard.id || card.id === secondCard.id) {
            return { ...card, isFlipped: false };
          }
          return card;
        });

        setCards(cardsFlippedBack);
        setFlippedCards([]);
        setIsChecking(false);
        console.log("Cards flipped back");
      }, 1000);
    }
  }

  if (isLoading) {
    return (
      <div className="game-page">
        <h1>Memory Master</h1>
        <p>Loading images...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="game-page">
        <h1>Memory Master</h1>
        <p>Error loading images: {error}</p>
        <button
          onClick={function () {
            navigate("/");
          }}
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="game-page">
      <h1>Memory Master</h1>

      <ScoreDisplay
        score={score}
        timeRemaining={timeRemaining}
        matchedPairs={matchedPairs}
        totalPairs={currentSettings.pairs}
        difficulty={difficulty}
      />

      <div className="card-grid">
        {cards.map(function (card) {
          return (
            <div
              key={card.id}
              className={
                card.isMatched
                  ? "card matched"
                  : card.isFlipped
                    ? "card flipped"
                    : "card"
              }
              onClick={function () {
                handleCardClick(card);
              }}
            >
              {card.isFlipped || card.isMatched ? (
                <img
                  src={card.imageUrl}
                  alt="memory card"
                  width="80"
                  height="80"
                />
              ) : (
                <p>?</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}