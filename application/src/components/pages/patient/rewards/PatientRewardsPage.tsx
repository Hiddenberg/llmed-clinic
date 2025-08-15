'use client';

import {
   ArrowLeft, Award, Star, Trophy, Calendar, Sunrise, Heart,
   TrendingUp, Target, Gift, Crown, Flame, Medal, Zap, Clock,
   CheckCircle, Lock, ShoppingBag, History, Filter
} from 'lucide-react';
import { useState, useEffect } from 'react';
import {
   mockPatientRewardProfile, Achievement, Reward, RewardPoint
} from '@/data/mockData/patientRewardsData';

// Dynamic icon mapping for achievements
const iconMap = {
   Calendar,
   Sunrise,
   Heart,
   Trophy,
   Star,
   Award,
   Crown,
   Target,
   Medal,
   Zap,
   Clock
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

const categoryColors = {
   health: 'from-green-500 to-emerald-500',
   comfort: 'from-blue-500 to-cyan-500',
   education: 'from-purple-500 to-violet-500',
   special: 'from-orange-500 to-red-500'
};

interface PatientRewardsPageProps {
   onBack?: () => void;
}

function RewardsHeader () {
   const {
      level, totalPoints, availablePoints, nextLevelPoints
   } = mockPatientRewardProfile;
   const levelProgress = (totalPoints / nextLevelPoints) * 100;

   return (
      <div className="relative bg-gradient-to-br from-brand-500 via-brand-600 to-purple-600 p-6 rounded-2xl overflow-hidden text-white">
         {/* Background decoration */}
         <div className="-top-8 -right-8 absolute bg-white/10 rounded-full w-32 h-32" />
         <div className="-bottom-4 -left-4 absolute bg-white/5 rounded-full w-24 h-24" />
         <div className="top-4 left-1/2 absolute bg-yellow-300/20 rounded-full w-16 h-16" />

         <div className="relative">
            <div className="flex justify-between items-start mb-4">
               <div>
                  <div className="flex items-center gap-3 mb-2">
                     <div className="flex justify-center items-center bg-yellow-400 rounded-full w-12 h-12">
                        <Crown size={24} className="text-yellow-800" />
                     </div>
                     <div>
                        <h1 className="font-bold text-2xl">Nivel {level}</h1>
                        <p className="text-white/80 text-sm">Paciente Ejemplar</p>
                     </div>
                  </div>
               </div>
               <div className="text-right">
                  <div className="font-bold text-3xl">{availablePoints.toLocaleString()}</div>
                  <p className="text-white/80 text-sm">puntos disponibles</p>
               </div>
            </div>

            {/* Progress bar */}
            <div className="space-y-2">
               <div className="flex justify-between text-sm">
                  <span className="text-white/70">Progreso al Nivel {level + 1}</span>
                  <span className="text-white/70">{totalPoints.toLocaleString()} / {nextLevelPoints.toLocaleString()}</span>
               </div>
               <div className="bg-white/20 rounded-full h-3">
                  <div
                     className="bg-gradient-to-r from-yellow-300 to-yellow-400 rounded-full h-3 transition-all duration-1000"
                     style={{
                        width: `${levelProgress}%`
                     }}
                  />
               </div>
               <p className="text-white/70 text-sm">
                  {(nextLevelPoints - totalPoints).toLocaleString()} puntos para el siguiente nivel
               </p>
            </div>
         </div>
      </div>
   );
}

function StatsCards () {
   const {
      attendanceRate, punctualityRate, streaks
   } = mockPatientRewardProfile;
   const attendanceStreak = streaks.find(s => s.streakType === 'appointment');
   const punctualityStreak = streaks.find(s => s.streakType === 'punctuality');

   return (
      <div className="gap-4 grid grid-cols-2 lg:grid-cols-4">
         <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 border border-green-200/50 rounded-xl">
            <div className="flex items-center gap-3 mb-3">
               <div className="flex justify-center items-center bg-green-500 rounded-lg w-10 h-10">
                  <Calendar size={20} className="text-white" />
               </div>
               <div>
                  <p className="font-semibold text-green-700 text-sm">Asistencia</p>
                  <p className="font-bold text-green-800 text-lg">{attendanceRate}%</p>
               </div>
            </div>
            <div className="flex items-center gap-2">
               <Flame size={16} className="text-orange-500" />
               <span className="text-gray-600 text-sm">{attendanceStreak?.currentStreak} seguidas</span>
            </div>
         </div>

         <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 border border-blue-200/50 rounded-xl">
            <div className="flex items-center gap-3 mb-3">
               <div className="flex justify-center items-center bg-blue-500 rounded-lg w-10 h-10">
                  <Clock size={20} className="text-white" />
               </div>
               <div>
                  <p className="font-semibold text-blue-700 text-sm">Puntualidad</p>
                  <p className="font-bold text-blue-800 text-lg">{punctualityRate}%</p>
               </div>
            </div>
            <div className="flex items-center gap-2">
               <Flame size={16} className="text-orange-500" />
               <span className="text-gray-600 text-sm">{punctualityStreak?.currentStreak} puntuales</span>
            </div>
         </div>

         <div className="bg-gradient-to-br from-purple-50 to-violet-50 p-4 border border-purple-200/50 rounded-xl">
            <div className="flex items-center gap-3 mb-3">
               <div className="flex justify-center items-center bg-purple-500 rounded-lg w-10 h-10">
                  <Trophy size={20} className="text-white" />
               </div>
               <div>
                  <p className="font-semibold text-purple-700 text-sm">Logros</p>
                  <p className="font-bold text-purple-800 text-lg">{mockPatientRewardProfile.achievements.filter(a => a.unlocked).length}</p>
               </div>
            </div>
            <p className="text-gray-600 text-sm">desbloqueados</p>
         </div>

         <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-4 border border-yellow-200/50 rounded-xl">
            <div className="flex items-center gap-3 mb-3">
               <div className="flex justify-center items-center bg-yellow-500 rounded-lg w-10 h-10">
                  <Star size={20} className="text-white" />
               </div>
               <div>
                  <p className="font-semibold text-yellow-700 text-sm">Total Puntos</p>
                  <p className="font-bold text-yellow-800 text-lg">{mockPatientRewardProfile.totalPoints.toLocaleString()}</p>
               </div>
            </div>
            <p className="text-gray-600 text-sm">ganados</p>
         </div>
      </div>
   );
}

function AchievementsSection () {
   const [filter, setFilter] = useState<'all' | 'unlocked' | 'progress'>('all');
   const { achievements } = mockPatientRewardProfile;

   const filteredAchievements = achievements.filter(achievement => {
      if (filter === 'unlocked') return achievement.unlocked;
      if (filter === 'progress') return !achievement.unlocked;
      return true;
   });

   const AchievementCard = ({ achievement }: { achievement: Achievement }) => {
      const IconComponent = iconMap[achievement.icon as keyof typeof iconMap] || Award;
      const isUnlocked = achievement.unlocked;

      return (
         <div className={`relative bg-white border-2 ${rarityBorders[achievement.rarity]} p-4 rounded-xl transition-all duration-200 hover:scale-105 hover:shadow-lg ${
            isUnlocked ? 'shadow-sm' : 'opacity-75'
         }`}
         >
            {/* Rarity indicator */}
            <div className={`absolute -top-2 -right-2 bg-gradient-to-r ${rarityColors[achievement.rarity]} rounded-full w-6 h-6 flex items-center justify-center`}>
               <Star size={12} className="text-white" />
            </div>

            <div className="flex items-start gap-4">
               <div className={`flex items-center justify-center rounded-xl w-14 h-14 ${
                  isUnlocked
                     ? `bg-gradient-to-r ${rarityColors[achievement.rarity]} text-white shadow-lg`
                     : 'bg-gray-100 text-gray-400'
               }`}
               >
                  <IconComponent size={24} />
               </div>

               <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                     <h4 className={`font-semibold ${isUnlocked ? 'text-gray-800' : 'text-gray-500'}`}>
                        {achievement.name}
                     </h4>
                     {isUnlocked && (
                        <div className="flex items-center gap-1">
                           <CheckCircle size={16} className="text-green-500" />
                           <span className="bg-green-100 px-2 py-0.5 rounded-full font-medium text-green-700 text-xs">
                              Completado
                           </span>
                        </div>
                     )}
                  </div>
                  <p className={`text-sm mb-3 ${isUnlocked ? 'text-gray-600' : 'text-gray-400'}`}>
                     {achievement.description}
                  </p>

                  {!isUnlocked ? (
                     <div className="space-y-2">
                        <div className="bg-gray-200 rounded-full h-2">
                           <div
                              className={`bg-gradient-to-r ${rarityColors[achievement.rarity]} rounded-full h-2 transition-all duration-300`}
                              style={{
                                 width: `${achievement.progress}%`
                              }}
                           />
                        </div>
                        <p className="text-gray-500 text-sm">{achievement.progress}% completado</p>
                     </div>
                  ) : (
                     <div className="flex items-center gap-2 text-green-600">
                        <Trophy size={16} />
                        <span className="font-medium text-sm">
                           Desbloqueado el {new Date(achievement.unlockedDate!)
                           .toLocaleDateString('es-ES')}
                        </span>
                     </div>
                  )}
               </div>
            </div>
         </div>
      );
   };

   return (
      <div className="space-y-4">
         <div className="flex justify-between items-center">
            <h2 className="font-bold text-gray-800 text-xl">Logros y Medallas</h2>
            <div className="flex gap-2">
               <button
                  onClick={() => setFilter('all')}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                     filter === 'all'
                        ? 'bg-brand-100 text-brand-700'
                        : 'text-gray-600 hover:bg-gray-100'
                  }`}
               >
                  Todos
               </button>
               <button
                  onClick={() => setFilter('unlocked')}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                     filter === 'unlocked'
                        ? 'bg-brand-100 text-brand-700'
                        : 'text-gray-600 hover:bg-gray-100'
                  }`}
               >
                  Desbloqueados
               </button>
               <button
                  onClick={() => setFilter('progress')}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                     filter === 'progress'
                        ? 'bg-brand-100 text-brand-700'
                        : 'text-gray-600 hover:bg-gray-100'
                  }`}
               >
                  En Progreso
               </button>
            </div>
         </div>

         <div className="gap-4 grid">
            {filteredAchievements.map((achievement) => (
               <AchievementCard key={achievement.id} achievement={achievement} />
            ))}
         </div>
      </div>
   );
}

function RewardsStore () {
   const {
      availableRewards, availablePoints
   } = mockPatientRewardProfile;
   const [filter, setFilter] = useState<'all' | 'available' | 'claimed'>('available');

   const filteredRewards = availableRewards.filter(reward => {
      if (filter === 'available') return reward.available && !reward.claimed;
      if (filter === 'claimed') return reward.claimed;
      return true;
   });

   const RewardCard = ({ reward }: { reward: Reward }) => {
      const canAfford = availablePoints >= reward.pointsCost;
      const isClaimed = reward.claimed;

      return (
         <div className={`bg-white border-2 p-4 rounded-xl transition-all duration-200 hover:scale-105 ${
            isClaimed
               ? 'border-green-200 bg-green-50/50'
               : canAfford
                  ? 'border-purple-200 hover:shadow-lg'
                  : 'border-gray-200 opacity-75'
         }`}
         >
            <div className="flex justify-between items-start mb-3">
               <div className={`flex items-center justify-center rounded-lg w-12 h-12 bg-gradient-to-r ${categoryColors[reward.category]} text-white`}>
                  {reward.category === 'health' && <Heart size={20} />}
                  {reward.category === 'comfort' && <Target size={20} />}
                  {reward.category === 'education' && <Award size={20} />}
                  {reward.category === 'special' && <Crown size={20} />}
               </div>
               <div className="text-right">
                  <div className={`font-bold text-lg ${
                     isClaimed ? 'text-green-600' : canAfford ? 'text-purple-600' : 'text-gray-400'
                  }`}
                  >
                     {reward.pointsCost} pts
                  </div>
                  {isClaimed && (
                     <span className="bg-green-100 px-2 py-0.5 rounded-full font-medium text-green-700 text-xs">
                        Canjeado
                     </span>
                  )}
               </div>
            </div>

            <h3 className="mb-2 font-semibold text-gray-800">{reward.name}</h3>
            <p className="mb-4 text-gray-600 text-sm">{reward.description}</p>

            {!isClaimed && (
               <button
                  disabled={!canAfford}
                  className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                     canAfford
                        ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:from-purple-600 hover:to-purple-700'
                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  }`}
               >
                  {canAfford ? 'Canjear Recompensa' : 'Puntos Insuficientes'}
               </button>
            )}

            {isClaimed && (
               <div className="flex justify-center items-center gap-2 py-2 text-green-600">
                  <CheckCircle size={16} />
                  <span className="font-medium text-sm">
                     Canjeado el {new Date(reward.claimedDate!)
                     .toLocaleDateString('es-ES')}
                  </span>
               </div>
            )}
         </div>
      );
   };

   return (
      <div className="space-y-4">
         <div className="flex justify-between items-center">
            <h2 className="font-bold text-gray-800 text-xl">Tienda de Recompensas</h2>
            <div className="flex gap-2">
               <button
                  onClick={() => setFilter('available')}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                     filter === 'available'
                        ? 'bg-brand-100 text-brand-700'
                        : 'text-gray-600 hover:bg-gray-100'
                  }`}
               >
                  Disponibles
               </button>
               <button
                  onClick={() => setFilter('claimed')}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                     filter === 'claimed'
                        ? 'bg-brand-100 text-brand-700'
                        : 'text-gray-600 hover:bg-gray-100'
                  }`}
               >
                  Canjeadas
               </button>
               <button
                  onClick={() => setFilter('all')}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                     filter === 'all'
                        ? 'bg-brand-100 text-brand-700'
                        : 'text-gray-600 hover:bg-gray-100'
                  }`}
               >
                  Todas
               </button>
            </div>
         </div>

         <div className="gap-4 grid md:grid-cols-2">
            {filteredRewards.map((reward) => (
               <RewardCard key={reward.id} reward={reward} />
            ))}
         </div>
      </div>
   );
}

function PointsHistory () {
   const { recentPoints } = mockPatientRewardProfile;

   const pointTypeColors = {
      attendance: 'text-green-600 bg-green-50 border-green-200',
      punctuality: 'text-blue-600 bg-blue-50 border-blue-200',
      treatment_completion: 'text-purple-600 bg-purple-50 border-purple-200',
      health_milestone: 'text-orange-600 bg-orange-50 border-orange-200',
      bonus: 'text-yellow-600 bg-yellow-50 border-yellow-200'
   };

   const pointTypeIcons = {
      attendance: Calendar,
      punctuality: Clock,
      treatment_completion: CheckCircle,
      health_milestone: Heart,
      bonus: Star
   };

   return (
      <div className="space-y-4">
         <h2 className="font-bold text-gray-800 text-xl">Historial de Puntos</h2>

         <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <div className="divide-y divide-gray-100">
               {recentPoints.map((point) => {
                  const IconComponent = pointTypeIcons[point.type];
                  return (
                     <div key={point.id} className="hover:bg-gray-50 p-4 transition-colors">
                        <div className="flex items-center gap-4">
                           <div className={`flex items-center justify-center rounded-lg w-10 h-10 border ${pointTypeColors[point.type]}`}>
                              <IconComponent size={20} />
                           </div>
                           <div className="flex-1">
                              <p className="font-medium text-gray-800">{point.description}</p>
                              <p className="text-gray-500 text-sm">{new Date(point.date)
                                 .toLocaleDateString('es-ES')}</p>
                           </div>
                           <div className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-semibold ${pointTypeColors[point.type]}`}>
                              <span>+{point.points}</span>
                           </div>
                        </div>
                     </div>
                  );
               })}
            </div>
         </div>
      </div>
   );
}

