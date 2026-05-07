import React from 'react';

export default function ModernCTA() {
  return (
    <section className="py-24 bg-gradient-to-br from-pink-600 via-pink-700 to-pink-800 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-white text-sm font-medium mb-8">
            <span className="w-2 h-2 bg-white rounded-full mr-2"></span>
            Ready to Transform Your Fitness Journey?
          </div>

          {/* Main Headline */}
          <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-8 leading-tight">
            Start Your Journey with
            <span className="block bg-gradient-to-r from-white to-pink-200 bg-clip-text text-transparent">
              P.R.O. Today
            </span>
          </h2>

          {/* Description */}
          <p className="text-xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
            Join thousands of athletes who have already elevated their performance with P.R.O. 
            Download from the App Store and start training smarter today.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <button
              onClick={() => window.open('https://apps.apple.com/us/app/p-r-o/id6749865568', '_blank')}
              className="group relative inline-flex items-center justify-center px-10 py-5 text-lg font-semibold text-pink-700 bg-white rounded-full shadow-large hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border-2 border-white hover:bg-gray-50"
            >
              <svg 
                className="w-7 h-7 mr-3" 
                viewBox="0 0 24 24" 
                fill="currentColor"
              >
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              Download for iOS
            </button>
            
            <a
              href="mailto:P.R.O.devel001@gmail.com"
              className="group relative inline-flex items-center justify-center px-10 py-5 text-lg font-semibold text-white bg-pink-500 rounded-full shadow-soft hover:shadow-medium transform hover:scale-105 transition-all duration-300 border-2 border-pink-400 hover:border-pink-300 hover:bg-pink-400"
            >
              <svg 
                className="w-6 h-6 mr-3" 
                viewBox="0 0 24 24" 
                fill="currentColor"
              >
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
              Contact Us
            </a>
          </div>

          

          {/* Contact Info */}
          <div className="mt-8 text-white/70">
            <p className="text-sm">
              💬 Questions? Reach out to{' '}
              <a 
                href="mailto:P.R.O.devel001@gmail.com" 
                className="text-white hover:text-pink-200 underline transition-colors duration-300"
              >
                P.R.O.devel001@gmail.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
