import { useEffect, useRef, useState } from "react"

export function CustomCursor() {
  const followerRef = useRef<HTMLDivElement>(null)
  const [cursorText, setCursorText] = useState<string | null>(null)
  const [cursorState, setCursorState] = useState<
    "default" | "hover" | "input" | "text" | "active" | "hidden"
  >("default")

  useEffect(() => {
    // Disable on touchscreen / mobile devices
    if (window.matchMedia("(hover: none) and (pointer: coarse)").matches) {
      return
    }

    let mouseX = -100
    let mouseY = -100
    let followerX = -100
    let followerY = -100
    let isVisible = false
    let isMouseDown = false
    let currentMagnetic: HTMLElement | null = null
    let rafId: number | null = null

    const follower = followerRef.current
    if (!follower) return

    // Linear interpolation for smooth trailing follower
    function lerp(start: number, end: number, factor: number) {
      return start + (end - start) * factor
    }

    function render() {
      // Smoothly slide follower dot toward actual mouse position (Cuberto fluid follower)
      followerX = lerp(followerX, mouseX, 0.18)
      followerY = lerp(followerY, mouseY, 0.18)

      if (follower) {
        follower.style.transform = `translate3d(${followerX}px, ${followerY}px, 0)`
      }

      rafId = requestAnimationFrame(render)
    }

    rafId = requestAnimationFrame(render)

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY

      if (!isVisible) {
        isVisible = true
        followerX = mouseX
        followerY = mouseY
        setCursorState("default")
      }

      const target = e.target as HTMLElement | null
      if (!target) return

      // 1. Check for custom cursor text
      const textEl = target.closest<HTMLElement>("[data-cursor-text]")
      const customCursorType = target.closest<HTMLElement>("[data-cursor]")

      if (textEl) {
        const text = textEl.getAttribute("data-cursor-text")
        if (text) {
          setCursorText(text)
          setCursorState("text")
          return
        }
      } else if (customCursorType) {
        const text = customCursorType.getAttribute("data-cursor")
        if (text && text !== "pointer") {
          setCursorText(text.toUpperCase())
          setCursorState("text")
          return
        }
      }

      // 2. Check for text inputs / chat inputs
      const inputEl = target.closest<HTMLElement>(
        "input, textarea, [contenteditable]",
      )
      if (inputEl) {
        setCursorText(null)
        setCursorState("input")
        return
      }

      // 3. Check for clickable / interactive elements
      const interactiveEl = target.closest<HTMLElement>(
        'a, button, [role="button"], select, label, summary, [data-magnetic]',
      )
      if (interactiveEl) {
        setCursorText(null)
        setCursorState("hover")
      } else {
        setCursorText(null)
        setCursorState(isMouseDown ? "active" : "default")
      }

      // 4. Handle magnetic elements
      const magneticEl = target.closest<HTMLElement>("[data-magnetic]")
      if (magneticEl) {
        if (currentMagnetic && currentMagnetic !== magneticEl) {
          resetMagnetic(currentMagnetic)
        }
        currentMagnetic = magneticEl
        applyMagnetic(magneticEl, e.clientX, e.clientY)
      } else if (currentMagnetic) {
        resetMagnetic(currentMagnetic)
        currentMagnetic = null
      }
    }

    function applyMagnetic(el: HTMLElement, clientX: number, clientY: number) {
      const rect = el.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const deltaX = clientX - centerX
      const deltaY = clientY - centerY

      const strengthAttr = el.getAttribute("data-magnetic-strength")
      const strength = strengthAttr ? parseFloat(strengthAttr) : 0.35

      el.style.transform = `translate3d(${deltaX * strength}px, ${deltaY * strength}px, 0)`
      el.style.transition = "transform 0.12s cubic-bezier(0.16, 1, 0.3, 1)"

      const inner = el.querySelector<HTMLElement>("[data-magnetic-inner]")
      if (inner) {
        inner.style.transform = `translate3d(${deltaX * strength * 0.4}px, ${deltaY * strength * 0.4}px, 0)`
        inner.style.transition = "transform 0.12s cubic-bezier(0.16, 1, 0.3, 1)"
      }
    }

    function resetMagnetic(el: HTMLElement) {
      el.style.transform = "translate3d(0, 0, 0)"
      el.style.transition = "transform 0.55s cubic-bezier(0.25, 1.35, 0.45, 1)"

      const inner = el.querySelector<HTMLElement>("[data-magnetic-inner]")
      if (inner) {
        inner.style.transform = "translate3d(0, 0, 0)"
        inner.style.transition = "transform 0.55s cubic-bezier(0.25, 1.35, 0.45, 1)"
      }
    }

    const onMouseDown = () => {
      isMouseDown = true
      setCursorState("active")
    }

    const onMouseUp = () => {
      isMouseDown = false
      setCursorState("default")
    }

    const onMouseLeave = () => {
      isVisible = false
      setCursorState("hidden")
      if (currentMagnetic) {
        resetMagnetic(currentMagnetic)
        currentMagnetic = null
      }
    }

    const onMouseEnter = () => {
      isVisible = true
      setCursorState("default")
    }

    window.addEventListener("mousemove", onMouseMove, { passive: true })
    window.addEventListener("mousedown", onMouseDown)
    window.addEventListener("mouseup", onMouseUp)
    document.addEventListener("mouseleave", onMouseLeave)
    document.addEventListener("mouseenter", onMouseEnter)

    return () => {
      if (rafId) cancelAnimationFrame(rafId)
      window.removeEventListener("mousemove", onMouseMove)
      window.removeEventListener("mousedown", onMouseDown)
      document.removeEventListener("mouseleave", onMouseLeave)
      document.removeEventListener("mouseenter", onMouseEnter)
      if (currentMagnetic) {
        resetMagnetic(currentMagnetic)
      }
    }
  }, [])

  return (
    <div
      className={`custom-cursor-container cursor-state-${cursorState}`}
      aria-hidden="true"
    >
      <div ref={followerRef} className="cursor-follower">
        {cursorText && <span className="cursor-label">{cursorText}</span>}
      </div>
    </div>
  )
}
