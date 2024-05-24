import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.logo}>Your Logo</div>
        <nav className={styles.nav}>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/about">About</a>
            </li>
            <li>
              <a href="/services">Services</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
          </ul>
        </nav>
        <div className={styles.info}>
          <p>Copyright © 2024. All rights reserved.</p>
          <p>Contact: example@email.com</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
