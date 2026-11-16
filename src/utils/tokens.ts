import { clinic } from '../data/clinic';

/**
 * Replace placeholders like {{clinicName}}, {{phone}}, etc. with values from clinic.ts
 */
export function renderTokens(text: string, customTokens?: Record<string, string>): string {
  if (!text) return '';

  const defaultTokens: Record<string, string> = {
    clinicName: clinic.name,
    shortName: clinic.shortName,
    tagline: clinic.tagline,
    phone: clinic.phone.display,
    phoneE164: clinic.phone.e164,
    waNumber: clinic.phone.waNumber,
    address: `${clinic.address.line1}, ${clinic.address.line2}, ${clinic.address.cityFull}`,
    line1: clinic.address.line1,
    line2: clinic.address.line2,
    city: clinic.address.cityFull,
    cityShort: clinic.address.city,
    hours: clinic.hours.displaySummary
  };

  const allTokens = { ...defaultTokens, ...customTokens };

  return text.replace(/\{\{\s*([a-zA-Z0-9_]+)\s*\}\}/g, (match, key) => {
    return key in allTokens ? allTokens[key] : match;
  });
}
