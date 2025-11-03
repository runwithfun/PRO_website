import React from 'react';
import { Link } from 'react-router-dom';
import AnimatedFeatureNames from './AnimatedFeatureNames';

const asciiLogo = `
██████╗ ██████╗  ██████╗ 
██╔══██╗██╔══██╗██╔═══██╗
██████╔╝██████╔╝██║   ██║
██╔═══╝ ██╔══██╗██║   ██║
██║     ██║  ██║╚██████╔╝
╚═╝     ╚═╝  ╚═╝ ╚═════╝ 
`;

export default function LandingSection() {
  const handleDownload = () => {
    // Replace with actual App Store link
    window.open('https://apps.apple.com/app/your-app-id', '_blank');
  };

  return (
    <>
      <section className="w-full mt-8 sm:mt-12 flex items-center justify-center px-4 py-0">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 sm:gap-12 lg:gap-16 max-w-7xl mx-auto">
          {/* ASCII Logo - Left Side */}
          <div className="flex-shrink-0">
            <pre className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-none text-pink-100 select-none font-mono" style={{fontFamily: 'monospace'}}>
              {asciiLogo}
            </pre>
          </div>
          
          {/* Content - Right Side */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left max-w-2xl">
            {/* App Description */}
            <div className="mb-8 sm:mb-12">
                          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-pink-100 mb-6">
              Your Ultimate Sport Statistics App
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-pink-200 leading-relaxed">
              Track your performance, analyze your progress, and dominate your sport with PRO. 
              Get real-time statistics, personalized insights, and professional-grade analytics 
              to take your game to the next level.
            </p>
            </div>
            
            {/* Call to Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleDownload}
                className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-pink-100 bg-gradient-to-r from-pink-400 to-pink-600 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border border-pink-500 hover:border-pink-400"
              >
                <svg 
                  className="w-6 h-6 mr-3" 
                  viewBox="0 0 24 24" 
                  fill="currentColor"
                >
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                Download for iOS
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </button>
              
              <Link
                to="/beta"
                className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-pink-900 bg-gradient-to-r from-pink-100 to-pink-200 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border-2 border-pink-400 hover:border-pink-500"
              >
                <span className="flex items-center justify-center">
                  <span className="mr-2">🚀</span>
                  <span>Join Beta</span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-pink-300 to-pink-400 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </Link>
            </div>
            
            {/* App Store Badge (Alternative) */}
            <div className="mt-6">
              <p className="text-sm text-pink-300 mb-2">Available on the App Store</p>
              <div className="flex items-center justify-center lg:justify-start space-x-4 text-xs text-pink-400">
                <span>✓ Free Download</span>
                <span>•</span>
                <span>No Ads</span>
                <span>•</span>
                <span>Premium Features</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Phone Mockup Image Section with Animated Feature Names */}
      <section className="w-full py-16 flex justify-center">
        <div className="max-w-6xl mx-auto px-4">
          <div className="relative flex flex-col md:flex-row items-center justify-center gap-0 min-h-[500px] w-full">
            {/* Animated Feature Names Background */}
            <AnimatedFeatureNames />
            
            {/* Phone Mockups */}
            <img 
              src={`${import.meta.env.BASE_URL}IMG_7372-left.png`} 
              alt="PRO App Phone Mockup" 
              className="w-full max-w-[400px] mx-auto rounded-lg relative z-10"
            />
            <img 
              src={`${import.meta.env.BASE_URL}IMG_7368-portrait.png`} 
              alt="PRO App Phone Mockup" 
              className="w-full max-w-[320px] mx-auto rounded-lg relative z-10"
            />
          </div>
        </div>
      </section>
    </>
  );
} 