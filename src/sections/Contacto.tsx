"use client";

import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

export default function Contacto() {
    return (
        <section id="contacto" className="w-full bg-white py-20">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 px-6">

                {/* Columna izquierda: Info de contacto */}
                <div className="flex flex-col justify-center">
                    <h2 className="text-2xl md:text-3xl font-extrabold text-[#04268c]">
                        Contáctanos
                    </h2>
                    <p className="mt-4 text-gray-600">
                        Un equipo dedicado para ayudarte a crecer. Ponte en contacto con nosotros
                        para resolver tus dudas o recibir asesoría personalizada.
                    </p>

                    <div className="mt-8 space-y-4 text-gray-700">
                        <div className="flex items-center space-x-3">
                            <FaEnvelope className="text-[#31bf2c]" />
                            <span>contact@answerst.com</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <FaPhone className="text-[#31bf2c]" />
                            <span>(123) 456 - 789</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <FaMapMarkerAlt className="text-[#31bf2c]" />
                            <span>794 Mcallister St, San Francisco, 94102</span>
                        </div>
                    </div>
                </div>

                {/* Columna derecha: Formulario */}
                <div className="bg-[#f5f7ff] shadow-md rounded-xl p-6 md:p-8">
                    <form className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input
                                type="text"
                                placeholder="Nombre"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#31bf2c] focus:outline-none bg-white"
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#31bf2c] focus:outline-none bg-white"
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input
                                type="text"
                                placeholder="Teléfono"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#31bf2c] focus:outline-none bg-white"
                            />
                            <input
                                type="text"
                                placeholder="Empresa"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#31bf2c] focus:outline-none bg-white"
                            />
                        </div>
                        <textarea
                            placeholder="Mensaje"
                            rows={4}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#31bf2c] focus:outline-none bg-white"
                        ></textarea>
                        <button
                            type="submit"
                            className="w-full md:w-auto px-6 py-3 bg-[#31bf2c] text-white font-bold rounded-full hover:bg-[#2aa626] transition"
                        >
                            Enviar mensaje
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}
