import { describe, it, expect, beforeEach, vi } from 'vitest';
import { track, isAnalyticsAllowed } from '../src/utils/analytics';

describe('Analytics Utility & Privacy Controls', () => {
  beforeEach(() => {
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
  });

  it('drops tracking by default when provider is "none" or undefined', () => {
    vi.stubGlobal('window', {
      navigator: { doNotTrack: '0', globalPrivacyControl: false },
      va: vi.fn()
    });
    vi.stubEnv('PUBLIC_ANALYTICS_PROVIDER', 'none');

    expect(isAnalyticsAllowed()).toBe(false);

    track('whatsapp_click', { placement: 'header' });
    expect((window as any).va).not.toHaveBeenCalled();
  });

  it('respects Do Not Track (DNT) signal even when provider is "vercel"', () => {
    const mockVa = vi.fn();
    vi.stubGlobal('window', {
      navigator: { doNotTrack: '1', globalPrivacyControl: false },
      va: mockVa
    });
    vi.stubEnv('PUBLIC_ANALYTICS_PROVIDER', 'vercel');

    expect(isAnalyticsAllowed()).toBe(false);

    track('call_click', { placement: 'header' });
    expect(mockVa).not.toHaveBeenCalled();
  });

  it('respects Global Privacy Control (GPC) signal even when provider is "vercel"', () => {
    const mockVa = vi.fn();
    vi.stubGlobal('window', {
      navigator: { doNotTrack: '0', globalPrivacyControl: true },
      va: mockVa
    });
    vi.stubEnv('PUBLIC_ANALYTICS_PROVIDER', 'vercel');

    expect(isAnalyticsAllowed()).toBe(false);

    track('booking_submit', { service: 'Hydrafacial', has_date: true, has_note: false });
    expect(mockVa).not.toHaveBeenCalled();
  });

  it('dispatches event to window.va when vercel provider is active and privacy signals permit', () => {
    const mockVa = vi.fn();
    vi.stubGlobal('window', {
      navigator: { doNotTrack: '0', globalPrivacyControl: false },
      va: mockVa
    });
    vi.stubEnv('PUBLIC_ANALYTICS_PROVIDER', 'vercel');

    expect(isAnalyticsAllowed()).toBe(true);

    track('whatsapp_click', { placement: 'service_detail', service: 'Chemical Peels' });
    expect(mockVa).toHaveBeenCalledWith('event', {
      name: 'whatsapp_click',
      data: { placement: 'service_detail', service: 'Chemical Peels' }
    });
  });

  it('fails silently without throwing if window.va throws an internal error', () => {
    const mockThrowingVa = vi.fn(() => {
      throw new Error('Vercel Analytics SDK internal network drop');
    });
    vi.stubGlobal('window', {
      navigator: { doNotTrack: '0', globalPrivacyControl: false },
      va: mockThrowingVa
    });
    vi.stubEnv('PUBLIC_ANALYTICS_PROVIDER', 'vercel');

    expect(() => {
      track('map_loaded', { placement: 'contact' });
    }).not.toThrow();
  });
});
