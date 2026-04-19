````markdown
# CLAUDE.md - Personal Portfolio Website

**Project:** Jason Li – AI Data Architect Portfolio  
**Tech Stack:** Vite + React + TypeScript + Tailwind CSS + Framer Motion  
**Deployment:** Github Page  
**Goal:** Build a modern, fast, professional single-page portfolio website to showcase Jason’s experience as an AI Data Architect. The site should be clean, minimalist, dark/light mode enabled, fully responsive, and highlight his strong Agentic AI, LLM, and GenAI expertise. Link this site in his CV.

## 1. Project Setup Requirements

- Use `npm create vite@latest jason-li-portfolio -- --template react-ts`
- Install Tailwind CSS (`npm install -D tailwindcss postcss autoprefixer` + `npx tailwindcss init -p`)
- Install shadcn-ui
- Additional packages:
  ```bash
  npm install framer-motion lucide-react
  npm install -D @types/node
  ```
````

- Use modern React patterns (functional components, hooks, TypeScript).
- Project must be fully responsive (mobile-first).

## 2. Design & UI/UX Guidelines

- **Theme:** Modern tech aesthetic – clean, minimalist, professional.
- **Color Palette:** Dark mode default (deep navy/black background with cyan/blue accents). Light mode supported.
- **Typography:** Clean sans-serif (Inter or system sans). Large, bold headings.
- **Animations:** Subtle Framer Motion scroll animations (fade-in, slide-up on sections).
- **Navbar:** Sticky, transparent on scroll, logo on left, menu items (Home, About, Experience, Projects, Skills, Awards, Contact), dark/light toggle, “Download CV” button.
- **Mobile:** Hamburger menu.
- **Overall Feel:** Fast, scannable, premium – like a senior tech leader’s portfolio.

## 3. Page Sections (Single Page Application)

### Hero Section

- Full-width hero with name: **LI KWAN HO JASON**
- Title: **AI Data Architect | Senior Data Scientist**
- Short summary (copy from CV):
  > Results-driven AI Data Architect with 10+ years designing scalable GenAI and AI/ML data architectures for enterprise applications. Expertise in **Agentic AI** (multi-agent orchestration, MCPs), **LLM integration** (RAG, prompt engineering, model governance), multi-modal pipelines, and MLOps on AWS (40% cost reduction).
- Subtitle: Proven in translating business, healthcare, and regulatory priorities into production-ready AI strategies… International collaborator (USA, Europe, Australia).
- Buttons:
  - View Projects
  - Download CV (link to latest PDF)
  - Contact Me
- Subtle background: tech gradient or very faint grid pattern.

### About Me

- Professional headshot (placeholder for now).
- Short bio paragraph (reuse CV summary + add international experience).

### Skills

- Exactly match the grouped skills from the CV:
  - **AI Data Architecture & GenAI**
  - **MLOps & Cloud Infrastructure**
  - **Data Governance & Enterprise**
  - **Programming & Tools**
- Use icon + tag style with hover effects.

### Experience

- Vertical timeline format.
- Show the three roles in order (most recent first):
  1. Data Team Lead, Data Scientist – XTRA Sensing Limited (Jan 2024 – Present)
  2. Deputy General Manager, Data Scientist – Tecky Academy (Jul 2019 – Dec 2023)
  3. Business Intelligence Analyst, Programmer – Myndar Co. (Jul 2015 – Jul 2019)
- Include 2–3 strongest bullets per role (copy from final CV).

### Projects (Featured + All Projects)

- Two main categories with headings:

  **LLM, Agentic & Autonomous AI**
  - **Clawix: Open-Source Self-Hosted Multi-Agent AI Orchestration Platform**  
    GitHub: https://github.com/ClawixAI/clawix  
    (Use the three detailed bullets from the final CV)
  - **EAI-Powered Psychological Analysis Platform for Video Consultation Sessions** (Health-Tech) – use both bullets
  - **Sales Data Chatbot for Restaurant Using Catering LLM on Telegram**

  **AIoT & Predictive Maintenance**
  - **Analysis of Industrial Machine Vibration Using Multi-Modal Data Fusion and Transformer** (Best Paper Award – Euro Academic Conference)
  - **LUCID: Resolving Attribution Diffusion in Explainable AI for PCA-Reduced Feature Spaces** (HKIE Paper 2026)

- Each project card must include:
  - Title
  - Short description
  - Tech stack badges
  - GitHub link (especially prominent for Clawix)
  - “View Details” modal or expand if possible

### Research Projects

- Show the three research projects (Multivariate Time Series, Data In-painting, Image Captioning) in a smaller grid.

### Awards & Publications

- Clean cards/grid with all awards and the two publications from the CV.

### Contact

- Email, LinkedIn, GitHub links
- Simple contact form (optional – can use Formspree or just email link)
- Footer with copyright and social icons

## 4. Must-Have Features

- Dark / Light mode toggle (saved in localStorage)
- Smooth scroll navigation
- “Download CV” button (link to Google Drive or direct PDF)
- Fully responsive on all devices
- SEO-friendly meta title: "Jason Li – AI Data Architect | Senior Data Scientist"
- Performance: Lighthouse score > 95
- Clawix project must be the most prominent

## 5. Folder Structure Suggestion

```
src/
├── components/
│   ├── ui/        ← folder for shadcn components
│   ├── navbar.ts
│   ├── hero.tsx
│   ├── about.tsx
│   ├── skills.tsx
│   ├── experience.tsx
│   ├── projects.tsx
│   ├── awards.tsx
│   └── contact.tsx
├── sections/
├── data/          ← put all CV content as JSON or TS objects here
├── utils/
├── assets/
└── App.tsx
```

## 6. Content Source

Use the **exact text** from the final CV I provided in the previous message (the one with Clawix updated). All experience bullets, project descriptions, awards, etc. should be copied verbatim.

## 7. Deployment

- Deploy to Vercel (auto-detect Vite).
- Final URL should be clean (e.g. jasonli.dev or jason-li-portfolio.vercel.app).
- Add to CV header: `Portfolio: https://your-domain.vercel.app`

---

**Remarks**

1. Generate the complete project using the above spec.
2. Make it look premium and senior-level (no childish animations).
3. Prioritize Clawix as the hero project.
4. Use Tailwind classes heavily.
5. Make sure the site is beautiful on mobile.
