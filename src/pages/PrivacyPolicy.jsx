import React from 'react';
import { Link } from 'react-router-dom';

const privacySections = [
  {
    id: 'collection',
    title: 'Information We Collect',
    description: 'We collect minimal information to provide you with the best fitness tracking experience. Your health data stays on your device.',
    content: [
      {
        title: 'Email Address Only',
        description: 'We collect only your email address for account registration and authentication. No other personal information is required or collected.'
      },
      {
        title: 'Apple Health Data (Local Only)',
        description: 'With your permission, our app accesses workouts and activity data from Apple Health. This data is read directly from your device and stored locally—we never see it, access it remotely, or store it on our servers.'
      },
      {
        title: 'GPS Workout Tracks & Activity Data',
        description: 'All GPS workout tracks and other personal activity data tracked with our app are stored exclusively on your device. This information is not visible to us, not transmitted to our servers, and remains completely private.'
      },
      {
        title: 'No Additional Data Collection',
        description: 'We do not collect names, usernames, or any other personal data beyond your email address. Your privacy is our priority.'
      }
    ]
  },
  {
    id: 'usage',
    title: 'How We Use Your Information',
    description: 'Your email is used only for account management. Your health data remains private and local to your device.',
    content: [
      {
        title: 'Email for Account Management',
        description: 'Your email address is used solely for account registration, login authentication, and important service communications.'
      },
      {
        title: 'Local Data Storage',
        description: 'All workout and activity data from Apple Health is stored exclusively on your device. We have no access to this information.'
      },
      {
        title: 'AI Analytics Processing',
        description: 'When you use AI analytics features, your health data is processed locally or through secure AI services to generate insights. Even during processing, we do not see, store, or have access to your actual data—only the AI-generated responses are provided to you.'
      },
      {
        title: 'No Data Transmission',
        description: 'Your health and fitness data never leaves your device except when you explicitly use AI analytics, and even then, we cannot see or access the underlying data.'
      }
    ]
  },
  {
    id: 'protection',
    title: 'Data Protection & Security',
    description: 'Your data is protected by device-level security and stays under your complete control.',
    content: [
      {
        title: 'Local Device Storage',
        description: 'All health and fitness data is stored securely on your device using iOS security features. We do not maintain any servers or cloud storage for your health data.'
      },
      {
        title: 'No Remote Access',
        description: 'We cannot access, view, or retrieve your health data remotely. Your data remains private and under your control at all times.'
      },
      {
        title: 'Apple HealthKit Security',
        description: 'Data accessed from Apple Health is protected by Apple\'s built-in security and privacy controls, which you manage through your device settings.'
      },
      {
        title: 'Email Security',
        description: 'Your email address is stored securely and used only for account management purposes. We implement standard security measures to protect account information.'
      }
    ]
  },
  {
    id: 'sharing',
    title: 'Information Sharing',
    description: 'We do not share, sell, or transmit your personal information. Your health data never leaves your device.',
    content: [
      {
        title: 'No Data Sales',
        description: 'We do not sell, rent, trade, or monetize your personal information or health data in any way.'
      },
      {
        title: 'No Third-Party Sharing',
        description: 'We do not share your email or health data with third parties, advertisers, or any other services.'
      },
      {
        title: 'AI Processing Privacy',
        description: 'When using AI analytics, data processing occurs through secure AI services. We do not see your data during this process, and processed data is not stored or shared.'
      },
      {
        title: 'Legal Requirements',
        description: 'We may only share your email address if required by law or in response to valid legal requests. Your health data remains on your device and is not accessible to us.'
      }
    ]
  },
  {
    id: 'rights',
    title: 'Your Privacy Rights',
    description: 'You have complete control over your data. Since your health data stays on your device, you can manage it directly.',
    content: [
      {
        title: 'Account Management',
        description: 'You can update or delete your account and email address at any time through the app settings.'
      },
      {
        title: 'Health Data Control',
        description: 'You control access to Apple Health data through your device settings. You can revoke access at any time, and all locally stored data can be deleted from your device.'
      },
      {
        title: 'Data Deletion',
        description: 'Deleting your account removes your email from our system. Your health data stored on your device can be deleted through the app or by uninstalling the app.'
      },
      {
        title: 'Transparency',
        description: 'Since we don\'t store or access your health data, there\'s nothing to request or export from our systems—your data is yours alone.'
      }
    ]
  },
  {
    id: 'third-party',
    title: 'Third-Party Services',
    description: 'We maintain transparency about integrations. Your data privacy is protected at every level.',
    content: [
      {
        title: 'Apple HealthKit',
        description: 'Our app integrates with Apple HealthKit to read your workouts and activity data. This integration is governed by Apple\'s privacy policy and your device permissions. Data accessed from HealthKit is stored only on your device.'
      },
      {
        title: 'AI Analytics Services',
        description: 'When you use AI analytics features, your data may be processed by secure AI services. However, we do not see, store, or have access to your data during or after processing.'
      },
      {
        title: 'No Cloud Storage',
        description: 'We do not use cloud services to store your health or fitness data. All data remains on your device under your control.'
      }
    ]
  },
  {
    id: 'updates',
    title: 'Policy Updates',
    description: 'We keep you informed about any changes to our privacy practices.',
    content: [
      {
        title: 'Regular Reviews',
        description: 'We regularly review and update this Privacy Policy to reflect current practices and legal requirements.'
      },
      {
        title: 'Change Notifications',
        description: 'Significant changes are communicated through in-app notifications or email updates to your registered email address.'
      },
      {
        title: 'Version History',
        description: 'All policy versions are archived and accessible for your reference.'
      }
    ]
  }
];

