import type { ButtonHTMLAttributes, ReactNode } from "react";

type Common = {
  children: ReactNode;
  className?: string;
  variant?: ButtonVariant;
};

type ButtonVariant =
  | "outline"
  | "ghost"
  | "solid-blue"
  | "solid-red"
  | "solid-gray"
  | "solid-white"
  | "solid-black";

type ButtonType = ButtonHTMLAttributes<HTMLButtonElement> & Common;

export type { ButtonType, ButtonVariant };
