"use client";
import OpenCart from "./open-cart";
import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogBackdrop,
} from "@headlessui/react";
import { useState } from "react";
import { MinusIcon, PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import Price from "../price";

export default function CartModal() {
  let [isOpen, setIsOpen] = useState(false);

  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }
  return (
    <>
      <button onClick={() => setIsOpen(true)}>
        {" "}
        <OpenCart quantity="1" />
      </button>

      <Dialog
        open={isOpen}
        onClose={open}
        className="relative z-50"
      >
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-black/30 transform transition duration-200 ease-in-out data-[closed]:opacity-100 data-[closed]:backdrop-blur-[.5px]"
            onClick={close}
          />
          <DialogPanel
            // Thêm thuộc tính transition ở đây
            transition
            className={`
              max-w-lg space-y-4 border border-l border-neutral-200 bg-white/80 p-8 absolute top-0 bottom-0 right-0 w-[390px] backdrop-blur-xl
              transform transition duration-300 ease-in-out
              data-[closed]:translate-x-full
            `}
          >
            <DialogTitle className="mb-10">
              <div className="flex items-center justify-between">
                <p className="text-lg font-semibold">My Cart</p>
                <button onClick={close} className="border border-neutral-200 rounded-md p-2 w-fit cursor-pointer text-black">
                  <XMarkIcon className="h-6 transition-all duration-100 ease-in-out hover:scale-110" />
                </button>
              </div>
            </DialogTitle>
            <Description>
              <ul className=''>
                <li className="pb-4 border-b border-neutral-300">
                  <div className='flex items-center gap-2 items-stretch'>
                    <div className='flex flex-none gap-2'>
                      <div className='relative bg-neutral-300 rounded-md w-fit'>
                        <div className="relative h-16 w-16">
                          <Image
                            src="/images/mug-1.avif"
                            alt=""
                            fill={true}
                            className="object-contain"
                          />
                        </div>
                        <button className='bg-neutral-500 rounded-full absolute -top-2 -left-2 w-[24px] h-[24px] flex items-center justify-center'><XMarkIcon className='h-4 text-white'/></button>
                      </div>

                      <Link href='' className="flex flex-col justify-start">
                        <p className='leading-tight text-[15px] font-semibold'>Acme Circles T-Shirt</p>
                        <p className='text-sm text-neutral-500'>Black / S</p>
                      </Link>
                    </div>
                    <div className='flex grow flex-col justify-between'>
                      <Price amount='12' currencyCode='USD' className='text-sm text-right'/>
                      <div className='border rounded-full py-1 flex items-center justify-between'>
                        <button className='p-1 ml-2'><PlusIcon className='h-4'/></button>
                         <span className='text-sm'>1</span>
                        <button className='p-1 mr-2'><MinusIcon className='h-4'/></button>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </Description>

            <div className="flex gap-4">
              <button onClick={() => setIsOpen(false)}>Cancel</button>
              <button onClick={() => setIsOpen(false)}>Deactivate</button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
