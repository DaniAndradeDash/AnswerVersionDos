"use client";

import Image from "next/image";
import { motion, easeInOut } from "framer-motion";
import { useMemo } from "react";

const images = [
    "/celula_alargada.png",
    "/celula_dos_alargada.png",
    "/celula_tres_alargada.png",
    "/celula_redondita.png",
];

const floatingVariants = {
    initial: {
        opacity: 0,
        scale: 0.5,
        rotate: 0,
        x: 0,
        y: 0,
    },
    animate: {
        opacity: [0, 1, 1, 0],
        scale: [0.5, 1, 1, 0.5],
        rotate: [0, 45, -30, 0],
        x: [0, 50, -50, 0],
        y: [0, -40, 40, 0],
        transition: {
            duration: 6,
            repeat: Infinity,
            ease: easeInOut,
        },
    },
};

function getRandomPosition() {
    return {
        top: `${Math.random() * 80 + 10}%`,
        left: `${Math.random() * 80 + 10}%`,
    };
}

export default function FloatingShapes() {
    const positions = useMemo(() => {
        return images.map(() => getRandomPosition());
    }, []);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            {images.map((src, index) => (
                <motion.div
                    key={index}
                    variants={floatingVariants}
                    initial="initial"
                    animate="animate"
                    className="absolute"
                    style={positions[index]}
                >
                    <Image
                        src={src}
                        alt={`Figura ${index + 1}`}
                        width={60}
                        height={60}
                        className="object-contain"
                    />
                </motion.div>
            ))}
        </div>
    );
}
