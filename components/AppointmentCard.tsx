import React from 'react';
import { Appointment, InspectionStatus, AmpType } from '../types';
import { Calendar, User, FileText, MapPin, Clock, Stethoscope } from 'lucide-react';

interface Props {
  appointment: Appointment;
}

const getStatusColor = (status: InspectionStatus) => {
  switch (status) {
    case InspectionStatus.SCHEDULED: return 'bg-blue-100 text-blue-800 border-blue-200';
    case InspectionStatus.COMPLETED: return 'bg-green-100 text-green-800 border-green-200';
    case InspectionStatus.CANCELLED: return 'bg-red-100 text-red-800 border-red-200';
    default: return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const AppointmentCard: React.FC<Props> = ({ appointment }) => {
  const isJRS = appointment.ampType === AmpType.JRS;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300">
      <div className={`h-2 w-full ${isJRS ? 'bg-indigo-600' : 'bg-teal-500'}`} />
      <div className="p-5">
        <div className="flex justify-between items-start mb-4">
          <div>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(appointment.status)}`}>
              {appointment.status}
            </span>
            <h3 className="mt-2 text-lg font-bold text-gray-900">{appointment.purpose}</h3>
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              {isJRS ? 'Junta Regular de Saúde' : 'Médico Perito Isolado'}
            </span>
          </div>
          <div className="text-right">
             <div className="flex items-center text-gray-600 text-sm font-medium">
                <Calendar className="w-4 h-4 mr-1" />
                {new Date(appointment.date).toLocaleDateString('pt-BR')}
             </div>
             <div className="flex items-center justify-end text-gray-600 text-sm mt-1">
                <Clock className="w-4 h-4 mr-1" />
                {appointment.slot.startHour}:00 - {appointment.slot.endHour}:00
             </div>
          </div>
        </div>
        
        <div className="border-t border-gray-100 pt-4 space-y-2">
            <div className="flex items-center text-sm text-gray-700">
                <User className="w-4 h-4 mr-2 text-navy-500" />
                <span className="font-semibold mr-1">{appointment.person.rank}</span> {appointment.person.name}
            </div>
            <div className="flex items-center text-sm text-gray-700">
                <MapPin className="w-4 h-4 mr-2 text-navy-500" />
                {appointment.om}
            </div>
             <div className="flex items-center text-sm text-gray-700">
                <Stethoscope className="w-4 h-4 mr-2 text-navy-500" />
                Dr(a). {appointment.slot.doctor.name}
            </div>
             <div className="flex items-center text-sm text-gray-500 mt-2">
                <FileText className="w-4 h-4 mr-2 text-gray-400" />
                NIP: {appointment.person.nip}
            </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentCard;