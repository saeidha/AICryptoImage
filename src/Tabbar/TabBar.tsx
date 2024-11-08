import React from 'react';
import { Link } from 'react-router-dom';
import {WalletComponents} from './WalletComponents'
import './TabBar.css'
const TabBar: React.FC = () => {
    return (
      <header className="header">
        <nav className="nav">
          <div className="brand">
            <img src="../logo.png" className="logo" />
            <h3 className="brandName">AI NFT Generator</h3>
          </div>

          <ul className="nav_link">
            <Link
              to="/"
              style={{
                marginRight: "20px",
                textDecoration: "none",
                color: "black",
              }}
            >
              <i className="nav-text">Home</i> 
            </Link>
            <Link to="/mint" style={{ textDecoration: "none", color: "black" }}>
              <i className="nav-text">Mint App</i> 
            </Link>
          </ul>
          <div className="button-container">
            <WalletComponents />
          </div>
        </nav>
      </header>
    );
};

export default TabBar;