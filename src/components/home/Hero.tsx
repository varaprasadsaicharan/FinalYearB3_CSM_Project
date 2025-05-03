import React from 'react';
import { Brain, Heart, Activity } from 'lucide-react';

export function Hero() {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">
            AI-Driven Diagnostic System
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Advanced machine learning algorithms to assist in early detection and diagnosis
            of chronic diseases, helping healthcare professionals make informed decisions.
          </p>
          <div className="flex justify-center space-x-12">
            <Feature
              icon={<Brain className="h-8 w-8" />}
              title="AI-Powered"
              description="State-of-the-art machine learning models"
            />
            <Feature
              icon={<Heart className="h-8 w-8" />}
              title="Accurate"
              description="High precision diagnostic predictions"
            />
            <Feature
              icon={<Activity className="h-8 w-8" />}
              title="Real-time"
              description="Instant analysis and results"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function Feature({ icon, title, description }: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="text-center">
      <div className="flex justify-center mb-2">{icon}</div>
      <h3 className="text-lg font-semibold mb-1">{title}</h3>
      <p className="text-sm opacity-90">{description}</p>
    </div>
  );
}