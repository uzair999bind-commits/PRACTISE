/**
 * PreOrder Component - Dedicated Reservation Workflow
 */

const PreOrderComponent = {
  render(selectedBike = null) {
    const container = document.getElementById('preorder-content');
    if (!container) return;

    const motorcycles = window.store ? window.store.motorcycles : [];
    const activeBike = selectedBike || (motorcycles.length > 0 ? motorcycles[0] : null);

    if (!activeBike) {
      container.innerHTML = `<div class="text-white text-center py-8">No motorcycles available for pre-order.</div>`;
      return;
    }

    const price = activeBike.price - (activeBike.discount || 0);
    const depositPct = 0.25; // 25% deposit
    const depositAmt = Math.round(price * depositPct);

    container.innerHTML = `
      <div class="space-y-6">
        
        <div class="flex items-center justify-between border-b border-gray-800 pb-4">
          <div>
            <span class="text-xs font-orbitron text-amber-400 font-bold tracking-widest uppercase">RESERVATION PROTOCOL</span>
            <h3 class="font-orbitron font-black text-2xl text-white mt-1">Pre-Order Reservation</h3>
          </div>
          <div class="px-3 py-1 bg-amber-950/80 border border-amber-500/50 text-amber-400 text-xs font-orbitron font-bold rounded-lg">
            SLOT ALLOCATION
          </div>
        </div>

        <form onsubmit="app.submitPreOrderForm(event)" class="space-y-4">
          
          <!-- Motorcycle Selection -->
          <div>
            <label class="block text-xs font-orbitron text-gray-400 mb-1">SELECT MACHINE</label>
            <select id="preorder-bike-id" onchange="app.onPreOrderBikeChange(this.value)" class="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-sm text-gray-100 focus:border-cyan-500 focus:outline-none">
              ${motorcycles.map(b => `
                <option value="${b.id}" ${b.id === activeBike.id ? 'selected' : ''}>
                  ${b.brand} ${b.model} (${b.year}) — $${(b.price - (b.discount || 0)).toLocaleString()}
                </option>
              `).join('')}
            </select>
          </div>

          <!-- Color Variant Selection -->
          <div>
            <label class="block text-xs font-orbitron text-gray-400 mb-1">COLOR VARIANT</label>
            <select id="preorder-color" class="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-sm text-gray-100 focus:border-cyan-500 focus:outline-none">
              ${(activeBike.colors || [{name: 'Standard'}]).map(c => `
                <option value="${c.name}">${c.name}</option>
              `).join('')}
            </select>
          </div>

          <!-- Customer Info -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-orbitron text-gray-400 mb-1">CUSTOMER NAME</label>
              <input type="text" id="preorder-name" required placeholder="Alex Sterling" class="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-sm text-gray-100 focus:border-cyan-500 focus:outline-none" />
            </div>
            <div>
              <label class="block text-xs font-orbitron text-gray-400 mb-1">EMAIL ADDRESS</label>
              <input type="email" id="preorder-email" required placeholder="alex@example.com" class="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-sm text-gray-100 focus:border-cyan-500 focus:outline-none" />
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-orbitron text-gray-400 mb-1">PHONE NUMBER</label>
              <input type="tel" id="preorder-phone" required placeholder="+1 (555) 019-2831" class="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-sm text-gray-100 focus:border-cyan-500 focus:outline-none" />
            </div>
            <div>
              <label class="block text-xs font-orbitron text-gray-400 mb-1">DEPOSIT OPTION</label>
              <select id="preorder-deposit-type" onchange="app.updatePreOrderDeposit(this.value, ${price})" class="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-sm text-gray-100 focus:border-cyan-500 focus:outline-none">
                <option value="25">25% Deposit ($${Math.round(price * 0.25).toLocaleString()})</option>
                <option value="10">10% Deposit ($${Math.round(price * 0.10).toLocaleString()})</option>
                <option value="100">Full Payment ($${price.toLocaleString()})</option>
              </select>
            </div>
          </div>

          <!-- Summary Box -->
          <div class="bg-gray-900/80 p-4 rounded-2xl border border-gray-800 text-xs space-y-2 font-orbitron">
            <div class="flex justify-between text-gray-400">
              <span>MACHINE TOTAL:</span>
              <span class="text-white font-bold">$${price.toLocaleString()}</span>
            </div>
            <div class="flex justify-between text-cyan-400 font-bold border-t border-gray-800 pt-2 text-sm">
              <span>REQUIRED DEPOSIT DUE TODAY:</span>
              <span id="preorder-deposit-display">$${depositAmt.toLocaleString()}</span>
            </div>
            <div class="text-[10px] text-gray-500 pt-1">
              Estimated Delivery: October 2026. Deposit is 100% refundable up to 14 days prior to factory dispatch.
            </div>
          </div>

          <!-- Submit CTA -->
          <button type="submit" class="w-full py-4 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-black font-orbitron font-bold text-sm tracking-wider rounded-xl shadow-lg shadow-amber-500/20 transition">
            CONFIRM PRE-ORDER RESERVATION
          </button>

        </form>

      </div>
    `;
  }
};

window.PreOrderComponent = PreOrderComponent;
