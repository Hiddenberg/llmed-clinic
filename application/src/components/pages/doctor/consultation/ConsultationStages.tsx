import {
   CheckCircle, Clock, Circle, ChevronRight, Play
} from 'lucide-react';
import { useState } from 'react';
import { ConsultationStage } from '@/data/mockData/consultationData';

interface ConsultationStagesProps {
   stages: ConsultationStage[];
   onUpdateStage?: (stageId: string, updates: Partial<ConsultationStage>) => void;
   onToggleTask?: (stageId: string, taskId: string) => void;
}

function StageCard ({
   stage, isActive, onStartStage, onToggleTask
}: {
   stage: ConsultationStage;
   isActive: boolean;
   onStartStage: (stageId: string) => void;
   onToggleTask?: (stageId: string, taskId: string) => void;
}) {
   const getStatusIcon = (status: ConsultationStage['status']) => {
      switch (status) {
         case 'completed':
            return <CheckCircle size={20} className="text-green-500" />;
         case 'active':
            return <Play size={20} className="text-blue-500" />;
         case 'pending':
            return <Circle size={20} className="text-gray-400" />;
      }
   };

   const getStatusColor = (status: ConsultationStage['status']) => {
      switch (status) {
         case 'completed':
            return 'border-green-200 bg-green-50';
         case 'active':
            return 'border-blue-200 bg-blue-50';
         case 'pending':
            return 'border-gray-200 bg-gray-50';
      }
   };

   const completedTasks = stage.tasks.filter(task => task.completed).length;
   const totalTasks = stage.tasks.length;

   return (
      <div className={`!rounded-xl !border-2 !p-4 !transition-all ${getStatusColor(stage.status)} ${
         isActive ? '!ring-2 !ring-blue-500 !ring-opacity-50' : ''
      }`}
      >
         <div className="!flex !justify-between !items-start !mb-3">
            <div className="!flex !items-center !gap-3">
               {getStatusIcon(stage.status)}
               <div>
                  <h4 className="font-semibold text-gray-900">{stage.name}</h4>
                  <p className="text-gray-600 text-sm">{stage.description}</p>
               </div>
            </div>
            <div className="text-right">
               <p className="text-gray-500 text-sm">
                  <Clock size={14} className="inline mr-1" />
                  {stage.estimatedDuration} min
               </p>
            </div>
         </div>

         {/* Progress Bar */}
         <div className="mb-3">
            <div className="flex justify-between items-center mb-1">
               <span className="text-gray-600 text-xs">Progreso</span>
               <span className="text-gray-600 text-xs">{completedTasks}/{totalTasks}</span>
            </div>
            <div className="bg-gray-200 rounded-full w-full h-2">
               <div
                  className="bg-blue-500 rounded-full h-2 transition-all duration-300"
                  style={{
                     width: `${(completedTasks / totalTasks) * 100}%`
                  }}
               />
            </div>
         </div>

         {/* Tasks List */}
         {isActive && (
            <div className="space-y-2">
               {stage.tasks.map((task) => (
                  <div key={task.id} className="flex items-center gap-2 bg-white p-2 rounded-lg">
                     <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => onToggleTask?.(stage.id, task.id)}
                        className="rounded focus:ring-blue-500 w-4 h-4 text-blue-600"
                     />
                     <div className="flex-1">
                        <p className={`text-sm font-medium ${task.completed ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                           {task.title}
                        </p>
                        <p className="text-gray-500 text-xs">{task.description}</p>
                     </div>
                     <div className={`w-2 h-2 rounded-full ${
                        task.priority === 'high' ? 'bg-red-500' :
                           task.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                     }`}
                     />
                  </div>
               ))}
            </div>
         )}

         {/* Action Button */}
         {stage.status === 'pending' && (
            <button
               onClick={() => onStartStage(stage.id)}
               className="flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 mt-3 px-4 py-2 rounded-lg w-full text-white transition-colors"
            >
               <Play size={16} />
               Iniciar Etapa
            </button>
         )}
      </div>
   );
}

export default function ConsultationStages ({
   stages, onUpdateStage, onToggleTask
}: ConsultationStagesProps) {
   const [localStages, setLocalStages] = useState(stages);
   const [activeStageId, setActiveStageId] = useState(
      stages.find(stage => stage.status === 'active')?.id || null
   );

   const handleStartStage = (stageId: string) => {
      setActiveStageId(stageId);

      // Update stage status to active
      const updatedStages = localStages.map(stage => {
         if (stage.id === stageId) {
            return {
               ...stage,
               status: 'active' as const
            };
         } else if (stage.status === 'active') {
            return {
               ...stage,
               status: 'pending' as const
            };
         }
         return stage;
      });

      setLocalStages(updatedStages);
      onUpdateStage?.(stageId, {
         status: 'active'
      });
   };

   const handleToggleTask = (stageId: string, taskId: string) => {
      const updatedStages = localStages.map(stage => {
         if (stage.id === stageId) {
            const updatedTasks = stage.tasks.map(task =>
               task.id === taskId ? {
                  ...task,
                  completed: !task.completed
               } : task
            );

            // Check if all tasks are completed to mark stage as completed
            const allTasksCompleted = updatedTasks.every(task => task.completed);
            const newStatus = allTasksCompleted ? 'completed' : stage.status;

            return {
               ...stage,
               tasks: updatedTasks,
               status: newStatus
            };
         }
         return stage;
      });

      setLocalStages(updatedStages);
      onToggleTask?.(stageId, taskId);
   };

   return (
      <div className="!bg-white !p-6 !border !border-gray-200 !rounded-xl">
         <div className="!flex !justify-between !items-center !mb-6">
            <h3 className="!font-semibold !text-gray-900 !text-lg">Etapas de la Consulta</h3>
            <div className="!flex !items-center !gap-2 !text-gray-600 !text-sm">
               <span>Progreso general:</span>
               <span className="font-medium">
                  {localStages.filter(s => s.status === 'completed').length}/{localStages.length}
               </span>
            </div>
         </div>

         {/* Stage Progress Indicator */}
         <div className="!relative !flex !justify-center !items-center !mb-6">
            {localStages.map((stage, index) => (
               <div key={stage.id} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                     stage.status === 'completed' ? 'bg-green-500 text-white' :
                        stage.status === 'active' ? 'bg-blue-500 text-white' :
                           'bg-gray-300 text-gray-600'
                  }`}
                  >
                     {stage.status === 'completed' ? (
                        <CheckCircle size={16} />
                     ) : (
                        <span className="font-bold text-xs">{index + 1}</span>
                     )}
                  </div>
                  {index < localStages.length - 1 && (
                  <div className={`w-16 h-0.5 mx-2 ${
                     localStages[index + 1].status === 'completed' || stage.status === 'completed'
                        ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                  />
                  )}
               </div>
            ))}
         </div>

         {/* Stages List */}
         <div className="!space-y-4">
            {localStages.map((stage) => (
               <StageCard
                  key={stage.id}
                  stage={stage}
                  isActive={activeStageId === stage.id}
                  onStartStage={handleStartStage}
                  onToggleTask={handleToggleTask}
               />
            ))}
         </div>
      </div>
   );
}
