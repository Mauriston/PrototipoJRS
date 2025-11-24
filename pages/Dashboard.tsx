import React from 'react';
import AppointmentCard from '../components/AppointmentCard';
import { Appointment } from '../types';
import { MOCK_APPOINTMENTS } from '../constants';
import { PlusCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  // Using MOCK_APPOINTMENTS from constants to share state visualization with Agent Dashboard
  // In a real app, this would come from an API/Context
  const myAppointments: Appointment[] = MOCK_APPOINTMENTS.slice(0, 2); 

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">Meus Agendamentos</h1>
          <p className="text-gray-500 text-sm mt-1">Gerencie suas inspeções de saúde da Junta Regular e Perito Isolado.</p>
        </div>
        <Link to="/agendar" className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-navy-600 hover:bg-navy-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-navy-500 w-full sm:w-auto">
          <PlusCircle className="w-5 h-5 mr-2" />
          Novo Agendamento
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {myAppointments.map(apt => (
          <AppointmentCard key={apt.id} appointment={apt} />
        ))}
      </div>
      
      {myAppointments.length === 0 && (
         <div className="text-center py-20 bg-white rounded-lg border border-dashed border-gray-300">
             <p className="text-gray-500">Nenhum agendamento encontrado.</p>
         </div>
      )}
    </div>
  );
};

export default Dashboard;