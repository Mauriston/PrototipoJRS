import React, { useState, useEffect } from 'react';
import { PURPOSES, ORGANIZATIONS } from '../constants';
import { formatNIP, findPersonByNIP, getAvailableSlotsForDate, isDateValid } from '../services/scheduler';
import { AmpType, Person, ScheduleSlot } from '../types';
import { Search, Calendar as CalendarIcon, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const NewAppointment: React.FC = () => {
  const navigate = useNavigate();

  // State
  const [step, setStep] = useState(1);
  const [nip, setNip] = useState('');
  const [foundPerson, setFoundPerson] = useState<Person | null>(null);
  const [manualPerson, setManualPerson] = useState({ name: '', rank: '' });
  const [om, setOm] = useState('');
  const [purposeId, setPurposeId] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [availableSlots, setAvailableSlots] = useState<ScheduleSlot[]>([]);
  const [selectedSlotIndex, setSelectedSlotIndex] = useState<number | null>(null);

  // Handlers
  const handleNipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = formatNIP(e.target.value);
    setNip(val);
    
    // Auto-search (mock)
    if (val.length === 10) { // 00.0000.00 length
      const person = findPersonByNIP(val);
      if (person) {
        setFoundPerson(person);
      } else {
        setFoundPerson(null);
      }
    }
  };

  const getTargetAmpType = (): AmpType | null => {
    const p = PURPOSES.find(pur => pur.id === purposeId);
    return p ? p.type : null;
  };

  useEffect(() => {
    if (selectedDate && purposeId) {
       const dateObj = new Date(selectedDate);
       const ampType = getTargetAmpType();
       if (ampType && isDateValid(dateObj)) {
         // Fix timezone offset for proper day calculation
         const userTimezoneOffset = dateObj.getTimezoneOffset() * 60000;
         const adjustedDate = new Date(dateObj.getTime() + userTimezoneOffset);
         
         const slots = getAvailableSlotsForDate(adjustedDate, ampType);
         setAvailableSlots(slots);
       } else {
         setAvailableSlots([]);
       }
       setSelectedSlotIndex(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate, purposeId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Agendamento realizado com sucesso! (Protótipo)');
    navigate('/');
  };

  const currentPurpose = PURPOSES.find(p => p.id === purposeId);

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-navy-900">Agendar Inspeção de Saúde</h1>
        <div className="mt-4 flex items-center">
           <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 1 ? 'bg-navy-600 text-white' : 'bg-gray-200 text-gray-500'} font-bold`}>1</div>
           <div className={`flex-1 h-1 mx-2 ${step >= 2 ? 'bg-navy-600' : 'bg-gray-200'}`}></div>
           <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 2 ? 'bg-navy-600 text-white' : 'bg-gray-200 text-gray-500'} font-bold`}>2</div>
           <div className={`flex-1 h-1 mx-2 ${step >= 3 ? 'bg-navy-600' : 'bg-gray-200'}`}></div>
           <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 3 ? 'bg-navy-600 text-white' : 'bg-gray-200 text-gray-500'} font-bold`}>3</div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 sm:p-8">
        
        {/* Step 1: Identification */}
        {step === 1 && (
          <div className="space-y-6 animate-fadeIn">
            <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Dados do Inspecionado</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">NIP (00.0000.00)</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  type="text"
                  value={nip}
                  onChange={handleNipChange}
                  placeholder="00.0000.00"
                  className="focus:ring-navy-500 focus:border-navy-500 block w-full pl-3 pr-10 sm:text-lg border-gray-300 rounded-md py-3"
                  maxLength={10}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
              </div>
              <p className="mt-1 text-xs text-gray-500">Digite o NIP para buscar no banco de dados.</p>
            </div>

            {foundPerson ? (
              <div className="bg-green-50 border border-green-200 rounded-md p-4 flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3" />
                <div>
                  <h3 className="text-sm font-medium text-green-800">Militar Encontrado</h3>
                  <p className="text-sm text-green-700 mt-1">
                    <span className="font-bold">{foundPerson.rank}</span> {foundPerson.name}
                  </p>
                  <p className="text-xs text-green-600 mt-1">{foundPerson.email}</p>
                </div>
              </div>
            ) : nip.length === 10 ? (
               <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
                 <div className="flex">
                    <AlertCircle className="h-5 w-5 text-yellow-500 mr-2" />
                    <span className="text-sm text-yellow-700 font-medium">NIP não encontrado no banco local. Preencha manualmente.</span>
                 </div>
                 <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-medium text-gray-700">Posto/Graduação</label>
                        <input 
                            type="text" 
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-navy-500 focus:border-navy-500 sm:text-sm"
                            value={manualPerson.rank}
                            onChange={(e) => setManualPerson({...manualPerson, rank: e.target.value})}
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-700">Nome Completo</label>
                        <input 
                            type="text" 
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-navy-500 focus:border-navy-500 sm:text-sm"
                            value={manualPerson.name}
                            onChange={(e) => setManualPerson({...manualPerson, name: e.target.value})}
                        />
                    </div>
                 </div>
               </div>
            ) : null}

            <div>
              <label className="block text-sm font-medium text-gray-700">OM (Organização Militar)</label>
              <select
                value={om}
                onChange={(e) => setOm(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-3 text-base border-gray-300 focus:outline-none focus:ring-navy-500 focus:border-navy-500 sm:text-sm rounded-md"
              >
                <option value="">Selecione a OM</option>
                {ORGANIZATIONS.map(o => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
            </div>

            <button
              type="button"
              disabled={!nip || !om || (nip.length===10 && !foundPerson && (!manualPerson.name || !manualPerson.rank))}
              onClick={() => setStep(2)}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-navy-600 hover:bg-navy-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-navy-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Próximo: Finalidade
            </button>
          </div>
        )}

        {/* Step 2: Purpose & Type */}
        {step === 2 && (
          <div className="space-y-6 animate-fadeIn">
            <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Finalidade da Inspeção</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Selecione o motivo da IS</label>
              <div className="space-y-2 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
                {PURPOSES.map(p => (
                  <label 
                    key={p.id} 
                    className={`relative flex items-center p-4 rounded-lg border cursor-pointer transition-all ${
                        purposeId === p.id 
                        ? 'border-navy-500 bg-navy-50 ring-1 ring-navy-500' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="purpose"
                      value={p.id}
                      checked={purposeId === p.id}
                      onChange={(e) => setPurposeId(e.target.value)}
                      className="h-4 w-4 text-navy-600 focus:ring-navy-500 border-gray-300"
                    />
                    <div className="ml-3 block">
                      <span className="block text-sm font-medium text-gray-900">{p.label}</span>
                      <span className={`block text-xs mt-1 ${p.type === AmpType.JRS ? 'text-indigo-600' : 'text-teal-600'}`}>
                         Realizado por: {p.type === AmpType.JRS ? 'Junta Regular de Saúde (JRS)' : 'Médico Perito Isolado (MPI)'}
                      </span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex-1 py-3 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-navy-500"
              >
                Voltar
              </button>
              <button
                type="button"
                disabled={!purposeId}
                onClick={() => setStep(3)}
                className="flex-1 py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-navy-600 hover:bg-navy-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-navy-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Próximo: Data e Horário
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Date & Slot */}
        {step === 3 && (
          <div className="space-y-6 animate-fadeIn">
             <div className="bg-blue-50 p-4 rounded-md border border-blue-100 mb-4">
                 <h3 className="text-sm font-bold text-blue-900 mb-1">Resumo Parcial</h3>
                 <p className="text-sm text-blue-800">Inspecionado: <span className="font-semibold">{foundPerson ? foundPerson.name : manualPerson.name}</span></p>
                 <p className="text-sm text-blue-800">Finalidade: <span className="font-semibold">{currentPurpose?.label}</span></p>
             </div>

             <div>
                <label className="block text-sm font-medium text-gray-700">Data Desejada</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                    <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="focus:ring-navy-500 focus:border-navy-500 block w-full pl-10 sm:text-lg border-gray-300 rounded-md py-3"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <CalendarIcon className="h-5 w-5 text-gray-400" />
                    </div>
                </div>
                <p className="mt-1 text-xs text-gray-500">Selecione uma data para ver os horários disponíveis.</p>
             </div>

             {selectedDate && (
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Horários Disponíveis para {getTargetAmpType()}</label>
                    {availableSlots.length > 0 ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {availableSlots.map((slot, idx) => (
                                <button
                                    key={idx}
                                    type="button"
                                    onClick={() => setSelectedSlotIndex(idx)}
                                    className={`flex flex-col items-center justify-center p-3 rounded-md border text-sm font-medium transition-all ${
                                        selectedSlotIndex === idx
                                            ? 'bg-navy-600 text-white border-navy-600 shadow-md transform scale-105'
                                            : 'bg-white text-gray-700 border-gray-300 hover:border-navy-500 hover:text-navy-600'
                                    }`}
                                >
                                    <span className="text-lg">{slot.startHour}:00 - {slot.endHour}:00</span>
                                    <span className="text-xs opacity-75 mt-1">Dr(a). {slot.doctor.name}</span>
                                </button>
                            ))}
                        </div>
                    ) : (
                        <div className="flex items-center p-4 bg-orange-50 rounded-md border border-orange-200">
                             <Info className="h-5 w-5 text-orange-500 mr-2" />
                             <span className="text-sm text-orange-800">Não há horários disponíveis para esta data. Tente outro dia.</span>
                        </div>
                    )}
                 </div>
             )}

            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="flex-1 py-3 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-navy-500"
              >
                Voltar
              </button>
              <button
                type="submit"
                disabled={selectedSlotIndex === null}
                className="flex-1 py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Confirmar Agendamento
              </button>
            </div>
          </div>
        )}

      </form>
    </div>
  );
};

export default NewAppointment;