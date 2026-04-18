"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const asesorias = [
    { id: 1, title: "Financiera", image: "/financiera_img.png", border: "#d4d5d6ff" },
    { id: 2, title: "Legal", image: "/Legal_img_gray.png", border: "#d4d5d6ff" },
    { id: 3, title: "Empresarial", image: "/Empresarial_img_red.png", border: "#d4d5d6ff" }, //border: "#e7d52fff"
    { id: 4, title: "Salud", image: "/salud_img_celeste.png", border: "#d4d5d6ff" },
    { id: 5, title: "Mediación de conflictos", image: "/mediacion_conflictos.png", border: "#d4d5d6ff" },
    { id: 6, title: "Medio ambiente", image: "/Medio_ambiente_img.png", border: "#67f714ff" },
];

export default function Asesorias() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 },
        },
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    return (
        <section
            id="asesorias"
            className="w-full min-h-screen bg-white py-20 md:py-32 flex items-center"
        >
            <div className="max-w-6xl mx-auto text-center px-6 w-full relative">
                {/* Título */}
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="px-6 py-3 bg-blue-950 text-white font-semibold rounded-full shadow-md hover:bg-[#034aa6] transition w-full sm:w-auto text-center inline-block text-[clamp(1.5rem,4vw,2.5rem)]"
                >
                    Portafolio de Asesorías
                </motion.h2>

                {/* Grid de asesorías */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
                >
                    {asesorias.map((item) => (
                        <motion.div
                            key={item.id}
                            variants={cardVariants}
                            whileHover={{ y: -10, scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="flex flex-col items-center text-center p-8 rounded-2xl cursor-pointer transition-all duration-300 border-2"
                            style={{
                                borderColor: item.border,
                                backgroundColor: `${item.border}10`,
                            }}
                        >
                            <div className="rounded-full mb-6 p-4 bg-white shadow-lg shadow-gray-200 border-2 border-transparent group-hover:border-[#31bf2c] transition-colors duration-300">
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    width={60}
                                    height={60}
                                    className="object-contain"
                                />
                            </div>
                            <h3 className="text-xl font-bold text-blue-950">
                                {item.title}
                            </h3>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Texto final */}
                <div className="mt-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        animate={{
                            boxShadow: [
                                "0 0 0px rgba(49, 191, 44, 0)",
                                "0 0 20px rgba(49, 191, 44, 0.5)",
                                "0 0 0px rgba(49, 191, 44, 0)",
                            ],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 text-[#31bf2c] border-2 border-[#31bf2c] shadow-lg"
                    >
                        <motion.span
                            animate={{ rotate: [0, -10, 10, -10, 0] }}
                            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                            className="text-2xl"
                        >
                            🚀
                        </motion.span>
                        <span className="font-bold tracking-wide text-lg">Más opciones en desarrollo</span>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}