"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Users,
  Search,
  ClipboardCheck,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Section } from "@/components/ui/Section";
import { TiltCard } from "@/components/motion/TiltCard";
import { AnimatedSection } from "@/components/motion/AnimatedSection";
import { StaggerContainer } from "@/components/motion/StaggerContainer";
import { GradientOrb } from "@/components/motion/GradientOrb";
import { services } from "@/constants/services";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

// ============================================
// Circuit Watermark SVGs — Futuristic designs
// Compatible with iOS Safari & Android Chrome
// Uses explicit stroke/fill="currentColor"
// ============================================

const circuitDesigns = [
  // Circuit 01 — Neural network with green accent
  () => (
    <svg viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Main neural paths */}
      <path d="M50 250 L50 200 L90 160 L90 100 L150 50 L210 50 L210 90 L250 130 L250 190 L210 230 L150 230 L150 190" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M90 160 L150 160 L150 110 L210 110 L210 160 L250 210" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M150 50 L150 110" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M210 90 L150 90 L150 110" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* Secondary connections */}
      <path d="M50 220 L70 200 L70 170 L110 140" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
      <path d="M190 210 L190 180 L230 150 L250 130" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
      <path d="M130 70 L130 110 L110 130" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
      {/* Terminal nodes */}
      <circle cx="50" cy="250" r="6" fill="currentColor" />
      <circle cx="50" cy="250" r="3" fill="white" opacity="0.3" />
      <circle cx="90" cy="160" r="7" fill="currentColor" />
      <circle cx="90" cy="160" r="3.5" fill="white" opacity="0.3" />
      <circle cx="150" cy="50" r="6" fill="currentColor" />
      <circle cx="150" cy="50" r="3" fill="white" opacity="0.3" />
      <circle cx="210" cy="50" r="7" fill="currentColor" />
      <circle cx="210" cy="50" r="3.5" fill="white" opacity="0.3" />
      <circle cx="250" cy="130" r="6" fill="currentColor" />
      <circle cx="250" cy="130" r="3" fill="white" opacity="0.3" />
      <circle cx="210" cy="230" r="7" fill="currentColor" />
      <circle cx="210" cy="230" r="3.5" fill="white" opacity="0.3" />
      <circle cx="150" cy="190" r="6" fill="currentColor" />
      <circle cx="150" cy="190" r="3" fill="white" opacity="0.3" />
      {/* Junction points */}
      <circle cx="150" cy="110" r="4" fill="currentColor" opacity="0.7" />
      <circle cx="210" cy="110" r="4" fill="currentColor" opacity="0.7" />
      <circle cx="210" cy="160" r="4" fill="currentColor" opacity="0.7" />
      <circle cx="110" cy="140" r="3" fill="currentColor" opacity="0.5" />
      <circle cx="230" cy="150" r="3" fill="currentColor" opacity="0.5" />
      {/* Floating data points */}
      <circle cx="40" cy="140" r="2.5" fill="currentColor" opacity="0.3" />
      <circle cx="270" cy="90" r="2.5" fill="currentColor" opacity="0.3" />
      <circle cx="120" cy="260" r="2.5" fill="currentColor" opacity="0.3" />
      <circle cx="260" cy="240" r="2" fill="currentColor" opacity="0.25" />
      <circle cx="70" cy="80" r="2" fill="currentColor" opacity="0.25" />
    </svg>
  ),
  // Circuit 02 — Data grid with blue accent
  () => (
    <svg viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Primary grid structure */}
      <path d="M60 240 L60 180 L100 140 L100 80 L160 40 L220 40 L220 80 L260 120 L260 180 L220 220 L160 220 L160 180 L100 180" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M100 140 L160 140 L160 100 L220 100 L220 140" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M160 40 L160 100" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M220 80 L160 80 L160 100" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* Diagonal data flows */}
      <path d="M60 210 L80 190 L80 150 L120 120" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
      <path d="M240 200 L240 160 L220 140 L200 120" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
      <path d="M180 60 L180 100 L200 120" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
      <path d="M120 60 L120 100 L140 120" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
      {/* Hexagonal nodes */}
      <circle cx="60" cy="240" r="7" fill="currentColor" />
      <circle cx="60" cy="240" r="3.5" fill="white" opacity="0.3" />
      <circle cx="100" cy="140" r="7" fill="currentColor" />
      <circle cx="100" cy="140" r="3.5" fill="white" opacity="0.3" />
      <circle cx="160" cy="40" r="7" fill="currentColor" />
      <circle cx="160" cy="40" r="3.5" fill="white" opacity="0.3" />
      <circle cx="220" cy="40" r="7" fill="currentColor" />
      <circle cx="220" cy="40" r="3.5" fill="white" opacity="0.3" />
      <circle cx="260" cy="120" r="7" fill="currentColor" />
      <circle cx="260" cy="120" r="3.5" fill="white" opacity="0.3" />
      <circle cx="220" cy="220" r="7" fill="currentColor" />
      <circle cx="220" cy="220" r="3.5" fill="white" opacity="0.3" />
      <circle cx="160" cy="180" r="6" fill="currentColor" />
      <circle cx="160" cy="180" r="3" fill="white" opacity="0.3" />
      {/* Junction nodes */}
      <circle cx="160" cy="100" r="4" fill="currentColor" opacity="0.7" />
      <circle cx="220" cy="100" r="4" fill="currentColor" opacity="0.7" />
      <circle cx="220" cy="140" r="4" fill="currentColor" opacity="0.7" />
      <circle cx="160" cy="140" r="4" fill="currentColor" opacity="0.7" />
      {/* Secondary connection points */}
      <circle cx="120" cy="120" r="3" fill="currentColor" opacity="0.5" />
      <circle cx="240" cy="160" r="3" fill="currentColor" opacity="0.5" />
      <circle cx="200" cy="120" r="3" fill="currentColor" opacity="0.5" />
      <circle cx="140" cy="120" r="3" fill="currentColor" opacity="0.5" />
      {/* Signal points */}
      <circle cx="40" cy="120" r="2.5" fill="currentColor" opacity="0.3" />
      <circle cx="280" cy="180" r="2.5" fill="currentColor" opacity="0.3" />
      <circle cx="140" cy="260" r="2.5" fill="currentColor" opacity="0.3" />
      <circle cx="250" cy="60" r="2" fill="currentColor" opacity="0.25" />
    </svg>
  ),
  // Circuit 03 — Quantum pathways with green accent
  () => (
    <svg viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Main quantum paths */}
      <path d="M50 250 L50 200 L80 170 L80 110 L120 70 L120 50 L180 50 L180 90 L220 130 L220 190 L180 230 L120 230 L120 190 L80 190" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M80 170 L140 170 L140 130 L180 130 L180 170 L220 210" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M120 70 L120 130 L80 130 L80 110" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M180 90 L140 90 L140 130" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M220 130 L180 130" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* Energy branches */}
      <path d="M50 220 L70 200 L70 160 L90 140" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
      <path d="M200 210 L200 170 L220 150 L220 130" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
      <path d="M160 70 L160 110 L140 130" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
      <path d="M100 90 L100 130 L120 150" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
      {/* Diamond-shaped IC nodes */}
      <rect x="72" y="162" width="16" height="16" rx="3" fill="currentColor" transform="rotate(45 80 170)" />
      <rect x="172" y="122" width="16" height="16" rx="3" fill="currentColor" transform="rotate(45 180 130)" />
      <rect x="112" y="62" width="16" height="16" rx="3" fill="currentColor" transform="rotate(45 120 70)" />
      {/* Terminal circles */}
      <circle cx="50" cy="250" r="7" fill="currentColor" />
      <circle cx="50" cy="250" r="3.5" fill="white" opacity="0.3" />
      <circle cx="120" cy="230" r="7" fill="currentColor" />
      <circle cx="120" cy="230" r="3.5" fill="white" opacity="0.3" />
      <circle cx="180" cy="230" r="6" fill="currentColor" />
      <circle cx="180" cy="230" r="3" fill="white" opacity="0.3" />
      <circle cx="220" cy="190" r="7" fill="currentColor" />
      <circle cx="220" cy="190" r="3.5" fill="white" opacity="0.3" />
      <circle cx="220" cy="130" r="6" fill="currentColor" />
      <circle cx="220" cy="130" r="3" fill="white" opacity="0.3" />
      <circle cx="180" cy="50" r="7" fill="currentColor" />
      <circle cx="180" cy="50" r="3.5" fill="white" opacity="0.3" />
      {/* Junction nodes */}
      <circle cx="140" cy="130" r="4" fill="currentColor" opacity="0.7" />
      <circle cx="80" cy="130" r="4" fill="currentColor" opacity="0.7" />
      <circle cx="180" cy="170" r="4" fill="currentColor" opacity="0.7" />
      <circle cx="140" cy="170" r="4" fill="currentColor" opacity="0.7" />
      {/* Secondary nodes */}
      <circle cx="90" cy="140" r="3" fill="currentColor" opacity="0.5" />
      <circle cx="220" cy="150" r="3" fill="currentColor" opacity="0.5" />
      <circle cx="120" cy="150" r="3" fill="currentColor" opacity="0.5" />
      <circle cx="160" cy="110" r="3" fill="currentColor" opacity="0.5" />
      {/* Quantum dots */}
      <circle cx="30" cy="180" r="2.5" fill="currentColor" opacity="0.3" />
      <circle cx="270" cy="100" r="2.5" fill="currentColor" opacity="0.3" />
      <circle cx="200" cy="270" r="2.5" fill="currentColor" opacity="0.3" />
      <circle cx="150" cy="270" r="2.5" fill="currentColor" opacity="0.3" />
      <circle cx="240" cy="70" r="2" fill="currentColor" opacity="0.25" />
      <circle cx="60" cy="100" r="2" fill="currentColor" opacity="0.25" />
    </svg>
  ),
];

