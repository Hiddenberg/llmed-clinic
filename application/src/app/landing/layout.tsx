import type { Metadata } from "next";

export const metadata: Metadata = {
   title: "LLMed Clinic | Centro Especializado en Hemodiálisis",
   description: "Centro especializado en hemodiálisis con más de 15 años de experiencia. Tecnología avanzada, equipo médico certificado y atención personalizada las 24 horas.",
   keywords: "hemodiálisis, nefrología, tratamiento renal, clínica especializada, Ciudad de México",
   openGraph: {
      title: "LLMed Clinic | Centro Especializado en Hemodiálisis",
      description: "Centro especializado en hemodiálisis con más de 15 años de experiencia. Tecnología avanzada, equipo médico certificado y atención personalizada las 24 horas.",
      type: "website",
   },
};

export default function LandingLayout ({ children, }: {
   children: React.ReactNode;
}) {
   return children;
}
