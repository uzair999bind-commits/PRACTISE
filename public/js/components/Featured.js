/**
 * Featured Component - Cinematic Showcase of Premium Machines
 */

const FeaturedComponent = {
  render(bikes) {
    const container = document.getElementById('featured-grid');
    if (!container) return;

    const featuredBikes = bikes.filter(b => b.isFeatured || (b.badges && b.badges.includes('Featured'))).slice(0, 3);
    const displayList = featuredBikes.length > 0 ? featuredBikes : bikes.slice(0, 3);

    container.innerHTML = displayList.map(bike => {
      const finalPrice = bike.price - (bike.discount || 0);

      return `
        <div class="group relative bg-gradient-to-b from-gray-900/90 via-gray-900/60 to-gray-950/90 backdrop-blur border border-cyan-500/30 hover:border-cyan-400 rounded-3xl p-6 overflow-hidden transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:shadow-cyan-500/20 flex flex-col justify-between">
          
          <!-- Glowing Background Accent -->
          <div class="absolute -top-24 -right-24 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl group-hover:bg-cyan-500/20 transition-all duration-500 pointer-events-none"></div>

          <div>
            <!-- Badge & Brand -->
            <div class="flex items-center justify-between mb-4">
              <span class="px-3 py-1 bg-red-950/80 border border-red-500/50 text-red-400 text-[10px] font-orbitron font-bold rounded-lg uppercase tracking-wider">
                FEATURED MACHINE
              </span>
              <span class="text-xs font-orbitron text-cyan-400 font-semibold">${bike.brand}</span>
            </div>

            <!-- Image Visual -->
            <div class="relative h-48 overflow-hidden rounded-2xl bg-gray-950/80 p-2 flex items-center justify-center my-4 border border-gray-800">
              <img src="${bike.image}" alt="${bike.model}" class="max-h-full object-contain filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.9)] group-hover:scale-110 transition-transform duration-500" />
            </div>

            <!-- Title & Specs -->
            <h3 class="font-orbitron font-black text-white text-2xl group-hover:text-cyan-300 transition">${bike.model}</h3>
            <p class="text-xs text-gray-400 line-clamp-2 mt-2 font-light">${bike.description}</p>

            <div class="grid grid-cols-3 gap-2 mt-4 text-[11px] font-orbitron text-center py-2 bg-gray-950/60 rounded-xl border border-gray-800">
              <div>
                <div class="text-gray-500 text-[9px]">POWER</div>
                <div class="text-cyan-400 font-bold">${bike.power.split(' ')[0]} HP</div>
              </div>
              <div>
                <div class="text-gray-500 text-[9px]">SPEED</div>
                <div class="text-red-400 font-bold">${bike.topSpeed}</div>
              </div>
              <div>
                <div class="text-gray-500 text-[9px]">ENGINE</div>
                <div class="text-white font-bold">${bike.engine.split(' ')[0]} cc</div>
              </div>
            </div>
          </div>

          <!-- Bottom Actions -->
          <div class="pt-6 flex items-center justify-between border-t border-gray-800/80 mt-6">
            <div>
              <div class="text-[9px] font-orbitron text-gray-500 uppercase">OFFERING PRICE</div>
              <div class="font-orbitron font-extrabold text-xl text-white">$${finalPrice.toLocaleString()}</div>
            </div>

            <button onclick="app.openDetailsModal('${bike.id}')" class="px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-orbitron font-bold text-xs rounded-xl shadow-lg transition flex items-center gap-1.5">
              <span>EXPLORE MACHINE</span>
              <i data-lucide="arrow-right" class="w-4 h-4"></i>
            </button>
          </div>

        </div>
      `;
    }).join('');

    if (window.lucide) lucide.createIcons();
  }
};

window.FeaturedComponent = FeaturedComponent;
