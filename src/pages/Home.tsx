import React from 'react';
import { Hero } from '../components/home/Hero';
import { DoctorCard } from '../components/home/DoctorCard';

const diagnosticImages = [
  {
    imageUrl: "https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?auto=format&fit=crop&q=80&w=500",
    description: "AI-Powered Heart Disease Diagnosis"
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&q=80&w=500",
    description: "Advanced Diabetes Screening"
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=500",
    description: "Real-time Health Monitoring"
  }
];

export function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Hero />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Advanced Diagnostic Capabilities
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {diagnosticImages.map((item, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={item.imageUrl}
                alt={item.description}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <p className="text-lg font-semibold text-gray-900">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}