import React, { useState } from 'react';
import '../style.css';
import logo from '../images/Screenshot_2023-08-16_163119-removebg-preview.png';

const Navbar = () => {
    const [isActive, setIsActive] = useState(false);

    const toggleNavbar = () => {
        setIsActive(prevIsActive => !prevIsActive);
    }

    return (
        <header className="header" data-header>
            <div className="container">
                <a href="/" className="logo">
                    <img src={logo} alt="" className="logo1" />
                </a>
                <nav className={`navbar container ${isActive ? 'active' : ''}`} data-navbar>
                    <ul className="navbar-list">
                        <li>
                            <a href="/" className="navbar-link" data-nav-link>
                                Home
                            </a>
                        </li>
                        <li>
                            <a href="#service" className="navbar-link" data-nav-link>
                                Services
                            </a>
                        </li>
                        <li>
                            <a href="#about" className="navbar-link" data-nav-link>
                                About Us
                            </a>
                        </li>
                        <li>
                            {/* <a
                                href="https://wa.me/+919772747999?text=I%20want%20to%20test%20your%20whastapp%20chat%20Bot"
                                className="btn btn-primary"
                            >
                                Try Beta
                            </a> */}
                            <a
                                href="/login"
                                className="btn btn-primary"
                            >
Login                            </a>
                        </li>
                    </ul>
                </nav>
                <button
                    className={`nav-toggle-btn ${isActive ? 'active' : ''}`}
                    aria-label="Toggle menu"
                    data-nav-toggler
                    onClick={toggleNavbar}
                >
                    {isActive ? (
                        <>
                            <ion-icon name="close-outline" className="close"></ion-icon>
                        </>
                    ) : (
                        <>
                            <ion-icon name="menu-outline" className="open"></ion-icon>
                        </>
                    )}
                </button>
            </div>
        </header>
    );
}

export default Navbar;
