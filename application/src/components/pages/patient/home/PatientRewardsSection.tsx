'use client';

import {
   Award, Star, Trophy, Calendar, Sunrise, Heart,
   TrendingUp, Target, Gift, Crown, Flame
} from 'lucide-react';
import { mockPatientRewardProfile } from '@/data/mockData/patientRewardsData';
import { useRewardNotifications } from './RewardNotification';

// Dynamic icon mapping for achievements
const iconMap = {
   Calendar,
   Sunrise,
   Heart,
   Trophy,
   Star,
   Award,
   Crown,
   Target
};

// Rarity colors
const rarityColors = {
   common: 'from-gray-400 to-gray-500',
   rare: 'from-blue-400 to-blue-600',
   epic: 'from-purple-400 to-purple-600',
   legendary: 'from-yellow-400 to-orange-500'
};

const rarityBorders = {
   common: 'border-gray-300',
   rare: 'border-blue-300',
   epic: 'border-purple-300',
   legendary: 'border-yellow-300'
};

export function RewardLevelCard () {
   const {
      level, totalPoints, nextLevelPoints, availablePoints
   } = mockPatientRewardProfile;
   const levelProgress = (totalPoints / nextLevelPoints) * 100;

   return (
      <div className="relative bg-gradient-to-br from-brand-500 to-brand-600 p-4 rounded-xl overflow-hidden text-white">
         {/* Background decoration */}
         <div className="-top-4 -right-4 absolute bg-white/10 rounded-full w-20 h-20" />
         <div className="-bottom-2 -left-2 absolute bg-white/5 rounded-full w-16 h-16" />

         <div className="relative">
            <div className="flex justify-between items-start mb-3">
               <div>
                  <div className="flex items-center gap-2 mb-1">
                     <Crown size={20} className="text-yellow-300" />
                     <span className="font-semibold text-sm">Nivel {level}</span>
                  </div>
                  <p className="text-white/80 text-xs">Paciente Ejemplar</p>
               </div>
               <div className="text-right">
                  <div className="font-bold text-xl">{availablePoints.toLocaleString()}</div>
                  <p className="text-white/80 text-xs">puntos disponibles</p>
               </div>
            </div>

            {/* Progress bar */}
            <div className="bg-white/20 mb-2 rounded-full h-2">
               <div
                  className="bg-gradient-to-r from-yellow-300 to-yellow-400 rounded-full h-2 transition-all duration-500"
                  style={{
                     width: `${levelProgress}%`
                  }}
               />
            </div>
            <p className="text-white/70 text-xs">
               {nextLevelPoints - totalPoints} puntos para el siguiente nivel
            </p>
         </div>
      </div>
   );
}

export function StreakCards () {
   const {
      streaks, attendanceRate, punctualityRate
   } = mockPatientRewardProfile;
   const attendanceStreak = streaks.find(s => s.streakType === 'appointment');
   const punctualityStreak = streaks.find(s => s.streakType === 'punctuality');

   return (
      <div className="gap-3 grid grid-cols-2">
         {/* Attendance Streak */}
         <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-3 border border-green-200/50 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
               <div className="flex justify-center items-center bg-green-500 rounded-lg w-8 h-8">
                  <Calendar size={16} className="text-white" />
               </div>
               <div>
                  <p className="font-semibold text-green-700 text-sm">Asistencia</p>
                  <p className="text-green-600 text-xs">{attendanceRate}% este mes</p>
               </div>
            </div>
            <div className="flex items-center gap-1">
               <Flame size={16} className="text-orange-500" />
               <span className="font-bold text-gray-800 text-lg">{attendanceStreak?.currentStreak}</span>
               <span className="text-gray-600 text-xs">citas seguidas</span>
            </div>
         </div>

         {/* Punctuality Streak */}
         <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-3 border border-blue-200/50 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
               <div className="flex justify-center items-center bg-blue-500 rounded-lg w-8 h-8">
                  <Sunrise size={16} className="text-white" />
               </div>
               <div>
                  <p className="font-semibold text-blue-700 text-sm">Puntualidad</p>
                  <p className="text-blue-600 text-xs">{punctualityRate}% este mes</p>
               </div>
            </div>
            <div className="flex items-center gap-1">
               <Flame size={16} className="text-orange-500" />
               <span className="font-bold text-gray-800 text-lg">{punctualityStreak?.currentStreak}</span>
               <span className="text-gray-600 text-xs">puntuales</span>
            </div>
         </div>
      </div>
   );
}

// export function AchievementCard ({ achievement }: { achievement: any }) {
//    const IconComponent = iconMap[achievement.icon as keyof typeof iconMap] || Award;
//    const isUnlocked = achievement.unlocked;

//    return (
//       <div className={`relative bg-white border-2 ${rarityBorders[achievement.rarity]} p-3 rounded-xl transition-all duration-200 hover:scale-105 ${
//          isUnlocked ? 'shadow-sm' : 'opacity-75'
//       }`}
//       >
//          {/* Rarity indicator */}
//          <div className={`absolute -top-1 -right-1 bg-gradient-to-r ${rarityColors[achievement.rarity]} rounded-full w-4 h-4`} />

