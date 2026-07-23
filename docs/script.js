(() => {
  const root = document.documentElement;
  const body = document.body;
  const header = document.querySelector('[data-header]');
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#site-nav');
  const navLinks = [...document.querySelectorAll('.site-nav a[href^="#"]')];
  const revealItems = [...document.querySelectorAll('[data-reveal]')];
  const flows = [...document.querySelectorAll('[data-flow], [data-pipeline]')];
  const counts = [...document.querySelectorAll('[data-count]')];
  const sections = navLinks.map(link => document.querySelector(link.hash)).filter(Boolean);
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = matchMedia('(pointer: fine)');
  let lastFocused = null;
  let ticking = false;

  revealItems.forEach(item => {
    item.style.setProperty('--delay', `${Number(item.dataset.revealDelay || 0)}ms`);
  });

  const closeMenu = () => {
    nav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.querySelector('.sr-only').textContent = '開啟導覽選單';
    body.classList.remove('menu-open');
  };

  menuButton.addEventListener('click', () => {
    const willOpen = menuButton.getAttribute('aria-expanded') !== 'true';
    if (willOpen) lastFocused = document.activeElement;
    nav.classList.toggle('open', willOpen);
    menuButton.setAttribute('aria-expanded', String(willOpen));
    menuButton.querySelector('.sr-only').textContent = willOpen ? '關閉導覽選單' : '開啟導覽選單';
    body.classList.toggle('menu-open', willOpen);
  });

  nav.addEventListener('click', event => {
    if (event.target.closest('a')) closeMenu();
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && nav.classList.contains('open')) {
      closeMenu();
      (lastFocused || menuButton).focus();
    }
  });

  const animateCount = node => {
    if (node.dataset.counted) return;
    node.dataset.counted = 'true';
    const target = Number(node.dataset.count);
    if (reduceMotion.matches) {
      node.textContent = target;
      return;
    }
    const start = performance.now();
    const duration = 850;
    const frame = now => {
      const progress = Math.min((now - start) / duration, 1);
      node.textContent = Math.round(target * (1 - Math.pow(1 - progress, 3)));
      if (progress < 1) requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  };

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        const count = entry.target.matches('[data-count]') ? entry.target : entry.target.querySelector('[data-count]');
        if (count) animateCount(count);
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: .15 });
    revealItems.forEach(item => revealObserver.observe(item));

    const flowObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => entry.target.classList.toggle('is-active', entry.isIntersecting && !document.hidden));
    }, { threshold: .2 });
    flows.forEach(flow => flowObserver.observe(flow));
  } else {
    revealItems.forEach(item => item.classList.add('is-visible'));
    flows.forEach(flow => flow.classList.add('is-static'));
    counts.forEach(node => { node.textContent = node.dataset.count; });
  }

  const updateScroll = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    const ratio = max > 0 ? scrollY / max : 0;
    root.style.setProperty('--scroll', ratio.toFixed(4));
    header.classList.toggle('scrolled', scrollY > 18);
    let current = '';
    sections.forEach(section => {
      if (section.getBoundingClientRect().top <= innerHeight * .32) current = `#${section.id}`;
    });
    navLinks.forEach(link => {
      const active = link.hash === current;
      link.classList.toggle('active', active);
      if (active) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
    ticking = false;
  };

  addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateScroll);
      ticking = true;
    }
  }, { passive: true });
  updateScroll();

  if (finePointer.matches && !reduceMotion.matches) {
    document.querySelectorAll('[data-tilt]').forEach(card => {
      card.addEventListener('pointermove', event => {
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - .5;
        const y = (event.clientY - rect.top) / rect.height - .5;
        card.style.transform = `perspective(900px) rotateX(${(-y * 3).toFixed(2)}deg) rotateY(${(x * 3).toFixed(2)}deg)`;
      }, { passive: true });
      card.addEventListener('pointerleave', () => { card.style.transform = ''; }, { passive: true });
    });
  }

  document.addEventListener('visibilitychange', () => {
    body.classList.toggle('page-hidden', document.hidden);
    flows.forEach(flow => {
      if (document.hidden) flow.classList.remove('is-active');
    });
  });
})();
