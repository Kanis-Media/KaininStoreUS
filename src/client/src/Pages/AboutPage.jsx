import React, { useState, useEffect } from "react";
import kaininTxt from "../assets/KaininText.png"
import Container from 'react-bootstrap/Container';
import {AnimatePresence, motion} from 'framer-motion'
import { Link } from "react-router-dom";
import '../styles/App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

function AboutPage(){
  return(
    <Container className=" maxWidth=sm full-screen-container px-0">
       {/* Slide in right */}
       <motion.div>
          <h1>Misison</h1>
          <p>Kainin aims to deliver a high quality expiernece  </p>
        </motion.div>

       {/* Slide in left on scroll */}
        <motion.div
         initial={{ opacity: 0 }}
         whileInView={{ opacity: 1 }}
         viewport={{ once: true }}>

          <h1>Background</h1>
          <p>Black Owned</p>

        </motion.div>

        {/* Slide in right on scroll */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}>
          <h1>Future Products and Plans</h1>
          <p>Evo Archive</p>
        </motion.div>

        {/* Slide in up on scroll */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}>
            
          <p>Interact With US </p>
          <Link>Instagram</Link>
          <Link>TikTok</Link>
        </motion.div>


    </Container>);
}

export default AboutPage;