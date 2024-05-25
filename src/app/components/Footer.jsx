"use client";
import React, { useState, useEffect } from "react";
import { Navbar, NavbarContent, Link } from "@nextui-org/react";
import styles from "./Footer.module.css";

const Footer = () => {
  const [showFooter, setShowFooter] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate how far the user has scrolled from the top
      const scrollY = window.scrollY || window.pageYOffset;
      // Calculate the total height of the document including any content that goes beyond the viewport
      const totalHeight = document.documentElement.scrollHeight;
      // Calculate the height of the viewport
      const viewportHeight = window.innerHeight;
      // Calculate the remaining height below the viewport
      const remainingHeight = totalHeight - viewportHeight;
      // Determine if the user has scrolled to the bottom of the page
      const isScrolledToBottom = scrollY >= remainingHeight;
      // Update state to show/hide the Footer based on scroll position
      setShowFooter(isScrolledToBottom);
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);
    // Remove event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // Empty dependency array ensures useEffect only runs once on component mount

  return (
    <footer className={`${styles.footer} ${showFooter ? styles.show : ""}`}>
      <div className={styles.wrapper}>
        <Navbar isCompact variant="static">
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
