import React, { useState } from "react";
import ScaffoldingParts from "../../assets/Images/dma_scaffolding.jpg";
import FeedbackModal from "../Modal/FeedBackModal";

const Scaffolding = () => {
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);

  const openFeedbackModal = () => {
    setIsFeedbackModalOpen(true);
  };

  const closeFeedbackModal = () => {
    setIsFeedbackModalOpen(false);
  };

  return (
    <div
      className="relative w-full h-[60vh] bg-cover bg-center"
      style={{ backgroundImage: `url(${ScaffoldingParts})` }}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 text-center">
        <h1 className="text-white md:text-2xl sm:text-lg xs:text-md font-bold flex">
          Looking to buy{" "}
          <span className="text-yellow-500 px-2">Scaffolding</span> and
          Accessories
        </h1>
        <p className="text-white px-16 py-6">
          We offer top-quality scaffolding solutions for all your construction
          needs. Whether you're looking for rental or purchase options, our
          expert team is here to assist you. Contact us today for more
          information and let us help you find the perfect scaffolding solution
          for your project.
        </p>

        <div className="flex justify-center items-center">
          <button
            onClick={openFeedbackModal}
            className="bg-customColor-circleColor px-7 py-2 rounded text-white text-md font-semibold"
          >
            Feedback
          </button>
        </div>
      </div>
      <FeedbackModal
        isOpen={isFeedbackModalOpen}
        onClose={closeFeedbackModal}
      />
    </div>
  );
};

export default Scaffolding;
