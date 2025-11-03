import React from 'react';
import { Link } from 'react-router-dom';
import FrameStyleFeatures from '../components/FrameStyleFeatures';

const featureCategories = [
  {
    id: 'dashboard',
    title: 'Smart Dashboard',
    description: 'Intelligent overview of your fitness journey with real-time insights and personalized metrics',
    features: [
      { title: 'Health Rings Visualization', desc: 'Apple Watch-style activity rings for steps, calories, and floors climbed. Track your daily progress with beautiful, intuitive visualizations that motivate you to close all three rings every day.' },
      { title: 'Real-time Activity Tracking', desc: 'Live updates of your daily progress with instant feedback. See your stats update in real-time as you move, providing immediate motivation and awareness of your activity levels.' },
      { title: 'Personalized Widgets', desc: 'Customizable dashboard with your most important metrics. Arrange and prioritize the information that matters most to you, creating a personalized fitness command center.' },
      { title: 'Quick Stats Overview', desc: 'Distance, duration, calories, and heart rate at a glance. Get instant access to your key performance indicators without navigating through multiple screens.' }
    ]
  },
  {
    id: 'ai',
    title: 'AI-Powered Features',
    description: 'Intelligent coaching and personalized insights that adapt to your unique fitness journey',
    features: [
      { title: 'Coach Assistant', desc: 'AI-powered fitness coaching and advice that learns from your patterns. Receive personalized recommendations based on your goals, current fitness level, and historical performance data.' },
      { title: 'Smart Goal Suggestions', desc: 'Personalized goal recommendations that challenge you appropriately. Our AI analyzes your capabilities and suggests realistic yet motivating targets to keep you progressing.' },
      { title: 'Performance Predictions', desc: 'AI insights into your fitness potential and future achievements. Understand what\'s possible with consistent training and get predictions for upcoming milestones.' },
      { title: 'Personalized Recommendations', desc: 'Custom training suggestions tailored to your preferences and schedule. Receive workout plans that fit your lifestyle and help you achieve your specific goals.' }
    ]
  },
  {
    id: 'analytics',
    title: 'Advanced Analytics',
    description: 'Deep insights into your performance with comprehensive data analysis and trend identification',
    features: [
      { title: 'Monthly Summary Reports', desc: 'Comprehensive monthly performance reviews with detailed breakdowns. Track your progress over time with professional-grade reports that highlight achievements and areas for improvement.' },
      { title: 'Sport Distribution Analysis', desc: 'Visual breakdown of your workout types and training balance. Ensure you\'re maintaining a well-rounded fitness routine across different activities and disciplines.' },
      { title: 'Performance Trends', desc: 'Track improvements over time with detailed charts and analytics. Visualize your progress with trend lines, seasonal patterns, and long-term growth trajectories.' },
      { title: 'Heart Rate Zone Analysis', desc: 'Detailed cardiovascular fitness insights and training zone optimization. Understand your heart rate patterns and optimize your training intensity for maximum effectiveness.' },
      { title: 'Steps Analysis', desc: 'Advanced step counting and analysis with goal setting and progress tracking. Set daily, weekly, and monthly step targets with detailed breakdowns of your walking patterns.' },
      { title: 'Sleep Analytics', desc: 'Track sleep patterns and recovery metrics for optimal performance. Monitor your sleep quality, duration, and consistency to ensure proper recovery between workouts.' }
    ]
  },
  {
    id: 'workouts',
    title: 'Comprehensive Workout Tracking',
    description: 'Track every aspect of your training with professional-grade monitoring and analysis',
    features: [
      { title: 'Multi-Sport Support', desc: 'Running, cycling, swimming, walking, hiking, and 50+ other activities. Whether you\'re a runner, cyclist, swimmer, or multi-sport athlete, P.R.O. has you covered with specialized tracking for each discipline.' },
      { title: 'GPS Route Mapping', desc: 'Real-time route tracking with beautiful map visualization and elevation data. See exactly where you\'ve been with detailed maps that include terrain, elevation changes, and route statistics.' },
      { title: 'Advanced Metrics', desc: 'Speed, pace, cadence, heart rate zones, elevation, and power analysis. Go beyond basic tracking with professional-grade metrics that serious athletes need to optimize their performance.' },
      { title: 'Workout History', desc: 'Complete workout library with filtering, search, and detailed analysis. Access your entire training history with powerful search and filtering tools to analyze specific time periods or workout types.' },
      { title: 'Import Integration', desc: 'Seamless import from Apple Health and other fitness apps and devices. Consolidate all your fitness data in one place with automatic synchronization from your existing devices and apps.' }
    ]
  },
  {
    id: 'goals',
    title: 'Goal Setting & Achievement',
    description: 'Set, track, and celebrate your milestones with intelligent goal management',
    features: [
      { title: 'Smart Goal Creation', desc: 'AI-powered goal suggestions based on your current fitness level and historical performance. Receive realistic yet challenging targets that are tailored to your capabilities and aspirations.' },
      { title: 'Progress Tracking', desc: 'Visual progress indicators for all your goals with detailed breakdowns. See exactly how close you are to achieving each milestone with intuitive progress bars and percentage indicators.' },
      { title: 'Sport-Specific Goals', desc: 'Customized goals for different activities and training disciplines. Set separate targets for running, cycling, strength training, and other activities with sport-specific metrics and tracking.' },
      { title: 'Achievement System', desc: 'Bronze, Silver, Gold, Platinum, and Diamond levels with unlockable rewards. Progress through achievement tiers as you reach new milestones, with special rewards and recognition for each level.' },
      { title: 'Milestone Celebrations', desc: 'Special rewards and celebrations for reaching important milestones. Get recognized for your achievements with animated celebrations, badges, and social sharing options.' }
    ]
  },
  {
    id: 'records',
    title: 'Records & Achievements',
    description: 'Track and celebrate your personal bests across all dimensions of performance',
    features: [
      { title: 'Personal Records Tracking', desc: 'All-time, yearly, monthly, and weekly records with detailed breakdowns. Keep track of your best performances across different time periods and training cycles.' },
      { title: 'Multi-Dimensional Records', desc: 'Distance, duration, speed, heart rate, pace, calories, cadence, power, and elevation records. Track your personal bests across every measurable aspect of your performance.' },
      { title: 'Real-time Record Detection', desc: 'Instant notifications when you break records with celebration animations. Get immediate recognition for new achievements with real-time alerts and visual celebrations.' },
      { title: 'Beautiful Record Celebrations', desc: 'Animated notifications and visual celebrations for new achievements. Make breaking records feel special with engaging animations and visual feedback.' },
      { title: 'Record History', desc: 'Complete history of all your personal bests with detailed context and analysis. Review your record progression over time and understand the factors that contributed to each achievement.' }
    ]
  },
  {
    id: 'streaks',
    title: 'Streak Tracking System',
    description: 'Stay motivated with daily consistency tracking and milestone rewards',
    features: [
      { title: 'Daily Streak Counter', desc: 'Track consecutive workout days with visual indicators and progress tracking. Build momentum with daily consistency and see your streak grow with each workout.' },
      { title: 'Milestone Rewards', desc: 'Special bonuses and recognition for 7, 14, 30, 60, 100, and 365-day streaks. Celebrate consistency milestones with special rewards, badges, and social recognition.' },
      { title: 'Visual Progress', desc: 'Circular progress indicators and 7-day calendar with streak visualization. See your consistency patterns with intuitive visual representations that make tracking easy and motivating.' },
      { title: 'Motivational Messages', desc: 'Dynamic encouragement and motivation based on your current streak status. Receive personalized messages that help you maintain momentum and push through challenging days.' },
      { title: 'Cross-Device Sync', desc: 'Streak data syncs across all your devices for consistent tracking. Never lose your streak progress when switching between devices or platforms.' }
    ]
  },
  {
    id: 'gamification',
    title: 'Gamification & Motivation',
    description: 'Make fitness fun and engaging with game-like elements and social features',
    features: [
      { title: 'Bonus System', desc: 'Earn points and level up through achievements and consistent performance. Build your fitness profile with a comprehensive scoring system that rewards both effort and results.' },
      { title: 'Mini-Games', desc: 'Fun fitness challenges and games to stay motivated and engaged. Break up your routine with entertaining challenges that make working out feel like play.' },
      { title: 'Achievement Badges', desc: 'Collect badges for various accomplishments and milestones. Build your collection of achievements with unique badges that represent your fitness journey.' },
      { title: 'Point System', desc: 'Comprehensive scoring system with multipliers and bonus opportunities. Earn points for workouts, streaks, records, and special challenges with a sophisticated scoring algorithm.' },
      { title: 'Social Features', desc: 'Share achievements and compete with friends in friendly fitness challenges. Connect with other athletes and build a supportive community around your fitness goals.' }
    ]
  },
  {
    id: 'location',
    title: 'Location & Route Features',
    description: 'Explore and track your adventures with advanced mapping and location services',
    features: [
      { title: 'Interactive Maps', desc: 'Beautiful route visualization with elevation data and terrain information. See your workouts come to life with detailed maps that include elevation profiles, terrain types, and route statistics.' },
      { title: 'Location Tracking', desc: 'Track where you\'ve been active with detailed location history and analysis. Understand your training patterns and discover new routes with comprehensive location tracking.' },
      { title: 'Route Sharing', desc: 'Share your favorite routes with the community and discover new paths from other athletes. Build a network of recommended routes and share your discoveries with fellow fitness enthusiasts.' }
    ]
  },
  {
    id: 'security',
    title: 'Data & Privacy',
    description: 'Your data is safe and secure with enterprise-grade protection and privacy controls',
    features: [
      { title: 'HealthKit Integration', desc: 'Seamless integration with Apple Health for comprehensive data consolidation. Connect all your health and fitness data in one secure, private ecosystem.' },
      { title: 'User Authentication', desc: 'Secure login and account management with multi-factor authentication options. Protect your account with industry-standard security measures and optional enhanced authentication.' },
      { title: 'Data Backup', desc: 'Automatic backup of all your fitness data with cloud synchronization. Never lose your training history with automatic backups and cross-device synchronization.' },
      { title: 'Privacy Protection', desc: 'Your data stays private and secure with end-to-end encryption and strict privacy controls. Maintain complete control over your personal information with transparent privacy policies and user controls.' }
    ]
  }
];

