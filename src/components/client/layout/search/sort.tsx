import { sortBy } from "@/data";
import Link from "next/link";
export default function SortBy() {
  return (
    <div>
      <p className='text-neutral-500 text-xs font-medium pb-2'>Sort by</p>
      <ul>
        {sortBy.map((item, index) => (
          <li className='pb-2 font-medium text-black text-sm hover:underline' key={`${item}-${index}`}><Link href=''>{item}</Link></li>
        ))}
      </ul>
    </div>
  );
}
