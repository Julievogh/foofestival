import React from "react";
import styles from "./page.module.css";
import Image from "next/image";
import Link from "next/link";

export default function App() {
  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <h1 className={styles.welcome}>WELCOME TO</h1>
        <h1 className={styles.foofest}>FOOFEST</h1>
      </div>
      <div className={styles.imageContainer}>
        <Image src="/foofestpaint.png" alt="flyer-foofest" width={800} height={800} />
      </div>
      <Link href="/pages/ticket-frontpage" className={styles.buttonLink}>
        Tickets
      </Link>
    </main>
  );
}
