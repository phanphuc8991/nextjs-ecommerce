import Link from "next/link";
import GridTileImage from "./grid/tile";

const carouselProducts = [
  {
    featuredImage: {
      url: "/images/mug-1.avif",
    },
    title: "Acme Mug",
    priceRange: {
      maxVariantPrice: {
        amount: "15",
        currencyCode: "USD",
      },
    },
  },
  {
    featuredImage: {
      url: "/images/Hoodie-1.avif",
    },
    title: "Acme Hoodie",
    priceRange: {
      maxVariantPrice: {
        amount: "50",
        currencyCode: "USD",
      },
    },
  },
  {
    featuredImage: {
      url: "/images/baby-onesie-beige-1.avif",
    },
    title: "Acme Baby Onesie",
    priceRange: {
      maxVariantPrice: {
        amount: "10",
        currencyCode: "USD",
      },
    },
  },
  {
    featuredImage: {
      url: "/images/baby-cap-black.avif",
    },
    title: "Acme Baby Cap",
    priceRange: {
      maxVariantPrice: {
        amount: "10",
        currencyCode: "USD",
      },
    },
  },
  {
    featuredImage: {
      url: "/images/mug-1.avif",
    },
    title: "Acme Mug",
    priceRange: {
      maxVariantPrice: {
        amount: "15",
        currencyCode: "USD",
      },
    },
  },
  {
    featuredImage: {
      url: "/images/Hoodie-1.avif",
    },
    title: "Acme Hoodie",
    priceRange: {
      maxVariantPrice: {
        amount: "50",
        currencyCode: "USD",
      },
    },
  },
  {
    featuredImage: {
      url: "/images/baby-onesie-beige-1.avif",
    },
    title: "Acme Baby Onesie",
    priceRange: {
      maxVariantPrice: {
        amount: "10",
        currencyCode: "USD",
      },
    },
  },
  {
    featuredImage: {
      url: "/images/baby-cap-black.avif",
    },
    title: "Acme Baby Cap",
    priceRange: {
      maxVariantPrice: {
        amount: "10",
        currencyCode: "USD",
      },
    },
  },
  {
    featuredImage: {
      url: "/images/mug-1.avif",
    },
    title: "Acme Mug",
    priceRange: {
      maxVariantPrice: {
        amount: "15",
        currencyCode: "USD",
      },
    },
  },
  {
    featuredImage: {
      url: "/images/Hoodie-1.avif",
    },
    title: "Acme Hoodie",
    priceRange: {
      maxVariantPrice: {
        amount: "50",
        currencyCode: "USD",
      },
    },
  },
  {
    featuredImage: {
      url: "/images/baby-onesie-beige-1.avif",
    },
    title: "Acme Baby Onesie",
    priceRange: {
      maxVariantPrice: {
        amount: "10",
        currencyCode: "USD",
      },
    },
  },
  {
    featuredImage: {
      url: "/images/baby-cap-black.avif",
    },
    title: "Acme Baby Cap",
    priceRange: {
      maxVariantPrice: {
        amount: "10",
        currencyCode: "USD",
      },
    },
  },
  {
    featuredImage: {
      url: "/images/mug-1.avif",
    },
    title: "Acme Mug",
    priceRange: {
      maxVariantPrice: {
        amount: "15",
        currencyCode: "USD",
      },
    },
  },
  {
    featuredImage: {
      url: "/images/Hoodie-1.avif",
    },
    title: "Acme Hoodie",
    priceRange: {
      maxVariantPrice: {
        amount: "50",
        currencyCode: "USD",
      },
    },
  },
  {
    featuredImage: {
      url: "/images/baby-onesie-beige-1.avif",
    },
    title: "Acme Baby Onesie",
    priceRange: {
      maxVariantPrice: {
        amount: "10",
        currencyCode: "USD",
      },
    },
  },
  {
    featuredImage: {
      url: "/images/baby-cap-black.avif",
    },
    title: "Acme Baby Cap",
    priceRange: {
      maxVariantPrice: {
        amount: "10",
        currencyCode: "USD",
      },
    },
  },
];
export default function Carousel() {
  return (
    <div className='w-full pb-6 pt-1 overflow-x-auto'>
      <ul className='flex gap-4'>
        {carouselProducts.map((item, i) => (
          <li key={`item.title-${i}`} className='h-[30vh] w-2/3 max-w-[30vw] flex-none'>
            <Link href="" className='relative aspect-square block w-full h-full'>
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
