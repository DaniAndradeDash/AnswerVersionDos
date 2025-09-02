"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const services = [
    {
        id: 1,
        title: "Asesoramiento Personalizado",
        description:
            "Brindamos asesoría especializada adaptada a tus necesidades, con un equipo de expertos que te guiarán paso a paso.",
    },
    {
        id: 2,
        title: "Análisis Detallado",
        description:
            "Realizamos un análisis profundo para encontrar la mejor solución estratégica y técnica en cada caso.",
    },
    {
        id: 3,
        title: "Gestión de Trámites",
        description:
            "Te acompañamos en la gestión eficiente de trámites para optimizar tiempo y recursos.",
    },
];

export default function Servicios() {
    const [selected, setSelected] = useState<number | null>(null);

    return (
        <section id="servicios" className="w-full bg-white py-20">
            <div className="max-w-7xl mx-auto text-center px-6">

                {/* Título */}
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#04268c]">
                    Nuestros servicios
                </h2>
                <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                    En Answer ST ofrecemos soluciones estratégicas, asesoría personalizada y
                    gestión eficiente de trámites para ayudarte a alcanzar tus objetivos.
                </p>

                {/* Cards */}
                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                    {services.map((service) => (
                        <div
                            key={service.id}
                            onClick={() =>
                                setSelected(selected === service.id ? null : service.id)
                            }
                            className={`cursor-pointer bg-white rounded-lg shadow-md border hover:shadow-xl transition p-6 flex flex-col items-center ${selected === service.id ? "border-[#31bf2c]" : "border-gray-200"
                                }`}
                        >
                            <Image
                                src="/logo_answer.png"
                                alt={service.title}
                                width={100}
                                height={100}
                                className="mb-4"
                            />
                            <h3 className="font-semibold text-lg text-gray-800">
                                {service.title}
                            </h3>
                        </div>
                    ))}
                </div>

                {/* Texto dinámico */}
                <div className="mt-8 min-h-[100px]">
                    {selected !== null ? (
                        <p className="text-gray-700 text-lg max-w-2xl mx-auto">
                            {services.find((s) => s.id === selected)?.description}
                        </p>
                    ) : (
                        <p className="text-gray-400 italic">
                            Haz clic en un servicio para ver más información
                        </p>
                    )}
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
