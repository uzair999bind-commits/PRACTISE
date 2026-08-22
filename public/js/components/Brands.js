/**
 * Brands Component - 10 Major Motorcycle Brands with Official Vector Logos & 3D Glass Surfaces
 */

const BrandLogosSVG = {
  'Honda': `
    <svg class="w-10 h-10" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 30 C 40 20, 70 15, 90 20 C 70 30, 40 40, 20 42 C 50 38, 75 42, 85 50 C 60 55, 35 60, 25 65 C 55 62, 70 70, 78 80 L 15 80 Z" fill="#e63946"/>
    </svg>
  `,
  'Yamaha': `
    <svg class="w-10 h-10" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="42" stroke="#0077b6" stroke-width="4" fill="rgba(0,119,182,0.1)"/>
      <path d="M50 15 L50 85 M50 50 L20 32.5 M50 50 L80 32.5 M50 50 L20 67.5 M50 50 L80 67.5" stroke="#0077b6" stroke-width="6" stroke-linecap="round"/>
    </svg>
  `,
  'Suzuki': `
    <svg class="w-10 h-10" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M80 20 L25 45 L75 55 L20 80" stroke="#f1a208" stroke-width="12" stroke-linejoin="miter" stroke-linecap="square"/>
    </svg>
  `,
  'Kawasaki': `
    <svg class="w-10 h-10" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="15" y="15" width="70" height="70" rx="16" fill="rgba(42,157,143,0.15)" stroke="#2a9d8f" stroke-width="3"/>
      <path d="M30 25 L30 75 M30 50 L70 25 M35 45 L70 75" stroke="#2a9d8f" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `,
  'BMW Motorrad': `
    <svg class="w-10 h-10" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="42" stroke="#ffffff" stroke-width="4" fill="#000000"/>
      <path d="M50 8 A 42 42 0 0 1 92 50 L 50 50 Z" fill="#0077b6"/>
      <path d="M8 50 A 42 42 0 0 1 50 92 L 50 50 Z" fill="#0077b6"/>
      <path d="M50 8 A 42 42 0 0 0 8 50 L 50 50 Z" fill="#ffffff"/>
      <path d="M92 50 A 42 42 0 0 1 50 92 L 50 50 Z" fill="#ffffff"/>
      <circle cx="50" cy="50" r="42" stroke="#48cae4" stroke-width="3" fill="none"/>
    </svg>
  `,
  'Ducati': `
    <svg class="w-10 h-10" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M50 10 L88 28 L75 85 L50 95 L25 85 L12 28 Z" fill="#d90429" stroke="#ffffff" stroke-width="2"/>
      <path d="M30 35 L70 35 L50 78 Z" fill="#ffffff"/>
      <path d="M40 42 L60 42 L50 65 Z" fill="#d90429"/>
    </svg>
  `,
  'KTM': `
    <svg class="w-10 h-10" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="25" width="80" height="50" rx="8" fill="#f95738"/>
      <text x="50" y="60" font-family="Orbitron, sans-serif" font-weight="900" font-size="28" fill="#000000" text-anchor="middle">KTM</text>
    </svg>
  `,
  'Harley-Davidson': `
    <svg class="w-10 h-10" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M50 10 L88 25 L88 55 L50 90 L12 55 L12 25 Z" fill="#111111" stroke="#f77f00" stroke-width="4"/>
      <rect x="15" y="40" width="70" height="20" fill="#f77f00"/>
      <text x="50" y="55" font-family="Inter, sans-serif" font-weight="900" font-size="12" fill="#ffffff" text-anchor="middle">HARLEY</text>
    </svg>
  `,
  'Triumph': `
    <svg class="w-10 h-10" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M50 10 L90 30 L80 85 L50 95 L20 85 L10 30 Z" fill="#181b22" stroke="#c5a059" stroke-width="3"/>
      <path d="M25 40 Q 50 20 75 40 M 25 50 Q 50 30 75 50 M 50 30 L 50 80" stroke="#c5a059" stroke-width="4" fill="none"/>
    </svg>
  `,
  'Royal Enfield': `
    <svg class="w-10 h-10" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 35 L35 15 L50 25 L65 15 L80 35 L50 45 Z" fill="#c5a059"/>
      <circle cx="50" cy="65" r="22" fill="#181b22" stroke="#c5a059" stroke-width="3"/>
      <text x="50" y="70" font-family="Cinzel, serif" font-weight="900" font-size="16" fill="#c5a059" text-anchor="middle">RE</text>
    </svg>
  `
};

const BrandsComponent = {
  render(brands) {
    const container = document.getElementById('brands-grid');
    if (!container) return;

    const targetBrands = ['Honda', 'Yamaha', 'Suzuki', 'Kawasaki', 'BMW Motorrad', 'Ducati', 'KTM', 'Harley-Davidson', 'Triumph', 'Royal Enfield'];
    const displayBrands = brands.filter(b => targetBrands.includes(b.name));
    const renderList = displayBrands.length > 0 ? displayBrands : brands.slice(0, 10);

    container.innerHTML = renderList.map(brand => {
      const svgLogo = BrandLogosSVG[brand.name] || `<span class="text-3xl">${brand.icon || '🏍️'}</span>`;

      return `
        <div onclick="app.filterByBrandName('${brand.name}')" 
             class="group relative bg-gradient-to-b from-gray-900/90 via-gray-950/80 to-black backdrop-blur border border-gray-800/90 hover:border-luxury-gold/80 p-6 rounded-3xl cursor-pointer transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:shadow-luxury-gold/10 flex flex-col items-center justify-between text-center min-h-[170px] shadow-xl">
          
          <!-- 3D Pedestal Background Highlight -->
          <div class="absolute inset-x-4 bottom-2 h-8 bg-luxury-gold/5 rounded-full blur-md group-hover:bg-luxury-gold/20 transition duration-500 pointer-events-none"></div>

          <!-- Official Vector Brand Emblem -->
          <div class="mb-3 group-hover:scale-110 transition-transform duration-500 drop-shadow-[0_8px_16px_rgba(0,0,0,0.8)]">
            ${svgLogo}
          </div>

          <!-- Title & Tagline -->
          <div class="relative z-10">
            <h4 class="font-cinzel font-bold text-white text-base group-hover:text-luxury-gold transition tracking-wide">${brand.name}</h4>
            <p class="text-[10px] text-gray-400 font-medium pt-1 uppercase tracking-wider">${brand.country || 'Global'} &bull; ${brand.tagline ? brand.tagline.slice(0, 16) + '...' : 'Pure Performance'}</p>
          </div>

          <!-- Action CTA Hint -->
          <div class="relative z-10 mt-3 text-[10px] font-cinzel font-bold tracking-[0.2em] text-luxury-gold opacity-0 group-hover:opacity-100 transition-opacity">
            EXPLORE BRAND &rarr;
          </div>

        </div>
      `;
    }).join('');
  }
};

window.BrandsComponent = BrandsComponent;
