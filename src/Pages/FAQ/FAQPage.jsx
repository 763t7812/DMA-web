import React, { useEffect } from 'react';

const FAQPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const faqs = [
    { question: 'How do I rent scaffolding?', answer: 'To rent scaffolding, log in to your account, select the scaffolding you need, and provide the necessary information. Our team will get in touch with you to finalize the rental.' },
    { question: 'What are the rental rates?', answer: 'Our rental rates vary based on the type and duration of the rental. Please visit our pricing page for detailed information.' },
    { question: 'Is there a minimum rental period?', answer: 'Yes, the minimum rental period is one day. Shorter rental periods are not available.' },
    { question: 'Will my privacy be maintained?', answer: 'Yes, your privacy will be maintained. We adhere to strict privacy policies to ensure your information is protected.' },
    { question: 'What types of scaffolding do you offer?', answer: 'We offer a variety of scaffolding types including frame scaffolding, system scaffolding, and suspended scaffolding. Please contact us for more details on each type.' },
    { question: 'Do you provide delivery and setup services?', answer: 'Yes, we provide delivery and setup services for all our scaffolding rentals. Additional charges may apply based on location and complexity.' },
    { question: 'Are your scaffolding systems compliant with safety standards?', answer: 'Absolutely. All our scaffolding systems comply with the latest safety standards and regulations to ensure your project site is safe.' },
    { question: 'What should I do if I need to extend my rental period?', answer: 'If you need to extend your rental period, please contact our customer service team as soon as possible. Extensions are subject to availability and additional charges.' },
    { question: 'Do you offer training on how to use the scaffolding?', answer: 'Yes, we offer training sessions on the safe and efficient use of our scaffolding systems. Please contact us to schedule a training session.' },
    { question: 'What is your cancellation policy?', answer: 'Cancellations made at least 48 hours before the scheduled delivery will receive a full refund. Cancellations made within 48 hours of delivery may be subject to a cancellation fee.' },
    { question: 'How can I contact customer support?', answer: 'You can contact our customer support team via phone, email, or through our website’s contact form. Our team is available to assist you with any questions or concerns.' },
  ];

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-100 min-h-screen">
      <h2 className="text-4xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
      <div className="max-w-3xl mx-auto">
        {faqs.map((faq, index) => (
          <div key={index} className="mb-8 p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2 text-customColor-circleColor">{faq.question}</h3>
            <p className="text-gray-700">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQPage;
