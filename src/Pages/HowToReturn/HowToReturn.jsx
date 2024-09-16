import React, { useEffect } from "react";

const HowToReturn = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-100 min-h-screen">
      <h2 className="text-4xl font-bold mb-6 text-center">
        How to Return Your Scaffolding
      </h2>
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h3 className="text-2xl font-semibold mb-4">
          Follow these simple steps to return your scaffolding:
        </h3>
        <ol className="list-decimal list-inside space-y-4 text-gray-700">
          <li>
            <strong>Step 1: Schedule a Pickup</strong>
            <p>
            Contact our customer service team to schedule a pickup. Provide your rental agreement number and preferred pickup date.
            </p>
          </li>
          <li>
            <strong>Step 2: Prepare the Scaffolding</strong>
            <p>
            Ensure all scaffolding components are clean and disassembled. Place all items in the provided return containers.
            </p>
          </li>
          <li>
            <strong>Step 3: Verify the Inventory</strong>
            <p>
            Check that all rented items are accounted for. Any missing or damaged items may incur additional charges.
            </p>
          </li>
          <li>
            <strong>Step 4: Handover to Pickup Team</strong>
            <p>
            Our pickup team will arrive at the scheduled time with the order/invoice. They will verify the items being returned. Once everything is confirmed, you will be asked to sign and date the document to acknowledge the return.
            </p>
          </li>
        </ol>
        <div className="mt-6">
          <h4 className="text-xl font-semibold mb-2">Need Assistance?</h4>
          <p>
            If you have any questions or need help with the return process,
            please contact our customer support team at:
          </p>
          <ul className="list-disc list-inside mt-2">
            <li>
              Visit us at : #7 Thomas Street, Sunshine Avenue, San Juan, Trinidad and Tobago
            </li>
            <li>Email us at: dmag_07@yahoo.com</li>
            <li>Call us at: (868)- 674-6178</li>
            <li>Call us at: (868)-374-7563</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HowToReturn;
