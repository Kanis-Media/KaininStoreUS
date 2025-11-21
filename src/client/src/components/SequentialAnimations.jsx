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
import infoEye from "../assets/homeAnimation/infoEye.png"
import {Col, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Animation.css"

//array of images to be passsed as a paramter to MainHomeAnimation 
const images = [
  { id: 1, src: CloudKainin, alt: 'Kainin Leaning on Cloud', className: 'img-cloud' },
  { id: 2, src: bubOne, alt: 'Bubble style one', className: 'img-bubble-one' },
  { id: 3, src: bubTwo, alt: 'Bubble style two', className: 'img-bubble-two' },
  { id: 4, src: bubThree, alt: 'Bubble style three', className: 'img-bubble-three' },
  { id: 5, src: bubFive, alt: 'Bubble style five', className: 'img-bubble-five' }
];


//TODO: important! not appropiate use of bootsrrap grid system this will NEED fixed -NH 

const SequentialAnimations = () => {
  const [firstAnimationComplete, setFirstAnimationComplete] = useState(false);

   return (
    <>
      <div style={{minHeight: "187px"}}>
        {/*Render infKainin only if MainHomeAnimation has completed if not take up faux space*/}
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

        {!firstAnimationComplete && (
          <Row className="justify-content-center mt-4">
            <Col xs={10} sm={8} md={6} lg={5} xl={4}>
              <div>
                <Link>
                  <img
                  />
                </Link>
              </div>
            </Col>
          </Row>
        )}
      </div>

      <div>
        {firstAnimationComplete && (
         
           
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