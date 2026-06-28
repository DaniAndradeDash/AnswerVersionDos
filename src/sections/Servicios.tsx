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
import { Button } from "@/components/ui/Button";
import { TiltCard } from "@/components/motion/TiltCard";
import { AnimatedSection } from "@/components/motion/AnimatedSection";
import { StaggerContainer } from "@/components/motion/StaggerContainer";
import { GradientOrb } from "@/components/motion/GradientOrb";
import { services } from "@/constants/services";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

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
  },
  {
    border: "border-primary",
    borderHover: "group-hover:border-primary/50",
    bg: "bg-primary",
    text: "text-primary",
    glow: "shadow-primary/20",
    from: "from-primary",
    gradient: "from-primary/20",
  },
  {
    border: "border-secondary",
    borderHover: "group-hover:border-secondary/50",
    bg: "bg-secondary",
    text: "text-secondary",
    glow: "shadow-secondary/20",
    from: "from-secondary",
    gradient: "from-secondary/20",
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
  const cardNumber = String(index + 1).padStart(2, "0");

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

  function handleAccentLeave() {
    if (!accentRef.current || reducedMotion) return;
    gsap.to(accentRef.current, {
      scaleX: 0,
      duration: 0.2,
      ease: "power2.in",
    });
  }

  return (
    <TiltCard maxTilt={4} perspective={1200} scale={1.01} className="h-full">
      <div
        ref={cardRef}
        className="relative h-full min-h-[380px] rounded-2xl border border-border/50 bg-card/80 backdrop-blur-sm overflow-hidden group cursor-pointer transition-shadow duration-500 hover:shadow-xl hover:shadow-secondary/5"
        onClick={onToggle}
        role="button"
        tabIndex={0}
        aria-expanded={isSelected}
        onKeyDown={(e) => e.key === "Enter" && onToggle()}
        onMouseEnter={handleAccentEnter}
        onMouseLeave={handleAccentLeave}
      >
        {/* Top accent bar */}
        <div
          ref={accentRef}
          className={`absolute top-0 left-0 right-0 h-1 ${accent.bg}`}
          aria-hidden="true"
        />

        {/* Large background number watermark */}
        <div
          className="absolute -bottom-4 -right-2 text-[8rem] sm:text-[10rem] font-black leading-none select-none pointer-events-none opacity-[0.03] text-foreground"
          aria-hidden="true"
        >
          {cardNumber}
        </div>

        {/* Subtle gradient overlay */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${accent.gradient} via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
          aria-hidden="true"
        />

        <div className="relative z-10 flex flex-col h-full p-8">
          {/* Icon */}
          <div
            ref={iconRef}
            className={`relative mb-8 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${accent.gradient} to-transparent border border-border/30 ${accent.borderHover} transition-colors duration-300`}
          >
            <Icon className={`h-7 w-7 ${accent.text}`} aria-hidden="true" />
            {/* Icon glow ring */}
            <div
              className={`absolute inset-0 rounded-2xl ${accent.bg} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
              aria-hidden="true"
            />
          </div>

          {/* Title */}
          <h3 className="font-bold text-xl text-foreground mb-3 tracking-tight">
            {service.title}
          </h3>

          {/* Short description */}
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-auto">
            {service.description.slice(0, 120)}...
          </p>

          {/* Divider + Toggle */}
          <div className="mt-6 pt-4 border-t border-border/30 flex items-center justify-between">
            <span
              className={`text-xs font-medium ${accent.text} uppercase tracking-wider`}
            >
              {isSelected ? "Cerrar detalles" : "Ver detalles"}
            </span>
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full ${isSelected ? `${accent.bg} text-white` : "bg-muted/50 text-muted-foreground"} transition-colors duration-300`}
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
            <div className="pt-5 mt-2 border-t border-border/30 space-y-4">
              <p className="text-sm text-muted-foreground leading-relaxed">
                {service.description}
              </p>

              {/* Service image */}
              {service.image && (
                <div className="relative w-full h-[600px] rounded-xl overflow-hidden border border-border/30">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Image overlay gradient */}
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent"
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
        {/* Background watermark number */}
        <div
          className="absolute -top-8 left-0 text-[10rem] sm:text-[14rem] font-black leading-none select-none pointer-events-none text-foreground opacity-[0.02]"
          aria-hidden="true"
        >
          01
        </div>

        {/* Horizontal decorative line */}
        <div className="flex items-center gap-4 mb-6">
          <div className="h-px w-12 bg-secondary" aria-hidden="true" />
          <span className="text-xs font-mono font-medium text-secondary uppercase tracking-[0.2em]">
            Lo que hacemos
          </span>
        </div>

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
        {/* Estrategias sustentables - Versión Tecnológica y Moderna */}
        <div className="group relative mb-12 rounded-3xl border border-emerald-500/20 bg-slate-900/90 backdrop-blur-md overflow-hidden transition-all duration-500 hover:border-emerald-500/40 hover:shadow-[0_0_30px_rgba(16,185,129,0.1)]">
          {/* Efecto de Luces de Fondo (Glow) */}
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl group-hover:bg-emerald-500/20 transition-all duration-700" />
          <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl group-hover:bg-cyan-500/20 transition-all duration-700" />

          {/* Malla de fondo sutil o gradiente */}
          <div
            className="absolute inset-0 bg-gradient-to-br from-emerald-500/[0.03] via-transparent to-cyan-500/[0.03]"
            aria-hidden="true"
          />

          {/* Línea de acento izquierda interactiva */}
          <div
            className="absolute left-0 top-0 bottom-0 w-[4px] bg-gradient-to-b from-emerald-500 via-cyan-500 to-emerald-500 transition-all duration-500 group-hover:scale-y-105"
            aria-hidden="true"
          />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 p-8 lg:p-10">
            {/* Contenedor de Icono + Texto */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start lg:items-center gap-5 text-center sm:text-left flex-1">
              {/* Icono Tecnológico */}
              <div className="flex-shrink-0 p-4 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-950 border border-slate-700/50 shadow-xl group-hover:border-emerald-500/50 transition-colors duration-300">
                <ShieldCheck className="h-8 w-8 text-emerald-400 animate-pulse" />
              </div>

              {/* Contenido de Texto */}
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-2">
                  ⚡ Innovación Segura
                </div>
                <h3 className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent tracking-tight">
                  Estrategias sustentables
                </h3>
                <p className="text-slate-400 text-sm sm:text-base max-w-xl font-medium">
                  Confidencialidad y Transparencia en el manejo de todos los
                  datos
                </p>
              </div>
            </div>

            {/* Botón CTA Activado y Modernizado */}
            <div className="flex-shrink-0 w-full md:w-auto">
              <Link href="#contacto">
                <button className="group/btn relative w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-slate-900 bg-emerald-400 rounded-xl overflow-hidden hover:bg-emerald-300 transition-all duration-300 shadow-[0_4px_20px_rgba(52,211,153,0.3)] hover:shadow-[0_4px_25px_rgba(52,211,153,0.5)] active:scale-98">
                  <span>Contactanos</span>
                  <ArrowRight className="h-4 w-4 transform group-hover/btn:translate-x-1.5 transition-transform duration-300" />
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* ¿No encuentras lo que buscas? - Versión Neón y Tecnológica */}
        <div className="group relative rounded-3xl border border-cyan-500/30 bg-slate-900/90 backdrop-blur-md overflow-hidden transition-all duration-500 hover:border-cyan-400 hover:shadow-[0_0_35px_rgba(6,182,212,0.25)]">
          {/* Efecto Glow de Resplandor Neón en las esquinas */}
          <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-cyan-500/15 rounded-full blur-3xl group-hover:bg-cyan-500/25 transition-all duration-700" />
          <div className="absolute -left-12 -top-12 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl group-hover:bg-indigo-500/20 transition-all duration-700" />

          {/* Fondo con gradiente imperceptible */}
          <div
            className="absolute inset-0 bg-gradient-to-br from-cyan-500/[0.02] via-transparent to-indigo-500/[0.02]"
            aria-hidden="true"
          />

          {/* Línea de acento izquierda interactiva (Gradiente Cian Eléctrico) */}
          <div
            className="absolute left-0 top-0 bottom-0 w-[4px] bg-gradient-to-b from-cyan-500 via-indigo-500 to-cyan-500 transition-all duration-500 group-hover:scale-y-105"
            aria-hidden="true"
          />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8 p-8 lg:p-10">
            {/* Contenedor de Icono de Ayuda + Texto */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start lg:items-center gap-5 text-center sm:text-left flex-1">
              {/* Icono de soporte tecnológico */}
              <div className="flex-shrink-0 p-4 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-950 border border-slate-700/50 shadow-xl group-hover:border-cyan-500/50 transition-all duration-300">
                <HelpCircle className="h-8 w-8 text-cyan-400 animate-bounce [animation-duration:3s]" />
              </div>

              {/* Contenido de Texto */}
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 mb-2">
                  ✨ Soporte Inmediato
                </div>
                <h3 className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent tracking-tight">
                  ¿No encuentras lo que buscas?
                </h3>
                <p className="text-slate-400 text-sm sm:text-base max-w-xl font-medium">
                  Contáctanos para una consulta personalizada. Analizamos tu
                  caso y te ofrecemos la mejor solución.
                </p>
              </div>
            </div>

            {/* Botón CTA Activado y Estilizado */}
            <div className="flex-shrink-0 w-full lg:w-auto">
              <Link href="#contacto">
                <button className="group/btn relative w-full lg:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-slate-900 bg-cyan-400 rounded-xl overflow-hidden hover:bg-cyan-300 transition-all duration-300 shadow-[0_4px_20px_rgba(6,182,212,0.3)] hover:shadow-[0_4px_25px_rgba(6,182,212,0.5)] active:scale-98">
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
