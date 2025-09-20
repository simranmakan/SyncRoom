import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export default function PaymentFlow() {
  const [step, setStep] = useState<null | string>(null); // null, receipt, method, pin, loading, success
  const [selectedMethod, setSelectedMethod] = useState<string>("");
  const [pin, setPin] = useState<string>("");

  // Reset all states
  const resetPayment = () => {
    setStep(null);
    setSelectedMethod("");
    setPin("");
  };

  const handleProceedFromMethod = () => {
    if (!selectedMethod) return;
    setStep("pin");
  };

  const handlePinSubmit = () => {
    if (pin.length === 4) {
      setStep("loading");

      // Fake processing time
      setTimeout(() => {
        setStep("success");
      }, 2000);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      {/* Trigger Button */}
      <Button onClick={() => setStep("receipt")} className="px-6 py-3">
        Make Payment
      </Button>

      {/* Step 1: Receipt Dialog */}
      <Dialog open={step === "receipt"} onOpenChange={resetPayment}>
        <DialogContent className="bg-white dark:bg-gray-900">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">
              Payment Receipt
            </DialogTitle>
            <DialogDescription>
              Please review your payment details before proceeding.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-2">
            <p className="font-medium">Property: Sunrise PG for Girls</p>
            <p>Amount: ₹8,000</p>
            <p>Date: {new Date().toLocaleDateString()}</p>
          </div>

          <div className="mt-4 flex justify-end">
            <Button onClick={() => setStep("method")} className="bg-blue-600 text-white">
              Pay Now
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Step 2: Select Payment Method */}
      <Dialog open={step === "method"} onOpenChange={resetPayment}>
        <DialogContent className="bg-white dark:bg-gray-900">
          <DialogHeader>
            <DialogTitle>Select Payment Method</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            {["UPI", "Credit/Debit Card", "Net Banking"].map((method) => (
              <Button
                key={method}
                variant={selectedMethod === method ? "default" : "outline"}
                onClick={() => setSelectedMethod(method)}
                className="w-full"
              >
                {method}
              </Button>
            ))}
          </div>

          <div className="mt-4 flex justify-end">
            <Button
              onClick={handleProceedFromMethod}
              disabled={!selectedMethod}
              className="bg-blue-600 text-white"
            >
              Proceed
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Step 3: PIN Dialog */}
      <Dialog open={step === "pin"} onOpenChange={resetPayment}>
        <DialogContent className="bg-white dark:bg-gray-900">
          <DialogHeader>
            <DialogTitle>Enter UPI PIN</DialogTitle>
            <DialogDescription>Enter your 4-digit secure PIN.</DialogDescription>
          </DialogHeader>

          <div className="flex justify-center space-x-2">
            {[0, 1, 2, 3].map((i) => (
              <input
                key={i}
                type="password"
                maxLength={1}
                value={pin[i] || ""}
                onChange={(e) => {
                  const newPin = pin.split("");
                  newPin[i] = e.target.value;
                  setPin(newPin.join(""));
                }}
                className="w-12 h-12 text-center text-xl border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ))}
          </div>

          <div className="mt-4 flex justify-end">
            <Button
              onClick={handlePinSubmit}
              disabled={pin.length !== 4}
              className="bg-blue-600 text-white"
            >
              Submit
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Step 4: Loading Dialog */}
      <Dialog open={step === "loading"} onOpenChange={resetPayment}>
        <DialogContent className="flex flex-col items-center justify-center bg-white dark:bg-gray-900">
          <Loader2 className="animate-spin w-10 h-10 text-blue-600 mb-3" />
          <p className="text-lg font-medium">Processing Payment...</p>
        </DialogContent>
      </Dialog>

      {/* Step 5: Success Dialog */}
      <Dialog open={step === "success"} onOpenChange={resetPayment}>
        <DialogContent className="bg-white dark:bg-gray-900 text-center">
          <DialogHeader>
            <DialogTitle className="text-green-600 text-xl">
              Payment Successful ✅
            </DialogTitle>
          </DialogHeader>

          <p className="mt-2">Your payment of ₹8,000 has been completed successfully.</p>

          <div className="mt-4 flex justify-center">
            <Button onClick={resetPayment} className="bg-green-600 text-white">
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
