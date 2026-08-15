/**
 * SPIDER — GSAP CINEMATIC ANIMATION ENGINE
 * 
 * Contains hero intro timeline, multi-layer parallax, image reveals with clip-path,
 * horizontal gallery pinning, sticky storytelling, and split-screen drink physics.
 */

// Register GSAP Plugins
gsap.registerPlugin(ScrollTrigger);

export function initHeroAnimation() {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  // Initial setup states
  gsap.set('.site-nav', { y: -100, opacity: 0 });
  gsap.set('.hero-title', { opacity: 0, y: 70, filter: 'blur(12px)' });
  gsap.set('.hero-tagline', { opacity: 0, y: 30, filter: 'blur(8px)' });
  gsap.set('.hero-cta-group', { opacity: 0, y: 40 });
  gsap.set('.hero-scroll-indicator', { opacity: 0, y: 20 });
  gsap.set('.hero-bg-media', { opacity: 0, scale: 1.15, filter: 'brightness(0.3) contrast(1.2)' });
  gsap.set('.light-leak--hero', { opacity: 0, scale: 0.6 });

  // Movie-style Intro Sequence (Punchy, ultra-clean, minimal)
  tl.to('.light-leak--hero', {
    opacity: 0.45,
    scale: 1,
    duration: 1.2,
    ease: 'power2.out'
  }, 0.2)
  .to('.hero-bg-media', {
    opacity: 0.85,
    scale: 1.05,
    filter: 'brightness(0.7) contrast(1.15)',
    duration: 1.6,
    ease: 'power2.out'
  }, 0.3)
  .to('.hero-title', {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    duration: 1.1,
    ease: 'power4.out'
  }, 0.7)
  .to('.hero-tagline', {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    duration: 0.8
  }, 1.0)
  .to('.hero-cta-group', {
    opacity: 1,
    y: 0,
    duration: 0.7,
    stagger: 0.12
  }, 1.2)
  .to('.site-nav', {
    y: 0,
    opacity: 1,
    duration: 0.8,
    ease: 'power3.out'
  }, 1.3)
  .to('.hero-scroll-indicator', {
    opacity: 1,
    y: 0,
    duration: 0.5
  }, 1.5);

  return tl;
}

/**
 * 08 — Multi-Layer Parallax Engine
 */
export function initParallax() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || window.innerWidth <= 768) {
    return;
  }

  // Hero Section Parallax Layers
  gsap.to('.hero-bg-media', {
    yPercent: 20,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero-section',
      start: 'top top',
      end: 'bottom top',
      scrub: true
    }
  });

  gsap.to('.hero-title', {
    yPercent: -12,
    opacity: 0.25,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero-section',
      start: 'top top',
      end: 'bottom top',
      scrub: true
    }
  });

  // Spotlight Parallax
  gsap.to('.spotlight-bg-img', {
    yPercent: 18,
    scale: 1.12,
    ease: 'none',
    scrollTrigger: {
      trigger: '.spotlight-section',
      start: 'top bottom',
      end: 'bottom top',
      scrub: true
    }
  });

  // Editorial Burger Parallax
  gsap.to('.editorial-burger-img', {
    yPercent: 12,
    ease: 'none',
    scrollTrigger: {
      trigger: '.editorial-burger-section',
      start: 'top bottom',
      end: 'bottom top',
      scrub: true
    }
  });
}

/**
 * 07 — Cinematic Image Reveal System (clip-path + scale + blur)
 */
