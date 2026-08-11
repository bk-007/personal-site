(() => {
  const root = document.documentElement;
  const hero = document.querySelector('.hero');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  let pointerX = 0;
  let pointerY = 0;

  document.querySelectorAll('[data-year]').forEach((year) => {
    year.textContent = new Date().getFullYear();
  });

  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

  const updateGap = () => {
    if (!hero || reducedMotion.matches) return;
    const close = clamp(window.scrollY / Math.max(hero.offsetHeight * 0.42, 1), 0, 1);
    const compact = window.innerWidth <= 720;
    const shouldOffset = compact ? -12 : -34;
    const actualOffset = compact ? 18 : 52;
    const angle = compact ? 1 : 1.3;
    root.style.setProperty('--close', close.toFixed(3));
    root.style.setProperty('--should-x', `${shouldOffset * (1 - close) - pointerX * 7}px`);
    root.style.setProperty('--actual-x', `${actualOffset * (1 - close) + pointerX * 7}px`);
    root.style.setProperty('--should-angle', `${-angle * (1 - close)}deg`);
    root.style.setProperty('--actual-angle', `${angle * (1 - close)}deg`);
    root.style.setProperty('--portrait-x', `${pointerX * -10}px`);
    root.style.setProperty('--portrait-y', `${pointerY * -7}px`);
  };

  let scrollFrame;
  window.addEventListener('scroll', () => {
    if (scrollFrame) return;
    scrollFrame = requestAnimationFrame(() => {
      updateGap();
      scrollFrame = null;
    });
  }, { passive: true });

  window.addEventListener('resize', updateGap, { passive: true });

  if (finePointer.matches && !reducedMotion.matches && hero) {
    hero.addEventListener('pointermove', (event) => {
      pointerX = (event.clientX / window.innerWidth - 0.5) * 2;
      pointerY = (event.clientY / window.innerHeight - 0.5) * 2;
      updateGap();
    }, { passive: true });

    hero.addEventListener('pointerleave', () => {
      pointerX = 0;
      pointerY = 0;
      updateGap();
    });
  }

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
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });

    revealItems.forEach((item) => observer.observe(item));
  }

  reducedMotion.addEventListener?.('change', () => {
    if (!reducedMotion.matches) return;
    root.style.setProperty('--close', '1');
    root.style.setProperty('--should-x', '0px');
    root.style.setProperty('--actual-x', '0px');
    root.style.setProperty('--should-angle', '0deg');
    root.style.setProperty('--actual-angle', '0deg');
    root.style.setProperty('--portrait-x', '0px');
    root.style.setProperty('--portrait-y', '0px');
    revealItems.forEach((item) => item.classList.add('is-visible'));
  });

  updateGap();
})();
