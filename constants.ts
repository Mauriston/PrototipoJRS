import { AmpType, Doctor, InspectionPurpose, Person, ScheduleSlot, Appointment, InspectionStatus } from './types';

// Personnel Database (Doctors extracted from OCR)
export const PERSONNEL_DB: Person[] = [
  // Doctors (AMP)
  { rank: 'CT (MD)', nip: '13.0450.24', name: 'MAURISTON RENAN MARTINS SILVA', email: 'mauriston.martins@marinha.mil.br' },
  { rank: 'CT (RM2-MD)', nip: '19.0270.36', name: 'JÚLIO CÉSAR XAVIER FILHO', email: 'julio.xavier@marinha.mil.br' },
  { rank: '2T (RM2-MD)', nip: '25.0035.26', name: 'MARCELO FULCO TRINDADE', email: 'marcelo.trindade@marinha.mil.br' },
  { rank: '1T (MD)', nip: '19.0316.11', name: 'SALYNE REGINA MARTINS ROBERTO', email: 'salyne.martins@marinha.mil.br' },
  { rank: '1T (MD)', nip: '19.0294.71', name: 'LUCAS LUZ NUNES', email: 'lucas.luz@marinha.mil.br' },
  
  // Sample Personnel (Command & Staff from OCR)
  { rank: 'CMG (MD)', nip: '97.0429.27', name: 'LISA TIEMI OGAWA', email: 'lisa@marinha.mil.br' },
  { rank: 'CF (CD)', nip: '01.0486.60', name: 'EZENILDES RAMOS DE MIRANDA', email: 'e.miranda@marinha.mil.br' },
  { rank: 'SO-AV-VN', nip: '95.1135.76', name: 'TONI ALVES DE OLIVEIRA', email: 'toni.oliveira@marinha.mil.br' },
  { rank: '1SG-EF', nip: '04.0102.21', name: 'THIAGO LEONARDO DOS SANTOS', email: 'thiago.leonardo@marinha.mil.br' },
  { rank: 'CB-RM2', nip: '24.3937.20', name: 'ROGER DE ARRUDA MONTEIRO', email: 'roger.monteiro@marinha.mil.br' },
  { rank: 'MN-RM2', nip: '21.4482.21', name: 'DANILO BARBOSA DO NASCIMENTO', email: 'danilo.barbosa@marinha.mil.br' }
];

// Doctors definition mapped from DB
export const DR_MAURISTON: Doctor = { id: 'mauriston', name: 'Mauriston Renan', rank: 'CT (MD)' };
export const DR_JULIO: Doctor = { id: 'julio', name: 'Júlio César', rank: 'CT (RM2-MD)' };
export const DR_TRINDADE: Doctor = { id: 'trindade', name: 'Marcelo Trindade', rank: '2T (RM2-MD)' };
export const DR_SALYNE: Doctor = { id: 'salyne', name: 'Salyne Regina', rank: '1T (MD)' };
export const DR_LUZ: Doctor = { id: 'luz', name: 'Lucas Luz', rank: '1T (MD)' };

// Schedule Rules
export const DOCTOR_SCHEDULES: ScheduleSlot[] = [
  // MPI Schedules
  // CT (Md) Mauriston: Sextas-feiras das 13h às 15h.
  { doctor: DR_MAURISTON, dayOfWeek: 5, startHour: 13, endHour: 15, ampType: AmpType.MPI },
  // CT (Md) Júlio César: Segundas das 8h às 12h.
  { doctor: DR_JULIO, dayOfWeek: 1, startHour: 8, endHour: 12, ampType: AmpType.MPI },
  // 2T (RM2-Md) Trindade: Segundas e quartas das 8h às 12h.
  { doctor: DR_TRINDADE, dayOfWeek: 1, startHour: 8, endHour: 12, ampType: AmpType.MPI },
  { doctor: DR_TRINDADE, dayOfWeek: 3, startHour: 8, endHour: 12, ampType: AmpType.MPI },

  // JRS Schedules
  // CT (Md) Mauriston: Terças e quartas das 8h às 12h.
  { doctor: DR_MAURISTON, dayOfWeek: 2, startHour: 8, endHour: 12, ampType: AmpType.JRS },
  { doctor: DR_MAURISTON, dayOfWeek: 3, startHour: 8, endHour: 12, ampType: AmpType.JRS },
  // 1T (Md) Salyne: Terças às quintas das 8h às 12h.
  { doctor: DR_SALYNE, dayOfWeek: 2, startHour: 8, endHour: 12, ampType: AmpType.JRS },
  { doctor: DR_SALYNE, dayOfWeek: 3, startHour: 8, endHour: 12, ampType: AmpType.JRS },
  { doctor: DR_SALYNE, dayOfWeek: 4, startHour: 8, endHour: 12, ampType: AmpType.JRS },
  // 1T (Md) Luz: Terças e sextas das 8h às 12h.
  { doctor: DR_LUZ, dayOfWeek: 2, startHour: 8, endHour: 12, ampType: AmpType.JRS },
  { doctor: DR_LUZ, dayOfWeek: 5, startHour: 8, endHour: 12, ampType: AmpType.JRS },
];

