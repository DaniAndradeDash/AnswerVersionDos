"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Compromiso() {
    const [position, setPosition] = useState({ top: "50%", left: "10%" });

    useEffect(() => {
        const top = `${Math.random() * 80 + 10}%`;
        const left = `${Math.random() * 30 + 5}%`;
        setPosition({ top, left });
    }, []);


    return (
        <section id="compromiso" className="w-full h-auto my-42 bg-white flex items-center">
            <div className="max-w-5xl mx-auto text-center px-6 w-full relative">

                {/* Título */}
                <h2 className="px-6 py-3 bg-gray-400 text-white font-semibold rounded-full shadow-md hover:bg-[#034aa6] transition w-full sm:w-auto text-center inline-block text-[clamp(1.5rem,4vw,2.5rem)]">
                    Estrategias Sustentables
                </h2>

                {/* Caja principal animada */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                    className="mt-10 mx-auto bg-[#31bf2c] text-white 
            rounded-tl-3xl rounded-br-3xl rounded-tr-none rounded-bl-none 
            px-8 md:px-16 py-10 md:py-14 
            text-center font-semibold text-lg md:text-xl max-w-4xl shadow-lg"
                >
                    Confidencialidad y Transparencia <br />
                    en el manejo de todos los datos
                </motion.div>

                {/* Imagen decorativa derecha (parpadeo) */}
                <div className="absolute -top-2 right-4 animate-pulse hidden md:block z-20">
                    <Image
                        src="/confiabilidad_transparencia.png"
                        alt="Confiabilidad y Transparencia"
                        width={100}
                        height={100}
                        className="object-contain"
                    />
                </div>

                {/* Imagen decorativa izquierda (animación infinita aleatoria) */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.5, x: -100, y: -100 }}
                    animate={{
                        opacity: [0, 1, 1, 0],
                        y: [0, 100, 100, 0],
                        x: [0, 0, 100, 100],
                        scale: [1, 1.2, 0.8, 1],
                    }}
                    transition={{
                        duration: 6,
                        repeat: Infinity,
                        repeatType: "loop",
                        ease: "easeInOut",
                        delay: Math.random() * 3,
                    }}
                    className="absolute z-10 pointer-events-none"
                    style={{
                        top: position.top,
                        left: position.left,
                    }}

                >
                    <Image
                        src="/mira_futurista.png"
                        alt="Mira Futurista"
                        width={110}
                        height={110}
                        className="object-contain"
                    />
                </motion.div>

            </div>
        </section>
    );
}