interface RiskFactors {
  [key: string]: string[];
}

const heartRiskFactors: RiskFactors = {
  high: [
    'High blood pressure (>140/90 mmHg)',
    'High cholesterol levels',
    'Abnormal ECG results',
    'Presence of angina',
  ],
  moderate: [
    'Elevated blood pressure (120-139/80-89 mmHg)',
    'Borderline cholesterol levels',
    'Family history of heart disease',
  ],
  low: [
    'Normal blood pressure',
    'Normal cholesterol levels',
    'No significant risk factors',
  ],
};

const diabetesRiskFactors: RiskFactors = {
  high: [
    'High fasting blood sugar (>126 mg/dL)',
    'High HbA1c levels (>6.5%)',
    'Family history of diabetes',
    'High BMI (>30)',
  ],
  moderate: [
    'Elevated fasting blood sugar (100-125 mg/dL)',
    'Elevated HbA1c levels (5.7-6.4%)',
    'Overweight BMI (25-29.9)',
  ],
  low: [
    'Normal blood sugar levels',
    'Normal HbA1c levels',
    'Healthy weight',
  ],
};

const liverRiskFactors: RiskFactors = {
  high: [
    'Elevated total bilirubin (>2.0 mg/dL)',
    'High alkaline phosphatase levels',
    'Elevated liver enzymes (ALT/AST)',
    'Low albumin levels',
  ],
  moderate: [
    'Slightly elevated bilirubin (1.2-2.0 mg/dL)',
    'Borderline liver enzyme levels',
    'Moderate protein imbalance',
  ],
  low: [
    'Normal bilirubin levels',
    'Normal liver enzyme levels',
    'Healthy protein levels',
  ],
};

const recommendations = {
  high: [
    'Immediate consultation with a healthcare provider',
    'Regular monitoring of vital signs',
    'Lifestyle modifications including diet and exercise',
    'Stress management techniques',
  ],
  moderate: [
    'Schedule a check-up with your healthcare provider',
    'Monitor your symptoms',
    'Consider lifestyle modifications',
    'Regular exercise routine',
  ],
  low: [
    'Maintain current healthy lifestyle',
    'Regular check-ups',
    'Continue balanced diet and exercise',
  ],
};

export function calculateHeartRisk(data: any) {
  let riskScore = 0;
  
  riskScore += parseInt(data.age) > 50 ? 0.2 : 0.1;
  
  const systolic = parseInt(data.systolicBP);
  if (systolic > 140) riskScore += 0.3;
  else if (systolic > 120) riskScore += 0.15;
  
  const totalChol = parseInt(data.totalCholesterol);
  if (totalChol > 240) riskScore += 0.2;
  else if (totalChol > 200) riskScore += 0.1;
  
  if (data.ecgResults !== 'normal') riskScore += 0.15;
  
  riskScore = Math.min(riskScore, 1);
  
  const riskLevel = riskScore < 0.3 ? 'low' : riskScore < 0.7 ? 'moderate' : 'high';
  
  return {
    riskLevel: riskScore,
    factors: heartRiskFactors[riskLevel],
    recommendations: recommendations[riskLevel],
  };
}

export function calculateDiabetesRisk(data: any) {
  let riskScore = 0;
  
  const glucose = parseInt(data.plasmaGlucose);
  if (glucose > 126) riskScore += 0.3;
  else if (glucose > 100) riskScore += 0.15;
  
  const hba1c = parseFloat(data.hba1c);
  if (hba1c > 6.5) riskScore += 0.3;
  else if (hba1c > 5.7) riskScore += 0.15;
  
  const bmi = parseFloat(data.bmi);
  if (bmi > 30) riskScore += 0.2;
  else if (bmi > 25) riskScore += 0.1;
  
  if (data.familyHistory === 'yes') riskScore += 0.15;
  
  riskScore = Math.min(riskScore, 1);
  
  const riskLevel = riskScore < 0.3 ? 'low' : riskScore < 0.7 ? 'moderate' : 'high';
  
  return {
    riskLevel: riskScore,
    factors: diabetesRiskFactors[riskLevel],
    recommendations: recommendations[riskLevel],
  };
}

export function calculateLiverRisk(data: any) {
  let riskScore = 0;
  
  const totalBilirubin = parseFloat(data.totalBilirubin);
  if (totalBilirubin > 2.0) riskScore += 0.3;
  else if (totalBilirubin > 1.2) riskScore += 0.15;
  
  const alt = parseInt(data.alt);
  if (alt > 50) riskScore += 0.2;
  else if (alt > 35) riskScore += 0.1;
  
  const ast = parseInt(data.ast);
  if (ast > 40) riskScore += 0.2;
  else if (ast > 30) riskScore += 0.1;
  
  const albumin = parseFloat(data.albumin);
  if (albumin < 3.5) riskScore += 0.3;
  else if (albumin < 4.0) riskScore += 0.15;
  
  riskScore = Math.min(riskScore, 1);
  
  const riskLevel = riskScore < 0.3 ? 'low' : riskScore < 0.7 ? 'moderate' : 'high';
  
  return {
    riskLevel: riskScore,
    factors: liverRiskFactors[riskLevel],
    recommendations: recommendations[riskLevel],
  };
}