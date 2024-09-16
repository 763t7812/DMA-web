import React from "react";
import dmaAdvertisement from "../../assets/Images/dma_advertisement.jpg";

const MoneyBack = () => {
  return (
    <div className="text-black w-full flex flex-col md:flex-row">
      <div className="md:w-[50%] w-[100%]">
        <img src={dmaAdvertisement} alt="happy women" />
      </div>
      <div className="md:w-[50%] w-[100%] md:py-0 py-5 flex justify-center items-center text-white bg-customColor-circleColor">
        <div className="flex flex-col pl-4 ">
          <h2 className="lg:text-3xl text-xl font-bold pb-2 text-black">
            PREMIUM SCAFFOLDING SOLUTIONS FOR EVERY PROJECT
          </h2>

          <ul className="">
            <li className="lg:text-xl text-lg">
              Safe and Reliable Scaffolding
            </li>
            <li className="lg:text-xl text-lg">
              Tailored to Your Project Needs
            </li>
            <li className="lg:text-xl text-lg">
              Expert Erection and Dismantling
            </li>
            <li className="lg:text-xl text-lg">
              Compliant with Industry Standards
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MoneyBack;
