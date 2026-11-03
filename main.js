(() => {
  const C = window.PORTFOLIO;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const el = (tag, cls, text) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  };
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const pad = (n) => String(n).padStart(2, '0');

  gsap.registerPlugin(ScrollTrigger);

  /* ---------- Content ---------- */
  const displayName = C.name || 'Roblox UI Design';
  $('[data-brand]').textContent = displayName;
  $('[data-role]').textContent = C.role;
  $('[data-status]').textContent = C.status;
  $('[data-foot-name]').textContent = `© ${new Date().getFullYear()} ${displayName}`;
  if (C.name) document.title = `${C.name} | ${C.role}`;

  const headline = $('[data-headline]');
  headline.setAttribute('aria-label', C.headline.join(' '));
  C.headline.forEach((text) => {
    const line = el('span', 'line');
    line.setAttribute('aria-hidden', 'true');
    const inner = el('span');
    [...text].forEach((ch) => {
      const c = el('span', 'char', ch === ' ' ? ' ' : ch);
      inner.append(c);
    });
    line.append(inner);
    headline.append(line);
  });

  const introEl = $('[data-intro]');
  C.intro.split(' ').forEach((word, i, all) => {
    introEl.append(el('span', 'w', word + (i < all.length - 1 ? ' ' : '')));
  });

  const makeVideo = (src, poster) => {
    const v = document.createElement('video');
    v.dataset.src = src;
    if (poster) v.poster = poster;
    v.muted = true;
    v.loop = false;
    v.playsInline = true;
    v.preload = 'none';
    v.setAttribute('playsinline', '');
    v.setAttribute('aria-hidden', 'true');
    return v;
  };
  const loadVideo = (v) => {
    if (!v.getAttribute('src')) {
      v.src = v.dataset.src;
      v.preload = 'auto';
    }
  };

  const makeMarquee = () => {
    const wrap = el('div', 'marquee');
    wrap.setAttribute('aria-hidden', 'true');
    const track = el('div', 'marquee-track');
    for (let i = 0; i < 2; i++) {
      const group = el('div');
      group.style.display = 'flex';
      // Repeat enough times that one group is always wider than the screen.
      for (let r = 0; r < 3; r++) C.marquee.forEach((w) => group.append(el('span', '', w)));
      track.append(group);
    }
    wrap.append(track);
    return wrap;
  };

  const work = $('[data-work]');
  C.projects.forEach((p, i) => {
    const art = el('article', 'project');
    art.dataset.a1 = p.colors[0];
    art.dataset.a2 = p.colors[1];

    const head = el('header', 'p-head');
    const eyebrow = el('p', 'p-eyebrow');
    eyebrow.append(el('b', '', pad(i + 1)), el('span', '', p.label));
    const title = el('h2', 'p-title');
    const tLine = el('span', 'line');
    tLine.append(el('span', '', p.title));
    title.append(tLine);
    const side = el('div', 'p-side');
    side.append(el('p', 'p-desc', p.description));
    const tags = el('ul', 'tags');
    p.tags.forEach((t) => tags.append(el('li', '', t)));
    side.append(tags);
    head.append(eyebrow, title, side);
    art.append(head);

    if (p.video) {
      const card = el('button', 'media-card card-main');
      card.type = 'button';
      card.setAttribute('aria-label', `Play ${p.title} video with sound`);
      card.dataset.view = 'video';
      card.dataset.src = p.video;
      card.dataset.poster = p.poster || '';
      card.dataset.cursor = 'Play with sound';
      card.append(makeVideo(p.video, p.poster));
      card.lastChild.loop = true;
      card.lastChild.dataset.auto = '';
      const chip = el('span', 'play-chip', 'Play');
      chip.setAttribute('aria-hidden', 'true');
      card.append(chip);
      art.append(card);
    }

    if (p.photos && p.photos.length) {
      const grid = el('div', 'stills');
      p.photos.forEach((ph) => {
        const card = el('button', `media-card still s-${ph.size || 'half'}`);
        card.type = 'button';
        card.setAttribute('aria-label', `View full size: ${ph.alt}`);
        card.dataset.view = 'image';
        card.dataset.src = ph.src;
        card.dataset.alt = ph.alt;
        card.dataset.cursor = 'View';
        const img = new Image();
        img.src = ph.src;
        img.alt = ph.alt;
        card.append(img);
        grid.append(card);
      });
      art.append(grid);
    }

    work.append(art);
    if (i < C.projects.length - 1 && C.marquee.length) work.append(makeMarquee());
  });

  const contact = $('[data-contact]');
  if (C.discord) {
    contact.hidden = false;
    $('[data-contact-link]').hidden = false;
    $('[data-copy-label]').textContent = `Copy Discord: ${C.discord}`;
    const links = $('[data-links]');
    (C.links || []).forEach((l) => {
      const li = el('li');
      const a = el('a', '', l.label);
      a.href = l.url;
      a.target = '_blank';
      a.rel = 'noopener';
      li.append(a);
      links.append(li);
    });
  }

  /* ---------- Toast and copy ---------- */
  const toast = $('.toast');
  let toastTimer;
  const showToast = (msg) => {
    toast.textContent = msg;
    toast.classList.add('on');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('on'), 2200);
  };
  const copyBtn = $('[data-copy]');
  copyBtn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(C.discord);
      showToast('Discord username copied');
    } catch {
      showToast(`Discord: ${C.discord}`);
    }
  });

  /* ---------- Smooth scrolling ---------- */
  let lenis = null;
  if (!reduced) {
    lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1 });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((t) => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
  }
  $$('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      const target = id === '#top' ? 0 : $(id);
      if (target === null) return;
      e.preventDefault();
      if (lenis) lenis.scrollTo(target, { duration: 1.4 });
      else if (target === 0) scrollTo(0, 0);
      else target.scrollIntoView();
    });
  });

  /* ---------- Autoplay only what is on screen ---------- */
  let viewerOpen = false;
  const autoVideos = $$('video[data-auto]');
  if (!reduced) {
    const near = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { loadVideo(e.target); near.unobserve(e.target); }
      });
    }, { rootMargin: '100% 0px' });
    const vis = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        e.target.dataset.visible = e.isIntersecting ? '1' : '';
        if (e.isIntersecting && !viewerOpen) e.target.play().catch(() => {});
        else e.target.pause();
      });
    }, { threshold: 0.15 });
    autoVideos.forEach((v) => { near.observe(v); vis.observe(v); });
  }

  /* ---------- Showreel ---------- */
  const reelBox = $('[data-reel]');
  const reelVideos = C.reel.map((r) => {
    const v = makeVideo(r.video, r.poster);
    reelBox.prepend(v);
    return v;
  });
  let reelIndex = 0;
  let reelVisible = true;
  const playReel = (i) => {
    reelIndex = i;
    const clip = C.reel[i];
    const v = reelVideos[i];
    loadVideo(v);
    const go = () => {
      v.currentTime = clip.start;
      if (reelVisible && !viewerOpen) v.play().catch(() => {});
      reelVideos.forEach((o) => o.classList.toggle('on', o === v));
    };
    if (v.readyState >= 1) go();
    else v.addEventListener('loadedmetadata', go, { once: true });
  };
  if (reelVideos.length) {
    reelVideos[0].classList.add('on');
    if (!reduced) {
      reelVideos.forEach((v, i) => {
        const next = () => { if (reelIndex === i) playReel((i + 1) % reelVideos.length); };
        v.addEventListener('timeupdate', () => {
          if (v.currentTime >= C.reel[i].end - 0.4) next();
        });
        v.addEventListener('ended', next);
      });
      new IntersectionObserver(([e]) => {
        reelVisible = e.isIntersecting;
        const v = reelVideos[reelIndex];
        if (reelVisible && !viewerOpen) { if (v.getAttribute('src')) v.play().catch(() => {}); }
        else v.pause();
      }, { threshold: 0.05 }).observe(reelBox);
    }
  }

  const resumeBackground = () => {
    if (reduced) return;
    autoVideos.forEach((v) => { if (v.dataset.visible === '1') v.play().catch(() => {}); });
    if (reelVisible && reelVideos[reelIndex] && reelVideos[reelIndex].getAttribute('src')) {
      reelVideos[reelIndex].play().catch(() => {});
    }
  };
  const pauseBackground = () => {
    autoVideos.forEach((v) => v.pause());
    reelVideos.forEach((v) => v.pause());
  };

  /* ---------- Viewer: grows out of the clicked card ---------- */
  const dialog = $('.lightbox');
  const lbStage = $('.lb-stage');
  let lbOrigin = null;
  let closing = false;

  const flipFrom = (media, rect) => {
    const to = media.getBoundingClientRect();
    return { x: rect.left - to.left, y: rect.top - to.top, scaleX: rect.width / to.width, scaleY: rect.height / to.height };
  };

  const openViewer = (card) => {
    const isVideo = card.dataset.view === 'video';
    const media = isVideo ? document.createElement('video') : new Image();
    media.className = 'lb-media';
    if (isVideo) {
      media.src = card.dataset.src;
      if (card.dataset.poster) media.poster = card.dataset.poster;
      media.controls = true;
      media.playsInline = true;
      media.autoplay = true;
    } else {
      media.alt = card.dataset.alt || '';
      media.src = card.dataset.src;
    }
    lbOrigin = card;
    closing = false;
    viewerOpen = true;
    pauseBackground();
    if (lenis) lenis.stop();
    lbStage.replaceChildren(media);
    dialog.showModal();

    const reveal = () => {
      gsap.to(dialog, { backgroundColor: 'rgba(7,6,10,.94)', duration: 0.35, ease: 'power2.out' });
      if (reduced) return;
      gsap.from(media, { ...flipFrom(media, card.getBoundingClientRect()), duration: 0.65, ease: 'expo.out', clearProps: 'transform' });
      gsap.from('.lb-close', { scale: 0, duration: 0.5, delay: 0.2, ease: 'back.out(2.5)', clearProps: 'transform' });
    };
    if (isVideo) {
      if (media.readyState >= 1) reveal();
      else media.addEventListener('loadedmetadata', reveal, { once: true });
    } else if (media.complete) reveal();
    else media.addEventListener('load', reveal, { once: true });
  };

  const closeViewer = () => {
    if (closing || !dialog.open) return;
    closing = true;
    const media = $('.lb-media', dialog);
    const finish = () => {
      if (media && media.tagName === 'VIDEO') { media.pause(); media.removeAttribute('src'); media.load(); }
      lbStage.replaceChildren();
      dialog.close();
      viewerOpen = false;
      gsap.set(dialog, { clearProps: 'backgroundColor' });
      if (lenis) lenis.start();
      resumeBackground();
      if (lbOrigin) lbOrigin.focus({ preventScroll: true });
    };
    if (reduced || !media) return finish();
    if (media.tagName === 'VIDEO') media.controls = false;
    gsap.to(dialog, { backgroundColor: 'rgba(7,6,10,0)', duration: 0.4 });
    gsap.to(media, { ...flipFrom(media, lbOrigin.getBoundingClientRect()), duration: 0.45, ease: 'power3.inOut', onComplete: finish });
  };

  $$('[data-view]').forEach((c) => c.addEventListener('click', () => openViewer(c)));
  $('.lb-close').addEventListener('click', closeViewer);
  dialog.addEventListener('cancel', (e) => { e.preventDefault(); closeViewer(); });
  dialog.addEventListener('click', (e) => { if (e.target === dialog || e.target === lbStage) closeViewer(); });

  /* ---------- Mouse extras ---------- */
  if (finePointer && !reduced) {
    const cursor = $('.cursor');
    const label = $('.cursor span');
    const xTo = gsap.quickTo(cursor, 'x', { duration: 0.35, ease: 'power3' });
    const yTo = gsap.quickTo(cursor, 'y', { duration: 0.35, ease: 'power3' });
    addEventListener('pointermove', (e) => { xTo(e.clientX); yTo(e.clientY); }, { passive: true });

    $$('[data-cursor]').forEach((c) => {
      c.addEventListener('pointerenter', () => {
        label.textContent = c.dataset.cursor;
        gsap.to(label, { scale: 1, duration: 0.4, ease: 'back.out(2.4)', overwrite: true });
      });
      c.addEventListener('pointerleave', () => {
        gsap.to(label, { scale: 0, duration: 0.2, ease: 'power2.in', overwrite: true });
      });
      c.addEventListener('click', () => gsap.to(label, { scale: 0, duration: 0.15, overwrite: true }));
    });

    // Photos tilt toward the pointer.
    $$('.still').forEach((c) => {
      const rx = gsap.quickTo(c, 'rotationX', { duration: 0.6, ease: 'power3' });
      const ry = gsap.quickTo(c, 'rotationY', { duration: 0.6, ease: 'power3' });
      c.addEventListener('pointermove', (e) => {
        const r = c.getBoundingClientRect();
        ry(((e.clientX - r.left) / r.width - 0.5) * 8);
        rx(-((e.clientY - r.top) / r.height - 0.5) * 8);
      });
      c.addEventListener('pointerleave', () => { rx(0); ry(0); });
    });

    // Nav links lean toward the pointer.
    $$('[data-press]').forEach((a) => {
      const x = gsap.quickTo(a, 'x', { duration: 0.5, ease: 'power3' });
      const y = gsap.quickTo(a, 'y', { duration: 0.5, ease: 'power3' });
      a.addEventListener('pointermove', (e) => {
        const r = a.getBoundingClientRect();
        x((e.clientX - r.left - r.width / 2) * 0.35);
        y((e.clientY - r.top - r.height / 2) * 0.35);
      });
      a.addEventListener('pointerleave', () => { x(0); y(0); });
    });
  }

  /* ---------- Scroll animation ---------- */
  const root = document.documentElement;
  const baseColors = [getComputedStyle(root).getPropertyValue('--a1').trim(), getComputedStyle(root).getPropertyValue('--a2').trim()];
  const setAmbient = (a1, a2) => gsap.to(root, { '--a1': a1, '--a2': a2, duration: 1.2, ease: 'power2.inOut', overwrite: 'auto' });

  const setupMotion = () => {
    gsap.to('.progress i', { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: 0.3 } });

    // Header steps out of the way while reading down, returns on the way up.
    let headerHidden = false;
    ScrollTrigger.create({
      start: 0, end: 'max',
      onUpdate: (self) => {
        const hide = self.direction > 0 && self.scroll() > 160;
        if (hide === headerHidden) return;
        headerHidden = hide;
        gsap.to('.top', { yPercent: hide ? -130 : 0, duration: 0.5, ease: 'power3.out', overwrite: 'auto' });
      },
    });

    gsap.to('.blob-a', { x: '18vw', y: '14vh', duration: 16, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    gsap.to('.blob-b', { x: '-16vw', y: '-12vh', duration: 19, repeat: -1, yoyo: true, ease: 'sine.inOut' });

    const mm = gsap.matchMedia();

    // Large screens: the reel grows from a card to the full screen while pinned.
    mm.add('(min-width: 900px) and (min-aspect-ratio: 1/1)', () => {
      const vw = () => root.clientWidth;
      const vh = () => window.innerHeight;
      const startW = () => vw() * 0.44;
      const startH = () => startW() / 2.3;
      gsap.set(reelBox, { right: 'auto', bottom: 'auto', aspectRatio: 'auto' });
      const tl = gsap.timeline({
        scrollTrigger: { trigger: '.stage', start: 'top top', end: '+=130%', pin: true, scrub: 0.6, invalidateOnRefresh: true },
      });
      tl.fromTo(reelBox,
        { left: () => vw() * 0.96 - startW(), top: () => vh() * 0.94 - startH(), width: startW, height: startH, borderRadius: 22 },
        { left: 0, top: 0, width: vw, height: vh, borderRadius: 0, ease: 'power2.inOut', duration: 1 }, 0)
        .to('.headline', { yPercent: -18, opacity: 0.0, ease: 'power1.in', duration: 0.7 }, 0)
        .to('.stage-meta', { opacity: 0, duration: 0.25 }, 0)
        .to('.reel-caption', { opacity: 1, duration: 0.2 }, 0.85);
      return () => gsap.set(reelBox, { clearProps: 'all' });
    });

    // Intro lights up word by word.
    gsap.fromTo('.intro .w', { opacity: 0.14 }, {
      opacity: 1, stagger: 0.5, ease: 'none',
      scrollTrigger: { trigger: '.intro p', start: 'top 82%', end: 'bottom 52%', scrub: 0.4 },
    });

    $$('.project').forEach((art) => {
      gsap.from($('.p-title .line > span', art), {
        yPercent: 110, rotate: 3, duration: 1.1, ease: 'expo.out',
        scrollTrigger: { trigger: art, start: 'top 82%', once: true },
      });
      gsap.from($$('.p-eyebrow, .p-side', art), {
        y: 26, opacity: 0, duration: 0.9, stagger: 0.12, ease: 'power3.out', delay: 0.15,
        scrollTrigger: { trigger: art, start: 'top 82%', once: true },
      });

      const main = $('.card-main', art);
      if (main) {
        gsap.fromTo(main, { clipPath: 'inset(9% 7% 9% 7% round 28px)' }, {
          clipPath: 'inset(0% 0% 0% 0% round 22px)', ease: 'none',
          scrollTrigger: { trigger: main, start: 'top 92%', end: 'top 38%', scrub: 0.5 },
        });
        gsap.fromTo($('video', main), { scale: 1.16 }, {
          scale: 1, ease: 'none',
          scrollTrigger: { trigger: main, start: 'top 92%', end: 'top 25%', scrub: 0.5 },
        });
      }

      const stills = $$('.still', art);
      gsap.from(stills, {
        y: 70, opacity: 0, duration: 1, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: stills[0] || art, start: 'top 90%', once: true },
      });

      ScrollTrigger.create({
        trigger: art, start: 'top 60%', end: 'bottom 40%',
        onToggle: (self) => {
          if (self.isActive) setAmbient(art.dataset.a1, art.dataset.a2);
          else if (self.direction < 0 && art === $('.project')) setAmbient(...baseColors);
        },
      });
    });

    // Bands drift on their own and speed up with scrolling.
    $$('.marquee').forEach((m) => {
      const track = $('.marquee-track', m);
      const loop = gsap.to(track, { xPercent: -50, duration: 42, ease: 'none', repeat: -1 });
      const skew = gsap.quickTo(m, 'skewX', { duration: 0.5, ease: 'power3' });
      ScrollTrigger.create({
        trigger: m, start: 'top bottom', end: 'bottom top',
        onUpdate: (self) => {
          const v = self.getVelocity() / 300;
          gsap.to(loop, { timeScale: gsap.utils.clamp(-6, 6, 1 + v), duration: 0.3, overwrite: true });
          skew(gsap.utils.clamp(-6, 6, -v));
        },
        onToggle: (self) => { if (!self.isActive) gsap.to(loop, { timeScale: 1, duration: 0.5, overwrite: true }); },
      });
    });

    if (C.discord) {
      gsap.from('.contact-title .line > span', {
        yPercent: 110, duration: 1.1, stagger: 0.1, ease: 'expo.out',
        scrollTrigger: { trigger: '.contact', start: 'top 72%', once: true },
      });
      gsap.from('.contact-sub, .game-btn, .contact-links', {
        y: 26, opacity: 0, duration: 0.8, stagger: 0.1, delay: 0.3, ease: 'power3.out',
        scrollTrigger: { trigger: '.contact', start: 'top 72%', once: true },
      });
      ScrollTrigger.create({
        trigger: '.contact', start: 'top 60%',
        onEnter: () => setAmbient('#7a4a08', '#2a2170'),
        onLeaveBack: () => { const last = $$('.project').pop(); setAmbient(last.dataset.a1, last.dataset.a2); },
      });
    }
  };

  /* ---------- Loader, then the opening ---------- */
  const curtain = $('.curtain');
  const finishLoad = () => {
    document.body.classList.remove('is-loading');
    if (reelVideos[0] && !reduced) playReel(0);
    ScrollTrigger.refresh();
  };

  if (reduced) {
    curtain.remove();
    finishLoad();
    return;
  }

  if (lenis) lenis.stop();
  setupMotion();
  gsap.set('.char', { yPercent: 115 });
  gsap.set('.stage-meta > *', { y: 18, opacity: 0 });
  gsap.set(reelBox, { opacity: 0, scale: 0.92, transformOrigin: '100% 100%' });
  gsap.set('.top', { opacity: 0 });

  const ready = Promise.race([
    Promise.all([document.fonts.ready, new Promise((res) => {
      const img = new Image();
      img.onload = img.onerror = res;
      img.src = C.reel[0].poster;
    })]),
    new Promise((res) => setTimeout(res, 2500)),
  ]);

  const counter = { n: 0 };
  const countEl = $('.curtain-count');
  const count = gsap.to(counter, {
    n: 100, duration: 0.9, ease: 'power2.inOut',
    onUpdate: () => { countEl.textContent = Math.round(counter.n); },
  });

  Promise.all([ready, count.then()]).then(() => {
    finishLoad();
    const tl = gsap.timeline({ onComplete: () => { curtain.remove(); if (lenis) lenis.start(); } });
    tl.to(curtain, { yPercent: -100, duration: 0.85, ease: 'expo.inOut' })
      .to('.char', { yPercent: 0, duration: 0.95, stagger: 0.016, ease: 'expo.out' }, '-=0.42')
      .to(reelBox, { opacity: 1, scale: 1, duration: 1, ease: 'expo.out', clearProps: 'scale,transformOrigin' }, '-=0.95')
      .to('.stage-meta > *', { y: 0, opacity: 1, stagger: 0.08, duration: 0.7, ease: 'power3.out' }, '-=0.75')
      .to('.top', { opacity: 1, duration: 0.6 }, '-=0.6');
  });
})();
