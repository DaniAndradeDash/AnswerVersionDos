"use client";

import Link from "next/link";
import Image from "next/image";

export default function Header() {
    return (
        <header className="w-full bg-white shadow-sm fixed top-0 z-50">
            <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-6">
                {/* Logo */}
                <div className="flex items-center space-x-2">
                    <Image src="/logo_answer.png" alt="Logo Answer ST" width={80} height={80} />
                    <span className="font-bold text-xl text-gray-800">
                        ANSWER<span className="text-green-600">st</span>
                    </span>
                </div>

                {/* Menú de navegación */}
                <nav className="hidden md:flex space-x-8 text-gray-700 font-medium">
                    <Link href="#hero" className="hover:text-green-600">Inicio</Link>
                    <Link href="#servicios" className="hover:text-green-600">Servicios</Link>
                    <Link href="#asesorias" className="hover:text-green-600">Asesorías</Link>
                    <Link href="#contacto" className="hover:text-green-600">Contacto</Link>
                </nav>
            </div>
        </header>
    );
}
