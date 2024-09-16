import React, { useEffect } from "react";

const TermsOfUse = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-4xl font-bold mb-6 text-center">Terms of Use</h2>
        <div className="space-y-6 text-gray-700">
          <section>
            <h3 className="text-2xl font-semibold mb-2">
              1. Acceptance of Terms
            </h3>
            <p>
              By accessing and using our services, you accept and agree to be
              bound by the terms and provisions of this agreement. If you do not
              agree to abide by these terms, please do not use our services.
            </p>
          </section>
          <section>
            <h3 className="text-2xl font-semibold mb-2">
              2. Modification of Terms
            </h3>
            <p>
              We reserve the right to change, modify, or revise these terms at
              any time. Any changes will be effective immediately upon posting.
              Your continued use of the service after any changes constitutes
              your acceptance of the new terms.
            </p>
          </section>
          <section>
            <h3 className="text-2xl font-semibold mb-2">
              3. User Responsibilities
            </h3>
            <p>
              Users are responsible for providing accurate and up-to-date
              information during the rental process. Misrepresentation or
              fraudulent information may result in termination of services and
              possible legal action.
            </p>
          </section>
          <section>
            <h3 className="text-2xl font-semibold mb-2">
              4. Limitation of Liability
            </h3>
            <p>
              We are not liable for any damages that may occur from the use or
              inability to use our services. This includes, but is not limited
              to, direct, indirect, incidental, punitive, and consequential
              damages.
            </p>
          </section>
          <section>
            <h3 className="text-2xl font-semibold mb-2">5. Governing Law</h3>
            <p>
              These terms are governed by and construed in accordance with the
              laws of the jurisdiction in which our company is established,
              without regard to its conflict of law principles.
            </p>
          </section>
          <section>
            <h3 className="text-2xl font-semibold mb-2">
              6. Contact Information
            </h3>
            <p>
              If you have any questions about these Terms of Use, please contact
              us at:
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

export default TermsOfUse;
