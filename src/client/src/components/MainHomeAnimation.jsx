import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Row, Col } from 'react-bootstrap';
import '../styles/Animation.css';

const MainHomeAnimation = ({ images, onAnimationComplete }) => {
  const [completedCount, setCompletedCount] = useState(0);

  useEffect(() => {
    if (completedCount === images.length) {
      onAnimationComplete?.();
    }
  }, [completedCount, images.length, onAnimationComplete]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <Row>
      <Col style={{ marginTop: '50vh', position: 'relative', height: '80vh' }}>
        <motion.div
          className="main-animation-container"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
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
        </motion.div>
      </Col>
    </Row>
  );
};

export default MainHomeAnimation;