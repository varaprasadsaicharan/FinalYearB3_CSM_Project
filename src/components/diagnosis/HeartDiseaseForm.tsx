import React from 'react';
import { FormField } from './FormField';
import { SelectField } from './SelectField';

interface HeartDiseaseFormProps {
  onSubmit: (data: any) => void;
  loading: boolean;
}

export function HeartDiseaseForm({ onSubmit, loading }: HeartDiseaseFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          label="Age"
          name="age"
          type="number"
          required
        />
        <SelectField
          label="Gender"
          name="gender"
          options={[
            { value: 'male', label: 'Male' },
            { value: 'female', label: 'Female' }
          ]}
          required
        />
        <FormField
          label="Systolic Blood Pressure"
          name="systolicBP"
          type="number"
          required
        />
        <FormField
          label="Diastolic Blood Pressure"
          name="diastolicBP"
          type="number"
          required
        />
        <FormField
          label="Total Cholesterol"
          name="totalCholesterol"
          type="number"
          required
        />
        <FormField
          label="HDL Cholesterol"
          name="hdlCholesterol"
          type="number"
          required
        />
        <FormField
          label="LDL Cholesterol"
          name="ldlCholesterol"
          type="number"
          required
        />
        <FormField
          label="Fasting Blood Sugar"
          name="fastingBloodSugar"
          type="number"
          required
        />
        <FormField
          label="Resting Heart Rate"
          name="restingHeartRate"
          type="number"
          required
        />
        <SelectField
          label="ECG Results"
          name="ecgResults"
          options={[
            { value: 'normal', label: 'Normal' },
            { value: 'st_depression', label: 'ST Depression' },
            { value: 't_wave_inversion', label: 'T-wave Inversion' }
          ]}
          required
        />
        <SelectField
          label="Angina Status"
          name="anginaStatus"
          options={[
            { value: 'typical', label: 'Typical Angina' },
            { value: 'atypical', label: 'Atypical Angina' },
            { value: 'non_anginal', label: 'Non-anginal Pain' },
            { value: 'asymptomatic', label: 'Asymptomatic' }
          ]}
          required
        />
        <SelectField
          label="Thalassemia"
          name="thalassemia"
          options={[
            { value: 'normal', label: 'Normal' },
            { value: 'fixed_defect', label: 'Fixed Defect' },
            { value: 'reversible_defect', label: 'Reversible Defect' }
          ]}
          required
        />
        <SelectField
          label="Diabetes Status"
          name="diabetesStatus"
          options={[
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' }
          ]}
          required
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
      >
        {loading ? 'Processing...' : 'Get Heart Disease Diagnosis'}
      </button>
    </form>
  );
}