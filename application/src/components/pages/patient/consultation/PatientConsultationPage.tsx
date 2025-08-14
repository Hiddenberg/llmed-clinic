'use client';

import {
   Video, VideoOff, Mic, MicOff, Phone, PhoneOff,
   Clock, User, Calendar, Heart, Activity,
   MessageSquare, HelpCircle, Settings, Volume2, VolumeX,
   Maximize, Minimize, RotateCcw, Camera, CameraOff,
   Shield, CheckCircle, AlertCircle, Info, ArrowLeft, Home
} from 'lucide-react';
import { useState, useEffect } from 'react';

interface PatientConsultationPageProps {
   consultationId: string;
}

function VideoCallInterface () {
   const [isVideoOn, setIsVideoOn] = useState(true);
   const [isAudioOn, setIsAudioOn] = useState(true);
   const [isFullscreen, setIsFullscreen] = useState(false);
   const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'disconnected'>('connecting');
   const [callDuration, setCallDuration] = useState(0);

   useEffect(() => {
      // Simulate connection process
      const timer = setTimeout(() => {
         setConnectionStatus('connected');
      }, 3000);

      return () => clearTimeout(timer);
   }, []);

   useEffect(() => {
      // Call duration timer
      let interval: NodeJS.Timeout;
      if (connectionStatus === 'connected') {
         interval = setInterval(() => {
            setCallDuration(prev => prev + 1);
         }, 1000);
      }

      return () => {
         if (interval) clearInterval(interval);
      };
   }, [connectionStatus]);

   const formatDuration = (seconds: number) => {
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${mins.toString()
         .padStart(2, '0')}:${secs.toString()
         .padStart(2, '0')}`;
   };

   const handleEndCall = () => {
      setConnectionStatus('disconnected');
      // Show confirmation dialog
      setTimeout(() => {
         const shouldReturn = confirm('Consulta finalizada. ¿Desea regresar a su página principal?');
         if (shouldReturn) {
            window.location.href = '/patient';
         }
      }, 1000);
   };

   return (
      <div className={`relative bg-gray-900 rounded-lg overflow-hidden ${
         isFullscreen ? 'fixed inset-0 z-50 rounded-none' : 'h-96'
      }`}
      >
         {/* Video Area */}
         <div className="relative w-full h-full">
            {/* Doctor's Video (Main) */}
            <div className="flex justify-center items-center bg-gradient-to-br from-blue-900 to-blue-700 w-full h-full">
               {connectionStatus === 'connecting' && (
                  <div className="text-white text-center">
                     <div className="mx-auto mb-4 border-4 border-white border-t-transparent rounded-full w-12 h-12 animate-spin" />
                     <p className="font-medium text-lg">Conectando con el doctor...</p>
                     <p className="opacity-75 text-sm">Por favor espere</p>
                  </div>
               )}

               {connectionStatus === 'connected' && (
                  <div className="text-white text-center">
                     <div className="flex justify-center items-center bg-white/20 mx-auto mb-4 rounded-full w-24 h-24">
                        <User size={48} />
                     </div>
                     <p className="font-medium text-xl">Dr. Carlos Ruiz</p>
                     <p className="opacity-75 text-sm">Nefrología</p>
                  </div>
               )}

               {connectionStatus === 'disconnected' && (
                  <div className="text-white text-center">
                     <PhoneOff size={48} className="opacity-50 mx-auto mb-4" />
                     <p className="font-medium text-lg">Consulta finalizada</p>
                  </div>
               )}
            </div>

            {/* Patient's Video (Picture-in-Picture) */}
            {connectionStatus === 'connected' && (
               <div className="top-4 right-4 absolute bg-gray-800 border-2 border-white/20 rounded-lg w-32 h-24 overflow-hidden">
                  {isVideoOn ? (
                     <div className="flex justify-center items-center bg-gradient-to-br from-green-900 to-green-700 w-full h-full">
                        <User size={24} className="text-white" />
                     </div>
                  ) : (
                     <div className="flex justify-center items-center bg-gray-700 w-full h-full">
                        <CameraOff size={20} className="text-gray-400" />
                     </div>
                  )}
               </div>
            )}

            {/* Connection Status */}
            <div className="top-4 left-4 absolute">
               <div className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium ${
                  connectionStatus === 'connected'
                     ? 'bg-green-600 text-white'
                     : connectionStatus === 'connecting'
                        ? 'bg-yellow-600 text-white'
                        : 'bg-red-600 text-white'
               }`}
               >
                  <div className={`w-2 h-2 rounded-full ${
                     connectionStatus === 'connected' ? 'bg-white animate-pulse' : 'bg-white/60'
                  }`}
                  />
                  {connectionStatus === 'connected' && `En vivo • ${formatDuration(callDuration)}`}
                  {connectionStatus === 'connecting' && 'Conectando...'}
                  {connectionStatus === 'disconnected' && 'Desconectado'}
               </div>
            </div>

            {/* Controls */}
            {connectionStatus !== 'disconnected' && (
               <div className="bottom-4 left-1/2 absolute -translate-x-1/2 transform">
                  <div className="flex items-center gap-2 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full">
                     <button
                        onClick={() => setIsVideoOn(!isVideoOn)}
                        className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                           isVideoOn ? 'bg-gray-600 hover:bg-gray-700' : 'bg-red-600 hover:bg-red-700'
                        }`}
                     >
                        {isVideoOn ? <Video size={20} className="text-white" /> : <VideoOff size={20} className="text-white" />}
                     </button>

                     <button
                        onClick={() => setIsAudioOn(!isAudioOn)}
                        className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                           isAudioOn ? 'bg-gray-600 hover:bg-gray-700' : 'bg-red-600 hover:bg-red-700'
                        }`}
                     >
                        {isAudioOn ? <Mic size={20} className="text-white" /> : <MicOff size={20} className="text-white" />}
                     </button>

                     <button
                        onClick={handleEndCall}
                        className="flex justify-center items-center bg-red-600 hover:bg-red-700 rounded-full w-12 h-12 transition-colors"
                     >
                        <PhoneOff size={20} className="text-white" />
                     </button>

                     <button
                        onClick={() => setIsFullscreen(!isFullscreen)}
                        className="flex justify-center items-center bg-gray-600 hover:bg-gray-700 rounded-full w-12 h-12 transition-colors"
                     >
                        {isFullscreen ? <Minimize size={20} className="text-white" /> : <Maximize size={20} className="text-white" />}
                     </button>
                  </div>
               </div>
            )}
         </div>
      </div>
   );
}

