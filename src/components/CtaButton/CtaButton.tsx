import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import "./CtaButton.css";

/* ── Arrow icon (inline SVG) ──────────────────────────── */

function ArrowIcon() {
  return (
    <svg
      className="cta-btn__arrow"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M5 12h14" />
      <path d="M13 6l6 6-6 6" />
    </svg>
  );
}

/* ── Props ─────────────────────────────────────────────── */

type CommonProps = {
  /** Button label text. */
  children: ReactNode;
  /** Extra class name(s). */
  className?: string;
};

/** Renders as `<a>` when `href` is provided, `<button>` otherwise. */
export type CtaButtonProps =
  | (CommonProps & { href: string } & Omit<
        AnchorHTMLAttributes<HTMLAnchorElement>,
        "className" | "children"
      >)
  | (CommonProps & { href?: undefined } & Omit<
        ButtonHTMLAttributes<HTMLButtonElement>,
        "className" | "children"
      >);

/* ── Component ────────────────────────────────────────── */

export default function CtaButton(props: CtaButtonProps) {
  const { children, className = "", ...rest } = props;
  const classes = `cta-btn ${className}`.trim();

  const inner = (
    <>
      {/* Directional fill — scales from the left on hover */}
      <span className="cta-btn__fill" aria-hidden="true" />

      {/* Label */}
      <span className="cta-btn__text">{children}</span>

      {/* Circular icon */}
      <span className="cta-btn__icon" aria-hidden="true">
        <ArrowIcon />
      </span>
    </>
  );

  if (props.href !== undefined) {
    const { href, ...anchorRest } = rest as Omit<
      AnchorHTMLAttributes<HTMLAnchorElement> & { href: string },
      "className" | "children"
    >;
    return (
      <a className={classes} href={href} {...anchorRest}>
        {inner}
      </a>
    );
  }

  const buttonRest = rest as Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    "className" | "children"
  >;
  return (
    <button type="button" className={classes} {...buttonRest}>
      {inner}
    </button>
  );
}
