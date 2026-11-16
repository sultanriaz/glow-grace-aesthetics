export const MAP_QUERY = "YCDO Ghazi National Hospital, Samina Chowk, Multan Road, Dera Ghazi Khan";

export function getMapSearchUrl(query: string = MAP_QUERY): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

export function getMapDirectionsUrl(query: string = MAP_QUERY): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(query)}`;
}

export function getMapEmbedUrl(query: string = MAP_QUERY): string {
  return `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
}
