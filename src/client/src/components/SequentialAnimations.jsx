import React, { useState } from "react";
import {motion} from 'framer-motion';
import { Link } from "react-router-dom";
import {Row, Col} from "react-bootstrap"
import SleepyKaininAnimation  from "./SleepyKaininAnimation";
import infKainin from '../assets/InfKainin.png'
import CloudKainin from "../assets/homeAnimation/CloudKainin.png"
import bubOne from "../assets/homeAnimation/bubbleStyle1.png"
import bubTwo from "../assets/homeAnimation/bubbleStyle2.png"
import bubThree from "../assets/homeAnimation/bubbleStyle3.png"
import bubFive from "../assets/homeAnimation/bubbleStyle5.png"
import "../styles/Animation.css"
import '../styles/App.css';

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
        
          <Row>
            <Col xs={12}>
              <motion.div
                className="flex-container"
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 4.2, duration: 0.8, ease: "easeOut" }}
              >
                  <Link to="/products" className="inf-link">
                    <img
                      src={infKainin}
                      className="inf-image"
                      alt="Infinite Text w/ Kainin"
                    />
                  </Link>
              </motion.div>
            </Col>
          </Row>

      {/* Main Animation Section */}
      <Row className="animation-row">
        <Col xs={12}>
        <div className="flex-container2">
          <SleepyKaininAnimation 
                images={SleepyKaininImages}
                containerVariants = {KaininContainerVariants}
                itemVariants = {KaininItemVariants}
                onAnimationComplete={() => setFirstAnimationComplete(true)}
              />
        </div>
        </Col>
      </Row>
    </>
  );
};

export default SequentialAnimations;