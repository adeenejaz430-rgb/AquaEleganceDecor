'use client';

import { FiTruck, FiShield, FiRefreshCw, FiPhone } from 'react-icons/fi';

const features = [
  {
    id: 1,
    icon: FiTruck,
    title: 'Free Shipping',
    description: 'Free on order over $300',
  },
  {
    id: 2,
    icon: FiShield,
    title: 'Security Payment',
    description: '100% security payment',
  },
  {
    id: 3,
    icon: FiRefreshCw,
    title: '30 Day Return',
    description: '30 day money guarantee',
  },
  {
    id: 4,
    icon: FiPhone,
    title: '24/7 Support',
    description: 'Support every time fast',
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.id}
                className="bg-gray-50 rounded-lg p-8 text-center hover:shadow-lg transition-shadow duration-300"
              >
                {/* Icon Circle */}
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    {/* Map pin shape */}
                    <div className="w-28 h-28 bg-yellow-400 rounded-t-full flex items-center justify-center relative">
                      <Icon className="w-12 h-12 text-white" strokeWidth={2} />
                      {/* Bottom triangle for map pin */}
                      <div
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full"
                        style={{
                          width: 0,
                          height: 0,
                          borderLeft: '14px solid transparent',
                          borderRight: '14px solid transparent',
                          borderTop: '14px solid #FBBF24',
                        }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}