import React, { useState } from "react";
import {isZeroValueString, motion} from 'framer-motion';
import { Link } from "react-router-dom";
import MultiImageAnimation from "./MultiImageAnimation";
import infKainin from '../assets/InfKainin.png'
import CloudKainin from "../assets/homeAnimation/CloudKainin.png"
import bubOne from "../assets/homeAnimation/bubbleStyle1.png"
import bubTwo from "../assets/homeAnimation/bubbleStyle2.png"
import bubThree from "../assets/homeAnimation/bubbleStyle3.png"
import bubFive from "../assets/homeAnimation/bubbleStyle5.png"
import infoEye from "../assets/homeAnimation/infoEye.png"
import { Grid, Box, Button, Typography } from '@mui/material'
import "../styles/Animation.css"

//array of images to be passsed as a paramter to MainHomeAnimation 
const KaininImages = [
  { id: 1, src: CloudKainin, alt: 'Kainin Leaning on Cloud', className: 'img-cloud', 
    sx: { 
      position: 'absolute', 
      top: { xs: '5%', md: '10%' }, 
      left: { xs: '80%', md: '90%' }, 
      width: { xs: '40%', md: '25%' } 
    }
  },
  { id: 2, src: bubOne, alt: 'Bubble style one', className: 'img-bubble-one',
    sx: { 
      position: 'absolute', 
      top: { xs: '15%', md: '20%' }, 
      left: { xs: '20%', md: '30%' }, 
      width: '10%' 
    }
  },
  { id: 3, src: bubTwo, alt: 'Bubble style two', className: 'img-bubble-two' },
  { id: 4, src: bubThree, alt: 'Bubble style three', className: 'img-bubble-three' },
  { id: 5, src: bubFive, alt: 'Bubble style five', className: 'img-bubble-five' }
];

// const KaininContainerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: { staggerChildren: 0.2 },
//     },
// };

// const KaininItemVariants = {
//   hidden: { opacity: 0, y: 20 },
//   visible: { opacity: 1, y: 0 },
// };

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
      <div style={{minHeight: "187px"}} className={"justify-content-center mt-4"}>
        {/*Render infKainin only if MainHomeAnimation has completed if not take up faux space*/}
        {firstAnimationComplete && (
              <motion.div
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <Grid item>
                  <Link to="/products">
                    <img
                      src={infKainin}
                      className="img-fluid mx-auto d-block inf-image"
                      alt="Infinite Text w/ Kainin"
                    />
                  </Link>
                </Grid>
              </motion.div>
        )}
      </div>

        {firstAnimationComplete && (
              <motion.image
                style={{float: "left"}}
                initial={{ scale: 0, opacity: 0, y: 0 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeIn" }}
              >
                <Grid item>
                  <img
                    src={infoEye}
                    className="img-fluid info-eye"
                    alt="Info Eye"
                  />
                </Grid>
              </motion.image>
        )}

      {/* Main Animation Section */}
      {/* <Grid item size = {{xs: 6, lg:7}}className="main-animation-row"> */}
            <MultiImageAnimation
              images={KaininImages}
              containerVariants = {KaininContainerVariants}
              itemVariants = {KaininItemVariants}
              onAnimationComplete={() => setFirstAnimationComplete(true)}
            />
      {/* </Grid> */}
    </>
  );
};

export default SequentialAnimations;