export default function PatientRewardsPage ({ onBack }: PatientRewardsPageProps) {
   const [activeTab, setActiveTab] = useState<'overview' | 'achievements' | 'rewards' | 'history'>('overview');

   useEffect(() => {
      // Check for tab parameter in URL
      const urlParams = new URLSearchParams(window.location.search);
      const tabParam = urlParams.get('tab');
      if (tabParam && ['overview', 'achievements', 'rewards', 'history'].includes(tabParam)) {
         setActiveTab(tabParam as 'overview' | 'achievements' | 'rewards' | 'history');
      }
   }, []);

   return (
      <div className="bg-gradient-to-br from-gray-50 via-white to-brand-50/20 min-h-screen">
         <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-6xl">
            {/* Header with back button */}
            <div className="flex items-center gap-4 mb-6">
               <button
                  onClick={onBack || (() => window.location.href = '/patient')}
                  className="flex items-center gap-2 text-gray-600 hover:text-brand-600 transition-colors"
               >
                  <ArrowLeft size={20} />
                  <span className="font-medium">Volver al inicio</span>
               </button>
            </div>

            {/* Rewards Header */}
            <RewardsHeader />

            {/* Navigation Tabs */}
            <div className="flex gap-2 my-6 overflow-x-auto">
               <button
                  onClick={() => setActiveTab('overview')}
                  className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                     activeTab === 'overview'
                        ? 'bg-brand-100 text-brand-700'
                        : 'text-gray-600 hover:bg-gray-100'
                  }`}
               >
                  Resumen
               </button>
               <button
                  onClick={() => setActiveTab('achievements')}
                  className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                     activeTab === 'achievements'
                        ? 'bg-brand-100 text-brand-700'
                        : 'text-gray-600 hover:bg-gray-100'
                  }`}
               >
                  Logros
               </button>
               <button
                  onClick={() => setActiveTab('rewards')}
                  className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                     activeTab === 'rewards'
                        ? 'bg-brand-100 text-brand-700'
                        : 'text-gray-600 hover:bg-gray-100'
                  }`}
               >
                  Tienda
               </button>
               <button
                  onClick={() => setActiveTab('history')}
                  className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                     activeTab === 'history'
                        ? 'bg-brand-100 text-brand-700'
                        : 'text-gray-600 hover:bg-gray-100'
                  }`}
               >
                  Historial
               </button>
            </div>

            {/* Tab Content */}
            <div className="space-y-8">
               {activeTab === 'overview' && (
                  <>
                     <StatsCards />
                     <div className="gap-8 grid lg:grid-cols-2">
                        <AchievementsSection />
                        <RewardsStore />
                     </div>
                  </>
               )}

               {activeTab === 'achievements' && <AchievementsSection />}

               {activeTab === 'rewards' && <RewardsStore />}

               {activeTab === 'history' && <PointsHistory />}
            </div>
         </div>
      </div>
   );
}