function ConsultationInfo () {
   const consultationData = {
      doctor: 'Dr. Carlos Ruiz',
      specialty: 'Nefrología',
      date: new Date()
         .toLocaleDateString('es-ES', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
         }),
      time: '14:30',
      type: 'Consulta de seguimiento',
      duration: '30 minutos'
   };

   return (
      <div className="bg-white p-6 border border-gray-200 rounded-lg">
         <h3 className="mb-4 font-semibold text-gray-900 text-lg">Información de la Consulta</h3>

         <div className="space-y-4">
            <div className="flex items-center gap-3">
               <div className="flex justify-center items-center bg-blue-100 rounded-full w-10 h-10">
                  <User size={20} className="text-blue-600" />
               </div>
               <div>
                  <p className="font-medium text-gray-900">{consultationData.doctor}</p>
                  <p className="text-gray-600 text-sm">{consultationData.specialty}</p>
               </div>
            </div>

            <div className="flex items-center gap-3">
               <div className="flex justify-center items-center bg-green-100 rounded-full w-10 h-10">
                  <Calendar size={20} className="text-green-600" />
               </div>
               <div>
                  <p className="font-medium text-gray-900">{consultationData.date}</p>
                  <p className="text-gray-600 text-sm">{consultationData.time} • {consultationData.duration}</p>
               </div>
            </div>

            <div className="flex items-center gap-3">
               <div className="flex justify-center items-center bg-purple-100 rounded-full w-10 h-10">
                  <Activity size={20} className="text-purple-600" />
               </div>
               <div>
                  <p className="font-medium text-gray-900">{consultationData.type}</p>
                  <p className="text-gray-600 text-sm">Seguimiento de tratamiento</p>
               </div>
            </div>
         </div>
      </div>
   );
}

function PatientInstructions () {
   const instructions = [
      {
         icon: Video,
         title: 'Mantenga su cámara encendida',
         description: 'Esto ayuda al doctor a realizar una mejor evaluación visual'
      },
      {
         icon: Mic,
         title: 'Hable con claridad',
         description: 'Asegúrese de que su micrófono esté activado y hable claramente'
      },
      {
         icon: Shield,
         title: 'Privacidad garantizada',
         description: 'Esta consulta es completamente privada y segura'
      },
      {
         icon: HelpCircle,
         title: 'Haga todas sus preguntas',
         description: 'No dude en consultar cualquier duda sobre su tratamiento'
      }
   ];

   return (
      <div className="bg-white p-6 border border-gray-200 rounded-lg">
         <h3 className="mb-4 font-semibold text-gray-900 text-lg">Instrucciones para la Consulta</h3>

         <div className="space-y-4">
            {instructions.map((instruction, index) => (
               <div key={index} className="flex items-start gap-3">
                  <div className="flex flex-shrink-0 justify-center items-center bg-blue-100 mt-1 rounded-full w-8 h-8">
                     <instruction.icon size={16} className="text-blue-600" />
                  </div>
                  <div>
                     <h4 className="font-medium text-gray-900">{instruction.title}</h4>
                     <p className="text-gray-600 text-sm">{instruction.description}</p>
                  </div>
               </div>
            ))}
         </div>
      </div>
   );
}

