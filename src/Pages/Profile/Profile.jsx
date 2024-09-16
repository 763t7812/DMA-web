// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const Profile = () => {
//   const { id } = useParams(); // Get user ID from URL params
//   const [formData, setFormData] = useState({
//     name: '',
//     address: '',
//     phoneNumber: '',
//     imageFront: '',
//     imageBack: '',
//     nationalId: ''
//   });

//   const [isEditing, setIsEditing] = useState(false);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     axios.get(`https://2lkz6gq8-5002.inc1.devtunnels.ms/api/users/getUserDetails/${id}`)
//       .then(response => {
//         setFormData(response.data);
//         localStorage.setItem("phoneNumber" , formData.phoneNumber )
//         localStorage.setItem("address" , formData.address)
//         localStorage.setItem("nationalId" , formData.nationalId)
//         localStorage.setItem("imageFront" , formData.imageFront)
//         localStorage.setItem("imageBack" , formData.imageBack)
//       })
//       .catch(error => {
//         console.error('Error fetching user data:', error);
//       });
//   }, [id]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value
//     });
//   };

//   const handleFileChange = (e) => {
//     const { name, files } = e.target;
//     const file = files[0];

//     if (file) {
//       const newFile = new File([file], `${name}.png`, { type: file.type });
//       setFormData({
//         ...formData,
//         [name]: newFile
//       });
//     }
//   };

//   const handleEditClick = () => {
//     setIsEditing(true);
//   };

//   const handleSaveClick = () => {
//     setLoading(true);
//     const formDataToSend = new FormData();

//     // Append all form data to the FormData object
//     Object.keys(formData).forEach(key => {
//       if (formData[key]) {
//         formDataToSend.append(key, formData[key]);
//       }
//     });

//     // Send the FormData directly in the PATCH request
//     axios.patch(`https://2lkz6gq8-5002.inc1.devtunnels.ms/api/users/updateUserDetails/${id}`, formDataToSend, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//     })
//       .then(response => {
//         setLoading(false);
//         toast.success('User data updated successfully!');
//         setIsEditing(false);
//       })
//       .catch(error => {
//         setLoading(false);
//         toast.error('Error updating user data!');
//         console.error('Error updating user data:', error);
//       });
//   };

//   console.log(formData.imageFront , "asdf imagess")

//   return (
//     <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
//          <ToastContainer />
//       <h1 className="text-2xl font-bold mb-6 text-center">Profile</h1>
//       <form className="space-y-4">
//         <div>
//           <label className="block text-sm font-medium text-gray-700">Username</label>
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleInputChange}
//             disabled={!isEditing}
//             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700">Address</label>
//           <input
//             type="text"
//             name="address"
//             value={formData.address}
//             onChange={handleInputChange}
//             disabled={!isEditing}
//             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700">Phone Number</label>
//           <input
//             type="number"
//             name="phoneNumber"
//             value={formData.phoneNumber}
//             onChange={handleInputChange}
//             disabled={!isEditing}
//             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700">National ID</label>
//           <input
//             type="text"
//             name="nationalId"
//             value={formData.nationalId}
//             onChange={handleInputChange}
//             disabled={!isEditing}
//             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700">Front Image</label>
//           {isEditing ? (
//             <input
//               type="file"
//               name="imageFront"
//               onChange={handleFileChange}
//               disabled={!isEditing}
//               className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
//             />
//           ) : (
//             <img
//               src={`https://2lkz6gq8-5002.inc1.devtunnels.ms/uploads/${formData.imageFront}`}
//               alt="Front"
//               className="mt-1 block w-32 h-auto rounded-md shadow-sm"
//             />
//           )}
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700">Back Image</label>
//           {isEditing ? (
//             <input
//               type="file"
//               name="imageBack"
//               onChange={handleFileChange}
//               disabled={!isEditing}
//               className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
//             />
//           ) : (
//             <img
//               src={`https://2lkz6gq8-5002.inc1.devtunnels.ms/uploads/${formData.imageBack}` }
//               alt="Back"
//               className="mt-1 block w-32 h-auto rounded-md shadow-sm"
//             />
//           )}
//         </div>
//         {!isEditing ? (
//           <button
//             type="button"
//             onClick={handleEditClick}
//             className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//           >
//             Edit
//           </button>
//         ) : (
//           <button
//             type="button"
//             onClick={handleSaveClick}
//             className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
//             disabled={loading}
//           >
//             {loading ? 'Saving...' : 'Save'}
//           </button>
//         )}
//       </form>
   
//     </div>
//   );
// };

// export default Profile;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ApiUrl from '../../Common/ApiUrl';

const Profile = () => {
  const { id } = useParams(); // Get user ID from URL params
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phoneNumber: '',
    imageFront: '',
    imageBack: '',
    nationalId: '',
    orders: []
  });

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.get(`${ApiUrl}/api/users/getUserDetails/${id}`)
      .then(response => {
        setFormData(response.data);
        localStorage.setItem("phoneNumber", response.data.phoneNumber);
        localStorage.setItem("address", response.data.address);
        localStorage.setItem("nationalId", response.data.nationalId);
        localStorage.setItem("imageFront", response.data.imageFront);
        localStorage.setItem("imageBack", response.data.imageBack);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];

    if (file) {
      const newFile = new File([file], `${name}.png`, { type: file.type });
      setFormData({
        ...formData,
        [name]: newFile
      });
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setLoading(true);
    const formDataToSend = new FormData();

    // Append all form data to the FormData object
    Object.keys(formData).forEach(key => {
      if (formData[key]) {
        if (key === 'orders') {
          formDataToSend.append(key, JSON.stringify(formData[key]));
        } else {
          formDataToSend.append(key, formData[key]);
        }
      }
    });

    // Send the FormData directly in the PATCH request
    axios.patch(`${ApiUrl}/api/users/updateUserDetails/${id}`, formDataToSend, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(response => {
        setLoading(false);
        toast.success('User data updated successfully!');
        setIsEditing(false);
        setFormData(response.data); // Update form data with the latest data
      })
      .catch(error => {
        setLoading(false);
        toast.error('Error updating user data!');
        console.error('Error updating user data:', error);
      });
  };

  console.log(formData.imageFront, "Front Image");
  console.log(formData.imageBack, "Back Image");

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-6 text-center">Profile</h1>
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Username</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            disabled={!isEditing}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            disabled={!isEditing}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Phone Number</label>
          <input
            type="number"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            disabled={!isEditing}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">National ID</label>
          <input
            type="text"
            name="nationalId"
            value={formData.nationalId}
            onChange={handleInputChange}
            disabled={!isEditing}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Front Image</label>
          {isEditing ? (
            <input
              type="file"
              name="imageFront"
              onChange={handleFileChange}
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          ) : (
            <img
              src={`${ApiUrl}/uploads/${formData.imageFront}`}
              alt="Front"
              className="mt-1 block w-32 h-auto rounded-md shadow-sm"
            />
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Back Image</label>
          {isEditing ? (
            <input
              type="file"
              name="imageBack"
              onChange={handleFileChange}
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          ) : (
            <img
              src={`${ApiUrl}/uploads/${formData.imageBack}`}
              alt="Back"
              className="mt-1 block w-32 h-auto rounded-md shadow-sm"
            />
          )}
        </div>
        {!isEditing ? (
          <button
            type="button"
            onClick={handleEditClick}
            className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Edit
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSaveClick}
            className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save'}
          </button>
        )}
      </form>
    </div>
  );
};

export default Profile;
