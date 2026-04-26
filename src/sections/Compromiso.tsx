"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Slider from "react-slick";
//import "slick-carousel/slick/slick.css";
//mport "slick-carousel/slick/slick-theme.css";
import VideoPlayer from "../components/VideoPlayer";

export default function Distintivo() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false,
        responsive: [
            { breakpoint: 1024, settings: { slidesToShow: 2 } },
            { breakpoint: 640, settings: { slidesToShow: 1 } },
        ],
    };

    return (
        <section id="distintivo" className="w-full bg-white py-16 md:py-20 overflow-hidden">
            <div className="max-w-6xl mx-auto px-6">
                {/* Título */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-18"
                    >
                        <h2 className="px-8 py-4 bg-blue-950 text-white font-bold rounded-full shadow-2xl text-[clamp(1.5rem,4vw,2.5rem)] inline-block">
                            Nuestro Distintivo
                        </h2>
                    </motion.div>


                <div className="grid md:grid-cols-2 gap-26 items-center mb-10">
                    {/* Sección Visual (Logo + Botón) */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex flex-col items-center gap-22"
                    >
                        <motion.div
                            animate={{ rotate: [0, 5, -5, 0] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <Image
                                src="/infonagreen.png"
                                alt="Infonagreen Logo"
                                width={250}
                                height={250}
                                className="w-full max-w-[240px] h-auto drop-shadow-2xl"
                            />
                        </motion.div>

                        <Link
                            href="https://www.facebook.com/share/1JMbyxjzvd/"
                            target="_blank"
                            className="flex items-center gap-3 px-6 py-3 bg-[#31bf2c] text-white font-bold rounded-full shadow-lg hover:bg-[#28a428] transition-all hover:scale-105"
                        >
                            <span className="text-xl">f</span>
                            Síguenos en Facebook
                        </Link>
                    </motion.div>

                    {/* Sección Informativa (Interactiva) */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-4"
                    >
                        {[
                            {
                                title: "Liderazgo Ambiental",
                                desc: "INFONAGREEN es una consultoría líder dedicada a liderar el cuidado del planeta en todos los sectores."
                            },
                            {
                                title: "Reconocimiento único",
                                desc: "Somos la primera consultoría en México y LATAM en reconocer acciones mediante el 'LIKE GREEN' en redes."
                            },
                            {
                                title: "Constancia de Acción",
                                desc: "Otorgamos la constancia INFONAGREEN a proyectos que mejoran nuestro entorno en beneficio del planeta."
                            },
                            {
                                title: "Fomento de Alianzas",
                                desc: "Fomentamos alianzas entre personas, empresas y gobiernos para crear un compromiso social con la sostenibilidad en cualquier comunidad."
                            }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ scale: 1.01, x: 5 }}
                                className="p-4 bg-white border-l-4 border-[#31bf2c] shadow-md rounded-r-lg cursor-pointer hover:shadow-lg transition-all"
                            >
                                <h3 className="text-lg font-bold text-blue-950 mb-1">{item.title}</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                {/* Slider reincorporado */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <Slider {...settings}>
                        {[
                            "/infonagreen_uno.jpg",
                            "/check.jpeg",
                            "/cel_world.jpeg"
                        ].map((src, index) => (
                            <div key={index} className="px-2">
                                <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden shadow-md border-2 border-[#31bf2c]/20 hover:border-[#31bf2c] transition-colors">
                                    <Image
                                        src={src}
                                        alt={`Infonagreen ${index + 1}`}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </div>
                        ))}
                    </Slider>
                </motion.div>

                {/* Nuevo video Infonagreen */}
                <div className="mt-10">
                    <h3 className="text-center text-xl font-bold text-blue-950 mb-6">Conoce Infonagreen</h3>
                    <VideoPlayer src="/Infonagreen.mp4" title="Infonagreen Video" />
                </div>
            </div>
        </section>
    );
}