export function initImageReveal() {
  const revealCards = document.querySelectorAll('.reveal-clip');

  revealCards.forEach(card => {
    gsap.fromTo(card,
      {
        clipPath: 'inset(100% 0 0 0)',
        opacity: 0,
        scale: 1.08,
        filter: 'blur(10px)'
      },
      {
        clipPath: 'inset(0% 0 0 0)',
        opacity: 1,
        scale: 1,
        filter: 'blur(0px)',
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  });
}

/**
 * 30 — Text Animation Engine (Staggered Reveals)
 */
export function initTextReveal() {
  const textElements = document.querySelectorAll('.text-reveal-stagger');

  textElements.forEach(el => {
    gsap.fromTo(el,
      {
        y: 60,
        opacity: 0,
        filter: 'blur(8px)'
      },
      {
        y: 0,
        opacity: 1,
        filter: 'blur(0px)',
        duration: 1.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  });

  // Line-by-line staggered reveal on Introduction
  gsap.fromTo('.intro-headline span',
    { y: 80, opacity: 0, filter: 'blur(10px)' },
    {
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      duration: 1.2,
      stagger: 0.2,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: '.intro-section',
        start: 'top 75%'
      }
    }
  );
}

/**
 * 20 — Horizontal Gallery Experience with ScrollTrigger Pinning
 */
export function initHorizontalGallery() {
  if (window.innerWidth <= 1024) return;

  const galleryWrapper = document.querySelector('.horizontal-gallery-wrapper');
  const track = document.querySelector('.horizontal-gallery-track');
  const panels = gsap.utils.toArray('.gallery-panel');

  if (!galleryWrapper || !track || panels.length === 0) return;

  const totalPanels = panels.length;

  gsap.to(panels, {
    xPercent: -100 * (totalPanels - 1),
    ease: 'none',
    scrollTrigger: {
      trigger: galleryWrapper,
      pin: true,
      scrub: 1,
      snap: 1 / (totalPanels - 1),
      end: () => `+=${track.offsetWidth - window.innerWidth}`
    }
  });
}

/**
 * 21 — Sticky Storytelling ("WHY SPIDER?")
 */
export function initStickyStory() {
  const storyPanels = document.querySelectorAll('.story-panel');

  storyPanels.forEach((panel) => {
    ScrollTrigger.create({
      trigger: panel,
      start: 'top 60%',
      end: 'bottom 40%',
      onEnter: () => activatePanel(panel),
      onEnterBack: () => activatePanel(panel)
    });
  });

  function activatePanel(active) {
    storyPanels.forEach(p => {
      if (p === active) {
        p.classList.add('is-active');
      } else {
        p.classList.remove('is-active');
      }
    });
  }
}

/**
 * 19 — Mojito vs Cold Coffee Split-Screen Interaction
 */
export function initSplitDrinkSection() {
  const splitSection = document.querySelector('.split-drink-section');
  const sideMojito = document.querySelector('.split-side--mojito');
  const sideCoffee = document.querySelector('.split-side--coffee');

  if (!splitSection || !sideMojito || !sideCoffee) return;

  sideMojito.addEventListener('mouseenter', () => {
    gsap.to(sideMojito.querySelector('.split-side-bg'), { scale: 1.0, filter: 'brightness(0.8) contrast(1.2)', duration: 0.6 });
    gsap.to(sideCoffee.querySelector('.split-side-bg'), { scale: 1.1, filter: 'brightness(0.3) contrast(1.0)', duration: 0.6 });
  });

  sideCoffee.addEventListener('mouseenter', () => {
    gsap.to(sideCoffee.querySelector('.split-side-bg'), { scale: 1.0, filter: 'brightness(0.8) contrast(1.2)', duration: 0.6 });
    gsap.to(sideMojito.querySelector('.split-side-bg'), { scale: 1.1, filter: 'brightness(0.3) contrast(1.0)', duration: 0.6 });
  });

  splitSection.addEventListener('mouseleave', () => {
    gsap.to(['.split-side--mojito .split-side-bg', '.split-side--coffee .split-side-bg'], {
      scale: 1.08,
      filter: 'brightness(0.45) contrast(1.1)',
      duration: 0.6
    });
  });
}

/**
 * 09 — Ken Burns Slow Cinematic Loop
 */
export function initKenBurns() {
  const kbImages = document.querySelectorAll('.ken-burns-active');
  kbImages.forEach(img => {
    gsap.to(img, {
      scale: 1.08,
      xPercent: 1.5,
      yPercent: -1.5,
      duration: 12,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });
  });
}
