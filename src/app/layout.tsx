'use client';
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import css from "./style.module.css";
import { usePathname } from "next/navigation";
import { AuthProvider } from "@/app/context/authContext";

import Header from "./component/header";
import Footer from "./component/footer";
import HeaderAdmin from "./component/headeradmin";
import { CartProvider } from "@/app/context/cartcontext";



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});




  export default function RootLayout({
    children,
  }: Readonly<{children: React.ReactNode;}>) {
    const pathname = usePathname();
  
    return (
<html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>TOFRUIT</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css"
          integrity="sha512-Kc323vGBEqzTmouAECnVceyQqyqdsSiqLQISBL29aUW4U/M7pSPA/gEUZQqv1cwx4OnYxTxve5UMg5GT6L4JJg=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300..700&display=swap"
          rel="stylesheet"
        />
      </head>
        <body className={`${geistSans.variable} ${geistMono.variable}`} id={css.body} >

        <AuthProvider>
        <CartProvider>
          {pathname.startsWith("/admin") ? <HeaderAdmin/> : <Header />}
          {children}
          <Footer />
          </CartProvider>
        </AuthProvider>


        
            {/* foooter */}
    


        </body>
      </html>
    );
  }
