import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

export default function ModernNav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About Us' },
    { path: '/features', label: 'Features' },
    { path: '/faq', label: 'FAQ' },
    { path: '/beta', label: 'Beta' },
    { path: '/privacy', label: 'Privacy' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
        <div className="bg-white/95 backdrop-blur-md rounded-2xl px-8 py-4 shadow-soft">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex-shrink-0">
              <NavLink to="/" className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl flex items-center justify-center shadow-soft">
                  <span className="text-white font-bold text-xl">P</span>
                </div>
                <span className="font-bold text-2xl text-gray-900">
                  P.R.O.
                </span>
              </NavLink>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navItems.map((item, index) => (
                <div key={item.path} className="flex items-center">
                  <NavLink
                    to={item.path}
                    className={({ isActive }) => `text-base font-medium transition-all duration-300 relative px-4 py-2 rounded-xl ${
                      isActive 
                        ? 'text-white bg-gradient-to-r from-pink-500 to-pink-600 shadow-soft' 
                        : 'text-gray-700 hover:text-pink-600 hover:bg-pink-50'
                    }`}
                  >
                    {item.label}
                  </NavLink>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden lg:flex items-center">
              <NavLink
                to="/beta"
                className="px-6 py-3 bg-gray-900 text-white text-base font-semibold rounded-xl hover:bg-gray-800 transition-all duration-300 shadow-soft hover:shadow-medium transform hover:scale-105"
              >
                Join Beta →
              </NavLink>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-300"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {isMobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="lg:hidden mt-4 pt-4 border-t border-gray-200">
              <div className="space-y-4">
                {navItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) => `block text-lg font-medium transition-colors duration-300 ${
                      isActive ? 'text-pink-600' : 'text-gray-700 hover:text-pink-600'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </NavLink>
                ))}
                <div className="pt-4">
                  <NavLink
                    to="/beta"
                    className="block w-full px-6 py-3 bg-gray-900 text-white text-center font-semibold rounded-xl hover:bg-gray-800 transition-colors duration-300 shadow-soft"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Join Beta →
                  </NavLink>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
