/**
 * Unified smooth scrolling utility that seamlessly works with Lenis and native browser scroll.
 * Handles fixed navbar offsets and avoids conflicts between Lenis ticker and native scrollIntoView.
 */
export function smoothScrollTo(target: string | HTMLElement, offset: number = -80): void {
  if (typeof window === "undefined") return;

  const element =
    typeof target === "string"
      ? document.getElementById(target.replace(/^#/, ""))
      : target;

  if (!element) return;

  const lenis = (window as unknown as { __lenis?: { scrollTo: (el: HTMLElement | string, opt: { offset: number; duration: number }) => void } }).__lenis;

  if (lenis && typeof lenis.scrollTo === "function") {
    lenis.scrollTo(element, { offset, duration: 1.1 });
  } else {
    const y = element.getBoundingClientRect().top + window.pageYOffset + offset;
    window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
  }
}
