import {
   AlertTriangle, Clock, CheckCircle, X,
   Thermometer, Gauge, Shield, Wrench
} from 'lucide-react';
import { DialysisMachine, EquipmentAlarm } from '@/data/mockData/equipmentData';

interface AlertsPanelProps {
   machines: DialysisMachine[];
}

function AlertItem ({
   alarm,
   machineName,
   machineLocation
}: {
   alarm: EquipmentAlarm;
   machineName: string;
   machineLocation: string;
}) {
   const getCategoryIcon = (category: string) => {
      switch (category) {
         case 'temperature': return Thermometer;
         case 'pressure': return Gauge;
         case 'safety': return Shield;
         case 'system': return Wrench;
         default: return AlertTriangle;
      }
   };

   const getTypeColor = (type: string) => {
      switch (type) {
         case 'critical': return 'border-red-200 bg-red-50 text-red-800';
         case 'warning': return 'border-orange-200 bg-orange-50 text-orange-800';
         case 'info': return 'border-blue-200 bg-blue-50 text-blue-800';
         default: return 'border-gray-200 bg-gray-50 text-gray-800';
      }
   };

   const getTypeIndicator = (type: string) => {
      switch (type) {
         case 'critical': return 'bg-red-500';
         case 'warning': return 'bg-orange-500';
         case 'info': return 'bg-blue-500';
         default: return 'bg-gray-500';
      }
   };

   const CategoryIcon = getCategoryIcon(alarm.category);
   const timeAgo = new Date(alarm.timestamp)
      .toLocaleTimeString('es-MX', {
         hour: '2-digit',
         minute: '2-digit'
      });

   return (
      <div className={`relative p-4 rounded-xl border transition-all hover:shadow-sm ${getTypeColor(alarm.type)}`}>
         <div className="flex items-start gap-3">
            {/* Type indicator */}
            <div className={`w-3 h-3 rounded-full mt-1 ${getTypeIndicator(alarm.type)} animate-pulse`} />

            {/* Category icon */}
            <div className="flex-shrink-0 mt-0.5">
               <CategoryIcon size={16} />
            </div>

            {/* Alert content */}
            <div className="flex-1 min-w-0">
               <div className="flex items-center justify-between mb-1">
                  <h4 className="font-semibold text-sm">{alarm.title}</h4>
                  <div className="flex items-center gap-2 text-xs opacity-75">
                     <Clock size={12} />
                     <span>{timeAgo}</span>
                  </div>
               </div>

               <p className="text-xs opacity-80 mb-2">{alarm.description}</p>

               <div className="flex items-center justify-between">
                  <div className="text-xs">
                     <span className="font-medium">{machineName}</span>
                     <span className="opacity-75"> • {machineLocation}</span>
                  </div>

                  <div className="flex items-center gap-1">
                     {alarm.acknowledged ? (
                        <div className="flex items-center gap-1 bg-green-100 px-2 py-1 rounded text-green-700 text-xs">
                           <CheckCircle size={12} />
                           <span>Reconocida</span>
                        </div>
                     ) : (
                        <button className="flex items-center gap-1 hover:bg-white/50 px-2 py-1 rounded text-xs transition-colors">
                           <CheckCircle size={12} />
                           <span>Reconocer</span>
                        </button>
                     )}
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}

export default function AlertsPanel ({ machines }: AlertsPanelProps) {
   // Get all active alarms from all machines
   const allAlarms = machines
      .filter(machine => machine.alarms.active.length > 0)
      .flatMap(machine =>
         machine.alarms.active.map(alarm => ({
            ...alarm,
            machineName: machine.name,
            machineLocation: `${machine.location.room} - ${machine.location.position}`
         }))
      )
      .sort((a, b) => {
         // Sort by priority: critical first, then by timestamp (newest first)
         if (a.type === 'critical' && b.type !== 'critical') return -1;
         if (b.type === 'critical' && a.type !== 'critical') return 1;
         if (a.type === 'warning' && b.type === 'info') return -1;
         if (b.type === 'warning' && a.type === 'info') return 1;
         return new Date(b.timestamp)
            .getTime() - new Date(a.timestamp)
            .getTime();
      });

   if (allAlarms.length === 0) {
      return (
         <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="flex justify-center items-center bg-green-100 rounded-full w-16 h-16 text-green-600 mb-4">
               <CheckCircle size={24} />
            </div>
            <h3 className="font-semibold text-gray-800 text-lg mb-2">Sin Alertas Activas</h3>
            <p className="text-gray-600 text-sm">Todos los sistemas están funcionando normalmente</p>
         </div>
      );
   }

   const criticalAlarms = allAlarms.filter(alarm => alarm.type === 'critical');
   const warningAlarms = allAlarms.filter(alarm => alarm.type === 'warning');
   const infoAlarms = allAlarms.filter(alarm => alarm.type === 'info');

   return (
      <div className="space-y-4">
         {/* Summary */}
         <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
            <div className="flex items-center gap-2">
               <AlertTriangle size={18} className="text-gray-600" />
               <span className="font-medium text-gray-800">Resumen de Alertas:</span>
            </div>
            <div className="flex items-center gap-4 text-sm">
               {criticalAlarms.length > 0 && (
                  <span className="flex items-center gap-1 text-red-700">
                     <div className="bg-red-500 rounded-full w-2 h-2" />
                     {criticalAlarms.length} Crítica{criticalAlarms.length !== 1 ? 's' : ''}
                  </span>
               )}
               {warningAlarms.length > 0 && (
                  <span className="flex items-center gap-1 text-orange-700">
                     <div className="bg-orange-500 rounded-full w-2 h-2" />
                     {warningAlarms.length} Advertencia{warningAlarms.length !== 1 ? 's' : ''}
                  </span>
               )}
               {infoAlarms.length > 0 && (
                  <span className="flex items-center gap-1 text-blue-700">
                     <div className="bg-blue-500 rounded-full w-2 h-2" />
                     {infoAlarms.length} Informativa{infoAlarms.length !== 1 ? 's' : ''}
                  </span>
               )}
            </div>
         </div>

         {/* Alerts list */}
         <div className="gap-3 grid grid-cols-1 lg:grid-cols-2">
            {allAlarms.map((alarm) => (
               <AlertItem
                  key={alarm.id}
                  alarm={alarm}
                  machineName={alarm.machineName}
                  machineLocation={alarm.machineLocation}
               />
            ))}
         </div>
      </div>
   );
}
