import Image from "next/image";
import Link from "next/link";
import styles from "../page.module.css";

export const metadata = {
  title: "Bands",
  description: "An overlook of all the bands",
};

export default async function Home() {
  const url = "http://localhost:8080/bands";
  const res = await fetch(url);
  const bands = await res.json();

  return (
    <main className={styles.mainBand}>
      <p>TEST SIDE:</p>
      <div className={styles.buttonContainer}>
        <Link href="/a-perfect-circle/">
          <button className={styles.button}>Go to A perfect circle</button>
        </Link>
      </div>
      <div>
        <h1 className="ml-4">BANDS</h1>
        <div className={styles.sortBar}>
          <p>Sort</p>
          <p>Favorites</p>
        </div>

        <ul className={styles.grid}>
          {bands.map((band) => (
            <li className={styles.bandItem} key={band.slug}>
              <Link href={`/festival/${band.slug}`}>
                <div className={styles.imageContainer}>
                  <Image
                    src={band.logo.startsWith("https://") ? band.logo : `http://localhost:8080/logos/${band.logo}`}
                    alt={band.name}
                    width={200}
                    height={200}
                  />
                  <h5 className={styles.bandName}>{band.name}</h5>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
