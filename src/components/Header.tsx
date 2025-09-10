"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="w-full bg-white shadow-sm fixed top-0 z-50">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-3 min-h-[80px] h-20">
                {/* Logo */}
                <div className="flex items-center gap-2 flex-wrap">
                    <Image src="/Logo_Letra.png" alt="Logo Answer ST" width={50} height={50} />
                    <span className="font-bold text-lg sm:text-xl text-gray-800 whitespace-nowrap">
                        ANSWER<span className="text-green-600">.st</span>
                    </span>
                </div>

                {/* Menú desktop */}
                <nav className="hidden md:flex space-x-6 sm:space-x-8 text-gray-700 font-medium">
                    <Link href="#hero" className="hover:text-green-600">Inicio</Link>
                    <Link href="#servicios" className="hover:text-green-600">Servicios</Link>
                    <Link href="#asesorias" className="hover:text-green-600">Asesorías</Link>
                    <Link href="#contacto" className="hover:text-green-600">Contacto</Link>
                </nav>

                {/* Botón menú móvil */}
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Abrir menú"
                    className="md:hidden text-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500"
                >
                    {menuOpen ? <HiX size={28} /> : <HiMenuAlt3 size={28} />}
                </button>
            </div>

            {/* Menú móvil desplegable */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="absolute top-full left-0 w-full bg-white shadow-md border-t border-gray-200 px-6 py-4 space-y-4 text-gray-700 font-medium md:hidden"
                    >
                        <Link
                            href="#hero"
                            onClick={() => setMenuOpen(false)}
                            className="block hover:text-green-600"
                        >
                            Inicio
                        </Link>
                        <Link
                            href="#servicios"
                            onClick={() => setMenuOpen(false)}
                            className="block hover:text-green-600"
                        >
                            Servicios
                        </Link>
                        <Link
                            href="#asesorias"
                            onClick={() => setMenuOpen(false)}
                            className="block hover:text-green-600"
                        >
                            Asesorías
                        </Link>
                        <Link
                            href="#contacto"
                            onClick={() => setMenuOpen(false)}
                            className="block hover:text-green-600"
                        >
                            Contacto
                        </Link>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}