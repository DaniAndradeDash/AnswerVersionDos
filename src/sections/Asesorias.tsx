"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const asesorias = [
    { id: 1, title: "Financiera", image: "/financiera_img.png", border: "#d4d5d6ff" },
    { id: 2, title: "Legal", image: "/Legal_img_gray.png", border: "#d4d5d6ff" },
    { id: 3, title: "Empresarial", image: "/Empresarial_img_red.png", border: "#d4d5d6ff" }, //border: "#e7d52fff"
    { id: 4, title: "Salud", image: "/salud_img_celeste.png", border: "#d4d5d6ff" },
    { id: 5, title: "Mediación de conflictos", image: "/mediacion_conflictos.png", border: "#d4d5d6ff" },
    { id: 6, title: "Medio ambiente", image: "/medio_ambiente_img.png", border: "#67f714ff" },
];

export default function Asesorias() {
    const [activeCard, setActiveCard] = useState<number | null>(null);

    const handleMobileClick = (id: number) => {
        // Si ya está activa, se apaga. Si no, la activa.
        setActiveCard(activeCard === id ? null : id);
    };
    return (
        <section
            id="asesorias"
            className="w-full min-h-screen bg-white sm:mt-20 md:mt-20 flex items-center"
        >
            <div className="max-w-6xl mx-auto text-center px-6 w-full relative">
                {/* Título */}
                <h2 className="px-6 py-3 bg-blue-950 text-white font-semibold rounded-full shadow-md hover:bg-[#034aa6] transition w-full sm:w-auto text-center inline-block text-[clamp(1.5rem,4vw,2.5rem)]">
                    Portafolio de Asesorías
                </h2>

                {/* Vector animador */}
                <motion.div
                    initial={{ x: "-100%" }}
                    animate={{ x: "100%" }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-5 left-0 h-1 w-32 bg-[#31bf2c] rounded-full"
                />

                {/* Grid de asesorías */}
                <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
                    {asesorias.map((item, index) => {
                        const isActive = activeCard === item.id;
                        return (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={
                                    isActive
                                        ? {
                                            opacity: 1,
                                            scale: [1, 1.05, 1], // efecto rebote
                                            boxShadow: `0px 6px 16px ${item.border}`, // efecto neón
                                        }
                                        : {
                                            opacity: 1,
                                            scale: 1,
                                            boxShadow: "none"
                                        }
                                }
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                                whileHover={{
                                    y: -6,
                                    scale: 1.04,
                                    boxShadow: `0px 6px 16px ${item.border}`,
                                    transition: { duration: 0.2, ease: "easeOut" },
                                }}
                                // En móvil usamos onClick para simular hover
                                onClick={() => handleMobileClick(item.id)}
                                className="flex flex-col items-center text-center p-6 rounded-xl cursor-pointer"
                                style={{
                                    border: `4px solid ${item.border}`,
                                    backgroundColor: `${item.border}30`,
                                }}
                            >
                                <div className="overflow-hidden rounded-full mb-4">
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        width={80}
                                        height={80}
                                        className="object-contain"
                                    />
                                </div>
                                <motion.h3
                                    whileHover={{ color: item.border }}
                                    transition={{ duration: 0.2 }}
                                    animate={isActive ? { color: item.border } : { color: "#04268c" }}
                                    className="text-lg font-semibold"
                                >
                                    {item.title}
                                </motion.h3>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Texto final */}
                <div className="mt-12">
                    <motion.p
                        animate={{
                            scale: [1, 1.1, 1],
                            rotate: [0, -2, 2, 0],
                            color: ["#99abb9", "#31bf2c", "#99abb9"], // alterna entre gris y verde
                            textShadow: [
                                "0px 0px 0px rgba(49,191,44,0)",
                                "0px 0px 8px rgba(49,191,44,0.8)",
                                "0px 0px 0px rgba(49,191,44,0)"
                            ],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="uppercase cursor-pointer tracking-wide font-semibold text-lg"
                    >
                        🚀 Muchas opciones más
                    </motion.p>
                    {/*<p className="text-sm text-gray-400 mt-2 italic">
                        Próximamente nuevas asesorías disponibles
                    </p>*/}
                </div>
            </div>
        </section>
    );
}