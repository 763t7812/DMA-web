

import React from 'react';

const AlertModal = ({ isOpen, onClose, message }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-4 rounded shadow-lg lg:w-[20%] md:w-[30%] w-[70%] flex flex-col justify-center items-center">
                <p className="text-lg">{message}</p>
                <button 
                    className="mt-4 px-4 py-2 bg-gray-500 hover:bg-customColor-circleColor text-white rounded"
                    onClick={onClose}
                >
                    OK
                </button>
            </div>
        </div>
    );
};

export default AlertModal;
