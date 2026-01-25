import React, { useState, useEffect } from "react";
import kaininTxt from "../assets/KaininText.png"
import {Container, Card} from 'react-bootstrap';
import {animate, AnimatePresence, motion} from 'framer-motion'
import { Link } from "react-router-dom";
import DirectionalReveal  from "../components/DirectionalReveal.jsx";
import '../styles/App.css'
import '../styles/About.css'
import 'bootstrap/dist/css/bootstrap.min.css'

const MissionStatementVariants = {
  initial: { opacity: 0 },
  whileInView: {opacity: 1},
  viewport: { once: true},
  transition: { duration: 0.7, ease: "easeOut" }
};

const BackgroundtVariants = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1},
  viewport: { once: true},
  transition: { duration: 0.7, ease: "easeOut" }
};

const FutureVariants = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1},
  viewport: { once: true },
  transition: { duration: 0.7, ease: "easeOut" }
};


const SocialVariants = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1},
  viewport: { once: false},
  transition: { duration: 0.7, ease: "easeOut" }
};


function AboutPage(){
  return(
    <Container fluid className="full-screen-container px-0">
      <div className="about-scroll-wrapper">
       {/* Slide in right */}
       {/* <motion.div
        
       > */}
       <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 3, ease: "easeInOut" }}
       >
          <Card className="about-card" style={{alignSelf: 'flex-end'}}>
            <Card.Body>
              <Card.Title>Mission Statement</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
              <Card.Text>
                Some quick example text to build on the card title and make up the
                bulk of the card's content.
              </Card.Text>
              <Card.Link href="#">Card Link</Card.Link>
              <Card.Link href="#">Another Link</Card.Link>
            </Card.Body>
          </Card>
        </motion.div>

       {/* Slide in left on scroll */}
        <DirectionalReveal variants={BackgroundtVariants} direction="left">
          <Card className="about-card" style={{display: 'flex', justifyContent: 'flex-start'}}>
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
              <Card.Text>
                Some quick example text to build on the card title and make up the
                bulk of the card's content.
              </Card.Text>
              <Card.Link href="#">Card Link</Card.Link>
              <Card.Link href="#">Another Link</Card.Link>
            </Card.Body>
          </Card>
        </DirectionalReveal>

        {/* Slide in right on scroll */}
        <DirectionalReveal variants={FutureVariants} direction="right">
          <Card className="about-card" style={{display: 'flex', justifyContent:'flex-end'}}>
            <Card.Body>
              <Card.Title>Kanis Media Future Products and Plans</Card.Title>
              <Card.Text>Evo Archive</Card.Text>
            </Card.Body>
          </Card>
        </DirectionalReveal>

        {/* Slide in up on scroll */}
        <DirectionalReveal variants={SocialVariants} direction="up">
          <Card className="about-card" style={{display: 'flex', justifyContent: 'center'}}>
            <Card.Body>
              <p>Interact With US </p>
              <Link>Instagram</Link>
              <Card.Link>TikTok</Card.Link>
            </Card.Body>
          </Card>
        </DirectionalReveal>
      </div>
    </Container>
  );
}

export default AboutPage;