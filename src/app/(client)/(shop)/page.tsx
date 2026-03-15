import { auth } from "@/auth";
import Carousel from "@/components/client/carousel";
import ThreeItemGrid from "@/components/client/grid/three-items";

export default async function HomePage() {
  const session = await auth();
  return (
    <>
       <div>{JSON.stringify(session)}</div>
      <ThreeItemGrid />
      <Carousel />
    </>
  );
}
