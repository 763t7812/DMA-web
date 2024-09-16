import React, { useState } from 'react';
import ApiUrl from '../../Common/ApiUrl';
import AlertModal from './AlertModal';

const FeedbackModal = ({ isOpen, onClose }) => {
    const [feedback, setFeedback] = useState('');
    const [openAlert, setOpenAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userId = localStorage.getItem('userId');

        const data = {
            message: feedback,
            userId: userId
        };

        try {
            const response = await fetch(`${ApiUrl}/api/feedback/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                console.log('Feedback sent successfully');
                alert('Feedback submitted successfully.');
                // setOpenAlert(true);
                onClose(); // Close the feedback modal
            } else {
                if (response.status === 500) {
                    // Show login alert
                    setOpenAlert(true);
                    setAlertMessage('Please login first.');
                } else {
                    console.log('Error sending feedback');
                }
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleCloseAlert = () => {
        setOpenAlert(false);
    };

    if (!isOpen) return null;

    return (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
            <div className='bg-white p-6 rounded shadow-lg w-96'>
                <h2 className='text-xl font-bold mb-4'>Feedback</h2>
                <form onSubmit={handleSubmit}>
                    <textarea
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        className='w-full p-2 border rounded mb-4'
                        placeholder='Enter your feedback'
                    />
                    <div className='flex justify-end'>
                        <button
                            type='button'
                            onClick={onClose}
                            className='bg-gray-500 text-white px-4 py-2 rounded mr-2'
                        >
                            Close
                        </button>
                        <button
                            type='submit'
                            className='bg-blue-500 text-white px-4 py-2 rounded'
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
            {openAlert && (
                <AlertModal
                    isOpen={openAlert}
                    onClose={handleCloseAlert}
                    message={alertMessage}
                />
            )}
        </div>
    );
};

export default FeedbackModal;
