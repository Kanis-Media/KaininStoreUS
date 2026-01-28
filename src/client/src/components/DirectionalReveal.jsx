import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";


/* Component that reveals its children with a directional slide-in effect on scroll 
*
*@component
*@example
*<DirectionalReveal direction="left" variants={myVariants}>
*   <MyChildComponent />
*</DirectionalReveal>
*@param {Object} props - Component props
*@param {Object} props.variants - Framer Motion variants for animation states
*@param {string} props.direction - Direction from which the content should slide in ("left", "right", "up")
*@param {React.ReactNode} props.children - Child components to be revealed
*@param {Object} props.style - Additional styles to apply to the motion div
*@returns {JSX.Element} The DirectionalReveal component
*/

function DirectionalReveal({ variants = {}, direction = "left", children, className, style }) {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 90%", "end 60%"]
  });

  // Scroll-driven transforms
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    direction === "left"
      ? ["-30vw", "0px"]
      : direction === "right"
      ? ["30vw", "0px"]
      : ["0px", "0px"]
  ); 

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    direction === "up"
        ? ["30vh", "0px"]
        : direction === "down"
        ? ["30vh", "0px"]
        : ["0px", "0px"]
    ); //sorry for this disgusting nested ternary x2 


  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <motion.div
        initial={variants.initial}
        whileInView={variants.whileInView}
        viewport={variants.viewport}
        transition={variants.transition}
        style={{x, y, opacity, ...style, }}
        className={className}
    >
      {children}
    </motion.div>
  );
}

export default DirectionalReveal;
