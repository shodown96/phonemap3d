import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  labelStyle?: string;
  supportingText?: string;
  supportingTextStyle?: string;
  touched?: boolean;
  containerClass?: string
  // error?: string | { message: string };
  error?: any;
  // onChange?: (e: CustomChangeEvent) => void;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, containerClass, label, labelStyle = "", type, error, touched, ...props },
    ref,
  ) => {
    return (
      <div className={containerClass}>
        {label && (
          <label className={cn("text-sm font-medium", labelStyle)} htmlFor={props.id}>
            {label}
          </label>
        )}
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className,
          )}
          ref={ref}
          {...props}
        />
        {touched && error && (
          <label className={"text-sm text-tertiary absolute text-red-500"}>
            {error?.message || typeof error === "string" ? error : null}
          </label>
        )}
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input };
