import { clinic } from '../data/clinic';

export interface ClinicStatus {
  isOpen: boolean;
  statusText: string;
  nextChangeText: string;
}

/**
 * Calculates current clinic open/closed status in Asia/Karachi time zone (UTC+5).
 * Safe to run both on server and in browser.
 */
export function getClinicStatus(date: Date = new Date()): ClinicStatus {
  try {
    // Format to Asia/Karachi time
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: clinic.hours.timezone,
      weekday: 'long',
      hour: 'numeric',
      minute: 'numeric',
      hour12: false
    });

    const parts = formatter.formatToParts(date);
    const weekday = parts.find((p) => p.type === 'weekday')?.value || '';
    const hour = parseInt(parts.find((p) => p.type === 'hour')?.value || '0', 10);
    const minute = parseInt(parts.find((p) => p.type === 'minute')?.value || '0', 10);

    const currentTimeMinutes = hour * 60 + minute;
    const isSunday = weekday.toLowerCase() === 'sunday';

    // Mon - Sat: 10:00 (600 mins) to 22:00 (1320 mins)
    const openTimeMinutes = 10 * 60; // 10:00 AM
    const closeTimeMinutes = 22 * 60; // 10:00 PM

    if (!isSunday && currentTimeMinutes >= openTimeMinutes && currentTimeMinutes < closeTimeMinutes) {
      return {
        isOpen: true,
        statusText: "Open Now",
        nextChangeText: "Closes at 10:00 PM"
      };
    } else {
      let nextChange = "Opens Monday at 10:00 AM";
      if (!isSunday) {
        if (currentTimeMinutes < openTimeMinutes) {
          nextChange = "Opens today at 10:00 AM";
        } else {
          nextChange = weekday.toLowerCase() === 'saturday' ? "Opens Monday at 10:00 AM" : "Opens tomorrow at 10:00 AM";
        }
      }
      return {
        isOpen: false,
        statusText: "Closed Now",
        nextChangeText: nextChange
      };
    }
  } catch {
    return {
      isOpen: false,
      statusText: "Mon - Sat: 10 AM - 10 PM",
      nextChangeText: "Sunday: Closed"
    };
  }
}
