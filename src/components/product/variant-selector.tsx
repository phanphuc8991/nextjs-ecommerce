export default function VariantSelector(props: any) {
  const { data } = props;
  return (
    <div className="w-fit">
      {data.map((item: any, index: any) => (
        <div key={`${item}-${index}`} className="mb-8">
          <h1 className="uppercase mb-3">{item.title}</h1>
          <ul className="flex gap-3 flex-wrap">
            {item.item.map((text: any) => (
              <li className="inline-block">
                {text !== "24M" ? (
                  <button className="ring-1 ring-transparent transition ease-in-out duration-300 hover:ring-blue-600 min-w-[48px] text-sm px-2 py-1 border rounded-full bg-neutral-100">
                    {text}
                  </button>
                ) : (
               
                    <button
                      title="(Out of Stock)"
                      className="ring-1 ring-neutral-300 border rounded-full bg-neutral-100 relative overflow-hidden cursor-not-allowed text-neutral-500 min-w-[48px] text-sm px-2 py-1"
                    >
                      {text}
                      <span className="absolute h-px bg-neutral-300 inset-x-0 top-[50%] -rotate-45 z-10"></span>
                    </button>
            
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
