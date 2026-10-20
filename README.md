# Nour Emil — Developer Portfolio

A high-performance, cinematic personal portfolio website engineered with the **Solstice Design System**. Designed to showcase backend engineering rigor, distributed system architectures, and refined frontend taste with zero third-party dependencies.

---

## 🌟 Highlights & Features

- **Solstice Design System:** Deep dusk palette with warm sunset gradient accents (`amber` / `coral` / `violet`), sleek glassmorphism panels, and ambient parallax floating orbs.
- **Data-Driven Architecture:** All profile metadata, technical skills, milestones, and projects are centralized in `data/projects.js`. Adding or updating projects takes less than 30 seconds with zero structural HTML edits.
- **Interactive Case Studies:** In-depth modal dialogs for featured projects breaking down:
  - Business problem & concurrency bottlenecks
  - Engineering solution & architecture diagrams
  - Quantified production metrics
  - Direct links to GitHub repositories and live deployments
- **Tactile Micro-Interactions:**
  - Cursor-following radial spotlights on glass cards (`--mx`, `--my`)
  - Magnetic button pull effects on hover
  - Staggered headline mask text reveal on page load
  - Smooth scroll progress bar at the top navigation
- **Theme Switcher:** Dark (dusk) and Light mode toggle with automatic system preference detection and `localStorage` persistence.
- **Zero-Bloat Performance:** 100% vanilla web technologies (HTML5, Vanilla CSS tokens, Modular JS) — no heavy frameworks or runtime dependencies, sub-50ms TTFB, and 60+ FPS animations.
- **Accessible & Responsive:** Mobile-first layout tested across 375px, 768px, and 1280px+ viewports, visible keyboard focus indicators, and full respect for `prefers-reduced-motion`.

---

## 🛠️ Tech Stack & Typography

- **Structure:** Semantic HTML5 (`header`, `nav`, `main`, `section`, `article`, `footer`)
- **Styling:** Vanilla CSS with CSS Custom Properties / Design Tokens
- **Logic:** Vanilla JavaScript (ES6+), Event Delegation, IntersectionObserver, requestAnimationFrame
- **Typography:**
  - Headlines: [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk)
  - Body: [Inter](https://fonts.google.com/specimen/Inter)
  - Code & Monospace Labels: [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono)

---

## 📁 Project Structure

```
├── index.html               # Semantic page structure & section anchors
├── css/
│   └── style.css            # Solstice design tokens, glassmorphism, animations, responsive rules
├── data/
│   └── projects.js          # Centralized data source for profile, skills, and projects
├── js/
│   └── app.js               # Render engine, spotlights, magnetic buttons, modal manager, theme toggle
├── Nour_Emil_Resume.pdf     # Publicly served resume file accessible at /Nour_Emil_Resume.pdf
├── .gitignore               # Excludes internal reference design files
└── README.md                # Project documentation
```

---

## 🚀 Adding a New Project

Adding a new project is completely decoupled from the HTML. Simply open `data/projects.js` and append a new object to the `projects` array:

```javascript
{
  id: "my-new-project",
  title: "Distributed Rate Limiter",
  tagline: "Token-bucket rate limiting gateway with Redis-backed distributed state.",
  category: "Backend",
  year: "2026",
  badge: "⚡ Sub-10ms P99",
  tags: ["Node.js", "Redis", "Docker", "Vitest"],
  description: "High-throughput edge rate-limiting middleware protecting downstream microservices.",
  problem: "Burst traffic caused database connection pool exhaustion...",
  solution: "Implemented a sliding-window token bucket algorithm with Redis transactions...",
  architecture: [
    "Sliding-window counters backed by atomic Redis Lua scripts.",
    "Prometheus metrics scraping for real-time rejection rates."
  ],
  metrics: [
    { label: "P99 Latency", value: "< 8ms" },
    { label: "Throughput", value: "25k req/s" }
  ],
  links: {
    github: "https://github.com/nooremeel/my-new-project",
    live: "https://demo.example.com"
  }
}
```

The website will **automatically**:
1. Render the new project card in the grid.
2. Generate category filter buttons if a new category is introduced.
3. Wire up the Case Study modal and interactive cursor spotlight.

---

## 💻 Local Development

No build steps or dependencies needed! You can run this project locally in any of the following ways:

```bash
# Option 1: Using Node.js npx serve
npx serve .

# Option 2: Using Python built-in server
python -m http.server 3000

# Option 3: Simply double-click index.html in your file explorer
```

---

## 👤 Author

**Nour Emil**  
Backend & Full-Stack Developer — Cairo, Egypt  

- **GitHub:** [@nooremeel](https://github.com/nooremeel)  
- **LinkedIn:** [linkedin.com/in/nour-emil](https://linkedin.com/in/nour-emil)  
- **Email:** [nooremeel1@gmail.com](mailto:nooremeel1@gmail.com)  
- **Resume:** [View Resume](Nour_Emil_Resume.pdf)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
