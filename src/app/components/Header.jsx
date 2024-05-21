"use client";
import { useState, useEffect } from "react";
import BigNav from "./BigNav";
import SmallNav from "./SmallNav";

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

  return isWideScreen ? <BigNav /> : <SmallNav />;
};

export default Header;
