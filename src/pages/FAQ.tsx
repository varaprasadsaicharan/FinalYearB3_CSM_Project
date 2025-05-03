import React from 'react';

export function FAQ() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Frequently Asked Questions
        </h1>
        <p className="text-lg text-gray-600">
          Find answers to common questions about our AI diagnostic system.
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-8">
        <FAQItem
          question="How accurate are the AI predictions?"
          answer="Our AI models have been trained on extensive medical datasets and validated by healthcare professionals. They typically achieve accuracy rates above 90% in controlled studies. However, all results should be confirmed by a qualified medical professional."
        />
        <FAQItem
          question="Is my medical data secure?"
          answer="Yes, we take data security very seriously. All data is encrypted both in transit and at rest, and we comply with HIPAA and other relevant healthcare data protection regulations."
        />
        <FAQItem
          question="How long does a diagnosis take?"
          answer="Most diagnostic assessments are completed within seconds. However, the thoroughness of the input data directly affects the accuracy of the results."
        />
        <FAQItem
          question="Can this replace my doctor?"
          answer="No, our AI diagnostic system is designed to be a supportive tool for healthcare professionals, not a replacement. Always consult with qualified medical professionals for official diagnoses and treatment plans."
        />
      </div>
    </div>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{question}</h3>
      <p className="text-gray-600">{answer}</p>
    </div>
  );
}