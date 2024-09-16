import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-black bg-opacity-80 py-7 ">
      <div className="flex flex-col md:grid md:grid-cols-2 lg:flex lg:flex-row justify-between px-5">
        <div className="text-white mb-8 md:mb-0">
          <h2 className="text-xl font-bold">Popular Categories</h2>
          <ul className="mt-5">
            <li>
              <NavLink to={"/products/h-frames"}>H Frame</NavLink>
            </li>
            <li>
              <NavLink to={"/products/intermediate-frames"}>Intermediate Frames</NavLink>
            </li>
            <li>
              <NavLink to={"/products/tubes"}>Tube & clamp Scaffolding</NavLink>
            </li>
            <li>
              <NavLink to={"/products/braces-clamps"}> Braces & Clamps</NavLink>
            </li>
            <li>
              <NavLink to={"/products/pans-beams"}> Pans & Beams</NavLink>
            </li>
            <li>
              <NavLink to={"/products/ladders"}> Ladders</NavLink>
            </li>

            {/* <li className="text-sm">Cup Lock Scaffolding</li>
            <li className="text-sm">Equipment</li> */}
          </ul>
        </div>
        <div className="text-white mb-8 md:mb-0">
          <h2 className="text-xl font-bold">Guide</h2>
          <ul className="mt-5">
            <li>
              <NavLink to={"how-to-buy"}>How to buy</NavLink>
            </li>
            <li>
              <NavLink to={"how-to-return"}>How to return</NavLink>
            </li>
            <li>
              <NavLink to={"faq"}>FAQ</NavLink>
            </li>
          </ul>
        </div>
        <div className="text-white mb-8 md:mb-0">
          <h2 className="text-xl font-bold">Information</h2>
          <ul className="mt-5">
            <NavLink to={"about-us"}>About us</NavLink>

            <li>
              <NavLink to={"gallery"}>Gallery</NavLink>
            </li>
            <li>
              <NavLink to={"favourites-page"}>Favourites</NavLink>
            </li>
            <li>
              <NavLink to={"terms"}>Terms of Use</NavLink>
            </li>
            <li>
              <NavLink to={"privacy"}>Privacy Policy</NavLink>
            </li>
          </ul>
        </div>
        <div className="text-white">
          <h2 className="text-xl font-bold">Contact</h2>
          <ul className="mt-5">
            <li className="text-sm">
              #7 Thomas street, Sunshine Avenue, San Juan,<br /> Trinidad and Tobago.
            </li>

            <li className="text-sm">Call us at: (868)-674-6178, (868)-374-7563</li>
            <li className="text-sm">Email us at: dmag_07@yahoo.com</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white my-8"></div>
      <div className="flex justify-center items-center text-center px-5">
        <p className="text-[#FFFFFF]">@ since 2024 COPYRIGHTED DMA, inc</p>
      </div>
    </div>
  );
};

export default Footer;
