import emailjs from 'emailjs-com';

const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;

if (!PUBLIC_KEY || !SERVICE_ID || !TEMPLATE_ID) {
  console.error('EmailJS configuration is missing. Please check your environment variables.');
}

// Initialize EmailJS with public key
emailjs.init(PUBLIC_KEY);

export const EMAIL_CONFIG = {
  serviceId: SERVICE_ID,
  templateId: TEMPLATE_ID,
  userId: PUBLIC_KEY
} as const;