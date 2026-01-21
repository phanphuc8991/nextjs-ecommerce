import Label from "@/label";
import Image from "next/image";

export default function GridTileImage(props: any) {
  const { src, alt, sizes, label, fill } = props;

  return (
    <div className="group flex justify-center items-center overflow-hidden h-full w-full border rounded-lg hover:border-blue-600 bg-white">
      <Image
        src={src}
        alt={alt}
        fill={fill}
        sizes={sizes}
        className="relative h-full w-full object-contain transition duration-300 ease-in-out group-hover:scale-105"
      />
      <Label
        title={label.title}
        position={label.position}
        amount={label.amount}
        currencyCode={label.currencyCode}
      />
    </div>
  );
}
