/**
 * SPIDER — CUSTOM CONTEXT-AWARE MAGNETIC CURSOR
 * 
 * High performance GSAP quickTo cursor with context detection
 * and magnetic attraction.
 */

export function initCustomCursor() {
  // Disable on mobile/touch devices
  if (window.matchMedia('(pointer: coarse)').matches || window.innerWidth <= 768) {
    return;
  }

  const cursor = document.querySelector('.custom-cursor');
  const cursorDot = document.querySelector('.cursor-dot');
  const cursorRing = document.querySelector('.cursor-ring');
  const cursorText = document.querySelector('.cursor-text');
  const sensoryBadge = document.querySelector('.floating-sensory-badge');

  if (!cursor || !cursorDot || !cursorRing) return;

  // Initialize GSAP QuickSetters for silky 60fps movement
  gsap.set([cursorDot, cursorRing], { xPercent: -50, yPercent: -50 });

  const setDotX = gsap.quickTo(cursorDot, 'x', { duration: 0.1, ease: 'power3' });
  const setDotY = gsap.quickTo(cursorDot, 'y', { duration: 0.1, ease: 'power3' });
  const setRingX = gsap.quickTo(cursorRing, 'x', { duration: 0.35, ease: 'power3' });
  const setRingY = gsap.quickTo(cursorRing, 'y', { duration: 0.35, ease: 'power3' });

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    setDotX(mouseX);
    setDotY(mouseY);
    setRingX(mouseX);
    setRingY(mouseY);

    if (sensoryBadge && sensoryBadge.classList.contains('visible')) {
      gsap.to(sensoryBadge, {
        x: mouseX,
        y: mouseY,
        duration: 0.2,
        ease: 'power2.out'
      });
    }
  });

  // Context Detection for Cursor Text & Scale
  document.addEventListener('mouseover', (e) => {
    const target = e.target.closest('[data-cursor]');
    const linkTarget = e.target.closest('a, button, .category-tab-btn');
    const sensoryTarget = e.target.closest('[data-sensory]');

    if (target) {
      const mode = target.getAttribute('data-cursor');
      cursor.classList.add('active--hover');
      cursorText.textContent = mode;
    } else if (linkTarget) {
      cursor.classList.add('active--link');
    }

    if (sensoryTarget && sensoryBadge) {
      const tag = sensoryTarget.getAttribute('data-sensory');
      sensoryBadge.textContent = tag;
      sensoryBadge.classList.add('visible');
    }
  });

  document.addEventListener('mouseout', (e) => {
    const target = e.target.closest('[data-cursor]');
    const linkTarget = e.target.closest('a, button, .category-tab-btn');
    const sensoryTarget = e.target.closest('[data-sensory]');

    if (target) {
      cursor.classList.remove('active--hover');
      cursorText.textContent = '';
    }
    if (linkTarget) {
      cursor.classList.remove('active--link');
    }
    if (sensoryTarget && sensoryBadge) {
      sensoryBadge.classList.remove('visible');
    }
  });

  // 23 — Magnetic Hover on Action Buttons
  initMagneticButtons();
}

/**
 * Initializes magnetic attraction on buttons with .btn-magnetic
 */
export function initMagneticButtons() {
  if (window.innerWidth <= 768) return;

  const magneticBtns = document.querySelectorAll('.btn-magnetic');

  magneticBtns.forEach((btn) => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const relX = e.clientX - rect.left - rect.width / 2;
      const relY = e.clientY - rect.top - rect.height / 2;

      // Pull button by max 12px toward cursor
      gsap.to(btn, {
        x: relX * 0.25,
        y: relY * 0.25,
        duration: 0.3,
        ease: 'power2.out'
      });
    });

    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: 'elastic.out(1.1, 0.4)'
      });
    });

    // Ripple click feedback
    btn.addEventListener('click', (e) => {
      const ripple = document.createElement('span');
      ripple.className = 'btn-ripple';
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      ripple.style.cssText = `
        position: absolute;
        top: ${y}px;
        left: ${x}px;
        width: 10px;
        height: 10px;
        background: rgba(255, 26, 26, 0.6);
        border-radius: 50%;
        transform: translate(-50%, -50%) scale(0);
        pointer-events: none;
      `;
      btn.appendChild(ripple);

      gsap.to(ripple, {
        scale: 25,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
        onComplete: () => ripple.remove()
      });
    });
  });
}
