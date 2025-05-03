import { createWorker } from 'tesseract.js';

interface ExtractedParameters {
  age?: string;
  gender?: string;
  systolicBP?: string;
  diastolicBP?: string;
  glucose?: string;
  cholesterol?: string;
  hdl?: string;
  ldl?: string;
  triglycerides?: string;
  bmi?: string;
}

const parameterPatterns = {
  age: /age[:\s]+(\d+)/i,
  gender: /gender[:\s]+(male|female)/i,
  systolicBP: /systolic(?:\sblood\spressure)?[:\s]+(\d+)/i,
  diastolicBP: /diastolic(?:\sblood\spressure)?[:\s]+(\d+)/i,
  glucose: /(?:blood\s)?glucose[:\s]+(\d+)/i,
  cholesterol: /(?:total\s)?cholesterol[:\s]+(\d+)/i,
  hdl: /hdl[:\s]+(\d+)/i,
  ldl: /ldl[:\s]+(\d+)/i,
  triglycerides: /triglycerides[:\s]+(\d+)/i,
  bmi: /bmi[:\s]+(\d+\.?\d*)/i
};

export async function extractParameters(imageFile: File): Promise<ExtractedParameters> {
  const worker = await createWorker();
  await worker.loadLanguage('eng');
  await worker.initialize('eng');
  
  const { data: { text } } = await worker.recognize(imageFile);
  await worker.terminate();

  const parameters: ExtractedParameters = {};
  
  // Extract values using patterns
  Object.entries(parameterPatterns).forEach(([key, pattern]) => {
    const match = text.match(pattern);
    if (match && match[1]) {
      parameters[key as keyof ExtractedParameters] = match[1].toLowerCase();
    }
  });

  return parameters;
}