"use client"

import { useEffect, useState, useRef } from "react"

interface ScrambleTextProps {
  text: string
  speed?: number
  scrambleChars?: string
  delay?: number
}

const defaultChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+"

export default function ScrambleText({
  text,
  speed = 35,
  scrambleChars = defaultChars,
  delay = 0,
}: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState(text)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  
  useEffect(() => {
    let timer = setTimeout(() => {
      let iteration = 0
      if (intervalRef.current) clearInterval(intervalRef.current)
      
      intervalRef.current = setInterval(() => {
        setDisplayText((prev) => {
          return text
            .split("")
            .map((char, index) => {
              if (char === " ") return " "
              if (index < iteration) {
                return text[index]
              }
              return scrambleChars[Math.floor(Math.random() * scrambleChars.length)]
            })
            .join("")
        })
        
        if (iteration >= text.length) {
          if (intervalRef.current) clearInterval(intervalRef.current)
        }
        
        iteration += 1 / 3
      }, speed)
    }, delay)

    return () => {
      clearTimeout(timer)
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [text, speed, scrambleChars, delay])

  return <span>{displayText}</span>
}
