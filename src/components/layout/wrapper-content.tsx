import React from "react";

export default function WrapperContent({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-(--breakpoint-2xl) px-4">{children}</div>
  );
}
