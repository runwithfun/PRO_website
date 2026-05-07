import React, { useState } from 'react';

const faqData = [
  {
    category: 'Getting Started',
    questions: [
      {
        question: 'How do I get started with P.R.O.?',
        answer: 'Getting started is easy! Simply download the app from the App Store, create your profile, and start tracking your first workout. The app will guide you through the setup process and help you customize your experience.'
      },
      {
        question: 'What devices are supported?',
        answer: 'P.R.O. is currently available for iOS devices (iPhone and iPad). We\'re working on Android support and will announce it when it\'s ready. The app works with Apple Watch for enhanced tracking capabilities.'
      },
      {
        question: 'Do I need an internet connection?',
        answer: 'While an internet connection is required for initial setup and data synchronization, P.R.O. works offline for tracking workouts. Your data will sync automatically when you\'re back online.'
      }
    ]
  },
  {
    category: 'Features & Functionality',
    questions: [
      {
        question: 'What sports and activities does P.R.O. support?',
        answer: 'P.R.O. supports 50+ sports and activities including running, cycling, swimming, walking, hiking, gym workouts, yoga, and many more. We\'re constantly adding new sports based on user feedback.'
      },
      {
        question: 'How does the AI Coach work?',
        answer: 'Our AI Coach analyzes your workout patterns, goals, and performance to provide personalized recommendations. It suggests workout plans, tracks your progress, and adapts to your fitness level over time.'
      },
      {
        question: 'Can I import data from other fitness apps?',
        answer: 'Yes! P.R.O. integrates with Apple Health, allowing you to import data from other fitness apps and devices. We also support manual data entry for activities not automatically tracked.'
      }
    ]
  },
  {
    category: 'Account & Data',
    questions: [
      {
        question: 'Is P.R.O. free to use?',
        answer: 'P.R.O. offers a free tier with core features. Premium features are available through our subscription plans, which include advanced analytics, unlimited workout history, and priority support.'
      },
      {
        question: 'How is my data protected?',
        answer: 'Your privacy and data security are our top priorities. All data is encrypted, stored securely, and never shared with third parties. You have full control over your data and can export or delete it at any time.'
      },
      {
        question: 'Can I use P.R.O. without creating an account?',
        answer: 'While you can explore some basic features without an account, creating an account is required to save your progress, sync data across devices, and access the full range of features.'
      }
    ]
  },
  {
    category: 'Technical Support',
    questions: [
      {
        question: 'What if I encounter a bug or issue?',
        answer: 'We\'re committed to providing excellent support. If you encounter any issues, please contact us at P.R.O.devel001@gmail.com or use the in-app feedback feature. We typically respond within 24 hours.'
      },
      {
        question: 'How often is the app updated?',
        answer: 'We release regular updates with new features, bug fixes, and performance improvements. Updates are typically available every 2-4 weeks, and we always notify users about major new features.'
      },
      {
        question: 'Can I use P.R.O. on multiple devices?',
        answer: 'Yes! Your P.R.O. account syncs across all your devices. Simply log in with the same account on any device, and all your data, settings, and progress will be available.'
      }
    ]
  }
];

function FAQItem({ question, answer, isOpen, onToggle }) {
  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        className="w-full text-left py-6 px-0 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 rounded-lg"
        onClick={onToggle}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 pr-4">
            {question}
          </h3>
          <div className="flex-shrink-0">
            <svg
              className={`w-6 h-6 text-pink-600 transition-transform duration-200 ${
                isOpen ? 'rotate-180' : ''
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="pb-6 text-gray-600 leading-relaxed">
          {answer}
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [openItems, setOpenItems] = useState(new Set());

  const toggleItem = (index) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index);
    } else {
      newOpenItems.add(index);
    }
    setOpenItems(newOpenItems);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center px-4 py-2 bg-pink-50 text-pink-700 text-sm font-medium rounded-full mb-6">
            <span className="w-2 h-2 bg-pink-500 rounded-full mr-2"></span>
            Frequently Asked Questions
          </div>
          <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-6">
            Got Questions?
            <span className="block bg-gradient-to-r from-pink-600 to-pink-700 bg-clip-text text-transparent">
              We've Got Answers
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Find answers to the most common questions about P.R.O. If you can't find what you're looking for, 
            don't hesitate to reach out to our support team.
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {faqData.map((category, categoryIndex) => (
            <div key={category.category} className="mb-20">
              {/* Category Header */}
              <div className="text-center mb-12">
                <div className="relative mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    {category.category}
                  </h2>
                  <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-pink-600 mx-auto rounded-full"></div>
                </div>
              </div>

              {/* FAQ Items */}
              <div className="bg-white rounded-2xl shadow-soft border border-gray-200 overflow-hidden">
                {category.questions.map((item, itemIndex) => {
                  const globalIndex = categoryIndex * 100 + itemIndex;
                  return (
                    <FAQItem
                      key={item.question}
                      question={item.question}
                      answer={item.answer}
                      isOpen={openItems.has(globalIndex)}
                      onToggle={() => toggleItem(globalIndex)}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-pink-600 to-pink-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Still Have Questions?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Can't find the answer you're looking for? Our support team is here to help you get the most out of P.R.O.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:P.R.O.devel001@gmail.com"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-pink-700 font-semibold rounded-full hover:bg-gray-50 transform hover:scale-105 transition-all duration-300 shadow-soft hover:shadow-medium"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
              Contact Support
            </a>
            <button
              onClick={() => window.open('https://apps.apple.com/us/app/p-r-o/id6749865568', '_blank')}
              className="inline-flex items-center justify-center px-8 py-4 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-full hover:bg-white/30 transform hover:scale-105 transition-all duration-300 border border-white/30 hover:border-white/50"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              Download on App Store
            </button>
          </div>
        </div>
      </section>
    </div>
  );
} 