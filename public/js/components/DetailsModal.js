/**
 * DetailsModal Component - Photorealistic 360° Interactive Bike Inspector Modal
 */

const DetailsModalComponent = {
  render(bike) {
    const container = document.getElementById('details-modal-content');
    if (!container) return;

    const finalPrice = bike.price - (bike.discount || 0);

    container.innerHTML = `
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        <!-- Left Column: Photorealistic 360° Interactive Studio Inspector -->
        <div class="lg:col-span-7 space-y-4">
          
          <!-- 360° Photorealistic Studio Viewport Box -->
          <div class="relative bg-gradient-to-b from-gray-950 via-gray-900 to-black rounded-3xl overflow-hidden border border-cyan-500/50 p-2 shadow-2xl shadow-cyan-500/20 group">
            
            <div id="modal-3d-canvas-container" 
                 onmousedown="app.start3DDrag(event)" 
                 onmousemove="app.on3DDrag(event)" 
                 onmouseup="app.stop3DDrag()" 
                 onmouseleave="app.stop3DDrag()"
                 ontouchstart="app.start3DDrag(event)"
                 ontouchmove="app.on3DDrag(event)"
                 ontouchend="app.stop3DDrag()"
                 class="w-full h-80 sm:h-96 rounded-2xl relative cursor-grab active:cursor-grabbing flex items-center justify-center overflow-hidden bg-black select-none">
              
              <!-- Dynamic WebGL 3D Background Lighting Canvas -->
              <canvas id="modal-bg-canvas" class="absolute inset-0 w-full h-full pointer-events-none z-0"></canvas>
              
              <!-- Photorealistic 360° Real Bike Display -->
              <img id="real-3d-bike-img" 
                   src="${bike.image}" 
                   alt="${bike.brand} ${bike.model}" 
                   onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=1200&q=80';"
                   class="relative z-10 max-h-full object-contain filter drop-shadow-[0_25px_40px_rgba(0,0,0,0.95)] transition-transform duration-300 pointer-events-none" />

              <!-- Holographic HUD Telemetry Overlay -->
              <div class="absolute top-4 left-4 z-20 pointer-events-none font-orbitron space-y-1">
                <div class="px-3 py-1 bg-black/80 backdrop-blur border border-cyan-500/50 text-cyan-400 font-bold text-xs rounded-xl flex items-center gap-1.5 shadow">
                  <i data-lucide="shield-check" class="w-4 h-4"></i> REAL ${bike.brand.toUpperCase()} 3D STUDIO
                </div>
                <div class="text-[10px] text-gray-400 pl-1">${bike.model} Hyper-Spec</div>
              </div>

              <!-- Top Controls -->
              <div class="absolute top-4 right-4 z-20 flex items-center gap-2">
                <button onclick="app.toggle3DPolarSpin()" id="btn-3d-spin" class="px-3 py-1.5 bg-gray-900/90 hover:bg-gray-800 backdrop-blur border border-cyan-500/40 text-cyan-400 text-xs font-orbitron rounded-xl flex items-center gap-1.5 shadow">
                  <i data-lucide="rotate-cw" class="w-3.5 h-3.5"></i> AUTO 360° SPIN
                </button>
              </div>

              <!-- Bottom Interactive Hint -->
              <div class="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between text-[11px] font-orbitron bg-black/80 backdrop-blur px-4 py-2 rounded-xl border border-gray-800 text-gray-300 pointer-events-none">
                <span class="text-cyan-400 font-bold flex items-center gap-1">
                  <i data-lucide="hand" class="w-3.5 h-3.5"></i> DRAG MOUSE LEFT / RIGHT TO ROTATE 360°
                </span>
                <span class="text-gray-400">100% REAL MODEL</span>
              </div>

            </div>

          </div>

          <!-- Real Color Variant Swatches -->
          <div class="bg-gray-900/70 backdrop-blur border border-gray-800 p-4 rounded-2xl space-y-3">
            <div class="text-xs font-orbitron font-bold text-white flex items-center justify-between">
              <span>REAL FACTORY COLOR PAINT VARIANTS</span>
              <span id="selected-color-name" class="text-cyan-400 font-normal">${bike.colors && bike.colors[0] ? bike.colors[0].name : 'Standard'}</span>
            </div>
            
            <div class="flex items-center gap-3 flex-wrap">
              ${(bike.colors || [
                {name: 'Factory Red', hex: '#d90429'},
                {name: 'Stealth Black', hex: '#111111'},
                {name: 'Racing Blue', hex: '#0077b6'},
                {name: 'Emerald Green', hex: '#2a9d8f'},
                {name: 'Chrome Silver', hex: '#e0e1dd'}
              ]).map((col, idx) => `
                <button onclick="app.changeRealBikeColor('${col.hex}', '${col.name}')" 
                        class="w-9 h-9 rounded-full border-2 border-gray-700 hover:border-cyan-400 hover:scale-110 transition shadow-lg flex items-center justify-center focus:border-cyan-400 cursor-pointer"
                        style="background-color: ${col.hex}" title="${col.name}">
                </button>
              `).join('')}
            </div>
          </div>

          <!-- Monthly EMI Calculator -->
          <div class="bg-gray-900/70 backdrop-blur border border-gray-800 p-4 rounded-2xl space-y-3 text-xs font-orbitron">
            <div class="flex items-center justify-between text-white font-bold border-b border-gray-800 pb-2">
              <span class="flex items-center gap-1.5">
                <i data-lucide="calculator" class="w-4 h-4 text-cyan-400"></i> MONTHLY FINANCING ESTIMATOR
              </span>
              <span class="text-cyan-400 text-sm font-black">$${Math.round(finalPrice * 0.024)}/mo</span>
            </div>
            <div class="grid grid-cols-2 gap-4 pt-1">
              <div>
                <label class="text-[10px] text-gray-400">DOWN PAYMENT (20%)</label>
                <div class="font-bold text-white text-sm">$${Math.round(finalPrice * 0.2).toLocaleString()}</div>
              </div>
              <div>
                <label class="text-[10px] text-gray-400">TENURE & INTEREST</label>
                <div class="font-bold text-white text-sm">36 Months @ 4.9% APR</div>
              </div>
            </div>
          </div>

        </div>

        <!-- Right Column: Specs & Purchase Actions -->
        <div class="lg:col-span-5 space-y-6">
          
          <div>
            <div class="text-xs font-orbitron text-cyan-400 font-bold uppercase tracking-widest">${bike.brand} &bull; ${bike.year}</div>
            <h2 class="text-2xl sm:text-3xl font-orbitron font-black text-white mt-1">${bike.model}</h2>
            <div class="flex items-center gap-3 mt-2">
              <div class="font-orbitron font-extrabold text-3xl text-cyan-400">$${finalPrice.toLocaleString()}</div>
              ${bike.discount ? `<div class="text-xs text-gray-400 line-through">$${bike.price.toLocaleString()}</div>` : ''}
            </div>
          </div>

          <!-- Description -->
          <p class="text-gray-300 text-xs sm:text-sm leading-relaxed">${bike.description}</p>

          <!-- Complete Technical Specs Table -->
          <div class="bg-gray-900/70 backdrop-blur border border-gray-800 rounded-2xl p-4 space-y-2 text-xs">
            <div class="font-orbitron font-bold text-white pb-2 border-b border-gray-800 text-xs uppercase tracking-wider">REAL FACTORY SPECIFICATIONS</div>
            
            <div class="grid grid-cols-2 gap-y-2 text-gray-300 py-1 border-b border-gray-800/60">
              <span class="text-gray-400">Engine Displacement</span>
              <span class="font-semibold text-right">${bike.engine}</span>
            </div>
            <div class="grid grid-cols-2 gap-y-2 text-gray-300 py-1 border-b border-gray-800/60">
              <span class="text-gray-400">Peak Horsepower</span>
              <span class="font-semibold text-right text-cyan-400">${bike.power}</span>
            </div>
            <div class="grid grid-cols-2 gap-y-2 text-gray-300 py-1 border-b border-gray-800/60">
              <span class="text-gray-400">Max Torque Output</span>
              <span class="font-semibold text-right">${bike.torque}</span>
            </div>
            <div class="grid grid-cols-2 gap-y-2 text-gray-300 py-1 border-b border-gray-800/60">
              <span class="text-gray-400">Max Top Speed</span>
              <span class="font-semibold text-right text-red-400">${bike.topSpeed}</span>
            </div>
            <div class="grid grid-cols-2 gap-y-2 text-gray-300 py-1 border-b border-gray-800/60">
              <span class="text-gray-400">Transmission</span>
              <span class="font-semibold text-right">${bike.transmission}</span>
            </div>
            <div class="grid grid-cols-2 gap-y-2 text-gray-300 py-1 border-b border-gray-800/60">
              <span class="text-gray-400">Fuel Efficiency</span>
              <span class="font-semibold text-right">${bike.mileage}</span>
            </div>
            <div class="grid grid-cols-2 gap-y-2 text-gray-300 py-1 border-b border-gray-800/60">
              <span class="text-gray-400">Factory Warranty</span>
              <span class="font-semibold text-right text-emerald-400">${bike.warranty}</span>
            </div>
            <div class="grid grid-cols-2 gap-y-2 text-gray-300 py-1">
              <span class="text-gray-400">Dimensions</span>
              <span class="font-semibold text-right text-[10px]">${bike.dimensions}</span>
            </div>
          </div>

          <!-- CTAs -->
          <div class="space-y-3 pt-2">
            ${bike.availability === 'Pre-Order Only' || bike.isPreOrder ? `
              <button onclick="app.openPreOrderModal('${bike.id}'); app.closeDetailsModal()" class="w-full py-4 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-black font-orbitron font-bold text-sm tracking-wider rounded-xl shadow-lg transition">
                RESERVE & PRE-ORDER NOW
              </button>
            ` : `
              <button onclick="app.addToCartDirect('${bike.id}'); app.closeDetailsModal()" class="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-orbitron font-bold text-sm tracking-wider rounded-xl shadow-lg shadow-cyan-500/20 transition flex items-center justify-center gap-2">
                <i data-lucide="shopping-bag" class="w-5 h-5"></i>
                BUY NOW / ADD TO CART
              </button>
            `}

            <button onclick="app.contactShowroomForBike('${bike.model}')" class="w-full py-3 bg-gray-900 border border-gray-800 hover:border-cyan-400 text-gray-200 text-xs font-orbitron rounded-xl transition flex items-center justify-center gap-2">
              <i data-lucide="message-square" class="w-4 h-4 text-cyan-400"></i>
              CONTACT SHOWROOM CONCIERGE
            </button>
          </div>

        </div>

      </div>
    `;

    if (window.lucide) lucide.createIcons();

    // Initialize WebGL Studio Background canvas
    setTimeout(() => {
      if (window.engine3D) {
        engine3D.initModalBGCanvas('modal-bg-canvas');
      }
    }, 100);
  }
};

window.DetailsModalComponent = DetailsModalComponent;
