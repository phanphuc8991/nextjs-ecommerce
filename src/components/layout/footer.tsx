import Link from "next/link";
import LogoSquare from "../logo-square";

const menu = [
  "Home",
  "About",
  "Terms & Conditions",
  "Shipping & Return Policy",
  "Privacy Policy",
  "FAQ",
];
export default function Footer() {
  const { SITE_NAME, COMPANY_NAME } = process.env;
  const currentYear = new Date().getFullYear();
  const copyrightDate = 2025 + (currentYear > 2025 ? `-${currentYear}` : "");
  const copyrightName = COMPANY_NAME || SITE_NAME || "";
  return (
    <footer className="text-sm text-neutral-500">
      <div className="mx-auto w-[80vw] border-t-1 px-5 py-15">
        <div className="flex justify-between">
          <div className="flex items-start gap-10">
            <Link href="" className="flex items-center pt-1">
              <LogoSquare size="sm" />
              <span className="ml-3 text-black font-medium uppercase">
                {SITE_NAME}
              </span>
            </Link>
            <ul className="">
              {menu.map((item, index) => (
                <li
                  className="p-2 hover:text-black hover:underline"
                  key={`${item}-${index}`}
                >
                  <Link href="">{item}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <Link
              href=""
              className="text-[12px] border relative rounded-md self-start flex items-center"
            >
              <span className="py-[6px] px-[10px] text-black">▲</span>
              <span className="absolute border-l-1 top-0 bottom-0 left-[32px]"></span>
              <span className="py-[6px] px-[10px] text-black">Deploy</span>
            </Link>
          </div>
        </div>
      </div>
      <div className="border-t-1 py-5">
        <div className="flex items-center justify-between mx-auto w-[80vw] px-5">
          <div className="flex items-center">
            <p className="border-r-1 border-neutral-400 pr-3">
              &copy; {copyrightDate} {copyrightName}
              {copyrightName.length && !copyrightName.endsWith(".")
                ? "."
                : ""}{" "}
              <span> All rights reserved.</span>
            </p>

            <p className="pl-3">
              <Link href="">View the source</Link>
            </p>
          </div>
          <div>
            <Link href="">Created by ▲ Vercel</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
