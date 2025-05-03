import React from 'react';
import { FormField } from './FormField';
import { SelectField } from './SelectField';

interface LiverDiseaseFormProps {
  onSubmit: (data: any) => void;
  loading: boolean;
}

export function LiverDiseaseForm({ onSubmit, loading }: LiverDiseaseFormProps) {
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
          label="Total Bilirubin"
          name="totalBilirubin"
          type="number"
          step="0.1"
          required
        />
        <FormField
          label="Direct Bilirubin"
          name="directBilirubin"
          type="number"
          step="0.1"
          required
        />
        <FormField
          label="Alkaline Phosphatase"
          name="alkalinePhosphatase"
          type="number"
          required
        />
        <FormField
          label="ALT (SGPT)"
          name="alt"
          type="number"
          required
        />
        <FormField
          label="AST (SGOT)"
          name="ast"
          type="number"
          required
        />
        <FormField
          label="Total Proteins"
          name="totalProteins"
          type="number"
          step="0.1"
          required
        />
        <FormField
          label="Albumin"
          name="albumin"
          type="number"
          step="0.1"
          required
        />
        <FormField
          label="Albumin/Globulin Ratio"
          name="albuminGlobulinRatio"
          type="number"
          step="0.1"
          required
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
      >
        {loading ? 'Processing...' : 'Get Liver Disease Diagnosis'}
      </button>
    </form>
  );
}