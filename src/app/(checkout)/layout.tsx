"use client";
import LogoSquare from "@/components/logo-square";
import Price from "@/components/price";
import Image from "next/image";
import Link from "next/link";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";
const list = [
  "/images/baby-onesie-beige-1.avif",
  "/images/baby-onesie-beige-1.avif",

  "/images/baby-onesie-beige-1.avif",
];
export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { SITE_NAME } = process.env;
  const pathname = usePathname();

  return (
    <div className="bg-black h-[100vh] text-white">
      <div className="flex justify-between w-[70vw] mx-auto relative">
        <div className="flex-1 p-10">
          <div className="mb-10">
            <Link href="" className="flex items-center gap-2 mb-8">
              <span>
                <LogoSquare />
              </span>
            </Link>
            <div className="flex text-[12px] items-center">
              {pathname === "/checkout/information" && (
                <div className="font-bold">Information</div>
              )}
              {pathname === "/checkout/shipping" && (
                <Link
                  href="/checkout/information"
                  className="hover:cursor-pointer hover:text-[#0158C3] transition-all duration-200 ease-in-out text-blue-600"
                >
                  Information
                </Link>
              )}
              <span className="px-2">
                {" "}
                <ChevronRightIcon className="h-3" />
              </span>
              <div
                className={`${pathname === "/checkout/shipping" ? "font-bold" : ""}`}
              >
                Shipping
              </div>
              <span className="px-2">
                {" "}
                <ChevronRightIcon className="h-3" />
              </span>
              <div
                className={`${pathname === "/checkout/payment" ? "font-bold" : ""}`}
              >
                Payment
              </div>
            </div>
          </div>
          <div>{children}</div>
        </div>
        <div className="absolute  border-[#333333] border-r-[0.5px] h-screen left-[50%]"></div>
        <div className="flex-1 p-10">
          <ul className="mb-4">
            {list.map((item, index) => (
              <li
                key={`${item}-${index}`}
                className="flex justify-between items-center pb-4"
              >
                <div>
                  <div className="flex gap-4 items-center">
                    <div className="relative w-15 h-15 border-2 border-white rounded-xl">
                      <Image
                        src={item}
                        alt=""
                        fill
                        className="object-contain"
                      />
                      <div className="absolute bg-neutral-300 border-white border-2 rounded-lg text-white w-6 h-6 -top-3 -right-3 flex justify-center items-center">
                        <span className="text-[11px] font-extrabold">1</span>
                      </div>
                    </div>
                    <div>
                      <h1 className="text-sm font-semibold leading-[1.1]">
                        Acme Baby Onesie
                      </h1>
                      <span className="text-sm text-neutral-500 leading-[1.1]">
                        3M / Black
                      </span>
                    </div>
                  </div>
                  <div></div>
                </div>
                <div>
                  {" "}
                  <Price
                    amount="12"
                    currencyCode="USD"
                    className="leading-[1.1] text-sm mb-5"
                    hideCurrencyCode={false}
                  />
                </div>
              </li>
            ))}
          </ul>
          <div>
            <div className="flex justify-between items-center text-sm font-medium mb-2">
              <div className="flex items-center">
                <span className="pr-1">Subtotal</span>
                <span className="bg-black w-[2px] h-[2px] rounded-full"></span>
                <span className="pl-1">items</span>
              </div>

              <span>
                {" "}
                <Price
                  amount="91"
                  currencyCode="USD"
                  className="text-sm"
                  hideCurrencyCode={false}
                />
              </span>
            </div>
            <div className="flex justify-between items-center text-sm font-medium mb-4">
              <span>Shipping</span>
              <span className="uppercase">free</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xl font-bold">Total</span>
              <div className="flex items-center">
                <span className="pr-2 text-sm text-neutral-500">USD</span>
                <span>
                  {" "}
                  <Price
                    amount="91"
                    currencyCode="USD"
                    className="text-xl font-bold"
                    hideCurrencyCode={false}
                  />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
