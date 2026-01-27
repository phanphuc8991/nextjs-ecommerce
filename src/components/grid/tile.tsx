import Label from "@/label";
import Image from "next/image";

export default function GridTileImage(props: any) {
  const { src, alt, label } = props;

  return (
    <div className="relative group border rounded-lg hover:border-blue-600 bg-white h-full w-full overflow-hidden">
      <Image
        src={src}
        alt={alt}
        fill
        className="transition object-contain duration-300 ease-in-out group-hover:scale-105"
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
