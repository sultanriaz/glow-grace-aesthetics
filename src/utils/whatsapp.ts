import { clinic } from '../data/clinic';

export interface WhatsAppLinkParams {
  phone?: string;
  message: string;
}

/**
 * Builds a direct WhatsApp chat link with properly URL-encoded message text.
 */
export function buildWhatsAppLink({ phone = clinic.phone.waNumber, message }: WhatsAppLinkParams): string {
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  const encodedText = encodeURIComponent(message);
  return `https://wa.me/${cleanPhone}?text=${encodedText}`;
}

/**
 * Builds the default appointment booking WhatsApp link.
 */
export function getClinicBookingWhatsAppLink(): string {
  const defaultMessage = `Assalam o Alaikum! I would like to book an appointment at ${clinic.name}.`;
  return buildWhatsAppLink({
    phone: clinic.phone.waNumber,
    message: defaultMessage
  });
}

/**
 * Builds a service-specific appointment inquiry WhatsApp link.
 */
export function getServiceBookingWhatsAppLink(serviceTitle: string): string {
  const serviceMessage = `Assalam o Alaikum! I am interested in ${serviceTitle} at ${clinic.name}. Please share availability.`;
  return buildWhatsAppLink({
    phone: clinic.phone.waNumber,
    message: serviceMessage
  });
}

/**
 * Phone call protocol link.
 */
export function getClinicTelLink(): string {
  return `tel:${clinic.phone.e164}`;
}
