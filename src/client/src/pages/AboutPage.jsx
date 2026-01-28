import React, { useState, useEffect } from "react";
import kaininTxt from "../assets/KaininText.png"
import {Container, Card} from 'react-bootstrap';
import {animate, AnimatePresence, motion} from 'framer-motion'
import { Link } from "react-router-dom";
import DirectionalReveal  from "../components/DirectionalReveal.jsx";
import '../styles/App.css'
import '../styles/About.css'
import 'bootstrap/dist/css/bootstrap.min.css'


const BackgroundtVariants = {
  initial: { opacity: 0, x: "-100vw" },
  whileInView: { opacity: 1},
  viewport: { once: false, amount: 0.95 },
  transition: { duration: 0.7, ease: "easeOut" }
};

const FutureVariants = {
  initial: { opacity: 0, x: "100vw" },
  whileInView: { opacity: 1},
  viewport: { once: false },
  transition: { duration: 0.7, ease: "easeOut" }
};

const SocialVariants = {
  initial: { opacity: 0, x: "-100vh" },
  whileInView: { opacity: 1},
  viewport: { once: false},
  transition: { duration: 0.7, ease: "easeOut" }
};


function AboutPage(){
  return(
    <Container fluid className="full-screen-container px-0">
      <div className="about-scroll-wrapper">
       {/* Slide in right */}
       <motion.div
        initial={{ opacity: 0, x: "100vw" }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 3, ease: "easeInOut" }}
        className="about-card" 
       >
          <h1>Mission Statement</h1>
          <sub className="mb-2 text-muted">Card Subtitle</sub>
          <p>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
        </motion.div>

       {/* Slide in left on scroll */}
        <DirectionalReveal 
          variants={BackgroundtVariants} 
          direction="left" 
          className="about-card"
          style={{display: 'flex', justifyContent: 'flex-end'}}
        >
          <h1>Mission Statement</h1>
          <sub className="mb-2 text-muted">Card Subtitle</sub>
          <p>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
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