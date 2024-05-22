import React from "react";
import Image from "next/image";
import styles from "../page.module.css";
import Breadcrumbs from "../components/Breadcrumbs";

export default function MapPage({}) {
  const paths = [
    { href: "/", label: "Home" },
    { href: "/map", label: "Map" },
  ];
  return (
    <>
      <main>
        <div className={styles.breadcrumbs}>
          <Breadcrumbs paths={paths} />
        </div>
        <div className={styles.main}>
          <div>
            <h1>MAP</h1>
          </div>
          <div className="flex flex-wrap gap-1 sm:gap-5 sm:justify-between">
            <p className="flex-grow flex w-full sm:w-auto">Scene 1</p>
            <p className="flex-grow flex w-full sm:w-auto">Scene 2</p>
            <p className="flex-grow flex w-full sm:w-auto">Scene 3</p>
            <p className="flex-grow flex w-full sm:w-auto">Food stalls</p>
            <p className="flex-grow flex w-full sm:w-auto">Toilets</p>
            <p className="flex-grow flex w-full sm:w-auto">Exit</p>
          </div>
          <div>
            <Image src="/map.png" alt="map" width={1000} height={1000} />
          </div>
        </div>
      </main>
    </>
  );
}
