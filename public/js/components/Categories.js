/**
 * Categories Component - 10 Motorcycle Segments in 3D Cards
 */

const CategoriesComponent = {
  render(categories) {
    const container = document.getElementById('categories-grid');
    if (!container) return;

    const icons = {
      'Sport Bikes': '🏎️',
      'Super Bikes': '⚡',
      'Naked Bikes': '🔥',
      'Cruiser': '🦅',
      'Adventure': '🌍',
      'Touring': '🏔️',
      'Cafe Racer': '🇬🇧',
      'Electric Bikes': '🔋',
      'Scooters': '🛵',
      'Off-Road': '🏜️'
    };

    container.innerHTML = categories.map(cat => `
      <div onclick="app.filterByCategoryName('${cat.name}')"
           class="group bg-gray-900/60 backdrop-blur border border-gray-800 hover:border-cyan-500/50 p-5 rounded-2xl cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-cyan-500/10 flex flex-col justify-between min-h-[160px]">
        
        <div class="flex items-center justify-between">
          <div class="text-3xl group-hover:scale-125 transition transform">
            ${icons[cat.name] || '🏍️'}
          </div>
          <span class="text-[10px] font-orbitron font-bold text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-500/30">
            ${cat.count || 12} MODELS
          </span>
        </div>

        <div>
          <h4 class="font-orbitron font-bold text-white text-sm group-hover:text-cyan-300 transition">${cat.name}</h4>
          <p class="text-[11px] text-gray-400 mt-1 line-clamp-2">${cat.description}</p>
        </div>

        <div class="text-[10px] font-orbitron font-semibold text-cyan-400 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity pt-2">
          <span>VIEW CATEGORY</span> &rarr;
        </div>

      </div>
    `).join('');
  }
};

window.CategoriesComponent = CategoriesComponent;
