"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const services = [
    {
        id: 1,
        title: "Asesoramiento Personalizado",
        description:
            "Nuestro equipo de expertos está aquí para atender tus metas y necesidades personales o empresariales.",
        image: "/asesoramiento_personalizado.png",
    },
    {
        id: 2,
        title: "Análisis Detallado",
        description:
            "Realizamos un análisis exhaustivo de tu situación para identificar las mejores opciones y estrategias que resuelvan tus necesidades de manera óptima.",
        image: "/analisis_detallado.png",
    },
    {
        id: 3,
        title: "Gestión de Trámites",
        description:
            "Simplificamos el proceso de tu solicitud, gestionando los trámites correspondientes agilizando el desarrollo de los temas, garantizando amplios beneficios. Creamos soluciones sostenibles y estratégicas que generan resultados.",
        image: "/gestion_tramites.png",
    },
];

export default function Servicios() {
    const [selected, setSelected] = useState<number | null>(null);

    return (
        <section
            id="servicios"
            className="w-full min-h-screen bg-white flex items-center"
        >
            <div className="max-w-7xl mx-auto text-center px-6 w-full">
                {/* Título */}
                <h2 className="px-6 py-3 bg-blue-950 text-white font-semibold rounded-full shadow-md hover:bg-[#034aa6] transition w-full sm:w-auto text-center inline-block text-[clamp(1.5rem,4vw,2.5rem)]">
                    Nuestros servicios
                </h2>
                <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                    En Answer <span className="text-[#31bf2c]">st</span> ofrecemos soluciones estratégicas, asesoría
                    personalizada y gestión eficiente de trámites para ayudarte a
                    alcanzar tus objetivos.
                </p>

                {/* Cards */}
                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                    {services.map((service) => (
                        <div
                            key={service.id}
                            onClick={() =>
                                setSelected(selected === service.id ? null : service.id)
                            }
                            className={`group cursor-pointer bg-white rounded-lg shadow-md border hover:shadow-xl transition p-6 flex flex-col items-center relative overflow-hidden min-h-[300px] ${selected === service.id
                                    ? "border-[#31bf2c]"
                                    : "border-gray-200"
                                }`}
                        >
                            {/* Fondo en hover */}
                            <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition duration-500">
                                <Image
                                    src="/fondo_servicios.png"
                                    alt="Fondo decorativo"
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            {/* Imagen */}
                            <div className="relative z-40 flex justify-center items-center mb-4">
                                <Image
                                    src={service.image}
                                    alt={service.title}
                                    width={100}
                                    height={100}
                                    className="object-contain"
                                />
                            </div>

                            {/* Título */}
                            <h3 className="font-semibold text-lg text-gray-800 relative z-20">
                                {service.title}
                            </h3>

                            {/* Descripción SOLO en móviles */}
                            <AnimatePresence>
                                {selected === service.id && (
                                    <motion.div
                                        key={service.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.2 }}
                                        className="block md:hidden mt-4 px-4 py-3 bg-[#f9f9f9] border-l-4 border-[#31bf2c] rounded-md shadow-sm text-sm text-gray-700 text-justify relative z-30"
                                    >
                                        {service.description}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>

                {/* Texto dinámico SOLO en escritorio */}
                <div className="hidden md:block mt-8 min-h-[100px]">
                    <AnimatePresence>
                        {selected !== null && (
                            <motion.div
                                key={selected}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                                className="mt-8 min-h-[100px] max-w-2xl mx-auto px-6 py-4 bg-[#f9f9f9] border-l-4 border-[#31bf2c] rounded-md shadow-sm"
                            >
                                <p className="text-gray-700 text-lg text-justify leading-relaxed">
                                    {services.find((s) => s.id === selected)?.description}
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Botón */}
                <div className="mt-12">
                    <Link
                        href="#contacto"
                        className="px-6 py-3 bg-[#04268c] text-white font-semibold rounded-full shadow-md hover:bg-[#034aa6] transition"
                    >
                        Contáctanos
                    </Link>
                </div>
            </div>
        </section>
    );
}
