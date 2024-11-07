import React from 'react';
import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import { ReactTyped } from 'react-typed'; // Correct import
import './ParallaxComponent.css'; // Import the CSS file
import logo from '../images/logo.png';
import { Link } from 'react-router-dom';
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
            strings={['Welcome to the AI NFT Generator On Chain App']}
            typeSpeed={60}
            backSpeed={40}
            loop
            className="typed-text" // Apply the CSS class
          />
        </div>

        <div className="launch-app">
        <button style={{ padding: '10px', background: '#007bff', color: 'white', border: 'none', borderRadius: '5px' }}>
                <Link to="/mint" style={{ textDecoration: 'none', color: 'black' }}>
                    <i className="fas fa-rocket"></i> Mint App
                </Link>
            </button>
            </div>
      </ParallaxLayer>

      <ParallaxLayer offset={1} speed={1}>
      </ParallaxLayer>
    </Parallax>
  );
};

export default ParallaxComponent;