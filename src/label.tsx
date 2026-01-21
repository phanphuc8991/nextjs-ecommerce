import clsx from "clsx";
import Price from "./components/price";

export default function Label(props: {
  title: string;
  amount: string;
  currencyCode: string;
  position?: "center" | "bottom";
}) {
  const { title, amount, position = "bottom", currencyCode } = props;
  return <div className={clsx('absolute left-0 bottom-0 px-4 pb-4',{
    'px-20 pb-[35%]': position === 'center'
  })}>
    <div className='flex border rounded-full p-1 bg-white/70 flex items-center text-black text-xs font-semibold'>
      <h3 className='mr-4 pl-2 leading-none grow line-clamp-2 tracking-tight'>{title}</h3>
      <Price className='bg-blue-600 text-white rounded-full p-2' amount={amount} currencyCode={currencyCode}/>
    </div>
  </div>;
}
