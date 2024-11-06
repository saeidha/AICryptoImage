import React, { useState } from 'react';
import MintApp from './MintApp/MintApp'; // Import the Parallax component
import ParallaxComponent from './Parallax/ParallaxParallaxComponent';


const App: React.FC = () => {

  return (
    <div>
        <ParallaxComponent/>
     <MintApp />
    </div>
  );
};

export default App;