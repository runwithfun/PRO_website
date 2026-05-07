import React from 'react';

const asciiLogo = `
██████╗ ██████╗  ██████╗ 
██╔══██╗██╔══██╗██╔═══██╗
██████╔╝██████╔╝██║   ██║
██╔═══╝ ██╔══██╗██║   ██║
██║     ██║  ██║╚██████╔╝
╚═╝     ╚═╝  ╚═╝ ╚═════╝ 
`;

export default function ModernHero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-pink-300 via-pink-200 to-pink-100 pt-20">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-pink-400/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-pink-500/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-300/30 rounded-full blur-3xl"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          

          {/* ASCII Logo */}
          <div className="mb-8">
            <pre className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-none text-pink-600 select-none font-mono opacity-80" style={{fontFamily: 'monospace'}}>
              {asciiLogo}
            </pre>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-pink-900 mb-6 leading-tight animate-slide-up">
            Your Ultimate
            <span className="block bg-gradient-to-r from-pink-600 to-pink-800 bg-clip-text text-transparent">
              Sport Statistics App
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl sm:text-2xl text-pink-800 mb-12 max-w-3xl mx-auto leading-relaxed animate-slide-up" style={{animationDelay: '0.1s'}}>
            Track your performance, analyze your progress, and dominate your sport with P.R.O. 
            Get real-time statistics, personalized insights, and professional-grade analytics.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 animate-slide-up" style={{animationDelay: '0.2s'}}>
            <button
              onClick={() => window.open('https://apps.apple.com/us/app/p-r-o/id6749865568', '_blank')}
              className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-pink-500 to-pink-600 rounded-full shadow-large hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border-2 border-pink-500 hover:border-pink-400"
            >
              <svg 
                className="w-6 h-6 mr-3" 
                viewBox="0 0 24 24" 
                fill="currentColor"
              >
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              Download for iOS
            </button>
          </div>

          
        </div>
      </div>

      
    </section>
  );
}
