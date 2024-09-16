// import React from "react";
// import { FaTools, FaBuilding, FaWrench, FaTruck } from "react-icons/fa";

// const ServicesPage = () => {
//   const services = [
//     {
//       title: "Scaffold Rental and Erection",
//       description:
//         "Providing safe and reliable scaffolding rental and erection services for over 15 years.",
//       icon: <FaBuilding className="text-4xl text-blue-500" />,
//     },
//     {
//       title: "Hardware Supply",
//       description:
//         "Supplying a wide range of hardware and plumbing supplies for residential, commercial, and public sector needs.",
//       icon: <FaWrench className="text-4xl text-green-500" />,
//     },
//     {
//       title: "Tool Rental",
//       description:
//         "Comprehensive tool rental services for residential and commercial projects.",
//       icon: <FaTools className="text-4xl text-yellow-500" />,
//     },
//     {
//       title: "Construction & Project Management",
//       description:
//         "Managing construction projects from start to finish with experienced project managers.",
//       icon: <FaBuilding className="text-4xl text-red-500" />,
//     },
//     {
//       title: "Restoration & Renovation",
//       description:
//         "Expert restoration and renovation services, providing cost-effective and reliable results.",
//       icon: <FaBuilding className="text-4xl text-purple-500" />,
//     },
//     {
//       title: "Transport Services",
//       description:
//         "Efficient transportation services for residential and commercial needs.",
//       icon: <FaTruck className="text-4xl text-indigo-500" />,
//     },
//     {
//       title: "Maintenance / Handyman Services",
//       description:
//         "Comprehensive maintenance and handyman services, including woodworking, painting, and roof repairs.",
//       icon: <FaWrench className="text-4xl text-pink-500" />,
//     },
//   ];
//   return (
//     <div className="min-h-screen bg-gray-100 p-5">
//       <header className="text-center mb-10">
//         <h1 className="text-5xl font-bold text-gray-800 mb-5">Our Services</h1>
//         <p className="text-xl text-gray-600">
//           We offer a wide range of services to meet all your needs
//         </p>
//       </header>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
//         {services.map((service, index) => (
//           <div
//             key={index}
//             className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
//           >
//             <div className="flex justify-center mb-4"> {service.icon}</div>
//             <h2 className="text-2xl font-bold text-gray-800 mb-3 text-center">{service.title}</h2>
//             <p className="text-gray-600 text-center">{service.description}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ServicesPage;


// 24/7/24
import React, { useEffect } from "react";
import { FaTools, FaBuilding, FaWrench, FaTruck } from "react-icons/fa";
import { Link } from "react-router-dom";

const ServicesPage = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const services = [
    {
      title: "Scaffold Rental and Erection",
      description:
        "Providing safe and reliable scaffolding rental and erection services for over 15 years.",
      icon: <FaBuilding className="text-4xl text-blue-500" />,
    },
    {
      title: "Hardware Supply",
      description:
        "Supplying a wide range of hardware and plumbing supplies for residential, commercial, and public sector needs.",
      icon: <FaWrench className="text-4xl text-green-500" />,
    },
    {
      title: "Tool Rental",
      description:
        "Comprehensive tool rental services for residential and commercial projects.",
      icon: <FaTools className="text-4xl text-yellow-500" />,
    },
    {
      title: "Construction & Project Management",
      description:
        "Managing construction projects from start to finish with experienced project managers.",
      icon: <FaBuilding className="text-4xl text-red-500" />,
    },
    {
      title: "Restoration & Renovation",
      description:
        "Expert restoration and renovation services, providing cost-effective and reliable results.",
      icon: <FaBuilding className="text-4xl text-purple-500" />,
    },
    {
      title: "Transport Services",
      description:
        "Efficient transportation services for residential and commercial needs.",
      icon: <FaTruck className="text-4xl text-indigo-500" />,
    },
    {
      title: "Maintenance / Handyman Services",
      description:
        "Comprehensive maintenance and handyman services, including woodworking, painting, and roof repairs.",
      icon: <FaWrench className="text-4xl text-pink-500" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-5">
      <header className="text-center mb-10">
        <h1 className="text-5xl font-bold text-gray-800 mb-5">Our Services</h1>
        <p className="text-xl text-gray-600">
          We offer a wide range of services to meet all your needs
        </p>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
          >
            <div className="flex justify-center mb-4">{service.icon}</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-3 text-center">
              {service.title}
            </h2>
            <p className="text-gray-600 text-center">{service.description}</p>
            <div className="flex justify-center mt-4">
              <Link to={`/contact/${service.title}`}>
                <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300">
                  Request a Quote
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesPage;

