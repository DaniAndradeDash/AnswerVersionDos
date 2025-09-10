"use client";

import { AnimatePresence, motion, easeInOut } from "framer-motion";
import { useEffect, useState } from "react";

const shapes = ["circle", "square", "triangle"];

// función para generar color aleatorio
function getRandomColor() {
    const colors = ["#31bf2c", "#04268c", "#ffd700", "#ff6b6b", "#6bc5ff"];
    return colors[Math.floor(Math.random() * colors.length)];
}

// posición aleatoria
function getRandomPosition() {
    return {
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
    };
}

// propiedades de animación
function getRandomMotionProps() {
    return {
        initial: {
            opacity: 0,
            scale: 0.5,
            rotate: 0,
            x: 0,
            y: 0,
        },
        animate: {
            opacity: 1,
            scale: 1,
            rotate: Math.random() * 360,
            x: Math.random() * 200 - 100,
            y: Math.random() * 200 - 100,
        },
        exit: {
            opacity: 0,
            scale: 0.5,
        },
        transition: {
            duration: 6,
            ease: easeInOut,
        },
        exitTransition: { duration: 1.5 },
    };
}

type Particle = {
    id: string;
    shape: string;
    color: string;
    position: { top: string; left: string };
    motionProps: ReturnType<typeof getRandomMotionProps>;
};

export default function Particles() {
    const [particles, setParticles] = useState<Particle[]>([]);

    useEffect(() => {
        const cycle = () => {
            const count = Math.floor(Math.random() * 4) + 12; // entre 12 y 16
            const newParticles: Particle[] = Array.from({ length: count }).map(() => {
                const shape = shapes[Math.floor(Math.random() * shapes.length)];
                return {
                    id: Math.random().toString(36).substring(2),
                    shape,
                    color: getRandomColor(),
                    position: getRandomPosition(),
                    motionProps: getRandomMotionProps(),
                };
            });
            setParticles(newParticles);
        };

        cycle(); // primera vez
        const interval = setInterval(cycle, 4000); // cada 4s

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            <AnimatePresence>
                {particles.map(({ id, shape, color, position, motionProps }) => (
                    <motion.div
                        key={id}
                        initial={motionProps.initial}
                        animate={motionProps.animate}
                        exit={motionProps.exit}
                        transition={motionProps.transition}
                        className="absolute"
                        style={position}
                    >
                        {shape === "circle" && (
                            <div
                                className="w-6 h-6 md:w-8 md:h-8"
                                style={{
                                    backgroundColor: color,
                                    borderRadius: "50%",
                                }}
                            />
                        )}
                        {shape === "square" && (
                            <div
                                className="w-6 h-6 md:w-8 md:h-8"
                                style={{
                                    backgroundColor: color,
                                }}
                            />
                        )}
                        {shape === "triangle" && (
                            <div
                                className="w-0 h-0 md:w-0 md:h-0"
                                style={{
                                    borderLeft: "12px solid transparent",
                                    borderRight: "12px solid transparent",
                                    borderBottom: `20px solid ${color}`,
                                }}
                            />
                        )}
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
}