// function TechnicalSupport () {
//    const [showSupport, setShowSupport] = useState(false);

//    const troubleshootingTips = [
//       'Verifique su conexión a internet',
//       'Reinicie su navegador si experimenta problemas',
//       'Asegúrese de permitir acceso a cámara y micrófono',
//       'Use audífonos para mejor calidad de audio'
//    ];

//    return (
//       <div className="bg-white p-6 border border-gray-200 rounded-lg">
//          <div className="flex justify-between items-center mb-4">
//             <h3 className="font-semibold text-gray-900 text-lg">Soporte Técnico</h3>
//             <button
//                onClick={() => setShowSupport(!showSupport)}
//                className="font-medium text-blue-600 hover:text-blue-700 text-sm"
//             >
//                {showSupport ? 'Ocultar' : 'Ver ayuda'}
//             </button>
//          </div>

//          {showSupport && (
//             <div className="space-y-3">
//                <div className="bg-blue-50 p-4 border border-blue-200 rounded-lg">
//                   <div className="flex items-center gap-2 mb-2">
//                      <Info size={16} className="text-blue-600" />
//                      <span className="font-medium text-blue-900">Consejos útiles:</span>
//                   </div>
//                   <ul className="space-y-1 text-blue-800 text-sm">
//                      {troubleshootingTips.map((tip, index) => (
//                         <li key={index} className="flex items-start gap-2">
//                            <span className="mt-1 text-blue-600">•</span>
//                            {tip}
//                         </li>
//                      ))}
//                   </ul>
//                </div>

//                <div className="flex items-center gap-2 bg-green-50 p-3 border border-green-200 rounded-lg">
//                   <CheckCircle size={16} className="text-green-600" />
//                   <span className="text-green-800 text-sm">
//                      ¿Necesita ayuda inmediata? Llame al: <strong>(555) 123-4567</strong>
//                   </span>
//                </div>
//             </div>
//          )}
//       </div>
//    );
// }

// function QuickActions () {
//    const actions = [
//       {
//          icon: MessageSquare,
//          label: 'Chat',
//          action: () => alert('Función de chat próximamente disponible'),
//          color: 'bg-blue-600 hover:bg-blue-700'
//       },
//       {
//          icon: Settings,
//          label: 'Configuración',
//          action: () => alert('Configuración de audio/video'),
//          color: 'bg-gray-600 hover:bg-gray-700'
//       },
//       {
//          icon: HelpCircle,
//          label: 'Ayuda',
//          action: () => alert('Centro de ayuda próximamente'),
//          color: 'bg-green-600 hover:bg-green-700'
//       }
//    ];

//    return (
//       <div className="bg-white p-6 border border-gray-200 rounded-lg">
//          <h3 className="mb-4 font-semibold text-gray-900 text-lg">Acciones Rápidas</h3>

//          <div className="gap-3 grid grid-cols-3">
//             {actions.map((action, index) => (
//                <button
//                   key={index}
//                   onClick={action.action}
//                   className={`flex flex-col items-center gap-2 p-4 rounded-lg text-white transition-colors ${action.color}`}
//                >
//                   <action.icon size={20} />
//                   <span className="font-medium text-sm">{action.label}</span>
//                </button>
//             ))}
//          </div>
//       </div>
//    );
// }

