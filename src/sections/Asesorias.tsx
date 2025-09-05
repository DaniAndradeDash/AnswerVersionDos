"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const asesorias = [
    { id: 1, title: "Financiera", image: "/financiera_img.png", border: "#c1f0d6" },
    { id: 2, title: "Legal", image: "/legal_img.png", border: "#d0e6ff" },
    { id: 3, title: "Empresarial", image: "/empresarial_img.png", border: "#ffe9c7" },
    { id: 4, title: "Salud", image: "/salud_img.png", border: "#ffd6e0" },
    { id: 5, title: "Mediación de conflictos", image: "/mediacion_conflictos.png", border: "#e2d6ff" },
    { id: 6, title: "Medio ambiente", image: "/medio_ambiente_img.png", border: "#d4f4c2" },
];

export default function Asesorias() {
    return (
        <section id="asesorias" className="w-full min-h-screen bg-white flex items-center">
            <div className="max-w-6xl mx-auto text-center px-6 w-full relative">

                {/* Título */}
                <h2 className="text-2xl md:text-3xl font-extrabold text-[#04268c]">
                    Nuestras Asesorías
                </h2>

                {/* Vector animador */}
                <motion.div
                    initial={{ x: "-100%" }}
                    animate={{ x: "100%" }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    className="absolute top-0 left-0 h-1 w-32 bg-[#31bf2c] rounded-full"
                />

                {/* Grid de asesorías */}
                <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
                    {asesorias.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            whileHover={{
                                y: -8,
                                scale: 1.03,
                                boxShadow: `0px 8px 20px ${item.border}`,
                            }}
                            className="flex flex-col items-center text-center p-6 rounded-xl transition-all duration-300 ease-in-out"
                            style={{
                                border: `4px solid ${item.border}`,
                                backgroundColor: `${item.border}33`,
                            }}
                        >
                            <div className="overflow-hidden rounded-full mb-4">
                                <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    transition={{ duration: 0.4 }}
                                >
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        width={80}
                                        height={80}
                                        className="object-contain"
                                    />
                                </motion.div>
                            </div>
                            <motion.h3
                                whileHover={{ color: item.border }}
                                transition={{ duration: 0.3 }}
                                className="text-lg font-semibold text-[#04268c]"
                            >
                                {item.title}
                            </motion.h3>
                        </motion.div>

                    ))}
                </div>

                {/* Texto final */}
                <div className="mt-12">
                    <p className="uppercase text-[#99abb9] hover:text-[#31bf2c] cursor-pointer tracking-wide">
                        Muchas opciones más
                    </p>
                </div>
            </div>
        </section>
    );
}