"use client";

import { useState } from "react";
import Image from "next/image";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import { motion } from "framer-motion";

const socialLinks = [
    { name: "Facebook", href: "https://www.facebook.com/share/1JMbyxjzvd/", icon: "/Icono_Face.png", color: "#1877f2" },
    { name: "WhatsApp", href: "https://wa.me/8186863395", icon: "/icono_whats.png", color: "#25d366" },
    { name: "Correo", href: "mailto:contacto@answerst.com", icon: "/icono_correo.png", color: "#ea4335" },
];

export default function Contacto() {
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [telefono, setTelefono] = useState("");
    const [empresa, setEmpresa] = useState("");
    const [mensaje, setMensaje] = useState("");
    const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("idle");

        const res = await fetch("/sendmail.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nombre, email, telefono, empresa, mensaje }),
        });

        const data = await res.json();
        if (data.success) {
            setStatus("success");
            setNombre(""); setEmail(""); setTelefono(""); setEmpresa(""); setMensaje("");
        } else {
            setStatus("error");
            console.error(data.error);
        }
    };

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
                            <span>contacto@answerst.com</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <FaPhone className="text-[#31bf2c]" />
                            <span>(81) 8686 3395</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <FaMapMarkerAlt className="text-[#31bf2c]" />
                            <span>Monterrey, Nuevo Leon</span>
                        </div>
                    </div>

                    {/* Íconos sociales mejorados */}
                    <div className="mt-12 flex flex-wrap justify-center gap-10">
                        {socialLinks.map((link) => (
                            <motion.a
                                key={link.name}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ y: -15, scale: 1.1 }}
                                className="relative group p-4 bg-gray-50 rounded-2xl shadow-lg border border-gray-100 transition-colors duration-300"
                                style={{ boxShadow: `0 10px 25px -5px ${link.color}30` }}
                            >
                                <motion.div
                                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                    style={{ boxShadow: `0 0 20px ${link.color}` }}
                                />
                                <Image 
                                    src={link.icon} 
                                    alt={link.name} 
                                    width={60} 
                                    height={60} 
                                    className="relative z-10" 
                                />
                            </motion.a>
                        ))}
                    </div>
                </div>

                {/* Columna derecha: Formulario */}
                <div className="flex-1 bg-[#f5f7ff] shadow-md rounded-xl p-6 sm:p-8 min-w-0">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <input
                                type="text"
                                placeholder="Nombre"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#31bf2c] transition"
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#31bf2c] transition"
                            />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <input
                                type="text"
                                placeholder="Teléfono"
                                value={telefono}
                                onChange={(e) => setTelefono(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#31bf2c] transition"
                            />
                            <input
                                type="text"
                                placeholder="Empresa"
                                value={empresa}
                                onChange={(e) => setEmpresa(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#31bf2c] transition"
                            />
                        </div>
                        <textarea
                            placeholder="Mensaje"
                            rows={4}
                            value={mensaje}
                            onChange={(e) => setMensaje(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#31bf2c] transition resize-none"
                        ></textarea>
                        <button
                            type="submit"
                            className="w-full sm:w-auto px-6 py-3 bg-[#31bf2c] text-white font-bold rounded-full hover:bg-[#2aa626] transition"
                        >
                            Enviar mensaje
                        </button>

                        {status === "success" && (
                            <p className="text-green-600 font-semibold mt-4 text-center">
                                ¡Mensaje enviado correctamente!
                            </p>
                        )}
                        {status === "error" && (
                            <p className="text-red-600 font-semibold mt-4 text-center">
                                Hubo un error al enviar el mensaje.
                            </p>
                        )}
                    </form>
                </div>
                
            </div>
                
        </section>
    );
}
