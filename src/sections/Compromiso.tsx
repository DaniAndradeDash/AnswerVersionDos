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
        <section id="distintivo" className="w-full bg-white py-20">
            <div className="max-w-5xl mx-auto text-center px-6">

                {/* Título */}
                <h2 className="text-2xl md:text-3xl font-extrabold text-[#04268c]">
                    Nuestro Distintivo
                </h2>

                {/* Logo y texto */}
                <div className="mt-8 flex flex-col items-center">
                    <Image
                        src="/logo_answer.png"
                        alt="Infonagreen Logo"
                        width={120}
                        height={120}
                        className="mb-4"
                    />
                    <h3 className="text-2xl font-bold text-[#2aa626]">INFONAGREEN</h3>
                </div>

                {/* Slider */}
                <div className="my-12">
                    <Slider {...settings}>
                        <div>
                            <Image
                                src="/logo_answer.png"
                                alt="Slide 1"
                                width={300}
                                height={300}
                                className="mx-auto"
                            />
                        </div>
                        <div>
                            <Image
                                src="/logo_answer.png"
                                alt="Slide 2"
                                width={300}
                                height={300}
                                className="mx-auto"
                            />
                        </div>
                        <div>
                            <Image
                                src="/logo_answer.png"
                                alt="Slide 3"
                                width={300}
                                height={300}
                                className="mx-auto"
                            />
                        </div>
                    </Slider>
                </div>

                {/* Texto descriptivo */}
                <div className="mt-6 text-gray-700 space-y-4 text-justify">
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
