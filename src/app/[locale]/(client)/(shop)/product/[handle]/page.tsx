"use client";
import Price from "@/components/client/price";
import VariantSelector from "@/components/client/product/variant-selector";
import Prose from "@/components/client/prose";
import { carouselProducts, galleryImages } from "@/data";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import GridTileImage from "@/components/client/grid/tile";
import WrapperContent from "@/components/client/layout/wrapper-content";

export default function Product() {
  const searchParams = useSearchParams();
  const currentIndexImage = searchParams?.has("image")
    ? `${parseInt(searchParams.get("image")!)}`
    : "0";
  const router = useRouter();
  const params = new URLSearchParams(searchParams?.toString());
  const changeParamsUrl = (index: string) => {
    params.set("image", index);
    router.replace(`?${params.toString()}`, { scroll: false });
  };
  const nextImage = () => {
    const index = parseInt(currentIndexImage) + 1;
    const length = Object.keys(galleryImages).length - 1;
    const nextIndex = index > length ? "0" : `${index}`;
    changeParamsUrl(nextIndex);
  };
  const backImage = () => {
    const index = parseInt(currentIndexImage) - 1;
    const length = Object.keys(galleryImages).length - 1;
    const nextIndex = index < 0 ? `${length}` : `${index}`;
    changeParamsUrl(nextIndex);
  };
  return (
    <WrapperContent>
      <div className="grid grid-rows-[1fr_auto]">
        <div className="bg-white border rounded-sm flex p-12 gap-8">
          <div className="basis-4/6 h-full w-full">
            <div className="relative w-full max-h-[550px]">
              <div className="relative w-full aspect-square max-h-[550px]">
                <Image
                  src={galleryImages[currentIndexImage].url}
                  fill
                  alt=""
                  className="object-contain object-center"
                  preload={true}
                />
              </div>
              <div className="absolute w-full text-neutral-500 flex justify-center bottom-[15%]">
                <div className="h-11 inline-flex items-center bg-neutral-50/80 rounded-full border-white border">
                  <button
                    onClick={backImage}
                    className="px-6 transition-all ease-in-out duration-200 hover:text-black hover:scale-105"
                  >
                    <ArrowLeftIcon className="h-5" />
                  </button>
                  <span className="h-[60%] border-r-1 border-neutral-500 mx-1"></span>
                  <button
                    onClick={nextImage}
                    className="px-6 transition-all ease-in-out duration-200 hover:text-black hover:scale-105"
                  >
                    <ArrowRightIcon className="h-5" />
                  </button>
                </div>
              </div>
            </div>

            <div className="w-full mt-14 flex justify-center">
              <ul className="flex gap-3">
                {Object.keys(galleryImages).map((key, index) => (
                  <li key={`${key}-${index}`} className="">
                    <button
                      className={`w-20 h-20 ${key === currentIndexImage ? "border-2 border-blue-600" : "border"} rounded-xl overflow-hidden transition-all ease-in-out duration-200 hover:border-blue-600`}
                      onClick={() => {
                        changeParamsUrl(key);
                      }}
                    >
                      <div className="group relative h-full w-full">
                        <Image
                          src={galleryImages[key].url}
                          fill
                          alt=""
                          className="object-contain object-center transition-all ease-in-out duration-200 group-hover:scale-105"
                        />
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="basis-2/6">
            <div className="pb-6 border-b mb-6">
              <h1 className="text-5xl font-medium mb-2">Acme Baby Onesie</h1>
              <div className="w-fit">
                {" "}
                <Price
                  className="bg-blue-600 text-white p-2 rounded-full text-center text-sm font-medium"
                  amount="10"
                  currencyCode="USD"
                />
              </div>
            </div>
            <VariantSelector
              data={[
                {
                  title: "size",
                  item: ["NB", "3M", "6M", "12M", "18M", "24M"],
                },
                {
                  title: "color",
                  item: ["Black", "White", "Beige"],
                },
              ]}
            />

            <Prose
              className="mb-6 text-sm leading-tight"
              html={
                "<span>Short sleeve 5-oz, 100% combed ringspun cotton onesie</span>"
              }
            />
            <button className="relative bg-blue-600 w-full rounded-full flex justify-center items-center py-4 text-white font-semibold transition duration-100 ease-in-out hover:opacity-90">
              <span>Add To Cart</span>
              <PlusIcon className="h-5 absolute top-1/2 transform -translate-y-1/2 left-5" />
            </button>
          </div>
        </div>

        <div className="py-8">
          <h1 className="text-xl font-bold mb-4">Related Products</h1>
          <div>
            <ul className="w-full flex gap-4 overflow-x-scroll">
              {carouselProducts.map((item, index) => (
                <li
                  key={`${item}-${index}`}
                  className="w-1/5 flex-none aspect-square"
                >
                  <Link href="" className="block w-full h-full">
                    <GridTileImage
                      src={item.featuredImage.url}
                      fill
                      sizes=""
                      alt={item.title}
                      label={{
                        title: item.title,
                        amount: item.priceRange.maxVariantPrice.amount,
                        currencyCode:
                          item.priceRange.maxVariantPrice.currencyCode,
                      }}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </WrapperContent>
  );
}
