import React from 'react';
import { DiagnosisForm } from '../components/diagnosis/DiagnosisForm';

export function Diagnosis() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">AI Diagnosis</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Input your medical data below to receive an AI-powered analysis of potential health risks.
          Our system provides quick and accurate preliminary assessments.
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        <DiagnosisForm />
      </div>
    </div>
  );
}