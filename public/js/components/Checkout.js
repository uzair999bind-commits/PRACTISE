/**
 * Checkout Component - Luxury Multi-Step Checkout with Pakistani & Global Payment Gateways
 */

const CheckoutComponent = {
  render() {
    const container = document.getElementById('checkout-content');
    if (!container) return;

    const cart = window.store ? window.store.cart : [];
    const settings = (window.store && window.store.settings) ? window.store.settings : {};
    const gateways = settings.paymentGateways || { jazzCash: true, easypaisa: true, payPak: true, creditCard: true, bankWire: true };

    if (cart.length === 0) {
      container.innerHTML = `
        <div class="text-center py-12 space-y-4">
          <div class="w-16 h-16 rounded-full bg-gray-900 border border-gray-800 text-luxury-gold mx-auto flex items-center justify-center">
            <i data-lucide="shopping-bag" class="w-8 h-8"></i>
          </div>
          <h3 class="font-cinzel font-bold text-white text-xl">Your Cart is Empty</h3>
          <p class="text-xs text-gray-400">Select a motorcycle from the 3D gallery to proceed to checkout.</p>
          <button onclick="app.closeCheckoutModal()" class="px-6 py-3 bg-gray-200 text-black text-xs font-cinzel font-bold rounded-xl">
            BROWSE SHOWROOM
          </button>
        </div>
      `;
      if (window.lucide) lucide.createIcons();
      return;
    }

    const subtotal = window.store.getCartTotal();
    const tax = Math.round(subtotal * (settings.taxRate || 0.08));
    const shipping = settings.shippingFee || 450;
    const total = subtotal + tax + shipping;

    container.innerHTML = `
      <div class="space-y-6">
        
        <div class="flex items-center justify-between border-b border-gray-900 pb-4">
          <div>
            <span class="text-xs font-cinzel text-luxury-gold font-bold tracking-widest uppercase">SECURE PAYMENT CONCIERGE</span>
            <h3 class="font-cinzel font-black text-2xl text-white mt-1">Finalizing Purchase Order</h3>
          </div>
          <div class="text-right font-cinzel">
            <div class="text-[10px] text-gray-500">TOTAL DUE</div>
            <div class="text-white font-black text-xl">$${total.toLocaleString()}</div>
          </div>
        </div>

        <form onsubmit="app.submitCheckoutForm(event)" class="space-y-6 font-cinzel">
          
          <!-- 1. Client Identification -->
          <div class="space-y-3">
            <h4 class="font-bold text-white text-xs uppercase tracking-wider text-luxury-gold flex items-center gap-2">
              <i data-lucide="user" class="w-4 h-4"></i> 1. CLIENT IDENTIFICATION & ADDRESS
            </h4>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-[10px] text-gray-400 mb-1">FULL NAME</label>
                <input type="text" id="chk-name" required placeholder="Alexander Sterling" class="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-2.5 text-xs text-gray-100 focus:border-luxury-gold focus:outline-none" />
              </div>
              <div>
                <label class="block text-[10px] text-gray-400 mb-1">EMAIL ADDRESS</label>
                <input type="email" id="chk-email" required placeholder="alexander@example.com" class="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-2.5 text-xs text-gray-100 focus:border-luxury-gold focus:outline-none" />
              </div>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-[10px] text-gray-400 mb-1">PHONE NUMBER</label>
                <input type="tel" id="chk-phone" required placeholder="+92 300 1234567 / +1 555 0192" class="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-2.5 text-xs text-gray-100 focus:border-luxury-gold focus:outline-none" />
              </div>
              <div>
                <label class="block text-[10px] text-gray-400 mb-1">DELIVERY METHOD</label>
                <select id="chk-delivery" class="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-2.5 text-xs text-gray-100 focus:border-luxury-gold focus:outline-none">
                  <option value="Home Delivery">White-Glove Enclosed Transport (+$450)</option>
                  <option value="Showroom Pickup">VIP Flagship Showroom Handover (Free)</option>
                </select>
              </div>
            </div>
            <div>
              <label class="block text-[10px] text-gray-400 mb-1">DELIVERY STREET ADDRESS</label>
              <input type="text" id="chk-address" required placeholder="Main Boulevard, DHA Phase 6, Karachi / San Francisco" class="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-2.5 text-xs text-gray-100 focus:border-luxury-gold focus:outline-none" />
            </div>
          </div>

          <!-- 2. Payment Gateway Selection -->
          <div class="space-y-3 pt-2 border-t border-gray-900">
            <h4 class="font-bold text-white text-xs uppercase tracking-wider text-luxury-gold flex items-center gap-2">
              <i data-lucide="credit-card" class="w-4 h-4"></i> 2. PAYMENT GATEWAY SELECTION
            </h4>
            
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              
              ${gateways.jazzCash !== false ? `
                <label class="flex items-center gap-3 p-3 bg-gray-900/90 rounded-xl border border-gray-800 hover:border-luxury-gold cursor-pointer">
                  <input type="radio" name="paymentMethod" value="JazzCash Mobile Wallet" checked class="accent-luxury-gold" />
                  <div>
                    <div class="font-bold text-xs text-white">JazzCash Direct</div>
                    <div class="text-[10px] text-gray-400">Mobile Wallet & OTC</div>
                  </div>
                </label>
              ` : ''}

              ${gateways.easypaisa !== false ? `
                <label class="flex items-center gap-3 p-3 bg-gray-900/90 rounded-xl border border-gray-800 hover:border-luxury-gold cursor-pointer">
                  <input type="radio" name="paymentMethod" value="Easypaisa Wallet" class="accent-luxury-gold" />
                  <div>
                    <div class="font-bold text-xs text-emerald-400">Easypaisa Pay</div>
                    <div class="text-[10px] text-gray-400">Instant Wallet Transfer</div>
                  </div>
                </label>
              ` : ''}

              ${gateways.payPak !== false ? `
                <label class="flex items-center gap-3 p-3 bg-gray-900/90 rounded-xl border border-gray-800 hover:border-luxury-gold cursor-pointer">
                  <input type="radio" name="paymentMethod" value="PayPak Card / National Gateway" class="accent-luxury-gold" />
                  <div>
                    <div class="font-bold text-xs text-white">PayPak Debit Card</div>
                    <div class="text-[10px] text-gray-400">Pakistani Bank Debit</div>
                  </div>
                </label>
              ` : ''}

              ${gateways.creditCard !== false ? `
                <label class="flex items-center gap-3 p-3 bg-gray-900/90 rounded-xl border border-gray-800 hover:border-luxury-gold cursor-pointer">
                  <input type="radio" name="paymentMethod" value="Visa / MasterCard Credit" class="accent-luxury-gold" />
                  <div>
                    <div class="font-bold text-xs text-white">Visa / MasterCard / Amex</div>
                    <div class="text-[10px] text-gray-400">International Credit Card</div>
                  </div>
                </label>
              ` : ''}

              ${gateways.bankWire !== false ? `
                <label class="flex items-center gap-3 p-3 bg-gray-900/90 rounded-xl border border-gray-800 hover:border-luxury-gold cursor-pointer">
                  <input type="radio" name="paymentMethod" value="Direct Bank Wire Transfer" class="accent-luxury-gold" />
                  <div>
                    <div class="font-bold text-xs text-white">Direct Bank Wire</div>
                    <div class="text-[10px] text-gray-400">Escrow IBAN Account</div>
                  </div>
                </label>
              ` : ''}

            </div>
          </div>

          <!-- Summary Breakdown -->
          <div class="bg-gray-900/90 p-4 rounded-2xl border border-gray-800 text-xs font-cinzel space-y-2">
            <div class="flex justify-between text-gray-400">
              <span>MOTORCYCLES SUBTOTAL (${cart.length}):</span>
              <span class="text-white">$${subtotal.toLocaleString()}</span>
            </div>
            <div class="flex justify-between text-gray-400">
              <span>ESTIMATED DUTY / TAX (8%):</span>
              <span class="text-white">$${tax.toLocaleString()}</span>
            </div>
            <div class="flex justify-between text-gray-400">
              <span>ENCLOSED TRANSPORT FEE:</span>
              <span class="text-white">$${shipping.toLocaleString()}</span>
            </div>
            <div class="flex justify-between text-luxury-gold font-bold border-t border-gray-800 pt-2 text-base">
              <span>TOTAL DUE TODAY:</span>
              <span class="text-white font-extrabold">$${total.toLocaleString()}</span>
            </div>
          </div>

          <button type="submit" class="w-full py-4 bg-gradient-to-r from-gray-200 via-luxury-silver to-white hover:from-white hover:to-gray-200 text-black font-cinzel font-bold text-xs tracking-widest uppercase rounded-xl shadow-xl transition">
            AUTHORIZE PAYMENT & CONFIRM ORDER
          </button>

        </form>

      </div>
    `;

    if (window.lucide) lucide.createIcons();
  }
};

window.CheckoutComponent = CheckoutComponent;
