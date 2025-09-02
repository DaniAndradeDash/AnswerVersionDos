"use client";

import { FaLock } from "react-icons/fa";
import { AiOutlineEye } from "react-icons/ai";

export default function Compromiso() {
    return (
        <section id="compromiso" className="w-full bg-white py-20">
            <div className="max-w-5xl mx-auto text-center px-6">

                {/* Título */}
                <h2 className="text-2xl md:text-3xl font-extrabold text-[#04268c]">
                    Nuestro compromiso es servirte
                </h2>

                {/* Contenedor principal */}
                <div className="relative mt-10 flex items-center justify-center">
                    <div className="bg-[#31bf2c] text-white 
                          rounded-tl-3xl  /* Esquina sup. izquierda redondeada */
                          rounded-br-3xl  /* Esquina inf. derecha redondeada */
                          rounded-tr-none /* Esquina sup. derecha cuadrada */
                          rounded-bl-none /* Esquina inf. izquierda cuadrada */
                          px-6 md:px-12 py-6 md:py-8 
                          text-center font-semibold text-lg md:text-xl max-w-3xl">
                        Confidencialidad y Transparencia <br />
                        en el manejo de todos los datos
                    </div>

                    {/* Icono decorativo izquierda */}
                    <div className="absolute left-0 -translate-x-12 hidden md:block">
                        <AiOutlineEye size={48} className="text-[#a6e22d]" />
                    </div>

                    {/* Icono decorativo derecha */}
                    <div className="absolute right-0 translate-x-12 hidden md:block">
                        <FaLock size={48} className="text-[#a6e22d]" />
                    </div>
                </div>
            </div>
        </section>
    );
}
