import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  // Toggle mobile menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Toggle dropdown menus (for mobile)
  const toggleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  return (
    
    <header>
      <nav className={`Head-Nav ${menuOpen ? "burger-h-nav" : ""}`}>
        {/* Logo Section */}
        <div className="Logo-with-Name">
          <div className="Logo-Img">
            <img src="/home/Logo.jpg" loading="lazy" alt="logo" />
          </div>
          <div className="Company-Name">
            <span>Gulli Technology</span>
          </div>
        </div>

        {/* Navigation Items */}
        <div className={`Nav-Item ${menuOpen ? "burger-h-nav" : ""}`}>
          <ul className={`nav-list ${menuOpen ? "burger-v-nav" : ""}`}>
            <li>
            <NavLink 
                to="/" 
                end 
                className={({ isActive }) => (isActive ? "active" : "")}
                onClick={() => setMenuOpen(false)} // Close mobile menu when clicked
              >
                Home
              </NavLink>
            </li>

            {/* Product Dropdown */}
            <li 
              className="dropdown relative"
              onMouseEnter={() => setOpenDropdown("product")}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <NavLink to="/product" activeClassName="active" onClick={(e) => { 
                e.preventDefault(); 
                toggleDropdown("product");
              }}>
                Product <i className={`fa fa-chevron-down ${openDropdown === "product" ? "rotate-180" : ""}`} />
              </NavLink>
              {openDropdown === "product" && (
                <ul className="sab-menu p-2">
                  <li><NavLink to="/product/tally-prime" activeClassName="active">Tally Prime</NavLink></li>
                  <li><NavLink to="/product/ezo-billing" activeClassName="active">Ezo Billing</NavLink></li>
                </ul>
              )}
            </li>

            {/* Services Dropdown */}
            <li 
              className="dropdown relative"
              onMouseEnter={() => setOpenDropdown("services")}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <NavLink to="/services" activeClassName="active" onClick={(e) => { 
                e.preventDefault(); 
                toggleDropdown("services");
              }}>
                Services <i className={`fa fa-chevron-down ${openDropdown === "services" ? "rotate-180" : ""}`} />
              </NavLink>
              {openDropdown === "services" && (
                <ul className="sab-menu">
                  <li><NavLink to="/services/tdl" activeClassName="active">TDL Service</NavLink></li>
                  <li><NavLink to="/services/tss" activeClassName="active">TSS Service</NavLink></li>
                  <li><NavLink to="/services/training-learning" activeClassName="active">Training/Learning</NavLink></li>
                  <li><NavLink to="/services/tally-customization" activeClassName="active">Tally Customization</NavLink></li>
                </ul>
              )}
            </li>

            <li>
              <NavLink to="/about" activeClassName="active">About Us</NavLink>
            </li>
            <li>
              <NavLink to="/contact" activeClassName="active">Contact Us</NavLink>
            </li>
          </ul>
        </div>

        {/* Hamburger Menu for Mobile */}
        <div className="Ham-burger" onClick={toggleMenu}>
          <div className={`line ${menuOpen ? "rotate-top" : ""}`}></div>
          <div className={`line ${menuOpen ? "hidden" : ""}`}></div>
          <div className={`line ${menuOpen ? "rotate-bottom" : ""}`}></div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
