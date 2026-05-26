"use client"

import createGlobe, { type COBEOptions } from "cobe"
import { useEffect, useRef } from "react"

export default function Globe({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    let phi = 0
    let width = 0
    let pointerX = 0
    let pointerY = 0
    let frameId = 0
    const canvas = canvasRef.current

    if (!canvas) return

    const onResize = () => {
      if (!canvas) return
      width = canvas.offsetWidth
    }

    onResize()
    window.addEventListener("resize", onResize)

    const onMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      const x = (event.clientX - rect.left) / rect.width
      const y = (event.clientY - rect.top) / rect.height
      pointerX = x * 2 - 1
      pointerY = y * 2 - 1
    }

    canvas.addEventListener("pointermove", onMove)

    const baseOptions: COBEOptions = {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: 0,
      theta: 0.25,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 15000,
      mapBrightness: 5,
      baseColor: [1, 0.64, 0.82],
      markerColor: [1, 0.42, 0.68],
      glowColor: [1, 0.8, 0.9],
      markers: [
        { location: [21.0285, 105.8542], size: 0.11 },
        { location: [10.8231, 106.6297], size: 0.09 },
        { location: [35.6764, 139.65], size: 0.08 },
        { location: [37.7749, -122.4194], size: 0.08 },
        { location: [51.5072, -0.1276], size: 0.08 },
      ],
    }

    const globe = createGlobe(canvas, baseOptions)

    const render = () => {
      phi += 0.0025
      globe.update({
        width: width * 2,
        height: width * 2,
        phi: phi + pointerX * 0.25,
        theta: 0.25 + pointerY * 0.12,
      })
      frameId = requestAnimationFrame(render)
    }

    frameId = requestAnimationFrame(render)

    return () => {
      window.removeEventListener("resize", onResize)
      canvas.removeEventListener("pointermove", onMove)
      cancelAnimationFrame(frameId)
      globe.destroy()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ width: 360, height: 360, maxWidth: "100%", aspectRatio: 1 }}
    />
  )
}
