import {
   Brain, AlertTriangle, Pill, Activity, HelpCircle,
   Target, Shield, TrendingUp, Eye, CheckCircle,
   Clock, Star, Lightbulb, Loader, FileText, X
} from 'lucide-react';
import { useState } from 'react';
import { AIConsultationSuggestion } from '@/data/mockData/consultationData';

interface AIConsultationAssistantProps {
   suggestions: AIConsultationSuggestion[];
}

function SuggestionCard ({
   suggestion, onDismiss
}: {
   suggestion: AIConsultationSuggestion;
   onDismiss: (id: string) => void;
}) {
   const getPriorityConfig = (priority: AIConsultationSuggestion['priority']) => {
      switch (priority) {
         case 'critical':
            return {
               color: 'border-red-200 bg-red-50',
               textColor: 'text-red-800',
               badgeColor: 'bg-red-500',
               icon: <AlertTriangle size={16} className="text-red-500" />
            };
         case 'high':
            return {
               color: 'border-orange-200 bg-orange-50',
               textColor: 'text-orange-800',
               badgeColor: 'bg-orange-500',
               icon: <AlertTriangle size={16} className="text-orange-500" />
            };
         case 'medium':
            return {
               color: 'border-yellow-200 bg-yellow-50',
               textColor: 'text-yellow-800',
               badgeColor: 'bg-yellow-500',
               icon: <Clock size={16} className="text-yellow-600" />
            };
         case 'low':
            return {
               color: 'border-blue-200 bg-blue-50',
               textColor: 'text-blue-800',
               badgeColor: 'bg-blue-500',
               icon: <Lightbulb size={16} className="text-blue-500" />
            };
      }
   };

   const getTypeIcon = (type: AIConsultationSuggestion['type']) => {
      switch (type) {
         case 'medication_alert':
            return <Pill size={18} className="text-red-500" />;
         case 'vital_concern':
            return <Activity size={18} className="text-orange-500" />;
         case 'question_suggestion':
            return <HelpCircle size={18} className="text-blue-500" />;
         case 'treatment_recommendation':
            return <Target size={18} className="text-green-500" />;
         case 'risk_warning':
            return <Shield size={18} className="text-red-500" />;
      }
   };

   const getCategoryColor = (category: AIConsultationSuggestion['category']) => {
      switch (category) {
         case 'safety':
            return 'bg-red-100 text-red-700';
         case 'optimization':
            return 'bg-green-100 text-green-700';
         case 'monitoring':
            return 'bg-yellow-100 text-yellow-700';
         case 'education':
            return 'bg-blue-100 text-blue-700';
      }
   };

   const config = getPriorityConfig(suggestion.priority);

   return (
      <div className={`!rounded-xl !border-2 !p-4 ${config.color} !transition-all hover:!shadow-md`}>
         <div className="!flex !justify-between !items-start !mb-3">
            <div className="!flex !items-center !gap-2">
               {getTypeIcon(suggestion.type)}
               <span className={`text-xs px-2 py-1 rounded-full font-medium ${getCategoryColor(suggestion.category)}`}>
                  {suggestion.category}
               </span>
            </div>
            <div className="!flex !items-center !gap-2">
               <div className={`w-2 h-2 rounded-full ${config.badgeColor}`} />
               <button
                  onClick={() => onDismiss(suggestion.id)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
               >
                  <CheckCircle size={16} />
               </button>
            </div>
         </div>

         <h4 className={`font-semibold mb-2 ${config.textColor}`}>
            {suggestion.title}
         </h4>

         <p className={`text-sm ${config.textColor} opacity-90 mb-3`}>
            {suggestion.description}
         </p>

         {suggestion.relatedData && (
            <div className="bg-white bg-opacity-50 p-2 rounded-lg text-gray-600 text-xs">
               {suggestion.relatedData.medication && (
                  <span className="font-medium">Medicamento: {suggestion.relatedData.medication}</span>
               )}
               {suggestion.relatedData.vitalSign && (
                  <span className="font-medium">Signo vital: {suggestion.relatedData.vitalSign}</span>
               )}
               {suggestion.relatedData.labValue && (
                  <span className="font-medium">Laboratorio: {suggestion.relatedData.labValue}</span>
               )}
            </div>
         )}
      </div>
   );
}

function QuickInsights () {
   const insights = [
      {
         icon: TrendingUp,
         title: 'Progreso General',
         value: 'Estable',
         color: 'text-green-600 bg-green-100'
      },
      {
         icon: Eye,
         title: 'Puntos de Atención',
         value: '3',
         color: 'text-yellow-600 bg-yellow-100'
      },
      {
         icon: Star,
         title: 'Adherencia',
         value: '85%',
         color: 'text-blue-600 bg-blue-100'
      }
   ];

   return (
      <div className="!gap-3 !grid !grid-cols-1">
         {insights.map((insight, index) => (
            <div key={index} className="bg-white p-3 border border-gray-200 rounded-lg">
               <div className="flex justify-between items-center">
                  <div className="!flex !items-center !gap-2">
                     <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${insight.color}`}>
                        <insight.icon size={16} />
                     </div>
                     <span className="font-medium text-gray-900 text-sm">{insight.title}</span>
                  </div>
                  <span className="font-bold text-gray-900 text-sm">{insight.value}</span>
               </div>
            </div>
         ))}
      </div>
   );
}

function AIActions ({
   onGenerateSummary,
   onSuggestPlan,
   isGeneratingSummary,
   isGeneratingPlan,
   generatedSummary,
   generatedPlan,
   onClearSummary,
   onClearPlan
}: {
   onGenerateSummary: () => void;
   onSuggestPlan: () => void;
   isGeneratingSummary: boolean;
   isGeneratingPlan: boolean;
   generatedSummary: string | null;
   generatedPlan: string[] | null;
   onClearSummary: () => void;
   onClearPlan: () => void;
}) {
   return (
      <div className="space-y-4">
         {/* Generate Summary Button */}
         <button
            onClick={onGenerateSummary}
            disabled={isGeneratingSummary}
            className={`flex items-center gap-3 p-3 border rounded-lg w-full text-left transition-all duration-300 ${
               isGeneratingSummary
                  ? 'border-purple-300 bg-purple-50 cursor-not-allowed'
                  : 'border-gray-200 hover:bg-gray-50 hover:border-purple-200'
            }`}
         >
            <div className={`flex justify-center items-center rounded-lg w-8 h-8 transition-all duration-300 ${
               isGeneratingSummary ? 'bg-purple-200' : 'bg-purple-100'
            }`}
            >
               {isGeneratingSummary ? (
                  <Loader size={16} className="text-purple-600 animate-spin" />
               ) : (
                  <Brain size={16} className="text-purple-600" />
               )}
            </div>
            <div className="flex-1">
               <p className="font-medium text-gray-900 text-sm">
                  {isGeneratingSummary ? 'Generando Resumen...' : 'Generar Resumen'}
               </p>
               <p className="text-gray-500 text-xs">
                  {isGeneratingSummary ? (
                     <span className="flex items-center gap-1">
                        Analizando datos de la consulta
                        <span className="animate-pulse">●</span>
                     </span>
                  ) : (
                     'Resumen automático de la consulta'
                  )}
               </p>
            </div>
         </button>

         {/* Generated Summary Display */}
         {generatedSummary && (
            <div className="bg-purple-50 slide-in-from-top-2 p-4 border border-purple-200 rounded-lg animate-in duration-500">
               <div className="!flex !justify-between !items-start !mb-3">
                  <div className="!flex !items-center !gap-2">
                     <div className="flex justify-center items-center bg-purple-100 rounded-full w-6 h-6">
                        <FileText size={12} className="text-purple-600" />
                     </div>
                     <h4 className="font-medium text-purple-900 text-sm">Resumen Generado por IA</h4>
                     <span className="bg-purple-200 px-2 py-0.5 rounded-full font-medium text-purple-700 text-xs">
                        Nuevo
                     </span>
                  </div>
                  <button
                     onClick={onClearSummary}
                     className="text-purple-400 hover:text-purple-600 transition-colors"
                  >
                     <X size={14} />
                  </button>
               </div>
               <div className="text-purple-800 text-sm leading-relaxed whitespace-pre-line">
                  {generatedSummary}
               </div>
               <div className="mt-3 pt-3 border-purple-200 border-t">
                  <p className="flex items-center gap-1 text-purple-600 text-xs">
                     <Brain size={10} />
                     Generado automáticamente • {new Date()
                        .toLocaleTimeString('es-ES', {
                           hour: '2-digit',
                           minute: '2-digit'
                        })}
                  </p>
               </div>
            </div>
         )}

         {/* Suggest Plan Button */}
         <button
            onClick={onSuggestPlan}
            disabled={isGeneratingPlan}
            className={`flex items-center gap-3 p-3 border rounded-lg w-full text-left transition-all duration-300 ${
               isGeneratingPlan
                  ? 'border-green-300 bg-green-50 cursor-not-allowed'
                  : 'border-gray-200 hover:bg-gray-50 hover:border-green-200'
            }`}
         >
            <div className={`flex justify-center items-center rounded-lg w-8 h-8 transition-all duration-300 ${
               isGeneratingPlan ? 'bg-green-200' : 'bg-green-100'
            }`}
            >
               {isGeneratingPlan ? (
                  <Loader size={16} className="text-green-600 animate-spin" />
               ) : (
                  <Target size={16} className="text-green-600" />
               )}
            </div>
            <div className="flex-1">
               <p className="font-medium text-gray-900 text-sm">
                  {isGeneratingPlan ? 'Generando Plan...' : 'Sugerir Plan'}
               </p>
               <p className="text-gray-500 text-xs">
                  {isGeneratingPlan ? (
                     <span className="flex items-center gap-1">
                        Optimizando recomendaciones
                        <span className="animate-pulse">●</span>
                     </span>
                  ) : (
                     'Plan de tratamiento optimizado'
                  )}
               </p>
            </div>
         </button>

         {/* Generated Plan Display */}
         {generatedPlan && (
            <div className="bg-green-50 slide-in-from-top-2 p-4 border border-green-200 rounded-lg animate-in duration-500">
               <div className="!flex !justify-between !items-start !mb-3">
                  <div className="!flex !items-center !gap-2">
                     <div className="flex justify-center items-center bg-green-100 rounded-full w-6 h-6">
                        <Target size={12} className="text-green-600" />
                     </div>
                     <h4 className="font-medium text-green-900 text-sm">Plan de Tratamiento Sugerido</h4>
                     <span className="bg-green-200 px-2 py-0.5 rounded-full font-medium text-green-700 text-xs">
                        Nuevo
                     </span>
                  </div>
                  <button
                     onClick={onClearPlan}
                     className="text-green-400 hover:text-green-600 transition-colors"
                  >
                     <X size={14} />
                  </button>
               </div>
               <div className="space-y-2">
                  {generatedPlan.map((item, index) => (
                     <div key={index} className="flex items-start gap-3 bg-white bg-opacity-50 p-2 rounded-lg text-green-800 text-sm">
                        <span className="mt-0.5 w-5 font-bold text-green-600 text-center">{index + 1}</span>
                        <span className="flex-1 leading-relaxed">{item}</span>
                     </div>
                  ))}
               </div>
               <div className="mt-3 pt-3 border-green-200 border-t">
                  <p className="flex items-center gap-1 text-green-600 text-xs">
                     <Brain size={10} />
                     Optimizado por IA • {new Date()
                        .toLocaleTimeString('es-ES', {
                           hour: '2-digit',
                           minute: '2-digit'
                        })}
                  </p>
               </div>
            </div>
         )}
      </div>
   );
}

export default function AIConsultationAssistant ({ suggestions }: AIConsultationAssistantProps) {
   const [activeSuggestions, setActiveSuggestions] = useState(suggestions);
   const [activeTab, setActiveTab] = useState<'suggestions' | 'insights' | 'actions'>('suggestions');
   const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);
   const [isGeneratingPlan, setIsGeneratingPlan] = useState(false);
   const [generatedSummary, setGeneratedSummary] = useState<string | null>(null);
   const [generatedPlan, setGeneratedPlan] = useState<string[] | null>(null);

   const handleDismissSuggestion = (id: string) => {
      setActiveSuggestions(prev => prev.filter(s => s.id !== id));
   };

   const handleGenerateSummary = async () => {
      setIsGeneratingSummary(true);
      setGeneratedSummary(null);

      // Simulate AI processing time
      await new Promise(resolve => setTimeout(resolve, 2500));

      const summary = `**Resumen de Consulta - ${new Date()
         .toLocaleDateString('es-ES')}**

**Estado del Paciente:** Estable, con buena respuesta al tratamiento actual.

**Signos Vitales:** Dentro de parámetros aceptables para el perfil del paciente. Presión arterial ligeramente elevada pero controlada.

**Evolución:** Mejora gradual en adherencia al tratamiento. Paciente reporta mayor bienestar general.

**Observaciones Clínicas:** Sin complicaciones aparentes. Mantiene función renal estable.

**Recomendaciones:** Continuar con protocolo actual, monitoreo semanal de signos vitales.`;

      setGeneratedSummary(summary);
      setIsGeneratingSummary(false);
   };

   const handleSuggestPlan = async () => {
      setIsGeneratingPlan(true);
      setGeneratedPlan(null);

      // Simulate AI processing time
      await new Promise(resolve => setTimeout(resolve, 3000));

      const plan = [
         'Mantener dosis actual de Losartán 50mg (1 vez al día)',
         'Continuar con sesiones de hemodiálisis 3 veces por semana',
         'Monitoreo semanal de presión arterial en casa',
         'Dieta estricta baja en sodio (<2g/día) y fósforo',
         'Ejercicio moderado: caminata 30 minutos, 3 veces por semana',
         'Control de laboratorios en 2 semanas (creatinina, electrolitos)',
         'Próxima consulta médica programada en 7 días',
         'Educación continua sobre adherencia al tratamiento'
      ];

      setGeneratedPlan(plan);
      setIsGeneratingPlan(false);
   };

   const criticalSuggestions = activeSuggestions.filter(s => s.priority === 'critical');
   const otherSuggestions = activeSuggestions.filter(s => s.priority !== 'critical');

   return (
      <div className="!bg-white !border !border-gray-200 !rounded-xl !overflow-hidden">
         {/* Header */}
         <div className="!bg-gradient-to-r !from-purple-600 !to-blue-600 !p-4 !text-white">
            <div className="!flex !items-center !gap-2 !mb-3">
               <Brain size={20} />
               <h3 className="!font-semibold">Asistente IA</h3>
            </div>

            {/* Tabs */}
            <div className="!flex !gap-1 !bg-white !bg-opacity-20 !p-1 !rounded-lg">
               <button
                  onClick={() => setActiveTab('suggestions')}
                  className={`!flex-1 !py-1.5 !px-3 !text-xs !font-medium !rounded !transition-colors ${
                     activeTab === 'suggestions'
                        ? '!text-purple-600 !bg-purple-100'
                        : '!text-purple-400 hover:!bg-purple-200 hover:!bg-opacity-10'
                  }`}
               >
                  Sugerencias
               </button>
               <button
                  onClick={() => setActiveTab('insights')}
                  className={`!flex-1 !py-1.5 !px-3 !text-xs !font-medium !rounded !transition-colors ${
                     activeTab === 'insights'
                        ? '!text-purple-600 !bg-purple-100'
                        : '!text-purple-400 hover:!bg-purple-200 hover:!bg-opacity-10'
                  }`}
               >
                  Insights
               </button>
               <button
                  onClick={() => setActiveTab('actions')}
                  className={`!flex-1 !py-1.5 !px-3 !text-xs !font-medium !rounded !transition-colors ${
                     activeTab === 'actions'
                        ? '!text-purple-600 !bg-purple-100'
                        : '!text-purple-400 hover:!bg-purple-200 hover:!bg-opacity-10'
                  }`}
               >
                  Acciones
               </button>
            </div>
         </div>

         {/* Content */}
         <div className="!p-4">
            {activeTab === 'suggestions' && (
               <div className="space-y-4">
                  {criticalSuggestions.length > 0 && (
                     <div>
                        <div className="!flex !items-center !gap-2 !mb-3">
                           <AlertTriangle size={16} className="text-red-500" />
                           <h4 className="font-semibold text-red-700 text-sm">Crítico</h4>
                        </div>
                        <div className="space-y-3">
                           {criticalSuggestions.map((suggestion) => (
                              <SuggestionCard
                                 key={suggestion.id}
                                 suggestion={suggestion}
                                 onDismiss={handleDismissSuggestion}
                              />
                           ))}
                        </div>
                     </div>
                  )}

                  {otherSuggestions.length > 0 && (
                     <div>
                        {criticalSuggestions.length > 0 && (
                           <div className="!flex !items-center !gap-2 !mb-3">
                              <Lightbulb size={16} className="text-blue-500" />
                              <h4 className="font-semibold text-blue-700 text-sm">Otras Sugerencias</h4>
                           </div>
                        )}
                        <div className="space-y-3">
                           {otherSuggestions.map((suggestion) => (
                              <SuggestionCard
                                 key={suggestion.id}
                                 suggestion={suggestion}
                                 onDismiss={handleDismissSuggestion}
                              />
                           ))}
                        </div>
                     </div>
                  )}

                  {activeSuggestions.length === 0 && (
                     <div className="py-8 text-gray-500 text-center">
                        <Brain size={32} className="opacity-50 mx-auto mb-3" />
                        <p className="text-sm">No hay sugerencias activas</p>
                        <p className="text-xs">El IA está monitoreando la consulta</p>
                     </div>
                  )}
               </div>
            )}

            {activeTab === 'insights' && <QuickInsights />}

            {activeTab === 'actions' && (
            <AIActions
               onGenerateSummary={handleGenerateSummary}
               onSuggestPlan={handleSuggestPlan}
               isGeneratingSummary={isGeneratingSummary}
               isGeneratingPlan={isGeneratingPlan}
               generatedSummary={generatedSummary}
               generatedPlan={generatedPlan}
               onClearSummary={() => setGeneratedSummary(null)}
               onClearPlan={() => setGeneratedPlan(null)}
            />
            )}
         </div>
      </div>
   );
}
