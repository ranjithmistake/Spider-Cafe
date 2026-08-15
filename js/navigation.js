/**
 * SPIDER — CINEMATIC NAVIGATION & MOBILE DRAWER
 * 
 * Manages sticky navbar transitions, Lenis anchor scrolling,
 * and fullscreen mobile menu animations with GSAP.
 */

export function initNavigation(lenisInstance) {
  const navbar = document.querySelector('.site-nav');
  const hamburger = document.querySelector('.hamburger-toggle');
  const mobileMenu = document.querySelector('.mobile-menu-overlay');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');
  const navLinks = document.querySelectorAll('.nav-link, .nav-logo-link, .mobile-nav-link, .footer-link');

  // Sticky Navbar Scroll Listener
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
  }, { passive: true });

  // Mobile Menu Toggle
  hamburger?.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.contains('open');
    if (isOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  });

  function openMobileMenu() {
    hamburger.classList.add('is-active');
    mobileMenu.classList.add('open');
    document.body.style.overflow = 'hidden';

    // Staggered reveal for mobile links
    gsap.fromTo(mobileLinks, 
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power3.out', delay: 0.15 }
    );
  }

  function closeMobileMenu() {
    hamburger.classList.remove('is-active');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  }

  // Smooth Lenis Anchor Navigation
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const targetSection = document.querySelector(href);
        if (targetSection) {
          closeMobileMenu();
          if (lenisInstance) {
            lenisInstance.scrollTo(targetSection, { offset: -60, duration: 1.4 });
          } else {
            targetSection.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }
    });
  });

  // Back to Top Button
  const backToTop = document.querySelector('.back-to-top-btn');
  backToTop?.addEventListener('click', (e) => {
    e.preventDefault();
    if (lenisInstance) {
      lenisInstance.scrollTo(0, { duration: 1.6 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });
}
