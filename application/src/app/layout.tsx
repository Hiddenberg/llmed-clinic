import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
   title: "LLMED Clinic | Demo",
   description: "LLMED Clinic | Demo",
};

export default function RootLayout ({ children, }: Readonly<{
  children: React.ReactNode;
}>) {
   return (
      <html lang="es-MX">
         <body
            className={` antialiased`}
         >
            {children}
         </body>
      </html>
   );
}
