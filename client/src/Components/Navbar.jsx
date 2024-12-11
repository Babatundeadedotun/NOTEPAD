import React from 'react'
import { useNavigate } from 'react-router-dom';
import '../App.css';
import { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';

const Navbar = () => {

  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [theme, setTheme] = useState('light')

  const navigate = useNavigate();


  useEffect(() => {
      const updateThemeBasedonSystem = () => {
          const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
          const systemTheme = prefersDark ? 'dark' : 'light';
          setTheme(systemTheme);
          document.body.className = prefersDark ? 'dark-theme' : 'light-theme'
      } 

      updateThemeBasedonSystem();

      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      mediaQuery.addEventListener('change', updateThemeBasedonSystem);

      return () => mediaQuery.removeEventListener('change', updateThemeBasedonSystem);

  }, [])

  const handleLogout = () => {
    localStorage.removeItem("email");
    navigate("/")
  }

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    const allSuggestions = ['Project', 'Daily Journal', 'Meeting', 'Personal', 'Shopping']
    setSuggestions(allSuggestions.filter((item) => item.toLowerCase().includes(value.toLowerCase())))
  }

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    setSuggestions([]);
  }

  const handleThemeChange = (selectedTheme) => {
    setTheme(selectedTheme)
    document.body.className = selectedTheme === 'dark' ? 'dark-theme' : 'light-theme';
  }


  return (
    <>

<nav className="navbar bg-body-tertiary sticky-top mb-5 py-0">
  <div className="container-fluid">

    <a className="navbar-brand text-info fs-1" href="#"><img src="/logo.jpg" className='pb-2 border border-1 rounded rounded-3 logoImg' style={{width: "180px"}}/></a>


    <div className="d-flex w-50 searchDiv" onMouseEnter = {() => setShowSuggestions(true)} onMouseLeave={() => setShowSuggestions(false)} role="search">
        <input className="form-control me-2 py-3 border border-1 rounded rounded-pill navbarSearch" value={searchQuery} onChange={handleSearchChange} type="search" placeholder="Search" aria-label="Search"/>
        {showSuggestions && suggestions.length > 0 && (
        <ul className='list-group position-absolute w-100 mt-5' style={{ zIndex: 1000 }}>
        {suggestions.map((suggestion, index) => (

          <li key={index} className="list-group-item list-group-item-action" onClick={() => handleSuggestionClick(suggestion)} style={{ cursor: 'pointer', width: '35%' }}>{suggestion}</li>
              ))}
        </ul>
        )}

        <button className="btn btn-info text-white border border-1 rounded rounded-pill w-25 navbarBtn" type="submit">Search</button>
      </div>


    <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">

      <div className="offcanvas-header">
        <h3 className="offcanvas-title text-info" id="offcanvasNavbarLabel">Write</h3>
        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>




      <div className="btn-group dropstart w-25 ms-auto me-3 mb-0">
        <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
        <i className='bi bi-circle-half'></i>
        </button>
        <ul className="dropdown-menu">
        <li><hr className="dropdown-divider"/></li>
          <li className=''><a className="dropdown-item" href="#" onClick={() => handleThemeChange('light')}><i className="bi bi-brightness-high-fill me-2"></i>Light</a></li>
          <li><hr className="dropdown-divider"/></li>
          <li><a className="dropdown-item" href="#" onClick={() => handleThemeChange('dark')}><i className="bi bi-moon-stars me-2"></i>Dark</a></li>
          <li><hr className="dropdown-divider"/></li>
        </ul>
      </div>





      


      <div className="offcanvas-body mt-0">
        <hr className='mt-0'/>
        <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
          <li className="nav-item">
            <a className="nav-link active d-flex gap-3" aria-current="page" href="#"><i className="bi bi-lightbulb"></i>Notes</a>
          </li>
          <li className="nav-item">
            <a className="nav-link d-flex gap-3" href="#"><i className="bi bi-bell-fill"></i>Reminders</a>
          </li>
          <li className="nav-item">
            <a className="nav-link d-flex gap-3" href="#"><i className="bi bi-pen"></i>Edit labels</a>
          </li>
          <li className="nav-item">
            <a className="nav-link d-flex gap-3" href="#"><i className="bi bi-box-arrow-down"></i>Archive</a>
          </li>
          <li className="nav-item">
            <a className="nav-link d-flex gap-3" href="#"><i className="bi bi-trash3"></i>Bin</a>
          </li>

          <form className="mt-3 mx-auto w-50" role="search">
          <button className="btn btn-info text-light w-100" type="submit" onClick={handleLogout}>Log out</button>
        </form>
        <hr/>
        </ul>
        
      </div>
    </div>
  </div>
</nav>


    </>
  )
}

// Navbar.propTypes = {
//   onSearch: PropTypes.func
// }

// Navbar.defaultProps = {
//   onSearch: () => console.warn("onSearch is missing")
// }

export default Navbar