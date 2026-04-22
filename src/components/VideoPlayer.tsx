"use client";

import { motion } from "framer-motion";

interface VideoPlayerProps {
    src: string;
    title: string;
}

export default function VideoPlayer({ src, title }: VideoPlayerProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-full max-w-[320px] mx-auto p-2 bg-white rounded-3xl shadow-2xl border border-gray-100"
        >
            <div className="relative w-full aspect-[9/16] rounded-2xl overflow-hidden shadow-inner bg-black">
                <video
                    className="w-full h-full object-cover"
                    controls
                    preload="metadata"
                >
                    <source src={src} type="video/mp4" />
                    Tu navegador no soporta el formato de video.
                </video>
            </div>
            <p className="text-center text-sm font-semibold text-blue-950 mt-3">{title}</p>
        </motion.div>
    );
}
