export interface ClinicHours {
  timezone: string;
  schedule: Array<{
    day: string;
    dayIndex: number; // 0 = Sun, 1 = Mon, ..., 6 = Sat
    open: string;
    close: string;
    isClosed: boolean;
  }>;
  displaySummary: string;
}

export interface ClinicDoctor {
  name: string | null;
  title: string | null;
  bio: string | null;
  photo: string | null;
  qualifications: string[];
}

export interface ClinicSocial {
  facebook: string | null;
  instagram: string | null;
  tiktok: string | null;
  youtube: string | null;
}

export interface ClinicRegistration {
  pmdc: string | null;
  phc: string | null;
}

export interface ClinicEmergency {
  label: string;
  number: string;
}

export interface ClinicData {
  name: string;
  shortName: string;
  tagline: string;
  legalName: string | null;
  registration: ClinicRegistration;
  emergency: ClinicEmergency;
  address: {
    line1: string;
    line2: string;
    city: string;
    cityFull: string;
    region: string;
    country: string;
    countryCode: string;
    formatted: string;
  };
  phone: {
    display: string;
    e164: string;
    waNumber: string;
  };
  hours: ClinicHours;
  social: ClinicSocial;
  doctor: ClinicDoctor;
}

export const clinic: ClinicData = {
  name: "Glow & Grace Aesthetics",
  shortName: "Glow & Grace",
  tagline: "Hair, Body, Skin Care & Aesthetics",
  // TODO(client): Provide official legal registered company name, e.g. "Glow & Grace Aesthetics (Pvt) Ltd"
  legalName: null,
  registration: {
    // TODO(client): Provide PMDC registration number of supervising medical practitioner
    pmdc: null,
    // TODO(client): Provide Punjab Healthcare Commission (PHC) clinic registration/license number
    phc: null
  },
  emergency: {
    label: "Rescue 1122",
    number: "1122"
  },
  address: {
    line1: "YCDO Ghazi National Hospital",
    line2: "Near Samina Chowk, Multan Road",
    city: "DG Khan",
    cityFull: "Dera Ghazi Khan",
    region: "Punjab",
    country: "Pakistan",
    countryCode: "PK",
    formatted: "YCDO Ghazi National Hospital, Near Samina Chowk, Multan Road, Dera Ghazi Khan, Punjab, Pakistan"
  },
  phone: {
    display: "0313-4151471",
    e164: "+923134151471",
    waNumber: "923134151471"
  },
  hours: {
    timezone: "Asia/Karachi",
    schedule: [
      { day: "Monday", dayIndex: 1, open: "10:00", close: "22:00", isClosed: false },
      { day: "Tuesday", dayIndex: 2, open: "10:00", close: "22:00", isClosed: false },
      { day: "Wednesday", dayIndex: 3, open: "10:00", close: "22:00", isClosed: false },
      { day: "Thursday", dayIndex: 4, open: "10:00", close: "22:00", isClosed: false },
      { day: "Friday", dayIndex: 5, open: "10:00", close: "22:00", isClosed: false },
      { day: "Saturday", dayIndex: 6, open: "10:00", close: "22:00", isClosed: false },
      { day: "Sunday", dayIndex: 0, open: "", close: "", isClosed: true }
    ],
    displaySummary: "Mon - Sat: 10:00 AM - 10:00 PM | Sunday: Closed"
  },
  social: {
    // TODO(client): Provide official Facebook page link
    facebook: null,
    // TODO(client): Provide official Instagram profile link
    instagram: null,
    // TODO(client): Provide official TikTok profile link
    tiktok: null,
    // TODO(client): Provide official YouTube channel link
    youtube: null
  },
  doctor: {
    // TODO(client): Provide lead doctor name
    name: null,
    // TODO(client): Provide lead doctor title
    title: null,
    // TODO(client): Provide lead doctor bio
    bio: null,
    // TODO(client): Provide lead doctor photo
    photo: null,
    // TODO(client): Provide lead doctor qualifications
    qualifications: []
  }
};
