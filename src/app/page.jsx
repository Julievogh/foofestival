import React from "react";
import styles from "./page.module.css";
import Image from "next/image";
import Link from "next/link";
export default function App() {
  return (
    <main>
      <div className={styles.main}>
        <h1>Front page test</h1>

        <div>
          <Image src="/foofestpaint.png" alt="flyer-foofest" width={400} height={400} />
        </div>

        <Link href="/pages/ticket-frontpage">
          <button className={styles.button}>Tickets</button>
        </Link>
      </div>
    </main>
  );
}
