/**
 * Main Application Controller - UZair Showroom
 */

class App {
  constructor() {
    this.sfxEnabled = true;
    this.audioCtx = null;
    this.filteredBikes = [];
    this.searchQuery = '';
    this.selectedModalBike = null;

    // 3D Drag Rotation state for Real Bike Model
    this.isDragging3D = false;
    this.dragStartX = 0;
    this.bikeRotationY = 0;
    this.autoSpinInterval = null;
  }

  async init() {
    this.runPreloader();
    await window.store.init();
    
    // Hash router check
    this.handleRouting();
    window.addEventListener('hashchange', () => this.handleRouting());

    this.renderAll();

    setTimeout(() => {
      if (window.engine3D) {
        engine3D.initHero();
      }
    }, 300);

    this.populateSelects();

    window.store.subscribe(() => {
      this.renderAll();
    });

    if (window.lucide) lucide.createIcons();
  }

  handleRouting() {
    const hash = window.location.hash;
    const customerView = document.getElementById('customer-view');
    const adminView = document.getElementById('admin-view');

    if (hash === '#/admin') {
      if (!window.store.adminToken) {
        const pin = prompt('Enter Admin PIN (Default PIN: 1234):', '1234');
        if (pin === '1234') {
          window.store.adminToken = true;
          localStorage.setItem('uzair_admin_authenticated', 'true');
        } else {
          alert('Incorrect Admin PIN!');
          window.location.hash = '#hero';
          return;
        }
      }
      if (customerView) customerView.classList.add('hidden');
      if (adminView) adminView.classList.remove('hidden');
      if (window.AdminComponent) AdminComponent.render('overview');
    } else {
      if (adminView) adminView.classList.add('hidden');
      if (customerView) customerView.classList.remove('hidden');
    }
  }

  openAdminRoute(e) {
    if (e) e.preventDefault();
    window.location.hash = '#/admin';
  }

  exitAdminRoute() {
    window.location.hash = '#hero';
  }

