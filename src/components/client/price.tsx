import clsx from "clsx";

const Price = ({
  amount,
  className,
  currencyCode = "USD",
  currencyCodeClassName,
  hideCurrencyCode = true,
}: {
  amount: string;
  className?: string;
  currencyCode: string;
  currencyCodeClassName?: string;
  hideCurrencyCode?: boolean;
} & React.ComponentProps<"p">) => (
  <p suppressHydrationWarning={true} className={className}>
    {`${new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: currencyCode,
      currencyDisplay: "narrowSymbol",
    }).format(parseFloat(amount))}`}
    {hideCurrencyCode && (
      <span
        className={clsx("ml-1 inline", currencyCodeClassName)}
      >{`${currencyCode}`}</span>
    )}
  </p>
);

export default Price;
