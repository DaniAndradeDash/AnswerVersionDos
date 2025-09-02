"use client";

import Image from "next/image";
import Link from "next/link";

export default function Hero() {
    return (
        <section
            id="hero"
            className="w-full bg-white py-20 md:py-28"
        >
            <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-12 px-6">

                {/* Columna izquierda: Texto */}
                <div className="flex-1 text-center md:text-left">
                    <h1 className="text-3xl md:text-5xl font-extrabold text-[#04268c] leading-tight">
                        Consultoría especializada <br /> en orientación.
                    </h1>
                    <p className="mt-6 text-gray-600 text-base md:text-lg leading-relaxed">
                        Somos una consultoría especializada en asesoría, orientación e innovación.
                        Contamos con un equipo de asesores altamente calificados y especializados.
                        Nuestra misión es orientarte a encontrarte la solución indicada a tus problemas.
                        En Answer contamos con personal calificado, especialistas y profesionistas en
                        todo tipo de asesorías.
                    </p>

                    {/* Botones */}
                    <div className="mt-8 flex flex-col md:flex-row gap-4 justify-center md:justify-start">
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
                <div className="flex-1 flex justify-center">
                    <Image
                        src="/logo_answer.png"   // aquí usaremos el logo que ya generamos y guardamos en /public
                        alt="Logo Answer ST"
                        width={300}
                        height={300}
                        className="object-contain"
                        priority
                    />
                </div>
            </div>
        </section>
    );
}