const iconMap: Record<string, React.ElementType> = {
  Users,
  Search,
  ClipboardCheck,
};

const accentColors = [
  // Card 0 — Red
  {
    name: "red",
    border: "border-red-500",
    borderHover: "group-hover:border-red-500/50",
    bg: "bg-red-500",
    bgLight: "bg-red-50",
    bgLightDark: "dark:bg-red-500/10",
    text: "text-red-500",
    textLight: "text-red-600",
    textLightDark: "dark:text-red-400",
    glow: "shadow-red-500/20",
    from: "from-red-500",
    gradient: "from-red-500/10",
    neonCard: "neon-card-red",
    neonBorderSpin: "neon-border-red",
    neonGlowHover: "shadow-[0_0_40px_rgba(239,68,68,0.15)]",
    neonBorderLight: "rgba(239,68,68,0.15)",
    neonBorderDark: "rgba(239,68,68,0.3)",
    neonBorderDarkHover: "rgba(239,68,68,0.6)",
    neonIconBg: "rgba(239,68,68,0.06)",
    neonIconBgDark: "rgba(239,68,68,0.1)",
    neonIconBorderLight: "rgba(239,68,68,0.15)",
    neonIconBorderDark: "rgba(239,68,68,0.3)",
    neonIconBorderDarkHover: "rgba(239,68,68,0.5)",
    lightCardBg: "bg-white",
    lightCardBorder: "border-gray-200/80",
    lightCardHoverBorder: "hover:border-red-300/60",
    lightCardHoverShadow: "hover:shadow-[0_8px_32px_rgba(239,68,68,0.08)]",
    lightTitleText: "text-gray-900",
    lightDescText: "text-gray-500",
    lightDividerBorder: "border-gray-100",
    lightToggleBg: "bg-gray-100",
    lightToggleText: "text-gray-400",
    lightToggleHoverBg: "hover:bg-gray-200",
    lightExpandedBorder: "border-gray-100",
    lightExpandedText: "text-gray-600",
    lightImageBorder: "border-gray-200/60",
    circuitLightColor: "rgb(200,200,200)",
    circuitDarkColor: "rgb(239,68,68)",
    circuitDarkOpacity: 0.5,
  },
  // Card 1 — Green
  {
    name: "green",
    border: "border-green-500",
    borderHover: "group-hover:border-green-500/50",
    bg: "bg-green-500",
    bgLight: "bg-green-50",
    bgLightDark: "dark:bg-green-500/10",
    text: "text-green-500",
    textLight: "text-green-600",
    textLightDark: "dark:text-green-400",
    glow: "shadow-green-500/20",
    from: "from-green-500",
    gradient: "from-green-500/10",
    neonCard: "neon-card-green",
    neonBorderSpin: "neon-border-green",
    neonGlowHover: "shadow-[0_0_40px_rgba(34,197,94,0.15)]",
    neonBorderLight: "rgba(34,197,94,0.15)",
    neonBorderDark: "rgba(34,197,94,0.3)",
    neonBorderDarkHover: "rgba(34,197,94,0.6)",
    neonIconBg: "rgba(34,197,94,0.06)",
    neonIconBgDark: "rgba(34,197,94,0.1)",
    neonIconBorderLight: "rgba(34,197,94,0.15)",
    neonIconBorderDark: "rgba(34,197,94,0.3)",
    neonIconBorderDarkHover: "rgba(34,197,94,0.5)",
    lightCardBg: "bg-white",
    lightCardBorder: "border-gray-200/80",
    lightCardHoverBorder: "hover:border-green-300/60",
    lightCardHoverShadow: "hover:shadow-[0_8px_32px_rgba(34,197,94,0.08)]",
    lightTitleText: "text-gray-900",
    lightDescText: "text-gray-500",
    lightDividerBorder: "border-gray-100",
    lightToggleBg: "bg-gray-100",
    lightToggleText: "text-gray-400",
    lightToggleHoverBg: "hover:bg-gray-200",
    lightExpandedBorder: "border-gray-100",
    lightExpandedText: "text-gray-600",
    lightImageBorder: "border-gray-200/60",
    circuitLightColor: "rgb(200,200,200)",
    circuitDarkColor: "rgb(34,197,94)",
    circuitDarkOpacity: 0.5,
  },
  // Card 2 — Blue
  {
    name: "blue",
    border: "border-blue-500",
    borderHover: "group-hover:border-blue-500/50",
    bg: "bg-blue-500",
    bgLight: "bg-blue-50",
    bgLightDark: "dark:bg-blue-500/10",
    text: "text-blue-500",
    textLight: "text-blue-600",
    textLightDark: "dark:text-blue-400",
    glow: "shadow-blue-500/20",
    from: "from-blue-500",
    gradient: "from-blue-500/10",
    neonCard: "neon-card-blue",
    neonBorderSpin: "neon-border-blue",
    neonGlowHover: "shadow-[0_0_40px_rgba(59,130,246,0.15)]",
    neonBorderLight: "rgba(59,130,246,0.15)",
    neonBorderDark: "rgba(59,130,246,0.3)",
    neonBorderDarkHover: "rgba(59,130,246,0.6)",
    neonIconBg: "rgba(59,130,246,0.06)",
    neonIconBgDark: "rgba(59,130,246,0.1)",
    neonIconBorderLight: "rgba(59,130,246,0.15)",
    neonIconBorderDark: "rgba(59,130,246,0.3)",
    neonIconBorderDarkHover: "rgba(59,130,246,0.5)",
    lightCardBg: "bg-white",
    lightCardBorder: "border-gray-200/80",
    lightCardHoverBorder: "hover:border-blue-300/60",
    lightCardHoverShadow: "hover:shadow-[0_8px_32px_rgba(59,130,246,0.08)]",
    lightTitleText: "text-gray-900",
    lightDescText: "text-gray-500",
    lightDividerBorder: "border-gray-100",
    lightToggleBg: "bg-gray-100",
    lightToggleText: "text-gray-400",
    lightToggleHoverBg: "hover:bg-gray-200",
    lightExpandedBorder: "border-gray-100",
    lightExpandedText: "text-gray-600",
    lightImageBorder: "border-gray-200/60",
    circuitLightColor: "rgb(200,200,200)",
    circuitDarkColor: "rgb(59,130,246)",
    circuitDarkOpacity: 0.5,
  },
];

