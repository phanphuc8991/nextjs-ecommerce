"use client";

import Link from "next/link";
import { Field, Radio, RadioGroup } from "@headlessui/react";
import { useState } from "react";
import { describe } from "node:test";
import Price from "@/components/price";

const plans = [
  {
    text: "Economy",
    description: "5 to 8 business day",
  },
  {
    text: "Standard",
    description: "3 to 4 business day",
  },
];
export default function ShippingPage() {
  let [selected, setSelected] = useState(plans[0].text);
  return (
    <div>
      <div className="border-[#333333] border-[1px] rounded-lg px-4 py-3 text-sm">
        <div className="flex items-align gap-10 mb-3">
          <span className="w-[60px] text-[#a8a8a8] font-semibold">Contact</span>
          <span className="grow-1 text-white">phuc@gmail.com</span>

          <span>
            {" "}
            <Link
              href=""
              className="text-xs text-blue-500 underline decoration-solid"
            >
              Change
            </Link>
          </span>
        </div>
        <div className="border-b-[1px] border-[#333333] mb-3"></div>
        <div className="flex items-align gap-10">
          <span className="w-[60px] text-[#a8a8a8] font-semibold">Ship to</span>
          <span className="grow-1 text-white">
            phuc, ddd AZ 85001, United States
          </span>

          <span>
            {" "}
            <Link
              href=""
              className="text-xs text-blue-500 underline decoration-solid"
            >
              Change
            </Link>
          </span>
        </div>
      </div>

      <div className="mt-8 mb-4">
        <h1 className="text-2xl font-bold mb-8">Shipping Method</h1>
        <div className="relative">
          <div>
            <RadioGroup
              value={selected}
              onChange={setSelected}
              aria-label="Server size"
            >
              {plans.map((item) => (
                <div
                  className={`p-4 border-[1px] ${item.text === "Economy" ? "rounded-t-lg border-b-0" : "rounded-b-lg  border-t-0"} border-[#333333] text-sm ${selected === item.text && "border-blue-500"} transition-all duration-200 ease-in-out`}
                >
                  <Field key={item.text} className="flex items-start gap-4">
                    <Radio
                      value={item.text}
                      className="group flex size-[18px] items-center justify-center border-[1px] border-[#333333] rounded-full  bg-black data-checked:border-none data-checked:bg-[#0070F3]"
                    >
                      <span className="invisible size-[6px] rounded-full bg-white group-data-checked:visible" />
                    </Radio>
                    <div className="flex grow-1 flex-col justify-between leading-none gap-2">
                      <h1 className="font-semibold">{item.text}</h1>
                      <span className="text-[#a8a8a8]">{item.description}</span>
                    </div>
                    <span>
                      {" "}
                      <Price
                        amount="4.90"
                        currencyCode="USD"
                        className="text-sm"
                        hideCurrencyCode={false}
                      />
                    </span>
                  </Field>
                </div>
              ))}
            </RadioGroup>
            <span className="absolute left-0 right-0 border-blue-500 border-[#333333] border-b-[1px] top-1/2 -translate-y-1/2"></span>
          </div>
        </div>
      </div>
    </div>
  );
}
