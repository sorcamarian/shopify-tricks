import {
  render,
  useBuyerJourneyIntercept,
  useShippingAddress,
  Banner
} from '@shopify/checkout-ui-extensions-react';
import React from "react";




/*
  Example 1 - Block the checkout if the shipping address - city is not in Manhattan
*/
render('Checkout::Dynamic::Render', () => <App />);
  
function App() {

  const address = useShippingAddress();
  console.log("address", address);

  useBuyerJourneyIntercept(() => {
 
    if( !address.city.toLocaleLowerCase().includes("manhattan") )  {
      return {
        behavior: "block",
        reason: `You are only allowed to buy items in Manhattan`,
        errors: [
          {
            // Show a validation error on the page
            message:
              "You are only allowed to buy items in Manhattan",
          },
        ],
      };
    } else {
      return {
        behavior: "allow"
      };
    }
  });


  return (
    <></>
  );
}




/*
  Example 2 - Basic component and some extension points
*/
render('Checkout::Dynamic::Render', () => <AppBlock />);

function AppBlock() {

  const address = useShippingAddress();
  console.log("address", address);

  useBuyerJourneyIntercept(() => {
 
    if( !address.city.toLocaleLowerCase().includes("manhattan") )  {
      return {
        behavior: "block",
        reason: `You are only allowed to buy items in Manhattan`,
        errors: [
          {
            // Show a validation error on the page
            message:
              "You are only allowed to buy items in Manhattan",
          },
        ],
      };
    } else {
      return {
        behavior: "allow"
      };
    }
  });


  return (
    <></>
  );
}

// Set the entry points for the extension
render("Checkout::DeliveryAddress::RenderBefore", () => <App2 />);

function App2() {
  // Render the banner
  return (
    <Banner title="Information" status="success" >
      This is a banner | Checkout::DeliveryAddress::RenderBefore
    </Banner>
  );
}

render('Checkout::Dynamic::Render', () => <App3 />);

function App3() {

  // Render the banner
  return (
    <Banner title="Information" status="success" >
      This is a banner | Checkout::Dynamic::Render
    </Banner>
  );
}

render("Checkout::Reductions::RenderAfter", () => <App4 />);
function App4() {
  // Render the banner
  return (
    <Banner title="Information" status="success" >
      This is a banner | Checkout::Reductions::RenderAfter
    </Banner>
  );
}
