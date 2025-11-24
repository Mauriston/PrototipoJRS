import React from 'react';
import { Appointment, InspectionStatus, AmpType } from '../types';
import { format, startOfWeek, addDays, isSameDay, getHours } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface CalendarViewProps {
  appointments: Appointment[];
  onSelectAppointment: (apt: Appointment) => void;
  selectedDate: Date;
}

const HOURS = [8, 9, 10, 11, 12, 13, 14, 15];
const DAYS = [1, 2, 3, 4, 5]; // Mon to Fri

const getStatusColorClass = (status: InspectionStatus) => {
  switch (status) {
    case InspectionStatus.SCHEDULED: return 'bg-blue-100 border-blue-300 text-blue-700';
    case InspectionStatus.COMPLETED: return 'bg-green-100 border-green-300 text-green-700';
    case InspectionStatus.CANCELLED: return 'bg-red-100 border-red-300 text-red-700';
    case InspectionStatus.AUDIT: return 'bg-yellow-100 border-yellow-300 text-yellow-700';
    default: return 'bg-gray-100 border-gray-300 text-gray-700';
  }
};

const CalendarView: React.FC<CalendarViewProps> = ({ appointments, onSelectAppointment, selectedDate }) => {
  const startDate = startOfWeek(selectedDate, { weekStartsOn: 1 }); // Start on Monday

  const getAppointmentsForSlot = (dayDate: Date, hour: number) => {
    return appointments.filter(apt => {
        // Simple logic: If appointment date matches day AND slot matches hour
        // Note: Real logic would strictly check apt.date + slot duration. 
        // Here we assume apt.date carries the start time or slot.startHour matches.
        const aptDate = new Date(apt.date);
        return isSameDay(aptDate, dayDate) && (getHours(aptDate) === hour || (apt.slot.startHour <= hour && apt.slot.endHour > hour));
    });
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
      {/* Header Days */}
      <div className="grid grid-cols-1 md:grid-cols-6 border-b border-gray-200 bg-gray-50">
        <div className="hidden md:block py-3 px-2 text-center text-xs font-semibold text-gray-500 border-r border-gray-200">
          Horário
        </div>
        {DAYS.map(dayOffset => {
          const date = addDays(startDate, dayOffset - 1);
          return (
            <div key={dayOffset} className="py-3 px-1 text-center border-b md:border-b-0 border-gray-200">
              <div className="text-sm font-semibold text-gray-900">{format(date, 'EEEE', { locale: ptBR })}</div>
              <div className="text-xs text-gray-500">{format(date, 'd MMM', { locale: ptBR })}</div>
            </div>
          );
        })}
      </div>

      {/* Grid Body */}
      <div className="flex-1 overflow-y-auto">
        {/* Mobile View (List Style per day) */}
        <div className="md:hidden space-y-4 p-4">
            {DAYS.map(dayOffset => {
                const date = addDays(startDate, dayOffset - 1);
                const dayAppts = appointments.filter(a => isSameDay(new Date(a.date), date));
                
                return (
                    <div key={dayOffset} className="border rounded-lg p-3">
                        <h3 className="font-bold text-navy-800 mb-2">{format(date, 'EEEE, d MMMM', { locale: ptBR })}</h3>
                        {dayAppts.length === 0 ? (
                            <p className="text-sm text-gray-400 italic">Sem agendamentos</p>
                        ) : (
                            <div className="space-y-2">
                                {dayAppts.map(apt => (
                                    <div 
                                        key={apt.id} 
                                        onClick={() => onSelectAppointment(apt)}
                                        className={`p-3 rounded border text-sm cursor-pointer ${getStatusColorClass(apt.status)}`}
                                    >
                                        <div className="flex justify-between font-bold">
                                            <span>{format(new Date(apt.date), 'HH:mm')}</span>
                                            <span>{apt.status}</span>
                                        </div>
                                        <div className="mt-1 font-semibold">{apt.person.name}</div>
                                        <div className="text-xs opacity-90">{apt.purpose}</div>
                                        <div className="text-xs mt-1">Dr. {apt.slot.doctor.name}</div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )
            })}
        </div>

        {/* Desktop View (Grid) */}
        <div className="hidden md:grid grid-cols-6 min-h-[600px]">
          {/* Time Column */}
          <div className="col-span-1 border-r border-gray-200">
            {HOURS.map(hour => (
              <div key={hour} className="h-24 border-b border-gray-100 relative">
                <span className="absolute -top-3 right-2 text-xs text-gray-400 bg-white px-1">
                  {hour}:00
                </span>
              </div>
            ))}
          </div>

          {/* Days Columns */}
          {DAYS.map(dayOffset => {
            const date = addDays(startDate, dayOffset - 1);
            return (
              <div key={dayOffset} className="col-span-1 border-r border-gray-200 relative">
                {HOURS.map(hour => {
                    const slotAppts = getAppointmentsForSlot(date, hour);
                    return (
                        <div key={`${dayOffset}-${hour}`} className="h-24 border-b border-gray-100 p-1 relative hover:bg-gray-50 transition-colors">
                            {slotAppts.map(apt => (
                                <button
                                    key={apt.id}
                                    onClick={() => onSelectAppointment(apt)}
                                    className={`w-full text-left text-xs p-1 mb-1 rounded border shadow-sm truncate ${getStatusColorClass(apt.status)}`}
                                    title={`${apt.person.name} - ${apt.purpose}`}
                                >
                                    <span className="font-bold block">{apt.person.rank} {apt.person.name.split(' ')[0]}</span>
                                    <span className="opacity-90">{apt.purpose.substring(0, 15)}...</span>
                                </button>
                            ))}
                        </div>
                    );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CalendarView;