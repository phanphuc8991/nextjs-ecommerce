export default function VariantSelector(props: any) {
  const { data } = props;
  return (
    <div className='w-fit'>
      {data.map((item: any, index: any) => (
        <div key={`${item}-${index}`} className='mb-8'>
          <h1 className="uppercase mb-3">{item.title}</h1>
          <ul className='flex gap-3 flex-wrap'>
            {item.item.map((text: any) => (
              <li className='inline-block'>
                <button className="min-w-[48px] text-sm px-2 py-1 border rounded-full bg-neutral-100">
                  {text}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