function PrivacySection({ section }) {
  return (
    <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-soft hover:shadow-medium transition-all duration-300">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-3">
          {section.title}
        </h3>
        <div className="w-16 h-1 bg-gradient-to-r from-pink-500 to-pink-600 rounded-full mb-4"></div>
        <p className="text-gray-600 text-lg leading-relaxed">
          {section.description}
        </p>
      </div>
      
      <div className="space-y-4">
        {section.content.map((item, index) => (
          <div key={index} className="border-l-4 border-pink-200 pl-4 py-2">
            <h4 className="font-semibold text-gray-900 mb-2">
              {item.title}
            </h4>
            <p className="text-gray-600 leading-relaxed">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center px-4 py-2 bg-pink-50 text-pink-700 text-sm font-medium rounded-full mb-6">
            <span className="w-2 h-2 bg-pink-500 rounded-full mr-2"></span>
            Privacy & Data Protection
          </div>
          <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-6">
            Your Privacy
            <span className="block bg-gradient-to-r from-pink-600 to-pink-700 bg-clip-text text-transparent">
              Is Our Priority
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We believe in true privacy by design. We collect only your email for registration. Your health and fitness data 
            from Apple Health stays on your device—we never see it, store it, or access it. When you use AI analytics, 
            your data is processed securely without us ever viewing it.
          </p>
          
          {/* Policy Info */}
          <div className="mt-8 p-6 bg-gray-50 rounded-2xl border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-sm text-gray-500 mb-1">Effective Date</p>
                <p className="font-semibold text-gray-900">November 8, 2025</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Last Updated</p>
                <p className="font-semibold text-gray-900">November 8, 2025</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy Sections */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {privacySections.map((section) => (
              <PrivacySection key={section.id} section={section} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
            Questions About Privacy?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            We're here to help. If you have any questions about our privacy practices or how we handle your data, 
            don't hesitate to reach out to our privacy team.
          </p>
          
          <div className="bg-gradient-to-r from-pink-50 to-pink-100 rounded-2xl p-8 border border-pink-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Contact Our Privacy Team
            </h3>
            <p className="text-gray-600 mb-6">
              Email us directly for privacy-related inquiries and data requests.
            </p>
            <a
              href="mailto:P.R.O.devel001@gmail.com"
              className="inline-flex items-center justify-center px-8 py-4 bg-pink-600 text-white font-semibold rounded-full hover:bg-pink-700 transform hover:scale-105 transition-all duration-300 shadow-soft hover:shadow-medium"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
              Contact Privacy Team
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-pink-600 to-pink-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to Start Your Fitness Journey?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Trust P.R.O. to keep your fitness data private and secure on your device, where it belongs.
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
