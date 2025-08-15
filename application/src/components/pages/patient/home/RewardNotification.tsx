'use client';

import {
   Star, Trophy, Award, CheckCircle, X, Flame
} from 'lucide-react';
import { useState, useEffect } from 'react';

interface RewardNotificationProps {
   type: 'points' | 'achievement' | 'streak' | 'level_up';
   title: string;
   description: string;
   points?: number;
   isVisible: boolean;
   onClose: () => void;
   autoClose?: boolean;
   duration?: number;
}

const notificationStyles = {
   points: {
      gradient: 'from-green-500 to-emerald-500',
      icon: Star,
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      textColor: 'text-green-800'
   },
   achievement: {
      gradient: 'from-yellow-500 to-orange-500',
      icon: Trophy,
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      textColor: 'text-yellow-800'
   },
   streak: {
      gradient: 'from-orange-500 to-red-500',
      icon: Flame,
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      textColor: 'text-orange-800'
   },
   level_up: {
      gradient: 'from-purple-500 to-pink-500',
      icon: Award,
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      textColor: 'text-purple-800'
   }
};

export default function RewardNotification ({
   type,
   title,
   description,
   points,
   isVisible,
   onClose,
   autoClose = true,
   duration = 5000
}: RewardNotificationProps) {
   const [isAnimating, setIsAnimating] = useState(false);
   const style = notificationStyles[type];
   const IconComponent = style.icon;

   useEffect(() => {
      if (isVisible) {
         setIsAnimating(true);

         if (autoClose) {
            const timer = setTimeout(() => {
               handleClose();
            }, duration);

            return () => clearTimeout(timer);
         }
      }
   }, [isVisible, autoClose, duration]);

   const handleClose = () => {
      setIsAnimating(false);
      setTimeout(() => {
         onClose();
      }, 300);
   };

   if (!isVisible) return null;

   return (
      <div className="top-4 right-4 z-50 fixed">
         <div className={`transform transition-all duration-300 ${
            isAnimating ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
         }`}
         >
            <div className={`relative bg-white border-2 ${style.borderColor} shadow-lg rounded-xl p-4 max-w-sm overflow-hidden`}>
               {/* Background decoration */}
               <div className={`absolute -top-2 -right-2 bg-gradient-to-r ${style.gradient} rounded-full w-16 h-16 opacity-10`} />

               {/* Close button */}
               <button
                  onClick={handleClose}
                  className="top-2 right-2 absolute text-gray-400 hover:text-gray-600 transition-colors"
               >
                  <X size={16} />
               </button>

               <div className="flex items-start gap-3">
                  {/* Icon */}
                  <div className={`flex items-center justify-center rounded-lg w-10 h-10 bg-gradient-to-r ${style.gradient} text-white shadow-sm animate-pulse`}>
                     <IconComponent size={20} />
                  </div>

                  <div className="flex-1 pr-6 min-w-0">
                     <div className="flex items-center gap-2 mb-1">
                        <h4 className={`font-semibold text-sm ${style.textColor}`}>
                           {title}
                        </h4>
                        {points && (
                           <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${style.bgColor} ${style.textColor}`}>
                              +{points} pts
                           </span>
                        )}
                     </div>
                     <p className="text-gray-600 text-xs leading-relaxed">
                        {description}
                     </p>
                  </div>
               </div>

               {/* Progress bar for auto-close */}
               {autoClose && (
                  <div className="bottom-0 left-0 absolute bg-gray-100 w-full h-1">
                     <div
                        className={`h-full bg-gradient-to-r ${style.gradient} transition-all ease-linear`}
                        style={{
                           width: '100%',
                           animation: `shrink ${duration}ms linear`
                        }}
                     />
                  </div>
               )}
            </div>
         </div>

         <style jsx>{`
            @keyframes shrink {
               from { width: 100%; }
               to { width: 0%; }
            }
         `}</style>
      </div>
   );
}

// Hook for managing reward notifications
export function useRewardNotifications () {
   const [notifications, setNotifications] = useState<Array<{
      id: string;
      type: 'points' | 'achievement' | 'streak' | 'level_up';
      title: string;
      description: string;
      points?: number;
   }>>([]);

   const addNotification = (notification: Omit<typeof notifications[0], 'id'>) => {
      const id = Date.now()
         .toString();
      setNotifications(prev => [...prev, {
         ...notification,
         id
      }]);
   };

   const removeNotification = (id: string) => {
      setNotifications(prev => prev.filter(n => n.id !== id));
   };

   const showPointsEarned = (points: number, description: string) => {
      addNotification({
         type: 'points',
         title: '¡Puntos Ganados!',
         description,
         points
      });
   };

   const showAchievementUnlocked = (title: string, description: string) => {
      addNotification({
         type: 'achievement',
         title: '¡Logro Desbloqueado!',
         description: `${title}: ${description}`
      });
   };

   const showStreakMilestone = (streak: number, type: string) => {
      addNotification({
         type: 'streak',
         title: '¡Racha Increíble!',
         description: `${streak} ${type} consecutivos. ¡Sigue así!`
      });
   };

   const showLevelUp = (newLevel: number) => {
      addNotification({
         type: 'level_up',
         title: '¡Subiste de Nivel!',
         description: `¡Felicidades! Ahora eres Nivel ${newLevel}`
      });
   };

   const NotificationContainer = () => (
      <div className="top-4 right-4 z-50 fixed space-y-2">
         {notifications.map((notification) => (
            <RewardNotification
               key={notification.id}
               type={notification.type}
               title={notification.title}
               description={notification.description}
               points={notification.points}
               isVisible={true}
               onClose={() => removeNotification(notification.id)}
            />
         ))}
      </div>
   );

   return {
      notifications,
      addNotification,
      removeNotification,
      showPointsEarned,
      showAchievementUnlocked,
      showStreakMilestone,
      showLevelUp,
      NotificationContainer
   };
}
