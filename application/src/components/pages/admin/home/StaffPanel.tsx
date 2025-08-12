import {
   UserCheck, Users, Coffee, Clock, Stethoscope
} from 'lucide-react';
import {
   mockStaff, getStaffStats, type StaffMember
} from '@/data/mockData/adminData';

function formatNextBreak (timestamp?: string): string {
   if (!timestamp) return '';
   const date = new Date(timestamp);
   return date.toLocaleTimeString('es-MX', {
      hour: '2-digit',
      minute: '2-digit'
   });
}

function StaffMemberCard ({
   member, index
}: { member: StaffMember; index: number }) {
   const statusColors = {
      'on-duty': {
         bg: 'from-green-500/6 to-emerald-500/4',
         dot: 'bg-green-500',
         text: 'text-green-700'
      },
      'break': {
         bg: 'from-orange-500/6 to-amber-500/4',
         dot: 'bg-orange-500',
         text: 'text-orange-700'
      },
      'off-duty': {
         bg: 'from-gray-500/6 to-slate-500/4',
         dot: 'bg-gray-400',
         text: 'text-gray-600'
      },
      'emergency': {
         bg: 'from-red-500/6 to-rose-500/4',
         dot: 'bg-red-500',
         text: 'text-red-700'
      }
   };

   const roleIcons = {
      doctor: <Stethoscope size={16} />,
      nurse: <UserCheck size={16} />,
      technician: <Users size={16} />
   };

   const colors = statusColors[member.status];

   return (
      <div
         className="group bg-white/90 hover:bg-white hover:shadow-md p-3 border border-gray-200/50 rounded-lg hover:scale-[1.01] transition-all animate-fade-in-up duration-200"
         style={{
            animationDelay: `${index * 100}ms`
         }}
      >
         {/* Gradient overlay */}
         <div className={`absolute inset-0 bg-gradient-to-br ${colors.bg} rounded-lg opacity-40 group-hover:opacity-60 transition-opacity duration-200`} />

         <div className="z-10 relative">
            <div className="flex justify-between items-start mb-2">
               <div className="flex items-center gap-2">
                  <div className="bg-gradient-to-r from-brand-500 to-blue-500 shadow-sm p-1.5 rounded-md">
                     <div className="drop-shadow-sm text-white">
                        {roleIcons[member.role]}
                     </div>
                  </div>
                  <div className={`w-2 h-2 ${colors.dot} rounded-full animate-pulse`} />
               </div>
               {member.patients > 0 && (
                  <span className="bg-gray-100 px-2 py-0.5 rounded-full font-medium text-gray-700 text-xs">
                     {member.patients} pacientes
                  </span>
               )}
            </div>

            <div>
               <h4 className="font-semibold text-gray-800 text-sm leading-tight">{member.name}</h4>
               <p className="text-gray-600 text-xs capitalize">{member.role}</p>
               {member.specialization && (
                  <p className="mt-1 text-gray-500 text-xs">{member.specialization}</p>
               )}
               {member.nextBreak && member.status === 'on-duty' && (
                  <div className="flex items-center gap-1 mt-1">
                     <Clock size={10} className="text-gray-400" />
                     <span className="text-gray-400 text-xs">
                        Descanso: {formatNextBreak(member.nextBreak)}
                     </span>
                  </div>
               )}
            </div>
         </div>
      </div>
   );
}

export default function StaffPanel () {
   const stats = getStaffStats();
   const onDutyStaff = mockStaff.filter(s => s.status === 'on-duty' || s.status === 'break')
      .slice(0, 6);

   return (
      <div className="space-y-4">
         {/* Header with quick stats */}
         <div className="bg-white/90 p-4 border border-gray-200/50 rounded-xl">
            <div className="flex justify-between items-center mb-3">
               <div className="flex items-center gap-3">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-500 shadow-lg p-2 rounded-lg">
                     <UserCheck size={18} className="drop-shadow-sm text-white" />
                  </div>
                  <div>
                     <h2 className="bg-clip-text bg-gradient-to-r from-gray-800 to-gray-600 font-semibold text-transparent text-lg">
                        Personal en Turno
                     </h2>
                     <p className="text-gray-600 text-xs">Estado actual del personal</p>
                  </div>
               </div>

               <div className="flex items-center gap-4 text-xs">
                  <div className="flex items-center gap-1">
                     <div className="bg-green-500 rounded-full w-2 h-2" />
                     <span className="text-gray-600">{stats.onDuty} activos</span>
                  </div>
                  <div className="flex items-center gap-1">
                     <div className="bg-orange-500 rounded-full w-2 h-2" />
                     <span className="text-gray-600">{stats.onBreak} en descanso</span>
                  </div>
               </div>
            </div>

            {/* Quick stats row */}
            <div className="gap-4 grid grid-cols-3 text-center">
               <div className="bg-gradient-to-br from-brand-500/6 to-blue-500/4 p-2 rounded-lg">
                  <p className="font-bold text-brand-700 text-lg">{stats.doctors}</p>
                  <p className="text-gray-600 text-xs">Doctores</p>
               </div>
               <div className="bg-gradient-to-br from-green-500/6 to-emerald-500/4 p-2 rounded-lg">
                  <p className="font-bold text-green-700 text-lg">{stats.nurses}</p>
                  <p className="text-gray-600 text-xs">Enfermeras</p>
               </div>
               <div className="bg-gradient-to-br from-blue-500/6 to-cyan-500/4 p-2 rounded-lg">
                  <p className="font-bold text-blue-700 text-lg">{stats.total}</p>
                  <p className="text-gray-600 text-xs">Total</p>
               </div>
            </div>
         </div>

         {/* Staff list */}
         <div className="space-y-2 max-h-96 overflow-y-auto">
            {onDutyStaff.map((member, index) => (
               <StaffMemberCard
                  key={member.id}
                  member={member}
                  index={index}
               />
            ))}
         </div>

         {/* View all button */}
         <div className="pt-2 text-center">
            <button className="inline-flex items-center gap-2 hover:bg-brand-50 px-4 py-2 rounded-lg font-medium text-brand-600 hover:text-brand-700 text-sm transition-colors duration-200">
               <Users size={14} />
               Ver todo el personal
            </button>
         </div>
      </div>
   );
}
