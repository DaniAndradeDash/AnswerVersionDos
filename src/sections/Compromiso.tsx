"use client";

import Image from "next/image";
import Slider from "react-slick";
import Link from "next/link";

export default function Distintivo() {
    // Configuración del carrusel
    const settings = {
        dots: true,
        infinite: true,
        speed: 600,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2500,
        arrows: false,
        fade: true, // efecto suave entre imágenes
    };

    return (
        <section id="distintivo" className="w-full bg-white py-10 sm:py-16 md:py-20">
            <div className="max-w-6xl mx-auto text-center px-4 sm:px-6 lg:px-8">

                {/* Título */}
                <h2 className="px-6 py-3 bg-blue-950 text-white font-semibold rounded-full shadow-md hover:bg-[#034aa6] transition w-full sm:w-auto text-center inline-block text-[clamp(1.5rem,4vw,2.5rem)]">
                    Nuestro Distintivo
                </h2>

                {/* Logo */}
                <div className="mt-6 sm:mt-8 flex flex-col items-center gap-4">
                    <Image
                        src="/infonagreen.png"
                        alt="Infonagreen Logo"
                        width={320}
                        height={320}
                        className="w-[clamp(160px,20vw,320px)] h-auto mb-2"
                    />

                {/* Botón Facebook */}
                <Link
                    href="https://www.facebook.com/profile.php?id=61563095009879"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-3 bg-[#31bf2c] text-white font-semibold rounded-full shadow-md hover:bg-[#28a428] transition-all duration-300 hover:scale-105"
                >
                    {/* Logo Facebook */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="white"
                        className="w-5 h-5"
                    >
                            <path d="M22.675 0h-21.35C.597 0 0 .597 0 1.326v21.348C0 23.403.597 24 1.325 
                24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 
                1.325 0 2.463.099 2.794.143v3.24l-1.918.001c-1.504 
                0-1.795.715-1.795 1.763v2.312h3.587l-.467 
                3.622h-3.12V24h6.116C23.403 24 24 
                23.403 24 22.674V1.326C24 .597 23.403 0 22.675 0z" />
                        </svg>
                        Síguenos en Facebook
                    </Link>
                </div>

                {/* Slider */}
                <div className="mt-6 sm:mt-10">
                    <Slider {...settings}>
                        {[
                            "/infonagreen_uno.jpg",
                            "/check.jpeg",
                            "/cel_world.jpeg"
                        ].map((src, index) => (
                            <div key={index} className="px-2 sm:px-4">
                                <div className="relative mx-auto w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl rounded-xl overflow-hidden shadow-lg border-4 border-[#31bf2c]/60 transition-transform duration-500 hover:scale-105 aspect-[4/3]">
                                    <Image
                                        src={src}
                                        alt={`Infonagreen ecología ${index + 1}`}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>

                {/* Texto descriptivo */}
                <div className="mt-10 sm:mt-14 text-gray-700 space-y-4 text-justify max-w-prose mx-auto text-[clamp(0.9rem,2vw,1.2rem)] leading-relaxed">
                    <p>
                        INFONAGREEN es una página de categoría ambiental, dedicada a liderar el cuidado
                        del planeta en todos los sectores.
                    </p>
                    <p>
                        Somos la primera consultoría en México y LATAM en reconocer acciones por medio
                        del LIKE GREEN en redes sociales.
                    </p>
                    <p>
                        También otorgamos la constancia INFONAGREEN a aquellas acciones que trabajan
                        por mejorar nuestro entorno en beneficio del planeta.
                    </p>
                    <p>
                        Fomentamos alianzas entre personas, empresas, gobiernos y organizaciones no
                        gubernamentales, con el objetivo de crear un compromiso social con la
                        sostenibilidad, desde cualquier lugar, espacio o comunidad.
                    </p>
                </div>
            </div>
        </section>

    );
}
