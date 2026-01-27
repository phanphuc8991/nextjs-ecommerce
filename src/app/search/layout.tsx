import Collections from "@/components/layout/search/collections";
import SortBy from "@/components/layout/search/sort";
import Image from "next/image";

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="mx-auto max-w-(--breakpoint-2xl) flex flex-row px-4 pb-4 text-black gap-8">
        <div className="min-w-[125px]">
          <Collections />
        </div>
        <div className="flex-1">{children}</div>
        <div className="min-w-[125px]">
          <SortBy />
        </div>
      </div>
    </>
  );
}
