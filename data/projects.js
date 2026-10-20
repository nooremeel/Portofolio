/**
 * Solstice Portfolio — Projects & Profile Data Source
 * 
 * Profile: Nour Emil — Backend & Full-Stack Developer
 * Cairo, Egypt | nooremeel1@gmail.com | github.com/nooremeel | linkedin.com/in/nour-emil
 */

window.PORTFOLIO_DATA = {
  profile: {
    name: "Nour Emil",
    title: "Backend & Full-Stack Developer",
    location: "Cairo, Egypt",
    phone: "+20 120 448 1994",
    email: "nooremeel1@gmail.com",
    eyebrow: "00 — BACKEND & FULL-STACK DEVELOPER",
    headlineLine1: "Engineering resilient",
    headlineLine2: "backend architectures,",
    headlineLine3: "verified with 250+ automated tests.",
    lead: "Backend-focused developer building rock-solid APIs, ACID transaction pipelines, and security-hardened applications. Top ~5% AI trainer at Outlier, CS graduate from Assiut University.",
    availability: "Available for Junior Backend or Full-Stack Roles",
    bio: [
      "I am a backend-focused full-stack developer based in Cairo, Egypt, specializing in Node.js, TypeScript, PostgreSQL, and MongoDB. I care deeply about transaction safety, security hardening, and test-driven architecture.",
      "I've built and deployed multi-vendor marketplaces handling ACID checkouts and HMAC-SHA512 webhook verification, engineered AI-powered bookmark managers with Google Gemini and SSRF protection, and automated CI pipelines with 250+ integration and unit tests.",
      "In addition to building software, I am an AI Data Trainer & QA at Outlier, selected for the Oracle program (top ~5% of contributors) for high-reasoning evaluations and rubric-based QA."
    ],
    stats: [
      { value: "250+", label: "Automated Tests Written" },
      { value: "100%", label: "ACID Concurrency Safety" },
      { value: "Top 5%", label: "Outlier Oracle Contributor" },
      { value: "3", label: "Production Apps Deployed" }
    ],
    skillsGrouped: [
      {
        category: "Backend Engineering",
        skills: [
          "Node.js", "Express 5", "TypeScript", "REST APIs",
          "GraphQL", "Socket.io", "ACID Transactions", "Paymob Gateway"
        ]
      },
      {
        category: "Databases & Storage",
        skills: [
          "PostgreSQL 16", "MongoDB (Atlas, Mongoose)", "SQL Migrations",
          "tsvector / GIN Indexing", "Row-Level Locking", "Foreign Keys"
        ]
      },
      {
        category: "Testing & CI/CD",
        skills: [
          "Vitest", "Jest", "Supertest", "React Testing Library",
          "MSW (Mock Service Worker)", "GitHub Actions (Node 20 & 22)", "Docker Compose"
        ]
      },
      {
        category: "Security & Hardening",
        skills: [
          "HMAC-SHA512 Webhooks", "SSRF Defense", "httpOnly JWT Auth",
          "CSRF Protection", "Helmet", "Bcrypt", "Rate Limiting", "ReDoS Escaping"
        ]
      },
      {
        category: "Frontend & Cloud Tools",
        skills: [
          "React 18", "Vite", "Tailwind CSS", "TanStack Query",
          "Docker", "Vercel", "Render", "Neon DB", "Postman", "Git / GitHub"
        ]
      }
    ],
    experience: [
      {
        role: "AI Data Trainer & Quality Assurance",
        company: "Outlier (Remote)",
        period: "Nov 2024 – Present",
        badge: "Oracle Program (Top ~5%)",
        highlights: [
          "Completed 300+ expert-level RLHF and rubric-based evaluations, rating AI responses for logical reasoning, code correctness, and accuracy.",
          "Selected for Outlier's prestigious Oracle program (top ~5% of contributors) for consistent evaluation rigor and QA quality."
        ]
      }
    ],
    education: {
      degree: "B.Sc. in Computer Science",
      institution: "Assiut University",
      period: "2020 – 2024",
      gpa: "GPA 3.4 / 4.0",
      languages: "Arabic (Native) · English (C1, TOEFL ITP 640)"
    },
    certifications: [
      "McKinsey & Company Forward Program (Structured Thinking & Agile)",
      "Node.js: The Complete Guide (MVC, REST, GraphQL) — Academind",
      "Google Data Analytics Professional Certificate",
      "Google Crash Course on Python"
    ],
    social: {
      github: "https://github.com/nooremeel",
      linkedin: "https://linkedin.com/in/nour-emil",
      email: "nooremeel1@gmail.com",
      phone: "+20 120 448 1994",
      resume: "Nour_Emil_Resume.pdf"
    }
  },

  projects: [
    {
      id: "atelier-market-postgres",
      title: "Atelier Market: PostgreSQL & Docker Edition",
      tagline: "Re-architected marketplace backend featuring ACID checkouts, row-level locking, and tsvector full-text search.",
      category: "Backend",
      year: "2026",
      featured: true,
      badge: "🔒 ACID & 20-Concurrent Safe",
      tags: ["Node.js", "Express 5", "PostgreSQL 16", "Docker", "GitHub Actions", "Vitest"],
      description: "Production-ready backend re-architected from MongoDB to PostgreSQL using versioned SQL migrations, Foreign Keys, CHECK constraints, and containerized Docker CI testing.",
      problem: "E-commerce platforms frequently encounter inventory race conditions during flash sales where multiple concurrent buyers attempt to purchase the same limited-stock item simultaneously, along with slow regex-based search queries that choke database performance.",
      solution: "Engineered checkout as an atomic ACID transaction with row-level locking (SELECT ... FOR UPDATE) and conditional balance updates, verified safe by a 20-concurrent-buyer test suite. Replaced regex scans with PostgreSQL tsvector and GIN full-text index ranking.",
      architecture: [
        "ACID Transactions with Row-Level Locking: Used `SELECT ... FOR UPDATE` on inventory rows to eliminate race conditions and double-selling.",
        "PostgreSQL 16 tsvector & GIN Indexing: Implemented native full-text catalog search with dictionary stemming and relevance ranking.",
        "Relational Integrity: Structured versioned SQL migrations, foreign key cascading, and database-level CHECK constraints.",
        "Containerized CI Pipeline: Configured Docker Compose and automated GitHub Actions running integration test suites against live PostgreSQL service containers.",
        "Cloud Deployment: API container deployed on Render with Neon Serverless PostgreSQL."
      ],
      metrics: [
        { label: "Concurrency Safety", value: "20 Buyers Safe" },
        { label: "Catalog Search", value: "Sub-50ms GIN" },
        { label: "Database Engine", value: "PostgreSQL 16" },
        { label: "CI Validation", value: "100% Automated" }
      ],
      links: {
        github: "https://github.com/nooremeel/atelier-market-postgres",
        live: "https://atelier-market-postgres-iota.vercel.app",
        docs: "#"
      }
    },
    {
      id: "atelier-market",
      title: "Atelier Market: Multi-Vendor Marketplace",
      tagline: "Full-stack artisanal marketplace with Paymob payments, 3-D Secure, and 258 automated tests.",
      category: "Full-Stack",
      year: "2026",
      featured: true,
      badge: "⚡ 258 Automated Tests",
      tags: ["Node.js", "Express 5", "React 18", "TypeScript", "MongoDB", "TanStack Query", "Tailwind CSS", "Vitest"],
      description: "Full-stack marketplace with customer, seller, and admin roles, integrated with Paymob payment gateway, constant-time HMAC-SHA512 webhook verification, atomic inventory decrements, and bilingual English/Arabic RTL support.",
      problem: "Online marketplaces struggle with order confirmation loss when customers close browsers before returning from third-party payment gateways, along with vulnerable webhook endpoints prone to replay and timing attacks.",
      solution: "Integrated Paymob payment gateway with 3-D Secure, constant-time HMAC-SHA512 webhook signature verification, and an automated reconciliation fallback mechanism so orders are confirmed even if the customer never navigates back to the site.",
      architecture: [
        "Constant-Time HMAC-SHA512 Webhook Verification: Prevents timing attacks on asynchronous payment event notifications.",
        "Payment Reconciliation Fallback: Queries gateway transaction status automatically if client-side redirection fails.",
        "Atomic Inventory Updates: Multi-SKU product variant inventory decremented atomically at cart and checkout with compare-at pricing.",
        "Live 4-Stage Order Tracking & Streamed PDFKit Invoices: Real-time customer delivery updates and server-streamed PDF receipts.",
        "Comprehensive Test Coverage: 258 automated tests (85 backend integration tests with Vitest, Supertest & in-memory MongoDB; 173 frontend tests with Vitest, React Testing Library & MSW).",
        "Internationalization: Full English and Arabic (RTL) localization."
      ],
      metrics: [
        { label: "Automated Tests", value: "258 Tests" },
        { label: "Webhook Security", value: "HMAC-SHA512" },
        { label: "Order Tracking", value: "4 Stages" },
        { label: "Localization", value: "EN & AR (RTL)" }
      ],
      links: {
        github: "https://github.com/nooremeel/Atelier-Market",
        live: "https://atelier-market-liard.vercel.app",
        docs: "#"
      }
    },
    {
      id: "gistly",
      title: "Gistly: AI-Powered Bookmark Manager",
      tagline: "Smart content bookmark manager with Google Gemini AI summarization and hardened SSRF security.",
      category: "Full-Stack",
      year: "2026",
      featured: true,
      badge: "🤖 Gemini AI + SSRF Shield",
      tags: ["Node.js", "Express 5", "React 18", "TypeScript", "MongoDB", "Google Gemini", "Jest", "Vitest", "GitHub Actions"],
      description: "AI-enhanced bookmark manager that automatically fetches web pages and YouTube transcripts to generate concise summaries and tags via Google Gemini, featuring hardened SSRF defense and dual-node CI matrix testing.",
      problem: "User-submitted URL fetchers create dangerous Server-Side Request Forgery (SSRF) vulnerabilities that can expose internal cloud metadata and private IP networks. In addition, third-party AI API timeouts frequently crash or block core bookmark saving.",
      solution: "Engineered a hardened URL fetcher that strictly blocks private IPv4/IPv6 ranges, loopback addresses, and cloud metadata endpoints. Added strict timeouts and fallback mechanisms to ensure bookmarks always save even when upstream AI services are unavailable.",
      architecture: [
        "SSRF Defense Layer: Validates and sanitizes destination IPs before dispatching requests, blocking access to 127.0.0.1, 169.254.169.254, and private VPC ranges.",
        "Graceful Gemini AI Fallbacks: Asynchronous summarization with configurable timeouts so bookmarked links are saved instantly regardless of AI availability.",
        "ReDoS-Proof Search Engine: Search across titles, summaries, notes, URLs, and tags with regex escaping to eliminate Denial of Service attacks.",
        "Dual-Node CI Matrix: GitHub Actions automated workflow testing backend suites (Jest, Supertest, in-memory MongoDB, mocked Gemini) across Node.js 20 and 22.",
        "Hardened Auth: httpOnly JWT cookies, bcrypt password hashing, Helmet security headers, injection sanitization, and per-route rate limiting."
      ],
      metrics: [
        { label: "AI Reliability", value: "100% Fallback" },
        { label: "SSRF Protection", value: "Zero Leakage" },
        { label: "CI Test Matrix", value: "Node 20 & 22" },
        { label: "Search Security", value: "ReDoS Escaped" }
      ],
      links: {
        github: "https://github.com/nooremeel/GISTLY",
        live: "https://gistly-frontend.vercel.app",
        docs: "#"
      }
    }
  ]
};
