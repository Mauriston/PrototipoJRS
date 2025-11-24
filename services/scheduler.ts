import { DOCTOR_SCHEDULES, PERSONNEL_DB } from '../constants';
import { AmpType, Person, ScheduleSlot } from '../types';

export const formatNIP = (value: string): string => {
  const digits = value.replace(/\D/g, '');
  if (digits.length <= 2) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 2)}.${digits.slice(2)}`;
  return `${digits.slice(0, 2)}.${digits.slice(2, 6)}.${digits.slice(6, 8)}`;
};

export const findPersonByNIP = (nip: string): Person | undefined => {
  return PERSONNEL_DB.find(p => p.nip === nip);
};

export const getAvailableSlotsForDate = (date: Date, type: AmpType): ScheduleSlot[] => {
  const dayOfWeek = date.getDay(); // 0-6
  
  // Filter schedules that match the day and the required AMP type
  return DOCTOR_SCHEDULES.filter(slot => 
    slot.dayOfWeek === dayOfWeek && slot.ampType === type
  );
};

export const isDateValid = (date: Date): boolean => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date >= today && date.getDay() !== 0 && date.getDay() !== 6; // No weekends generally (unless schedule allows, but for now block weekends)
};
