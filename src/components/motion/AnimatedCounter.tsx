"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

export interface AnimatedCounterProps {
  value?: number;
  start?: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  className?: string;
  delay?: number;
}

export function AnimatedCounter({
  value,
  start = 0,
  duration = 2,
  suffix = "",
  prefix = "",
  decimals = 0,
  className,
  delay = 0,
}: AnimatedCounterProps) {
  const targetValue = value ?? start;
  const [count, setCount] = useState(start);
  const counterRef = useRef<HTMLSpanElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const el = counterRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const scrollTrigger = {
        trigger: el,
        start: "top 85%",
        toggleActions: "play none none none",
      };

      if (reducedMotion) {
        setCount(targetValue);
        return;
      }

      const obj = { val: start };

      gsap.to(obj, {
        val: targetValue,
        duration: reducedMotion ? 0.01 : duration,
        delay,
        ease: "power2.out",
        onUpdate: () => {
          setCount(parseFloat(obj.val.toFixed(decimals)));
        },
        scrollTrigger,
      });
    });

    return () => ctx.revert();
  }, [targetValue, start, duration, decimals, delay, reducedMotion]);

  return (
    <span ref={counterRef} className={className}>
      {prefix}
      {count.toLocaleString("es-MX", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  );
}
