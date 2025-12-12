import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Grid, Box, Button, Typography } from '@mui/material'
import '../styles/Animation.css';


/*Abstarct component which allows for multiple frmaer motion images to be animated in the same way using framer motion  */
const MultiImageAnimation = ({ images, containerVariants, itemVariants, onAnimationComplete }) => {
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
      className="main-animation-container"
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

      // <motion.div
      //     className="main-animation-container"
      //     variants={containerVariants}
      //     initial="hidden"
      //     animate="visible"
      //   >
      //   <Grid item 
      //     size={{xs: 8, lg: 7}} 
      //     style={{ display: 'flex', height: '100%', justifySelf: 'flex-end' }}
      //     sx={{ alignSelf: 'flex-start' }}
      //   >
      //     {images.map((image, index) => (
      //       <MotionBox
      //         key={index}
      //         component="img"
      //         src={image.src}
      //         alt={image.alt}
      //         className={image.className}
      //         variants={itemVariants}
      //         sx={image.sx}
      //         onAnimationComplete={() => {
      //            setCompleted(prev => {
      //             if (!prev[index]) {
      //               setCompletedCount(count => count + 1);
      //               return { ...prev, [index]: true };
      //             }
      //             return prev; // already counted, do nothing
      //           });
      //         }}
      //       />
      //     ))}
      //   </Grid>
      // </motion.div>
   
  );
};
export default MultiImageAnimation;