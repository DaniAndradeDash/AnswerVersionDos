"use client";

import { useCallback, type MouseEvent, type ReactNode } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  BookOpenCheck,
  ShieldCheck,
  BadgeCheck,
  ClipboardCheck,
  FileText,
  Award,
  Radar,
  ArrowRight,
  Lock,
  Users,
  Search,
  HardHat,
  Code2,
  Database,
} from "lucide-react";
import { Section } from "@/components/ui/Section";
import { AnimatedSection } from "@/components/motion/AnimatedSection";
import { StaggerContainer } from "@/components/motion/StaggerContainer";
import { GradientOrb } from "@/components/motion/GradientOrb";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/* ════════════════════════════════════════════════════════════════
   Accent palettes — reused across the section (light + dark neon)
   ════════════════════════════════════════════════════════════════ */
const accents = {
  green: {
    spot: "rgba(49,191,44,0.14)",
    spotDark: "rgba(34,197,94,0.12)",
    lightBorder: "border-green-500/25",
    hoverBorder: "hover:border-green-500/60",
    hoverShadow: "hover:shadow-[0_8px_32px_rgba(34,197,94,0.15)]",
    neonCard: "neon-card-green",
    neonBorder: "neon-border-green",
    neonIcon: "neon-green",
    iconText: "text-green-600 dark:text-green-400",
    iconBg: "bg-green-500/10 dark:bg-green-500/10",
    chipBg: "bg-green-500/10 dark:bg-green-500/10",
    chipBorder: "border-green-500/20 dark:border-green-500/25",
    chipText: "text-green-700 dark:text-green-300",
    trackStop: "#31bf2c",
    darkTitleGlow: "rgba(74,222,128,0.4)",
    darkIconGlow: "rgba(34,197,94,0.35)",
    lineRGB: "34,197,94",
  },
  blue: {
    spot: "rgba(4,38,140,0.12)",
    spotDark: "rgba(59,130,246,0.12)",
    lightBorder: "border-blue-500/25",
    hoverBorder: "hover:border-blue-500/60",
    hoverShadow: "hover:shadow-[0_8px_32px_rgba(59,130,246,0.15)]",
    neonCard: "neon-card-blue",
    neonBorder: "neon-border-blue",
    neonIcon: "neon-blue",
    iconText: "text-blue-600 dark:text-blue-400",
    iconBg: "bg-blue-500/10 dark:bg-blue-500/10",
    chipBg: "bg-blue-500/10 dark:bg-blue-500/10",
    chipBorder: "border-blue-500/20 dark:border-blue-500/25",
    chipText: "text-blue-700 dark:text-blue-300",
    trackStop: "#3b82f6",
    darkTitleGlow: "rgba(96,165,250,0.4)",
    darkIconGlow: "rgba(59,130,246,0.35)",
    lineRGB: "59,130,246",
  },
  cyan: {
    spot: "rgba(34,211,238,0.14)",
    spotDark: "rgba(34,211,238,0.12)",
    lightBorder: "border-cyan-500/25",
    hoverBorder: "hover:border-cyan-500/60",
    hoverShadow: "hover:shadow-[0_8px_32px_rgba(34,211,238,0.15)]",
    neonCard: "",
    neonBorder: "",
    neonIcon: "neon-cyan",
    iconText: "text-cyan-600 dark:text-cyan-400",
    iconBg: "bg-cyan-500/10 dark:bg-cyan-500/10",
    chipBg: "bg-cyan-500/10 dark:bg-cyan-500/10",
    chipBorder: "border-cyan-500/20 dark:border-cyan-500/25",
    chipText: "text-cyan-700 dark:text-cyan-300",
    trackStop: "#22d3ee",
    darkTitleGlow: "rgba(34,211,238,0.4)",
    darkIconGlow: "rgba(34,211,238,0.35)",
    lineRGB: "34,211,238",
  },
} as const;

/* ════════════════════════════════════════════════════════════════
   Cursor spotlight — futuristic interactive hover foil
   ════════════════════════════════════════════════════════════════ */
