================================================================================
  E-Waste 360° — Understanding, Managing & Reducing E-Waste
================================================================================

Course   : CHE110 – Environmental Studies
Task     : Continuous Assessment 1 (CA 1)
Topic    : E-Waste Management in the IT and Electronics Industry
Copyright: 2026 — Academic Project (not for commercial use)

================================================================================
  TEAM MEMBERS
================================================================================

  1. Shubham Raj
     Reg. No. : 12601402
     Roll No.  : RQ1P2609A18

  2. Pragati Shrivastava
     Reg. No. : 12621130
     Roll No.  : RQ1P2609A17

  3. Aman Kumar
     Reg. No. : 12609606
     Roll No.  : RQ1P2609A16

================================================================================
  ABOUT THE PROJECT
================================================================================

E-Waste 360° is an educational website that explores e-waste management in
the IT and electronics industry. It covers what e-waste is, why it matters,
how it is managed, and what individuals and businesses can do about it.

The site combines easy-to-understand content with interactive tools — a
knowledge quiz, a personal responsibility self-check, and a gamified 5-day
challenge — all wrapped in a modern, accessibility-conscious, fully
responsive design.

Every statistic and claim is drawn from credible published sources (see the
References page), and where a figure involves estimation, the site says so
honestly.

================================================================================
  HOW TO RUN
================================================================================

  1. Open the folder in File Explorer.
  2. Double-click "index.html" to open it in your default browser.
  3. No server, build tools, or installation required.

  The site works entirely offline once fonts and icons are cached.
  All features run in the browser with vanilla JavaScript.

================================================================================
  PROJECT STRUCTURE
================================================================================

  CA 1 Product/
  |
  |-- index.html              Home page — hero, principles, journey map
  |-- e-waste.html            What is E-Waste? Definition, examples, why it differs
  |-- industry.html           IT & Electronics industry drivers of e-waste
  |-- lifecycle.html          The 10-stage e-waste lifecycle (interactive timeline)
  |-- impact.html             Environmental impact: soil, water, air pollution
  |-- india.html              E-Waste management in India, EPR explained
  |-- business.html           Business solutions, linear vs circular model
  |-- management.html         7-step management process, 5Rs flip cards
  |-- you-do.html             What YOU can do (Students / Consumers / Businesses)
  |-- quiz.html               Interactive quiz, self-check, 5-day challenge
  |-- references.html         Sources and references
  |-- about.html              About the project and team
  |
  |-- css/
  |   |-- style.css           All styles — dark theme, components, animations
  |
  |-- js/
  |   |-- components.js       Shared navbar, footer, page pager, scroll-to-top
  |   |-- main.js             Interactivity — quiz engine, self-check, challenge,
  |                           particles, tilt cards, modals, counters, reveals
  |
  |-- README.txt              This file

================================================================================
  PAGE DESCRIPTIONS
================================================================================

  index.html (Home)
    Hero section with particle canvas, animated counters (62M+ tonnes,
    22% recycling rate, $55M+ recovered value), four core principles
    (Reuse, Repair, Recycle, Reduce), journey map linking to all content
    pages, and key takeaways.

  e-waste.html (E-Waste Basics)
    Definition of e-waste, flip cards showing 9 common examples
    (smartphones, laptops, computers, monitors, printers, TVs, chargers,
    batteries, components), and a section explaining why e-waste differs
    from normal household waste.

  industry.html (IT & Electronics Industry)
    Six factors driving e-waste generation: rapid upgrades, short
    lifecycles, component waste, batteries/accessories, consumer
    replacement, and planned/software obsolescence. Visual flow diagram
    of the e-waste generation chain.

  lifecycle.html (The E-Waste Lifecycle)
    Interactive timeline with 10 stages — from raw materials through
    manufacturing, distribution, consumer use, repair, reuse, collection,
    recycling, material recovery, to safe disposal. Each stage opens a
    modal with detailed information.

  impact.html (Environmental Impact)
    Five expandable impact cards: soil pollution, water pollution, air
    pollution, hazardous substances, and resource loss. Animated stat
    banner with global e-waste figures from the UN Global E-waste Monitor.

  india.html (E-Waste in India)
    Role cards for six stakeholders: government, manufacturers, consumers,
    collection centres, recyclers, and businesses. Explains Extended
    Producer Responsibility (EPR) with a dedicated highlighted box.

  business.html (Business Solutions)
    Ten business solutions (design for durability, repairability, take-back
    programs, responsible recycling, component reuse, inventory management,
    sustainable packaging, employee awareness, responsible disposal,
    circular economy). Visual comparison of linear vs circular models.

  management.html (5Rs & Management)
    Seven-step e-waste management process (collection → safe disposal)
    shown as numbered cards. Five flip cards for the 5Rs: Refuse, Reduce,
    Repair, Reuse, Recycle — click to flip and read full explanations.

  you-do.html (What YOU Can Do)
    Tabbed interface with action lists for Students, Consumers, and
    Businesses. Each tab shows role-specific steps to reduce e-waste.

  quiz.html (Interactive Quiz & Tools)
    Three interactive tools:
      • E-Waste Knowledge Quiz — 10 shuffled MCQs with instant feedback,
        explanations, timer, progress bar, best-score tracking (localStorage).
      • Self-Check — 5-question responsibility score calculator.
      • 5-Day E-Waste Challenge — checklist with localStorage persistence
        and confetti animation on completion.

  references.html (References)
    Seven sources: UN Global E-waste Monitor, ITU, UNEP, CPCB, MoEFCC,
    WHO, and the Basel Convention — all linked with descriptions.

  about.html (About the Project)
    Project overview, team member cards with registration and roll numbers,
    and course information.

