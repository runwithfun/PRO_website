import React from 'react';
import { Link } from 'react-router-dom';

export default function ModernFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 bg-black py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:justify-between">
          <div>
            <p className="font-display text-lg font-bold text-white">P.R.O.</p>
            <p className="mt-2 max-w-sm text-sm text-gray-500">
              Digital sport statistics · AI coaching · Training history visualisation
            </p>
          </div>
          <div className="flex gap-12 text-sm">
            <div className="space-y-2">
              <Link to="/features" className="block text-gray-500 hover:text-white">Features</Link>
              <Link to="/about" className="block text-gray-500 hover:text-white">About</Link>
              <Link to="/faq" className="block text-gray-500 hover:text-white">FAQ</Link>
            </div>
            <div className="space-y-2">
              <Link to="/privacy" className="block text-gray-500 hover:text-white">Privacy</Link>
              <a href="mailto:P.R.O.devel001@gmail.com" className="block text-gray-500 hover:text-white">Contact</a>
              <a
                href="https://apps.apple.com/us/app/p-r-o/id6749865568"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-gray-500 hover:text-white"
              >
                App Store
              </a>
            </div>
          </div>
        </div>
        <p className="mt-10 text-center text-xs text-gray-600">© {year} P.R.O.</p>
      </div>
    </footer>
  );
}
