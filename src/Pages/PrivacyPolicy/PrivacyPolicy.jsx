import React, { useEffect } from "react";

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-4xl font-bold mb-6 text-center">Privacy Policy</h2>
        <div className="space-y-6 text-gray-700">
          <section>
            <h3 className="text-2xl font-semibold mb-2">1. Introduction</h3>
            <p>
              We value your privacy and are committed to protecting your
              personal information. This Privacy Policy outlines how we collect,
              use, and safeguard your data.
            </p>
          </section>
          <section>
            <h3 className="text-2xl font-semibold mb-2">
              2. Information We Collect
            </h3>
            <p>
              We collect information that you provide to us directly, such as
              when you create an account, make a rental request, or contact
              customer support. This includes your name, email, phone number, address, National Id
              and ID card Images.
            </p>
          </section>
          <section>
            <h3 className="text-2xl font-semibold mb-2">
              3. Use of Information
            </h3>
            <p>
              We use your information to provide and improve our services,
              process transactions, communicate with you, and for security and
              fraud prevention purposes.
            </p>
          </section>
          <section>
            <h3 className="text-2xl font-semibold mb-2">
              4. Sharing of Information
            </h3>
            <p>
              We do not share your personal information with third parties
              except as necessary to provide our services, comply with the law,
              or protect our rights.
            </p>
          </section>
          <section>
            <h3 className="text-2xl font-semibold mb-2">5. Data Security</h3>
            <p>
              We implement appropriate security measures to protect your data
              from unauthorized access, disclosure, alteration, and destruction.
            </p>
          </section>
          <section>
            <h3 className="text-2xl font-semibold mb-2">6. Your Rights</h3>
            <p>
              You have the right to access, update, or delete your personal
              information. If you wish to exercise these rights, please contact
              us.
            </p>
          </section>
          <section>
            <h3 className="text-2xl font-semibold mb-2">
              7. Contact Information
            </h3>
            <p>
              If you have any questions about this Privacy Policy, please
              contact us at:
            </p>
            <ul className="list-disc list-inside mt-2">
              <li>
                Visit us at : Thomas street, Sunshine Av., San Juan , Trinidad
                and Tobago.
              </li>
              <li>Email us at: dmag_07@yahoo.com</li>
              <li>Call us at: (868)- 674-6178</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
