"use client";

import { motion } from "framer-motion";

export default function Videos() {
    const videos = [
        {
            id: "_O09iO7wJ38",
            title: "Acciones por el Planeta",
            description: "Descubre cómo pequeñas acciones generan un impacto positivo en nuestro entorno."
        },
        {
            id: "6PiAUMXWzLQ",
            title: "Compromiso Sostenible",
            description: "Nuestro enfoque estratégico para un futuro más verde y responsable."
        }
    ];

    return (
        <section id="videos" className="w-full bg-gray-50 py-20 md:py-32">
            <div className="max-w-6xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="px-8 py-4 bg-blue-950 text-white font-bold rounded-full shadow-2xl text-[clamp(1.5rem,4vw,2.5rem)] inline-block">
                        Conoce más de nosotros
                    </h2>
                    <p className="mt-6 text-gray-600 text-lg max-w-2xl mx-auto">
                        Te compartimos un poco de nuestro trabajo diario y el compromiso que nos mueve a seguir transformando el entorno.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-12">
                    {videos.map((video, index) => (
                        <motion.div
                            key={video.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            whileHover={{ y: -10 }}
                            className="bg-white p-4 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100"
                        >
                            <div className="relative w-full aspect-[9/16] rounded-2xl overflow-hidden mb-6 shadow-inner">
                                <iframe
                                    className="absolute inset-0 w-full h-full"
                                    src={`https://www.youtube.com/embed/${video.id}`}
                                    title={video.title}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                            <div className="px-2">
                                <h3 className="text-2xl font-bold text-blue-950 mb-3">{video.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{video.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
