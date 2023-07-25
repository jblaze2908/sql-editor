import clsx from "clsx";
import styles from "./FormElements.module.scss";
import Spinner from "../Spinner";
import "react-tooltip/dist/react-tooltip.css";
import { Ref, forwardRef } from "react";

export const TextField = forwardRef(function TextField(
  { className, ...props }: React.InputHTMLAttributes<HTMLInputElement>,
  ref?: Ref<HTMLInputElement>
) {
  return (
    <input
      {...props}
      className={`${styles.textField} ${className || ""}`}
      type="text"
      ref={ref}
    />
  );
});

export function Button({
  children,
  buttonType,
  filled = false,
  isLoading = false,
  className,
  tooltipContent = "",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  buttonType: "primary" | "danger" | "secondary" | "link";
  filled?: boolean;
  tooltipContent?: string;
  isLoading?: boolean;
}) {
  const buttonClassNames = {
    primary: styles.buttonPrimary,
    danger: styles.buttonDanger,
    secondary: styles.buttonSecondary,
    link: styles.buttonLink,
  };

  return (
    <button
      {...props}
      className={clsx(
        styles.button,
        buttonClassNames[buttonType],
        filled && styles.buttonFilled,
        className
      )}
      data-tooltip-id="tooltip"
      data-tooltip-content={tooltipContent}
    >
      {isLoading ? <Spinner /> : children}
    </button>
  );
}
