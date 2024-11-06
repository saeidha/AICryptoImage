// ParallaxComponent.tsx
import React from 'react';
import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import bgImage from '../bg.jpg'; // Import your background image

const ParallaxComponent: React.FC = () => {
  return (
    <Parallax pages={2} style={{ top: '0', left: '0' }}>
      {/* Background Layer */}
      <ParallaxLayer
        offset={0}
        speed={0.5}
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Content Layer */}
      <ParallaxLayer offset={0} speed={1}>
        <div style={{ textAlign: 'center', color: 'white', paddingTop: '20%' }}>
          <h1>Welcome to the NFT Minting App</h1>
        </div>
      </ParallaxLayer>

      {/* Additional Layer for scrolling */}
      <ParallaxLayer offset={1} speed={1}>
        <div style={{ textAlign: 'center', color: 'black', paddingTop: '20%' }}>
          <h2>Scroll Down for More Content</h2>
        </div>
      </ParallaxLayer>
    </Parallax>
  );
};

export default ParallaxComponent;