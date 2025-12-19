import React, { useState } from "react";
import {isZeroValueString, motion} from 'framer-motion';
import { Link } from "react-router-dom";
import SleepyKaininAnimation  from "./SleepyKaininAnimation";
import infKainin from '../assets/InfKainin.png'
import CloudKainin from "../assets/homeAnimation/CloudKainin.png"
import bubOne from "../assets/homeAnimation/bubbleStyle1.png"
import bubTwo from "../assets/homeAnimation/bubbleStyle2.png"
import bubThree from "../assets/homeAnimation/bubbleStyle3.png"
import bubFive from "../assets/homeAnimation/bubbleStyle5.png"
import infoEye from "../assets/InfoEye.png"
import "../styles/Animation.css"
import "../styles/HomePage.css"

const SleepyKaininImages = [
  { id: 1, src: CloudKainin, alt: 'Kainin Leaning on Cloud', className: 'img-cloud'},
  { id: 2, src: bubOne, alt: 'Bubble style one', className: 'img-bubble-one'},
  { id: 3, src: bubTwo, alt: 'Bubble style two', className: 'img-bubble-two'},
  { id: 4, src: bubThree, alt: 'Bubble style three', className: 'img-bubble-three'},
  { id: 5, src: bubFive, alt: 'Bubble style five', className: 'img-bubble-five'}
];

const KaininContainerVariants = {
  hidden: { opacity: 1 }, // keep container visible
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,   // wait before starting children
      staggerChildren: 0.8, // delay between each child
    },
  },
};

const KaininItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" } 
  },
};


const SequentialAnimations = () => {
  const [firstAnimationComplete, setFirstAnimationComplete] = useState(false);

   return (
    <>
        {/*Render infKainin only if MainHomeAnimation has completed */}
        {firstAnimationComplete && (
              <motion.div
                className="flex-container"
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                  <Link to="/products">
                    <img
                      src={infKainin}
                      className="img-fluid mx-auto d-block inf-image"
                      alt="Infinite Text w/ Kainin"
                    />
                  </Link>
              </motion.div>
        )}


      {/* Main Animation Section */}

      <div className="flex-container">
        {/* {firstAnimationComplete &&
          <motion.div>
            <motion.image
                style={{float: "left"}}
                initial={{ scale: 0, opacity: 0, y: 0 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeIn" }}
              >
                  <img
                    src={infoEye}
                    className="img-fluid info-eye"
                    alt="Info Eye"
                  />
              </motion.image>
          </motion.div>
        
        } */}
         <SleepyKaininAnimation 
              images={SleepyKaininImages}
              containerVariants = {KaininContainerVariants}
              itemVariants = {KaininItemVariants}
              onAnimationComplete={() => setFirstAnimationComplete(true)}
            />
      </div>
        
   

    </>
  );
};

export default SequentialAnimations;