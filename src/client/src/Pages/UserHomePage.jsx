'use client';
import {Row, Col} from 'react-bootstrap'
import SequentialAnimations from "../components/SequentialAnimations.jsx"
import ReleaseBanner from "../components/ReleaseBanner.jsx"
import '../styles/App.css'

function UserHomePage(){
  return(
  <>
          {/* <div className='flex-container'> */}
            <SequentialAnimations />
          {/* </div> */}

  </>
  )
}

export default UserHomePage;