/**
 * Solstice Portfolio — Interactive Logic & Component Manager
 * 
 * Features:
 * - Dynamic project rendering & category filtering
 * - Mouse-following radial spotlight on glass cards
 * - Magnetic buttons & parallax orbs
 * - Interactive Case Study modal with deep architecture dive
 * - Live Project Generator & Code Exporter tool
 * - Dark / Light theme switcher with localStorage persistence
 * - Mobile navigation drawer
 */

(function () {
  'use strict';

  // Utility selectors
  const $ = (selector, parent = document) => parent.querySelector(selector);
  const $$ = (selector, parent = document) => Array.from(parent.querySelectorAll(selector));

  // Accessibility check for reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Active state
  let currentFilter = 'All';
  let activeModal = null;

  // Data extraction with safe fallbacks
  const data = window.PORTFOLIO_DATA || { profile: {}, projects: [] };
  const { profile, projects } = data;

  /**
   * 1. Initialize Theme Switcher
   */
  function initTheme() {
    const themeBtn = $('#theme-toggle');
    const mobileThemeBtn = $('#mobile-theme-toggle');
    const root = document.documentElement;

    const savedTheme = localStorage.getItem('solstice-theme');
    if (savedTheme) {
      root.setAttribute('data-theme', savedTheme);
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      root.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
    }

    function toggleTheme() {
      const current = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      const nextTheme = current === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', nextTheme);
      localStorage.setItem('solstice-theme', nextTheme);
      updateThemeButtons(nextTheme);
    }

    function updateThemeButtons(theme) {
      const label = theme === 'dark' ? '◐ Light' : '◑ Dark';
      if (themeBtn) themeBtn.textContent = label;
      if (mobileThemeBtn) mobileThemeBtn.textContent = label;
    }

    updateThemeButtons(root.getAttribute('data-theme'));

    if (themeBtn) themeBtn.addEventListener('click', toggleTheme);
    if (mobileThemeBtn) mobileThemeBtn.addEventListener('click', toggleTheme);
  }

  /**
   * 2. Initialize Mobile Navigation
   */
  function initMobileNav() {
    const toggleBtn = $('#mobile-menu-btn');
    const drawer = $('#mobile-nav-drawer');
    if (!toggleBtn || !drawer) return;

    toggleBtn.addEventListener('click', () => {
      const isOpen = drawer.classList.toggle('open');
      toggleBtn.setAttribute('aria-expanded', String(isOpen));
      toggleBtn.textContent = isOpen ? '✕ Close' : '☰ Menu';
    });

    // Close when clicking nav links
    $$('a', drawer).forEach(link => {
      link.addEventListener('click', () => {
        drawer.classList.remove('open');
        toggleBtn.setAttribute('aria-expanded', 'false');
        toggleBtn.textContent = '☰ Menu';
      });
    });
  }

  /**
   * 3. Populate Profile Information
   */
  function populateProfile() {
    if (!profile) return;

    // Availability tag
    const availElem = $('#availability-status');
    if (availElem && profile.availability) {
      availElem.textContent = profile.availability;
    }

    // Lead text
    const leadElem = $('#hero-lead');
    if (leadElem && profile.lead) {
      leadElem.textContent = profile.lead;
    }

    // Social & Email links
    if (profile.social) {
      const mailLinks = $$('.contact-email-link');
      mailLinks.forEach(link => {
        link.href = `mailto:${profile.social.email}`;
        if (link.dataset.fillEmail) link.textContent = profile.social.email;
      });

      const ghLink = $('#social-github');
      if (ghLink && profile.social.github) ghLink.href = profile.social.github;

      const liLink = $('#social-linkedin');
      if (liLink && profile.social.linkedin) liLink.href = profile.social.linkedin;

      const twLink = $('#social-twitter');
      if (twLink && profile.social.twitter) twLink.href = profile.social.twitter;

      const resumeLink = $('#resume-btn');
      if (resumeLink) {
        const resumeVal = profile.social?.resume;
        if (resumeVal && resumeVal !== '#') {
          resumeLink.href = resumeVal;
          if (!resumeVal.startsWith('mailto:')) {
            resumeLink.target = '_blank';
            resumeLink.rel = 'noopener noreferrer';
          }
        } else {
          // Pre-filled mailto request so clicking never scrolls to #
          const mailSubject = encodeURIComponent(`Resume Request - ${profile.name || 'Nour Emil'}`);
          const mailBody = encodeURIComponent(`Hi Nour,\n\nI came across your portfolio and would like to request a copy of your resume.\n\nBest regards,`);
          resumeLink.href = `mailto:${profile.social?.email || 'nooremeel1@gmail.com'}?subject=${mailSubject}&body=${mailBody}`;
        }
      }
    }

    // Render Stats
    renderStats();

    // Render Skills
    renderSkills();
  }

  /**
   * 4. Render Stats Strip
   */
  function renderStats() {
    const statsContainer = $('#stats-grid');
    if (!statsContainer || !profile.stats) return;

    statsContainer.innerHTML = profile.stats.map((stat, idx) => `
      <div class="stat-item rv" style="--d: ${idx + 1}">
        <div class="stat-num gt">${stat.value}</div>
        <p>${stat.label}</p>
      </div>
    `).join('');
  }

  /**
   * 5. Render Skills Grouped
   */
  function renderSkills() {
    const skillsContainer = $('#skills-container');
    if (!skillsContainer || !profile.skillsGrouped) return;

    skillsContainer.innerHTML = profile.skillsGrouped.map((group, idx) => `
      <div class="glass pad skill-category-card rv" style="--d: ${idx + 1}">
        <h3><span class="gt">#</span> ${group.category}</h3>
        <div class="chips-row">
          ${group.skills.map(s => `<span class="chip">${s}</span>`).join('')}
        </div>
      </div>
    `).join('');
  }

  /**
   * 6. Render Projects & Filter Chips
   */
  function initProjectFilters() {
    const filterContainer = $('#project-filter-bar');
    if (!filterContainer) return;

    const categories = ['All', ...new Set(projects.map(p => p.category))];

    filterContainer.innerHTML = categories.map(cat => `
      <button class="chip ${cat === currentFilter ? 'on' : ''}" data-category="${cat}">
        ${cat}
      </button>
    `).join('');

    $$('button.chip', filterContainer).forEach(btn => {
      btn.addEventListener('click', () => {
        $$('button.chip', filterContainer).forEach(b => b.classList.remove('on'));
        btn.classList.add('on');
        currentFilter = btn.dataset.category;
        renderProjects();
      });
    });
  }

  function renderProjects() {
    const grid = $('#projects-grid');
    if (!grid) return;

    const filtered = currentFilter === 'All'
      ? projects
      : projects.filter(p => p.category === currentFilter);

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div class="glass pad" style="grid-column: 1/-1; text-align: center; padding: 3rem;">
          <p style="color: var(--muted); font-size: 1.1rem;">No projects found in this category.</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = filtered.map((project, idx) => {
      const tagsHtml = (project.tags || []).slice(0, 4).map(t => `<span class="chip">${t}</span>`).join('');
      return `
        <article class="glass pad project-card rv" style="--d: ${idx + 1}" data-id="${project.id}">
          <div class="project-card-top">
            <div class="project-meta">
              <span class="chip">${project.category} · ${project.year}</span>
              ${project.badge ? `<span class="project-badge">${project.badge}</span>` : ''}
            </div>
            <h3>${project.title}</h3>
            <p class="project-desc">${project.tagline || project.description}</p>
            <div class="chips-row">
              ${tagsHtml}
            </div>
          </div>
          <div class="project-card-footer">
            <div class="card-links">
              <button class="btn s sm open-case-study" data-id="${project.id}">
                Case Study →
              </button>
              ${project.links?.github && project.links.github !== '#' ? `
                <a href="${project.links.github}" target="_blank" rel="noopener noreferrer" aria-label="GitHub Repository">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                  Code
                </a>
              ` : ''}
              ${project.links?.live && project.links.live !== '#' ? `
                <a href="${project.links.live}" target="_blank" rel="noopener noreferrer" aria-label="Live Demo">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                  Demo
                </a>
              ` : ''}
            </div>
          </div>
        </article>
      `;
    }).join('');

    // Rebind listeners for dynamically rendered cards
    attachSpotlightEffects();
    attachScrollReveals();
    attachCaseStudyTriggers();
  }

  /**
   * 7. Case Study Modal Manager
   */
  function attachCaseStudyTriggers() {
    $$('.open-case-study').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const id = btn.dataset.id;
        openCaseStudy(id);
      });
    });
  }

  function openCaseStudy(projectId) {
    const project = projects.find(p => p.id === projectId);
    if (!project) return;

    const modal = $('#case-study-modal');
    const content = $('#case-study-content');
    if (!modal || !content) return;

    const metricsHtml = (project.metrics || []).map(m => `
      <div class="metric-card">
        <div class="m-val">${m.value}</div>
        <div class="m-lbl">${m.label}</div>
      </div>
    `).join('');

    const architectureList = (project.architecture || []).map(item => `
      <li style="margin-bottom: 0.5rem; color: var(--text);">${item}</li>
    `).join('');

    content.innerHTML = `
      <div class="case-study-hero">
        <div class="eyebrow">${project.category} · ${project.year}</div>
        <h2>${project.title}</h2>
        <p class="lead" style="margin-bottom: 1rem;">${project.tagline}</p>
        <div class="chips-row">
          ${(project.tags || []).map(t => `<span class="chip">${t}</span>`).join('')}
        </div>
      </div>

      ${metricsHtml ? `
        <h4 style="margin-bottom: 0.75rem; text-transform: uppercase; font-family: var(--f-mono); font-size: 0.8rem; color: var(--muted);">Key Results & Metrics</h4>
        <div class="case-metrics-row">
          ${metricsHtml}
        </div>
      ` : ''}

      <div class="case-study-grid" style="margin-top: 2rem;">
        <div class="case-block">
          <h3>The Challenge</h3>
          <p>${project.problem || project.description}</p>
        </div>
        <div class="case-block">
          <h3>The Engineering Solution</h3>
          <p>${project.solution || 'Engineered a resilient architecture balancing low latency with fault tolerance.'}</p>
        </div>
      </div>

      ${architectureList ? `
        <div class="case-block" style="margin-bottom: 2rem;">
          <h3>Architecture Highlights</h3>
          <ul style="padding-left: 1.25rem; margin: 0.5rem 0 0;">
            ${architectureList}
          </ul>
        </div>
      ` : ''}

      <div style="display: flex; gap: 1rem; flex-wrap: wrap; margin-top: 2rem; border-top: 1px solid var(--border); padding-top: 1.5rem;">
        ${project.links?.live && project.links.live !== '#' ? `
          <a class="btn p" href="${project.links.live}" target="_blank" rel="noopener noreferrer">
            Visit Live System →
          </a>
        ` : ''}
        ${project.links?.github && project.links.github !== '#' ? `
          <a class="btn s" href="${project.links.github}" target="_blank" rel="noopener noreferrer">
            View Source Code
          </a>
        ` : ''}
      </div>
    `;

    openModal(modal);
  }



  /**
   * 9. Modal Helpers
   */
  function openModal(modal) {
    if (!modal) return;
    modal.classList.add('active');
    activeModal = modal;
    document.body.style.overflow = 'hidden';

    // Trap focus or handle Escape
    const closeBtn = $('.modal-close-btn', modal);
    if (closeBtn) closeBtn.focus();
  }

  function closeModal(modal) {
    if (!modal) return;
    modal.classList.remove('active');
    activeModal = null;
    document.body.style.overflow = '';
  }

  function initModals() {
    $$('.modal-overlay').forEach(overlay => {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeModal(overlay);
      });

      const closeBtn = $('.modal-close-btn', overlay);
      if (closeBtn) {
        closeBtn.addEventListener('click', () => closeModal(overlay));
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && activeModal) {
        closeModal(activeModal);
      }
    });
  }

  /**
   * 10. Solstice Motion & Micro-interactions
   */
  function attachSpotlightEffects() {
    $$('.glass').forEach(card => {
      card.addEventListener('pointermove', (e) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--mx', `${e.clientX - rect.left}px`);
        card.style.setProperty('--my', `${e.clientY - rect.top}px`);
      });
    });
  }

  function initMagneticButtons() {
    if (prefersReducedMotion) return;

    $$('.mag').forEach(btn => {
      btn.addEventListener('pointermove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) * 0.22;
        const y = (e.clientY - rect.top - rect.height / 2) * 0.35;
        btn.style.transform = `translate(${x}px, ${y}px)`;
      });

      btn.addEventListener('pointerleave', () => {
        btn.style.transform = '';
      });
    });
  }

  function attachScrollReveals() {
    if (prefersReducedMotion) {
      $$('.rv').forEach(el => el.classList.add('in'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    $$('.rv:not(.in)').forEach(el => observer.observe(el));
  }

  function initParallaxAndScrollProgress() {
    const progressBar = $('#bar');
    const heroContent = $('#hero-content-wrap');
    const orbs = $$('[data-speed]');
    let ticking = false;

    function onScroll() {
      const scrollY = window.scrollY;

      // Parallax Orbs & Cinematic Hero Scroll Fade
      if (!prefersReducedMotion) {
        if (orbs.length > 0) {
          orbs.forEach(orb => {
            const speed = parseFloat(orb.dataset.speed || '0');
            orb.style.transform = `translate3d(0, ${scrollY * speed}px, 0)`;
          });
        }

        if (heroContent) {
          // Stays 100% visible while in the hero reading zone (0 to 35% of viewport height).
          // Then smoothly dissolves as the user scrolls into the next section.
          const startFade = window.innerHeight * 0.35;
          const endFade = window.innerHeight * 0.90;
          let opacity = 1;
          if (scrollY > startFade) {
            opacity = Math.max(0, 1 - (scrollY - startFade) / (endFade - startFade));
          }
          heroContent.style.opacity = opacity.toFixed(3);

          // Subtle upward parallax drift (moves up, never down, so it never overlaps the stats section)
          heroContent.style.transform = `translate3d(0, ${-scrollY * 0.12}px, 0)`;
        }
      }

      // Scroll Progress Bar
      if (progressBar) {
        const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
        const progress = totalScroll > 0 ? scrollY / totalScroll : 0;
        progressBar.style.transform = `scaleX(${progress})`;
      }

      ticking = false;
    }

    window.addEventListener('scroll', () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(onScroll);
      }
    }, { passive: true });

    onScroll();
  }

  /**
   * 11. Copy Email Helper
   */
  function initCopyEmail() {
    const copyBtns = $$('.copy-email-btn');
    copyBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const email = profile?.social?.email || 'hello@yourdomain.com';
        navigator.clipboard.writeText(email).then(() => {
          const original = btn.textContent;
          btn.textContent = 'Copied Email ✓';
          setTimeout(() => { btn.textContent = original; }, 2000);
        });
      });
    });
  }

  /**
   * 12. Main Initialization Lifecycle
   */
  function init() {
    initTheme();
    initMobileNav();
    populateProfile();
    initProjectFilters();
    renderProjects();
    initModals();
    attachSpotlightEffects();
    initMagneticButtons();
    attachScrollReveals();
    initParallaxAndScrollProgress();
    initCopyEmail();

    // Trigger hero mask text reveal
    requestAnimationFrame(() => {
      setTimeout(() => {
        document.body.classList.add('ready');
      }, 70);
    });
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
