import React, { useState } from "react";
import ReactDOM from 'react-dom';

const GuestModal = ({ show, onClose, onSubmit }) => {
    const [paymentDetails, setPaymentDetails] = useState({
        account_number: '',
        total: 0,
        details: '',
        voucher: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPaymentDetails(prevDetails => ({ ...prevDetails, [name]: value }));
    };

    if (!show) return null;

    return ReactDOM.createPortal(
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-semibold mb-4">Payment Details</h2>
                <form>
                    <div className="mb-4">
                        <label htmlFor="account_number" className="block text-gray-700 mb-1">Account Number</label>
                        <input
                            type="text"
                            id="account_number"
                            name="account_number"
                            value={paymentDetails.account_number}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="total" className="block text-gray-700 mb-1">Total</label>
                        <input
                            type="number"
                            id="total"
                            name="total"
                            value={paymentDetails.total}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="details" className="block text-gray-700 mb-1">Details</label>
                        <input
                            type="text"
                            id="details"
                            name="details"
                            value={paymentDetails.details}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="voucher" className="block text-gray-700 mb-1">Voucher</label>
                        <input
                            type="text"
                            id="voucher"
                            name="voucher"
                            value={paymentDetails.voucher}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                onSubmit(paymentDetails);
                                onClose();
                            }}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>,
        document.body
    );
};

export default GuestModal;
