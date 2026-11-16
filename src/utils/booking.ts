import { clinic } from '../data/clinic';
import { buildWhatsAppLink } from './whatsapp';

export interface AppointmentFormData {
  name: string;
  service: string;
  date: string; // YYYY-MM-DD
  time: string;
  note?: string;
}

export interface BridalPlannerData {
  name: string;
  weddingDate?: string;
  timeframe?: string;
  selectedTreatments?: string[];
  notes?: string;
}

/**
 * Get current date string in Asia/Karachi timezone (YYYY-MM-DD)
 */
export function getTodayInKarachi(): string {
  const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Karachi',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
  return formatter.format(new Date());
}

/**
 * Validates a booking date according to clinic rules:
 * - Must not be in the past (in Asia/Karachi)
 * - Must not be a Sunday (clinic is closed)
 */
export function isValidBookingDate(dateStr: string): { valid: boolean; reason?: string } {
  if (!dateStr || !/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    return { valid: false, reason: 'Please select a valid date in YYYY-MM-DD format.' };
  }

  const todayStr = getTodayInKarachi();
  if (dateStr < todayStr) {
    return { valid: false, reason: 'Appointments cannot be booked for past dates.' };
  }

  // Parse YYYY-MM-DD in UTC to get day of week reliably without local timezone offsets
  const [year, month, day] = dateStr.split('-').map(Number);
  const dateObj = new Date(Date.UTC(year, month - 1, day, 12, 0, 0));
  const dayOfWeek = dateObj.getUTCDay(); // 0 = Sunday

  if (dayOfWeek === 0) {
    return { valid: false, reason: 'Our clinic is closed on Sundays. Please choose Monday to Saturday.' };
  }

  return { valid: true };
}

/**
 * Formats appointment request details into a clean WhatsApp text message.
 */
export function buildAppointmentMessage(data: AppointmentFormData): string {
  const parts = [
    `Assalam o Alaikum! I would like to request an appointment at ${clinic.name}.`,
    '',
    `• Name: ${data.name.trim()}`,
    `• Treatment: ${data.service.trim()}`,
    `• Preferred Date: ${data.date}`,
    `• Preferred Time: ${data.time}`
  ];

  if (data.note && data.note.trim()) {
    const cleanNote = data.note.trim().slice(0, 300);
    parts.push(`• Notes: ${cleanNote}`);
  }

  parts.push('', 'Please let me know doctor availability.');
  return parts.join('\n');
}

/**
 * Generates the full WhatsApp URL for an appointment request.
 */
export function buildAppointmentWhatsAppUrl(data: AppointmentFormData): string {
  const message = buildAppointmentMessage(data);
  return buildWhatsAppLink({
    phone: clinic.phone.waNumber,
    message
  });
}

/**
 * Formats bridal consultation planner details into a clean WhatsApp text message.
 */
export function buildBridalPlannerMessage(data: BridalPlannerData): string {
  const parts = [
    `Assalam o Alaikum! I would like to consult about a Bridal Plan at ${clinic.name}.`,
    '',
    `• Name: ${data.name.trim()}`
  ];

  if (data.timeframe) {
    parts.push(`• Timeline to Wedding: ${data.timeframe.trim()}`);
  }

  if (data.weddingDate) {
    parts.push(`• Approximate Event Date: ${data.weddingDate}`);
  }

  if (data.selectedTreatments && data.selectedTreatments.length > 0) {
    parts.push(`• Treatments of Interest: ${data.selectedTreatments.join(', ')}`);
  }

  if (data.notes && data.notes.trim()) {
    const cleanNotes = data.notes.trim().slice(0, 300);
    parts.push(`• Special Focus / Notes: ${cleanNotes}`);
  }

  parts.push('', 'Please advise on doctor consultation availability for bridal planning.');
  return parts.join('\n');
}

/**
 * Generates the full WhatsApp URL for a bridal planner request.
 */
export function buildBridalPlannerWhatsAppUrl(data: BridalPlannerData): string {
  const message = buildBridalPlannerMessage(data);
  return buildWhatsAppLink({
    phone: clinic.phone.waNumber,
    message
  });
}
