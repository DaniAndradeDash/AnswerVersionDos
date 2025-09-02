import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="w-full bg-gray-100 border-t mt-10">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between py-6 px-6 text-gray-600 text-sm">

                {/* Copyright */}
                <p>© 2025 Answer ST | Todos los derechos reservados</p>

                {/* Links */}
                <div className="flex space-x-6 mt-4 md:mt-0">
                    <a href="#hero" className="hover:text-green-600">Inicio</a>
                    <a href="#servicios" className="hover:text-green-600">Servicios</a>
                    <a href="#asesorias" className="hover:text-green-600">Asesorías</a>
                    <a href="#contacto" className="hover:text-green-600">Contacto</a>
                </div>

                {/* Redes sociales */}
                <div className="flex space-x-4 mt-4 md:mt-0">
                    <a href="#" className="hover:text-green-600"><FaFacebook size={18} /></a>
                    <a href="#" className="hover:text-green-600"><FaTwitter size={18} /></a>
                    <a href="#" className="hover:text-green-600"><FaInstagram size={18} /></a>
                </div>
            </div>
        </footer>
    );
}