function FeatureCard({ feature, index }) {
  return (
    <div 
      className="group bg-white rounded-2xl p-8 border border-gray-200 hover:border-pink-200 transition-all duration-300 hover:shadow-medium hover:-translate-y-1"
      style={{
        animationDelay: `${index * 50}ms`,
        animation: 'slideUp 0.6s ease-out forwards'
      }}
    >
      <div className="mb-6">
        <h3 className="font-bold text-gray-900 text-xl group-hover:text-pink-700 transition-colors duration-300 mb-3">
          {feature.title}
        </h3>
        <div className="w-12 h-1 bg-gradient-to-r from-pink-400 to-pink-500 rounded-full group-hover:from-pink-500 group-hover:to-pink-600 transition-all duration-300"></div>
      </div>
      <p className="text-gray-600 leading-relaxed text-base">{feature.desc}</p>
    </div>
  );
}

export default function Features() {
  const totalFeatures = featureCategories.reduce((sum, cat) => sum + cat.features.length, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center px-4 py-2 bg-pink-50 text-pink-700 text-sm font-medium rounded-full mb-6">
            <span className="w-2 h-2 bg-pink-500 rounded-full mr-2"></span>
            Complete Feature Overview
          </div>
          <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-6">
            Discover All {totalFeatures}+
            <span className="block bg-gradient-to-r from-pink-600 to-pink-700 bg-clip-text text-transparent">
              P.R.O. Features
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            From AI-powered coaching to comprehensive analytics, P.R.O. provides everything you need 
            to track, analyze, and elevate your fitness performance to the next level.
          </p>
        </div>
      </section>

      {/* App Interface Showcase */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              See the Interface in Action
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Experience the intuitive design and powerful functionality that makes P.R.O. the ultimate fitness companion
            </p>
          </div>
          
          <div className="flex justify-center">
            <div className="relative group">
              <img 
                src={`${import.meta.env.BASE_URL}Frame 1-3.png`} 
                alt="P.R.O. App Interface - Multiple Screens Showing Dashboard, Workouts, Analytics, and Records" 
                className="w-full max-w-6xl rounded-2xl shadow-large group-hover:shadow-2xl transition-all duration-500 transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>
          
          {/* Interface Highlights */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Daily Dashboard</h3>
              <p className="text-sm text-gray-600">Real-time activity tracking and progress monitoring</p>
            </div>
            
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Monthly Analytics</h3>
              <p className="text-sm text-gray-600">Comprehensive performance summaries and insights</p>
            </div>
            
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Workout History</h3>
              <p className="text-sm text-gray-600">Detailed tracking and analysis of all activities</p>
            </div>
            
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Personal Records</h3>
              <p className="text-sm text-gray-600">Track achievements and celebrate milestones</p>
            </div>
          </div>
        </div>
      </section>

      {/* Frame Style Features Section */}
      <FrameStyleFeatures />

      {/* Detailed Features Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Complete Feature Breakdown
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Dive deeper into each feature category with detailed explanations and use cases
            </p>
          </div>
          
          {featureCategories.map((category, categoryIndex) => (
            <div key={category.id} className="mb-24">
              {/* Category Header */}
              <div className="text-center mb-16">
                <div className="relative mb-8">
                  <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                    {category.title}
                  </h2>
                  <div className="w-32 h-1 bg-gradient-to-r from-pink-500 to-pink-600 mx-auto rounded-full mb-6"></div>
                </div>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  {category.description}
                </p>
              </div>

              {/* Features Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {category.features.map((feature, index) => (
                  <FeatureCard 
                    key={feature.title} 
                    feature={feature} 
                    index={categoryIndex * 100 + index} 
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-pink-600 to-pink-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to Experience All These Features?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of athletes who have already transformed their fitness journey with P.R.O.
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