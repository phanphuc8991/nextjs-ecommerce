import LogoSquare from "@/components/logo-square";
import Link from "next/link";
import { menu } from "@/data";
import Search from "./search";
import CartModel from '@/components/cart/modal';
export default function NavBar() {
  const { SITE_NAME } = process.env;
  return (
    <nav className="flex items-center justify-between py-4 px-6">
      {/* mobile */}
      <div></div>

      {/* rest */}
      <div className="flex w-full items-center">
        <div className="flex w-1/3 items-center gap-6">
          <Link href="" className="flex items-center gap-2">
            <span>
              <LogoSquare />
            </span>
            <span className="text-sm font-medium uppercase">{SITE_NAME}</span>
          </Link>

          <ul className="flex justify-between items-center gap-6 list-none p-0 m-0 text-sm">
            {menu.map((item) => (
              <li key={item.title}>
                <Link
                  href={item.path}
                  className="text-neutral-500 hover:text-black hover:underline"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex justify-center w-1/3">
         <Search/>
        </div>
        <div className="flex justify-end w-1/3">
           <CartModel/>
        </div>
      </div>
    </nav>
  );
}

<div>
  <div>1</div>
  <div>1</div>
  <div>1</div>
</div>;
