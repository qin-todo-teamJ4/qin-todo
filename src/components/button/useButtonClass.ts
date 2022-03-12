import clsx from "clsx";
import { useMemo } from "react";

import type { ButtonVariant } from "./type";

export const useButtonClass = (className?: string, variant?: ButtonVariant) => {
  const classes = useMemo(() => {
    return clsx(
      "grid place-items-center font-bold rounded-full focus:outline-none focus-visible:ring-2 transition duration-200 ease-in-out",
      {
        "border focus:ring-2 focus:ring-blue-400": variant === "outline",
        "hover:text-blue-400 focus-visible:text-blue-400 hover:bg-blue-50 focus-visible:bg-blue-50 focus-visible:ring-blue-400":
          variant === "ghost",
        "text-white bg-blue-500 hover:bg-blue-600 focus-visible:bg-blue-600 focus-visible:ring-blue-400":
          variant === "solid-blue",
        "text-white bg-red-500 hover:bg-red-600 focus-visible:bg-red-600 focus-visible:ring-red-400":
          variant === "solid-red",
        "bg-gray-100 hover:bg-gray-200 focus-visible:bg-gray-200 focus-visible:ring-blue-400":
          variant === "solid-gray",
        "bg-white hover:bg-gray-100 focus:bg-gray-100":
          variant === "solid-white",
        "text-white bg-black hover:bg-gray-800 focus:bg-gray-800":
          variant === "solid-black",
      },
      className
    );
  }, [className, variant]);

  return classes;
};