// Inspection Purposes mapped to AMP Type
export const PURPOSES: InspectionPurpose[] = [
  { id: '1', label: 'Concessão de Benefícios', type: AmpType.JRS },
  { id: '2', label: 'Controle Semestral de Raio-X', type: AmpType.MPI },
  { id: '3', label: 'Controle Trienal', type: AmpType.MPI },
  { id: '4', label: 'Deixar o SAM', type: AmpType.MPI },
  { id: '5', label: 'Deixar o SMI', type: AmpType.MPI },
  { id: '6', label: 'Deixar o SMV', type: AmpType.MPI },
  { id: '7', label: 'Licença para Tratamento de Pessoa da Família', type: AmpType.JRS },
  { id: '8', label: 'Reengajamento para SMV / Deixar o SMV', type: AmpType.MPI },
  { id: '9', label: 'Tarefa por Tempo Certo', type: AmpType.MPI },
  { id: '10', label: 'Término de Incapacidade', type: AmpType.JRS },
  { id: '11', label: 'Término de Restrições', type: AmpType.JRS },
  { id: '12', label: 'Verificação de Aptidão para Prosseguimento no Curso', type: AmpType.JRS },
  { id: '13', label: 'Verificação de Deficiência Funcional', type: AmpType.JRS },
  { id: '14', label: 'Ingresso', type: AmpType.JRS },
  { id: '15', label: 'Engajamento', type: AmpType.MPI },
  { id: '16', label: 'Missão no Exterior', type: AmpType.MPI },
];

export const ORGANIZATIONS = [
  'HNRe', 'CPPE', 'EAMPE', 'CMNE', 'HNM', 'Ciama', 'Outras OM'
];

// Initial Mock Data for Calendar visualization
export const MOCK_APPOINTMENTS: Appointment[] = [
  {
    id: '1',
    person: PERSONNEL_DB[6], // Toni Alves
    om: 'HNRe',
    purpose: PURPOSES[2].label, // Controle Trienal (MPI)
    ampType: AmpType.MPI,
    date: new Date(new Date().setHours(8, 0, 0, 0)), // Today 8am
    slot: DOCTOR_SCHEDULES[1], // Julio Mon 8-12
    status: InspectionStatus.SCHEDULED
  },
  {
    id: '2',
    person: PERSONNEL_DB[8], // Romario
    om: 'CPPE',
    purpose: PURPOSES[9].label, // Término de Incapacidade (JRS)
    ampType: AmpType.JRS,
    date: new Date(new Date().setHours(10, 0, 0, 0)), 
    slot: DOCTOR_SCHEDULES[6], // Salyne Tue 8-12
    status: InspectionStatus.AUDIT
  },
  {
    id: '3',
    person: PERSONNEL_DB[9], // Aline
    om: 'EAMPE',
    purpose: PURPOSES[12].label, // Verificação de Deficiência Funcional (JRS)
    ampType: AmpType.JRS,
    date: new Date(new Date().setHours(9, 0, 0, 0)),
    slot: DOCTOR_SCHEDULES[9], // Luz Tue 8-12
    status: InspectionStatus.SCHEDULED
  }
];