function useSpotlight() {
  const handleMouseMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
    el.classList.add("synergy-spot-active");
  }, []);

  const handleMouseLeave = useCallback((e: MouseEvent<HTMLDivElement>) => {
    e.currentTarget.classList.remove("synergy-spot-active");
  }, []);

  return { handleMouseMove, handleMouseLeave };
}

/* ════════════════════════════════════════════════════════════════
   Live network visualization — SVG with SMIL data pulses
   ════════════════════════════════════════════════════════════════ */
function NetworkVisual({ animated }: { animated: boolean }) {
  const lines: Array<[number, number]> = [
    [34, 46],
    [52, 108],
    [108, 24],
    [166, 110],
    [188, 48],
    [136, 66],
  ];

  return (
    <div className="relative rounded-xl border border-border/70 dark:border-slate-700/50 bg-white/60 dark:bg-slate-950/50 overflow-hidden">
      {/* Terminal chrome bar */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-border/70 dark:border-slate-700/50">
        <div className="flex items-center gap-2">
          <span className="synergy-led w-2.5 h-2.5 rounded-full" style={{ background: "#31bf2c", color: "#31bf2c" }} />
          <span className="text-[10px] font-mono font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Dashboard Synergy // Online
          </span>
        </div>
        <span className="flex items-center gap-1.5 text-[10px] font-mono font-semibold uppercase tracking-[0.15em] text-green-600 dark:text-green-400">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-60" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
          </span>
          live
        </span>
      </div>

      {/* Scanning line */}
      {animated && <div className="synergy-scan absolute left-0 right-0 h-px pointer-events-none" aria-hidden="true" />}

      <svg viewBox="0 0 220 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto text-slate-400 dark:text-slate-500">
        {/* Connector lines */}
        {lines.map(([x, y], i) => (
          <line
            key={i}
            x1="110"
            y1="70"
            x2={x}
            y2={y}
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            opacity="0.5"
          />
        ))}
        {/* Node rings (SMIL pulse) */}
        {lines.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="6" fill="none" stroke="currentColor" strokeWidth="0.6" opacity="0.4">
            {animated && (
              <>
                <animate attributeName="r" values="4;8;4" dur={`${2 + i * 0.3}s`} begin={`${i * 0.4}s`} repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.4;0;0.4" dur={`${2 + i * 0.3}s`} begin={`${i * 0.4}s`} repeatCount="indefinite" />
              </>
            )}
          </circle>
        ))}
        {/* Node cores */}
        {lines.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="3" fill="currentColor" opacity="0.8" />
        ))}
        {/* Hub */}
        <circle cx="110" cy="70" r="4" fill="#31bf2c" opacity="0.9" />
        <circle cx="110" cy="70" r="8" fill="none" stroke="#31bf2c" strokeWidth="0.6">
          {animated && (
            <>
              <animate attributeName="r" values="5;11;5" dur="2.5s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.5;0;0.5" dur="2.5s" repeatCount="indefinite" />
            </>
          )}
        </circle>
        {/* Data pulses traveling the network (SMIL motion) */}
        {animated &&
          lines.slice(0, 3).map(([x, y], i) => (
            <circle key={i} r="2.2" fill="#31bf2c" opacity="0.9">
              <animateMotion
                path={`M110 70 L${x} ${y}`}
                dur={`${1.6 + i * 0.4}s`}
                begin={`${i * 0.6}s`}
                repeatCount="indefinite"
                keyPoints="0;1;1;0"
                keyTimes="0;0.4;0.6;1"
              />
            </circle>
          ))}
        {/* Floating data points */}
        <circle cx="24" cy="92" r="1.8" fill="currentColor" opacity="0.25" />
        <circle cx="196" cy="96" r="1.8" fill="currentColor" opacity="0.25" />
        <circle cx="188" cy="24" r="1.5" fill="currentColor" opacity="0.2" />
      </svg>

      {/* Bottom status strip */}
      <div className="flex items-center gap-2 px-4 py-2 border-t border-border/70 dark:border-slate-700/50 bg-slate-50/80 dark:bg-slate-900/50">
        <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-muted-foreground">Nodos activos</span>
        <div className="flex-1 h-1 rounded-full overflow-hidden bg-slate-200 dark:bg-slate-800">
          <div className="h-full w-full rounded-full bg-gradient-to-r from-green-500 to-emerald-400 dark:from-green-400 dark:to-emerald-500" />
        </div>
        <span className="text-[10px] font-mono font-bold text-green-600 dark:text-green-400">100%</span>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   E-book POFS — repository visual (stack of documented profiles)
   ════════════════════════════════════════════════════════════════ */
