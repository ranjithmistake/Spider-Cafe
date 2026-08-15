/**
 * SPIDER — DEDICATED ORDERING SYSTEM & CART DRAWER
 * 
 * Complete ordering portal displaying the full categorized menu in one place,
 * live inline quantity modifiers, real-time cart calculations in INR (₹),
 * search filtering, and seamless checkout workflow.
 */

import { MENU_DATA, ASSETS, submitOrderToBackend } from './config.js';

class SpiderCart {
  constructor() {
    this.items = [];
    this.currentCustomizingItem = null;
    this.selectedOptions = {};
    this.currentOrderType = 'DINE_IN';
    
    // Core Elements
    this.orderPortal = document.querySelector('#spider-order-portal');
    this.portalCloseBtn = document.querySelector('.portal-close-btn');
    this.portalMenuPane = document.querySelector('.portal-menu-pane');
    this.portalSearchInput = document.querySelector('.portal-search-input');
    this.portalCategoryChips = document.querySelectorAll('.portal-category-chip');
    
    // Live Summary Sidebar Elements
    this.summaryItemsList = document.querySelector('.summary-items-list');
    this.summaryCountBadge = document.querySelector('.summary-count-badge');
    this.summarySubtotalVal = document.querySelector('.summary-subtotal-val');
    this.summaryGstVal = document.querySelector('.summary-gst-val');
    this.summaryGrandVal = document.querySelector('.summary-grand-val');
    this.portalCheckoutBtn = document.querySelector('.btn-portal-checkout');
    this.orderTypeBtns = document.querySelectorAll('.summary-type-btn');

    // Floating Bar Elements
    this.floatingBar = document.querySelector('.floating-order-bar');
    this.floatingBarText = document.querySelector('.floating-bar-text');
    this.floatingBarBtn = document.querySelector('.floating-bar-btn');

    // Drawer Elements
    this.drawer = document.querySelector('.cart-drawer');
    this.backdrop = document.querySelector('.cart-backdrop');
    this.triggerBtn = document.querySelector('.cart-trigger-btn');
    this.closeBtn = document.querySelector('.cart-close-btn');
    this.itemsContainer = document.querySelector('.cart-items-container');
    this.totalValueEl = document.querySelector('.cart-total-value');
    this.badgeCountEl = document.querySelector('.cart-badge-count');
    this.checkoutBtn = document.querySelector('.btn-checkout');

    // Customization Modal Elements
    this.customModal = document.querySelector('.custom-modal-backdrop');
    this.modalImg = document.querySelector('.modal-header-img');
    this.modalTitle = document.querySelector('.modal-title');
    this.modalDesc = document.querySelector('.modal-desc');
    this.modalPrice = document.querySelector('.modal-price-val');
    this.modalOptionsContainer = document.querySelector('.modal-options-list');
    this.modalAddBtn = document.querySelector('.btn-modal-add');
    this.modalCloseBtn = document.querySelector('.modal-close-btn');

    this.initPortalMenu();
    this.initEvents();
  }

  initPortalMenu() {
    if (!this.portalMenuPane) return;

    const categoryTitles = {
      chicken: { title: 'Signature Crispy Chicken', tag: 'Acoustic crunch & 24hr marinade' },
      burgers: { title: 'Dark Smash Burgers', tag: 'Lacy edge smashed beef & charcoal brioche' },
      shakes: { title: 'Artisan Thick Shakes', tag: 'Belgian dark chocolate & KitKat crunch' },
      mojitos: { title: 'Electric Sparkling Mojitos', tag: 'Muddled berries & crystal ice' },
      cold_coffee: { title: 'Nitro Cold Brew & Coffee', tag: '20-hour steeped Arabica & velvet cream' },
      veg: { title: 'Plant-Powered Veg Items', tag: 'Spicy paneer crunch & truffle waffle fries' },
      more: { title: 'Sharing Plates & Desserts', tag: 'Venom nachos & red velvet molten cups' }
    };

    let html = '';

    for (const [catKey, items] of Object.entries(MENU_DATA)) {
      const meta = categoryTitles[catKey] || { title: catKey.toUpperCase(), tag: 'SPIDER Specialties' };

      html += `
        <div class="portal-category-section" id="portal-cat-${catKey}" data-cat="${catKey}">
          <div class="portal-category-header">
            <div>
              <h3 class="portal-category-title">${meta.title}</h3>
              <p style="font-size: 0.8rem; color: var(--text-muted); margin-top: 2px;">${meta.tag}</p>
            </div>
            <span class="portal-category-count">${items.length} ITEMS</span>
          </div>

          <div class="portal-items-grid">
            ${items.map(item => this.buildPortalItemCard(item)).join('')}
          </div>
        </div>
      `;
    }

    this.portalMenuPane.innerHTML = html;
  }

