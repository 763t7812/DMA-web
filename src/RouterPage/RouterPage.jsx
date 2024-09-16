// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Header from "../Components/Header/Header";
// import HomePage from "../Pages/HomePage/HomePage";
// import AddToCart from "../Pages/AddToCart/AddToCart";
// import Footer from "../Components/Footer/Footer";
// import Details from "../Pages/Details/Details";
// import ShowAllProducts from "../Components/ShowAllProducts/ShowAllProducts";
// import AboutUs from "../Components/AboutUs/AboutUs";
// import ProductDetail from "../Components/ProductDetail/ProductDetail";
// import Gallery from "../Pages/Gallery/Gallery";
// import FavouritesPage from "../Pages/FavouritesPage/FavouritesPage";
// import HowToBuy from "../Pages/HowToBuy/HowToBuy";
// import ServicesPage from "../Pages/ServicesPage/ServicesPage";
// import ContactUsPage from "../Pages/ContactUsPage/ContactUsPage";
// import HFrame from "../Pages/Categories/HFrame";
// import IntermediateFrames from "../Pages/Categories/IntermediateFrames";
// import BracesClampsPage from "../Pages/Categories/BracesClamps";
// import JacksProps from "../Pages/Categories/JacksProps";
// import Tools from "../Pages/Categories/Tools";
// import Tubes from "../Pages/Categories/Tubes";
// import LaddersScaffoldLadders from "../Pages/Categories/LaddersScaffoldLadders";
// import PansBeams from "../Pages/Categories/PansBeams";
// import Agreement from "../Pages/Agreement/Agreement";
 

// const RouterPage = () => {
//   return (
//     <div>
//       <Router>
//         <Header />
//         <Routes>
//           <Route path="/" element={<HomePage />} />
//           <Route path="/add-to-cart" element={<AddToCart />} />
//           <Route path="/detail" element={<Details />} />
//           <Route path="/show-all-products" element={<ShowAllProducts />} />
//           <Route path="/product/:productId" element={<ProductDetail />} />
//           <Route path="/about-us" element={<AboutUs />} />
//           <Route path="/gallery" element={<Gallery/>}/>
//           <Route path="/favourites-page" element={<FavouritesPage/>} />
//           <Route path="/how-to-buy" element={<HowToBuy/>} />
//           <Route path="/services" element={<ServicesPage/>} />
//           <Route path="/contact" element={<ContactUsPage/>} />
//           <Route path="/products/h-frames" element={<HFrame/>} />
//           <Route path="/products/intermediate-frames" element={<IntermediateFrames/>} />
//           <Route path="/products/braces-clamps" element={<BracesClampsPage/>} />
//           <Route path="/products/jacks-props" element={<JacksProps/>} />
//           <Route path="/products/tools" element={<Tools/>} />
//           <Route path="/products/tubes" element={<Tubes/>} />
//           <Route path="/products/ladders" element={<LaddersScaffoldLadders/>} />
//           <Route path="/products/pans-beams" element={<PansBeams/>} />
//           <Route path="/agreement" element={<Agreement/>} />
//         </Routes>
//         <Footer />
//       </Router>
//     </div>
//   );
// };

// export default RouterPage;


import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "../Components/Header/Header";
import HomePage from "../Pages/HomePage/HomePage";
import AddToCart from "../Pages/AddToCart/AddToCart";
import Footer from "../Components/Footer/Footer";
import Details from "../Pages/Details/Details";
import ShowAllProducts from "../Components/ShowAllProducts/ShowAllProducts";
import AboutUs from "../Components/AboutUs/AboutUs";
import ProductDetail from "../Components/ProductDetail/ProductDetail";
import Gallery from "../Pages/Gallery/Gallery";
import FavouritesPage from "../Pages/FavouritesPage/FavouritesPage";
import HowToBuy from "../Pages/HowToBuy/HowToBuy";
import ServicesPage from "../Pages/ServicesPage/ServicesPage";
import ContactUsPage from "../Pages/ContactUsPage/ContactUsPage";
import HFrame from "../Pages/Categories/HFrame";
import IntermediateFrames from "../Pages/Categories/IntermediateFrames";
import BracesClampsPage from "../Pages/Categories/BracesClamps";
import JacksProps from "../Pages/Categories/JacksProps";
import Tools from "../Pages/Categories/Tools";
import Tubes from "../Pages/Categories/Tubes";
import LaddersScaffoldLadders from "../Pages/Categories/LaddersScaffoldLadders";
import PansBeams from "../Pages/Categories/PansBeams";
import Agreement from "../Pages/Agreement/Agreement";
import OrdersHistory from "../Pages/OrdersHistory/OrdersHistory";
import FAQPage from "../Pages/FAQ/FAQPage";
import HowToReturn from "../Pages/HowToReturn/HowToReturn";
import TermsOfUse from "../Pages/TermsofUse/TermsofUse";
import PrivacyPolicy from "../Pages/PrivacyPolicy/PrivacyPolicy";
import Fav from "../Pages/Fav/Fav";
import Profile from "../Pages/Profile/Profile";
import Forget from "../Pages/Forget";
import ShortItems from "../Pages/shortItems/ShortItems";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Success from "../Pages/Success";

const RouterPage = () => {
  const stripePromise = loadStripe(
    "pk_test_51OhAN8HpJOQAZkGPt4vOoo4EhMaVXEt2B5c3nNJ036UPbHTIlADGFrZEhNk2erbNYtIhWxcgjgyaVRpfC2BZAo7U0036P4RhtJ"
  );
  return (
    <div className="flex flex-col min-h-screen">
      <Router>
        <Header />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/add-to-cart" element={<AddToCart />} />
            <Route path="/detail" element={<Details />} />
            <Route path="/show-all-products" element={<ShowAllProducts />} />
            <Route path="/product/:productId" element={<ProductDetail />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/favourites-page" element={<FavouritesPage />} />
            <Route path="/how-to-buy" element={<HowToBuy />} />
            <Route path="/how-to-return" element={<HowToReturn />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/contact/:service?" element={<ContactUsPage />} />
            <Route path="/products/h-frames" element={<HFrame />} />
            <Route path="/products/intermediate-frames" element={<IntermediateFrames />} />
            <Route path="/products/braces-clamps" element={<BracesClampsPage />} />
            <Route path="/products/jacks-props" element={<JacksProps />} />
            <Route path="/products/tools" element={<Tools />} />
            <Route path="/products/tubes" element={<Tubes />} />
            <Route path="/products/ladders" element={<LaddersScaffoldLadders />} />
            <Route path="/products/pans-beams" element={<PansBeams />} />
            <Route path="/agreement" element={
              
    <Elements stripe={stripePromise}>
              <Agreement />
              </Elements>
              } />
            <Route path="/orderHistory" element={<OrdersHistory />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/terms" element={<TermsOfUse />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/Fav" element={<Fav />} />
            <Route path="/profile/:id" element={ <Profile />} />
            <Route path="/Forgot" element={ <Forget />} />
            <Route path="/showAllShortAccessories" element={<ShortItems />} />
            <Route path="*" element={<HomePage />} />
            <Route path="/success" element={<Success/>} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
};

export default RouterPage;

