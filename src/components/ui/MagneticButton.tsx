import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";

type SharedProps = {
  children: ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
};

type ButtonProps = SharedProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: never };
type AnchorProps = SharedProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

export function MagneticButton(props: ButtonProps | AnchorProps) {
  const { children, variant = "primary", className = "", ...rest } = props;
  const classes = `magnetic-button magnetic-button--${variant} ${className}`;

  if ("href" in props && props.href) {
    return (
      <a className={classes} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        <span>{children}</span>
        <ArrowUpRight aria-hidden="true" size={18} />
      </a>
    );
  }

  return (
    <button className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      <span>{children}</span>
      <ArrowUpRight aria-hidden="true" size={18} />
    </button>
  );
}