//          <div className="flex items-start gap-3">
//             <div className={`flex items-center justify-center rounded-lg w-10 h-10 ${
//                isUnlocked
//                   ? `bg-gradient-to-r ${rarityColors[achievement.rarity]} text-white`
//                   : 'bg-gray-100 text-gray-400'
//             }`}
//             >
//                <IconComponent size={20} />
//             </div>

//             <div className="flex-1 min-w-0">
//                <div className="flex items-center gap-2 mb-1">
//                   <h4 className={`font-semibold text-sm ${isUnlocked ? 'text-gray-800' : 'text-gray-500'}`}>
//                      {achievement.name}
//                   </h4>
//                   {isUnlocked && <Star size={14} className="fill-yellow-500 text-yellow-500" />}
//                </div>
//                <p className={`text-xs mb-2 ${isUnlocked ? 'text-gray-600' : 'text-gray-400'}`}>
//                   {achievement.description}
//                </p>

//                {!isUnlocked && (
//                   <div className="space-y-1">
//                      <div className="bg-gray-200 rounded-full h-1.5">
//                         <div
//                            className={`bg-gradient-to-r ${rarityColors[achievement.rarity]} rounded-full h-1.5 transition-all duration-300`}
//                            style={{
//                               width: `${achievement.progress}%`
//                            }}
//                         />
//                      </div>
//                      <p className="text-gray-500 text-xs">{achievement.progress}% completado</p>
//                   </div>
//                )}
//             </div>
//          </div>
//       </div>
//    );
// }

function RecentPointsActivity () {
   const { recentPoints } = mockPatientRewardProfile;
   const recentActivity = recentPoints.slice(0, 3);

   const pointTypeColors = {
      attendance: 'text-green-600 bg-green-50',
      punctuality: 'text-blue-600 bg-blue-50',
      treatment_completion: 'text-purple-600 bg-purple-50',
      health_milestone: 'text-orange-600 bg-orange-50',
      bonus: 'text-yellow-600 bg-yellow-50'
   };

   return (
      <div className="bg-white p-4 border border-gray-200/50 rounded-xl">
         <div className="flex items-center gap-2 mb-3">
            <TrendingUp size={16} className="text-brand-500" />
            <h3 className="font-semibold text-gray-800 text-sm">Actividad Reciente</h3>
         </div>

         <div className="space-y-2">
            {recentActivity.map((point) => (
               <div key={point.id} className="flex justify-between items-center py-2">
                  <div className="flex-1">
                     <p className="text-gray-800 text-sm">{point.description}</p>
                     <p className="text-gray-500 text-xs">{new Date(point.date)
                        .toLocaleDateString('es-ES')}</p>
                  </div>
                  <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                     pointTypeColors[point.type]
                  }`}
                  >
                     <span>+{point.points}</span>
                  </div>
               </div>
            ))}
         </div>

         <button
            onClick={() => window.location.href = '/patient/rewards?tab=history'}
            className="mt-3 pt-3 border-gray-100 border-t w-full font-medium text-brand-600 hover:text-brand-700 text-sm transition-colors"
         >
            Ver historial completo
         </button>
      </div>
   );
}

function QuickRewardsPreview () {
   const { availableRewards } = mockPatientRewardProfile;
   const topRewards = availableRewards.filter(r => r.available && !r.claimed)
      .slice(0, 2);

   return (
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 border border-purple-200/50 rounded-xl">
         <div className="flex items-center gap-2 mb-3">
            <Gift size={16} className="text-purple-600" />
            <h3 className="font-semibold text-purple-800 text-sm">Recompensas Disponibles</h3>
         </div>

         <div className="space-y-2">
            {topRewards.map((reward) => (
               <div key={reward.id} className="bg-white/70 p-2 rounded-lg">
                  <div className="flex justify-between items-start">
                     <div className="flex-1">
                        <p className="font-medium text-gray-800 text-sm">{reward.name}</p>
                        <p className="text-gray-600 text-xs">{reward.description}</p>
                     </div>
                     <div className="font-semibold text-purple-600 text-sm">
                        {reward.pointsCost} pts
                     </div>
                  </div>
               </div>
            ))}
         </div>

         <button
            onClick={() => window.location.href = '/patient/rewards?tab=rewards'}
            className="mt-3 pt-3 border-purple-200/30 border-t w-full font-medium text-purple-600 hover:text-purple-700 text-sm transition-colors"
         >
            Ver todas las recompensas
         </button>
      </div>
   );
}

export default function PatientRewardsSection () {
   const { achievements } = mockPatientRewardProfile;
   const unlockedAchievements = achievements.filter(a => a.unlocked);
   const inProgressAchievements = achievements.filter(a => !a.unlocked)
      .slice(0, 2);

   const {
      showPointsEarned,
      showAchievementUnlocked,
      showStreakMilestone,
      NotificationContainer
   } = useRewardNotifications();

   return (
      <div className="space-y-4">
         {/* Level and Points Overview */}
         <RewardLevelCard />

         {/* Streaks */}
         <StreakCards />
      </div>
   );
}
