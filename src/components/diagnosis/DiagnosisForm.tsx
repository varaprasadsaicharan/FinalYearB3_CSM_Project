import React, { useState } from 'react';
import { HeartPulse, Stethoscope, Activity } from 'lucide-react';
import { HeartDiseaseForm } from './HeartDiseaseForm';
import { DiabetesForm } from './DiabetesForm';
import { LiverDiseaseForm } from './LiverDiseaseForm';
import { ImageUpload } from './ImageUpload';
import { DiagnosisResult } from './DiagnosisResult';
import { calculateHeartRisk, calculateDiabetesRisk, calculateLiverRisk } from '../../utils/riskCalculation';
import { sendDiagnosisEmail } from '../../utils/emailService';
import { useAuth } from '../../context/AuthContext';

type DiagnosisType = 'heart' | 'diabetes' | 'liver';

export interface DiagnosisData {
  riskLevel: number;
  factors: string[];
  recommendations: string[];
}

export function DiagnosisForm() {
  const [diagnosisType, setDiagnosisType] = useState<DiagnosisType>('heart');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DiagnosisData | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [useImageUpload, setUseImageUpload] = useState(false);
  const { user } = useAuth();

  const handleSubmit = async (data: any) => {
    setLoading(true);
    setEmailError(null);
    
    try {
      const diagnosisResult = 
        diagnosisType === 'heart' ? calculateHeartRisk(data) :
        diagnosisType === 'diabetes' ? calculateDiabetesRisk(data) :
        calculateLiverRisk(data);

      setResult(diagnosisResult);

      if (user?.email) {
        const emailResult = await sendDiagnosisEmail({
          userEmail: user.email,
          diagnosisType: 
            diagnosisType === 'heart' ? 'Heart Disease' :
            diagnosisType === 'diabetes' ? 'Diabetes' :
            'Liver Disease',
          riskLevel: `${(diagnosisResult.riskLevel * 100).toFixed(1)}%`,
          factors: diagnosisResult.factors,
          recommendations: diagnosisResult.recommendations,
        });

        if (!emailResult.success) {
          setEmailError(emailResult.error || 'Failed to send email report');
        }
      }
    } catch (error) {
      console.error('Error:', error);
      setEmailError('An error occurred while processing your request');
    } finally {
      setLoading(false);
    }
  };

  const handleParametersExtracted = (parameters: Record<string, string>) => {
    handleSubmit(parameters);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">Select Diagnosis Type</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => {
              setDiagnosisType('heart');
              setResult(null);
              setEmailError(null);
            }}
            className={`p-4 rounded-lg border-2 flex items-center justify-center ${
              diagnosisType === 'heart'
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200'
            }`}
          >
            <HeartPulse className="h-6 w-6 mr-2 text-blue-500" />
            <span>Heart Disease</span>
          </button>
          <button
            onClick={() => {
              setDiagnosisType('diabetes');
              setResult(null);
              setEmailError(null);
            }}
            className={`p-4 rounded-lg border-2 flex items-center justify-center ${
              diagnosisType === 'diabetes'
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200'
            }`}
          >
            <Stethoscope className="h-6 w-6 mr-2 text-blue-500" />
            <span>Diabetes</span>
          </button>
          <button
            onClick={() => {
              setDiagnosisType('liver');
              setResult(null);
              setEmailError(null);
            }}
            className={`p-4 rounded-lg border-2 flex items-center justify-center ${
              diagnosisType === 'liver'
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200'
            }`}
          >
            <Activity className="h-6 w-6 mr-2 text-blue-500" />
            <span>Liver Disease</span>
          </button>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">Choose Input Method</h3>
        <div className="flex space-x-4">
          <button
            onClick={() => setUseImageUpload(false)}
            className={`px-4 py-2 rounded-md ${
              !useImageUpload
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700'
            }`}
          >
            Manual Entry
          </button>
          <button
            onClick={() => setUseImageUpload(true)}
            className={`px-4 py-2 rounded-md ${
              useImageUpload
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700'
            }`}
          >
            Upload Image
          </button>
        </div>
      </div>

      {emailError && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md">
          {emailError}
        </div>
      )}

      {!user && (
        <div className="mb-4 p-3 bg-yellow-50 text-yellow-700 rounded-md">
          Please log in to receive your diagnosis report via email.
        </div>
      )}

      {result ? (
        <DiagnosisResult 
          result={result} 
          type={diagnosisType}
          onReset={() => {
            setResult(null);
            setEmailError(null);
          }}
        />
      ) : useImageUpload ? (
        <ImageUpload onParametersExtracted={handleParametersExtracted} />
      ) : (
        diagnosisType === 'heart' ? (
          <HeartDiseaseForm onSubmit={handleSubmit} loading={loading} />
        ) : diagnosisType === 'diabetes' ? (
          <DiabetesForm onSubmit={handleSubmit} loading={loading} />
        ) : (
          <LiverDiseaseForm onSubmit={handleSubmit} loading={loading} />
        )
      )}
    </div>
  );
}