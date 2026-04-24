"use client";
import {
  Description,
  Field,
  Input,
  Label,
  Checkbox,
  Select,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function InformationPage() {
  const [enabled, setEnabled] = useState(true);
  const router = useRouter();
  const continueShippingProcess = () => {
    router.push("/checkout/shipping", { scroll: false });
  };
  return (
    <div>
      <div className="w-full">
        <form className="w-full">
          <h1 className="text-lg font-bold pb-4">Contact</h1>
          <Field className="pb-4">
            <div className="relative">
              <Input
                placeholder="Email or mobile phone number"
                className="peer px-3 py-4 border-[0.5px] rounded-lg w-full transition-all duration-200 ease-in-out text-sm not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 font-bold"
              />
              <span className="absolute peer-placeholder-shown:top-4 pointer-events-none peer-placeholder-shown:text-transparent top-2 left-3 text-[#a7a7a7] text-xs font-semibold transition-all duration-200 ease-in-out">
                Email or mobile phone number
              </span>
            </div>
          </Field>
          <Field className="flex items-end mb-8">
            <Checkbox
              checked={enabled}
              onChange={setEnabled}
              className="mr-3 hover:cursor-pointer border-[#333333] h-5 w-5 data-checked:bg-blue-500 flex items-center justify-center group size-5 border-[0.5px] rounded-sm data-checked:border-blue-500 overflow-hidden transition-transform duration-300 ease-in-out"
            >
              {/* Checkmark icon */}

              <svg
                className="z-2 w-3 h-3 stroke-white opacity-0 group-data-checked:opacity-100 font-bold"
                viewBox="0 0 14 14"
                fill="none"
              >
                <path
                  d="M3 8L6 11L11 3.5"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Checkbox>
            <span className="leading-none text-sm">
              Email me with news and offers
            </span>
          </Field>
          <h1 className="text-lg font-bold pb-4">Shipping address</h1>
          <Field className="flex items-end mb-4">
            <div className="w-full relative">
              <Select
                className={clsx(
                  "px-3 py-4 pt-6 pb-2 block w-full appearance-none rounded-lg border  text-sm text-white font-bold",
                )}
              >
                <option value="active">Active</option>
                <option value="paused">Paused</option>
                <option value="delayed">Delayed</option>
                <option value="canceled">Canceled</option>
              </Select>
              <ChevronDownIcon
                className="group pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 size-4 fill-white/60"
                aria-hidden="true"
              />
              <span className="absolute peer-placeholder-shown:top-5 pointer-events-none peer-placeholder-shown:text-transparent top-2 left-3 text-[#a7a7a7] text-xs font-semibold transition-all duration-200 ease-in-out">
                Country/Region
              </span>
            </div>
          </Field>

          <Field className="pb-4 flex gap-4">
            <div className="relative grow-1">
              <Input
                placeholder="First name (Optional)"
                className="peer px-3 py-4 border-[0.5px] rounded-lg w-full transition-all duration-200 ease-in-out text-sm not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 font-bold"
              />
              <span className="absolute peer-placeholder-shown:top-4 pointer-events-none peer-placeholder-shown:text-transparent top-2 left-3 text-[#a7a7a7] text-xs font-semibold transition-all duration-200 ease-in-out">
                First name (Optional)
              </span>
            </div>
            <div className="relative grow-1">
              <Input
                placeholder="Last name"
                className="peer px-3 py-4 border-[0.5px] rounded-lg w-full transition-all duration-200 ease-in-out text-sm not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 font-bold"
              />
              <span className="absolute peer-placeholder-shown:top-4 pointer-events-none peer-placeholder-shown:text-transparent top-2 left-3 text-[#a7a7a7] text-xs font-semibold transition-all duration-200 ease-in-out">
                Last name
              </span>
            </div>
          </Field>

          <Field className="pb-4">
            <div className="relative">
              <Input
                placeholder="Address"
                className="peer px-3 py-4 border-[0.5px] rounded-lg w-full transition-all duration-200 ease-in-out text-sm not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 font-bold"
              />
              <span className="absolute peer-placeholder-shown:top-4 pointer-events-none peer-placeholder-shown:text-transparent top-2 left-3 text-[#a7a7a7] text-xs font-semibold transition-all duration-200 ease-in-out">
                Address
              </span>
            </div>
          </Field>
          <Field className="pb-4">
            <div className="relative">
              <Input
                placeholder="Apartment, suite, etc. (optional)"
                className="peer px-3 py-4 border-[0.5px] rounded-lg w-full transition-all duration-200 ease-in-out text-sm not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 font-bold"
              />
              <span className="absolute peer-placeholder-shown:top-4 pointer-events-none peer-placeholder-shown:text-transparent top-2 left-3 text-[#a7a7a7] text-xs font-semibold transition-all duration-200 ease-in-out">
                Address
              </span>
            </div>
          </Field>

          <Field className="pb-4 flex gap-4">
            <div className="relative grow-1 basis-0">
              <Input
                placeholder="City"
                className="peer px-3 py-4 border-[0.5px] rounded-lg w-full transition-all duration-200 ease-in-out text-sm not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 font-bold"
              />
              <span className="absolute peer-placeholder-shown:top-4 pointer-events-none peer-placeholder-shown:text-transparent top-2 left-3 text-[#a7a7a7] text-xs font-semibold transition-all duration-200 ease-in-out">
                City
              </span>
            </div>

            <div className="relative grow-1 basis-0">
              <Select
                required
                className={clsx(
                  "peer px-3 py-4 pt-6 pb-2 block w-full appearance-none rounded-lg border  text-sm text-white font-bold",
                )}
              >
                <option value="" hidden></option>
                <option value="active">Active</option>
                <option value="paused">Paused</option>
                <option value="delayed">Delayed</option>
                <option value="canceled">Canceled</option>
              </Select>
              <ChevronDownIcon
                className="group pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 size-4 fill-white/60"
                aria-hidden="true"
              />
              <span className="absolute pointer-events-none peer-valid:top-4 left-3 top-1/2 -translate-y-1/2  text-[#a7a7a7] text-xs font-semibold transition-all duration-200 ease-in-out">
                State
              </span>
            </div>
            <div className="relative grow-1 basis-0">
              <Input
                placeholder="ZIP code"
                className="peer px-3 py-4 border-[0.5px] rounded-lg w-full transition-all duration-200 ease-in-out text-sm not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 font-bold"
              />
              <span className="absolute peer-placeholder-shown:top-4 pointer-events-none peer-placeholder-shown:text-transparent top-2 left-3 text-[#a7a7a7] text-xs font-semibold transition-all duration-200 ease-in-out">
                Zipcode
              </span>
            </div>
          </Field>
          <Field className="flex items-end mb-8">
            <Checkbox
              checked={enabled}
              onChange={setEnabled}
              className="mr-3 hover:cursor-pointer border-[#333333] h-5 w-5 data-checked:bg-blue-500 flex items-center justify-center group size-5 border-[0.5px] rounded-sm data-checked:border-blue-500 overflow-hidden transition-transform duration-300 ease-in-out"
            >
              {/* Checkmark icon */}

              <svg
                className="z-2 w-3 h-3 stroke-white opacity-0 group-data-checked:opacity-100 font-bold"
                viewBox="0 0 14 14"
                fill="none"
              >
                <path
                  d="M3 8L6 11L11 3.5"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Checkbox>
            <span className="leading-none text-sm">
              Save this information for this time
            </span>
          </Field>
          <div className="flex justify-end">
            <button
              onClick={continueShippingProcess}
              className="bg-blue-600 p-5 rounded-lg text-sm font-bold hover:bg-[#0158C3] transition-all duration-200 ease-in-out hover:cursor-pointer"
            >
              Continue to shipping
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
