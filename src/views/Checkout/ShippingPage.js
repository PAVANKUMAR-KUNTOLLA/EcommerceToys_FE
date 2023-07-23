import React, { useState, useRef } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import LoginStep from "./LoginStep";
import AddressStep from "./Address"; // Make sure you import the correct component
import PlaceOrderStep from "./PlaceOrder";
import PaymentStep from "./Payment"; // Make sure you import the correct component
import { Visibility } from "@mui/icons-material";

const steps = ["Login", "Address", "Payment", "Place Order"];

export default function OrderPayment() {
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());

  const [addressData, setAddressData] = useState({
    address: "",
    city: "",
    pincode: "",
    country: "",
  });

  const [paymentData, setPaymentData] = useState({
    paymentMethod: "",
    cardNumber: "",
    cardHolder: "",
    expiryDate: "",
    cvv: "",
    upiId: "",
  });

  const isStepOptional = (step) => {
    return step === 0;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    // Move to the next step if the current step is valid
    if (activeStep === 1) {
      // AddressStep validation logic
      const addressFields = ["address", "city", "pincode", "country"];
      const isAddressStepValid = addressFields.every(
        (field) => addressData[field].trim() !== ""
      );

      if (!isAddressStepValid) {
        // If the AddressStep is not valid, show a message
        alert("Please fill in all the required address fields.");
        return;
      }
    } else if (activeStep === 2) {
      // PaymentStep validation logic
      if (paymentData.paymentMethod === "") {
        // If the PaymentStep is not valid, show a message
        alert("Please select a payment method.");
        return;
      }

      // You can add more validation logic here for specific payment methods if needed.
      if (paymentData.paymentMethod === "card") {
        if (
          paymentData.cardNumber.trim() === "" ||
          paymentData.cardHolder.trim() === "" ||
          paymentData.expiryDate.trim() === "" ||
          paymentData.cvv.trim() === ""
        ) {
          // If the Card Payment is not valid, show a message
          alert("Please fill in all the required card details.");
          return;
        }
      } else if (paymentData.paymentMethod === "upi") {
        if (paymentData.upiId.trim() === "") {
          // If the UPI Payment is not valid, show a message
          alert("Please fill in the UPI ID.");
          return;
        }
      }

      // If the PaymentStep is valid, proceed to the next step
    }

    // If the current step is valid, move to the next step
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
    setAddressData({
      address: "",
      city: "",
      pincode: "",
      country: "",
    });
    setPaymentData({
      paymentMethod: "",
      cardNumber: "",
      cardHolder: "",
      expiryDate: "",
      cvv: "",
      upiId: "",
    });
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return <LoginStep />;
      case 1:
        return (
          <AddressStep
            addressData={addressData}
            setAddressData={setAddressData}
          />
        );
      case 2:
        return (
          <PaymentStep
            paymentData={paymentData}
            setPaymentData={setPaymentData}
          />
        );
      case 3:
        return (
          <PlaceOrderStep
            address={addressData}
            paymentMethod={paymentData.paymentMethod}
          />
        );

      default:
        return null;
    }
  };

  return (
    <Box sx={{ width: "100%", marginTop: "50px" }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {/* Render the component based on the active step */}
      {renderStepContent(activeStep)}
      <div>
        {activeStep === steps.length ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
              {isStepOptional(activeStep) && (
                <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                  Skip
                </Button>
              )}

              <Button onClick={handleNext}>
                {activeStep === steps.length - 1 ? " " : "Next"}
              </Button>
            </Box>
          </React.Fragment>
        )}
      </div>
    </Box>
  );
}
