import Link from "next/link";
import GridTileImage from "./grid/tile";
import { carouselProducts } from "@/data";


export default function Carousel() {
  return (
    <div className='w-full pb-6 pt-1 overflow-x-auto'>
      <ul className='flex gap-4'>
        {carouselProducts.map((item, i) => (
          <li key={`item.title-${i}`} className='h-[30vh] w-2/3 max-w-[30vw] flex-none'>
            <Link href="" className='aspect-square block w-full h-full'>
              <GridTileImage
                src={item.featuredImage.url}
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

    </div>
  );
}
