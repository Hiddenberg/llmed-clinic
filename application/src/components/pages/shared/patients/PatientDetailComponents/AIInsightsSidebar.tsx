import {
   Brain, AlertTriangle, TrendingUp, Pill, Activity,
   CheckCircle, Clock, Eye, Star, Target
} from 'lucide-react';
import { AIInsight } from '@/data/mockData/patientDetailData';

interface AIInsightsSidebarProps {
   insights: AIInsight[];
}

function InsightCard ({ insight }: { insight: AIInsight }) {
   const getPriorityConfig = (priority: AIInsight['priority']) => {
      switch (priority) {
         case 'critical':
            return {
               color: 'bg-red-50 border-red-200',
               textColor: 'text-red-800',
               badgeColor: 'bg-red-500',
               icon: <AlertTriangle size={16} className="text-red-500" />
            };
         case 'high':
            return {
               color: 'bg-orange-50 border-orange-200',
               textColor: 'text-orange-800',
               badgeColor: 'bg-orange-500',
               icon: <AlertTriangle size={16} className="text-orange-500" />
            };
         case 'medium':
            return {
               color: 'bg-yellow-50 border-yellow-200',
               textColor: 'text-yellow-800',
               badgeColor: 'bg-yellow-500',
               icon: <Clock size={16} className="text-yellow-600" />
            };
         case 'low':
            return {
               color: 'bg-green-50 border-green-200',
               textColor: 'text-green-800',
               badgeColor: 'bg-green-500',
               icon: <CheckCircle size={16} className="text-green-500" />
            };
      }
   };

   const getCategoryIcon = (category: AIInsight['category']) => {
      switch (category) {
         case 'risk_assessment':
            return <AlertTriangle size={16} className="text-red-500" />;
         case 'treatment_optimization':
            return <Target size={16} className="text-blue-500" />;
         case 'medication_alert':
            return <Pill size={16} className="text-purple-500" />;
         case 'trend_analysis':
            return <TrendingUp size={16} className="text-green-500" />;
         case 'recommendation':
            return <Star size={16} className="text-yellow-500" />;
         default:
            return <Activity size={16} className="text-gray-500" />;
      }
   };

   const config = getPriorityConfig(insight.priority);

   return (
      <div className={`p-4 rounded-lg border ${config.color} mb-4`}>
         <div className="flex justify-between items-start mb-3">
            <div className="flex items-center gap-2">
               {getCategoryIcon(insight.category)}
               <span className="font-medium text-gray-900 text-sm">{insight.title}</span>
            </div>
            <div className="flex items-center gap-2">
               <div className={`w-2 h-2 rounded-full ${config.badgeColor}`} />
               <span className={`text-xs font-medium ${config.textColor} capitalize`}>
                  {insight.priority}
               </span>
            </div>
         </div>

         <p className="mb-3 text-gray-700 text-sm">{insight.description}</p>

         <div className="bg-white/50 mb-3 p-3 rounded-md">
            <h5 className="flex items-center gap-2 mb-2 font-medium text-gray-800 text-sm">
               <Target size={14} />
               Recomendación
            </h5>
            <p className="text-gray-700 text-sm">{insight.recommendation}</p>
         </div>

         {/* Confidence and Based On */}
         <div className="space-y-2 text-xs">
            <div className="flex justify-between items-center">
               <span className="text-gray-600">Confianza:</span>
               <div className="flex items-center gap-2">
                  <div className="bg-gray-200 rounded-full w-12 h-2 overflow-hidden">
                     <div
                        className="bg-brand-500 rounded-full h-full transition-all duration-300"
                        style={{
                           width: `${insight.confidence}%`
                        }}
                     />
                  </div>
                  <span className="font-medium text-gray-800">{insight.confidence}%</span>
               </div>
            </div>

            <div>
               <span className="text-gray-600">Basado en:</span>
               <div className="flex flex-wrap gap-1 mt-1">
                  {insight.basedOn.slice(0, 2)
                     .map((item, index) => (
                        <span key={index} className="bg-gray-100 px-2 py-0.5 rounded text-gray-700 text-xs">
                           {item}
                        </span>
                     ))}
                  {insight.basedOn.length > 2 && (
                     <span className="text-gray-500">+{insight.basedOn.length - 2} más</span>
                  )}
               </div>
            </div>
         </div>

         {/* Review Status */}
         <div className="flex justify-between items-center mt-3 pt-3 border-gray-200 border-t">
            <div className="flex items-center gap-2 text-xs">
               {insight.reviewed ? (
                  <>
                     <CheckCircle size={12} className="text-green-500" />
                     <span className="text-green-600">Revisado por {insight.reviewedBy}</span>
                  </>
               ) : (
                  <>
                     <Eye size={12} className="text-gray-400" />
                     <span className="text-gray-500">Pendiente de revisión</span>
                  </>
               )}
            </div>
            <span className="text-gray-400 text-xs">
               {new Date(insight.generatedAt)
                  .toLocaleDateString('es-ES')}
            </span>
         </div>
      </div>
   );
}

