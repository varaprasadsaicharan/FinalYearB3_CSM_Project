import React from 'react';
import { Heart, Activity, Brain, Stethoscope } from 'lucide-react';
import { ServiceCard } from '../components/services/ServiceCard';

export function Services() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Our Services</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          We provide cutting-edge AI-powered diagnostic services to help identify potential health risks early and accurately.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ServiceCard
          title="Heart Disease Diagnosis"
          description="Using advanced machine learning models trained on extensive cardiac data, we analyze various parameters including blood pressure, cholesterol levels, and ECG results to predict potential heart conditions with high accuracy."
          Icon={Heart}
        />
        <ServiceCard
          title="Diabetes Risk Assessment"
          description="Our AI system evaluates key health indicators such as blood glucose levels, BMI, and family history to provide early detection of diabetes risk factors and personalized recommendations."
          Icon={Activity}
        />
        <ServiceCard
          title="Neural Network Analysis"
          description="State-of-the-art neural networks process complex medical data to identify patterns and correlations that might be missed in traditional diagnostic approaches."
          Icon={Brain}
        />
        <ServiceCard
          title="Preventive Health Screening"
          description="Comprehensive health screening service that combines multiple diagnostic tools to provide a holistic view of your health status and potential risk factors."
          Icon={Stethoscope}
        />
      </div>
    </div>
  );
}