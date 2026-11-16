export type AnalyticsEventName =
  | 'whatsapp_click'
  | 'call_click'
  | 'directions_click'
  | 'booking_submit'
  | 'bridal_submit'
  | 'map_loaded'
  | 'dev_whatsapp_click'
  | 'dev_portfolio_click';

export interface WhatsAppClickProps {
  placement: 'header' | 'hero' | 'floating' | 'service_detail' | 'category' | 'bridal' | 'footer' | 'faq' | 'contact';
  service?: string;
}

export interface CallClickProps {
  placement: 'header' | 'hero' | 'contact' | 'footer';
}

export interface DirectionsClickProps {
  placement: 'contact' | 'footer';
}

export interface BookingSubmitProps {
  service: string;
  has_date: boolean;
  has_note: boolean;
}

export interface BridalSubmitProps {
  timeline: string;
  treatments_count: number;
}

export interface MapLoadedProps {
  placement: 'contact';
}

export interface DevClickProps {
  source: 'developer_page';
}

export type AnalyticsEventPayloads = {
  whatsapp_click: WhatsAppClickProps;
  call_click: CallClickProps;
  directions_click: DirectionsClickProps;
  booking_submit: BookingSubmitProps;
  bridal_submit: BridalSubmitProps;
  map_loaded: MapLoadedProps;
  dev_whatsapp_click: DevClickProps;
  dev_portfolio_click: DevClickProps;
};

/**
 * Validates whether analytics tracking is permitted under strict privacy controls:
 * 1. Provider must explicitly be configured as 'vercel'
 * 2. Window object must be present (client-side)
 * 3. Visitor Do Not Track (DNT) must NOT be enabled
 * 4. Visitor Global Privacy Control (GPC) must NOT be enabled
 */
export function isAnalyticsAllowed(): boolean {
  if (typeof window === 'undefined') return false;

  const provider = import.meta.env.PUBLIC_ANALYTICS_PROVIDER || 'none';
  if (provider !== 'vercel') return false;

  const nav = window.navigator as any;
  if (nav && (nav.doNotTrack === '1' || nav.globalPrivacyControl === true)) {
    return false;
  }

  return true;
}

/**
 * Dispatches a privacy-preserving custom event.
 * Never logs personal names, phone numbers, or free-text queries.
 */
export function track<T extends AnalyticsEventName>(
  eventName: T,
  eventData?: AnalyticsEventPayloads[T] | Record<string, string | number | boolean>
): void {
  if (!isAnalyticsAllowed()) return;

  if (typeof window !== 'undefined' && typeof window.va === 'function') {
    try {
      window.va('event', {
        name: eventName,
        data: eventData || {}
      });
    } catch {
      // Silently discard errors so clinic UI is never disrupted
    }
  }
}
