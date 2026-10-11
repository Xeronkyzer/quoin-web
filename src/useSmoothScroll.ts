import { useEffect, useRef } from "react"

interface SmoothScrollOptions {
  ease?: number
  friction?: number
}

// Global programmatic scroll controller
export function smoothScrollTo(
  target: string | HTMLElement | number,
  offset = -72,
  duration = 850,
) {
  let targetY = 0

  if (typeof target === "number") {
    targetY = target
  } else if (typeof target === "string") {
    const cleanId = target.replace(/^#/, "")
    if (cleanId === "top" || cleanId === "") {
      targetY = 0
    } else {
      const el = document.getElementById(cleanId)
      if (el) {
        const rect = el.getBoundingClientRect()
        targetY = window.scrollY + rect.top + offset
      } else {
        return
      }
    }
  } else if (target instanceof HTMLElement) {
    const rect = target.getBoundingClientRect()
    targetY = window.scrollY + rect.top + offset
  }

  const maxScroll = Math.max(
    0,
    document.documentElement.scrollHeight - window.innerHeight,
  )
  const clampedTarget = Math.max(0, Math.min(maxScroll, targetY))

  const startY = window.scrollY
  const distance = clampedTarget - startY
  if (Math.abs(distance) < 2) return

  const startTime = performance.now()

  // High-end agency cubic bezier / easeOutExpo
  const easeOutQuart = (x: number): number => 1 - Math.pow(1 - x, 4)

  function step(now: number) {
    const elapsed = now - startTime
    const progress = Math.min(1, elapsed / duration)
    const eased = easeOutQuart(progress)

    window.scrollTo(0, startY + distance * eased)

    if (progress < 1) {
      requestAnimationFrame(step)
    }
  }

  requestAnimationFrame(step)
}

export function useSmoothScroll({ ease = 0.085 }: SmoothScrollOptions = {}) {
  const currentYRef = useRef(0)
  const targetYRef = useRef(0)
  const isRunningRef = useRef(false)
  const rafIdRef = useRef<number | null>(null)
  const isTouchRef = useRef(false)

  useEffect(() => {
    // Detect touch-only mobile devices to preserve native gesture inertia
    const isTouchDevice =
      "ontouchstart" in window || navigator.maxTouchPoints > 0
    isTouchRef.current = isTouchDevice

    // Initial position sync
    currentYRef.current = window.scrollY
    targetYRef.current = window.scrollY

    function getMaxScroll() {
      return Math.max(
        0,
        document.documentElement.scrollHeight - window.innerHeight,
      )
    }

    function isInsidePreventScrollElement(el: HTMLElement | null): boolean {
      while (el && el !== document.body && el !== document.documentElement) {
        if (
          el.hasAttribute("data-lenis-prevent") ||
          el.hasAttribute("data-no-smooth-scroll") ||
          el.classList.contains("chatbot-messages") ||
          el.classList.contains("service-detail-modal-body") ||
          el.classList.contains("legal-modal-body") ||
          el.classList.contains("consultation-modal")
        ) {
          return true
        }
        // If element is vertically scrollable and has room to scroll
        const style = window.getComputedStyle(el)
        const overflowY = style.overflowY
        if (
          (overflowY === "auto" || overflowY === "scroll") &&
          el.scrollHeight > el.clientHeight
        ) {
          return true
        }
        el = el.parentElement
      }
      return false
    }

    function loop() {
      const maxScroll = getMaxScroll()
      // Clamp targetY
      targetYRef.current = Math.max(0, Math.min(maxScroll, targetYRef.current))

      const diff = targetYRef.current - currentYRef.current

      if (Math.abs(diff) > 0.3) {
        currentYRef.current += diff * ease
        window.scrollTo(0, Math.round(currentYRef.current))
        rafIdRef.current = requestAnimationFrame(loop)
      } else {
        currentYRef.current = targetYRef.current
        window.scrollTo(0, Math.round(currentYRef.current))
        isRunningRef.current = false
        rafIdRef.current = null
      }
    }

    function startLoop() {
      if (!isRunningRef.current) {
        isRunningRef.current = true
        rafIdRef.current = requestAnimationFrame(loop)
      }
    }

    function onWheel(e: WheelEvent) {
      // Don't hijack if ctrl is pressed (zooming) or inside dedicated scrollable containers
      if (e.ctrlKey || e.metaKey) return

      const target = e.target as HTMLElement | null
      if (isInsidePreventScrollElement(target)) {
        // Sync positions with whatever native scroll happens
        currentYRef.current = window.scrollY
        targetYRef.current = window.scrollY
        return
      }

      // If predominantly horizontal scroll, let it be
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY) * 1.5) {
        return
      }

      e.preventDefault()

      let delta = e.deltaY
      if (e.deltaMode === 1) {
        delta *= 28 // Line mode
      } else if (e.deltaMode === 2) {
        delta *= window.innerHeight // Page mode
      }

      const maxScroll = getMaxScroll()

      // If user starts scrolling during an animation, anchor from current scroll position
      if (!isRunningRef.current) {
        currentYRef.current = window.scrollY
        targetYRef.current = window.scrollY
      }

      targetYRef.current = Math.max(
        0,
        Math.min(maxScroll, targetYRef.current + delta),
      )
      startLoop()
    }

    // Keyboard navigation (PageUp, PageDown, Space, ArrowUp, ArrowDown)
    function onKeyDown(e: KeyboardEvent) {
      const active = document.activeElement
      const isInput =
        active instanceof HTMLInputElement ||
        active instanceof HTMLTextAreaElement ||
        (active instanceof HTMLElement && active.isContentEditable)

      if (isInput) return

      let delta = 0
      if (e.key === "ArrowDown") delta = 100
      else if (e.key === "ArrowUp") delta = -100
      else if (e.key === "PageDown") delta = window.innerHeight * 0.8
      else if (e.key === "PageUp") delta = -window.innerHeight * 0.8
      else if (e.key === " " && !e.shiftKey) delta = window.innerHeight * 0.75
      else if (e.key === " " && e.shiftKey) delta = -window.innerHeight * 0.75

      if (delta !== 0) {
        e.preventDefault()
        const maxScroll = getMaxScroll()
        if (!isRunningRef.current) {
          currentYRef.current = window.scrollY
          targetYRef.current = window.scrollY
        }
        targetYRef.current = Math.max(
          0,
          Math.min(maxScroll, targetYRef.current + delta),
        )
        startLoop()
      }
    }

    // Sync when user drags native scrollbar
    function onScroll() {
      if (!isRunningRef.current) {
        currentYRef.current = window.scrollY
        targetYRef.current = window.scrollY
      }
    }

    window.addEventListener("wheel", onWheel, { passive: false })
    window.addEventListener("keydown", onKeyDown, { passive: false })
    window.addEventListener("scroll", onScroll, { passive: true })

    return () => {
      window.removeEventListener("wheel", onWheel)
      window.removeEventListener("keydown", onKeyDown)
      window.removeEventListener("scroll", onScroll)
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current)
      }
    }
  }, [ease])
}
