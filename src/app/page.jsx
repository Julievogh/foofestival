"use client";
import React, { useState, useEffect } from "react";
import styles from "./page.module.css";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import ParallaxText from "../app/components/Effect/Effect";
import { fetchBandsAndSchedule } from "../lib/api/bands"; // Import the fetchBandsAndSchedule function

export default function App() {
  const [randomBands, setRandomBands] = useState([]);

  useEffect(() => {
    async function fetchRandomBands() {
      try {
        const { bandsData } = await fetchBandsAndSchedule();

        const shuffledBands = bandsData.sort(() => 0.5 - Math.random());
        const selectedBands = shuffledBands.slice(0, 4);
        setRandomBands(selectedBands);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchRandomBands();
  }, []);

  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
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
          <Image
            src="/imgs/logo1.png"
            alt="flyer-foofest"
            width={800}
            height={800}
          />
        </div>
        <Link href="/ticket-frontpage" className={styles.buttonLink}>
          Tickets
        </Link>
      </div>
      <div className={styles.parallaxContainer}>
        <ParallaxText baseVelocity={-5}>WELCOME TO THE PARTY!</ParallaxText>
      </div>
      <div className={styles.otherBackground}>
        <h3>Oplev dine favorit kunstnere</h3>
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
              <motion.div
                className={styles.imageContainer}
                whileHover={{ scale: 1.05 }}
              >
                <div key={band.id}>
                  <h4>{band.name}</h4>
                  <p>{band.description}</p>
                  <Image
                    src={
                      band.logo.startsWith("https://")
                        ? band.logo
                        : `https://abyssinian-aeolian-gazelle.glitch.me/logos/${band.logo}`
                    }
                    alt={band.name}
                    width={200}
                    height={200}
                  />
                </div>
              </motion.div>
            </motion.li>
          ))}
        </div>
      </div>
    </main>
  );
}
