import Collections from "@/components/client/layout/search/collections";
import SortBy from "@/components/client/layout/search/sort";
import WrapperContent from "@/components/client/layout/wrapper-content";


export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <WrapperContent>
      <div className="flex flex-row pb-4 text-black gap-8">
        <div className="min-w-[125px]">
          <Collections />
        </div>
        <div className="flex-1">{children}</div>
        <div className="min-w-[125px]">
          <SortBy />
        </div>
      </div>
    </WrapperContent>
  );
}
