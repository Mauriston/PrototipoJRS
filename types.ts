export enum UserRank {
  CMG = 'CMG',
  CF = 'CF',
  CC = 'CC',
  CT = 'CT',
  T1 = '1T',
  T2 = '2T',
  GM = 'GM',
  SO = 'SO',
  SG1 = '1SG',
  SG2 = '2SG',
  SG3 = '3SG',
  CB = 'CB',
  MN = 'MN',
  CIVIL = 'CIVIL'
}

export enum InspectionStatus {
  SCHEDULED = 'Agendada',
  RESCHEDULED = 'Remarcada',
  CANCELLED = 'Cancelada',
  ABSENT = 'Falta',
  COMPLETED = 'Concluída',
  AUDIT = 'Em Auditoria',
  REVISION = 'Em Revisão Ex-officio'
}

export enum AmpType {
  MPI = 'MPI', // Médico Perito Isolado
  JRS = 'JRS'  // Junta Regular de Saúde
}

export interface Person {
  nip: string;
  rank: string;
  name: string;
  email: string;
}

export interface Doctor {
  id: string;
  name: string;
  rank: string;
}

export interface ScheduleSlot {
  doctor: Doctor;
  dayOfWeek: number; // 0 = Sunday, 1 = Monday, etc.
  startHour: number;
  endHour: number;
  ampType: AmpType;
}

export interface Appointment {
  id: string;
  person: Person;
  om: string;
  purpose: string;
  ampType: AmpType;
  date: Date;
  slot: ScheduleSlot;
  status: InspectionStatus;
}

export interface InspectionPurpose {
  id: string;
  label: string;
  type: AmpType;
}