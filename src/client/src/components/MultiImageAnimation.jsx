import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Grid, Box, Button, Typography } from '@mui/material'
import '../styles/Animation.css';


/*Abstarct component which allows for multiple frmaer motion images to be animated in the same way using framer motion  */
const MultiImageAnimation = ({ images, containerVariants, itemVariants, onAnimationComplete }) => {
  const [completedCount, setCompletedCount] = useState(0);

  useEffect(() => {
    if (completedCount === images.length) {
      onAnimationComplete?.();
    }
  }, [completedCount, images.length, onAnimationComplete]);

  return (
      <motion.div
          className="main-animation-container"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
        <Grid item 
          size={{xs: 8, lg: 7}} 
          style={{ display: 'flex', flexDirection: 'column', height: '100%', alignSelf: 'center', justifySelf: 'flex-end' }}
        >
          {images.map((image, index) => (
            <motion.img
              key={index}
              src={image.src}
              alt={image.alt}
              className={image.className}
              variants={itemVariants}
              onAnimationComplete={() =>
                setCompletedCount((prev) => prev + 1)
              }
            />
          ))}
        </Grid>
      </motion.div>
   
  );
};
export default MultiImageAnimation;