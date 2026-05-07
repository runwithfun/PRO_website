import React, { useEffect, useRef, useState } from 'react';

const FrameStyleFeatures = () => {
  const frameRefs = useRef([]);
  const [visibleFrames, setVisibleFrames] = useState(new Set());
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const frameId = entry.target.dataset.frameId;
            setVisibleFrames(prev => new Set([...prev, frameId]));
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    frameRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const featureFrames = [
    {
      id: 'dashboard',
      title: 'Smart Dashboard',
      subtitle: 'Intelligent Overview & Real-time Insights',
      description: 'P.R.O. provides a comprehensive dashboard that gives you intelligent insights into your fitness journey, offering real-time tracking, personalized metrics, and beautiful visualizations that motivate you to achieve your goals.',
      services: [
        'Health Rings Visualization',
        'Real-time Activity Tracking',
        'Personalized Widgets',
        'Quick Stats Overview',
        'Daily Progress Monitoring'
      ],
      color: 'from-blue-500 to-cyan-500',
      accent: 'bg-pink-100',
      icon: '📊'
    },
    {
      id: 'ai',
      title: 'AI-Powered Features',
      subtitle: 'Intelligent Coaching & Personalized Insights',
      description: 'Our advanced AI learns from your patterns and provides personalized coaching, goal suggestions, and performance predictions that adapt to your unique fitness journey and help you reach new heights.',
      services: [
        'Coach Assistant',
        'Smart Goal Suggestions',
        'Performance Predictions',
        'Personalized Recommendations',
        'Adaptive Learning'
      ],
      color: 'from-purple-500 to-pink-500',
      accent: 'bg-pink-200',
      icon: '🤖'
    },
    {
      id: 'analytics',
      title: 'Advanced Analytics',
      subtitle: 'Deep Performance Insights & Trend Analysis',
      description: 'Go beyond basic tracking with professional-grade analytics that provide comprehensive insights into your performance, helping you identify patterns, track progress, and optimize your training strategy.',
      services: [
        'Monthly Summary Reports',
        'Sport Distribution Analysis',
        'Performance Trends',
        'Heart Rate Zone Analysis',
        'Sleep Analytics'
      ],
      color: 'from-green-500 to-emerald-500',
      accent: 'bg-pink-300',
      icon: '📈'
    },
    {
      id: 'workouts',
      title: 'Workout Tracking',
      subtitle: 'Comprehensive Training & Route Mapping',
      description: 'Track every aspect of your training with professional-grade monitoring, GPS route mapping, and detailed metrics across 50+ sports and activities, giving you complete visibility into your fitness journey.',
      services: [
        'Multi-Sport Support',
        'GPS Route Mapping',
        'Advanced Metrics',
        'Workout History',
        'Import Integration'
      ],
      color: 'from-orange-500 to-red-500',
      accent: 'bg-pink-400',
      icon: '🏃‍♂️'
    },
    {
      id: 'goals',
      title: 'Goal Setting',
      subtitle: 'Smart Targets & Achievement Tracking',
      description: 'Set, track, and celebrate your milestones with intelligent goal management that provides realistic yet challenging targets, progress visualization, and a comprehensive achievement system.',
      services: [
        'Smart Goal Creation',
        'Progress Tracking',
        'Sport-Specific Goals',
        'Achievement System',
        'Milestone Celebrations'
      ],
      color: 'from-indigo-500 to-blue-500',
      accent: 'bg-pink-500',
      icon: '🎯'
    },
    {
      id: 'records',
      title: 'Records & Achievements',
      subtitle: 'Personal Bests & Performance Milestones',
      description: 'Track and celebrate your personal bests across all dimensions of performance with real-time record detection, beautiful celebrations, and comprehensive historical analysis.',
      services: [
        'Personal Records Tracking',
        'Multi-Dimensional Records',
        'Real-time Detection',
        'Beautiful Celebrations',
        'Record History'
      ],
      color: 'from-yellow-500 to-amber-500',
      accent: 'bg-pink-600',
      icon: '🏆'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-blue-50 py-20 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-20 animate-frame-slide-in">
          <div className="inline-flex items-center px-4 py-2 bg-pink-50 text-pink-700 text-sm font-medium rounded-full mb-6 shadow-soft">
            <span className="w-2 h-2 bg-pink-500 rounded-full mr-2"></span>
            Feature Showcase
          </div>
          <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-6">
            Discover Our
            <span className="block bg-gradient-to-r from-pink-600 to-pink-700 bg-clip-text text-transparent">
              Core Features
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Each feature is designed as a comprehensive solution, providing everything you need 
            to excel in your fitness journey with intelligent insights and powerful tools.
          </p>
        </div>

        {/* Feature Frames Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {featureFrames.map((frame, index) => (
            <div
              key={frame.id}
              ref={(el) => (frameRefs.current[index] = el)}
              data-frame-id={frame.id}
              className={`relative group transition-all duration-1000 ${
                visibleFrames.has(frame.id) 
                  ? 'opacity-100 transform translate-y-0' 
                  : 'opacity-0 transform translate-y-16'
              }`}
              style={{ 
                transitionDelay: `${index * 150}ms`,
                transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                transform: visibleFrames.has(frame.id) 
                  ? `translateY(${Math.min(scrollY * 0.02, 20)}px)` 
                  : 'translateY(64px)'
              }}
            >
              {/* Main Frame Card */}
              <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-soft border border-gray-100/50 hover:shadow-large transition-all duration-500 hover:-translate-y-3 hover:scale-[1.02] group-hover:shadow-2xl group-hover:bg-white/95">
                {/* Top Accent Shapes */}
                <div className="absolute -top-4 -left-4 w-16 h-16 bg-gradient-to-br from-pink-700 to-pink-800 rounded-2xl opacity-80 animate-frame-float"></div>
                <div className="absolute -top-2 -right-2 w-12 h-12 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl opacity-90 animate-frame-float" style={{ animationDelay: '1s' }}></div>
                
                {/* Top Right Label */}
                <div className="absolute top-6 right-6">
                  <div className="bg-white/90 backdrop-blur-sm border border-gray-200/50 rounded-lg px-3 py-1 text-xs shadow-soft">
                    <span className="font-bold text-gray-900">P.R.O.</span>
                    <span className="block text-gray-600">Features</span>
                  </div>
                </div>

                {/* Icon Badge */}
                <div className="absolute top-6 left-6">
                  <div className={`w-12 h-12 ${frame.accent} rounded-xl flex items-center justify-center text-2xl shadow-soft backdrop-blur-sm`}>
                    {frame.icon}
                  </div>
                </div>

                {/* Content */}
                <div className="relative z-10 mt-8">
                  {/* Title and Subtitle */}
                  <div className="mb-6">
                    <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2 group-hover:text-gray-800 transition-colors duration-300">
                      {frame.title}
                    </h2>
                    <p className="text-lg italic text-gray-700 mb-4 group-hover:text-gray-600 transition-colors duration-300">
                      {frame.subtitle}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 leading-relaxed mb-8 text-base group-hover:text-gray-700 transition-colors duration-300">
                    {frame.description}
                  </p>

                  {/* Services Grid */}
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    {frame.services.map((service, serviceIndex) => (
                      <div key={serviceIndex} className="flex items-start space-x-2 group-hover:scale-105 transition-transform duration-300" style={{ transitionDelay: `${serviceIndex * 50}ms` }}>
                        <div className="w-2 h-2 bg-gray-800 rounded-full mt-2 flex-shrink-0 group-hover:bg-gray-700 transition-colors duration-300"></div>
                        <span className="text-sm text-gray-700 leading-tight group-hover:text-gray-800 transition-colors duration-300">{service}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Accent */}
                <div className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r ${frame.color} rounded-full opacity-60 group-hover:opacity-80 transition-opacity duration-300`}></div>
              </div>

              {/* Floating Accent Elements */}
              <div className={`absolute -top-6 -right-6 w-8 h-8 ${frame.accent} rounded-full opacity-60 group-hover:opacity-100 transition-all duration-500 animate-accent-pulse`}></div>
              <div className={`absolute -bottom-4 -left-6 w-6 h-6 ${frame.accent} rounded-full opacity-40 group-hover:opacity-60 transition-all duration-500 animate-accent-pulse`} style={{ animationDelay: '1.5s' }}></div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Section */}
        <div className="text-center animate-frame-slide-in animate-delay-500">
          <div className="bg-gradient-to-r from-pink-600 to-pink-700 rounded-3xl p-12 text-white shadow-2xl backdrop-blur-sm">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Ready to Experience These Features?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of athletes who have already transformed their fitness journey with P.R.O.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => window.open('https://apps.apple.com/us/app/p-r-o/id6749865568', '_blank')}
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-pink-700 font-semibold rounded-full hover:bg-gray-50 transform hover:scale-105 transition-all duration-300 shadow-soft hover:shadow-medium"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                Download on App Store
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrameStyleFeatures;
