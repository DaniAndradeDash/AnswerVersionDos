"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import FloatingShapes from "@/components/FloatingShapes";
import Particles from "@/components/Particles";


export default function Hero() {
    return (
        <section
            id="hero"
            className="relative w-full min-h-screen bg-white flex items-center"
        >
            <Particles />

            <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-12 px-6 py-12 md:py-0">

                {/* Columna izquierda: Texto */}
                <div className="flex-1 text-center md:text-left">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#04268c] leading-tight">
                        Consultoría especializada <br /> en orientación.
                    </h1>
                    <p className="mt-6 text-gray-600 text-base sm:text-lg leading-relaxed">
                        Somos una consultoría especializada en asesoría, orientación e innovación.
                        Contamos con un equipo de asesores altamente calificados y especializados.
                        Nuestra misión es orientarte a encontrarte la solución indicada a tus problemas.
                        En Answer contamos con personal calificado, especialistas y profesionistas en
                        todo tipo de asesorías.
                    </p>

                    {/* Botones */}
                    <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                        <Link
                            href="#servicios"
                            className="px-6 py-3 bg-[#04268c] text-white font-semibold rounded-full shadow-md hover:bg-[#034aa6] transition"
                        >
                            Nuestros Servicios
                        </Link>
                        <Link
                            href="#asesorias"
                            className="px-6 py-3 border-2 border-[#31bf2c] text-[#31bf2c] font-semibold rounded-full hover:bg-[#31bf2c] hover:text-white transition"
                        >
                            Nuestras asesorías
                        </Link>
                    </div>
                </div>

                {/* Columna derecha: Imagen */}
                <div className="relative w-[400px] h-[400px] flex items-center justify-center">

                    {/* 🔲 Esquinas animadas (más largas) */}
                    {/* Esquina superior izquierda */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5, x: -20, y: -20 }}
                        animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="absolute top-0 left-0 w-10 h-10 border-t-4 border-l-4 border-[#31bf2c]"
                    />

                    {/* Esquina superior derecha */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5, x: 20, y: -20 }}
                        animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="absolute top-0 right-0 w-10 h-10 border-t-4 border-r-4 border-[#31bf2c]"
                    />

                    {/* Esquina inferior izquierda */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5, x: -20, y: 20 }}
                        animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="absolute bottom-0 left-0 w-10 h-10 border-b-4 border-l-4 border-[#31bf2c]"
                    />

                    {/* Esquina inferior derecha */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5, x: 20, y: 20 }}
                        animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                        className="absolute bottom-0 right-0 w-10 h-10 border-b-4 border-r-4 border-[#31bf2c]"
                    />

                    {/* 🅰️ Logo con animación de enfoque */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5, filter: "blur(10px)" }}
                        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                        transition={{ duration: 1.2, ease: "easeOut", delay: 1 }}
                        className="z-10"
                    >
                        <Image
                            src="/logo_answer.png"
                            alt="Logo Answer ST"
                            width={500}
                            height={500}
                            className="object-contain"
                            priority
                        />
                    </motion.div>
                </div>


            </div>
        </section>
    );
}