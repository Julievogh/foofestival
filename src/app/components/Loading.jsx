import React, { useState, useEffect } from "react";
import styles from "./Loading.module.css";
import { CirclesWithBar } from "react-loader-spinner";

const LoadingAnimation = () => {
  const [loadingText, setLoadingText] = useState("");

  useEffect(() => {
    const loadingMessages = [
      "Calling the bands",
      "Tour bus parking",
      "Stage check",
      "Sound check",
      "Almost there...",
    ];

    const randomIndex = Math.floor(Math.random() * loadingMessages.length);
    setLoadingText(loadingMessages[randomIndex]);

    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * loadingMessages.length);
      setLoadingText(loadingMessages[randomIndex]);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.loading}>
      <div className={styles.dots}>
        <span className={styles.dot}>.</span>
        <span className={styles.dot}>.</span>
        <span className={styles.dot}>.</span>
      </div>
      <div className={styles.text}>{loadingText}</div>
      <div className={styles.circlesWrapper}>
        <CirclesWithBar
          height={100}
          width={100}
          color="#F0F8FF"
          outerCircleColor="#F0F8FF"
          innerCircleColor="#F0F8FF"
          barColor="#F0F8FF"
          ariaLabel="circles-with-bar-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    </div>
  );
};

export default LoadingAnimation;
