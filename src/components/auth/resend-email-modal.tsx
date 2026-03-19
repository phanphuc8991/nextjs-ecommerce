import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  UserIcon,
  HomeIcon,
  CreditCardIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";
import { useState } from "react";

const steps = [
  { id: 1, name: "Personal Info", icon: UserIcon },
  { id: 2, name: "Address", icon: HomeIcon },
  { id: 3, name: "Payment", icon: CreditCardIcon },
];

export function LightStepper({ currentStep }: { currentStep: number }) {
  return (
    <nav aria-label="Progress" className="relative">
      <ol
        role="list"
        className="flex items-center justify-between w-full relative"
      >
        {steps.map((step) => (
          <li
            key={step.id}
            className="relative flex flex-col items-center group flex-1"
          >
            <div
              className={cn(
                "h-10 w-10 rounded-full flex items-center justify-center relative z-10 transition-all duration-300 border-2",
                currentStep >= step.id
                  ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-200"
                  : "bg-white border-slate-200 text-slate-400",
              )}
            >
              <step.icon className="h-5 w-5" />
            </div>
            <span
              className={cn(
                "mt-3 text-[11px] uppercase tracking-wider font-bold transition-colors",
                currentStep >= step.id ? "text-slate-900" : "text-slate-400",
              )}
            >
              {step.name}
            </span>
          </li>
        ))}
      </ol>
    </nav>
  );
}
export function ResendEmailModal() {
  const [currentStep, setCurrentStep] = useState(1);
  return (
    <Dialog open={true}>
      <DialogContent className="sm:max-w-[600px]">
        <div className="text-2xl font-extrabold text-slate-900">
          Activate your account
        </div>
        <div className=" flex items-center justify-center text-slate-900">
          {/* Container rộng (max-w-4xl) */}
          <div className="w-full max-w-4xl overflow-hidden">
            {/* Header Section */}
            <div className="">
              <LightStepper currentStep={currentStep} />
            </div>

         

            {/* Form Body */}
            <div className="p-10">
              <Input id="email" type="email" placeholder="alex@company.com" />
            </div>

            {/* Footer: Light Actions */}
            {/* <div className="p-10 bg-slate-50/50 border-t border-slate-100 flex justify-between items-center">
              <Button
                variant="outline"
                onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
                className="border-slate-200 text-slate-600 hover:bg-white hover:text-slate-900 rounded-2xl px-8 h-12 font-semibold"
                disabled={currentStep === 1}
              >
                Previous
              </Button>
              <Button
                onClick={() => setCurrentStep((prev) => Math.min(4, prev + 1))}
                className="bg-blue-600 hover:bg-blue-700 text-white px-12 h-14 rounded-2xl font-bold text-lg shadow-lg shadow-blue-200 transition-all active:scale-95"
              >
                {currentStep === 4 ? "Complete" : "Continue"}
              </Button>
            </div> */}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
export default ResendEmailModal;
