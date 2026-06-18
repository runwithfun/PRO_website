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
        'Dozens of Widgets',
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
      subtitle: 'Comprehensive Coaching · v2.0 in development',
      description: 'In P.R.O. 2.0, the Coach Assistant delivers report-style answers — comparison tables, inline diagrams, and personalised insights built from your workouts, heart rate, sleep, and goals.',
      services: [
        'Rich chat with tables & charts',
        'Personalised metric breakdowns',
        'Week-over-week comparisons',
        'Actionable coaching takeaways',
        'Adaptive learning from your data'
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
    <div className="relative overflow-hidden border-t border-white/5 py-20">
      <div className="pro-grid absolute inset-0 opacity-20" aria-hidden />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-pink">Core pillars</p>
          <h2 className="mt-3 font-display text-3xl font-extrabold text-white lg:text-4xl">
            Six feature pillars
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-500">
            Widget dashboards, AI coaching, history analytics, tracking, goals, and records.
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
              <div className="relative pro-surface rounded-3xl p-8 transition hover:border-brand-pink/40">
                <div className="absolute top-6 right-6">
                  <div className="rounded-lg border border-white/10 bg-black/60 px-3 py-1 text-xs">
                    <span className="font-bold text-white">P.R.O.</span>
                    <span className="block text-gray-500">Features</span>
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
                    <h2 className="mb-2 text-2xl font-bold text-white lg:text-3xl">
                      {frame.title}
                    </h2>
                    <p className="mb-4 text-lg italic text-gray-400">
                      {frame.subtitle}
                    </p>
                  </div>

                  <p className="mb-8 text-base leading-relaxed text-gray-500">
                    {frame.description}
                  </p>

                  {/* Services Grid */}
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    {frame.services.map((service, serviceIndex) => (
                      <div key={serviceIndex} className="flex items-start space-x-2 group-hover:scale-105 transition-transform duration-300" style={{ transitionDelay: `${serviceIndex * 50}ms` }}>
                        <div className="w-2 h-2 bg-gray-800 rounded-full mt-2 flex-shrink-0 group-hover:bg-gray-700 transition-colors duration-300"></div>
                        <span className="text-sm leading-tight text-gray-400">{service}</span>
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

        <div className="text-center">
          <div className="pro-surface mx-auto max-w-3xl rounded-3xl p-10">
            <h2 className="font-display text-2xl font-bold text-white">Ready to experience P.R.O.?</h2>
            <p className="mt-3 text-gray-500">Download now — v2.0 coach upgrade in development.</p>
            <button
              type="button"
              onClick={() => window.open('https://apps.apple.com/us/app/p-r-o/id6749865568', '_blank')}
              className="mt-6 inline-flex rounded-full bg-brand-pink px-8 py-3 font-semibold text-white pro-glow"
            >
              App Store
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrameStyleFeatures;
