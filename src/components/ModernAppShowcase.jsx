import React from 'react';
import { Link } from 'react-router-dom'; // Added Link import

export default function ModernAppShowcase() {
  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 bg-pink-50 text-pink-700 text-sm font-medium rounded-full mb-6">
            <span className="w-2 h-2 bg-pink-500 rounded-full mr-2"></span>
            App Preview
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            See P.R.O. in
            <span className="block bg-gradient-to-r from-pink-600 to-pink-700 bg-clip-text text-transparent">
              Action
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Experience the intuitive interface and powerful features that make P.R.O. the go-to choice 
            for serious athletes and fitness enthusiasts.
          </p>
        </div>

        {/* Three Phone Mockups - Overlapping Layout */}
        <div className="relative flex justify-center items-center mb-20">
          {/* Left Phone - Running App Overview */}
          <div className="relative z-10 transform -translate-x-8 lg:-translate-x-12 group">
            <div className="relative">
              <img 
                src={`${import.meta.env.BASE_URL}IMG_7372-portrait.png`} 
                alt="P.R.O. App - Running Overview with Statistics" 
                className="w-full max-w-[280px] rounded-3xl shadow-large group-hover:shadow-2xl transition-all duration-500 transform group-hover:scale-105 group-hover:-translate-y-2"
              />
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-white px-6 py-3 rounded-full shadow-soft text-sm font-medium text-gray-700 border border-gray-100">
                Progress Overview
              </div>
            </div>
          </div>

          {/* Middle Phone - Points and Streak Tracker */}
          <div className="relative z-20 group">
            <div className="relative">
              <img 
                src={`${import.meta.env.BASE_URL}IMG_7368-portrait.png`} 
                alt="P.R.O. App - Points and Streak Tracking" 
                className="w-full max-w-[300px] rounded-3xl shadow-2xl group-hover:shadow-3xl transition-all duration-500 transform group-hover:scale-105 group-hover:-translate-y-3"
              />
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-pink-500 to-pink-600 text-white px-6 py-3 rounded-full shadow-medium text-sm font-medium">
                Points & Streaks
              </div>
            </div>
          </div>

          {/* Right Phone - Suggested Goals */}
          <div className="relative z-10 transform translate-x-8 lg:translate-x-12 group">
            <div className="relative">
              <img 
                src={`${import.meta.env.BASE_URL}IMG_7373-portrait.png`} 
                alt="P.R.O. App - Suggested Goals and Custom Goal Creation" 
                className="w-full max-w-[280px] rounded-3xl shadow-large group-hover:shadow-2xl transition-all duration-500 transform group-hover:scale-105 group-hover:-translate-y-2"
              />
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-white px-6 py-3 rounded-full shadow-soft text-sm font-medium text-gray-700 border border-gray-100">
                Smart Goals
              </div>
            </div>
          </div>
        </div>

        {/* Screen Descriptions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
          {/* Left Screen Description */}
          <div className="text-center p-6 bg-white rounded-2xl shadow-soft border border-gray-200">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Running Overview</h3>
            <p className="text-gray-600 leading-relaxed">
              Track your running performance with comprehensive statistics including workouts, duration, distance, calories, elevation, and heart rate. View your personal bests and progress over time.
            </p>
          </div>

          {/* Middle Screen Description */}
          <div className="text-center p-6 bg-white rounded-2xl shadow-soft border border-gray-200">
            <div className="w-12 h-12 bg-gradient-to-br from-pink-100 to-pink-200 rounded-xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Points & Streaks</h3>
            <p className="text-gray-600 leading-relaxed">
              Stay motivated with our gamification system. Earn points for activities, track daily streaks, and unlock achievements. Monitor your progress towards the next level and milestone rewards.
            </p>
          </div>

          {/* Right Screen Description */}
          <div className="text-center p-6 bg-white rounded-2xl shadow-soft border border-gray-200">
            <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Smart Goals</h3>
            <p className="text-gray-600 leading-relaxed">
              Get personalized goal suggestions based on your fitness level. Choose from beginner to advanced challenges, set custom targets, and track your progress with AI-powered recommendations.
            </p>
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-pink-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Real-time Tracking</h3>
            <p className="text-gray-600">Monitor your performance with live updates and instant feedback</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Advanced Analytics</h3>
            <p className="text-gray-600">Deep insights and professional-grade metrics for serious athletes</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Personalized Experience</h3>
            <p className="text-gray-600">AI-powered coaching and custom recommendations just for you</p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-20">
          <div className="bg-gradient-to-r from-pink-50 to-pink-100 rounded-3xl p-12 max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-gray-900 mb-6">
              Ready to See More?
            </h3>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Explore all 65+ features that make P.R.O. the ultimate fitness companion for athletes at every level.
            </p>
            <Link
              to="/features"
              className="inline-flex items-center justify-center px-8 py-4 bg-pink-600 text-white font-semibold rounded-full hover:bg-pink-700 transform hover:scale-105 transition-all duration-300 shadow-soft hover:shadow-medium"
            >
              <span className="mr-2">📋</span>
              View All Features
              <span className="ml-2">⚡</span>
            </Link>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-pink-200/30 rounded-full blur-xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-blue-200/30 rounded-full blur-xl animate-float" style={{animationDelay: '2s'}}></div>
      </div>
    </section>
  );
}
