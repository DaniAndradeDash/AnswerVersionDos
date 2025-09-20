import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Answer ST",
  description: "Consultoría y asesorías profesionales",
  icons: {
    icon: [
      { url: '/Favicon.ico', sizes: '32x32', type: 'image/x-icon' },
      { url: '/Favicon.ico', sizes: '16x16', type: 'image/x-icon' },
    ],
    shortcut: '/Favicon.ico',
    apple: '/Favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" type="image/x-icon" href="/Favicon.ico" />
        <link rel="shortcut icon" type="image/x-icon" href="/Favicon.ico" />
        <meta name="msapplication-TileImage" content="/Favicon.ico" />
      </head>
      <body className="pt-16"> {/* margen por el header fijo */}
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