export default function AIInsightsSidebar ({ insights }: AIInsightsSidebarProps) {
   const sortedInsights = insights.sort((a, b) => {
      const priorityOrder = {
         critical: 4,
         high: 3,
         medium: 2,
         low: 1
      };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
   });

   const unreviewed = insights.filter(insight => !insight.reviewed).length;
   const highPriority = insights.filter(insight => insight.priority === 'high' || insight.priority === 'critical').length;

   return (
      <div className="bg-white/40 shadow-sm backdrop-blur-sm border border-white/50 rounded-2xl overflow-hidden">
         <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 text-white">
            <div className="flex items-center gap-3 mb-2">
               <div className="flex justify-center items-center bg-white/20 rounded-lg w-10 h-10">
                  <Brain size={20} />
               </div>
               <div>
                  <h3 className="font-semibold text-lg">Insights de IA</h3>
                  <p className="text-purple-100 text-sm">Análisis inteligente</p>
               </div>
            </div>

            <div className="flex justify-between items-center mt-4 pt-3 border-purple-300/30 border-t">
               <div className="text-center">
                  <div className="font-bold text-xl">{insights.length}</div>
                  <div className="text-purple-100 text-xs">Total</div>
               </div>
               <div className="text-center">
                  <div className="font-bold text-xl">{unreviewed}</div>
                  <div className="text-purple-100 text-xs">Sin revisar</div>
               </div>
               <div className="text-center">
                  <div className="font-bold text-xl">{highPriority}</div>
                  <div className="text-purple-100 text-xs">Alta prioridad</div>
               </div>
            </div>
         </div>

         <div className="p-4 max-h-[calc(100vh-300px)] overflow-y-auto scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-300">
            {sortedInsights.length > 0 ? (
               sortedInsights.map((insight) => (
                  <InsightCard key={insight.id} insight={insight} />
               ))
            ) : (
               <div className="py-8 text-center">
                  <Brain size={48} className="mx-auto mb-4 text-gray-300" />
                  <p className="text-gray-500 text-sm">No hay insights disponibles</p>
               </div>
            )}
         </div>

         {/* Footer Actions */}
         {/* <div className="flex gap-2 bg-gray-50/50 p-4 border-gray-200/50 border-t">
            <button className="flex flex-1 justify-center items-center gap-2 bg-brand-500 hover:bg-brand-600 px-3 py-2 rounded-lg text-white text-sm transition-colors">
               <Eye size={14} />
               Revisar Todo
            </button>
            <button className="flex justify-center items-center gap-2 bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg text-gray-700 text-sm transition-colors">
               <Brain size={14} />
               Generar Nuevo
            </button>
         </div> */}
      </div>
   );
}