  buildPortalItemCard(item) {
    const inCartQty = this.getItemCartQty(item.id);

    return `
      <div class="portal-card" data-item-id="${item.id}" data-cat="${item.category}" data-search="${item.name.toLowerCase()} ${item.description.toLowerCase()}">
        <div class="portal-card-img-wrap">
          <img src="${item.image}" alt="${item.name}" class="portal-card-img" loading="lazy">
          <span class="portal-card-badge">${item.badge}</span>
          <span class="portal-card-flavor">${item.flavor}</span>
        </div>
        <div class="portal-card-body">
          <div>
            <h4 class="portal-card-name">${item.name}</h4>
            <p class="portal-card-desc">${item.tagline || item.description}</p>
            <div style="font-family: var(--font-mono); font-size: 0.72rem; color: var(--text-dim); margin-top: 4px;">${item.calories || ''}</div>
          </div>
          <div class="portal-card-footer">
            <div class="portal-card-price">₹${item.price}</div>
            <div class="portal-card-actions" id="portal-actions-${item.id}">
              ${inCartQty > 0 ? this.renderPortalQtyControl(item.id, inCartQty) : `
                <button type="button" class="btn-portal-add" data-portal-add="${item.id}">
                  + ADD TO CART
                </button>
              `}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  renderPortalQtyControl(itemId, qty) {
    return `
      <div class="portal-card-qty-control">
        <button type="button" class="portal-qty-btn" data-portal-qty="decrease" data-item-id="${itemId}">−</button>
        <span class="portal-qty-num">${qty}</span>
        <button type="button" class="portal-qty-btn" data-portal-qty="increase" data-item-id="${itemId}">+</button>
      </div>
    `;
  }

  getItemCartQty(itemId) {
    return this.items
      .filter(i => i.id === itemId)
      .reduce((sum, i) => sum + i.qty, 0);
  }

  initEvents() {
    // Open Dedicated Order Portal from all ORDER NOW buttons
    document.addEventListener('click', (e) => {
      const isOrderCTA = e.target.closest('[data-action="hero-order"]') || 
                         e.target.closest('[data-action="open-order-portal"]') ||
                         e.target.closest('.floating-bar-btn');

      if (isOrderCTA) {
        e.preventDefault();
        this.openOrderPortal();
      }
    });

    // Portal Close
    this.portalCloseBtn?.addEventListener('click', () => this.closeOrderPortal());

    // Portal Category Jump Chips
    this.portalCategoryChips.forEach(chip => {
      chip.addEventListener('click', () => {
        this.portalCategoryChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        const cat = chip.getAttribute('data-portal-filter');
        
        if (cat === 'all') {
          this.portalMenuPane.querySelectorAll('.portal-category-section').forEach(s => s.style.display = 'flex');
          this.portalMenuPane.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          const targetSection = document.querySelector(`#portal-cat-${cat}`);
          if (targetSection) {
            this.portalMenuPane.querySelectorAll('.portal-category-section').forEach(s => s.style.display = 'flex');
            targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      });
    });

    // Real-time Search in Ordering Portal
    this.portalSearchInput?.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      const cards = this.portalMenuPane.querySelectorAll('.portal-card');

      cards.forEach(card => {
        const text = card.getAttribute('data-search') || '';
        if (text.includes(q)) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });

    // Portal Direct Add / Quantity modifier clicks
    this.portalMenuPane?.addEventListener('click', (e) => {
      const addBtn = e.target.closest('[data-portal-add]');
      const qtyBtn = e.target.closest('[data-portal-qty]');

      if (addBtn) {
        const itemId = addBtn.getAttribute('data-portal-add');
        this.quickAddItem(itemId);
      } else if (qtyBtn) {
        const itemId = qtyBtn.getAttribute('data-item-id');
        const action = qtyBtn.getAttribute('data-portal-qty');
        if (action === 'increase') this.changeItemQtyById(itemId, 1);
        if (action === 'decrease') this.changeItemQtyById(itemId, -1);
      }
    });

    // Order Type Tabs (Dine In / Takeaway / Delivery)
    this.orderTypeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        this.orderTypeBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.currentOrderType = btn.getAttribute('data-type');
      });
    });

    // Portal Checkout
    this.portalCheckoutBtn?.addEventListener('click', () => this.handleCheckout());

    // Drawer open/close
    this.triggerBtn?.addEventListener('click', () => this.openCart());
    this.closeBtn?.addEventListener('click', () => this.closeCart());
    this.backdrop?.addEventListener('click', () => this.closeCart());

    // Modal Close
    this.modalCloseBtn?.addEventListener('click', () => this.closeCustomModal());
    this.customModal?.addEventListener('click', (e) => {
      if (e.target === this.customModal) this.closeCustomModal();
    });

    // Add to Cart from Customizer Modal
    this.modalAddBtn?.addEventListener('click', () => {
      if (this.currentCustomizingItem) {
        this.addItem({
          ...this.currentCustomizingItem,
          selectedOptions: { ...this.selectedOptions },
          cartItemId: `${this.currentCustomizingItem.id}-${JSON.stringify(this.selectedOptions)}`
        });
        this.closeCustomModal();
        this.showToast(`Added ${this.currentCustomizingItem.name} to your dark feast!`);
      }
    });

    // In-page Section Order Button clicks (e.g. from #menu or #spotlight)
    document.addEventListener('click', (e) => {
      const orderBtn = e.target.closest('[data-action="order-item"]');
      if (orderBtn) {
        const itemId = orderBtn.getAttribute('data-item-id');
        this.openCustomModal(itemId);
      }
    });

    // Checkout button in drawer
    this.checkoutBtn?.addEventListener('click', () => this.handleCheckout());
  }

  openOrderPortal() {
    this.orderPortal?.classList.add('open');
    document.body.style.overflow = 'hidden';
    this.renderPortalSummary();
  }

  closeOrderPortal() {
    this.orderPortal?.classList.remove('open');
    document.body.style.overflow = '';
  }

  openCart() {
    this.drawer?.classList.add('open');
    this.backdrop?.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  closeCart() {
    this.drawer?.classList.remove('open');
    this.backdrop?.classList.remove('open');
    document.body.style.overflow = '';
  }

  findMenuItem(itemId) {
    for (const cat in MENU_DATA) {
      const match = MENU_DATA[cat].find(i => i.id === itemId);
      if (match) return match;
    }
    return null;
  }

  quickAddItem(itemId) {
    const item = this.findMenuItem(itemId);
    if (!item) return;

    this.addItem({
      ...item,
      selectedOptions: { preparation: 'Classic Dark' },
      cartItemId: `${item.id}-default`
    });

    this.showToast(`Added ${item.name} (₹${item.price})`);
  }

  changeItemQtyById(itemId, delta) {
    const targetItem = this.items.find(i => i.id === itemId);
    if (targetItem) {
      this.changeQty(targetItem.cartItemId, delta);
    }
  }

  openCustomModal(itemId) {
    const foundItem = this.findMenuItem(itemId);
    if (!foundItem) return;

    this.currentCustomizingItem = foundItem;
    this.selectedOptions = {};

    if (this.modalImg) this.modalImg.src = foundItem.image;
    if (this.modalTitle) this.modalTitle.textContent = foundItem.name;
    if (this.modalDesc) this.modalDesc.textContent = foundItem.description;
    if (this.modalPrice) this.modalPrice.textContent = `₹${foundItem.price}`;

    if (this.modalOptionsContainer) {
      this.modalOptionsContainer.innerHTML = '';

      if (foundItem.options) {
        for (const [groupKey, choices] of Object.entries(foundItem.options)) {
          const groupEl = document.createElement('div');
          groupEl.className = 'modal-option-group';

          this.selectedOptions[groupKey] = choices[0];

          const label = document.createElement('span');
          label.className = 'modal-option-label';
          label.textContent = groupKey.replace(/([A-Z])/g, ' $1').toUpperCase();
          groupEl.appendChild(label);

          const btnContainer = document.createElement('div');
          btnContainer.className = 'modal-option-buttons';

          choices.forEach((choice, idx) => {
            const optBtn = document.createElement('button');
            optBtn.type = 'button';
            optBtn.className = `option-select-btn ${idx === 0 ? 'selected' : ''}`;
            optBtn.textContent = choice;
            optBtn.addEventListener('click', () => {
              btnContainer.querySelectorAll('.option-select-btn').forEach(b => b.classList.remove('selected'));
              optBtn.classList.add('selected');
              this.selectedOptions[groupKey] = choice;
            });
            btnContainer.appendChild(optBtn);
          });

          groupEl.appendChild(btnContainer);
          this.modalOptionsContainer.appendChild(groupEl);
        }
      }
    }

    this.customModal?.classList.add('open');
  }

  closeCustomModal() {
    this.customModal?.classList.remove('open');
    this.currentCustomizingItem = null;
  }

  addItem(item) {
    const existing = this.items.find(i => i.cartItemId === item.cartItemId);
    if (existing) {
      existing.qty += 1;
    } else {
      this.items.push({ ...item, qty: 1 });
    }
    this.syncAllViews();
  }

  removeItem(cartItemId) {
    this.items = this.items.filter(i => i.cartItemId !== cartItemId);
    this.syncAllViews();
  }

  changeQty(cartItemId, delta) {
    const item = this.items.find(i => i.cartItemId === cartItemId);
    if (item) {
      item.qty += delta;
      if (item.qty <= 0) {
        this.removeItem(cartItemId);
      } else {
        this.syncAllViews();
      }
    }
  }

  syncAllViews() {
    this.renderDrawerCart();
    this.renderPortalSummary();
    this.updatePortalCardButtons();
    this.updateFloatingBar();
    this.animateBadge();
  }

  updatePortalCardButtons() {
    if (!this.portalMenuPane) return;

    for (const cat in MENU_DATA) {
      MENU_DATA[cat].forEach(item => {
        const actionContainer = document.querySelector(`#portal-actions-${item.id}`);
        if (actionContainer) {
          const inCartQty = this.getItemCartQty(item.id);
          if (inCartQty > 0) {
            actionContainer.innerHTML = this.renderPortalQtyControl(item.id, inCartQty);
          } else {
            actionContainer.innerHTML = `
              <button type="button" class="btn-portal-add" data-portal-add="${item.id}">
                + ADD TO CART
              </button>
            `;
          }
        }
      });
    }
  }

  renderPortalSummary() {
    if (!this.summaryItemsList) return;

    let subtotal = 0;
    let totalCount = 0;

    if (this.items.length === 0) {
      this.summaryItemsList.innerHTML = `
        <div class="summary-empty">
          <svg style="width: 36px; height: 36px; fill: var(--text-dim);" viewBox="0 0 24 24">
            <path d="M19 6h-2c0-2.76-2.24-5-5-5S7 3.24 7 6H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-7-3c1.66 0 3 1.34 3 3H9c0-1.66 1.34-3 3-3zm7 17H5V8h14v12z"/>
          </svg>
          <p style="font-family: var(--font-mono); font-size: 0.82rem; text-transform: uppercase;">No items selected</p>
          <p style="font-size: 0.72rem; color: var(--text-dim);">Click + ADD TO CART on any item to build your feast.</p>
        </div>
      `;
      if (this.summaryCountBadge) this.summaryCountBadge.textContent = '0 items';
      if (this.summarySubtotalVal) this.summarySubtotalVal.textContent = '₹0';
      if (this.summaryGstVal) this.summaryGstVal.textContent = '₹0';
      if (this.summaryGrandVal) this.summaryGrandVal.textContent = '₹0';
      return;
    }

    let html = '';

    this.items.forEach(item => {
      const itemTotal = item.price * item.qty;
      subtotal += itemTotal;
      totalCount += item.qty;
      const opts = Object.values(item.selectedOptions || {}).join(' • ');

      html += `
        <div class="summary-order-row">
          <img src="${item.image}" alt="${item.name}" class="summary-item-img">
          <div class="summary-item-info">
            <h5 class="summary-item-name">${item.name}</h5>
            <p class="summary-item-opts">${opts || 'Classic'}</p>
            <div class="summary-item-price">₹${itemTotal}</div>
          </div>
          <div class="portal-card-qty-control">
            <button type="button" class="portal-qty-btn" data-summary-action="dec" data-id="${item.cartItemId}">−</button>
            <span class="portal-qty-num">${item.qty}</span>
            <button type="button" class="portal-qty-btn" data-summary-action="inc" data-id="${item.cartItemId}">+</button>
          </div>
        </div>
      `;
    });

    const gst = Math.round(subtotal * 0.05); // 5% GST
    const grandTotal = subtotal + gst;

    this.summaryItemsList.innerHTML = html;
    if (this.summaryCountBadge) this.summaryCountBadge.textContent = `${totalCount} item${totalCount > 1 ? 's' : ''}`;
    if (this.summarySubtotalVal) this.summarySubtotalVal.textContent = `₹${subtotal}`;
    if (this.summaryGstVal) this.summaryGstVal.textContent = `₹${gst}`;
    if (this.summaryGrandVal) this.summaryGrandVal.textContent = `₹${grandTotal}`;

    // Attach row listeners
    this.summaryItemsList.querySelectorAll('[data-summary-action]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const act = btn.getAttribute('data-summary-action');
        if (act === 'inc') this.changeQty(id, 1);
        if (act === 'dec') this.changeQty(id, -1);
      });
    });
  }

  renderDrawerCart() {
    if (!this.itemsContainer) return;

    if (this.items.length === 0) {
      this.itemsContainer.innerHTML = `
        <div class="cart-empty-state">
          <svg class="cart-empty-icon" viewBox="0 0 24 24">
            <path d="M19 6h-2c0-2.76-2.24-5-5-5S7 3.24 7 6H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-7-3c1.66 0 3 1.34 3 3H9c0-1.66 1.34-3 3-3zm7 17H5V8h14v12z"/>
          </svg>
          <p style="font-family: var(--font-mono); font-size: 0.9rem; text-transform: uppercase; letter-spacing: 0.15em;">Your dark feast is empty.</p>
          <p style="font-size: 0.8rem; color: var(--text-dim);">Select signature dishes from the menu to crave the dark.</p>
        </div>
      `;
      if (this.totalValueEl) this.totalValueEl.textContent = '₹0';
      if (this.badgeCountEl) this.badgeCountEl.textContent = '0';
      return;
    }

    let subtotal = 0;
    let totalCount = 0;
    let html = '';

    this.items.forEach(item => {
      const itemTotal = item.price * item.qty;
      subtotal += itemTotal;
      totalCount += item.qty;
      const optionsSummary = Object.values(item.selectedOptions || {}).join(' • ');

      html += `
        <div class="cart-item-row" data-cart-id="${item.cartItemId}">
          <img src="${item.image}" alt="${item.name}" class="cart-item-thumb">
          <div class="cart-item-info">
            <h4 class="cart-item-name">${item.name}</h4>
            <p class="cart-item-options">${optionsSummary || 'Classic preparation'}</p>
            <div class="cart-item-price">₹${itemTotal}</div>
          </div>
          <div class="cart-qty-control">
            <button type="button" class="cart-qty-btn" data-action="decrease" data-id="${item.cartItemId}">−</button>
            <span class="cart-qty-num">${item.qty}</span>
            <button type="button" class="cart-qty-btn" data-action="increase" data-id="${item.cartItemId}">+</button>
          </div>
        </div>
      `;
    });

    this.itemsContainer.innerHTML = html;
    if (this.totalValueEl) this.totalValueEl.textContent = `₹${subtotal}`;
    if (this.badgeCountEl) this.badgeCountEl.textContent = totalCount.toString();

    this.itemsContainer.querySelectorAll('.cart-qty-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const action = btn.getAttribute('data-action');
        if (action === 'increase') this.changeQty(id, 1);
        if (action === 'decrease') this.changeQty(id, -1);
      });
    });
  }

  updateFloatingBar() {
    if (!this.floatingBar) return;

    let subtotal = 0;
    let totalCount = 0;

    this.items.forEach(i => {
      subtotal += i.price * i.qty;
      totalCount += i.qty;
    });

    if (totalCount > 0) {
      if (this.floatingBarText) {
        this.floatingBarText.innerHTML = `YOUR FEAST: <span>${totalCount} ITEMS • ₹${subtotal}</span>`;
      }
      if (this.floatingBarBtn) {
        this.floatingBarBtn.innerHTML = `VIEW CART / ORDER →`;
      }
    } else {
      if (this.floatingBarText) {
        this.floatingBarText.innerHTML = `SPIDER KITCHEN <span class="floating-bar-sub">• ORDER NOW</span>`;
      }
      if (this.floatingBarBtn) {
        this.floatingBarBtn.innerHTML = `ORDER NOW`;
      }
    }
  }

  animateBadge() {
    if (this.badgeCountEl) {
      this.badgeCountEl.classList.remove('bounce');
      void this.badgeCountEl.offsetWidth;
      this.badgeCountEl.classList.add('bounce');
    }
  }

  async handleCheckout() {
    if (this.items.length === 0) {
      this.showToast('Your cart is empty. Choose dishes from the menu.');
      return;
    }

    if (this.portalCheckoutBtn) this.portalCheckoutBtn.textContent = 'TRANSMITTING ORDER...';
    if (this.checkoutBtn) this.checkoutBtn.textContent = 'TRANSMITTING ORDER...';

    try {
      const orderPayload = {
        items: this.items,
        orderType: this.currentOrderType,
        currency: 'INR',
        timestamp: new Date().toISOString()
      };

      const response = await submitOrderToBackend(orderPayload);

      if (response && response.success) {
        this.showToast(`Order ${response.orderId} Confirmed! (~${response.estimatedTimeMinutes} mins)`);
        this.items = [];
        this.syncAllViews();
        this.closeCart();
        this.closeOrderPortal();
      }
    } catch (err) {
      console.error(err);
      this.showToast('Error transmitting order.');
    } finally {
      if (this.portalCheckoutBtn) this.portalCheckoutBtn.textContent = 'TRANSMIT ORDER NOW';
      if (this.checkoutBtn) this.checkoutBtn.textContent = 'PROCEED TO CHECKOUT';
    }
  }

  showToast(message) {
    let toast = document.querySelector('.spider-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'spider-toast';
      toast.innerHTML = `
        <svg class="toast-icon" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
        <span class="toast-message" style="font-family: var(--font-mono); font-size: 0.85rem;"></span>
      `;
      document.body.appendChild(toast);
    }

    toast.querySelector('.toast-message').textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 3800);
  }
}

export function initCart() {
  return new SpiderCart();
}
