/**
 * Gallery Component - High-End Product Cards with 3D Hover Tilt & Fallback Renders
 */

const GalleryComponent = {
  render(bikes) {
    const container = document.getElementById('gallery-grid');
    const countElement = document.getElementById('gallery-count');
    
    if (countElement) {
      countElement.textContent = `Showing ${bikes.length} Motorcycles`;
    }

    if (!container) return;

    if (bikes.length === 0) {
      container.innerHTML = `
        <div class="col-span-full py-16 text-center bg-gray-900/40 rounded-3xl border border-gray-800 space-y-4">
          <div class="w-16 h-16 rounded-full bg-gray-800 text-cyan-400 mx-auto flex items-center justify-center">
            <i data-lucide="bike" class="w-8 h-8"></i>
          </div>
          <h3 class="font-orbitron font-bold text-white text-lg">No Motorcycles Found</h3>
          <p class="text-xs text-gray-400 max-w-sm mx-auto">Try resetting filters or expanding your price criteria.</p>
          <button onclick="app.resetFilters()" class="px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-black text-xs font-orbitron font-bold rounded-xl shadow">
            RESET ALL FILTERS ($100,000)
          </button>
        </div>
      `;
      if (window.lucide) lucide.createIcons();
      return;
    }

    container.innerHTML = bikes.map(bike => {
      const finalPrice = bike.price - (bike.discount || 0);
      const isPreOrderOnly = bike.availability === 'Pre-Order Only' || bike.isPreOrder;

      return `
        <div class="group relative bg-gradient-to-b from-gray-900/90 via-gray-900/60 to-gray-950/90 backdrop-blur border border-gray-800/90 hover:border-cyan-400/80 rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:shadow-cyan-500/20 flex flex-col justify-between transform-gpu">
          
          <!-- Top Badges -->
          <div class="absolute top-4 left-4 right-4 z-10 flex items-center justify-between pointer-events-none">
            <div class="flex flex-wrap gap-1">
              ${(bike.badges || []).map(badge => `
                <span class="px-2.5 py-1 bg-black/80 backdrop-blur border border-cyan-500/40 text-cyan-400 text-[10px] font-orbitron font-bold rounded-lg uppercase shadow">
                  ${badge}
                </span>
              `).join('')}
            </div>
            
            <span class="px-2.5 py-1 ${isPreOrderOnly ? 'bg-amber-950/80 border-amber-500/50 text-amber-400' : 'bg-emerald-950/80 border-emerald-500/50 text-emerald-400'} border text-[10px] font-orbitron font-bold rounded-lg uppercase backdrop-blur">
              ${bike.availability || 'In Stock'}
            </span>
          </div>

          <!-- Motorcycle Visual Container with 3D Pedestal Floor -->
          <div class="relative h-60 overflow-hidden bg-gradient-to-b from-gray-950 via-gray-900 to-black p-4 flex items-center justify-center">
            
            <!-- Neon Floor Pedestal -->
            <div class="absolute bottom-4 w-3/4 h-6 rounded-full bg-cyan-500/10 blur-md group-hover:bg-cyan-400/30 transition duration-500"></div>

            <img src="${bike.image}" 
                 alt="${bike.brand} ${bike.model}" 
                 onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80';"
                 class="max-h-full object-contain filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.95)] group-hover:scale-110 group-hover:-rotate-2 transition-all duration-500" />
            
            <div class="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent pointer-events-none"></div>
          </div>

          <!-- Motorcycle Spec Details -->
          <div class="p-6 space-y-4 flex-1 flex flex-col justify-between">
            
            <div>
              <div class="text-xs font-orbitron text-cyan-400 font-bold uppercase tracking-wider">${bike.brand} &bull; ${bike.year}</div>
              <h3 class="font-orbitron font-black text-white text-xl group-hover:text-cyan-300 transition mt-1">${bike.model}</h3>
              <p class="text-xs text-gray-400 line-clamp-2 mt-2 font-light">${bike.description}</p>
            </div>

            <!-- Specs Grid -->
            <div class="grid grid-cols-2 gap-2 text-[11px] py-3 border-y border-gray-800/80 font-mono text-gray-300">
              <div class="flex items-center gap-1.5">
                <i data-lucide="gauge" class="w-3.5 h-3.5 text-cyan-400"></i>
                <span class="truncate">${bike.engine}</span>
              </div>
              <div class="flex items-center gap-1.5">
                <i data-lucide="zap" class="w-3.5 h-3.5 text-red-400"></i>
                <span class="truncate">${bike.power}</span>
              </div>
              <div class="flex items-center gap-1.5">
                <i data-lucide="settings" class="w-3.5 h-3.5 text-amber-400"></i>
                <span class="truncate">${bike.transmission}</span>
              </div>
              <div class="flex items-center gap-1.5">
                <i data-lucide="droplet" class="w-3.5 h-3.5 text-blue-400"></i>
                <span class="truncate">${bike.fuelType}</span>
              </div>
            </div>

            <!-- Price & Action Buttons -->
            <div class="pt-2 flex items-center justify-between gap-4">
              <div>
                <div class="text-[9px] text-gray-500 font-orbitron uppercase">SHOWROOM PRICE</div>
                <div class="font-orbitron font-extrabold text-xl text-white">
                  $${finalPrice.toLocaleString()}
                  ${bike.discount ? `<span class="text-xs text-gray-500 line-through ml-1">$${bike.price.toLocaleString()}</span>` : ''}
                </div>
              </div>

              <div class="flex items-center gap-2">
                <button onclick="app.openDetailsModal('${bike.id}')" class="px-3 py-2.5 bg-gray-900 hover:bg-gray-800 text-white rounded-xl border border-gray-800 hover:border-cyan-400 text-xs font-orbitron transition flex items-center gap-1">
                  <i data-lucide="rotate-3d" class="w-4 h-4 text-cyan-400"></i>
                  <span>3D VIEW</span>
                </button>

                ${isPreOrderOnly ? `
                  <button onclick="app.openPreOrderModal('${bike.id}')" class="px-3.5 py-2.5 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-black font-orbitron font-bold text-xs rounded-xl shadow transition">
                    PRE-ORDER
                  </button>
                ` : `
                  <button onclick="app.addToCartDirect('${bike.id}')" class="px-3.5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-orbitron font-bold text-xs rounded-xl shadow transition flex items-center gap-1">
                    <i data-lucide="shopping-cart" class="w-4 h-4"></i>
                    <span>BUY</span>
                  </button>
                `}
              </div>
            </div>

          </div>

        </div>
      `;
    }).join('');

    if (window.lucide) lucide.createIcons();
  }
};

window.GalleryComponent = GalleryComponent;
