// assets/components/BurgerMenu.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const BurgerMenu = () => {
    const [menuVisible, setMenuVisible] = useState(false);

    const handleMenuToggle = () => {
        setMenuVisible(!menuVisible);
    };

    const handleLinkClick = () => {
        setMenuVisible(false);
    };

    return (
        <>
            <nav className="navbar navbar-dark bg-dark fixed-top">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">SimplyTask</a>
                    <button className="navbar-toggler" type="button" onClick={handleMenuToggle}>
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className={`offcanvas offcanvas-end${menuVisible ? ' show' : ''}`} tabIndex="-1" id="offcanvasDarkNavbar"
                         aria-labelledby="offcanvasDarkNavbarLabel">
                        <div className="offcanvas-header bg-dark">
                            <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel"></h5>
                            <button
                                type="button"
                                className="btn-close btn-close-white"
                                onClick={handleMenuToggle}
                                aria-label="Close">
                            </button>
                        </div>
                        <div className="offcanvas-body bg-dark">
                            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                                <li className="nav-item">
                                    <Link to="/" className="nav-link" onClick={handleLinkClick}>Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/about" className="nav-link" onClick={handleLinkClick}>About</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/contact" className="nav-link" onClick={handleLinkClick}>Contact</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}

export { BurgerMenu };