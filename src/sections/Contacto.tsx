"use client";

import Image from "next/image";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

export default function Contacto() {
    return (
        <section id="contacto" className="w-full bg-white py-[clamp(3rem,6vw,5rem)]">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-y-12 md:gap-x-16 px-4 sm:px-6 lg:px-8">

                {/* Columna izquierda */}
                <div className="flex-1 flex flex-col justify-center min-w-0">
                    <h2 className="text-[clamp(1.5rem,4vw,2.5rem)] font-extrabold text-[#04268c]">
                        Contáctanos
                    </h2>
                    <p className="mt-4 text-gray-600 text-[clamp(0.9rem,2vw,1.1rem)] leading-relaxed">
                        Un equipo dedicado para ayudarte a crecer. Ponte en contacto con nosotros
                        para resolver tus dudas o recibir asesoría personalizada.
                    </p>

                    <div className="mt-8 space-y-4 text-gray-700 text-[clamp(0.9rem,2vw,1rem)]">
                        <div className="flex items-center gap-3">
                            <FaEnvelope className="text-[#31bf2c]" />
                            <span>contact@answerst.com</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <FaPhone className="text-[#31bf2c]" />
                            <span>(123) 456 - 789</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <FaMapMarkerAlt className="text-[#31bf2c]" />
                            <span>794 Mcallister St, San Francisco, 94102</span>
                        </div>
                    </div>

                    {/* Íconos sociales */}
                    <div className="mt-12 flex flex-col sm:flex-row flex-wrap justify-center gap-8">
                        {/* Facebook */}
                        <a href="https://www.facebook.com/tu_pagina" target="_blank" rel="noopener noreferrer"
                            className="group relative w-[80px] h-[100px] cursor-pointer">
                            <Image src="/Icono_Face.png" alt="Facebook" width={80} height={80}
                                className="transition-transform duration-300 group-hover:scale-110 group-hover:shadow-[0_8px_20px_#31bf2c50]" />
                            <div className="absolute top-full left-0 w-full h-[20px] overflow-hidden">
                                <Image src="/Icono_Face.png" alt="Reflejo Facebook" width={80} height={80}
                                    className="opacity-30 blur-sm scale-y-[-1]" />
                            </div>
                        </a>

                        {/* WhatsApp */}
                        <a href="https://wa.me/521XXXXXXXXXX" target="_blank" rel="noopener noreferrer"
                            className="group relative w-[80px] h-[100px] cursor-pointer">
                            <Image src="/icono_whats.png" alt="WhatsApp" width={80} height={80}
                                className="transition-transform duration-300 group-hover:scale-110 group-hover:shadow-[0_8px_20px_#31bf2c50]" />
                            <div className="absolute top-full left-0 w-full h-[20px] overflow-hidden">
                                <Image src="/icono_whats.png" alt="Reflejo WhatsApp" width={80} height={80}
                                    className="opacity-30 blur-sm scale-y-[-1]" />
                            </div>
                        </a>

                        {/* Correo */}
                        <a href="mailto:contacto@tudominio.com"
                            className="group relative w-[80px] h-[100px] cursor-pointer">
                            <Image src="/icono_correo.png" alt="Correo" width={80} height={80}
                                className="transition-transform duration-300 group-hover:scale-110 group-hover:shadow-[0_8px_20px_#31bf2c50]" />
                            <div className="absolute top-full left-0 w-full h-[20px] overflow-hidden">
                                <Image src="/icono_correo.png" alt="Reflejo Correo" width={80} height={80}
                                    className="opacity-30 blur-sm scale-y-[-1]" />
                            </div>
                        </a>
                    </div>
                </div>

                {/* Columna derecha: Formulario */}
                <div className="flex-1 bg-[#f5f7ff] shadow-md rounded-xl p-6 sm:p-8 min-w-0">
                    <form className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <input type="text" placeholder="Nombre"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#31bf2c] focus:outline-none bg-white" />
                            <input type="email" placeholder="Email"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#31bf2c] focus:outline-none bg-white" />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <input type="text" placeholder="Teléfono"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#31bf2c] focus:outline-none bg-white" />
                            <input type="text" placeholder="Empresa"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#31bf2c] focus:outline-none bg-white" />
                        </div>
                        <textarea placeholder="Mensaje" rows={4}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#31bf2c] focus:outline-none bg-white"></textarea>
                        <button type="submit"
                            className="w-full sm:w-auto px-6 py-3 bg-[#31bf2c] text-white font-bold rounded-full hover:bg-[#2aa626] transition">
                            Enviar mensaje
                        </button>
                    </form>
                </div>
            </div>
        </section>

    );
}
