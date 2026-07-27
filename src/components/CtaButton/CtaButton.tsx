import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react"
import "./CtaButton.css"

type CommonProps = {
  children: ReactNode
  className?: string
}

export type CtaButtonProps =
  | (CommonProps & { href: string } & Omit<
        AnchorHTMLAttributes<HTMLAnchorElement>,
        "className" | "children"
      >)
  | (CommonProps & { href?: undefined } & Omit<
        ButtonHTMLAttributes<HTMLButtonElement>,
        "className" | "children"
      >)

export default function CtaButton(props: CtaButtonProps) {
  const { children, className = "", ...rest } = props
  const classes = `cta-btn ${className}`.trim()

  if (props.href !== undefined) {
    const { href, ...anchorRest } = rest as Omit<
      AnchorHTMLAttributes<HTMLAnchorElement> & { href: string },
      "className" | "children"
    >
    return (
      <a className={classes} href={href} {...anchorRest}>
        {children}
      </a>
    )
  }

  const buttonRest = rest as Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    "className" | "children"
  >
  return (
    <button type="button" className={classes} {...buttonRest}>
      {children}
    </button>
  )
}