================================================================================
  INTERACTIVE FEATURES
================================================================================

  • Particle Canvas      — Hero section particle animation with connecting
                           lines (respects prefers-reduced-motion)
  • Scroll Reveal        — Elements fade in on scroll via IntersectionObserver
  • Animated Counters    — Number counters animate when scrolled into view
  • 3D Tilt Cards        — Cards tilt on mouse hover (disabled on touch)
  • Button Ripple        — Click ripple effect on all buttons
  • Scroll Progress Bar  — Fixed progress bar at top of page
  • Page Pager           — Previous/Next navigation between content pages
  • Responsive Navbar    — Collapsible menu with dropdown submenus on mobile
  • Scroll-to-Top Button — Appears after scrolling down
  • Flip Cards           — 5Rs and e-waste examples flip on click/hover
  • Lifecycle Modal      — Click timeline stages for detailed popups
  • Impact Card Toggle   — Click to expand/collapse details
  • Tabs                 — Switch between Students / Consumers / Businesses
  • Quiz Engine          — Shuffled questions, keyboard shortcuts (1-4, Enter),
                           progress tracking, results with review list
  • Self-Check Score     — Radio-based responsibility scoring
  • 5-Day Challenge      — Checkbox-based tracker with localStorage
  • Confetti             — Celebration animation on challenge completion
  • Toast Notifications  — Brief notification popups

================================================================================
  TECHNOLOGIES USED
================================================================================

  • HTML5         Semantic markup, data attributes
  • CSS3          Custom properties, Grid, Flexbox, animations, gradients,
                  backdrop-filter, conic-gradient, perspective/3D transforms
  • JavaScript    Vanilla ES5-compatible (no frameworks, no build tools)
  • Fonts         Google Fonts — Poppins, Inter, Space Grotesk
  • Icons         Font Awesome 6.5.1 (CDN)
  • Storage       localStorage for quiz best score and challenge progress

  No npm, no bundler, no transpiler — the site runs directly from files.

================================================================================
  DESIGN CHOICES
================================================================================

  • Dark theme with green (#00e5a0) and cyan (#0bb6ff) accent palette
  • CSS custom properties for easy theming
  • Consistent spacing and border-radius via design tokens
  • Accessibility: prefers-reduced-motion support, aria labels, semantic HTML
  • Mobile-first responsive layout (breakpoints at ~768px and ~1100px)
  • All shared UI (navbar, footer, pager) injected via components.js
    to avoid repetition across 12 HTML pages

================================================================================
  DATA SOURCES
================================================================================

  1. Global E-waste Monitor — ewastemonitor.info
  2. International Telecommunication Union (ITU) — itu.int
  3. United Nations Environment Programme (UNEP) — unep.org
  4. Central Pollution Control Board (CPCB) — cpcb.nic.in
  5. Ministry of Environment, Forest & Climate Change (MoEFCC) — moef.gov.in
  6. World Health Organization (WHO) — who.int
  7. Basel Convention — basel.int

================================================================================
  ACADEMIC NOTICE
================================================================================

  This project was developed as an academic assignment for
  CHE110 – Environmental Studies (CA 1). It is not intended for
  commercial use. All content was researched and compiled by the
  team members listed above.

================================================================================
