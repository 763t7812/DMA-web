import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import MoneyBack from '../../Components/Sections/MoneyBack';
import { removeFromCart, updateQuantity, updateDuration, clearCart } from '../../Slice/Cart/CartSlice';
import ApiUrl from '../../Common/ApiUrl';
import AlertModal from '../../Components/Modal/AlertModal';

const AddToCart = () => {
    const getToken = () => localStorage.getItem('token');
    const getUserId = () => localStorage.getItem('userId');
    const token = getToken();
    const userId = getUserId();
    const cart = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [customDuration, setCustomDuration] = useState('');
    const [isCustomizing, setIsCustomizing] = useState(false);
    const [isCheckoutEnabled, setIsCheckoutEnabled] = useState(false);

    const [rentalDates, setRentalDates] = useState(cart.reduce((acc, item) => ({
        ...acc,
        [item._id + item.size]: { rentalDate: null, returnDate: null },
    }), {}));

    useEffect(() => {
        const allDatesSelected = Object.values(rentalDates).every(item => item.rentalDate && item.returnDate);
        setIsCheckoutEnabled(allDatesSelected);
    }, [rentalDates]);

    const handleIncreaseQuantity = (id, size) => {
        const item = cart.find(item => item._id === id && item.size === size);
        if (item) {
            dispatch(updateQuantity({ id, size, quantity: item.quantity + 1 }));
        }
    };

    const handleDecreaseQuantity = (id, size) => {
        const item = cart.find(item => item._id === id && item.size === size);
        if (item && item.quantity > 1) {
            dispatch(updateQuantity({ id, size, quantity: item.quantity - 1 }));
        }
    };

    const handleDurationChange = (id, size, duration) => {
        if (duration === 'Customize') {
            setIsCustomizing(true);
            setCustomDuration('');
        } else {
            setIsCustomizing(false);
            const item = cart.find(item => item._id === id && item.size === size);
            if (item) {
                dispatch(updateDuration({ id, size, duration }));
            }
        }
    };

    const handleCustomDurationChange = (e) => {
        setCustomDuration(e.target.value);
    };

    const handleRentalDateChange = (id, size, dateType, date) => {
        setRentalDates(prevDates => ({
            ...prevDates,
            [id + size]: {
                ...prevDates[id + size],
                [dateType]: date,
            },
        }));
    };

    // const calculateRentalPrice = (item) => {
    //     const rentalInfo = rentalDates[item._id + item.size];
    //     if (rentalInfo.rentalDate && rentalInfo.returnDate) {
    //         const daysRented = Math.ceil((rentalInfo.returnDate - rentalInfo.rentalDate) / (1000 * 60 * 60 * 24));
    //         return item.rentalPrice * item.quantity * daysRented;
    //     }
    //     return 0;
    // };

    const calculateRentalPrice = (item) => {
        const rentalInfo = rentalDates[item._id + item.size];
        if (rentalInfo.rentalDate && rentalInfo.returnDate) {
            // Calculate the number of days rented
            const daysRented = Math.ceil((rentalInfo.returnDate - rentalInfo.rentalDate) / (1000 * 60 * 60 * 24)) + 1;
    
            // Ensure that at least one day's rent is charged
            return item.rentalPrice * item.quantity * daysRented;
        }
        return 0;
    };
    


    const handleProceedToCheckout = () => {
        const orderData = {
            userId: userId,
            items: cart.map(item => {
                const rentalInfo = rentalDates[item._id + item.size];
                return {
                    productId: item._id,
                    productName: item.name,
                    size: item.size,
                    quantity: item.quantity,
                    rentDate: rentalInfo.rentalDate,
                    returnDate: rentalInfo.returnDate,
                    price: calculateRentalPrice(item),
                };
            }),
        };
        navigate('/agreement', { state: { orderData } });
    };

    const additionalDurations = ['2 months', '4 months', '6 months', '1 year'];
    const durationOptions = Array.from(new Set([...additionalDurations, ...cart.map(item => item.duration), 'Customize']));

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const today = new Date();

    return (
        <div>
            <div className="p-8 max-h-screen h-[70vh] flex items-center lg:flex-row flex-col">
                <div className="lg:w-[80%] w-[100%] max-w-5xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-[80%] divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className='ml-4'></th>
                                    <th className="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">Product</th>
                                    <th className="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">Product Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">Size</th>
                                    <th className="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">Rental Date</th>
                                    <th className="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">Return Date</th>
                                    <th className="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">Quantity</th>
                                    <th className="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">Price</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {cart.map((item) => (
                                    <tr key={item._id + item.size}>
                                        <td className='ml-4 pl-4'>
                                            <button onClick={() => dispatch(removeFromCart({ id: item._id, size: item.size }))}>
                                                X
                                            </button>
                                        </td>
                                        <td className="px-6 py-2 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <img src={`${ApiUrl}${item.image}`} alt="Product" className="w-12 h-12 rounded-md" />
                                            </div>
                                        </td>
                                        <td className="px-6 py-2 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="text-sm font-medium text-gray-900">{item.name}</div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-2 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">{item.size}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <DatePicker
                                                selected={rentalDates[item._id + item.size]?.rentalDate}
                                                onChange={(date) => handleRentalDateChange(item._id, item.size, 'rentalDate', date)}
                                                selectsStart
                                                startDate={rentalDates[item._id + item.size]?.rentalDate}
                                                endDate={rentalDates[item._id + item.size]?.returnDate}
                                                className="block w-full mt-1 text-sm border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                                placeholderText="Select rental date"
                                                minDate={today}
                                            />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <DatePicker
                                                selected={rentalDates[item._id + item.size]?.returnDate}
                                                onChange={(date) => handleRentalDateChange(item._id, item.size, 'returnDate', date)}
                                                selectsEnd
                                                startDate={rentalDates[item._id + item.size]?.rentalDate}
                                                endDate={rentalDates[item._id + item.size]?.returnDate}
                                                minDate={rentalDates[item._id + item.size]?.rentalDate || today}
                                                className="block w-full mt-1 text-sm border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                                placeholderText="Select return date"
                                            />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900 flex items-center">
                                                <button
                                                    className="ml-2 text-2xl text-white bg-gray-500 rounded-full flex items-center justify-center w-8 h-8"
                                                    onClick={() => handleDecreaseQuantity(item._id, item.size)}
                                                >
                                                    -
                                                </button>
                                                <span className="mx-4">{item.quantity}</span>
                                                <button
                                                    className="ml-2 text-xl text-white bg-customColor-circleColor rounded-full flex items-center justify-center w-8 h-8"
                                                    onClick={() => handleIncreaseQuantity(item._id, item.size)}
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">$<span className='text-customColor-circleColor'>{calculateRentalPrice(item)}</span></div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="mt-8 lg:w-[20%] w-[100%] bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-4 underline decoration-yellow-500 underline-offset-4">Total Bill</h2>
                    <div className="flex justify-between mb-4">
                        <span className="text-gray-600">Total</span>
                        <span className="text-gray-900">
                            ${cart.reduce((total, item) => total + calculateRentalPrice(item), 0)}
                        </span>
                    </div>
                    <button disabled={!isCheckoutEnabled} className={`w-full text-white py-2 rounded-lg font-semibold transition duration-200 ${isCheckoutEnabled ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-gray-400 cursor-not-allowed'}`} onClick={handleProceedToCheckout}>
                        Proceed to Checkout
                    </button>
                </div>
            </div>
            <div>
                <MoneyBack />
            </div>
            <AlertModal isOpen={isModalOpen} onClose={handleCloseModal} message={modalMessage} />
        </div>
    );
}

export default AddToCart;
