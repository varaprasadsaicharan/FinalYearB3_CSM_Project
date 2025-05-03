import React from 'react';
import { AlertTriangle, CheckCircle, XCircle, ArrowLeft } from 'lucide-react';
import { DiagnosisData } from './DiagnosisForm';

interface DiagnosisResultProps {
  result: DiagnosisData;
  type: 'heart' | 'diabetes';
  onReset: () => void;
}

export function DiagnosisResult({ result, type, onReset }: DiagnosisResultProps) {
  const getRiskLevel = () => {
    if (result.riskLevel < 0.3) return 'Low Risk';
    if (result.riskLevel < 0.7) return 'Moderate Risk';
    return 'High Risk';
  };

  const getRiskColor = () => {
    if (result.riskLevel < 0.3) return 'text-green-500';
    if (result.riskLevel < 0.7) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getRiskIcon = () => {
    if (result.riskLevel < 0.3) return <CheckCircle className="h-12 w-12 text-green-500" />;
    if (result.riskLevel < 0.7) return <AlertTriangle className="h-12 w-12 text-yellow-500" />;
    return <XCircle className="h-12 w-12 text-red-500" />;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">
          {type === 'heart' ? 'Heart Disease' : 'Diabetes'} Risk Assessment
        </h3>
        <button
          onClick={onReset}
          className="flex items-center text-blue-500 hover:text-blue-600"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Form
        </button>
      </div>

      <div className="bg-gray-50 rounded-lg p-6 flex items-center space-x-6">
        {getRiskIcon()}
        <div>
          <p className="text-lg font-medium">Risk Level: <span className={getRiskColor()}>{getRiskLevel()}</span></p>
          <p className="text-gray-600">Risk Score: {(result.riskLevel * 100).toFixed(1)}%</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h4 className="font-medium mb-2">Key Risk Factors:</h4>
          <ul className="list-disc list-inside space-y-1 text-gray-600">
            {result.factors.map((factor, index) => (
              <li key={index}>{factor}</li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-medium mb-2">Recommendations:</h4>
          <ul className="list-disc list-inside space-y-1 text-gray-600">
            {result.recommendations.map((recommendation, index) => (
              <li key={index}>{recommendation}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          Note: This is an AI-assisted preliminary assessment. Please consult with a healthcare professional for a comprehensive evaluation and proper medical advice.
        </p>
      </div>
    </div>
  );
}