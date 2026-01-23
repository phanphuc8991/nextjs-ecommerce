import Link from "next/link";
import GridTileImage from "./tile";
function ThreeItemGridItem(props: { item: any; size: "full" | "half" }) {
  const { size, item } = props;
  return (
    <div
      className={
        size === "full" ? "col-span-4 row-span-2" : "col-span-2 row-span-1"
      }
    >
      <Link href="" className="relative aspect-square block h-full w-full">
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

const firstProduct = {
  featuredImage: {
    url: "/images/t-shirt-1.avif",
  },
  title: "Acme Circles T-Shirt",
  priceRange: {
    maxVariantPrice: {
      amount: "20",
      currencyCode: "USD",
    },
  },
};

const secondProduct = {
  featuredImage: {
    url: "/images/bag-1-dark.avif",
  },
  title: "Acme Drawstring Bag",
  priceRange: {
    maxVariantPrice: {
      amount: "12",
      currencyCode: "USD",
    },
  },
};

const thirdProduct = {
  featuredImage: {
    url: "/images/cup-black.avif",
  },
  title: "Acme Cup",
  priceRange: {
    maxVariantPrice: {
      amount: "15",
      currencyCode: "USD",
    },
  },
};

export default function ThreeItemGrid() {
  return (
    <section className="mx-auto max-w-(--breakpoint-2xl) px-4 pb-4 grid gap-4 grid-cols-6 grid-rows-2 max-h-[calc(100vh-200px)]">
      <ThreeItemGridItem size="full" item={firstProduct} />
       <ThreeItemGridItem size="half" item={secondProduct} />
      <ThreeItemGridItem size="half" item={thirdProduct} /> 
    </section>
  );
}

