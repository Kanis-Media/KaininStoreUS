import React, { useState } from "react";
import {isZeroValueString, motion} from 'framer-motion';
import { Link } from "react-router-dom";
import MainHomeAnimation from "./MainHomeAnimation";
import infKainin from '../assets/InfKainin.png'
import CloudKainin from "../assets/homeAnimation/CloudKainin.png"
import bubOne from "../assets/homeAnimation/bubbleStyle1.png"
import bubTwo from "../assets/homeAnimation/bubbleStyle2.png"
import bubThree from "../assets/homeAnimation/bubbleStyle3.png"
import bubFive from "../assets/homeAnimation/bubbleStyle5.png"
import {Col, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
const images = [
  { id: 1, src: CloudKainin, alt: 'Kainin Leaning on Cloud', position: { top: '46%', left: '80%' }, width:'20%', height: 'auto'},
  { id: 2, src: bubOne, alt: 'Bubble style one', position: { top: '40%', left: '72%' }, width:'5%', height: 'auto'},
  { id: 4, src: bubTwo, alt: 'Bubble style three', position: { top: '45%', left: '63%' }, width:'5%', height: 'auto'},
  { id: 4, src: bubThree, alt: 'Bubble style three', position: { top: '30%', left: '55%' }, width:'5%', height: 'auto'},
  { id: 5, src: bubFive, alt: 'Bubble style five',  position:{ top: '18%', left: '42%' }, width:'9%', height: 'auto'}
];


const SequentialAnimations = () => {
  const [firstAnimationComplete, setFirstAnimationComplete] = useState(false);

   return (
    <>
      {/*Render infKainin only if MainHomeAnimation has completed */}
      {firstAnimationComplete && (
        <Row className="justify-content-center mt-4">
          <Col xs={10} sm={8} md={6} lg={5} xl={4}>
            <motion.div
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
          </Col>
        </Row>
      )}

      {/* Main Animation Section */}
      <Row className="main-animation-row">
        <Col>
          <MainHomeAnimation
            images={images}
            onAnimationComplete={() => setFirstAnimationComplete(true)}
          />
        </Col>
      </Row>

    </>
  );
};

export default SequentialAnimations;