import { ShoppingCartIcon } from "@heroicons/react/24/outline";

export default function OpenCart(props: { quantity?: string }) {
  const {quantity} = props;
  return (
    <div className='relative text-black w-11 h-11 flex justify-center items-center rounded-md border cursor-pointer'>
      <ShoppingCartIcon className='h-4 transition-all ease-in-out hover:scale-110 '/>
      {
        quantity ? <div className='text-[11px] text-white bg-blue-600 h-4 w-4 rounded-sm font-bold absolute top-0 right-0 -mr-2 -mt-2'>
          {quantity}
        </div> : null
      }
    </div>
  );
}