function ServiceCard({
  service,
  isSelected,
  onToggle,
  index,
}: {
  service: (typeof services)[number];
  isSelected: boolean;
  onToggle: () => void;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const accentRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const Icon = iconMap[service.icon] ?? Users;
  const accent = accentColors[index % accentColors.length];

  // Accent bar animation on hover
  useEffect(() => {
    const el = accentRef.current;
    if (!el || reducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.set(el, { scaleX: 0, transformOrigin: "left center" });
    });

    return () => ctx.revert();
  }, [reducedMotion]);

  // Content expand/collapse with GSAP
  useEffect(() => {
    const el = contentRef.current;
    if (!el || reducedMotion) return;

    if (isSelected) {
      gsap.to(el, {
        height: "auto",
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
      });
    } else {
      gsap.to(el, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
      });
    }
  }, [isSelected, reducedMotion]);

  // Icon scale on selection
  useEffect(() => {
    const el = iconRef.current;
    if (!el || reducedMotion) return;

    gsap.to(el, {
      scale: isSelected ? 1.1 : 1,
      duration: 0.3,
      ease: "power2.out",
    });
  }, [isSelected, reducedMotion]);

  function handleAccentEnter() {
    if (!accentRef.current || reducedMotion) return;
    gsap.to(accentRef.current, {
      scaleX: 1,
      duration: 0.3,
      ease: "power2.out",
    });
  }

  return (
    <TiltCard maxTilt={4} perspective={1200} scale={1.01} className="h-full">
      <div
        ref={cardRef}
        className={`relative h-full min-h-[340px] sm:min-h-[380px] rounded-2xl overflow-hidden group cursor-pointer
          ${accent.lightCardBg} ${accent.lightCardBorder} ${accent.lightCardHoverBorder} ${accent.lightCardHoverShadow}
          dark:bg-slate-900/80 dark:backdrop-blur-sm ${accent.neonCard}
          transition-all duration-500`}
        onClick={onToggle}
        role="button"
        tabIndex={0}
        aria-expanded={isSelected}
        onKeyDown={(e) => e.key === "Enter" && onToggle()}
        onMouseEnter={handleAccentEnter}
      >
        {/* ═══════════════════════════════════════════
            Rotating Neon Border — Always Active (Dark)
            ═══════════════════════════════════════════ */}
        <div
          className={`absolute inset-0 rounded-2xl pointer-events-none hidden dark:block ${accent.neonBorderSpin}`}
          aria-hidden="true"
        />

        {/* ═══════════════════════════════════════════
            Scanline Sweep (Dark Mode)
            ═══════════════════════════════════════════ */}
        <div
          className="card-scanline absolute left-0 right-0 h-[2px] pointer-events-none hidden dark:block"
          aria-hidden="true"
        />

        {/* ═══════════════════════════════════════════
            Top Accent Bar — Expands on Hover
            ═══════════════════════════════════════════ */}
        <div
          ref={accentRef}
          className={`absolute top-0 left-0 right-0 h-[3px] ${accent.bg} z-20`}
          aria-hidden="true"
        />

        {/* ═══════════════════════════════════════════
            Corner Neon Dots (Dark Mode)
            ═══════════════════════════════════════════ */}
        <div className="absolute top-2 left-2 w-1.5 h-1.5 rounded-full hidden dark:block" aria-hidden="true"
          style={{ backgroundColor: accent.circuitDarkColor, animation: 'corner-dot-pulse 2.5s ease-in-out infinite' }}
        />
        <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full hidden dark:block" aria-hidden="true"
          style={{ backgroundColor: accent.circuitDarkColor, animation: 'corner-dot-pulse 2.5s ease-in-out infinite 0.6s' }}
        />
        <div className="absolute bottom-2 left-2 w-1.5 h-1.5 rounded-full hidden dark:block" aria-hidden="true"
          style={{ backgroundColor: accent.circuitDarkColor, animation: 'corner-dot-pulse 2.5s ease-in-out infinite 1.2s' }}
        />
        <div className="absolute bottom-2 right-2 w-1.5 h-1.5 rounded-full hidden dark:block" aria-hidden="true"
          style={{ backgroundColor: accent.circuitDarkColor, animation: 'corner-dot-pulse 2.5s ease-in-out infinite 1.8s' }}
        />

        {/* ═══════════════════════════════════════════
            Corner Tech Accents (Light Mode)
            ═══════════════════════════════════════════ */}
        <div className={`absolute top-0 left-0 w-12 h-[2px] ${accent.bg} opacity-20 group-hover:opacity-40 transition-opacity duration-500 dark:hidden`} aria-hidden="true" />
        <div className={`absolute top-0 left-0 w-[2px] h-12 ${accent.bg} opacity-20 group-hover:opacity-40 transition-opacity duration-500 dark:hidden`} aria-hidden="true" />
        <div className={`absolute bottom-0 right-0 w-12 h-[2px] ${accent.bg} opacity-20 group-hover:opacity-40 transition-opacity duration-500 dark:hidden`} aria-hidden="true" />
        <div className={`absolute bottom-0 right-0 w-[2px] h-12 ${accent.bg} opacity-20 group-hover:opacity-40 transition-opacity duration-500 dark:hidden`} aria-hidden="true" />

        {/* ═══════════════════════════════════════════
            Circuit Watermark — Abstract tech pattern
            ═══════════════════════════════════════════ */}
        <div
          className="absolute -bottom-8 -right-8 w-[160px] h-[160px] sm:w-[220px] sm:h-[220px] md:w-[280px] md:h-[280px] select-none pointer-events-none transition-all duration-700 group-hover:opacity-[0.1]"
          aria-hidden="true"
          style={{ opacity: 0.04 }}
        >
          <div className="dark:hidden" style={{ color: accent.circuitLightColor }}>
            {circuitDesigns[index % circuitDesigns.length]()}
          </div>
          <div className="hidden dark:block" style={{ color: accent.circuitDarkColor, opacity: accent.circuitDarkOpacity }}>
            {circuitDesigns[index % circuitDesigns.length]()}
          </div>
        </div>

        {/* ═══════════════════════════════════════════
            Grid Pattern — Appears on Hover (Dark)
            ═══════════════════════════════════════════ */}
        <div
          className="absolute inset-0 pointer-events-none hidden dark:block opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{
            backgroundImage: `linear-gradient(${accent.neonBorderDark} 1px, transparent 1px), linear-gradient(90deg, ${accent.neonBorderDark} 1px, transparent 1px)`,
            backgroundSize: '32px 32px',
          }}
          aria-hidden="true"
        />

        {/* ═══════════════════════════════════════════
            Energy Trace — Bottom Line (Dark Mode)
            ═══════════════════════════════════════════ */}
        <div
          className="card-energy-trace absolute bottom-0 left-0 right-0 h-[2px] pointer-events-none hidden dark:block"
          aria-hidden="true"
        />

        {/* ═══════════════════════════════════════════
            Subtle Gradient Overlay on Hover
            ═══════════════════════════════════════════ */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${accent.gradient} via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none dark:from-white/[0.02]`}
          aria-hidden="true"
        />

        {/* ═══════════════════════════════════════════
            Content Layer
            ═══════════════════════════════════════════ */}
        <div className="relative z-10 flex flex-col h-full p-6 sm:p-8">
          {/* ── Icon Container ── */}
          <div
            ref={iconRef}
            className={`relative mb-6 sm:mb-7 inline-flex h-13 w-13 sm:h-14 sm:w-14 items-center justify-center rounded-xl border transition-all duration-500
              ${accent.bgLight} ${accent.bgLightDark} neon-icon-v2`}
            style={{
              borderColor: accent.neonIconBorderLight,
              '--v2-icon-bg-dark': accent.neonIconBgDark,
              '--v2-icon-border-dark': accent.neonIconBorderDark,
              '--v2-icon-border-dark-hover': accent.neonIconBorderDarkHover,
              '--v2-icon-glow': index === 0 ? 'rgba(239,68,68,0.25)' : index === 1 ? 'rgba(34,197,94,0.25)' : 'rgba(59,130,246,0.25)',
            } as React.CSSProperties}
          >
            <Icon className={`h-6 w-6 sm:h-6.5 sm:w-6.5 ${accent.text}`} aria-hidden="true" />
            {/* Icon neon pulse ring (Dark Mode) */}
            <div
              className="absolute inset-0 rounded-xl hidden dark:block pointer-events-none"
              aria-hidden="true"
              style={{
                border: `1px solid ${accent.neonBorderDark}`,
                animation: 'icon-ring-pulse 3s ease-in-out infinite',
              }}
            />
            {/* Inner glow on hover */}
            <div
              className={`absolute inset-0 rounded-xl ${accent.bg} opacity-0 group-hover:opacity-[0.08] transition-opacity duration-300`}
              aria-hidden="true"
            />
          </div>

          {/* ── Title (Light Mode) ── */}
          <h3 className={`font-bold text-lg sm:text-xl tracking-tight mb-2 dark:hidden ${accent.lightTitleText}`}>
            {service.title}
          </h3>
          {/* ── Title (Dark Mode — Neon Glow) ── */}
          <h3
            className="font-bold text-lg sm:text-xl tracking-tight mb-2 hidden dark:block"
            style={{
              color: 'white',
              textShadow: `0 0 20px ${accent.neonBorderDark}, 0 0 40px ${accent.neonBorderLight}`,
            }}
          >
            {service.title}
          </h3>

          {/* ── Short Description ── */}
          <p className={`text-sm leading-relaxed line-clamp-2 mb-auto ${accent.lightDescText} dark:text-slate-400`}>
            {service.description.slice(0, 120)}...
          </p>

          {/* ── Divider + Toggle ── */}
          <div className={`mt-5 sm:mt-6 pt-3 sm:pt-4 border-t flex items-center justify-between ${accent.lightDividerBorder} dark:border-slate-700/40`}>
            <span
              className={`text-xs font-semibold uppercase tracking-widest ${accent.textLight} ${accent.textLightDark}`}
            >
              {isSelected ? "Cerrar" : "Ver detalles"}
            </span>
            <div
              className={`flex h-7 w-7 items-center justify-center rounded-lg transition-all duration-300 ${
                isSelected
                  ? `${accent.bg} text-white shadow-md`
                  : `${accent.lightToggleBg} ${accent.lightToggleText} dark:bg-slate-800 dark:text-slate-500 ${accent.lightToggleHoverBg} dark:hover:bg-slate-700`
              }`}
            >
              {isSelected ? (
                <ChevronUp className="h-3.5 w-3.5" aria-hidden="true" />
              ) : (
                <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
              )}
            </div>
          </div>

          {/* ── Expanded Content ── */}
          <div
            ref={contentRef}
            className="overflow-hidden"
            style={{ height: 0, opacity: 0 }}
          >
            <div className={`pt-4 sm:pt-5 mt-2 border-t space-y-4 ${accent.lightExpandedBorder} dark:border-slate-700/40`}>
              <p className={`text-sm leading-relaxed ${accent.lightExpandedText} dark:text-slate-400`}>
                {service.description}
              </p>

              {/* Service image — HEIGHT NEVER CHANGES */}
              {service.image && (
                <div className="relative w-full h-[250px] sm:h-[350px] md:h-[450px] lg:h-[500px] rounded-xl overflow-hidden border dark:border-slate-700/40">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-contain transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-white/60 to-transparent dark:from-slate-900/40"
                    aria-hidden="true"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </TiltCard>
  );
}

export default function Servicios() {
  const [selected, setSelected] = useState<number | null>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  // CTA bar animation
  useEffect(() => {
    const el = ctaRef.current;
    if (!el || reducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        {
          opacity: 0,
          y: 40,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        },
      );
    });

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <Section
      id="servicios"
      variant="default"
      headingId="servicios-heading"
      className="relative overflow-hidden"
    >
      {/* Background decoration */}
      {!reducedMotion && (
        <>
          <GradientOrb
            size={500}
            color="var(--secondary)"
            blur={120}
            opacity={0.04}
            speed={0.5}
            className="-top-40 -right-40"
          />
          <GradientOrb
            size={350}
            color="var(--primary)"
            blur={90}
            opacity={0.03}
            speed={0.8}
            className="bottom-20 -left-32"
          />
        </>
      )}

      {/* Section header — BREAKS the centered pattern */}
      <div ref={headerRef} className="relative z-10 mb-10 sm:mb-14 lg:mb-16">
        {/* Circuit watermark — Section-level futuristic decoration */}
        <div
          className="absolute -top-20 -left-20 w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] md:w-[480px] md:h-[480px] select-none pointer-events-none transition-all duration-500"
          aria-hidden="true"
        >
          <div className="dark:hidden" style={{ color: 'rgba(100, 116, 139, 0.06)' }}>
            {circuitDesigns[0]()}
          </div>
          <div className="hidden dark:block" style={{ color: 'rgba(96, 165, 250, 0.4)', filter: 'drop-shadow(0 0 10px rgba(96, 165, 250, 0.1))' }}>
            {circuitDesigns[0]()}
          </div>
        </div>

        {/* Horizontal decorative line
        <div className="flex items-center gap-4 mb-6">
          <div className="h-px w-12 bg-secondary" aria-hidden="true" />
          <span className="text-xs font-mono font-medium text-secondary uppercase tracking-[0.2em]">
            Lo que hacemos
          </span>
        </div> */}

        {/* Two-column header layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start relative">
          {/* Title — left side */}
          <div className="lg:col-span-7">
            <AnimatedSection animation="fade-right" duration={0.6}>
              <h2
                id="servicios-heading"
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-foreground tracking-tight leading-[1.1]"
              >
                Nuestros <span className="text-gradient">Servicios</span>
              </h2>
            </AnimatedSection>
          </div>

          {/* Description — right side, offset */}
          <div className="lg:col-span-5 lg:pt-4">
            <AnimatedSection animation="fade-left" delay={0.15} duration={0.6}>
              <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
                En Answer{" "}
                <span className="text-secondary font-bold text-green-500">
                  st
                </span>{" "}
                ofrecemos soluciones estratégicas, asesoría personalizada y
                gestión eficiente de trámites para ayudarte a alcanzar tus
                objetivos.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </div>

      {/* Service Cards */}
      <StaggerContainer
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 relative z-10"
        staggerDelay={0.12}
      >
        {services.map((service, index) => (
          <ServiceCard
            key={service.id}
            service={service}
            index={index}
            isSelected={selected === service.id}
            onToggle={() =>
              setSelected(selected === service.id ? null : service.id)
            }
          />
        ))}
      </StaggerContainer>

      {/* CTA Bar — premium full-width treatment */}
      <div ref={ctaRef} className="mt-20 relative z-10">
        {/* Estrategias sustentables */}
        <div className="group relative mb-12 rounded-3xl overflow-hidden transition-all duration-500
          bg-white border border-emerald-500/20 hover:border-emerald-500/40 hover:shadow-xl hover:shadow-emerald-500/5
          dark:bg-slate-900 dark:border-emerald-500/20 dark:hover:border-emerald-500/40 dark:hover:shadow-[0_0_30px_rgba(16,185,129,0.1)]">
          {/* Light mode — subtle accent glow */}
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-emerald-500/5 rounded-full blur-3xl group-hover:bg-emerald-500/10 transition-all duration-700 dark:hidden" />
          <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-emerald-500/5 rounded-full blur-3xl group-hover:bg-emerald-500/10 transition-all duration-700 dark:hidden" />
          {/* Dark mode — glow effects */}
          <div className="hidden dark:block absolute -right-10 -top-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl group-hover:bg-emerald-500/20 transition-all duration-700" />
          <div className="hidden dark:block absolute -left-10 -bottom-10 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl group-hover:bg-cyan-500/20 transition-all duration-700" />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/[0.02] via-transparent to-emerald-500/[0.02] dark:from-emerald-500/[0.03] dark:to-cyan-500/[0.03]" aria-hidden="true" />

          {/* Left accent line */}
          <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-gradient-to-b from-emerald-500 via-emerald-400 to-emerald-500 transition-all duration-500 group-hover:scale-y-105" aria-hidden="true" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 p-8 lg:p-10">
            {/* Icon + Text */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start lg:items-center gap-5 text-center sm:text-left flex-1">
              {/* Icon container */}
              <div className="flex-shrink-0 p-4 rounded-2xl bg-emerald-50 dark:bg-slate-800 border border-emerald-500/20 dark:border-slate-700/50 shadow-sm dark:shadow-xl group-hover:border-emerald-500/40 dark:group-hover:border-emerald-500/50 transition-colors duration-300">
                <ShieldCheck className="h-8 w-8 text-emerald-600 dark:text-emerald-400 animate-pulse [animation-duration:3s]" />
              </div>

              {/* Text content */}
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 mb-2">
                  <span className="text-sm">⚡</span> Innovación Segura
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:bg-gradient-to-r dark:from-white dark:via-slate-200 dark:to-slate-400 dark:bg-clip-text dark:text-transparent tracking-tight">
                  Estrategias sustentables
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-xl font-medium">
                  Confidencialidad y Transparencia en el manejo de todos los datos
                </p>
              </div>
            </div>

            {/* CTA Button */}
            <div className="flex-shrink-0 w-full md:w-auto">
              <Link href="#contacto">
                <button className="group/btn relative w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-emerald-600 dark:bg-emerald-400 dark:text-slate-900 rounded-xl overflow-hidden hover:bg-emerald-500 dark:hover:bg-emerald-300 transition-all duration-300 shadow-lg shadow-emerald-600/20 dark:shadow-[0_4px_20px_rgba(52,211,153,0.3)] hover:shadow-xl hover:shadow-emerald-600/30 dark:hover:shadow-[0_4px_25px_rgba(52,211,153,0.5)] active:scale-98">
                  <span>Contactanos</span>
                  <ArrowRight className="h-4 w-4 transform group-hover/btn:translate-x-1.5 transition-transform duration-300" />
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* ¿No encuentras lo que buscas? */}
        <div className="group relative rounded-3xl overflow-hidden transition-all duration-500
          bg-white border border-cyan-500/20 hover:border-cyan-500/40 hover:shadow-xl hover:shadow-cyan-500/5
          dark:bg-slate-900 dark:border-cyan-500/30 dark:hover:border-cyan-400 dark:hover:shadow-[0_0_35px_rgba(6,182,212,0.25)]">
          {/* Light mode — subtle accent glow */}
          <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-cyan-500/5 rounded-full blur-3xl group-hover:bg-cyan-500/10 transition-all duration-700 dark:hidden" />
          <div className="absolute -left-12 -top-12 w-48 h-48 bg-cyan-500/5 rounded-full blur-3xl group-hover:bg-cyan-500/10 transition-all duration-700 dark:hidden" />
          {/* Dark mode — neon glow */}
          <div className="hidden dark:block absolute -right-12 -bottom-12 w-48 h-48 bg-cyan-500/15 rounded-full blur-3xl group-hover:bg-cyan-500/25 transition-all duration-700" />
          <div className="hidden dark:block absolute -left-12 -top-12 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl group-hover:bg-indigo-500/20 transition-all duration-700" />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/[0.02] via-transparent to-cyan-500/[0.02] dark:from-cyan-500/[0.02] dark:to-indigo-500/[0.02]" aria-hidden="true" />

          {/* Left accent line */}
          <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-gradient-to-b from-cyan-500 via-cyan-400 to-cyan-500 transition-all duration-500 group-hover:scale-y-105" aria-hidden="true" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8 p-8 lg:p-10">
            {/* Icon + Text */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start lg:items-center gap-5 text-center sm:text-left flex-1">
              {/* Icon container */}
              <div className="flex-shrink-0 p-4 rounded-2xl bg-cyan-50 dark:bg-slate-800 border border-cyan-500/20 dark:border-slate-700/50 shadow-sm dark:shadow-xl group-hover:border-cyan-500/40 dark:group-hover:border-cyan-500/50 transition-all duration-300">
                <HelpCircle className="h-8 w-8 text-cyan-600 dark:text-cyan-400 animate-bounce [animation-duration:3s]" />
              </div>

              {/* Text content */}
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 border border-cyan-500/20 mb-2">
                  <span className="text-sm">✨</span> Soporte Inmediato
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:bg-gradient-to-r dark:from-white dark:via-slate-200 dark:to-slate-400 dark:bg-clip-text dark:text-transparent tracking-tight">
                  ¿No encuentras lo que buscas?
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-xl font-medium">
                  Contáctanos para una consulta personalizada. Analizamos tu caso y te ofrecemos la mejor solución.
                </p>
              </div>
            </div>

            {/* CTA Button */}
            <div className="flex-shrink-0 w-full lg:w-auto">
              <Link href="#contacto">
                <button className="group/btn relative w-full lg:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-cyan-600 dark:bg-cyan-400 dark:text-slate-900 rounded-xl overflow-hidden hover:bg-cyan-500 dark:hover:bg-cyan-300 transition-all duration-300 shadow-lg shadow-cyan-600/20 dark:shadow-[0_4px_20px_rgba(6,182,212,0.3)] hover:shadow-xl hover:shadow-cyan-600/30 dark:hover:shadow-[0_4px_25px_rgba(6,182,212,0.5)] active:scale-98">
                  <span>Solicitar consulta</span>
                  <ArrowRight className="h-4 w-4 transform group-hover/btn:translate-x-1.5 transition-transform duration-300" />
                </button>
              </Link>
            </div>
          </div>
        </div>

      </div>
    </Section>
  );
}
