'use client';

import { useEffect } from 'react';

export default function NewConsultationPage () {
   useEffect(() => {
      // Simulate creating a new consultation and redirect to it
      const consultationId = `cons-new-${Date.now()}`;
      const urlParams = new URLSearchParams(window.location.search);
      const type = urlParams.get('type') || 'in-person';

      // In a real app, you would create the consultation in your backend here
      setTimeout(() => {
         window.location.href = `/doctor/consultation/${consultationId}?type=${type}`;
      }, 1000);
   }, []);

   return (
      <div className="flex justify-center items-center bg-gray-50 min-h-screen">
         <div className="text-center">
            <div className="mx-auto mb-4 border-b-2 border-brand-600 rounded-full w-12 h-12 animate-spin" />
            <h2 className="mb-2 font-semibold text-gray-900 text-xl">Iniciando Nueva Consulta</h2>
            <p className="text-gray-600">Preparando el entorno de consulta...</p>
         </div>
      </div>
   );
}
