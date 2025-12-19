'use client';
import {Container} from 'react-bootstrap'
import SequentialAnimations from "../components/SequentialAnimations.jsx"
import ReleaseBanner from "../components/ReleaseBanner.jsx"
import '../styles/App.css'
import '../styles/HomePage.css'

function UserHomePage(){
  return(
    <div className="full-screen-container px-0" style={{overflow: "hidden"}}>
      <ReleaseBanner />
      <div className='flex-container'>
        <SequentialAnimations />
      </div>
    </div>);
}

export default UserHomePage;