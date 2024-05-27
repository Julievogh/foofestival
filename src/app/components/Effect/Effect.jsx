import React, { useRef } from "react";
import {
  useMotionValue,
  motion,
  useVelocity,
  useSpring,
  useTransform,
  useScroll,
  useAnimationFrame,
} from "framer-motion";

import { wrap } from "@motionone/utils";
import styles from "./Effect.module.css";

function ParallaxText({ children, baseVelocity = 100, index }) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  const x = useTransform(baseX, (v) => `${wrap(-50, 50, v)}%`);

  const directionFactor = useRef(1);
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();

    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className={styles.parallax}>
      <motion.div className={`${styles.scroller} ${index === 1 ? styles.purpleText : ""}`} style={{ x }}>
        <span>{children}</span>
        <span>{children}</span>
        <span>{children}</span>
        <span>{children}</span>
      </motion.div>
    </div>
  );
}

export default function Effect() {
  return (
    <section>
      <ParallaxText baseVelocity={-5} index={0}>
        MUSIC - FUN - FOOD -
      </ParallaxText>
      <ParallaxText baseVelocity={5} index={1}>
        PARTY 24 / 7 ALL WEEK -
      </ParallaxText>
    </section>
  );
}
