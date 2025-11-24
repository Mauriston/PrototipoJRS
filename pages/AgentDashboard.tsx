import React, { useState } from 'react';
import CalendarView from '../components/CalendarView';
import { Appointment, InspectionStatus, AmpType, Doctor } from '../types';
import { MOCK_APPOINTMENTS, DOCTOR_SCHEDULES } from '../constants';
import { ChevronLeft, ChevronRight, X, User, FileText, Activity } from 'lucide-react';
import { addWeeks, subWeeks, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

// Extract unique doctors for filter
const DOCTORS = Array.from(new Set(DOCTOR_SCHEDULES.map(s => s.doctor))).sort((a,b) => a.name.localeCompare(b.name));

const AgentDashboard: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedDoctorId, setSelectedDoctorId] = useState<string>('all');
  const [appointments, setAppointments] = useState<Appointment[]>(MOCK_APPOINTMENTS);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);

  const handleNextWeek = () => setSelectedDate(addWeeks(selectedDate, 1));
  const handlePrevWeek = () => setSelectedDate(subWeeks(selectedDate, 1));

  const filteredAppointments = selectedDoctorId === 'all' 
    ? appointments 
    : appointments.filter(a => a.slot.doctor.id === selectedDoctorId);

  const handleStatusUpdate = (newStatus: InspectionStatus) => {
    if (selectedAppointment) {
      const updated = appointments.map(a => 
        a.id === selectedAppointment.id ? { ...a, status: newStatus } : a
      );
      setAppointments(updated);
      setSelectedAppointment({ ...selectedAppointment, status: newStatus });
    }
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col p-4 bg-gray-50">
      {/* Header Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-4">
        <div>
           <h1 className="text-2xl font-bold text-navy-900 flex items-center">
             <Activity className="w-6 h-6 mr-2" />
             Área do Perito
           </h1>
           <p className="text-sm text-gray-500">Gerencie a agenda da Junta de Saúde e Peritos Isolados</p>
        </div>

        <div className="flex items-center gap-4 bg-white p-2 rounded shadow-sm border border-gray-200">
           <div className="flex items-center">
              <button onClick={handlePrevWeek} className="p-1 hover:bg-gray-100 rounded-full">
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
              <span className="mx-3 font-medium text-gray-800 w-32 text-center">
                 {format(selectedDate, 'MMMM yyyy', { locale: ptBR })}
              </span>
              <button onClick={handleNextWeek} className="p-1 hover:bg-gray-100 rounded-full">
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>
           </div>
           
           <div className="h-6 w-px bg-gray-300 mx-2 hidden md:block"></div>

           <select 
             className="text-sm border-gray-300 rounded focus:ring-navy-500 focus:border-navy-500"
             value={selectedDoctorId}
             onChange={(e) => setSelectedDoctorId(e.target.value)}
           >
             <option value="all">Todos os Agentes</option>
             {DOCTORS.map((doc, idx) => (
                 <option key={`${doc.id}-${idx}`} value={doc.id}>{doc.rank} {doc.name}</option>
             ))}
           </select>
        </div>
      </div>

      {/* Calendar View */}
      <div className="flex-1 min-h-0">
        <CalendarView 
            appointments={filteredAppointments} 
            selectedDate={selectedDate}
            onSelectAppointment={setSelectedAppointment}
        />
      </div>

      {/* Appointment Details Modal */}
      {selectedAppointment && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setSelectedAppointment(null)}></div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex justify-between items-start">
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                        Detalhes da Inspeção
                    </h3>
                    <button onClick={() => setSelectedAppointment(null)} className="text-gray-400 hover:text-gray-500">
                        <X className="w-5 h-5" />
                    </button>
                </div>
                
                <div className="mt-4 space-y-4">
                    {/* Person Details */}
                    <div className="bg-gray-50 p-3 rounded border border-gray-200">
                        <div className="flex items-center text-navy-800 font-bold mb-1">
                            <User className="w-4 h-4 mr-2" />
                            {selectedAppointment.person.rank} {selectedAppointment.person.name}
                        </div>
                        <div className="text-sm text-gray-600 pl-6">
                            <p>NIP: {selectedAppointment.person.nip}</p>
                            <p>Email: {selectedAppointment.person.email}</p>
                            <p>OM: {selectedAppointment.om}</p>
                        </div>
                    </div>

                    {/* Inspection Details */}
                    <div>
                        <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Dados da Perícia</h4>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <p className="text-gray-500">Finalidade</p>
                                <p className="font-medium text-gray-900">{selectedAppointment.purpose}</p>
                            </div>
                            <div>
                                <p className="text-gray-500">Tipo</p>
                                <p className="font-medium text-gray-900">{selectedAppointment.ampType === AmpType.JRS ? 'Junta Regular (JRS)' : 'Perito Isolado (MPI)'}</p>
                            </div>
                            <div>
                                <p className="text-gray-500">Agente</p>
                                <p className="font-medium text-gray-900">{selectedAppointment.slot.doctor.rank} {selectedAppointment.slot.doctor.name}</p>
                            </div>
                            <div>
                                <p className="text-gray-500">Data/Hora</p>
                                <p className="font-medium text-gray-900">{format(new Date(selectedAppointment.date), "dd/MM/yyyy HH:mm")}</p>
                            </div>
                        </div>
                    </div>

                    {/* Status Control */}
                    <div className="border-t border-gray-100 pt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Atualizar Status</label>
                        <select
                            value={selectedAppointment.status}
                            onChange={(e) => handleStatusUpdate(e.target.value as InspectionStatus)}
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-navy-500 focus:border-navy-500 sm:text-sm rounded-md"
                        >
                            {Object.values(InspectionStatus).map(status => (
                                <option key={status} value={status}>{status}</option>
                            ))}
                        </select>
                    </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={() => setSelectedAppointment(null)}
                  className="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-navy-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgentDashboard;