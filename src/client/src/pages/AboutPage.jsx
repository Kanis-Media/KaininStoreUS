import React, { useState, useEffect } from "react";
import kaininTxt from "../assets/KaininText.png"
import {Container, Card} from 'react-bootstrap';
import {AnimatePresence, motion} from 'framer-motion'
import { Link } from "react-router-dom";
import '../styles/App.css'
import '../styles/About.css'
import 'bootstrap/dist/css/bootstrap.min.css'

function AboutPage(){
  return(
    <Container fluid className="full-screen-container px-0">
      <div className="about-scroll-wrapper">
       {/* Slide in right */}
       <motion.div style={{display:'flex', justifyContent: 'flex-end' }}>
        <Card className="about-card" style={{alignSelf: 'flex-end'}}>
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
        </motion.div>

       {/* Slide in left on scroll */}
        <motion.div style={{display: 'flex', justifyContent: 'flex-start'}}>
        <Card className="about-card">
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
        </motion.div>

        {/* Slide in right on scroll */}
        <motion.div style={{display: 'flex', justifyContent:'flex-end'}}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}>
          <Card className="about-card">
            <Card.Body>
              <Card.Title>Kanis Media Future Products and Plans</Card.Title>
              <Card.Text>Evo Archive</Card.Text>
            </Card.Body>
          </Card>
            

        </motion.div>

        {/* Slide in up on scroll */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}>
          <Card className="about-card">
            <Card.Body>
              <p>Interact With US </p>
              <Link>Instagram</Link>
              <Card.Link>TikTok</Card.Link>
            </Card.Body>
          </Card>
        </motion.div>
      </div>
    </Container>);
}

export default AboutPage;