import React from 'react';
import { Link } from 'react-router-dom';

const TabBar: React.FC = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', background: '#f0f0f0' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Link to="/" style={{ marginRight: '20px', textDecoration: 'none', color: 'black' }}>
                    <i className="fas fa-home"></i> Home
                </Link>
                <Link to="/mint" style={{ textDecoration: 'none', color: 'black' }}>
                    <i className="fas fa-rocket"></i> Mint App
                </Link>
            </div>
            <button style={{ padding: '10px', background: '#007bff', color: 'white', border: 'none', borderRadius: '5px' }}>
                Action
            </button>
        </div>
    );
};

export default TabBar;