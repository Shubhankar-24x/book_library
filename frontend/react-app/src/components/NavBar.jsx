import  { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaBarsStaggered, FaXmark } from 'react-icons/fa6';
import { AuthContext } from '../contects/AuthProvider';

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);

  const { user } = useContext(AuthContext);

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Shop', path: '/shop' },
    { label: 'Sell Books', path: '/admin/dashboard' },
    { label: 'Blog', path: '/blog' },
  ];

  // Handle scroll to hide/show navbar
  const handleScroll = () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop) {
      setIsNavbarVisible(false); // Hide navbar on scroll down
    } else {
      setIsNavbarVisible(true); // Show navbar on scroll up
    }

    setLastScrollTop(scrollTop <= 0 ? 0 : scrollTop); // Prevent negative scroll values
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollTop]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header
      id="navbar"
      className={`w-full bg-blue-600 fixed top-0 right-0 left-0 transition-all ease-in duration-300 z-50 ${isNavbarVisible ? 'transform-none' : '-translate-y-full'}`}
    >
      <nav className="py-4 lg:px-24 px-4">
        <div className="flex justify-between items-center text-base gap-8">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-white flex items-center gap-2">
            <b>Books Library</b>
          </Link>

          {/* Nav items for large devices */}
          <ul className="md:flex space-x-12 justify-center flex-grow hidden md:block">
            {navItems.map(({ label, path }) => (
              <li key={path}>
                <Link
                  to={path}
                  className="block text-base text-white uppercase cursor-pointer text-center hover:text-blue-300 transition-colors"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Menu button for mobile devices */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-white focus:outline-none"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMenuOpen ? (
                <FaXmark className="h-5 w-5 text-white" />
              ) : (
                <FaBarsStaggered className="h-5 w-5 text-white" />
              )}
            </button>
          </div>
        </div>

        {/* Nav items for small devices */}
        <div
          className={`space-y-4 px-4 mt-16 py-7 bg-blue-700 ${isMenuOpen ? 'block fixed top-0 right-0 left-0' : 'hidden'}`}
          role="navigation"
          aria-label="Main menu"
        >
          {navItems.map(({ label, path }) => (
            <li key={path}>
              <Link
                to={path}
                className="block text-base text-white uppercase cursor-pointer text-center"
                onClick={() => setIsMenuOpen(false)} // Close the menu after a link is clicked
              >
                {label}
              </Link>
            </li>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
