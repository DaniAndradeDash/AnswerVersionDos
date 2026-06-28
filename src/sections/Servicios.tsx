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
  {
    border: "border-secondary",
    borderHover: "group-hover:border-secondary/50",
    bg: "bg-secondary",
    text: "text-secondary",
    glow: "shadow-secondary/20",
    from: "from-secondary",
    gradient: "from-secondary/20",
    neonCard: "neon-card-secondary",
    neonGridColor: "rgba(49,191,44,0.3)",
    neonGridDark: "rgba(74,222,128,0.4)",
    neonBorderLight: "rgba(49,191,44,0.15)",
    neonBorderDark: "rgba(74,222,128,0.25)",
    neonBorderDarkHover: "rgba(74,222,128,0.4)",
    neonIconBg: "rgba(49,191,44,0.06)",
    neonIconBgDark: "rgba(74,222,128,0.08)",
    neonIconBorderLight: "rgba(49,191,44,0.2)",
    neonIconBorderDark: "rgba(74,222,128,0.3)",
    neonIconBorderDarkHover: "rgba(74,222,128,0.5)",
  },
  {
    border: "border-primary",
    borderHover: "group-hover:border-primary/50",
    bg: "bg-primary",
    text: "text-primary",
    glow: "shadow-primary/20",
    from: "from-primary",
    gradient: "from-primary/20",
    neonCard: "neon-card-primary",
    neonGridColor: "rgba(4,38,140,0.3)",
    neonGridDark: "rgba(96,165,250,0.4)",
    neonBorderLight: "rgba(4,38,140,0.15)",
    neonBorderDark: "rgba(96,165,250,0.25)",
    neonBorderDarkHover: "rgba(96,165,250,0.4)",
    neonIconBg: "rgba(4,38,140,0.06)",
    neonIconBgDark: "rgba(96,165,250,0.08)",
    neonIconBorderLight: "rgba(4,38,140,0.2)",
    neonIconBorderDark: "rgba(96,165,250,0.3)",
    neonIconBorderDarkHover: "rgba(96,165,250,0.5)",
  },
  {
    border: "border-secondary",
    borderHover: "group-hover:border-secondary/50",
    bg: "bg-secondary",
    text: "text-secondary",
    glow: "shadow-secondary/20",
    from: "from-secondary",
    gradient: "from-secondary/20",
    neonCard: "neon-card-secondary",
    neonGridColor: "rgba(49,191,44,0.3)",
    neonGridDark: "rgba(74,222,128,0.4)",
    neonBorderLight: "rgba(49,191,44,0.15)",
    neonBorderDark: "rgba(74,222,128,0.25)",
    neonBorderDarkHover: "rgba(74,222,128,0.4)",
    neonIconBg: "rgba(49,191,44,0.06)",
    neonIconBgDark: "rgba(74,222,128,0.08)",
    neonIconBorderLight: "rgba(49,191,44,0.2)",
    neonIconBorderDark: "rgba(74,222,128,0.3)",
    neonIconBorderDarkHover: "rgba(74,222,128,0.5)",
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
        className={`relative h-full min-h-[380px] rounded-2xl overflow-hidden group cursor-pointer transition-all duration-500
          bg-white border border-emerald-500/10
          hover:border-emerald-400/40 hover:shadow-[0_0_30px_rgba(49,191,44,0.15)] hover:shadow-emerald-400/10
          dark:bg-slate-900 dark:border-0 ${accent.neonCard}`}
        onClick={onToggle}
        role="button"
        tabIndex={0}
        aria-expanded={isSelected}
        onKeyDown={(e) => e.key === "Enter" && onToggle()}
        onMouseEnter={handleAccentEnter}
      >
        {/* Top accent bar */}
        <div
          ref={accentRef}
          className={`absolute top-0 left-0 right-0 h-[2px] ${accent.bg}`}
          aria-hidden="true"
        />

        {/* Corner accent lines */}
        <div className={`absolute top-0 left-0 w-10 h-[2px] ${accent.bg} opacity-30`} aria-hidden="true" />
        <div className={`absolute top-0 left-0 w-[2px] h-10 ${accent.bg} opacity-30`} aria-hidden="true" />
        <div className={`absolute bottom-0 right-0 w-10 h-[2px] ${accent.bg} opacity-30`} aria-hidden="true" />
        <div className={`absolute bottom-0 right-0 w-[2px] h-10 ${accent.bg} opacity-30`} aria-hidden="true" />

        {/* Circuit watermark */}
        <div
          className="absolute -bottom-12 -right-12 w-[260px] h-[260px] sm:w-[320px] sm:h-[320px] md:w-[340px] md:h-[340px] select-none pointer-events-none transition-all duration-500 group-hover:opacity-[0.1]"
          aria-hidden="true"
          style={{ opacity: 0.06 }}
        >
          <div className="dark:hidden" style={{ color: 'rgb(148, 163, 184)' }}>
            {circuitDesigns[index % circuitDesigns.length]()}
          </div>
          <div className="hidden dark:block" style={{ color: index === 1 ? 'rgb(96, 165, 250)' : 'rgb(74, 222, 128)', opacity: 0.6 }}>
            {circuitDesigns[index % circuitDesigns.length]()}
          </div>
        </div>

        {/* Subtle gradient overlay on hover */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${accent.gradient} via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
          aria-hidden="true"
        />

        <div className="relative z-10 flex flex-col h-full p-8">
          {/* Icon container — neon glow on hover */}
          <div
            ref={iconRef}
            className={`relative mb-8 inline-flex h-16 w-16 items-center justify-center rounded-2xl border transition-all duration-500
              bg-white border-emerald-500/20 group-hover:shadow-lg
              dark:bg-slate-800 dark:border-slate-700/50 neon-icon-container`}
            style={{
              boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
              borderColor: index === 1 ? 'rgba(59, 130, 246, 0.2)' : 'rgba(34, 197, 94, 0.2)',
              '--icon-bg-dark': accent.neonIconBgDark,
              '--icon-border-dark': accent.neonIconBorderDark,
              '--icon-border-dark-hover': accent.neonIconBorderDarkHover,
              '--icon-glow-color': index === 1 ? 'rgba(96,165,250,0.2)' : 'rgba(74,222,128,0.2)',
            } as React.CSSProperties}
          >
            <Icon className={`h-7 w-7 ${index === 0 ? 'text-green-500' : index === 1 ? 'text-blue-500' : 'text-emerald-500'}`} aria-hidden="true" />
            {/* Icon glow ring on hover */}
            <div
              className={`absolute inset-0 rounded-2xl ${accent.bg} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
              aria-hidden="true"
            />
          </div>

          {/* Title */}
          <h3 className="font-bold text-xl text-white tracking-tight dark:text-foreground">
            {service.title}
          </h3>

          {/* Short description */}
          <p className="text-sm text-slate-600 leading-relaxed line-clamp-2 mb-auto">
            {service.description.slice(0, 120)}...
          </p>

          {/* Divider + Toggle */}
          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
            <span
              className={`text-xs font-medium uppercase tracking-wider ${index === 0 ? 'text-green-600' : index === 1 ? 'text-blue-600' : 'text-emerald-600'}`}
            >
              {isSelected ? "Cerrar detalles" : "Ver detalles"}
            </span>
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300 ${
                isSelected
                  ? `${accent.bg} text-white shadow-lg`
                  : "bg-slate-100 text-slate-500 hover:bg-slate-200"
              }`}
            >
              {isSelected ? (
                <ChevronUp className="h-4 w-4" aria-hidden="true" />
              ) : (
                <ChevronDown className="h-4 w-4" aria-hidden="true" />
              )}
            </div>
          </div>

          {/* Expanded content */}
          <div
            ref={contentRef}
            className="overflow-hidden"
            style={{ height: 0, opacity: 0 }}
          >
            <div className="pt-5 mt-2 border-t border-slate-100 space-y-4">
              <p className="text-sm text-slate-600 leading-relaxed">
                {service.description}
              </p>

              {/* Service image */}
              {service.image && (
                <div className="relative w-full h-[600px] rounded-xl overflow-hidden border border-slate-200">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-white/40 to-transparent"
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
      <div ref={headerRef} className="relative z-10 mb-16">
        {/* Circuit watermark — Section-level futuristic decoration */}
        <div
          className="absolute -top-20 -left-20 w-[380px] h-[380px] sm:w-[480px] sm:h-[480px] select-none pointer-events-none transition-all duration-500"
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
                className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-foreground tracking-tight leading-[1.1]"
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
