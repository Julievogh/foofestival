"use client";
import React, { useState, useEffect } from "react";
import styles from "./Loading.module.css";

const LoadingAnimation = () => {
  const [loadingText, setLoadingText] = useState("Calling the bands");

  useEffect(() => {
    const interval = setInterval(() => {
      switch (loadingText) {
        case "Calling the bands":
          setLoadingText("The bands are driving their tour bus");
          break;
        case "The bands are driving their tour bus":
          setLoadingText("The bands are a bit late");
          break;
        case "The bands are a bit late":
          setLoadingText("Waiting for the bands to arrive");
          break;
        case "Waiting for the bands to arrive":
          setLoadingText("Almost there...");
          break;
        default:
          setLoadingText("Calling the bands");
          break;
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [loadingText]);

  return (
    <div className={styles.loading}>
      <div className={styles.dots}>
        <span className={styles.dot}>.</span>
        <span className={styles.dot}>.</span>
        <span className={styles.dot}>.</span>
      </div>
      <div className={styles.text}>{loadingText}</div>
    </div>
  );
};

export default LoadingAnimation;
