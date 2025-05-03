import React from 'react';
import { FormField } from './FormField';
import { SelectField } from './SelectField';

interface DiabetesFormProps {
  onSubmit: (data: any) => void;
  loading: boolean;
}

export function DiabetesForm({ onSubmit, loading }: DiabetesFormProps) {
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
          label="Plasma Glucose Level"
          name="plasmaGlucose"
          type="number"
          required
        />
        <FormField
          label="2-Hour Postprandial Glucose"
          name="postprandialGlucose"
          type="number"
          required
        />
        <FormField
          label="Hemoglobin A1c (HbA1c)"
          name="hba1c"
          type="number"
          step="0.1"
          required
        />
        <FormField
          label="Fasting Insulin Level"
          name="fastingInsulin"
          type="number"
          required
        />
        <FormField
          label="Triglycerides"
          name="triglycerides"
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
          label="BMI"
          name="bmi"
          type="number"
          step="0.1"
          required
        />
        <SelectField
          label="Family History of Diabetes"
          name="familyHistory"
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
        {loading ? 'Processing...' : 'Get Diabetes Diagnosis'}
      </button>
    </form>
  );
}