"use client";
import { useState, useEffect } from "react";
import BigNav from "./BigNav";
import SmallNav from "./SmallNav";
import styles from "./Header.module.css";

const Header = () => {
  const [isWideScreen, setIsWideScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsWideScreen(window.innerWidth > 700);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className={styles.header}>
      {isWideScreen ? <BigNav /> : <SmallNav />}
    </header>
  );
};

export default Header;
