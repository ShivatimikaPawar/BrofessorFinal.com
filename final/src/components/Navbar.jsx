import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import './Navbar.css';
import Toggle from './Toggle';

function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSearch = () => {
    if (isSearchOpen && searchText.trim()) {
      handleSearch();
    } else {
      setIsSearchOpen(!isSearchOpen);
    }
  };

  const handleSearch = () => {
    const query = searchText.trim().toLowerCase();
    const routes = {
      home: '/',
      dashboard: '/dashboard',
      planner: '/planner',
      notes: '/SimpleNotes',
      others: '/others'
    };

    const match = Object.keys(routes).find(
      (key) => key.toLowerCase() === query
    );

    if (match) {
      navigate(routes[match]);
    } else {
      alert('No match found!');
    }
    setSearchText('');
    setIsSearchOpen(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navcontainer">
        <img src='/brolo.png' className='logo' alt='Brofessor.com' />

        <div className='item'>
          <div className='itemcontainer'>
            <Link to='/'>Home</Link>
            <Link to='/dashboard'>Dashboard</Link>
            <Link to='/planner'>Planner</Link>
            <Link to='/SimpleNotes'>Notes</Link>
            <Link to='/others'>Others</Link>

            <div className="search-container">
              <button
                id="searchBtn"
                title="Search"
                onClick={toggleSearch}
              >
                <span className="zoom-emoji">🔍</span>
              </button>
              <input
                type="text"
                id="Search"
                placeholder="Type: home, notes, planner..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyDown={handleKeyDown}
                className={`search-input ${isSearchOpen ? 'open' : ''}`}
              />
            </div>

            <Toggle />
          </div>
        </div>

        {/* Mobile Hamburger Menu */}
        <div 
          className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`} 
          onClick={toggleMobileMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'active' : ''}`}>
        <div className="itemcontainer">
          <Link to='/' onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
          <Link to='/dashboard' onClick={() => setIsMobileMenuOpen(false)}>Dashboard</Link>
          <Link to='/planner' onClick={() => setIsMobileMenuOpen(false)}>Planner</Link>
          <Link to='/SimpleNotes' onClick={() => setIsMobileMenuOpen(false)}>Notes</Link>
          <Link to='/others' onClick={() => setIsMobileMenuOpen(false)}>Others</Link>
        </div>
        <div className="search-container">
          <button 
            id="searchBtn" 
            title="Search"
            onClick={toggleSearch}
          >
            <span className="zoom-emoji">🔍</span>
          </button>
          <input
            type="text"
            id="Search"
            placeholder="Search...."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={handleKeyDown}
            className={`search-input ${isSearchOpen ? 'open' : ''}`}
          />
        </div>
        <div className="login-container">
        
        </div>
        <div className="Toggle">
          <Toggle />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;