export default function PatientConsultationPage ({ consultationId }: PatientConsultationPageProps) {
   const [isJoined, setIsJoined] = useState(false);
   const [showExitConfirm, setShowExitConfirm] = useState(false);

   const handleJoinCall = () => {
      setIsJoined(true);
   };

   const handleExitConsultation = () => {
      setShowExitConfirm(true);
   };

   const confirmExit = () => {
      window.location.href = '/patient';
   };

   const cancelExit = () => {
      setShowExitConfirm(false);
   };

   if (!isJoined) {
      return (
         <div className="flex justify-center items-center bg-gray-50 min-h-screen">
            <div className="mx-4 w-full max-w-md">
               <div className="relative bg-white p-8 border border-gray-200 rounded-lg text-center">
                  {/* Back Button */}
                  <button
                     onClick={() => window.location.href = '/patient'}
                     className="top-4 left-4 absolute flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
                  >
                     <ArrowLeft size={20} />
                     <span className="font-medium text-sm">Volver</span>
                  </button>

                  <div className="flex justify-center items-center bg-blue-100 mx-auto mb-6 rounded-full w-20 h-20">
                     <Video size={40} className="text-blue-600" />
                  </div>

                  <h1 className="mb-2 font-bold text-gray-900 text-2xl">
                     Consulta por Video Llamada
                  </h1>

                  <p className="mb-6 text-gray-600">
                     Su doctor la está esperando. Haga clic en el botón para unirse a la consulta.
                  </p>

                  <div className="space-y-4 mb-6">
                     <div className="flex items-center gap-3 bg-blue-50 p-3 rounded-lg">
                        <CheckCircle size={16} className="text-blue-600" />
                        <span className="text-blue-800 text-sm">Cámara y micrófono listos</span>
                     </div>
                     <div className="flex items-center gap-3 bg-green-50 p-3 rounded-lg">
                        <CheckCircle size={16} className="text-green-600" />
                        <span className="text-green-800 text-sm">Conexión estable detectada</span>
                     </div>
                  </div>

                  <button
                     onClick={handleJoinCall}
                     className="flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg w-full font-medium text-white transition-colors"
                  >
                     <Video size={20} />
                     Unirse a la Consulta
                  </button>

                  <p className="mt-4 text-gray-500 text-xs">
                     ID de Consulta: {consultationId}
                  </p>
               </div>
            </div>
         </div>
      );
   }

   return (
      <div className="bg-gray-50 min-h-screen">
         {/* Header */}
         <div className="bg-white border-gray-200 border-b">
            <div className="mx-auto px-6 py-4 max-w-7xl">
               <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                     <button
                        onClick={handleExitConsultation}
                        className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
                     >
                        <ArrowLeft size={20} />
                        <span className="font-medium text-sm">Salir</span>
                     </button>
                     <div className="bg-gray-300 w-px h-6" />
                     <div>
                        <h1 className="font-bold text-gray-900 text-xl">Video Consulta</h1>
                        <p className="text-gray-600 text-sm">LLMed Clinic • Consulta Segura</p>
                     </div>
                  </div>
                  <div className="flex items-center gap-4">
                     <div className="flex items-center gap-2">
                        <div className="bg-green-500 rounded-full w-3 h-3 animate-pulse" />
                        <span className="font-medium text-green-600 text-sm">En línea</span>
                     </div>
                     <button
                        onClick={() => window.location.href = '/patient'}
                        className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg text-gray-700 transition-colors"
                     >
                        <Home size={16} />
                        <span className="font-medium text-sm">Inicio</span>
                     </button>
                  </div>
               </div>
            </div>
         </div>

         {/* Main Content */}
         <div className="mx-auto px-6 py-8 max-w-7xl">
            <div className="gap-6 grid grid-cols-1 lg:grid-cols-3">
               {/* Video Call - Main Area */}
               <div className="lg:col-span-2">
                  <VideoCallInterface />
               </div>

               {/* Sidebar */}
               <div className="space-y-6">
                  <ConsultationInfo />
                  <PatientInstructions />
                  {/* <TechnicalSupport /> */}
                  {/* <QuickActions /> */}
               </div>
            </div>
         </div>

         {/* Exit Confirmation Modal */}
         {showExitConfirm && (
            <div className="z-50 fixed inset-0 flex justify-center items-center bg-black/50">
               <div className="bg-white mx-4 p-6 rounded-lg max-w-md">
                  <div className="flex items-center gap-3 mb-4">
                     <div className="flex justify-center items-center bg-yellow-100 rounded-full w-12 h-12">
                        <AlertCircle size={24} className="text-yellow-600" />
                     </div>
                     <div>
                        <h3 className="font-semibold text-gray-900 text-lg">
                           ¿Salir de la consulta?
                        </h3>
                        <p className="text-gray-600 text-sm">
                           Se desconectará de la video llamada
                        </p>
                     </div>
                  </div>

                  <p className="mb-6 text-gray-700">
                     ¿Está seguro de que desea salir de la consulta? Podrá regresar desde su página principal si la consulta sigue activa.
                  </p>

                  <div className="flex gap-3">
                     <button
                        onClick={cancelExit}
                        className="flex-1 hover:bg-gray-50 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 transition-colors"
                     >
                        Cancelar
                     </button>
                     <button
                        onClick={confirmExit}
                        className="flex-1 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-white transition-colors"
                     >
                        Salir de la Consulta
                     </button>
                  </div>
               </div>
            </div>
         )}
      </div>
   );
}
