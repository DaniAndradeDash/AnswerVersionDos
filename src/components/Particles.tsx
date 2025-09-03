"use client";

import Image from "next/image";
import { AnimatePresence, motion, easeInOut } from "framer-motion";
import { useEffect, useState } from "react";

const images = [
    "/celula_alargada.png",
    "/celula_dos_alargada.png",
    "/celula_tres_alargada.png",
    "/celula_redondita.png",
];

function getRandomPosition() {
    return {
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
    };
}

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
            // transition: { duration: 1.5 }, // ❌ Elimina esta línea
        },
        transition: {
            duration: 6,
            ease: easeInOut,
            // Puedes agregar aquí la duración de exit si lo necesitas:
            // cuando exit ocurra, usará este transition
        },
        exitTransition: { duration: 1.5 }, // 👈 Agrega esto si quieres transición diferente para exit
    };
}

type Particle = {
    id: string;
    src: string;
    position: { top: string; left: string };
    motionProps: ReturnType<typeof getRandomMotionProps>;
};


export default function Particles() {
    const [particles, setParticles] = useState<Particle[]>([]);

    useEffect(() => {
        const cycle = () => {
            const count = Math.floor(Math.random() * 4) + 8; // 👈 entre 12 y 20
            const newParticles: Particle[] = Array.from({ length: count }).map(() => {
                const src = images[Math.floor(Math.random() * images.length)];
                return {
                    id: Math.random().toString(36).substring(2), // 👈 id único
                    src,
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

                {particles.map(({ id, src, position, motionProps }) => (
                    <div key={id}>
                        <motion.div
                            initial={motionProps.initial}
                            animate={motionProps.animate}
                            exit={motionProps.exit}
                            transition={motionProps.transition}
                            className="absolute"
                            style={position}
                        >
                            <Image
                                src={src}
                                alt="Partícula"
                                width={80}
                                height={80}
                                className="object-contain"
                            />
                        </motion.div>
                    </div>
                ))}
            </AnimatePresence>
        </div>
    );
}
