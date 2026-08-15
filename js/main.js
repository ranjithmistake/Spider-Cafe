/**
 * SPIDER — MAIN APPLICATION ORCHESTRATOR
 * 
 * Boots Lenis smooth scrolling, synchronizes GSAP ScrollTrigger,
 * initializes canvas particles/web geometry, menu tabs, and audio/haptics.
 */

import { ASSETS, MENU_DATA } from './config.js';
import { initHeroAnimation, initParallax, initImageReveal, initTextReveal, initHorizontalGallery, initStickyStory, initSplitDrinkSection, initKenBurns } from './animations.js';
import { initCustomCursor } from './cursor.js';
import { initNavigation } from './navigation.js';
import { initCart } from './cart.js';

let lenis = null;

// ==========================================
// 1. BOOTSTRAP LENIS SMOOTH SCROLL
// ==========================================
function initSmoothScroll() {
  if (typeof Lenis !== 'undefined') {
    lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.1,
      touchMultiplier: 1.8
    });

    // Synchronize Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);
  }

  // Top Scroll Progress Bar Sync
  ScrollTrigger.create({
    start: 'top top',
    end: 'bottom bottom',
    onUpdate: (self) => {
      const progressBar = document.querySelector('.scroll-progress-bar');
      if (progressBar) {
        progressBar.style.transform = `scaleX(${self.progress})`;
      }
    }
  });
}

// ==========================================
// 2. HERO CANVAS PARTICLES & RED EMBERS
// ==========================================
function initHeroCanvas() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  const particles = [];
  const particleCount = window.innerWidth < 768 ? 35 : 75;

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2 + 0.5,
      speedX: (Math.random() - 0.5) * 0.4,
      speedY: -Math.random() * 0.8 - 0.2, // Upward floating ember motion
      alpha: Math.random() * 0.7 + 0.2,
      color: Math.random() > 0.4 ? 'rgba(229, 9, 20,' : 'rgba(255, 100, 50,'
    });
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach((p) => {
      p.x += p.speedX;
      p.y += p.speedY;

      // Wrap around screen
      if (p.y < 0) {
        p.y = height + 10;
        p.x = Math.random() * width;
      }
      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `${p.color}${p.alpha})`;
      ctx.fill();
    });

    requestAnimationFrame(render);
  }

  render();

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });
}

// ==========================================
// 3. MENU CATEGORY TABS & CARDS RENDERER
// ==========================================
function initMenuSystem() {
  const tabsContainer = document.querySelector('.menu-categories-bar');
  const productsGrid = document.querySelector('.products-grid');
  const spotlightCard = document.querySelector('.category-spotlight-card');
  const spotlightImg = document.querySelector('.category-spotlight-img');
  const spotlightTitle = document.querySelector('.category-spotlight-title');
  const spotlightDesc = document.querySelector('.category-spotlight-desc');

  if (!tabsContainer || !productsGrid) return;

  const categoryMeta = {
    chicken: {
      title: 'SIGNATURE CHICKEN',
      desc: 'CRISPY. JUICY. UNFORGETTABLE.',
      image: ASSETS.CHICKEN_IMAGE
    },
    burgers: {
      title: 'DARK SMASH BURGERS',
      desc: 'STACKED FOR THE CRAVE.',
      image: ASSETS.BURGER_IMAGE
    },
    shakes: {
      title: 'ARTISAN SHAKES',
      desc: 'VELVET DECADENCE & BELGIAN FUDGE.',
      image: ASSETS.SHAKE_IMAGE
    },
    mojitos: {
      title: 'ELECTRIC MOJITOS',
      desc: 'CRUSHED BERRIES & CRACKED ICE.',
      image: ASSETS.MOJITO_IMAGE
    },
    cold_coffee: {
      title: 'NITRO COLD BREW',
      desc: 'BOLD ROAST & SILK VELVET HEAD.',
      image: ASSETS.COLD_COFFEE_IMAGE
    },
    veg: {
      title: 'PLANT POWERED VEG',
      desc: 'CRUNCHY PANEER & TRUFFLE WAFFLES.',
      image: ASSETS.VEG_IMAGE
    },
    more: {
      title: 'EXTRAS & SHARING',
      desc: 'VENOM NACHOS & LAVA CAKES.',
      image: ASSETS.FINAL_IMAGE
    }
  };

  function renderCategory(catKey) {
    const meta = categoryMeta[catKey] || categoryMeta.chicken;
    const items = MENU_DATA[catKey] || [];

    // Animate Spotlight Image Swap with clip-path
    if (spotlightCard && spotlightImg) {
      gsap.to(spotlightImg, {
        opacity: 0,
        scale: 1.08,
        filter: 'blur(10px)',
        duration: 0.3,
        onComplete: () => {
          spotlightImg.src = meta.image;
          if (spotlightTitle) spotlightTitle.textContent = meta.title;
          if (spotlightDesc) spotlightDesc.textContent = meta.desc;
          gsap.to(spotlightImg, {
            opacity: 1,
            scale: 1,
            filter: 'blur(0px)',
            duration: 0.5,
            ease: 'power3.out'
          });
        }
      });
    }

    // Render Product Cards with INR Currency
    productsGrid.innerHTML = items.map(item => `
      <div class="product-card reveal-clip" data-sensory="${item.flavor}">
        <div class="product-card-img-wrap" data-cursor="VIEW">
          <img src="${item.image}" alt="${item.name}" class="product-card-img" loading="lazy">
          <span class="product-badge">${item.badge}</span>
          <span class="product-flavor-tag">${item.flavor}</span>
        </div>
        <div class="product-card-body">
          <div>
            <h3 class="product-card-title">${item.name}</h3>
            <p class="product-card-desc">${item.tagline}</p>
          </div>
          <div class="product-card-meta">
            <div class="product-price"><span>₹</span>${item.price}</div>
            <button type="button" class="btn-card-order btn-magnetic" data-action="order-item" data-item-id="${item.id}" data-cursor="ORDER">
              ORDER
            </button>
          </div>
        </div>
      </div>
    `).join('');

    // Re-initialize reveals and magnetic buttons for new items
    initImageReveal();
  }

  // Bind tab clicks
  tabsContainer.querySelectorAll('.category-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      tabsContainer.querySelectorAll('.category-tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const catKey = btn.getAttribute('data-category');
      renderCategory(catKey);
    });
  });

  // Initial render
  renderCategory('chicken');
}

// ==========================================
// 4. MAIN APP INITIALIZATION
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  // 1. Smooth Scroll Setup
  initSmoothScroll();

  // 2. Custom Cursor & Magnetic Interactions
  initCustomCursor();

  // 3. Navigation Setup
  initNavigation(lenis);

  // 4. Interactive Cart System
  initCart();

  // 5. Hero Canvas Embers
  initHeroCanvas();

  // 6. Interactive Menu System
  initMenuSystem();

  // 7. Split Drink Section
  initSplitDrinkSection();

  // 8. Sticky Storytelling
  initStickyStory();

  // 9. Ken Burns Loop
  initKenBurns();

  // 10. Horizontal Gallery Pinning
  initHorizontalGallery();

  // 11. Text Reveals & Parallax
  initTextReveal();
  initParallax();

  // 12. Hero Opening Movie Animation
  initHeroAnimation();

  console.log('[SPIDER] Initialized cinematic cafe experience.');
});
