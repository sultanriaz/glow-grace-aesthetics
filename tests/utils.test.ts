import { describe, it, expect } from 'vitest';
import { buildWhatsAppLink, getClinicBookingWhatsAppLink } from '../src/utils/whatsapp';
import { renderTokens } from '../src/utils/tokens';
import {
  getTodayInKarachi,
  isValidBookingDate,
  buildAppointmentMessage,
  buildAppointmentWhatsAppUrl,
  buildBridalPlannerMessage,
  buildBridalPlannerWhatsAppUrl
} from '../src/utils/booking';
import { hasGallery, hasTestimonials } from '../src/utils/visibility';

describe('WhatsApp Utilities', () => {
  it('correctly encodes the default clinic appointment URL as specified in prompt', () => {
    const url = getClinicBookingWhatsAppLink();
    expect(url).toBe(
      'https://wa.me/923134151471?text=Assalam%20o%20Alaikum!%20I%20would%20like%20to%20book%20an%20appointment%20at%20Glow%20%26%20Grace%20Aesthetics.'
    );
  });

  it('builds custom whatsapp link with stripped numbers and encoded text', () => {
    const url = buildWhatsAppLink({
      phone: '+92 313-4151471',
      message: 'Hello Doctor!'
    });
    expect(url).toBe('https://wa.me/923134151471?text=Hello%20Doctor!');
  });
});

describe('Token Rendering Utility', () => {
  it('replaces clinic placeholders in string', () => {
    const input = 'Welcome to {{clinicName}} in {{city}}. Call us at {{phone}}.';
    const output = renderTokens(input);
    expect(output).toBe('Welcome to Glow & Grace Aesthetics in Dera Ghazi Khan. Call us at 0313-4151471.');
  });

  it('preserves unmatched tokens and supports custom tokens', () => {
    const input = 'Hello {{name}} from {{clinicName}}!';
    const output = renderTokens(input, { name: 'Ayesha' });
    expect(output).toBe('Hello Ayesha from Glow & Grace Aesthetics!');
  });
});

describe('Booking Utilities & Date Validation', () => {
  it('returns a valid YYYY-MM-DD date string for Asia/Karachi', () => {
    const today = getTodayInKarachi();
    expect(today).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it('rejects past dates', () => {
    const res = isValidBookingDate('2020-01-01');
    expect(res.valid).toBe(false);
    expect(res.reason).toContain('past');
  });

  it('rejects Sundays', () => {
    // 2026-11-22 is Sunday
    const res = isValidBookingDate('2026-11-22');
    expect(res.valid).toBe(false);
    expect(res.reason).toContain('Sunday');
  });

  it('accepts valid future weekday or Saturday', () => {
    // 2026-11-23 is Monday
    const res = isValidBookingDate('2026-11-23');
    expect(res.valid).toBe(true);
  });

  it('constructs appointment WhatsApp message with formatted lines', () => {
    const msg = buildAppointmentMessage({
      name: 'Fatima',
      service: 'HydraFacial',
      date: '2026-11-23',
      time: 'Evening (5:00 PM - 8:00 PM)',
      note: 'First time visiting'
    });
    expect(msg).toContain('Name: Fatima');
    expect(msg).toContain('Treatment: HydraFacial');
    expect(msg).toContain('Preferred Date: 2026-11-23');
    expect(msg).toContain('First time visiting');

    const url = buildAppointmentWhatsAppUrl({
      name: 'Fatima',
      service: 'HydraFacial',
      date: '2026-11-23',
      time: 'Evening (5:00 PM - 8:00 PM)'
    });
    expect(url).toContain('https://wa.me/923134151471?text=');
  });

  it('constructs bridal planner WhatsApp message', () => {
    const msg = buildBridalPlannerMessage({
      name: 'Amina',
      timeframe: '2-3 Months Before',
      selectedTreatments: ['HydraFacial', 'Skin Brightening Peels'],
      notes: 'Bridal glow consultation'
    });
    expect(msg).toContain('Name: Amina');
    expect(msg).toContain('Timeline to Wedding: 2-3 Months Before');
    expect(msg).toContain('HydraFacial, Skin Brightening Peels');

    const url = buildBridalPlannerWhatsAppUrl({
      name: 'Amina',
      timeframe: '2-3 Months Before'
    });
    expect(url).toContain('https://wa.me/923134151471?text=');
  });
});

describe('Visibility Rules', () => {
  it('returns false for empty gallery items', () => {
    expect(hasGallery([])).toBe(false);
  });

  it('returns true when at least one consented gallery item exists', () => {
    expect(hasGallery([{ data: { consentConfirmed: true } }])).toBe(true);
    expect(hasGallery([{ data: { consentConfirmed: false } }])).toBe(false);
  });

  it('returns false for testimonials when fewer than 3 consented items exist', () => {
    expect(hasTestimonials([])).toBe(false);
    expect(
      hasTestimonials([
        { data: { consentConfirmed: true } },
        { data: { consentConfirmed: true } }
      ])
    ).toBe(false);
  });

  it('returns true for testimonials when 3 or more consented items exist', () => {
    expect(
      hasTestimonials([
        { data: { consentConfirmed: true } },
        { data: { consentConfirmed: true } },
        { data: { consentConfirmed: true } }
      ])
    ).toBe(true);
  });
});
