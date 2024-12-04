import React from 'react'
import { useNavigate } from 'react-router-dom';
import '../App.css';

const Navbar = () => {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("email");
    navigate("/signin")
  }


  return (
    <>

<nav className="navbar bg-body-tertiary sticky-top mb-5 py-0">
  <div className="container-fluid">

    <a className="navbar-brand text-info fs-1" href="#"><img src="/logo.jpg" className='pb-2 border border-1 rounded rounded-3 logoImg' style={{width: "180px"}}/></a>


    <form className="d-flex w-50 searchDiv" role="search">
        <input className="form-control me-2 py-3 border border-1 rounded rounded-pill navbarSearch" type="search" placeholder="Search" aria-label="Search"/>
        <button className="btn btn-info text-white border border-1 rounded rounded-pill w-25 navbarBtn" type="submit">Search</button>
      </form>


    <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">

      <div className="offcanvas-header">
        <h3 className="offcanvas-title text-info" id="offcanvasNavbarLabel">Write</h3>
        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div className="offcanvas-body">
        <hr/>
        <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
          <li className="nav-item">
            <a className="nav-link active" aria-current="page" href="#">Notes</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Reminders</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Edit labels</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Archive</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Bin</a>
          </li>

          {/* <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Dropdown
            </a>
            <ul className="dropdown-menu">
              <li><a className="dropdown-item" href="#">Action</a></li>
              <li><a className="dropdown-item" href="#">Another action</a></li>
              <li>
                <hr className="dropdown-divider"/>
              </li>
              <li><a className="dropdown-item" href="#">Something else here</a></li>
            </ul>
          </li> */}

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

export default Navbar