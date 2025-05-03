import emailjs from 'emailjs-com';

interface EmailParams {
  userEmail: string;
  diagnosisType: string;
  riskLevel: string;
  factors: string[];
  recommendations: string[];
}

export const sendDiagnosisEmail = async ({
  userEmail,
  diagnosisType,
  riskLevel,
  factors,
  recommendations,
}: EmailParams): Promise<{ success: boolean; error?: string }> => {
  const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
  const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;

  if (!PUBLIC_KEY || !SERVICE_ID || !TEMPLATE_ID) {
    console.error('Email configuration missing');
    return { 
      success: false, 
      error: 'Email service configuration is incomplete' 
    };
  }

  try {
    emailjs.init(PUBLIC_KEY);

    const templateParams = {
      to_email: userEmail,
      diagnosis_type: diagnosisType,
      risk_level: riskLevel,
      risk_factors: factors.join('\n• '),
      recommendations: recommendations.join('\n• '),
      date: new Date().toLocaleDateString(),
    };

    await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      templateParams
    );

    return { success: true };
  } catch (error) {
    console.error('Error sending email:', error);
    return { 
      success: false, 
      error: 'Failed to send email. Please try again later.' 
    };
  }
};