function RepoVisual() {
  const rows = [
    { icon: BadgeCheck, label: "Credenciales y certificaciones" },
    { icon: ClipboardCheck, label: "Historial de proyectos" },
    { icon: FileText, label: "Fichas técnicas y portafolio" },
    { icon: Award, label: "Evaluaciones y código de ética" },
  ];

  return (
    <div className="relative rounded-xl border border-border/70 dark:border-slate-700/50 bg-white/60 dark:bg-slate-950/50 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-border/70 dark:border-slate-700/50">
        <div className="flex items-center gap-2">
          <span className="synergy-led w-2.5 h-2.5 rounded-full" style={{ background: "#3b82f6", color: "#3b82f6" }} />
          <span className="text-[10px] font-mono font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Repositorio // E-book POFS
          </span>
        </div>
        <span className="text-[10px] font-mono font-semibold uppercase tracking-[0.15em] text-blue-600 dark:text-blue-400">
          verificado
        </span>
      </div>

      {/* Stacked document rows */}
      <div className="p-4 space-y-2">
        {rows.map((row, i) => {
          const RowIcon = row.icon;
          return (
            <div
              key={i}
              className="group/repo flex items-center gap-3 px-3 py-2.5 rounded-lg border border-border/60 dark:border-slate-700/50 bg-white/70 dark:bg-slate-900/40 transition-all duration-300 hover:translate-x-1.5 hover:border-blue-500/40 dark:hover:border-blue-400/50 hover:shadow-[0_0_16px_rgba(59,130,246,0.15)]"
            >
              <div className="flex-shrink-0 p-1.5 rounded-md bg-blue-500/10 text-blue-600 dark:text-blue-400">
                <RowIcon className="h-4 w-4" aria-hidden="true" />
              </div>
              <span className="text-xs font-medium text-slate-700 dark:text-slate-300">{row.label}</span>
              <span className="ml-auto text-xs font-mono text-muted-foreground opacity-0 group-hover/repo:opacity-100 transition-opacity duration-300">
                OK
              </span>
            </div>
          );
        })}
      </div>

      <div className="flex items-center gap-2 px-4 py-2 border-t border-border/70 dark:border-slate-700/50 bg-slate-50/80 dark:bg-slate-900/50">
        <Lock className="h-3 w-3 text-muted-foreground" aria-hidden="true" />
        <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-muted-foreground">
          Acceso transparente y auditable
        </span>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   Main interactive panels — Dashboard Synergy / E-book POFS
   ════════════════════════════════════════════════════════════════ */
interface FuturisticPanelProps {
  icon: React.ElementType;
  accent: (typeof accents)[keyof typeof accents];
  title: string;
  subtitle: string;
  description: string;
  children: ReactNode;
}

function FuturisticPanel({ icon: Icon, accent, title, subtitle, description, children }: FuturisticPanelProps) {
  const { handleMouseMove, handleMouseLeave } = useSpotlight();

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`synergy-panel relative h-full flex flex-col rounded-2xl overflow-hidden transition-all duration-500 group
        bg-white border ${accent.lightBorder} ${accent.hoverBorder} ${accent.hoverShadow}
        dark:bg-slate-900/70 dark:backdrop-blur-sm ${accent.neonCard} hover:-translate-y-1`}
    >
      {/* Rotating neon border (dark) */}
      {accent.neonBorder && (
        <div className={`absolute inset-0 rounded-2xl pointer-events-none hidden dark:block ${accent.neonBorder}`} aria-hidden="true" />
      )}

      {/* Scanline sweep (dark) */}
      <div className="card-scanline absolute left-0 right-0 h-[2px] pointer-events-none hidden dark:block" aria-hidden="true" />

      {/* Energy trace (dark) */}
      <div className="card-energy-trace absolute bottom-0 left-0 right-0 h-[2px] pointer-events-none hidden dark:block" aria-hidden="true" />

      {/* Cursor spotlight */}
      <div
        className="synergy-spot absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-0 dark:opacity-0"
        aria-hidden="true"
        style={{ background: `radial-gradient(320px circle at var(--spot-x, 50%) var(--spot-y, 50%), ${accent.spotDark}, transparent 70%)` }}
      />

      {/* Grid pattern on hover (dark) */}
      <div
        className="absolute inset-0 pointer-events-none hidden dark:block opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{
          backgroundImage: `linear-gradient(rgba(${accent.lineRGB},0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(${accent.lineRGB},0.12) 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
        aria-hidden="true"
      />

      {/* Corner dots (dark) */}
      <div className="absolute top-2 left-2 w-1.5 h-1.5 rounded-full hidden dark:block pointer-events-none" aria-hidden="true" style={{ backgroundColor: `rgb(${accent.lineRGB})`, animation: "corner-dot-pulse 2.5s ease-in-out infinite" }} />
      <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full hidden dark:block pointer-events-none" aria-hidden="true" style={{ backgroundColor: `rgb(${accent.lineRGB})`, animation: "corner-dot-pulse 2.5s ease-in-out infinite 0.6s" }} />
      <div className="absolute bottom-2 left-2 w-1.5 h-1.5 rounded-full hidden dark:block pointer-events-none" aria-hidden="true" style={{ backgroundColor: `rgb(${accent.lineRGB})`, animation: "corner-dot-pulse 2.5s ease-in-out infinite 1.2s" }} />
      <div className="absolute bottom-2 right-2 w-1.5 h-1.5 rounded-full hidden dark:block pointer-events-none" aria-hidden="true" style={{ backgroundColor: `rgb(${accent.lineRGB})`, animation: "corner-dot-pulse 2.5s ease-in-out infinite 1.8s" }} />

      {/* Light-mode corner accents */}
      <div className={`absolute top-0 left-0 w-12 h-[2px] ${accent.iconText} opacity-20 group-hover:opacity-50 transition-opacity duration-500 dark:hidden`} aria-hidden="true" />
      <div className={`absolute top-0 left-0 w-[2px] h-12 ${accent.iconText} opacity-20 group-hover:opacity-50 transition-opacity duration-500 dark:hidden`} aria-hidden="true" />
      <div className={`absolute bottom-0 right-0 w-12 h-[2px] ${accent.iconText} opacity-20 group-hover:opacity-50 transition-opacity duration-500 dark:hidden`} aria-hidden="true" />
      <div className={`absolute bottom-0 right-0 w-[2px] h-12 ${accent.iconText} opacity-20 group-hover:opacity-50 transition-opacity duration-500 dark:hidden`} aria-hidden="true" />

      {/* Inner bottom glow on hover */}
      <div
        className={`absolute inset-0 bg-gradient-to-br to-transparent via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
        style={{ background: `linear-gradient(160deg, rgba(${accent.lineRGB},0.05) 0%, transparent 45%)` }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full p-6 sm:p-8">
        {/* Header: icon + title + status */}
        <div className="flex items-start justify-between gap-4 mb-5">
          <div className="flex items-center gap-4">
            <div
              className={`relative flex-shrink-0 p-3.5 rounded-xl border ${accent.iconBg} ${accent.neonIcon}`}
              style={{ borderColor: `rgba(${accent.lineRGB},0.25)` }}
            >
              <Icon className={`h-6 w-6 ${accent.iconText}`} aria-hidden="true" />
              <div
                className={`absolute inset-0 rounded-xl hidden dark:block pointer-events-none`}
                aria-hidden="true"
                style={{ border: `1px solid rgba(${accent.lineRGB},0.3)`, animation: "icon-ring-pulse 3s ease-in-out infinite" }}
              />
            </div>
            <div>
              <h3
                className="synergy-title-glow font-extrabold text-xl sm:text-2xl tracking-tight text-slate-900 dark:text-white"
                style={{ "--title-glow": accent.darkTitleGlow } as React.CSSProperties}
              >
                {title}
              </h3>
              <p className={`text-xs font-semibold uppercase tracking-[0.18em] mt-0.5 ${accent.iconText}`}>
                {subtitle}
              </p>
            </div>
          </div>

          {/* Status chip */}
          <span
            className={`flex-shrink-0 hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest border ${accent.chipBg} ${accent.chipBorder} ${accent.chipText}`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
            {accent === accents.green ? "Verificado" : "Confiable"}
          </span>
        </div>

        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-6">{description}</p>

        {/* Panel-specific visual */}
        <div className="mt-auto">{children}</div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   Step CTA cards — numbered, interactive
   ════════════════════════════════════════════════════════════════ */
const steps = [
  {
    number: "01",
    title: "Explora el Dashboard",
    description:
      "Visualiza la disponibilidad y especialidad de nuestra red de expertos en tiempo real.",
    icon: Radar,
    accent: accents.green,
  },
  {
    number: "02",
    title: "Solicita el E-book POFS",
    description:
      "Conoce a fondo la experiencia, especialidad y garantías del profesionista u oficio que requieras.",
    icon: BookOpenCheck,
    accent: accents.blue,
  },
  {
    number: "03",
    title: "Contacta con seguridad",
    description:
      "Activa el servicio con la certeza y el respaldo institucional que solo ANSWER st puede ofrecerte.",
    icon: ShieldCheck,
    accent: accents.cyan,
  },
];

function StepCard({ step }: { step: (typeof steps)[number] }) {
  const { handleMouseMove, handleMouseLeave } = useSpotlight();
  const Icon = step.icon;
  const accent = step.accent;

  return (
    <Link href="#contacto" className="block h-full focus:outline-none">
      <div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`synergy-panel relative h-full rounded-2xl overflow-hidden group transition-all duration-500
          bg-white border ${accent.lightBorder} ${accent.hoverBorder} ${accent.hoverShadow}
          dark:bg-slate-900/70 dark:backdrop-blur-sm ${accent.neonCard} hover:-translate-y-1.5`}
      >
        {/* Cursor spotlight */}
        <div
          className="synergy-spot absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{ background: `radial-gradient(280px circle at var(--spot-x, 50%) var(--spot-y, 50%), ${accent.spotDark}, transparent 70%)` }}
        />

        {/* Top accent bar */}
        <div
          className="absolute top-0 left-0 right-0 h-[3px]"
          style={{ background: `linear-gradient(90deg, ${accent.trackStop}, transparent)` }}
          aria-hidden="true"
        />

        {/* Grid pattern on hover (dark) */}
        <div
          className="absolute inset-0 pointer-events-none hidden dark:block opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{
            backgroundImage: `linear-gradient(rgba(${accent.lineRGB},0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(${accent.lineRGB},0.1) 1px, transparent 1px)`,
            backgroundSize: "28px 28px",
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 flex flex-col h-full p-6 sm:p-8">
          {/* Number + icon row */}
          <div className="flex items-center justify-between mb-6">
            <span
              className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-muted-foreground"
            >
              Paso
            </span>
            <span
              className="text-3xl sm:text-4xl font-black text-slate-200 dark:text-slate-800 transition-colors duration-500 group-hover:text-slate-300 dark:group-hover:text-slate-700"
              aria-hidden="true"
            >
              {step.number}
            </span>
          </div>

          <div
            className={`flex-shrink-0 inline-flex p-3 rounded-xl border mb-5 transition-all duration-500 ${accent.iconBg} ${accent.neonIcon} group-hover:scale-110`}
            style={{ borderColor: `rgba(${accent.lineRGB},0.25)` }}
          >
            <Icon className={`h-6 w-6 ${accent.iconText}`} aria-hidden="true" />
          </div>

          <h3 className="font-bold text-lg sm:text-xl text-slate-900 dark:text-white mb-2">{step.title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed mb-6">{step.description}</p>

          <div className="mt-auto flex items-center gap-2 text-xs font-semibold uppercase tracking-wider">
            <span className={accent.iconText}>Activar servicio</span>
            <ArrowRight
              className={`h-4 w-4 ${accent.iconText} transition-transform duration-300 group-hover:translate-x-1.5`}
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </Link>
  );
}

/* ════════════════════════════════════════════════════════════════
   Main section
   ════════════════════════════════════════════════════════════════ */
export default function Synergy() {
  const reducedMotion = useReducedMotion();

  return (
    <Section
      id="synergy"
      variant="default"
      headingId="synergy-heading"
      className="relative overflow-hidden"
    >
      {/* Background decoration */}
      {!reducedMotion && (
        <>
          <GradientOrb
            size={520}
            color="var(--secondary)"
            blur={130}
            opacity={0.05}
            speed={0.6}
            className="-top-40 -left-32"
          />
          <GradientOrb
            size={420}
            color="var(--primary)"
            blur={110}
            opacity={0.05}
            speed={0.9}
            className="-bottom-32 -right-24"
          />
        </>
      )}

      {/* ─── HEADER ─── */}
      <div className="relative z-10 mb-10 sm:mb-14 lg:mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-7">
            <AnimatedSection animation="fade-right" duration={0.6}>
              <div className="flex items-center gap-3 mb-5">
                <div className="h-px w-10 bg-gradient-to-r from-secondary to-transparent" aria-hidden="true" />
                <span className="text-xs font-mono font-medium text-secondary uppercase tracking-[0.25em]">
                  Red de talento verificado
                </span>
              </div>
            </AnimatedSection>
            <AnimatedSection animation="fade-up" duration={0.6} delay={0.1}>
              <h2
                id="synergy-heading"
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-foreground tracking-tight leading-[1.08]"
              >
                Dashboard{" "}
                <span className="text-gradient">Synergy</span>
                <span className="block">&amp; E-book POFS</span>
              </h2>
            </AnimatedSection>
          </div>

          <div className="lg:col-span-5 lg:pt-4">
            <AnimatedSection animation="fade-left" duration={0.6} delay={0.2}>
              <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
                En Answer{" "}
                <span className="text-secondary font-bold text-green-500">st</span>{" "}
                integramos la estrategia corporativa con la capacidad operativa
                real: conectamos tu demanda con un ecosistema verificado de
                profesionistas, consultores especializados y oficios de alta
                calidad.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </div>

      {/* ─── PANELS: Dashboard Synergy + E-book POFS ─── */}
      <StaggerContainer
        className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 relative z-10"
        staggerDelay={0.15}
      >
        {/* Dashboard Synergy */}
        <FuturisticPanel
          icon={LayoutDashboard}
          accent={accents.green}
          title="Dashboard Synergy"
          subtitle="Centro de operaciones"
          description="A través de nuestro Dashboard Synergy conectamos la demanda de nuestros clientes con un ecosistema verificado de profesionistas, consultores especializados y personal de oficios de alta calidad. Diseñado para ubicar, filtrar y enlazar con precisión quirúrgica el talento que tu proyecto, empresa o espacio residencial necesita, bajo un estricto rigor ético y profesional."
        >
          <div className="mb-5 flex flex-wrap gap-2">
            {[
              { icon: Users, label: "Profesionistas verificados" },
              { icon: Search, label: "Consultores especializados" },
              { icon: HardHat, label: "Oficios de alta calidad" },
            ].map((chip, i) => {
              const ChipIcon = chip.icon;
              return (
                <span
                  key={i}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border ${accents.green.chipBg} ${accents.green.chipBorder} ${accents.green.chipText}`}
                >
                  <ChipIcon className="h-3.5 w-3.5" aria-hidden="true" />
                  {chip.label}
                </span>
              );
            })}
          </div>
          <NetworkVisual animated={!reducedMotion} />
        </FuturisticPanel>

        {/* E-book POFS */}
        <FuturisticPanel
          icon={BookOpenCheck}
          accent={accents.blue}
          title="E-book POFS"
          subtitle="Perfil Operativo de Formación y Servicios"
          description="Cada profesionista y especialista en oficios de nuestra red cuenta con un respaldo documental y una trayectoria verificada. El E-book POFS es el repositorio digital maestro donde puedes consultar con total transparencia su perfil completo antes de realizar cualquier enlace."
        >
          <RepoVisual />
        </FuturisticPanel>
      </StaggerContainer>

      {/* ─── SELLO DE CONFIANZA ─── */}
      <AnimatedSection animation="scale" duration={0.6} delay={0.1}>
        <div className="relative z-10 mt-10 lg:mt-12 rounded-3xl overflow-hidden">
          <div className="group relative rounded-3xl p-8 sm:p-10 transition-all duration-500
            bg-white border border-green-500/20 hover:border-green-500/40 hover:shadow-[0_0_40px_rgba(34,197,94,0.12)]
            dark:bg-slate-900 dark:border-green-500/20 dark:hover:border-green-500/50 dark:hover:shadow-[0_0_50px_rgba(34,197,94,0.12)]"
          >
            {/* Ambient glows */}
            <div className="absolute -right-10 -top-10 w-48 h-48 bg-green-500/5 rounded-full blur-3xl group-hover:bg-green-500/10 transition-all duration-700 dark:bg-green-500/10 dark:group-hover:bg-green-500/20" aria-hidden="true" />
            <div className="absolute -left-10 -bottom-10 w-48 h-48 bg-blue-500/5 rounded-full blur-3xl group-hover:bg-blue-500/10 transition-all duration-700 dark:bg-blue-500/10 dark:group-hover:bg-blue-500/20" aria-hidden="true" />

            {/* Left accent line */}
            <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-gradient-to-b from-green-500 via-emerald-400 to-green-500 transition-transform duration-500 group-hover:scale-y-105" aria-hidden="true" />

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex flex-col sm:flex-row items-center sm:items-start lg:items-center gap-5 text-center sm:text-left flex-1">
                <div className="flex-shrink-0 p-4 rounded-2xl bg-green-500/10 border border-green-500/25 dark:border-green-500/30 shadow-[0_0_24px_rgba(34,197,94,0.15)]">
                  <ShieldCheck className="h-9 w-9 text-green-600 dark:text-green-400 animate-pulse-slow" aria-hidden="true" />
                </div>
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-green-500/10 text-green-700 dark:text-green-400 border border-green-500/25 dark:border-green-500/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" aria-hidden="true" />
                    Respaldo institucional
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                    El Sello de <span className="text-gradient">Confianza</span>
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-2xl font-medium">
                    Antes de realizar cualquier enlace, verificamos credenciales,
                    historial y desempeño de cada profesionista y especialista en
                    oficios que forma parte de nuestra red.
                  </p>
                </div>
              </div>

              {/* Fast chips */}
              <div className="flex-shrink-0 grid grid-cols-2 gap-2">
                {[
                  { icon: BadgeCheck, label: "Código de ética" },
                  { icon: Database, label: "Trazabilidad total" },
                  { icon: Code2, label: "Estándares de calidad" },
                  { icon: Lock, label: "Confidencialidad" },
                ].map((chip, i) => {
                  const ChipIcon = chip.icon;
                  return (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold bg-slate-100 dark:bg-slate-800 border border-border text-slate-600 dark:text-slate-300 hover:border-green-500/40 transition-colors duration-300"
                    >
                      <ChipIcon className="h-3.5 w-3.5 text-green-600 dark:text-green-400" aria-hidden="true" />
                      {chip.label}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* ─── CTA STEPS ─── */}
      <div className="relative z-10 mt-10 lg:mt-12">
        <StaggerContainer
          className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6"
          staggerDelay={0.12}
        >
          {steps.map((step) => (
            <StepCard key={step.number} step={step} />
          ))}
        </StaggerContainer>
      </div>
    </Section>
  );
}