"use client";
import Image from "next/image";
import { useState } from "react";

export function FallbackImage({
  className,
  ...props
}: React.ComponentProps<typeof Image>) {
  const [erroCarregamento, setErroCarregamento] = useState(false);

  return (
    <>
      {!erroCarregamento ? (
        <Image
          {...props}
          onError={() => setErroCarregamento(true)}
          className={className}
        />
      ) : (
        <div
          className={`absolute top-0 left-0 w-full h-full z-0 animate-pulse bg-gray-200 ${className}`}
        />
      )}
    </>
  );
}
