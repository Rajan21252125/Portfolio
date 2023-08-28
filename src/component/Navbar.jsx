/* eslint-disable no-unused-vars */
import { useState } from "react";
import { FaBars, FaTimes, FaSun, FaMoon } from "react-icons/fa";
import {BsGithub} from 'react-icons/bs'
import { Link } from "react-scroll"; // Import Link from react-scroll
import Hero from "./Hero";
import Skills from "./Skills";
import Project from "./Project";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "hero" },
    { name: "Skills", href: "skills" },
    { name: "Projects", href: "projects" },
  ];
  return (
    <div className="bg-black sticky top-0 z-50">
      <div className="mx-auto px-4 lg:mx-28 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link
              to="hero"
              className="text-white text-2xl font-semibold cursor-pointer"
              smooth={true}
            >
              RA<span className="text-green-500">JAN</span>
            </Link>
          </div>
          {/* Nav-Links */}
          <div className="right flex space-x-2 justify-center items-center md:space-x-4">
            <div className="hidden md:block order-1">
              <div className="ml-10 flex items-baseline space-x-4">
                {navLinks.map((link) => (
                  <Link // Use Link from react-scroll
                    key={link.name}
                    to={link.href}
                    smooth={true} 
                    duration={500}
                    className="text-white hover:bg-white cursor-pointer hover:border hover:border-green-500 hover:text-green-500 transition-all duration-500 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
            {/* HumBurger Button */}
            <div className="-mr-2 flex md:hidden sticky top-0 order-3">
              <button
                onClick={() => setOpen(!open)}
                type="button"
                className="bg-black inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white hover:bg-white/40 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black/40 focus:ring-white/40"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {!open ? (
                  <FaBars className="text-white" />
                ) : (
                  <FaTimes className="text-white" />
                )}
              </button>
            </div>
            
            <a className="text-white text-base hover:bg-white cursor-pointer hover:border hover:border-green-500 hover:text-green-500 transition-all duration-500 px-3 py-2 rounded-md font-medium flex items-center space-x-2 order-2" href="https://github.com/Rajan21252125/Portfolio" target="_blank" rel="noopener noreferrer">
              <BsGithub className="text-lg"/>
              <h1 className="hidden lg:block">Github</h1>
            </a>
            {/* <FaSun className='text-white text-xl'/> */}
            {/* <FaMoon className='text-white text-xl hover:bg-white hover:border hover:border-green-500 hover:text-green-500 transition-all duration-500 p-2 h-8 w-8 rounded-lg'/> */}
          </div>
        </div>
      </div>
      {/* mobile menu */}
      {open && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                smooth={true} 
                duration={500}
                className="text-white hover:bg-white/40 transition-all duration-500 hover:text-white block px-3 py-2 rounded-md text-base font-medium cursor-pointer"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