  runPreloader() {
    const preloader = document.getElementById('preloader');
    const bar = document.getElementById('preload-bar');
    const pct = document.getElementById('preload-percentage');
    if (!preloader) return;

    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 15) + 10;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        if (bar) bar.style.width = '100%';
        if (pct) pct.textContent = '100%';
        setTimeout(() => {
          preloader.classList.add('opacity-0', 'pointer-events-none');
          setTimeout(() => preloader.style.display = 'none', 700);
        }, 300);
      } else {
        if (bar) bar.style.width = progress + '%';
        if (pct) pct.textContent = progress + '%';
      }
    }, 80);
  }

  renderAll() {
    const bikes = window.store.motorcycles || [];
    const brands = window.store.brands || [];
    const categories = window.store.categories || [];

    this.applyFilters(false);

    if (window.BrandsComponent) BrandsComponent.render(brands);
    if (window.CategoriesComponent) CategoriesComponent.render(categories);
    if (window.FeaturedComponent) FeaturedComponent.render(bikes);
    
    const cartCountEl = document.getElementById('cart-count');
    if (cartCountEl) {
      const totalQty = window.store.cart.reduce((sum, i) => sum + i.quantity, 0);
      cartCountEl.textContent = totalQty;
    }
  }

  populateSelects() {
    const brands = window.store.brands || [];
    const categories = window.store.categories || [];
    const bikes = window.store.motorcycles || [];

    const brandSel = document.getElementById('filter-brand');
    if (brandSel && brandSel.options.length <= 1) {
      brands.forEach(b => {
        const opt = document.createElement('option');
        opt.value = b.name;
        opt.textContent = `${b.name}`;
        brandSel.appendChild(opt);
      });
    }

    const catSel = document.getElementById('filter-category');
    if (catSel && catSel.options.length <= 1) {
      categories.forEach(c => {
        const opt = document.createElement('option');
        opt.value = c.name;
        opt.textContent = `${c.name}`;
        catSel.appendChild(opt);
      });
    }

    const contactSel = document.getElementById('contact-bike-select');
    if (contactSel && contactSel.options.length <= 1) {
      bikes.forEach(b => {
        const opt = document.createElement('option');
        opt.value = `${b.brand} ${b.model}`;
        opt.textContent = `${b.brand} ${b.model} ($${b.price.toLocaleString()})`;
        contactSel.appendChild(opt);
      });
    }
  }

  applyFilters(renderGallery = true) {
    const bikes = window.store.motorcycles || [];
    const brandVal = document.getElementById('filter-brand')?.value || 'all';
    const catVal = document.getElementById('filter-category')?.value || 'all';
    const availVal = document.getElementById('filter-availability')?.value || 'all';
    const ccVal = document.getElementById('filter-cc')?.value || 'all';
    const maxPrice = parseInt(document.getElementById('filter-price-range')?.value || '100000', 10);
    const sortVal = document.getElementById('filter-sort')?.value || 'featured';

    this.filteredBikes = bikes.filter(bike => {
      const finalPrice = bike.price - (bike.discount || 0);
      if (finalPrice > maxPrice) return false;
      if (brandVal !== 'all' && bike.brand !== brandVal) return false;
      if (catVal !== 'all' && bike.category !== catVal) return false;
      if (availVal !== 'all' && bike.availability !== availVal) return false;

      if (ccVal !== 'all') {
        const ccMatch = bike.engine.match(/(\d+)\s*cc/i);
        const cc = ccMatch ? parseInt(ccMatch[1], 10) : 1000;
        if (ccVal === 'under500' && cc >= 500) return false;
        if (ccVal === '500-1000' && (cc < 500 || cc > 1000)) return false;
        if (ccVal === 'over1000' && cc <= 1000) return false;
      }

      return true;
    });

    if (sortVal === 'price-asc') {
      this.filteredBikes.sort((a, b) => (a.price - (a.discount || 0)) - (b.price - (b.discount || 0)));
    } else if (sortVal === 'price-desc') {
      this.filteredBikes.sort((a, b) => (b.price - (b.discount || 0)) - (a.price - (a.discount || 0)));
    } else if (sortVal === 'newest') {
      this.filteredBikes.sort((a, b) => (b.year || 2026) - (a.year || 2026));
    }

    if (window.GalleryComponent) {
      GalleryComponent.render(this.filteredBikes);
    }
  }

  filterByBrandName(brandName) {
    const brandSel = document.getElementById('filter-brand');
    if (brandSel) brandSel.value = brandName;
    this.applyFilters(true);
    document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' });
    this.playSFX('click');
  }

  filterByCategoryName(catName) {
    const catSel = document.getElementById('filter-category');
    if (catSel) catSel.value = catName;
    this.applyFilters(true);
    document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' });
    this.playSFX('click');
  }

  updatePriceLabel(val) {
    const lbl = document.getElementById('price-range-label');
    if (lbl) lbl.textContent = `$${parseInt(val, 10).toLocaleString()}`;
  }

  resetFilters() {
    if (document.getElementById('filter-brand')) document.getElementById('filter-brand').value = 'all';
    if (document.getElementById('filter-category')) document.getElementById('filter-category').value = 'all';
    if (document.getElementById('filter-availability')) document.getElementById('filter-availability').value = 'all';
    if (document.getElementById('filter-cc')) document.getElementById('filter-cc').value = 'all';
    if (document.getElementById('filter-sort')) document.getElementById('filter-sort').value = 'featured';
    if (document.getElementById('filter-price-range')) {
      document.getElementById('filter-price-range').value = '100000';
      this.updatePriceLabel(100000);
    }
    this.applyFilters(true);
    this.playSFX('click');
  }

  // Real 3D Bike Modal Controllers
  openDetailsModal(bikeId) {
    const bike = window.store.motorcycles.find(b => b.id === bikeId);
    if (!bike) return;
    this.selectedModalBike = bike;
    this.bikeRotationY = 0;

    if (window.DetailsModalComponent) {
      DetailsModalComponent.render(bike);
    }
    document.getElementById('details-modal')?.classList.remove('hidden');
    this.playSFX('open');
  }

  closeDetailsModal() {
    document.getElementById('details-modal')?.classList.add('hidden');
    if (this.autoSpinInterval) {
      clearInterval(this.autoSpinInterval);
      this.autoSpinInterval = null;
    }
  }

  start3DDrag(e) {
    this.isDragging3D = true;
    this.dragStartX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
  }

  on3DDrag(e) {
    if (!this.isDragging3D) return;
    const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    const deltaX = clientX - this.dragStartX;
    this.dragStartX = clientX;

    this.bikeRotationY += deltaX * 0.8;
    const bikeImg = document.getElementById('real-3d-bike-img');
    if (bikeImg) {
      bikeImg.style.transform = `rotateY(${this.bikeRotationY}deg) scale(${1 + Math.abs(Math.sin(this.bikeRotationY * Math.PI / 180)) * 0.08})`;
    }
  }

  stop3DDrag() {
    this.isDragging3D = false;
  }

  toggle3DPolarSpin() {
    if (this.autoSpinInterval) {
      clearInterval(this.autoSpinInterval);
      this.autoSpinInterval = null;
      this.showToast('Auto 360° Spin Paused');
    } else {
      this.autoSpinInterval = setInterval(() => {
        this.bikeRotationY += 4;
        const bikeImg = document.getElementById('real-3d-bike-img');
        if (bikeImg) {
          bikeImg.style.transform = `rotateY(${this.bikeRotationY}deg) scale(${1 + Math.abs(Math.sin(this.bikeRotationY * Math.PI / 180)) * 0.08})`;
        }
      }, 30);
      this.showToast('Auto 360° Spin Active!');
    }
  }

  changeRealBikeColor(hexColor, name) {
    const lbl = document.getElementById('selected-color-name');
    if (lbl) lbl.textContent = name;

    const bikeImg = document.getElementById('real-3d-bike-img');
    if (bikeImg) {
      const hueShift = this.hexToHueShift(hexColor);
      bikeImg.style.filter = `hue-rotate(${hueShift}deg) drop-shadow(0 20px 35px ${hexColor}66)`;
    }
    this.playSFX('click');
  }

  hexToHueShift(hex) {
    if (hex.includes('d90429') || hex.includes('e63946')) return 0;
    if (hex.includes('0077b6') || hex.includes('1d3557')) return 200;
    if (hex.includes('2a9d8f') || hex.includes('f95738')) return 120;
    if (hex.includes('111111') || hex.includes('0d1b2a')) return 240;
    return 60;
  }

  addToCartDirect(bikeId, colorName) {
    const bike = window.store.motorcycles.find(b => b.id === bikeId);
    if (!bike) return;
    window.store.addToCart(bike, colorName);
    this.openCart();
    this.showToast(`Added ${bike.brand} ${bike.model} to Cart!`);
    this.playSFX('cart');
  }

  openCart() {
    const drawer = document.getElementById('cart-drawer');
    if (!drawer) return;

    drawer.classList.remove('hidden');
    drawer.classList.add('flex');

    const cartItems = document.getElementById('cart-items');
    const cartSummary = document.getElementById('cart-summary');
    const cart = window.store.cart;

    if (cart.length === 0) {
      if (cartItems) cartItems.innerHTML = `<div class="text-center py-12 text-gray-500 font-cinzel text-xs">Your Cart is Empty</div>`;
      if (cartSummary) cartSummary.innerHTML = '';
      return;
    }

    if (cartItems) {
      cartItems.innerHTML = cart.map((item, idx) => `
        <div class="flex items-center justify-between p-3 bg-gray-900/90 rounded-xl border border-gray-800 text-xs font-cinzel">
          <div class="flex items-center gap-3">
            <img src="${item.bike.image}" class="w-12 h-10 object-contain rounded bg-black p-1" />
            <div>
              <div class="font-bold text-white">${item.bike.model}</div>
              <div class="text-[10px] text-luxury-gold">${item.color} &bull; $${item.bike.price.toLocaleString()}</div>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <button onclick="window.store.updateCartQuantity(${idx}, ${item.quantity - 1})" class="w-6 h-6 rounded bg-gray-800 text-white font-bold flex items-center justify-center">-</button>
            <span class="font-mono text-white font-bold">${item.quantity}</span>
            <button onclick="window.store.updateCartQuantity(${idx}, ${item.quantity + 1})" class="w-6 h-6 rounded bg-gray-800 text-white font-bold flex items-center justify-center">+</button>
          </div>
        </div>
      `).join('');
    }

    const total = window.store.getCartTotal();
    if (cartSummary) {
      cartSummary.innerHTML = `
        <div class="flex justify-between font-cinzel text-sm">
          <span class="text-gray-400">TOTAL:</span>
          <span class="text-luxury-gold font-extrabold">$${total.toLocaleString()}</span>
        </div>
        <button onclick="app.closeCart(); app.openCheckoutModal()" class="w-full py-3 bg-gray-200 text-black font-cinzel font-bold text-xs rounded-xl shadow">
          PROCEED TO CHECKOUT
        </button>
      `;
    }
  }

  closeCart() {
    const drawer = document.getElementById('cart-drawer');
    if (drawer) {
      drawer.classList.add('hidden');
      drawer.classList.remove('flex');
    }
  }

  openCheckoutModal() {
    if (window.CheckoutComponent) {
      CheckoutComponent.render();
    }
    document.getElementById('checkout-modal')?.classList.remove('hidden');
    this.playSFX('open');
  }

  closeCheckoutModal() {
    document.getElementById('checkout-modal')?.classList.add('hidden');
  }

  async submitCheckoutForm(e) {
    e.preventDefault();
    const cart = window.store.cart;
    if (cart.length === 0) return;

    const firstItem = cart[0];
    const name = document.getElementById('chk-name').value;
    const email = document.getElementById('chk-email').value;
    const phone = document.getElementById('chk-phone').value;
    const address = document.getElementById('chk-address').value;
    const deliveryType = document.getElementById('chk-delivery').value;
    const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked')?.value || 'JazzCash Mobile Wallet';

    const orderData = {
      customerName: name,
      email: email,
      phone: phone,
      address: address,
      motorcycleId: firstItem.bike.id,
      motorcycleName: `${firstItem.bike.brand} ${firstItem.bike.model}`,
      color: firstItem.color,
      price: window.store.getCartTotal(),
      paymentMethod: paymentMethod,
      paymentStatus: 'Paid',
      orderStatus: 'Confirmed',
      deliveryType: deliveryType
    };

    const newOrder = await window.store.placeOrder(orderData);
    this.closeCheckoutModal();
    this.playSFX('success');

    alert(`🎉 ORDER CONFIRMED!\n\nOrder ID: ${newOrder.id}\nThank you, ${name}. Your order for ${newOrder.motorcycleName} has been confirmed.\nPayment Method: ${paymentMethod}\nA invoice receipt has been dispatched to ${email}.`);
  }

  // Pre-Orders
  openPreOrderModal(bikeId) {
    const bike = bikeId ? window.store.motorcycles.find(b => b.id === bikeId) : null;
    if (window.PreOrderComponent) {
      PreOrderComponent.render(bike);
    }
    document.getElementById('preorder-modal')?.classList.remove('hidden');
    this.playSFX('open');
  }

  closePreOrderModal() {
    document.getElementById('preorder-modal')?.classList.add('hidden');
  }

  onPreOrderBikeChange(bikeId) {
    const bike = window.store.motorcycles.find(b => b.id === bikeId);
    if (bike && window.PreOrderComponent) {
      PreOrderComponent.render(bike);
    }
  }

  updatePreOrderDeposit(pctStr, fullPrice) {
    const pct = parseInt(pctStr, 10) / 100;
    const deposit = Math.round(fullPrice * pct);
    const el = document.getElementById('preorder-deposit-display');
    if (el) el.textContent = `$${deposit.toLocaleString()}`;
  }

  async submitPreOrderForm(e) {
    e.preventDefault();
    const bikeId = document.getElementById('preorder-bike-id').value;
    const bike = window.store.motorcycles.find(b => b.id === bikeId);
    if (!bike) return;

    const color = document.getElementById('preorder-color').value;
    const name = document.getElementById('preorder-name').value;
    const email = document.getElementById('preorder-email').value;
    const phone = document.getElementById('preorder-phone').value;
    const depositPct = parseInt(document.getElementById('preorder-deposit-type').value, 10);
    const totalPrice = bike.price - (bike.discount || 0);
    const depositAmount = Math.round(totalPrice * (depositPct / 100));

    const preOrderData = {
      customerName: name,
      email: email,
      phone: phone,
      motorcycleId: bike.id,
      motorcycleName: `${bike.brand} ${bike.model}`,
      color: color,
      depositType: `${depositPct}% Deposit`,
      depositAmount: depositAmount,
      totalPrice: totalPrice,
      paymentStatus: 'Deposit Paid',
      status: 'Confirmed',
      expectedDelivery: 'October 2026'
    };

    const newPreOrder = await window.store.placePreOrder(preOrderData);
    this.closePreOrderModal();
    this.playSFX('success');

    alert(`⚡ PRE-ORDER RESERVED!\n\nReservation ID: ${newPreOrder.id}\nThank you, ${name}.\nDeposit Paid: $${depositAmount.toLocaleString()}\nYour slot for the ${newPreOrder.motorcycleName} (${color}) has been secured!`);
  }

  openSearch() {
    document.getElementById('search-modal')?.classList.remove('hidden');
    document.getElementById('search-input')?.focus();
    this.playSFX('open');
  }

  closeSearch() {
    document.getElementById('search-modal')?.classList.add('hidden');
  }

  handleSearchInput(val) {
    const resultsContainer = document.getElementById('search-results');
    if (!resultsContainer) return;

    const q = val.trim().toLowerCase();
    if (!q) {
      resultsContainer.innerHTML = `<div class="text-center text-gray-500 text-xs py-8 font-cinzel">Search across brands, engine capacities & models</div>`;
      return;
    }

    const matches = window.store.motorcycles.filter(b => 
      b.model.toLowerCase().includes(q) ||
      b.brand.toLowerCase().includes(q) ||
      b.engine.toLowerCase().includes(q) ||
      b.category.toLowerCase().includes(q)
    );

    if (matches.length === 0) {
      resultsContainer.innerHTML = `<div class="text-center text-gray-400 py-6 text-xs font-cinzel">No matches found for "${val}"</div>`;
      return;
    }

    resultsContainer.innerHTML = matches.map(b => `
      <div onclick="app.closeSearch(); app.openDetailsModal('${b.id}')" class="flex items-center justify-between p-3 bg-gray-900 hover:bg-gray-800 rounded-xl cursor-pointer border border-gray-800 transition">
        <div class="flex items-center gap-3">
          <img src="${b.image}" class="w-12 h-10 object-contain rounded bg-black p-1" />
          <div>
            <div class="font-cinzel font-bold text-white text-sm">${b.model}</div>
            <div class="text-[10px] text-luxury-gold font-cinzel">${b.brand} &bull; ${b.engine}</div>
          </div>
        </div>
        <div class="font-cinzel font-extrabold text-white text-sm">
          $${(b.price - (b.discount || 0)).toLocaleString()}
        </div>
      </div>
    `).join('');
  }

  submitContactForm(e) {
    e.preventDefault();
    this.showToast('Inquiry Transmitted to Uzair Showroom Concierge!');
    this.playSFX('success');
    e.target.reset();
  }

  contactShowroomForBike(modelName) {
    const sel = document.getElementById('contact-bike-select');
    if (sel) {
      for (let i = 0; i < sel.options.length; i++) {
        if (sel.options[i].value.includes(modelName)) {
          sel.selectedIndex = i;
          break;
        }
      }
    }
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  }

  switchAdminTab(tabName) {
    if (window.AdminComponent) AdminComponent.render(tabName);
    this.playSFX('click');
  }

  openAddBikeModal() {
    const brand = prompt('Brand (e.g., Ducati, BMW Motorrad, Yamaha):', 'Ducati');
    if (!brand) return;
    const model = prompt('Model Name (e.g., Streetfighter V4 SP2):', 'Streetfighter V4 SP2');
    if (!model) return;
    const priceStr = prompt('Price in USD (e.g., 37500):', '37500');
    if (!priceStr) return;

    const newBike = {
      brand: brand,
      model: model,
      year: 2026,
      price: parseInt(priceStr, 10),
      discount: 0,
      engine: '1103 cc Desmosedici Stradale',
      power: '208 HP',
      torque: '123 Nm',
      topSpeed: '299 km/h',
      transmission: '6-speed Quick Shift',
      fuelType: 'Petrol',
      mileage: '15 km/l',
      category: 'Naked Bikes',
      stock: 5,
      reserved: 0,
      sold: 0,
      availability: 'In Stock',
      isNew: true,
      isFeatured: true,
      isPreOrder: false,
      isVisible: true,
      badges: ['New Arrival'],
      colors: [{ name: 'Stealth Black', hex: '#111111' }],
      image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=1200&q=80',
      warranty: '24 Months Factory Warranty',
      dimensions: 'Seat Height: 845 mm | Weight: 178 kg',
      description: 'Ultra-exclusive high performance hyperbike newly registered to Uzair Showroom inventory.'
    };

    window.store.addMotorcycle(newBike);
    if (window.AdminComponent) AdminComponent.render('products');
    this.showToast(`New Motorcycle ${brand} ${model} Added!`);
  }

  openEditBikeModal(bikeId) {
    const bike = window.store.motorcycles.find(b => b.id === bikeId);
    if (!bike) return;

    const newPriceStr = prompt(`Update Price for ${bike.model}:`, bike.price);
    if (!newPriceStr) return;
    const newStockStr = prompt(`Update Stock Count for ${bike.model}:`, bike.stock);
    if (!newStockStr) return;

    window.store.updateMotorcycle(bikeId, {
      price: parseInt(newPriceStr, 10),
      stock: parseInt(newStockStr, 10)
    });

    if (window.AdminComponent) AdminComponent.render('products');
    this.showToast(`Updated ${bike.model}!`);
  }

  deleteBike(bikeId) {
    if (confirm('Are you sure you want to remove this motorcycle from the showroom catalog?')) {
      window.store.deleteMotorcycle(bikeId);
      if (window.AdminComponent) AdminComponent.render('products');
      this.showToast('Motorcycle Removed from Catalog.');
    }
  }

  adjustStock(bikeId, delta) {
    const bike = window.store.motorcycles.find(b => b.id === bikeId);
    if (bike) {
      const newStock = Math.max(0, (bike.stock || 0) + delta);
      window.store.updateMotorcycle(bikeId, { stock: newStock });
      if (window.AdminComponent) AdminComponent.render('inventory');
    }
  }

  updateOrderStatus(orderId, status) {
    window.store.updateOrderStatus(orderId, { orderStatus: status });
    this.showToast(`Order ${orderId} status set to ${status}`);
  }

  savePaymentSettings(e) {
    e.preventDefault();
    const jazzCash = document.getElementById('gw-jazzCash')?.checked;
    const easypaisa = document.getElementById('gw-easypaisa')?.checked;
    const payPak = document.getElementById('gw-payPak')?.checked;
    const creditCard = document.getElementById('gw-creditCard')?.checked;
    const bankWire = document.getElementById('gw-bankWire')?.checked;

    window.store.updateSettings({
      paymentGateways: { jazzCash, easypaisa, payPak, creditCard, bankWire }
    });

    this.showToast('Payment Configurations Saved!');
  }

  toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    if (menu) menu.classList.toggle('hidden');
  }

  toggleSFX() {
    this.sfxEnabled = !this.sfxEnabled;
    const icon = document.getElementById('sfx-icon');
    if (icon) {
      icon.setAttribute('data-lucide', this.sfxEnabled ? 'volume-2' : 'volume-x');
      if (window.lucide) lucide.createIcons();
    }
    this.showToast(`Audio SFX ${this.sfxEnabled ? 'Enabled' : 'Disabled'}`);
  }

  playSFX(type = 'click') {
    if (!this.sfxEnabled) return;
    try {
      if (!this.audioCtx) {
        this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      const now = this.audioCtx.currentTime;
      if (type === 'click') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.exponentialRampToValueAtTime(300, now + 0.05);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.05);
        osc.start(now);
        osc.stop(now + 0.05);
      } else if (type === 'open') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(400, now);
        osc.frequency.exponentialRampToValueAtTime(900, now + 0.1);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.1);
        osc.start(now);
        osc.stop(now + 0.1);
      } else if (type === 'success') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, now);
        osc.frequency.setValueAtTime(659.25, now + 0.08);
        osc.frequency.setValueAtTime(783.99, now + 0.16);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.25);
        osc.start(now);
        osc.stop(now + 0.25);
      }
    } catch (e) {}
  }

  showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'fixed bottom-20 right-6 z-50 bg-gray-950 border border-gray-800 text-luxury-gold px-4 py-3 rounded-xl font-cinzel text-xs shadow-2xl transition-all duration-500 animate-bounce';
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.classList.add('opacity-0');
      setTimeout(() => toast.remove(), 500);
    }, 2500);
  }
}

window.app = new App();

document.addEventListener('DOMContentLoaded', () => {
  window.app.init();
});
