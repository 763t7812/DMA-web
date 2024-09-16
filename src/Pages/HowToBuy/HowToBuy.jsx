import React, { useEffect } from "react";

const HowToBuy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-customColor-circleColor">How to Buy</h1>
      <div className="space-y-8">
        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between h-full">
          <h2 className="text-3xl font-semibold mb-4 text-customColor-circleColor">Step 1: Select an Item</h2>
          <p className="text-lg text-gray-700 mb-4">
            Click on the item card you want to buy or click on the <span className="font-semibold text-customColor-circleColor">All Products</span> button to view all items.
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between h-full">
          <h2 className="text-3xl font-semibold mb-4 text-customColor-circleColor">Step 2: Add to Cart</h2>
          <p className="text-lg text-gray-700 mb-4">
            Click on the <span className="font-semibold text-customColor-circleColor">Add to Cart</span> button. A modal will open. Click on the <span className="font-semibold text-customColor-circleColor">OK</span> button to confirm.
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between h-full">
          <h2 className="text-3xl font-semibold mb-4 text-customColor-circleColor">Step 3: View Cart</h2>
          <p className="text-lg text-gray-700 mb-4">
            Click on the <span className="font-semibold text-customColor-circleColor">Cart</span> button in the header to view your selected items.
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between h-full">
          <h2 className="text-3xl font-semibold mb-4 text-customColor-circleColor">Step 4: Add Rental Details</h2>
          <p className="text-lg text-gray-700 mb-4">
            In the cart page, select the <span className="font-semibold text-customColor-circleColor">Add to Return</span> and <span className="font-semibold text-customColor-circleColor">Rent Date</span>, and choose the quantity.
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between h-full">
          <h2 className="text-3xl font-semibold mb-4 text-customColor-circleColor">Step 5: Proceed to Checkout</h2>
          <p className="text-lg text-gray-700 mb-4">
            Finally, click on the <span className="font-semibold text-customColor-circleColor">Proceed to Checkout</span> button to complete your purchase.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HowToBuy;
