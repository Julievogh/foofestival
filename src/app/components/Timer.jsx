import React, { useEffect, useState } from "react";

const Timer = ({ duration }) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    const timerId = setInterval(() => {
        setTimeLeft(prevTime => Math.max(prevTime - 1000, 0));
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) {
        clearInterval(timerId);
    }
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 1000 / 60);
  const seconds = Math.floor((timeLeft / 1000) % 60);
  
  return(
    <div className="bg-black text-white p-4 rounded">
        <span className="text-red-500">
        {minutes}:{seconds < 20 ? '0' : seconds} 
        </span>
        <span className="text-gray-400">
        minutes left
        </span>
    </div>
      
)
};

export default Timer;
