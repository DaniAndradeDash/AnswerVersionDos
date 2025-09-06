"use client";

import Image from "next/image";
import Slider from "react-slick";

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
                <h2 className="text-[clamp(1.5rem,4vw,2.5rem)] font-extrabold text-[#04268c]">
                    Nuestro Distintivo
                </h2>

                {/* Logo */}
                <div className="mt-6 sm:mt-8 flex justify-center">
                    <Image
                        src="/infonagreen.png"
                        alt="Infonagreen Logo"
                        width={320}
                        height={320}
                        className="w-[clamp(160px,20vw,320px)] h-auto mb-4"
                    />
                </div>

                {/* Slider */}
                <div className="mt-6 sm:mt-10">
                    <Slider {...settings}>
                        {[
                            "/infonagreen_ecologia_uno.jpg",
                            "/infonagreen_ecologia_dos.jpg",
                            "/infonagreen_ecologia_tres.jpg",
                        ].map((src, index) => (
                            <div key={index} className="px-2 sm:px-4">
                                <div className="relative mx-auto w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl rounded-xl overflow-hidden shadow-lg border-4 border-[#31bf2c]/30 transition-transform duration-500 hover:scale-105 aspect-[4/3]">
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
