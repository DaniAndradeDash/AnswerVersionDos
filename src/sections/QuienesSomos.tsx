"use client";

import { Section } from "@/components/ui/Section";
import { AnimatedSection } from "@/components/motion/AnimatedSection";
import { Float } from "@/components/motion/Float";
import { GradientOrb } from "@/components/motion/GradientOrb";
import Image from "next/image";
import {
  Zap,
  Compass,
  TrendingUp,
  Handshake,
  Shield,
  type LucideIcon,
} from "lucide-react";

export default function QuienesSomos() {
  return (
    <Section
      id="quienes-somos"
      className="relative overflow-hidden bg-background grid-pattern !py-0"
    >
      {/* Capas Atmosféricas de Fondo (Sincronizadas con Hero) */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gradient orbs - Consistencia con Hero */}
        <GradientOrb
          size={600}
          color="var(--primary)"
          blur={120}
          opacity={0.06}
          speed={0.4}
          className="-top-48 -left-32"
        />
        <GradientOrb
          size={500}
          color="var(--secondary)"
          blur={100}
          opacity={0.05}
          speed={0.7}
          className="top-1/3 -right-24"
        />
        <GradientOrb
          size={350}
          color="var(--primary-light)"
          blur={80}
          opacity={0.04}
          speed={1}
          className="bottom-0 left-1/3"
        />

        {/* Overlay de Gradiente Diagonal para Profundidad */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, transparent 40%, rgba(49,191,44,0.03) 60%, transparent 80%)",
          }}
          aria-hidden="true"
        />

        {/* Micro-Patrón de circuitos PCB (Sutil) 
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg stroke='%23000' stroke-width='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-8V22h-2v4h-4v2h4v4h2v-4h4v-2h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 26V18H4v4H0v2h4v4h2v-4h4v-2H6z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />*/}
      </div>

      <div className="mx-auto max-w-7xl relative z-10 px-4 sm:px-6">
        <AnimatedSection animation="fade-up">
          {/* Panel Principal con Efecto High-Fidelity */}
          <div className="relative rounded-[30px] md:rounded-[40px] transition-all duration-700 group">
            <div className="bg-transparent p-5 sm:p-8 md:p-12 lg:p-16 rounded-[29px] md:rounded-[39px] flex flex-col lg:flex-row gap-8 sm:gap-10 lg:gap-16 items-center relative overflow-hidden">
              {/* Efecto de Brillo (Shine) Dinámico */}
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-white/20 dark:via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />

              {/* Columna Izquierda: Bloque Informativo Tecnológico */}
              <div className="flex-1 relative z-10 space-y-5 sm:space-y-8 md:space-y-10 text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-4 mb-4">
                  <div className="hidden sm:block w-12 h-[2px] bg-gradient-to-r from-secondary to-transparent"></div>
                  <span className="text-secondary font-black tracking-[0.2em] text-white text-xs uppercase text-center sm:text-left">
                    Quiénes somos
                  </span>
                </div>

                {/* Núcleo de Seguridad / Focal Point 
                <div className="relative w-20 h-20 md:w-24 md:h-24 mx-auto lg:mx-0 flex items-center justify-center group/shield">
                  {/* Círculos Concéntricos Animados 
                  <div className="absolute inset-0 border-2 border-secondary/20 rounded-full animate-ping-slow" />
                  <div className="absolute inset-2 border border-secondary/40 rounded-full animate-pulse" />
                  <div className="absolute inset-4 border border-secondary/60 rounded-full" />

                  {/* Glow Radial Detrás del Escudo 
                  <div className="absolute inset-0 bg-secondary/20 blur-xl rounded-full group-hover/shield:bg-secondary/40 transition-colors duration-500" />

                  {/* El Escudo
                  <div className="relative z-10 p-3 md:p-4 bg-white dark:bg-slate-900 rounded-2xl border-2 border-secondary shadow-lg transition-transform duration-500 group-hover/shield:scale-110">
                    <Shield className="w-6 h-6 md:w-8 md:h-8 text-secondary" />
                  </div>

                  {/* Líneas Vectoriales Periféricas
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-px h-4 bg-secondary/40" />
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-px h-4 bg-secondary/40" />
                  <div className="absolute top-1/2 -left-2 -translate-y-1/2 w-4 h-px bg-secondary/40" />
                  <div className="absolute top-1/2 -right-2 -translate-y-1/2 w-4 h-px bg-secondary/40" />
                </div>*/}

                <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black text-foreground dark:text-white tracking-tighter leading-[0.9] mb-4 sm:mb-6 md:mb-8">
                  {/* El alma de{" "}*/}
                  <span className="block sm:inline">
                    ANSWER<span className="text-green-500">.st</span>
                  </span>
                </h2>

                {/* Contenedor de Texto con Profundidad */}
                <div className="relative group/text">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-secondary/20 rounded-3xl blur opacity-0 group-hover/text:opacity-100 transition-opacity duration-500" />
                  <div className="relative p-4 sm:p-6 md:p-8 rounded-3xl bg-white/50 dark:bg-slate-900/50 backdrop-blur-md border border-white/20 dark:border-white/5 space-y-3 sm:space-y-4 md:space-y-6 text-muted-foreground dark:text-slate-300 leading-relaxed text-sm sm:text-base md:text-lg">
                    <p>
                      En{" "}
                      <span className="text-foreground dark:text-white font-semibold">
                        ANSWER <span className="text-green-500">.st</span>
                      </span>{" "}
                      Somos una plataforma de consultoría que transforma
                      desafíos en resultados.
                    </p>
                    <p>
                      Asesoramos a usuarios con orientación exacta ante
                      cualquier dificultad, mientras impulsamos un ecosistema de
                      crecimiento profesional donde profesionistas y
                      especialistas de diversos oficios encuentran una fuente de
                      trabajo constante, formal, digna y en equipo.
                    </p>
                    <p className="text-foreground dark:text-white font-bold italic border-l-4 border-secondary pl-4 py-1 text-sm md:text-base">
                      Certificamos soluciones estratégicas que integran la
                      innovación técnica con el compromiso experto, competente y
                      disciplinado en cada paso.
                    </p>
                  </div>
                  {/* Línea de Cierre Tecnológica 
                  <div className="mt-6 flex items-center justify-center lg:justify-start gap-2">
                    <div className="flex-1 h-[1px] bg-gradient-to-r from-secondary to-transparent opacity-50"></div>
                    <div className="w-2 h-2 rounded-full bg-secondary animate-pulse shadow-[0_0_8px_var(--secondary)]"></div>
                    {/* <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-tighter">System Active // Core.Stability: 100%</span> 
                  </div>*/}
                </div>
              </div>

              {/* Columna Derecha: El Hub Neural de Interconexión */}
              <div className="flex-1 w-full flex justify-center items-center relative mt-2 sm:mt-0">
                <div className="relative w-full max-w-[280px] sm:max-w-md lg:max-w-lg aspect-square flex items-center justify-center">
                  {/* Glow Central Atmosférico */}
                  <div className="absolute inset-0 bg-secondary/10 dark:bg-secondary/20 blur-[100px] rounded-full animate-pulse-slow" />

                  {/* Red de Datos SVG (Líneas de Circuito PCB) */}
                  <svg
                    className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-20 sm:opacity-40 dark:opacity-50"
                    viewBox="0 0 400 400"
                  >
                    <defs>
                      <linearGradient
                        id="gradCore"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                      >
                        <stop offset="0%" stopColor="var(--primary)" />
                        <stop offset="100%" stopColor="var(--secondary)" />
                      </linearGradient>
                    </defs>

                    {/* Circuit Paths from center (200,200) to corners */}
                    <path
                      d="M200 200 L200 140 L140 140 L140 80 L80 80"
                      stroke="url(#gradCore)"
                      strokeWidth="1.5"
                      fill="none"
                      strokeDasharray="8,4"
                      className="animate-dash"
                    />
                    <path
                      d="M200 200 L200 140 L260 140 L260 80 L320 80"
                      stroke="url(#gradCore)"
                      strokeWidth="1.5"
                      fill="none"
                      strokeDasharray="8,4"
                      className="animate-dash"
                    />
                    <path
                      d="M200 200 L200 260 L140 260 L140 320 L80 320"
                      stroke="url(#gradCore)"
                      strokeWidth="1.5"
                      fill="none"
                      strokeDasharray="8,4"
                      className="animate-dash"
                    />
                    <path
                      d="M200 200 L200 260 L260 260 L260 320 L320 320"
                      stroke="url(#gradCore)"
                      strokeWidth="1.5"
                      fill="none"
                      strokeDasharray="8,4"
                      className="animate-dash"
                    />

                    {/* Connection Nodes (Pings) */}
                    <circle
                      cx="80"
                      cy="80"
                      r="3"
                      fill="var(--primary)"
                      className="animate-ping"
                    />
                    <circle
                      cx="320"
                      cy="80"
                      r="3"
                      fill="var(--secondary)"
                      className="animate-ping delay-300"
                    />
                    <circle
                      cx="80"
                      cy="320"
                      r="3"
                      fill="var(--primary)"
                      className="animate-ping delay-600"
                    />
                    <circle
                      cx="320"
                      cy="320"
                      r="3"
                      fill="var(--secondary)"
                      className="animate-ping delay-900"
                    />
                  </svg>

                  {/* Núcleo de Energía Central */}
                  <div className="relative z-10 flex items-center justify-center ">
                    {/* Spherical Container */}
                    <div className="relative w-36 h-36 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-full bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl border border-white/50 dark:border-white/10 shadow-[0_0_50px_rgba(49,191,44,0.2)] flex items-center justify-center animate-float">
                      {/* Pulsing Glow Ring */}
                      <div className="absolute inset-0 rounded-full border-2 border-secondary/30 animate-pulse-slow" />
                      <div className="absolute inset-4 rounded-full border border-secondary/20 animate-pulse" />

                      <Float distance={10} duration={4} axis="both">
                        <div className="relative w-24 h-24 sm:w-56 sm:h-56 md:w-48 md:h-48 lg:w-56 lg:h-56">
                          <Image
                            src="/heartSomos.png"
                            alt="Alma de Answer"
                            fill
                            className="object-contain relative z-10 drop-shadow-[0_0_30px_rgba(49,191,44,0.4)] dark:drop-shadow-[0_0_50px_rgba(49,191,44,0.7)]"
                          />
                        </div>
                      </Float>
                    </div>
                  </div>

                  {/* Módulos Interactivos (Widgets) */}
                  <Widget
                    position="top-left"
                    icon={Zap}
                    label="INNOVACIÓN"
                    color="blue"
                  />
                  <Widget
                    position="top-right"
                    icon={Compass}
                    label="ORIENTACIÓN"
                    color="green"
                  />
                  <Widget
                    position="bottom-left"
                    icon={TrendingUp}
                    label="CRECIMIENTO"
                    color="blue"
                  />
                  <Widget
                    position="bottom-right"
                    icon={Handshake}
                    label="CONFIANZA"
                    color="green"
                  />
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>

      <style jsx>{`
        @keyframes dash {
          to {
            stroke-dashoffset: -100;
          }
        }
        .animate-dash {
          animation: dash 20s linear infinite;
        }
        @keyframes ping-slow {
          0% {
            transform: scale(1);
            opacity: 0.8;
          }
          100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }
        .animate-ping-slow {
          animation: ping-slow 3s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 0.4;
            transform: scale(1);
          }
          50% {
            opacity: 0.7;
            transform: scale(1.05);
          }
        }
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
      `}</style>
    </Section>
  );
}

