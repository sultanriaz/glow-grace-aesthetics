export interface DeveloperProject {
  title: string;
  description: string;
  tags: string[];
  url: string;
}

export interface ClientOffering {
  title: string;
  description: string;
  icon: string;
}

export interface DeveloperSkillGroup {
  category: string;
  skills: string[];
}

export interface SiteStats {
  performance: number;
  accessibility: number;
  bestPractices: number;
  seo: number;
  measuredOn: string;
}

export interface DeveloperData {
  name: string;
  role: string;
  location: string;
  portfolioUrl: string;
  whatsAppUrl: string;
  whatsAppNumber: string;
  githubUrl: string;
  linkedinUrl: string;
  attributionText: string;
  bio: string;
  headline: string;
  siteStats: SiteStats;
  offerings: ClientOffering[];
  projects: DeveloperProject[];
  skillGroups: DeveloperSkillGroup[];
}

const waMessage = "Hi Sultan, I saw your work on the Glow & Grace Aesthetics website and have a project I would like to discuss with you.";
const waEncoded = encodeURIComponent(waMessage);

export const developer: DeveloperData = {
  name: "Sultan Mehmood",
  role: "Software Engineer & Full-Stack Systems Architect",
  location: "Dera Ghazi Khan, Pakistan & Remote Worldwide",
  portfolioUrl: "https://portfolio-cms-ten-beige.vercel.app/",
  whatsAppUrl: `https://wa.me/923229781129?text=${waEncoded}`,
  whatsAppNumber: "923229781129",
  githubUrl: "https://github.com/sultanriaz",
  linkedinUrl: "https://www.linkedin.com/in/sultan-mehmood-24a664300",
  attributionText: "Website by Sultan Mehmood",
  headline: "Applied Machine Learning. Production Architecture. High-Performance Web Engineering.",
  bio: "Software engineer and CS student specialising in Python, Go, applied machine learning, and event-driven backend systems. Focused on building high-integrity AI systems: from grounded RAG and financial sentiment pipelines to containerised event-driven microservices. Dedicated to engineering robust, accessible web architectures that deliver measurable value.",
  siteStats: {
    performance: 100,
    accessibility: 100,
    bestPractices: 100,
    seo: 100,
    measuredOn: "16 November 2026"
  },
  offerings: [
    {
      title: "Custom High-Performance Websites",
      description: "Bespoke Jamstack static architectures (Astro, TypeScript) loading in under 1 second on mobile 4G networks with perfect 100/100 Lighthouse benchmarks.",
      icon: "zap"
    },
    {
      title: "Conversion-Focused UI/UX Design",
      description: "Tailored brand aesthetics engineered to turn website visitors into qualified WhatsApp leads, direct phone calls, and booked appointments.",
      icon: "sparkles"
    },
    {
      title: "Scalable Full-Stack Web Applications",
      description: "Production backends and distributed APIs built with Python (FastAPI), Go (Gin), PostgreSQL, Kafka, and modern React 18 interfaces.",
      icon: "layers"
    },
    {
      title: "Applied AI & Verification Pipelines",
      description: "Citation-verified enterprise document search (RAG), automated guardrails, and multi-agent workflows leveraging Google Gemini and LLMs.",
      icon: "cpu"
    }
  ],
  projects: [
    {
      title: "Compliance Verification System",
      description: "A production multi-agent identity verification and document scoring system designed for enterprise compliance, featuring an event-driven Kafka pipeline, Go API gateway, and Google Gemini document decisioning.",
      tags: ["Go", "Gin", "Python", "FastAPI", "Apache Kafka"],
      url: "https://portfolio-cms-ten-beige.vercel.app/projects/compliance-verification-system"
    },
    {
      title: "Citerator",
      description: "An end-to-end RAG system that answers complex AML and KYC compliance questions with citation-verified responses, backed by hybrid retrieval (dense + sparse), cross-encoder reranking, and automated refusal guardrails.",
      tags: ["Python", "FastAPI", "React", "TypeScript", "Qdrant"],
      url: "https://github.com/sultanriaz/citerator"
    },
    {
      title: "Autonomous Company Intelligence & CRM Outreach Platform",
      description: "Enterprise multi-agent company intelligence and CRM automation engine coordinating 11 autonomous agents, anti-SSRF web crawling, transactional outbox messaging, and React 18 UI.",
      tags: ["Python", "FastAPI", "React 18", "PostgreSQL", "Docker"],
      url: "https://github.com/sultanriaz/company-intelligence-crm"
    },
    {
      title: "Automated Refusal Guardrails & Hallucination Elimination in RAG",
      description: "A systematic benchmark evaluating hybrid retrieval (dense BGE + sparse BM25) and cross-encoder rerankers to enforce zero-hallucination escalation in regulatory document queries.",
      tags: ["Python", "BGE Embeddings", "BM25", "Cross-Encoder"],
      url: "https://github.com/sultanriaz/citerator"
    },
    {
      title: "2D Discrete FFT & Frequency Domain Manipulation Detection",
      description: "Investigating frequency-domain artifacts using 2D Fast Fourier Transform to distinguish synthetic GAN/diffusion media from authentic camera sensor noise.",
      tags: ["Python", "PyTorch", "OpenCV", "NumPy"],
      url: "https://github.com/sultanriaz/deepfake-detector"
    },
    {
      title: "Sub-Millisecond Heuristic Phishing & Homograph URL Classification",
      description: "Fast client-side lexical decomposition and entropy scoring to detect zero-day phishing payloads in optical QR code streams prior to remote API lookups.",
      tags: ["Python", "Heuristic Engines", "Entropy Analysis"],
      url: "https://github.com/sultanriazkhan/6th_GEN_QR_Scanner"
    }
  ],
  skillGroups: [
    {
      category: "Machine Learning & Applied AI",
      skills: ["PyTorch", "scikit-learn", "XGBoost", "SHAP & LIME", "HuggingFace Transformers", "FinBERT", "spaCy", "Pandas", "NumPy"]
    },
    {
      category: "Backend & Distributed Systems",
      skills: ["Go (Gin)", "Python (FastAPI & Flask)", "Apache Kafka", "PostgreSQL", "SQLAlchemy", "Docker", "Redis"]
    },
    {
      category: "LLM & Generative AI Systems",
      skills: ["LangChain", "Google Gemini API", "Hybrid RAG", "Qdrant", "Cross-Encoder Reranking", "Ragas", "Langfuse"]
    },
    {
      category: "Computer Vision & Audio",
      skills: ["OpenCV", "pyttsx3", "gTTS", "PyAudio"]
    },
    {
      category: "Languages & Web Engineering",
      skills: ["Python", "Go", "TypeScript", "JavaScript", "React 18", "HTML5", "CSS3"]
    }
  ]
};
