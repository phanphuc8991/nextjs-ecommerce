import GridTileImage from "@/components/grid/tile";
import { allData } from "@/data";
import Link from "next/link";

export default function SearchPage() {
  return (
    <ul className="grid grid-cols-3 gap-4">
      {allData.map((item, i) => (
        <li
          key={`item.title-${i}`}
          className="max-w-[30vw]"
        >
          <Link href="/product/1" className="aspect-square block w-full h-full">
            <GridTileImage
              src={item.url}
              fill
              sizes=""
              alt={item.title}
              label={{
                title: item.title,
                amount: item.priceRange.maxVariantPrice.amount,
                currencyCode: item.priceRange.maxVariantPrice.currencyCode,
              }}
            />
          </Link>
        </li>
      ))}
    </ul>
  );
}
