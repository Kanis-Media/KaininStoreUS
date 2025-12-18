import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Grid, Box, Button, Typography } from '@mui/material'
import '../styles/Animation.css';


/*Abstarct component which allows for multiple frmaer motion images to be animated in the same way using framer motion  */
const SleepyKaininAnimation = ({ images, containerVariants, itemVariants, onAnimationComplete }) => {
  const [completed, setCompleted] = useState({}); //for overall completion to stop re runs 
  const [completedCount, setCompletedCount] = useState(0);
  const MotionBox = motion(Box);

  useEffect(() => {
    if (completedCount === images.length) {
      onAnimationComplete?.();
    }
  }, [completedCount, images.length, onAnimationComplete]);

  return (
    <motion.div
      className="flex-container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      onAnimationComplete={onAnimationComplete}
    >
      {images.map((image, index) => (
        <MotionBox
          key={index}
          component="img"
          src={image.src}
          alt={image.alt}
          className={image.className}
          variants={itemVariants}
          sx={image.sx}
        />
      ))}
    </motion.div>
   
  );
};
export default SleepyKaininAnimation;