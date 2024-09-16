import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import RouterPage from './RouterPage/RouterPage'
import '@fontsource/inter';

function App() {

  return (
    <>
     <RouterPage/>
    </>
  )
}

export default App
// import React from 'react';
// import RouterPage from './RouterPage/RouterPage';
// import '@fontsource/inter';
// import { Elements } from '@stripe/react-stripe-js';
// import { loadStripe } from '@stripe/stripe-js';

// // Load your Stripe publishable key
// const stripePromise = loadStripe('your-publishable-key-here');

// function App() {
//   return (
//     <Elements stripe={stripePromise}>
//       <RouterPage />
//     </Elements>
//   );
// }

// export default App;
