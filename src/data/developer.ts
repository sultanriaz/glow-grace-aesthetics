export interface DeveloperData {
  name: string;
  role: string;
  portfolioUrl: string;
  whatsAppUrl: string;
  whatsAppNumber: string;
  githubUrl: string;
  linkedinUrl: string;
  attributionText: string;
}

const waMessage = "Hi Sultan, I saw the Glow & Grace Aesthetics website and would like to discuss a project.";
const waEncoded = encodeURIComponent(waMessage);

export const developer: DeveloperData = {
  name: "Sultan Mehmood",
  role: "Software Engineer & Applied ML Developer",
  portfolioUrl: "https://portfolio-cms-ten-beige.vercel.app/",
  whatsAppUrl: `https://wa.me/923229781129?text=${waEncoded}`,
  whatsAppNumber: "923229781129",
  githubUrl: "https://github.com/sultanriaz",
  linkedinUrl: "https://www.linkedin.com/in/sultan-mehmood-24a664300",
  attributionText: "Website by Sultan Mehmood"
};
