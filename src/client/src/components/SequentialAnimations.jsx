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
import {Col, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Animation.css"
const images = [
  { id: 1, src: CloudKainin, alt: 'Kainin Leaning on Cloud', className: 'img-cloud' },
  { id: 2, src: bubOne, alt: 'Bubble style one', className: 'img-bubble-one' },
  { id: 3, src: bubTwo, alt: 'Bubble style two', className: 'img-bubble-two' },
  { id: 4, src: bubThree, alt: 'Bubble style three', className: 'img-bubble-three' },
  { id: 5, src: bubFive, alt: 'Bubble style five', className: 'img-bubble-five' }
];


const SequentialAnimations = () => {
  const [firstAnimationComplete, setFirstAnimationComplete] = useState(false);

   return (
    <>
      <div style={{minHeight: "187px"}}>
        {/*Render infKainin only if MainHomeAnimation has completed */}
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