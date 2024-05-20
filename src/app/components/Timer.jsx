import React, { useEffect, useState } from "react";

const Timer = ({ duration }) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [timesUp, setTimesUp] = useState(false);

  const timesUpMsg = "You failed to order in time"

  useEffect(() => {
    const timerId = setInterval(() => {
      setTimeLeft(prevTime => Math.max(prevTime - 1000, 0));
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  useEffect(() => {
    if (timeLeft === 0) {
      setTimesUp(true);
    }
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 1000 / 60);
  const seconds = Math.floor((timeLeft / 1000) % 60);

  return (
    <div className="flex flex-col bg-black text-white p-4 rounded">
      <span className="text-gray-400">
        Time left to complete order &nbsp;
      </span>
      {timesUp ? (
        <span className="text-red-500 text-4xl">{timesUpMsg}</span>
      ) : (
        <span className="text-red-500 text-4xl">
          {minutes}:{seconds < 10 ? "0" + seconds : seconds}
        </span>
      )}
    </div>
  );
};

export default Timer;
