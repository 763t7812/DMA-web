// import React, { useState } from 'react';

// const BankTransferModal = ({ show, onClose, onSubmit }) => {
//   const [accountNumber, setAccountNumber] = useState('');
//   const [bankName, setBankName] = useState('');
//   const [transactionId, setTransactionId] = useState('');

//   const handleSubmit = () => {
//     const bankTransferDetails = {
//       paymentMethod: 'bankTransfer',
//       accountNumber,
//       bankName,
//       transactionId,
//     };
//     onSubmit(bankTransferDetails);
//   };

//   if (!show) {
//     return null;
//   }

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//       <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
//         <h2 className="text-2xl font-bold mb-4">Bank Transfer Details</h2>
//         <div className="mb-4">
//           <label className="block text-gray-700 mb-2">Account Number:</label>
//           <input
//             type="text"
//             value={accountNumber}
//             onChange={(e) => setAccountNumber(e.target.value)}
//             className="w-full p-2 border rounded"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700 mb-2">Bank Name:</label>
//           <input
//             type="text"
//             value={bankName}
//             onChange={(e) => setBankName(e.target.value)}
//             className="w-full p-2 border rounded"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700 mb-2">Transaction ID:</label>
//           <input
//             type="text"
//             value={transactionId}
//             onChange={(e) => setTransactionId(e.target.value)}
//             className="w-full p-2 border rounded"
//           />
//         </div>
//         <div className="flex justify-end">
//           <button className="bg-gray-500 text-white px-4 py-2 rounded mr-2" onClick={onClose}>
//             Cancel
//           </button>
//           <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleSubmit}>
//             Submit
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BankTransferModal;


import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ApiUrl from '../../Common/ApiUrl';

const BankTransferModal = ({ show, onClose, onSubmit }) => {
  const [screenshot, setScreenshot] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setScreenshot(file);
    }
  };

  const handleSubmit = () => {
    if (!screenshot) {
      toast.error('Please upload a screenshot.');
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append('paymentMethod', 'BankTransfer');
    formData.append('screenshot', screenshot);

    axios.post(`${ApiUrl}/api/payments/bankPayment`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(response => {
        setLoading(false);
        toast.success('Screenshot uploaded successfully!');
        onSubmit({
          paymentMethod: 'bankTransfer',
          screenshot: response.data.filePath,
        });
      })
      .catch(error => {
        setLoading(false);
        toast.error('Error uploading screenshot.');
        console.error('Error:', error);
      });
  };

  if (!show) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-lg">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Bank Transfer Details</h2>
        <div className="mb-5">
          <label className="block text-lg font-medium text-gray-600 mb-1">Bank Name:</label>
          <p className="w-full p-3 border rounded-lg bg-gray-100 text-gray-700">XYZ Bank</p>
        </div>
        <div className="mb-5">
          <label className="block text-lg font-medium text-gray-600 mb-1">Account Number:</label>
          <p className="w-full p-3 border rounded-lg bg-gray-100 text-gray-700">123456789012</p>
        </div>
        <div className="mb-5">
          <label className="block text-lg font-medium text-gray-600 mb-1">Transaction ID:</label>
          <p className="w-full p-3 border rounded-lg bg-gray-100 text-gray-700">TXN123456</p>
        </div>
        <div className="mb-6">
          <label className="block text-lg font-medium text-gray-600 mb-1">Upload Screenshot:</label>
          <input
            type="file"
            onChange={handleFileChange}
            className="w-full p-3 border rounded-lg bg-white text-gray-700"
          />
        </div>
        <div className="flex justify-end space-x-3">
          <button
            className="bg-gray-400 text-white px-5 py-2 rounded-lg shadow hover:bg-gray-500"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-yellow-500 text-white px-5 py-2 rounded-lg shadow hover:bg-yellow-600"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? 'Uploading...' : 'Submit'}
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default BankTransferModal;
