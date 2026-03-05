import { collections } from "@/data";
import Link from "next/link";
export default function Collections() {
  return (
    <div>
      <p className='text-neutral-500 text-xs font-medium pb-2'>Collections</p>
      <ul>
        {collections.map((item, index) => (
          <li className='pb-2 font-medium text-black text-sm hover:underline' key={`${item}-${index}`}>
            <Link href="">{item}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
