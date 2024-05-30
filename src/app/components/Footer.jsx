"use client";
import React, { useState, useEffect } from "react";
import { Navbar, NavbarContent, Link } from "@nextui-org/react";
import styles from "./Footer.module.css";

const Footer = () => {
  const [showFooter, setShowFooter] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const isScrolledToBottom = scrollY >= totalHeight - 10;

      setShowFooter(isScrolledToBottom);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <footer className={`${styles.footer} ${showFooter ? styles.show : ""}`}>
      <div className={styles.wrapper}>
        <Navbar iscompact="true" variant="static">
          <NavbarContent className={styles.container} justify="center">
            <Link href="https://www.instagram.com" target="_blank">
              Follow Us on @FOOFEST
            </Link>
          </NavbarContent>
          <NavbarContent className={styles.container} justify="center">
            <p>Made by Julie & August 2024 MMD Eksamen 3.sem</p>
          </NavbarContent>
        </Navbar>
      </div>
    </footer>
  );
};

export default Footer;
