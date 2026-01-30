import Link from "next/link";
import GridTileImage from "./tile";
import { firstProduct, secondProduct, thirdProduct } from "@/data";
import WrapperContent from "@/components/layout/wrapper-content";

function ThreeItemGridItem(props: { item: any; size: "full" | "half" }) {
  const { size, item } = props;
  return (
    <div
      className={
        size === "full" ? "col-span-4 row-span-2" : "col-span-2 row-span-1"
      }
    >
      <Link href="" className="aspect-square block h-full w-full">
        <GridTileImage
          src={item.featuredImage.url}
          alt={item.title}
          label={{
            title: item.title,
            position: size === "full" ? "center" : "bottom",
            amount: item.priceRange.maxVariantPrice.amount,
            currencyCode: item.priceRange.maxVariantPrice.currencyCode,
          }}
        />
      </Link>
    </div>
  );
}

export default function ThreeItemGrid() {
  return (
    <WrapperContent>
      <section className="pb-4 grid gap-4 grid-cols-6 grid-rows-2 max-h-[calc(100vh-200px)]">
        <ThreeItemGridItem size="full" item={firstProduct} />
        <ThreeItemGridItem size="half" item={secondProduct} />
        <ThreeItemGridItem size="half" item={thirdProduct} />
      </section>
    </WrapperContent>
  );
}
