"use client"

import {
   useState, useCallback, useRef
} from 'react';
import {
   Upload, FileText, AlertCircle, CheckCircle
} from 'lucide-react';

interface FileUploadSectionProps {
   onFileUpload: (file: File) => void;
}

export default function FileUploadSection ({ onFileUpload }: FileUploadSectionProps) {
   const [isDragOver, setIsDragOver] = useState(false);
   const [selectedFile, setSelectedFile] = useState<File | null>(null);
   const [error, setError] = useState<string | null>(null);
   const hiddenFileInputRef = useRef<HTMLInputElement>(null);

   const validateFile = useCallback((file: File) => {
      // Check file type
      if (file.type !== 'application/pdf') {
         setError('Solo se permiten archivos PDF');
         return false;
      }

      // Check file size (max 10MB)
      const maxSize = 10 * 1024 * 1024; // 10MB
      if (file.size > maxSize) {
         setError('El archivo debe ser menor a 10MB');
         return false;
      }

      setError(null);
      return true;
   }, []);

   const handleFileSelect = useCallback((file: File) => {
      if (validateFile(file)) {
         setSelectedFile(file);
      }
   }, [validateFile]);

   const handleDrop = useCallback((e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);

      const files = Array.from(e.dataTransfer.files);
      if (files.length > 0) {
         handleFileSelect(files[0]);
      }
   }, [handleFileSelect]);

   const handleDragOver = useCallback((e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(true);
   }, []);

   const handleDragLeave = useCallback((e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);
   }, []);

   const handleFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files && files.length > 0) {
         handleFileSelect(files[0]);
      }
   }, [handleFileSelect]);

   const handleUpload = useCallback(() => {
      if (selectedFile) {
         onFileUpload(selectedFile);
      }
   }, [selectedFile, onFileUpload]);

   const resetFile = useCallback(() => {
      setSelectedFile(null);
      setError(null);
   }, []);

   return (
      <div className="space-y-6">
         {/* File Upload Area */}
         <div className="bg-white/60 shadow-lg backdrop-blur-sm border border-white/50 rounded-2xl overflow-hidden">
            <div className="p-8">
               <h2 className="flex items-center gap-3 mb-6 font-bold text-gray-800 text-2xl">
                  <Upload className="text-brand-500" size={28} />
                  Subir Documento Médico
               </h2>

               <div
                  className={`relative border-2 border-dashed rounded-xl p-12 text-center transition-all ${
                     isDragOver
                        ? 'border-brand-500 bg-brand-50/50'
                        : selectedFile
                           ? 'border-green-400 bg-green-50/50'
                           : error
                              ? 'border-red-400 bg-red-50/50'
                              : 'border-gray-300 bg-gray-50/50 hover:border-brand-400 hover:bg-brand-50/30'
                  }`}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
               >
                  {/* Only show file input overlay when no file is selected */}
                  {!selectedFile && !error && (
                     <input
                        type="file"
                        accept=".pdf"
                        onChange={handleFileInputChange}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                     />
                  )}

                  {/* Hidden file input for when overlay is not shown */}
                  <input
                     ref={hiddenFileInputRef}
                     type="file"
                     accept=".pdf"
                     onChange={handleFileInputChange}
                     className="hidden"
                  />

                  {selectedFile ? (
                     <div className="space-y-4">
                        <CheckCircle size={48} className="mx-auto text-green-500" />
                        <div>
                           <h3 className="font-semibold text-gray-800 text-lg">Archivo Seleccionado</h3>
                           <div className="flex justify-center items-center gap-2 mt-2">
                              <FileText size={20} className="text-green-500" />
                              <span className="font-medium text-gray-700">{selectedFile.name}</span>
                           </div>
                           <p className="mt-1 text-gray-500 text-sm">
                              {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                           </p>
                        </div>
                        <div className="flex justify-center gap-3">
                           <button
                              onClick={handleUpload}
                              className="inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-600 px-6 py-3 rounded-lg text-white transition-colors"
                           >
                              <Upload size={20} />
                              Procesar Documento
                           </button>
                           <button
                              onClick={resetFile}
                              className="inline-flex items-center gap-2 bg-gray-500 hover:bg-gray-600 px-6 py-3 rounded-lg text-white transition-colors"
                           >
                              Cambiar archivo
                           </button>
                        </div>
                     </div>
                  ) : error ? (
                     <div className="space-y-4">
                        <AlertCircle size={48} className="mx-auto text-red-500" />
                        <div>
                           <h3 className="font-semibold text-red-800 text-lg">Error en el archivo</h3>
                           <p className="mt-2 text-red-600">{error}</p>
                        </div>
                        <button
                           onClick={resetFile}
                           className="inline-flex items-center gap-2 bg-red-500 hover:bg-red-600 px-6 py-3 rounded-lg text-white transition-colors"
                        >
                           Intentar de nuevo
                        </button>
                     </div>
                  ) : (
                     <div className="space-y-4">
                        <Upload size={48} className={`mx-auto ${isDragOver ? 'text-brand-500' : 'text-gray-400'}`} />
                        <div>
                           <h3 className="font-semibold text-gray-800 text-lg">
                              {isDragOver ? 'Suelta el archivo aquí' : 'Arrastra y suelta tu documento PDF'}
                           </h3>
                           <p className="mt-2 text-gray-600">
                              o <button
                                 onClick={() => hiddenFileInputRef.current?.click()}
                                 className="font-medium text-brand-500 hover:text-brand-600 underline"
                                >
                                 haz clic aquí para seleccionar
                              </button>
                           </p>
                        </div>
                        <div className="text-gray-500 text-sm">
                           <p>Formatos soportados: PDF</p>
                           <p>Tamaño máximo: 10MB</p>
                        </div>
                     </div>
                  )}
               </div>
            </div>
         </div>

         {/* Supported Documents Info */}
         <div className="bg-white/40 shadow-sm backdrop-blur-sm p-6 border border-white/50 rounded-2xl">
            <h3 className="flex items-center gap-2 mb-4 font-semibold text-gray-800 text-lg">
               <FileText className="text-blue-500" size={20} />
               Tipos de Documentos Soportados
            </h3>
            <div className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
               {[
                  {
                     type: 'Historia Clínica',
                     description: 'Expedientes médicos completos'
                  },
                  {
                     type: 'Resultados de Laboratorio',
                     description: 'Análisis clínicos y bioquímicos'
                  },
                  {
                     type: 'Recetas Médicas',
                     description: 'Prescripciones y medicamentos'
                  },
                  {
                     type: 'Reportes de Imagen',
                     description: 'Radiografías, ultrasonidos, etc.'
                  }
               ].map((doc, index) => (
                  <div key={index} className="bg-white/50 p-4 border border-white/30 rounded-lg">
                     <h4 className="font-medium text-gray-800 text-sm">{doc.type}</h4>
                     <p className="mt-1 text-gray-600 text-xs">{doc.description}</p>
                  </div>
               ))}
            </div>
         </div>
      </div>
   );
}
