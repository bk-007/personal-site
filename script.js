(() => {
  const root = document.documentElement;
  const header = document.querySelector('.site-header');
  const hero = document.querySelector('.hero');
  const archiveHero = document.querySelector('.archive-hero');
  const systemsVisual = document.querySelector('.systems-visual');
  const featureCards = [...document.querySelectorAll('.feature-card')];
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');

  document.querySelectorAll('[data-year]').forEach((year) => {
    year.textContent = new Date().getFullYear();
  });

  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

  const updateMotion = () => {
    header?.classList.toggle('is-scrolled', window.scrollY > 18);
    if (reducedMotion.matches) return;

    if (hero) {
      const progress = clamp(window.scrollY / Math.max(hero.offsetHeight, 1), 0, 1);
      root.style.setProperty('--hero-scroll', progress.toFixed(3));
    }

    featureCards.forEach((card) => {
      const rect = card.getBoundingClientRect();
      const distance = window.innerHeight / 2 - (rect.top + rect.height / 2);
      const shift = clamp(distance * .045, -34, 34);
      card.style.setProperty('--media-shift', `${shift}px`);
    });

    if (archiveHero) {
      const progress = clamp(window.scrollY / Math.max(archiveHero.offsetHeight, 1), 0, 1);
      root.style.setProperty('--archive-shift', `${-20 + progress * 48}px`);
    }
  };

  let frame;
  const requestMotionUpdate = () => {
    if (frame) return;
    frame = requestAnimationFrame(() => {
      updateMotion();
      frame = null;
    });
  };

  window.addEventListener('scroll', requestMotionUpdate, { passive: true });
  window.addEventListener('resize', requestMotionUpdate, { passive: true });

  const revealItems = document.querySelectorAll('.reveal');
  if (reducedMotion.matches || !('IntersectionObserver' in window)) {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  } else {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: .1 });

    revealItems.forEach((item) => observer.observe(item));
  }

  if (finePointer.matches && !reducedMotion.matches) {
    featureCards.forEach((card) => {
      card.addEventListener('pointermove', (event) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--pointer-x', `${((event.clientX - rect.left) / rect.width) * 100}%`);
        card.style.setProperty('--pointer-y', `${((event.clientY - rect.top) / rect.height) * 100}%`);
      }, { passive: true });
    });

    systemsVisual?.addEventListener('pointermove', (event) => {
      const rect = systemsVisual.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width - .5) * 2;
      const y = ((event.clientY - rect.top) / rect.height - .5) * 2;
      systemsVisual.style.setProperty('--tilt-x', `${x * 3.5}deg`);
      systemsVisual.style.setProperty('--tilt-y', `${y * -2.5}deg`);
    }, { passive: true });

    systemsVisual?.addEventListener('pointerleave', () => {
      systemsVisual.style.setProperty('--tilt-x', '0deg');
      systemsVisual.style.setProperty('--tilt-y', '0deg');
    });
  }

  reducedMotion.addEventListener?.('change', () => {
    if (!reducedMotion.matches) return;
    root.style.setProperty('--hero-scroll', '0');
    root.style.setProperty('--archive-shift', '0px');
    revealItems.forEach((item) => item.classList.add('is-visible'));
  });

  updateMotion();
})();
