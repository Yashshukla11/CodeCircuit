import { forwardRef } from "react";

import { cn } from "@/lib/utils";

interface ButtonProps {
  id?: string;
  containerClass?: string;
  leftIcon?: React.ComponentType;
  rightIcon?: React.ComponentType;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps & { children: React.ReactNode }>(
  ({ id, children, containerClass, leftIcon: LeftIcon, rightIcon: RightIcon }, ref) => {
    return (
      <button
        id={id}
        ref={ref}
        className={cn(
          "group relative z-10 w-fit cursor-pointer overflow-hidden rounded-full bg-violet-50 px-7 py-3 text-black transition hover:opacity-75",
          containerClass
        )}
      >
        {LeftIcon ? <LeftIcon /> : null}

        <p className="relative inline-flex overflow-hidden font-general text-xs uppercase">
          {children}
        </p>

        {RightIcon ? <RightIcon /> : null}
      </button>
    );
  }
);
