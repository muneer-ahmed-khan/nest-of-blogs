/**
 * Reactive composable that tracks the user's OS-level
 * "prefers-reduced-motion" preference.
 *
 * Use this to conditionally skip JS-driven animations
 * (e.g. IntersectionObserver stagger, GSAP timelines).
 * CSS animations are already handled globally by the
 * @media (prefers-reduced-motion: reduce) rule in tailwind.css.
 */
export const useReducedMotion = () => {
  const prefersReduced = ref(false)

  onMounted(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    prefersReduced.value = mq.matches
    mq.addEventListener("change", (e) => {
      prefersReduced.value = e.matches
    })
  })

  return { prefersReduced }
}
