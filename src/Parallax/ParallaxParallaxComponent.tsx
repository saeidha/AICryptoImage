import React from 'react';
import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import { ReactTyped } from 'react-typed'; // Correct import
import './ParallaxComponent.css'; // Import the CSS file
import MintApp from '../MintApp/MintApp'; // Import the Parallax component
import logo from '../images/logo.png';
const ParallaxComponent: React.FC = () => {
  return (
    <Parallax pages={2} style={{ top: '0', left: '0' }}>
      <ParallaxLayer offset={0} speed={0.5} className="background-layer" />

      <ParallaxLayer offset={0} speed={1}>
      
      <div className="logo">
        <img src={logo} alt="logo" />
        </div>
        <div className="parallax-container">
          
          <ReactTyped
            strings={['Welcome to the NFT Minting App']}
            typeSpeed={60}
            backSpeed={40}
            loop
            className="typed-text" // Apply the CSS class
          />
        </div>
      </ParallaxLayer>

      <ParallaxLayer offset={1} speed={1}>
          <MintApp />
      </ParallaxLayer>
    </Parallax>
  );
};

export default ParallaxComponent;