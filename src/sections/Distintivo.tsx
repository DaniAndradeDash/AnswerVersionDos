"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Compromiso() {
    return (
        <section id="compromiso" className="w-full h-auto py-20 bg-white flex items-center overflow-hidden">
            <div className="max-w-5xl mx-auto text-center px-6 w-full relative">

                {/* Título */}
                <motion.h2
                    initial={{ opacity: 0, y: -30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="px-6 py-3 text-[#31bf2c] font-bold rounded-full inline-block text-[clamp(1.5rem,4vw,2.5rem)] relative"
                >
                    <span className="relative z-10">Estrategias Sustentables</span>
                    <motion.div
                        className="absolute inset-0 bg-[#31bf2c]/10 rounded-full"
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 3, repeat: Infinity }}
                    />
                </motion.h2>

                {/* Caja principal animada */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 100, damping: 10 }}
                    className="mt-10 mx-auto bg-[#31bf2c] text-white 
                        rounded-tl-3xl rounded-br-3xl rounded-tr-none rounded-bl-none 
                        px-8 md:px-16 py-10 md:py-14 
                        text-center font-semibold text-lg md:text-xl max-w-4xl shadow-2xl relative overflow-hidden"
                >
                    <motion.div
                        className="absolute inset-0 bg-white/10"
                        animate={{ x: ["-100%", "100%"] }}
                        transition={{ duration: 3, repeat: Infinity, repeatDelay: 5 }}
                    />
                    <span className="relative z-10">Confidencialidad y Transparencia <br /> en el manejo de todos los datos</span>
                </motion.div>

                {/* Imagen decorativa derecha (flotante) */}
                <motion.div
                    animate={{ y: [0, -15, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-10 right-4 hidden md:block z-20"
                >
                    <Image
                        src="/confiabilidad_transparencia.png"
                        alt="Confiabilidad y Transparencia"
                        width={100}
                        height={100}
                        className="object-contain"
                    />
                </motion.div>

                {/* Imagen decorativa izquierda (flotante aleatorio) */}
                <motion.div
                    animate={{ 
                        y: [0, 20, 0],
                        x: [0, 10, 0],
                        rotate: [0, 5, -5, 0]
                    }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-1/2 left-4 z-10 pointer-events-none hidden md:block"
                >
                    <Image
                        src="/mira_futurista.png"
                        alt="Mira Futurista"
                        width={80}
                        height={80}
                        className="object-contain opacity-70"
                    />
                </motion.div>

            </div>
        </section>
    );
}