import React, { useState } from 'react';
import { Upload, Loader2, AlertCircle } from 'lucide-react';
import { extractParameters } from '../../utils/imageProcessing';

interface ImageUploadProps {
  onParametersExtracted: (parameters: Record<string, string>) => void;
}

export function ImageUpload({ onParametersExtracted }: ImageUploadProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [extractedText, setExtractedText] = useState<string | null>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Show image preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    setLoading(true);
    setError(null);
    setExtractedText(null);

    try {
      const parameters = await extractParameters(file);
      
      // Check if we have enough parameters
      const requiredParams = ['age', 'gender', 'systolicBP', 'glucose'];
      const missingParams = requiredParams.filter(param => !parameters[param]);
      
      if (missingParams.length > 0) {
        setError(`Missing required parameters: ${missingParams.join(', ')}`);
        return;
      }

      onParametersExtracted(parameters);
    } catch (err) {
      setError('Failed to extract parameters from the image. Please ensure the image is clear and contains medical data.');
      console.error('OCR Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-blue-500 transition-colors">
        <label className="flex flex-col items-center cursor-pointer">
          <Upload className="h-12 w-12 text-gray-400 mb-3" />
          <span className="text-sm font-medium text-blue-600">Upload medical report image</span>
          <span className="text-xs text-gray-500 mt-1">PNG, JPG up to 10MB</span>
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleImageUpload}
            disabled={loading}
          />
        </label>
      </div>

      {preview && (
        <div className="mt-4">
          <img
            src={preview}
            alt="Report preview"
            className="max-h-48 mx-auto rounded-lg shadow-md"
          />
        </div>
      )}

      {loading && (
        <div className="flex items-center justify-center text-blue-600 mt-4">
          <Loader2 className="animate-spin h-5 w-5 mr-2" />
          <span>Analyzing image...</span>
        </div>
      )}

      {error && (
        <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-md mt-4">
          <AlertCircle className="h-5 w-5" />
          <span>{error}</span>
        </div>
      )}

      {extractedText && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium mb-2">Extracted Parameters:</h4>
          <pre className="text-sm text-gray-600 whitespace-pre-wrap">
            {extractedText}
          </pre>
        </div>
      )}
    </div>
  );
}