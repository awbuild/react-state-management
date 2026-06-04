import { useState, useEffect } from "react";

export function useTimer(startingTime, onTimeUp) {
  console.log("useTimer hook called, startingTime:", startingTime);

  const [timeRemaining, setTimeRemaining] = useState(startingTime);
  const [isRunning, setIsRunning] = useState(false);

  console.log("timeRemaining:", timeRemaining, "isRunning:", isRunning);

  // This effect runs the countdown
  useEffect(
    function () {
      console.log(
        "useTimer useEffect running, isRunning:",
        isRunning,
        "timeRemaining:",
        timeRemaining,
      );

      // If the timer is not running, do nothing
      if (isRunning === false) {
        return;
      }

      // If time has run out, call the onTimeUp function
      if (timeRemaining <= 0) {
        console.log("Time is up!");
        setIsRunning(false);
        onTimeUp();
        return;
      }

      // Set an interval to count down every second
      const interval = setInterval(function () {
        setTimeRemaining(function (previousTime) {
          console.log("Counting down, previousTime:", previousTime);
          return previousTime - 1;
        });
      }, 1000);

      // Cleanup - cancel the interval when the effect reruns or component unmounts
      return function () {
        console.log("Clearing interval");
        clearInterval(interval);
      };
    },
    [isRunning, timeRemaining],
  );

  function startTimer() {
    console.log("startTimer called");
    setIsRunning(true);
  }

  function stopTimer() {
    console.log("stopTimer called");
    setIsRunning(false);
  }

  function resetTimer() {
    console.log("resetTimer called, resetting to:", startingTime);
    setTimeRemaining(startingTime);
    setIsRunning(false);
  }

  return { timeRemaining, isRunning, startTimer, stopTimer, resetTimer };
}
