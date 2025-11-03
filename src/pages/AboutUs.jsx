import React from 'react';
import { Link } from 'react-router-dom';

// Timeline data for future updates
const timelineItems = [
    {
        id: 1,
        title: 'Custom Training Plans',
        description: 'AI-generated training plans tailored to your goals, schedule, and fitness level',
        quarter: 'Q4 2025',
        status: 'planned',
        icon: ''
        },
    {
        id: 2,
        title: 'Wearable Device Integration',
        description: 'Enhanced support for Apple Watch, Garmin, Polar, and other fitness trackers',
        quarter: 'Q1 2026',
        status: 'planned',
        icon: ''
        },
    {
        id: 3,
        title: 'Nutrition Tracking',
        description: 'Comprehensive nutrition logging and meal planning to complement your training',
        quarter: 'Q1 2026',
        status: 'planned',
        icon: ''
        },
  {
    id: 4,
    title: 'Gamification',
    description: 'Secret Gamification features to keep you motivated and engaged are coming',
    quarter: 'Q2 2026',
    status: 'planned',
    icon: ''
  },
  {
    id: 5,
    title: 'Recovery Analytics',
    description: 'Advanced recovery metrics and recommendations to optimize your rest periods',
    quarter: 'Q2 2026',
    status: 'planned',
    icon: ''
  },
  {
    id: 6,
    title: 'Social Features',
    description: 'Connect with friends, share achievements, and compete in friendly challenges',
    quarter: 'Q3 2026',
    status: 'planned',
    icon: ''
  },
  
];

function TimelineItem({ item, index }) {
  const isEven = index % 2 === 0;
  
  return (
    <div className="relative mb-12">
      {/* Timeline Line - Hidden on mobile */}
      <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-pink-300 via-pink-400 to-pink-300"></div>
      
      {/* Content Card */}
      <div className="relative flex flex-col md:flex-row items-center md:items-start">
        {/* Mobile Layout */}
        <div className="md:hidden w-full mb-4">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-white rounded-full border-4 border-pink-500 shadow-large flex items-center justify-center z-10 mr-4">
              <span className="text-2xl">{item.icon}</span>
            </div>
            <div className="inline-flex items-center px-3 py-1 bg-pink-50 text-pink-700 text-xs font-semibold rounded-full">
              {item.quarter}
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-soft hover:shadow-medium transition-all duration-300 border border-gray-200 hover:border-pink-200 group ml-16">
            <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-pink-700 transition-colors duration-300">
              {item.title}
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {item.description}
            </p>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className={`hidden md:flex w-full ${isEven ? 'flex-row' : 'flex-row-reverse'} items-center`}>
          {/* Timeline Dot */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-12 h-12 bg-white rounded-full border-4 border-pink-500 shadow-large flex items-center justify-center z-10 group-hover:scale-110 transition-transform duration-300">
            <span className="text-2xl">{item.icon}</span>
          </div>
          
          {/* Content */}
          <div className={`w-1/2 ${isEven ? 'pr-12 text-right' : 'pl-12 text-left'}`}>
            <div className="bg-white rounded-2xl p-6 shadow-soft hover:shadow-medium transition-all duration-300 border border-gray-200 hover:border-pink-200 group">
              <div className="inline-flex items-center px-3 py-1 bg-pink-50 text-pink-700 text-xs font-semibold rounded-full mb-3">
                {item.quarter}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-pink-700 transition-colors duration-300">
                {item.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Video */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-pink-50 via-white to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 bg-pink-50 text-pink-700 text-sm font-medium rounded-full mb-6">
              <span className="w-2 h-2 bg-pink-500 rounded-full mr-2"></span>
              About P.R.O.
            </div>
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-6">
              About
              <span className="block bg-gradient-to-r from-pink-600 to-pink-700 bg-clip-text text-transparent">
                P.R.O.
              </span>
            </h1>
          </div>

          {/* Video Section */}
          <div className="max-w-5xl mx-auto mb-16 relative">
            {/* Video with masked borders - fades all edges */}
            <div className="relative" style={{
              maskImage: 'radial-gradient(ellipse 90% 100% at center, black 75%, transparent 100%)',
              WebkitMaskImage: 'radial-gradient(ellipse 90% 100% at center, black 75%, transparent 100%)',
            }}>
              <video
                className="w-full h-auto"
                style={{
                  outline: 'none',
                  border: 'none',
                  display: 'block',
                  background: 'transparent'
                }}
                autoPlay
                loop
                muted
                playsInline
                controls={false}
                preload="auto"
              >
                <source src={`${import.meta.env.BASE_URL}app_gallery.mov`} type="video/quicktime" />
                <source src={`${import.meta.env.BASE_URL}app_gallery.mov`} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </section>

      {/* Slogan Section */}
      <section className="py-20 bg-gradient-to-r from-pink-600 to-pink-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-6">
            <svg className="w-16 h-16 mx-auto text-white/80 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6 leading-tight">
            We care about our users' training history and help them build their record breaking future
          </h2>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 bg-pink-50 text-pink-700 text-sm font-medium rounded-full mb-6">
              <span className="w-2 h-2 bg-pink-500 rounded-full mr-2"></span>
              Our Mission
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8">
              Empowering Every Athlete
            </h2>
          </div>

          <div className="bg-gradient-to-br from-pink-50 to-white rounded-2xl p-8 lg:p-12 border border-pink-100 shadow-soft">
            <div className="mb-6">
              <svg className="w-12 h-12 text-pink-600 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <p className="text-xl lg:text-2xl text-gray-700 leading-relaxed">
              To put the power of professional coaching analytics into the hands of every athlete, so they can train smarter, recover stronger, and continuously elevate their performance
            </p>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-pink-50 text-pink-700 text-sm font-medium rounded-full mb-6">
              <span className="w-2 h-2 bg-pink-500 rounded-full mr-2"></span>
              Future Updates
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              What's Coming Next
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We're constantly working on new features to enhance your training experience. Here's a glimpse of what's ahead.
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Top Cap - Hidden on mobile */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-8 bg-gradient-to-b from-transparent to-pink-300"></div>
            
            {/* Timeline Items */}
            <div className="pt-8 pb-8">
              {timelineItems.map((item, index) => (
                <TimelineItem key={item.id} item={item} index={index} />
              ))}
            </div>

            {/* Bottom Cap - Hidden on mobile */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 bottom-0 w-0.5 h-8 bg-gradient-to-t from-transparent to-pink-300"></div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-pink-600 to-pink-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Training?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of athletes who are already building their record-breaking future with P.R.O.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/beta"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-pink-700 font-semibold rounded-full hover:bg-gray-50 transform hover:scale-105 transition-all duration-300 shadow-soft hover:shadow-medium"
            >
              <span className="mr-2">🚀</span>
              Join Beta
            </Link>
            <button
              onClick={() => window.open('https://apps.apple.com/app/your-app-id', '_blank')}
              className="inline-flex items-center justify-center px-8 py-4 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-full hover:bg-white/30 transform hover:scale-105 transition-all duration-300 border border-white/30 hover:border-white/50"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              Download for iOS
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

