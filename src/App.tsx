import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ParallaxComponent from './Parallax/ParallaxParallaxComponent';
import MintApp from './MintApp/MintApp'; // Import the LaunchApp component


const App: React.FC = () => {

  return (
    <Router>
            <div>
                
                <Routes>
                    <Route path="/" element={<ParallaxComponent />} />
                    <Route path="/mint" element={<MintApp />} />
                </Routes>
            </div>
        </Router>
  );
};

export default App;