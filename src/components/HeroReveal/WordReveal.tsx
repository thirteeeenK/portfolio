import { Fragment, type ReactNode } from "react";

/* ── Props ────────────────────────────────────────────── */

export interface WordRevealProps {
  /** The text to split and animate word-by-word. */
  text: string;
  /** Seconds of delay added per word index. @default 0.05 */
  delayPerWord?: number;
  /** Extra base delay before the first word starts. @default 0 */
  baseDelay?: number;
}

/* ── Component ────────────────────────────────────────── */

/**
 * Splits `text` into individual `<span>` elements, each with the
 * `.word-reveal` class and a staggered `animation-delay`.
 *
 * Renders a bare fragment — wrap it in whatever heading / paragraph
 * element you need:
 *
 * ```tsx
 * <h1 className="hero-reveal__title">
 *   <WordReveal text="Hello World" />
 * </h1>
 * ```
 *
 * The actual animation is paused by default in CSS and only plays
 * when a parent has the `.hero-reveal__content--visible` class,
 * so the cascade stays in sync with the image-preload reveal.
 */
export default function WordReveal({
  text,
  delayPerWord = 0.05,
  baseDelay = 0,
}: WordRevealProps): ReactNode {
  const words = text.trim().split(/\s+/);

  return (
    <>
      {words.map((word, i) => (
        <Fragment key={i}>
          <span
            className="word-reveal"
            style={{ animationDelay: `${baseDelay + i * delayPerWord}s` }}
          >
            {word}
          </span>
          {/* Preserve inter-word space for natural line-wrapping */}
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </>
  );
}
