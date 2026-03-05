import Form from "next/form";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function Search() {
  return (
    <Form action="" className="relative w-max-[550px] w-full">
      <input
        key=""
        type="text"
        name="q"
        placeholder="Search for products..."
        autoComplete="off"
        defaultValue=""
        className="border rounded-sm text-sm w-full px-4 py-2 bg-white text-black"
      />
      <div className='absolute h-full top-0 right-0 flex items-center mr-3'>
        <MagnifyingGlassIcon className='h-4' />
      </div>
    </Form>
  );
}
