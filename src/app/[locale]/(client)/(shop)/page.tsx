import { auth } from "@/auth";
import Carousel from "@/components/client/carousel";
import ThreeItemGrid from "@/components/client/grid/three-items";
import Image from "next/image";
export default async function HomePage() {
  return (
    <>
      <ThreeItemGrid />
      <Carousel />
    </>
  );
}
