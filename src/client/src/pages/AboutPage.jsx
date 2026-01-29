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
  whileInView: { opacity: 0.8},
  viewport: { once: false, amount: 0.2 },
  transition: { duration: 0.7, ease: "easeOut" }
};

const FutureVariants = {
  initial: { opacity: 0, x: "100vw" },
  whileInView: { opacity: 0.8},
  viewport: { once: false },
  transition: { duration: 0.7, ease: "easeOut" }
};

const SocialVariants = {
  initial: { opacity: 0, x: "-100vh" },
  whileInView: { opacity: 0.8},
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
        animate={{ opacity: 0.8, x: 0 }}
        transition={{ duration: 3, ease: "easeInOut" }}
        style={{marginTop: "5vh", justifyContent: 'flex-start'}}
        className="about-card-start" 
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
            className="about-card-end"
          >
            <h1>Background</h1>
            <sub className="mb-2 text-muted">Card Subtitle</sub>
            <p>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
          </DirectionalReveal>

        {/* Slide in right on scroll */}
        <div style={{display: 'flex', justifyContent: 'flex-start'}}>
          <DirectionalReveal 
           variants={FutureVariants} 
           direction="right" 
           className="about-card">
              <h1>Kanis Media Future Products and Plans</h1>
              <p>Evo Archive</p>
          </DirectionalReveal>
        </div>

        {/* Slide in up on scroll */}
        <div style={{display: 'flex', justifyContent: 'flex-center', marginBottom: 0, marginLeft: 0}}>
          <DirectionalReveal variants={SocialVariants} direction="up">
                <p>Interact With US </p>
                <Link>Instagram</Link>
                <Link>TikTok</Link>
          </DirectionalReveal>
        </div>
      </div>
    </Container>
  );
}

export default AboutPage;