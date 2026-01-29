import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

function DirectionalReveal({
  variants = {},
  direction = "left",
  children,
  className,
  justifySelf
}) {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 90%", "end 60%"],
  });

  // Only position is scroll-driven
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    direction === "left"
      ? ["-100vw", "0px"]
      : direction === "right"
      ? ["100vw", "0px"]
      : ["0px", "0px"]
  );

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    direction === "up"
      ? ["100vh", "0px"]
      : direction === "down"
      ? ["100vh", "0px"]
      : ["0px", "0px"]
  );

  return (
    <motion.div
      ref={ref}
      initial="initial"
      whileInView="whileInView"
      variants={variants}
      viewport={variants.viewport}
      transition={variants.transition}
      style={{ x, y }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default DirectionalReveal;
