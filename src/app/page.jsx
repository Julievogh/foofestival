// app/page.jsx
"use client";
import React, { useState, useEffect } from "react";
import styles from "./page.module.css";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import ParallaxText from "./components/Effect/Effect";
import { fetchBands } from "../lib/api/bands";
import Loading from "./components/Loading";

export default function App() {
  const [randomBands, setRandomBands] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchData() {
      try {
        const bands = await fetchBands();

        const first16Bands = bands.slice(0, 16);

        const shuffledBands = first16Bands.sort(() => 0.5 - Math.random());
        const selectedBands = shuffledBands.slice(0, 3);
        setRandomBands(selectedBands);
        setLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return <Loading />;
  }
  return (
    <main className={styles.main}>
      <div className={styles.hero}>
        <div className={styles.header}>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
            <motion.h1
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              WELCOME TO
            </motion.h1>
            <motion.h1
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              FOOFEST
            </motion.h1>
          </motion.div>
          <div className={styles.imageContainer}>
            <Image src="/imgs/logo1.png" alt="flyer-foofest" width={800} height={800} />
          </div>
          <Link href="/ticket-frontpage" className={styles.buttonLink}>
            Tickets
          </Link>
          <Link href="/festival" className={styles.buttonLink2}>
            Bands
          </Link>
        </div>
      </div>
      <div className={styles.parallaxContainer}>
        <div className={styles.parallaxOverlay}>
          <ParallaxText></ParallaxText>
        </div>
      </div>
      <div className={styles.otherBackground}>
        <h2>Oplev dine favorit kunstnere</h2>
        <p>(Some of them are apparently back from the grave)</p>
        <div className={styles.grid}>
          {randomBands.map((band) => (
            <motion.li
              className={styles.bandItem}
              key={band.slug}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <motion.div whileHover={{ scale: 1.05 }}>
                <Link href={`/festival/${band.slug}`}>
                  <div key={band.id}>
                    <h3>{band.name}</h3>
                    <p>{band.bio}</p>
                    <div className={styles.imageContainer}>
                      <Image
                        className={styles.apiImage}
                        src={
                          band.logo.startsWith("https://")
                            ? band.logo
                            : `https://abyssinian-aeolian-gazelle.glitch.me/logos/${band.logo}`
                        }
                        alt={band.name}
                        width={400}
                        height={400}
                        layout="fixed"
                      />
                    </div>
                  </div>
                </Link>
              </motion.div>
            </motion.li>
          ))}
        </div>
      </div>
      <div className={styles.bottom}>
        <div>
          <h4>Who is playing right now?</h4>
          <Link href="/stages" className={styles.buttonLink}>
            Schedule
          </Link>
          <p>(Link til api and show who is playing now?) Add Image?</p>
        </div>

        <div>
          <p>Add news if anyone has cancelled /events</p>
        </div>
      </div>
    </main>
  );
}