function Widget({
  position,
  icon: Icon,
  label,
  color,
}: {
  position: string;
  icon: LucideIcon;
  label: string;
  color: "blue" | "green";
}) {
  const posClasses: Record<string, string> = {
    "top-left":
      "top-0 left-0 sm:-top-4 sm:left-1/2 sm:-translate-x-[135%] lg:top-4 lg:left-4 lg:translate-x-0",

    "top-right":
      "top-0 right-0 sm:-top-4 sm:left-1/2 sm:translate-x-[35%] lg:top-4 lg:left-auto lg:right-4 lg:translate-x-0",

    "bottom-left":
      "bottom-0 left-0 sm:-bottom-4 sm:left-1/2 sm:-translate-x-[135%] lg:bottom-4 lg:left-4 lg:translate-x-0",

    "bottom-right":
      "bottom-0 right-0 sm:-bottom-4 sm:left-1/2 sm:translate-x-[35%] lg:bottom-4 lg:left-auto lg:right-4 lg:translate-x-0",
  };

  const accentColor = color === "blue" ? "var(--primary)" : "var(--secondary)";
  const textColor = color === "blue" ? "text-blue-500" : "text-emerald-500";
  const iconBg = color === "blue" ? "bg-blue-500/10" : "bg-emerald-500/15";
  const iconGlow = color === "blue" ? "bg-blue-500/30" : "bg-emerald-500/35";

  return (
    <div
      className={`
        absolute
        ${posClasses[position]}
        z-20
        scale-60
        sm:scale-90
        lg:scale-100
        transition-all
        duration-500
      `}
    >
      <div className="relative group cursor-default transition-transform duration-500 hover:scale-[1.02]">
        {/* Conic Gradient Border Effect */}
        <div
          className="absolute -inset-[2px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-spin-slow"
          style={{
            background: `conic-gradient(transparent, ${accentColor}, transparent 30%)`,
            zIndex: 0,
          }}
        ></div>

        <div
          className={`
            relative
            flex
            items-center
            gap-2
            sm:gap-3
            px-2.5
            py-2
            sm:px-5
            sm:py-3
            rounded-xl
            sm:rounded-2xl
            bg-white/80
            dark:bg-slate-900/80
            border
            border-white/40
            dark:border-white/10
            backdrop-blur-xl
            transition-all
            duration-300
            group-hover:border-secondary/50
          `}
        >
          {/* Icon with Radial Blur Background */}
          <div
            className={`relative p-2 sm:p-2.5 rounded-xl transition-all duration-300 group-hover:scale-110 ${iconBg}`}
          >
            <div
              className={`absolute inset-0 rounded-xl blur-md ${iconGlow}`}
            />
            <Icon
              className={`relative z-10 w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 ${textColor} transition-colors group-hover:text-white`}
            />
          </div>

          <span
            className="
            hidden
            sm:block
            text-xs
            font-black
            tracking-widest
            uppercase
            "
          >
            {label}
          </span>
        </div>
      </div>
    </div>
  );
}
