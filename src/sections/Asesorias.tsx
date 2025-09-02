"use client";

import Image from "next/image";

const asesorias = [
    { id: 1, title: "Financiera" },
    { id: 2, title: "Legal" },
    { id: 3, title: "Empresarial" },
    { id: 4, title: "Salud" },
    { id: 5, title: "Medicion de conflictos" },
    { id: 6, title: "Medio ambiente" },
];

export default function Asesorias() {
    return (
        <section id="asesorias" className="w-full bg-white py-20">
            <div className="max-w-6xl mx-auto text-center px-6">

                {/* Título */}
                <h2 className="text-2xl md:text-3xl font-extrabold text-[#04268c]">
                    Nuestras Asesorías
                </h2>

                {/* Grid de asesorías */}
                <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
                    {asesorias.map((item) => (
                        <div
                            key={item.id}
                            className="flex flex-col items-center text-center"
                        >
                            <Image
                                src="/logo_answer.png"
                                alt={item.title}
                                width={80}
                                height={80}
                                className="mb-4"
                            />
                            <h3 className="text-lg font-semibold text-[#04268c]">
                                {item.title}
                            </h3>
                        </div>
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
