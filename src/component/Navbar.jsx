/* eslint-disable no-unused-vars */
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { BsGithub } from "react-icons/bs";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "#hero" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
  ];

  return (
    <nav className="bg-black sticky top-0 z-50" aria-label="Primary Navigation">
      <div className="mx-auto px-4 lg:mx-28 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <a
              href="#hero"
              className="text-white text-2xl font-semibold cursor-pointer"
              aria-label="Navigate to Home section"
            >
              RA<span className="text-green-500">JAN</span>
            </a>
          </div>

          {/* Navigation Links */}
          <div className="right flex space-x-2 justify-center items-center md:space-x-4">
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-white hover:bg-white cursor-pointer hover:border hover:border-green-500 hover:text-green-500 transition-all duration-500 px-3 py-2 rounded-md text-sm font-medium"
                    aria-label={`Navigate to ${link.name} section`}
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>
            {/* GitHub Link */}
            <a
              className="text-white text-base hover:bg-white cursor-pointer hover:border hover:border-green-500 hover:text-green-500 transition-all duration-500 px-3 py-2 rounded-md font-medium flex items-center space-x-2"
              href="https://github.com/Rajan21252125/Portfolio"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View Portfolio GitHub repository"
            >
              <BsGithub className="text-lg" />
              <span className="hidden lg:block">GitHub</span>
            </a>
            {/* Hamburger Button */}
            <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setOpen(!open)}
                type="button"
                className="bg-black inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white hover:bg-white/40 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black/40 focus:ring-white/40"
                aria-controls="mobile-menu"
                aria-expanded={open}
                aria-label="Toggle navigation menu"
              >
                {!open ? (
                  <FaBars className="text-white" />
                ) : (
                  <FaTimes className="text-white" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 absolute top-16 right-0 z-50 bg-black">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-white hover:bg-white/40 transition-all duration-500 hover:text-white block px-3 py-2 rounded-md text-base font-medium cursor-pointer"
                aria-label={`Navigate to ${link.name} section`}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
