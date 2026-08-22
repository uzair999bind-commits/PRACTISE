/**
 * Admin Component - Isolated Admin Management Console for UZair Showroom
 */

const AdminComponent = {
  activeTab: 'overview',

  render(activeTab = 'overview') {
    this.activeTab = activeTab;
    const container = document.getElementById('admin-tab-content');
    if (!container) return;

    document.querySelectorAll('.admin-tab-btn').forEach(btn => {
      btn.className = 'admin-tab-btn w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-cinzel font-semibold text-gray-400 hover:text-white hover:bg-gray-900 transition';
    });
    const activeBtn = document.getElementById(`admin-tab-${activeTab}`);
    if (activeBtn) {
      activeBtn.className = 'admin-tab-btn w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-cinzel font-semibold text-white bg-gray-900 border border-gray-800 transition';
    }

    switch (activeTab) {
      case 'overview':
        this.renderOverview(container);
        break;
      case 'products':
        this.renderProducts(container);
        break;
      case 'inventory':
        this.renderInventory(container);
        break;
      case 'orders':
        this.renderOrders(container);
        break;
      case 'preorders':
        this.renderPreOrders(container);
        break;
      case 'brands':
        this.renderBrands(container);
        break;
      case 'payments':
        this.renderPayments(container);
        break;
      default:
        this.renderOverview(container);
    }

    if (window.lucide) lucide.createIcons();
  },

  renderOverview(container) {
    const motorcycles = window.store.motorcycles || [];
    const orders = window.store.orders || [];
    const preOrders = window.store.preOrders || [];
    
    const totalRevenue = orders.reduce((sum, o) => sum + (o.price || 0), 0);
    const preOrderDeposits = preOrders.reduce((sum, p) => sum + (p.depositAmount || 0), 0);
    const totalUnits = motorcycles.reduce((sum, b) => sum + (b.stock || 0), 0);

    container.innerHTML = `
      <div class="space-y-6 font-cinzel">
        
        <div class="flex items-center justify-between border-b border-gray-900 pb-4">
          <div>
            <h3 class="font-extrabold text-white text-xl">Uzair Showroom Telemetry Overview</h3>
            <p class="text-xs text-gray-400">Live inventory, pre-orders & financial analytics</p>
          </div>
          <button onclick="app.openAddBikeModal()" class="px-4 py-2.5 bg-gray-200 text-black font-bold text-xs rounded-xl shadow flex items-center gap-2">
            <i data-lucide="plus" class="w-4 h-4"></i> ADD MOTORCYCLE
          </button>
        </div>

        <!-- Metrics Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div class="bg-gray-950 p-5 rounded-2xl border border-gray-900 space-y-2">
            <div class="flex items-center justify-between text-luxury-gold">
              <span class="text-xs font-bold uppercase text-gray-400">TOTAL REVENUE</span>
              <i data-lucide="dollar-sign" class="w-5 h-5"></i>
            </div>
            <div class="font-black text-2xl text-white">$${totalRevenue.toLocaleString()}</div>
            <div class="text-[10px] text-emerald-400 font-semibold">+22.4% vs last quarter</div>
          </div>

          <div class="bg-gray-950 p-5 rounded-2xl border border-gray-900 space-y-2">
            <div class="flex items-center justify-between text-amber-400">
              <span class="text-xs font-bold uppercase text-gray-400">PRE-ORDER DEPOSITS</span>
              <i data-lucide="clock" class="w-5 h-5"></i>
            </div>
            <div class="font-black text-2xl text-white">$${preOrderDeposits.toLocaleString()}</div>
            <div class="text-[10px] text-amber-400 font-semibold">${preOrders.length} confirmed pre-order slots</div>
          </div>

          <div class="bg-gray-950 p-5 rounded-2xl border border-gray-900 space-y-2">
            <div class="flex items-center justify-between text-blue-400">
              <span class="text-xs font-bold uppercase text-gray-400">ACTIVE INVENTORY</span>
              <i data-lucide="boxes" class="w-5 h-5"></i>
            </div>
            <div class="font-black text-2xl text-white">${totalUnits} Units</div>
            <div class="text-[10px] text-gray-400">${motorcycles.length} catalog models</div>
          </div>

          <div class="bg-gray-950 p-5 rounded-2xl border border-gray-900 space-y-2">
            <div class="flex items-center justify-between text-red-400">
              <span class="text-xs font-bold uppercase text-gray-400">COMPLETED ORDERS</span>
              <i data-lucide="package" class="w-5 h-5"></i>
            </div>
            <div class="font-black text-2xl text-white">${orders.length} Handovers</div>
            <div class="text-[10px] text-luxury-gold font-semibold">100% Client Satisfaction</div>
          </div>

        </div>

        <div class="bg-gray-950 border border-gray-900 rounded-2xl p-6 space-y-4">
          <div class="flex items-center justify-between">
            <h4 class="font-bold text-white text-sm">RECENT CLIENT ORDERS</h4>
            <button onclick="app.switchAdminTab('orders')" class="text-xs text-luxury-gold hover:underline">View All Orders &rarr;</button>
          </div>
          
          <div class="overflow-x-auto">
            <table class="w-full text-left text-xs">
              <thead class="bg-gray-900 text-gray-400 uppercase text-[10px]">
                <tr>
                  <th class="p-3">Order ID</th>
                  <th class="p-3">Customer</th>
                  <th class="p-3">Motorcycle</th>
                  <th class="p-3">Price</th>
                  <th class="p-3">Status</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-900 text-gray-200">
                ${orders.slice(0, 5).map(o => `
                  <tr>
                    <td class="p-3 font-mono font-bold text-luxury-gold">${o.id}</td>
                    <td class="p-3">${o.customerName}</td>
                    <td class="p-3">${o.motorcycleName}</td>
                    <td class="p-3 font-bold">$${o.price.toLocaleString()}</td>
                    <td class="p-3">
                      <span class="px-2 py-0.5 rounded bg-gray-900 text-luxury-gold border border-gray-800 text-[10px]">
                        ${o.orderStatus}
                      </span>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    `;
  },

  renderProducts(container) {
    const motorcycles = window.store.motorcycles || [];

    container.innerHTML = `
      <div class="space-y-6 font-cinzel">
        
        <div class="flex items-center justify-between border-b border-gray-900 pb-4">
          <div>
            <h3 class="font-extrabold text-white text-xl">Motorcycle Products Manager</h3>
            <p class="text-xs text-gray-400">Add, update prices, discounts, stock and 3D visual assets</p>
          </div>
          <button onclick="app.openAddBikeModal()" class="px-4 py-2.5 bg-gray-200 text-black font-bold text-xs rounded-xl shadow flex items-center gap-2">
            <i data-lucide="plus" class="w-4 h-4"></i> ADD PRODUCT
          </button>
        </div>

        <div class="overflow-x-auto bg-gray-950 border border-gray-900 rounded-2xl">
          <table class="w-full text-left text-xs">
            <thead class="bg-gray-900 text-gray-400 uppercase text-[10px]">
              <tr>
                <th class="p-4">Machine</th>
                <th class="p-4">Brand</th>
                <th class="p-4">Price</th>
                <th class="p-4">Stock</th>
                <th class="p-4">Status</th>
                <th class="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-900 text-gray-200">
              ${motorcycles.map(b => `
                <tr class="hover:bg-gray-900/50 transition">
                  <td class="p-4 flex items-center gap-3">
                    <img src="${b.image}" alt="${b.model}" class="w-12 h-10 object-contain rounded bg-black p-1 border border-gray-800" />
                    <div>
                      <div class="font-bold text-white text-sm">${b.model}</div>
                      <div class="text-[10px] text-gray-400">${b.engine}</div>
                    </div>
                  </td>
                  <td class="p-4 font-semibold text-luxury-gold">${b.brand}</td>
                  <td class="p-4 font-bold text-white">
                    $${(b.price - (b.discount || 0)).toLocaleString()}
                    ${b.discount ? `<span class="text-[10px] text-red-400 block font-normal">-$${b.discount} OFF</span>` : ''}
                  </td>
                  <td class="p-4 font-mono font-bold ${b.stock === 0 ? 'text-red-400' : 'text-emerald-400'}">
                    ${b.stock} Units
                  </td>
                  <td class="p-4">
                    <span class="px-2 py-0.5 rounded text-[10px] ${b.availability === 'In Stock' ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30' : 'bg-amber-950 text-amber-400 border border-amber-500/30'}">
                      ${b.availability}
                    </span>
                  </td>
                  <td class="p-4 text-right space-x-2">
                    <button onclick="app.openEditBikeModal('${b.id}')" class="px-3 py-1.5 bg-gray-900 hover:bg-gray-800 text-luxury-silver border border-gray-800 rounded-lg text-[10px]">
                      EDIT
                    </button>
                    <button onclick="app.deleteBike('${b.id}')" class="px-3 py-1.5 bg-red-950/60 hover:bg-red-900 text-red-400 border border-red-500/30 rounded-lg text-[10px]">
                      DELETE
                    </button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>

      </div>
    `;
  },

  renderInventory(container) {
    const motorcycles = window.store.motorcycles || [];

    container.innerHTML = `
      <div class="space-y-6 font-cinzel">
        <div class="border-b border-gray-900 pb-4">
          <h3 class="font-extrabold text-white text-xl">Warehouse Inventory Control</h3>
          <p class="text-xs text-gray-400">Stock telemetry, reserved units, and sold counts</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          ${motorcycles.map(b => `
            <div class="bg-gray-950 p-5 rounded-2xl border border-gray-900 space-y-3">
              <div class="flex items-center justify-between border-b border-gray-900 pb-2">
                <div class="font-bold text-white text-sm">${b.model}</div>
                <span class="text-xs text-luxury-gold font-semibold">${b.brand}</span>
              </div>
              <div class="grid grid-cols-3 gap-2 text-center text-xs">
                <div class="bg-gray-900 p-2 rounded-lg">
                  <div class="text-[9px] text-gray-400">STOCK</div>
                  <div class="font-bold text-white text-base">${b.stock}</div>
                </div>
                <div class="bg-gray-900 p-2 rounded-lg">
                  <div class="text-[9px] text-amber-400">RESERVED</div>
                  <div class="font-bold text-amber-400 text-base">${b.reserved || 0}</div>
                </div>
                <div class="bg-gray-900 p-2 rounded-lg">
                  <div class="text-[9px] text-emerald-400">SOLD</div>
                  <div class="font-bold text-emerald-400 text-base">${b.sold || 0}</div>
                </div>
              </div>
              <div class="flex items-center gap-2 pt-1">
                <button onclick="app.adjustStock('${b.id}', 1)" class="flex-1 py-1.5 bg-gray-900 hover:bg-gray-800 text-emerald-400 border border-emerald-500/30 text-xs rounded-lg">
                  + Add Stock
                </button>
                <button onclick="app.adjustStock('${b.id}', -1)" class="flex-1 py-1.5 bg-gray-900 hover:bg-gray-800 text-red-400 border border-red-500/30 text-xs rounded-lg">
                  - Remove Stock
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  },

  renderOrders(container) {
    const orders = window.store.orders || [];

    container.innerHTML = `
      <div class="space-y-6 font-cinzel">
        <div class="border-b border-gray-900 pb-4">
          <h3 class="font-extrabold text-white text-xl">Customer Orders Log</h3>
          <p class="text-xs text-gray-400">Manage fulfillment status: Pending, Confirmed, Processing, Ready for Delivery, Completed, Cancelled</p>
        </div>

        <div class="overflow-x-auto bg-gray-950 border border-gray-900 rounded-2xl">
          <table class="w-full text-left text-xs">
            <thead class="bg-gray-900 text-gray-400 uppercase text-[10px]">
              <tr>
                <th class="p-4">Order ID</th>
                <th class="p-4">Client</th>
                <th class="p-4">Motorcycle</th>
                <th class="p-4">Amount</th>
                <th class="p-4">Payment Method</th>
                <th class="p-4">Order Status</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-900 text-gray-200">
              ${orders.map(o => `
                <tr class="hover:bg-gray-900/50 transition">
                  <td class="p-4 font-mono font-bold text-luxury-gold">${o.id}</td>
                  <td class="p-4">
                    <div class="font-bold text-white">${o.customerName}</div>
                    <div class="text-[10px] text-gray-400">${o.email}</div>
                  </td>
                  <td class="p-4">${o.motorcycleName}</td>
                  <td class="p-4 font-bold text-white">$${o.price.toLocaleString()}</td>
                  <td class="p-4 font-semibold text-emerald-400">${o.paymentMethod || 'Credit Card'}</td>
                  <td class="p-4">
                    <select onchange="app.updateOrderStatus('${o.id}', this.value)" class="bg-gray-900 border border-gray-800 rounded-lg px-2 py-1 text-xs text-gray-200 focus:outline-none">
                      <option value="Pending" ${o.orderStatus === 'Pending' ? 'selected' : ''}>Pending</option>
                      <option value="Confirmed" ${o.orderStatus === 'Confirmed' ? 'selected' : ''}>Confirmed</option>
                      <option value="Processing" ${o.orderStatus === 'Processing' ? 'selected' : ''}>Processing</option>
                      <option value="Ready for Delivery" ${o.orderStatus === 'Ready for Delivery' ? 'selected' : ''}>Ready for Delivery</option>
                      <option value="Completed" ${o.orderStatus === 'Completed' ? 'selected' : ''}>Completed</option>
                      <option value="Cancelled" ${o.orderStatus === 'Cancelled' ? 'selected' : ''}>Cancelled</option>
                    </select>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  renderPreOrders(container) {
    const preOrders = window.store.preOrders || [];

    container.innerHTML = `
      <div class="space-y-6 font-cinzel">
        <div class="border-b border-gray-900 pb-4">
          <h3 class="font-extrabold text-white text-xl">Pre-Order Reservations Log</h3>
          <p class="text-xs text-gray-400">Track pre-order allocation slots & deposit status</p>
        </div>

        <div class="overflow-x-auto bg-gray-950 border border-gray-900 rounded-2xl">
          <table class="w-full text-left text-xs">
            <thead class="bg-gray-900 text-gray-400 uppercase text-[10px]">
              <tr>
                <th class="p-4">Pre-Order ID</th>
                <th class="p-4">Client</th>
                <th class="p-4">Machine & Color</th>
                <th class="p-4">Deposit Amount</th>
                <th class="p-4">Payment Status</th>
                <th class="p-4">Pre-Order Status</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-900 text-gray-200">
              ${preOrders.map(p => `
                <tr class="hover:bg-gray-900/50 transition">
                  <td class="p-4 font-mono font-bold text-amber-400">${p.id}</td>
                  <td class="p-4">
                    <div class="font-bold text-white">${p.customerName}</div>
                    <div class="text-[10px] text-gray-400">${p.phone}</div>
                  </td>
                  <td class="p-4">
                    <div class="font-bold text-white">${p.motorcycleName}</div>
                    <div class="text-[10px] text-luxury-gold">${p.color}</div>
                  </td>
                  <td class="p-4 font-bold text-emerald-400">$${p.depositAmount.toLocaleString()} (${p.depositType})</td>
                  <td class="p-4 text-emerald-400 font-semibold">${p.paymentStatus}</td>
                  <td class="p-4 font-semibold text-amber-400">${p.status}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  renderBrands(container) {
    const brands = window.store.brands || [];

    container.innerHTML = `
      <div class="space-y-6 font-cinzel">
        <div class="border-b border-gray-900 pb-4">
          <h3 class="font-extrabold text-white text-xl">10 Major Brands Directory</h3>
          <p class="text-xs text-gray-400">Registered Global Manufacturers</p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          ${brands.map(b => `
            <div class="bg-gray-950 p-4 rounded-2xl border border-gray-900 flex items-center justify-between">
              <div class="flex items-center gap-3">
                <span class="text-2xl">${b.icon || '🏍️'}</span>
                <div>
                  <div class="font-bold text-white text-sm">${b.name}</div>
                  <div class="text-[10px] text-gray-400">${b.country} &bull; Founded ${b.founded}</div>
                </div>
              </div>
              <span class="w-3 h-3 rounded-full border border-gray-700" style="background-color: ${b.accent}"></span>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  },

  renderPayments(container) {
    const settings = window.store.settings || {};
    const gateways = settings.paymentGateways || {};

    container.innerHTML = `
      <div class="space-y-6 font-cinzel">
        <div class="border-b border-gray-900 pb-4">
          <h3 class="font-extrabold text-white text-xl">Pakistani & International Payment Configurations</h3>
          <p class="text-xs text-gray-400">Enable or disable checkout payment providers</p>
        </div>

        <form onsubmit="app.savePaymentSettings(event)" class="bg-gray-950 border border-gray-900 rounded-2xl p-6 space-y-4 max-w-xl">
          <div class="space-y-3 text-xs">
            <label class="flex items-center justify-between p-3 bg-gray-900 rounded-xl border border-gray-800">
              <span class="text-white font-bold">JazzCash Mobile Wallet</span>
              <input type="checkbox" id="gw-jazzCash" ${gateways.jazzCash !== false ? 'checked' : ''} class="w-4 h-4 accent-luxury-gold" />
            </label>
            <label class="flex items-center justify-between p-3 bg-gray-900 rounded-xl border border-gray-800">
              <span class="text-white font-bold">Easypaisa Wallet</span>
              <input type="checkbox" id="gw-easypaisa" ${gateways.easypaisa !== false ? 'checked' : ''} class="w-4 h-4 accent-luxury-gold" />
            </label>
            <label class="flex items-center justify-between p-3 bg-gray-900 rounded-xl border border-gray-800">
              <span class="text-white font-bold">PayPak Debit Card</span>
              <input type="checkbox" id="gw-payPak" ${gateways.payPak !== false ? 'checked' : ''} class="w-4 h-4 accent-luxury-gold" />
            </label>
            <label class="flex items-center justify-between p-3 bg-gray-900 rounded-xl border border-gray-800">
              <span class="text-white font-bold">Visa / MasterCard Credit Card</span>
              <input type="checkbox" id="gw-creditCard" ${gateways.creditCard !== false ? 'checked' : ''} class="w-4 h-4 accent-luxury-gold" />
            </label>
            <label class="flex items-center justify-between p-3 bg-gray-900 rounded-xl border border-gray-800">
              <span class="text-white font-bold">Direct Bank Wire Transfer</span>
              <input type="checkbox" id="gw-bankWire" ${gateways.bankWire !== false ? 'checked' : ''} class="w-4 h-4 accent-luxury-gold" />
            </label>
          </div>

          <button type="submit" class="w-full py-3 bg-gray-200 text-black font-bold text-xs rounded-xl shadow">
            SAVE PAYMENT CONFIGURATIONS
          </button>
        </form>
      </div>
    `;
  }
};

window.AdminComponent = AdminComponent;
