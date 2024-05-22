import React from "react";
import styles from "./loading.module.css";

const LoadingPage = () => {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.glitchText}>
        <span>Loading...</span>
      </div>
    </div>
  );
};

export default LoadingPage;
