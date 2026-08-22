/**
 * Store.js - Robust State Manager & Persistence Engine for UZair Bike Showroom
 */

const DEFAULT_DATA = {
  motorcycles: [
    {
      "id": "bike-1",
      "brand": "Ducati",
      "model": "Panigale V4 S",
      "year": 2026,
      "price": 32995,
      "discount": 0,
      "engine": "1103 cc Desmosedici Stradale V4",
      "power": "215.5 HP @ 13,000 RPM",
      "torque": "123.6 Nm @ 9,500 RPM",
      "topSpeed": "305 km/h",
      "transmission": "6-speed with Ducati Quick Shift (DQS) EVO 2",
      "fuelType": "Petrol",
      "mileage": "15.5 km/l",
      "category": "Super Bikes",
      "stock": 4,
      "reserved": 1,
      "sold": 7,
      "availability": "In Stock",
      "isNew": true,
      "isFeatured": true,
      "isPreOrder": false,
      "isVisible": true,
      "badges": ["Featured", "New Arrival"],
      "colors": [
        {"name": "Ducati Corse Red", "hex": "#d90429"},
        {"name": "Stealth Matte Black", "hex": "#111111"},
        {"name": "Titanium Carbon Grey", "hex": "#4a4e69"}
      ],
      "image": "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=1200&q=80",
      "warranty": "24 Months Unlimited Mileage",
      "dimensions": "Seat Height: 835 mm | Weight: 174 kg (Dry)",
      "description": "The peak of Ducati engineering. The Panigale V4 S brings MotoGP performance directly to the street with electronic Öhlins Smart EC 2.0 suspension, aluminum forged rims, and aerodynamic carbon winglets."
    },
    {
      "id": "bike-2",
      "brand": "BMW Motorrad",
      "model": "S1000RR M Package",
      "year": 2026,
      "price": 28500,
      "discount": 1000,
      "engine": "999 cc Inline-4 ShiftCam",
      "power": "210 HP @ 13,750 RPM",
      "torque": "113 Nm @ 11,000 RPM",
      "topSpeed": "303 km/h",
      "transmission": "6-speed Constant Mesh with Shift Assistant Pro",
      "fuelType": "Petrol",
      "mileage": "16.2 km/l",
      "category": "Super Bikes",
      "stock": 6,
      "reserved": 0,
      "sold": 12,
      "availability": "In Stock",
      "isNew": true,
      "isFeatured": true,
      "isPreOrder": false,
      "isVisible": true,
      "badges": ["Featured", "Best Seller"],
      "colors": [
        {"name": "Light White M Motorsport", "hex": "#e0e1dd"},
        {"name": "Blackstorm Metallic", "hex": "#1b263b"},
        {"name": "Racing Red", "hex": "#e63946"}
      ],
      "image": "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1200&q=80",
      "warranty": "3 Years BMW Factory Warranty",
      "dimensions": "Seat Height: 824 mm | Weight: 193.5 kg (M Package)",
      "description": "Uncompromising race track perfection. Equipped with M Carbon wheels, M lightweight battery, M chassis kit, and dynamic traction control with slide control sensor."
    },
    {
      "id": "bike-3",
      "brand": "Kawasaki",
      "model": "Ninja H2 Carbon",
      "year": 2026,
      "price": 36000,
      "discount": 0,
      "engine": "998 cc Supercharged Inline-4",
      "power": "228 HP @ 11,500 RPM",
      "torque": "141.7 Nm @ 11,000 RPM",
      "topSpeed": "337 km/h",
      "transmission": "6-speed Dog-ring",
      "fuelType": "Petrol",
      "mileage": "12.8 km/l",
      "category": "Super Bikes",
      "stock": 2,
      "reserved": 2,
      "sold": 3,
      "availability": "Limited Stock",
      "isNew": true,
      "isFeatured": true,
      "isPreOrder": false,
      "isVisible": true,
      "badges": ["Limited Edition", "Featured"],
      "colors": [
        {"name": "Mirror Coated Matte Spark Black", "hex": "#0d1b2a"},
        {"name": "Emerald Blazed Green", "hex": "#2a9d8f"}
      ],
      "image": "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1200&q=80",
      "warranty": "2 Years Factory Warranty",
      "dimensions": "Seat Height: 825 mm | Weight: 238 kg",
      "description": "The world's only supercharged production hypersport motorcycle. Features a carbon-fiber upper cowl, highly durable self-healing paint, Brembo Stylema calipers, and Öhlins TTX36 rear shock."
    },
    {
      "id": "bike-4",
      "brand": "Yamaha",
      "model": "YZF-R1M Carbon",
      "year": 2026,
      "price": 27399,
      "discount": 500,
      "engine": "998 cc Crossplane Inline-4 CP4",
      "power": "200 HP @ 13,500 RPM",
      "torque": "113.3 Nm @ 11,500 RPM",
      "topSpeed": "299 km/h",
      "transmission": "6-speed with Quick Shift System (QSS)",
      "fuelType": "Petrol",
      "mileage": "15.8 km/l",
      "category": "Sport Bikes",
      "stock": 5,
      "reserved": 1,
      "sold": 9,
      "availability": "In Stock",
      "isNew": false,
      "isFeatured": true,
      "isPreOrder": false,
      "isVisible": true,
      "badges": ["Featured", "Best Seller"],
      "colors": [
        {"name": "Icon Performance Carbon", "hex": "#2b2d42"},
        {"name": "Yamaha Racing Blue", "hex": "#0077b6"}
      ],
      "image": "https://images.unsplash.com/photo-1609630875171-b1321377ee65?auto=format&fit=crop&w=1200&q=80",
      "warranty": "2 Years Factory Warranty",
      "dimensions": "Seat Height: 860 mm | Weight: 202 kg",
      "description": "Inspired by MotoGP M1 machine. Full carbon fiber bodywork, Öhlins Electronic Racing Suspension (ERS), Communication Control Unit (CCU) for wireless data logging, and crossplane crankshaft engine."
    },
    {
      "id": "bike-5",
      "brand": "Harley-Davidson",
      "model": "CVO Street Glide",
      "year": 2026,
      "price": 44499,
      "discount": 0,
      "engine": "1977 cc Milwaukee-Eight VVT 121 V-Twin",
      "power": "115 HP @ 5,020 RPM",
      "torque": "189 Nm @ 3,500 RPM",
      "topSpeed": "210 km/h",
      "transmission": "6-speed Cruise Drive",
      "fuelType": "Petrol",
      "mileage": "17.2 km/l",
      "category": "Cruiser",
      "stock": 3,
      "reserved": 0,
      "sold": 4,
      "availability": "In Stock",
      "isNew": true,
      "isFeatured": false,
      "isPreOrder": false,
      "isVisible": true,
      "badges": ["Limited Edition"],
      "colors": [
        {"name": "Dark Platinum / Chrome", "hex": "#3d5a80"},
        {"name": "Legendary Orange", "hex": "#f77f00"}
      ],
      "image": "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1200&q=80",
      "warranty": "2 Years Unlimited Mileage Warranty",
      "dimensions": "Seat Height: 715 mm | Weight: 380 kg",
      "description": "The ultimate grand American touring machine. Featuring custom paint, Rockford Fosgate Stage II audio system, 12.3-inch TFT touchscreen, inverted front forks, and massive low-end torque."
    },
    {
      "id": "bike-6",
      "brand": "KTM",
      "model": "1290 Super Duke R EVO",
      "year": 2026,
      "price": 20999,
      "discount": 800,
      "engine": "1301 cc LC8 V-Twin 75°",
      "power": "180 HP @ 9,500 RPM",
      "torque": "140 Nm @ 8,000 RPM",
      "topSpeed": "290 km/h",
      "transmission": "6-speed PANKL with Quickshifter+",
      "fuelType": "Petrol",
      "mileage": "16.0 km/l",
      "category": "Naked Bikes",
      "stock": 7,
      "reserved": 1,
      "sold": 11,
      "availability": "In Stock",
      "isNew": true,
      "isFeatured": true,
      "isPreOrder": false,
      "isVisible": true,
      "badges": ["Featured"],
      "colors": [
        {"name": "KTM Electric Orange", "hex": "#f95738"},
        {"name": "Matte Stealth Grey", "hex": "#2b2d42"}
      ],
      "image": "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=1200&q=80",
      "warranty": "24 Months International Warranty",
      "dimensions": "Seat Height: 835 mm | Weight: 189 kg (Dry)",
      "description": "Nicknamed 'THE BEAST'. WP APEX Semi-Active Technology (SAT) suspension, ram-air intake, cornering ABS with Supermoto mode, and ultra-lightweight chromium-molybdenum trellis frame."
    },
    {
      "id": "bike-7",
      "brand": "Honda",
      "model": "CBR1000RR-R Fireblade SP",
      "year": 2026,
      "price": 28900,
      "discount": 0,
      "engine": "999 cc Inline-4 DOHC 16V",
      "power": "217 HP @ 14,500 RPM",
      "torque": "113 Nm @ 12,500 RPM",
      "topSpeed": "299 km/h",
      "transmission": "6-speed with Quickshifter",
      "fuelType": "Petrol",
      "mileage": "15.0 km/l",
      "category": "Super Bikes",
      "stock": 0,
      "reserved": 5,
      "sold": 8,
      "availability": "Pre-Order Only",
      "isNew": true,
      "isFeatured": true,
      "isPreOrder": true,
      "isVisible": true,
      "badges": ["Pre-Order", "New Arrival"],
      "colors": [
        {"name": "Grand Prix Red", "hex": "#e63946"},
        {"name": "Matte Pearl Morion Black", "hex": "#1d3557"}
      ],
      "image": "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1200&q=80",
      "warranty": "2 Years Honda Warranty",
      "dimensions": "Seat Height: 830 mm | Weight: 201 kg",
      "description": "Born on the track. Second-generation Öhlins Smart Electronic Control (S-EC) suspension, titanium connecting rods, forged aluminum pistons, and MotoGP-derived aerodynamic winglets."
    },
    {
      "id": "bike-8",
      "brand": "Triumph",
      "model": "Rocket 3 R Chrome Edition",
      "year": 2026,
      "price": 24795,
      "discount": 0,
      "engine": "2458 cc Inline-3 (World's Largest Engine)",
      "power": "165 HP @ 6,000 RPM",
      "torque": "221 Nm @ 4,000 RPM",
      "topSpeed": "235 km/h",
      "transmission": "6-speed helical gearbox",
      "fuelType": "Petrol",
      "mileage": "14.2 km/l",
      "category": "Cruiser",
      "stock": 3,
      "reserved": 1,
      "sold": 5,
      "availability": "In Stock",
      "isNew": false,
      "isFeatured": false,
      "isPreOrder": false,
      "isVisible": true,
      "badges": ["Limited Edition"],
      "colors": [
        {"name": "Chrome / Jet Black", "hex": "#8d99ae"},
        {"name": "Sapphire Black", "hex": "#111111"}
      ],
      "image": "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=1200&q=80",
      "warranty": "2 Years Unlimited Mileage Warranty",
      "dimensions": "Seat Height: 773 mm | Weight: 291 kg",
      "description": "The ultimate muscle roadster. Boasting the world's largest engine capacity on a production motorcycle, delivering unparalleled torque, single-sided swingarm, and SHOWA adjustable suspension."
    },
    {
      "id": "bike-9",
      "brand": "Aprilia",
      "model": "RSV4 Factory 1100 Ultra",
      "year": 2026,
      "price": 25999,
      "discount": 700,
      "engine": "1099 cc V4 65°",
      "power": "217 HP @ 13,000 RPM",
      "torque": "125 Nm @ 10,500 RPM",
      "topSpeed": "305 km/h",
      "transmission": "6-speed cassette type gearbox with Aprilia Quick Shift (AQS)",
      "fuelType": "Petrol",
      "mileage": "15.2 km/l",
      "category": "Super Bikes",
      "stock": 4,
      "reserved": 0,
      "sold": 6,
      "availability": "In Stock",
      "isNew": true,
      "isFeatured": true,
      "isPreOrder": false,
      "isVisible": true,
      "badges": ["Featured"],
      "colors": [
        {"name": "Ultra Dark Carbon", "hex": "#14213d"},
        {"name": "Lava Red", "hex": "#f72585"}
      ],
      "image": "https://images.unsplash.com/photo-1609630875171-b1321377ee65?auto=format&fit=crop&w=1200&q=80",
      "warranty": "2 Years Factory Warranty",
      "dimensions": "Seat Height: 845 mm | Weight: 202 kg",
      "description": "Directly derived from WorldSBK championship victories. Öhlins Smart EC 2.0 electronic suspension, forged aluminum wheels, integrated winglet fairing, and APRC electronic suite."
    },
    {
      "id": "bike-10",
      "brand": "Vespa",
      "model": "Elettrica RED Edition",
      "year": 2026,
      "price": 7999,
      "discount": 300,
      "engine": "4.2 kW Electric Motor (Brushless)",
      "power": "5.6 HP Peak",
      "torque": "200 Nm (at wheel)",
      "topSpeed": "70 km/h",
      "transmission": "Automatic Direct Drive",
      "fuelType": "Electric",
      "mileage": "100 km Range (ECO Mode)",
      "category": "Electric Bikes",
      "stock": 10,
      "reserved": 2,
      "sold": 15,
      "availability": "In Stock",
      "isNew": false,
      "isFeatured": false,
      "isPreOrder": false,
      "isVisible": true,
      "badges": ["Eco Friendly"],
      "colors": [
        {"name": "RED Passion", "hex": "#e63946"},
        {"name": "Futuristic Silver", "hex": "#c0c0c0"}
      ],
      "image": "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1200&q=80",
      "warranty": "3 Years Battery & Vehicle Warranty",
      "dimensions": "Seat Height: 790 mm | Weight: 130 kg",
      "description": "Silent, futuristic, zero-emissions icon. Features lithium-ion battery with Kinetic Energy Recovery System (KERS), 4.3-inch color TFT display, Bluetooth smartphone connectivity, and reverse gear."
    },
    {
      "id": "bike-11",
      "brand": "Royal Enfield",
      "model": "Continental GT 650 Apex",
      "year": 2026,
      "price": 7500,
      "discount": 0,
      "engine": "648 cc Parallel Twin SOHC",
      "power": "47 HP @ 7,150 RPM",
      "torque": "52 Nm @ 5,250 RPM",
      "topSpeed": "170 km/h",
      "transmission": "6-speed with Assist & Slipper Clutch",
      "fuelType": "Petrol",
      "mileage": "25.0 km/l",
      "category": "Cafe Racer",
      "stock": 8,
      "reserved": 0,
      "sold": 22,
      "availability": "In Stock",
      "isNew": false,
      "isFeatured": false,
      "isPreOrder": false,
      "isVisible": true,
      "badges": ["Best Seller"],
      "colors": [
        {"name": "Mr Clean Chrome", "hex": "#e0e1dd"},
        {"name": "Rocker Red", "hex": "#b7094c"}
      ],
      "image": "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=1200&q=80",
      "warranty": "3 Years Unlimited Km Warranty + RSA",
      "dimensions": "Seat Height: 804 mm | Weight: 211 kg",
      "description": "Authentic British café racer styling reimagined for the modern era. Clip-on handlebars, sculpted fuel tank, rear-set footrests, twin exhaust system, and responsive 270-degree firing order twin engine."
    },
    {
      "id": "bike-12",
      "brand": "Suzuki",
      "model": "Hayabusa GSX1300R Gen-3",
      "year": 2026,
      "price": 19500,
      "discount": 500,
      "engine": "1340 cc Inline-4 Liquid-Cooled",
      "power": "190 HP @ 9,700 RPM",
      "torque": "150 Nm @ 7,000 RPM",
      "topSpeed": "299 km/h (Electronically Limited)",
      "transmission": "6-speed Constant Mesh with Bi-Directional Quickshifter",
      "fuelType": "Petrol",
      "mileage": "14.8 km/l",
      "category": "Super Bikes",
      "stock": 4,
      "reserved": 1,
      "sold": 18,
      "availability": "In Stock",
      "isNew": true,
      "isFeatured": true,
      "isPreOrder": false,
      "isVisible": true,
      "badges": ["Featured", "Best Seller"],
      "colors": [
        {"name": "Glass Sparkle Black / Candy Burnt Gold", "hex": "#1d3557"},
        {"name": "Metallic Matte Sword Silver", "hex": "#6c757d"}
      ],
      "image": "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1200&q=80",
      "warranty": "2 Years Factory Warranty",
      "dimensions": "Seat Height: 800 mm | Weight: 264 kg",
      "description": "The ultimate aerodynamic legend. Suzuki Intelligent Ride System (S.I.R.S.) with motion track traction control, launch control, slope dependent control, hill hold control, and Brembo Stylema front brakes."
    }
  ],
  brands: [
    {"id": "b-1", "name": "Honda", "country": "Japan", "founded": 1948, "tagline": "The Power of Dreams", "icon": "🏍️", "accent": "#e63946"},
    {"id": "b-2", "name": "Yamaha", "country": "Japan", "founded": 1955, "tagline": "Revs Your Heart", "icon": "🏎️", "accent": "#0077b6"},
    {"id": "b-3", "name": "Suzuki", "country": "Japan", "founded": 1909, "tagline": "Way of Life!", "icon": "⚡", "accent": "#1d3557"},
    {"id": "b-4", "name": "Kawasaki", "country": "Japan", "founded": 1896, "tagline": "Let the Good Times Roll", "icon": "🟢", "accent": "#2a9d8f"},
    {"id": "b-5", "name": "BMW Motorrad", "country": "Germany", "founded": 1923, "tagline": "Make Life a Ride", "icon": "🔵", "accent": "#48cae4"},
    {"id": "b-6", "name": "Ducati", "country": "Italy", "founded": 1926, "tagline": "Style, Sophistication, Performance", "icon": "🔴", "accent": "#d90429"},
    {"id": "b-7", "name": "KTM", "country": "Austria", "founded": 1934, "tagline": "Ready to Race", "icon": "🟠", "accent": "#f95738"},
    {"id": "b-8", "name": "Harley-Davidson", "country": "USA", "founded": 1903, "tagline": "All for Freedom, Freedom for All", "icon": "🦅", "accent": "#f77f00"},
    {"id": "b-9", "name": "Royal Enfield", "country": "India / UK", "founded": 1901, "tagline": "Pure Motorcycling", "icon": "👑", "accent": "#d4a373"},
    {"id": "b-10", "name": "Triumph", "country": "UK", "founded": 1902, "tagline": "For the Ride", "icon": "🇬🇧", "accent": "#6c757d"},
    {"id": "b-11", "name": "Aprilia", "country": "Italy", "founded": 1945, "tagline": "Be a Racer", "icon": "🇮🇹", "accent": "#f72585"},
    {"id": "b-12", "name": "Benelli", "country": "Italy", "founded": 1911, "tagline": "Pure Italian Passion", "icon": "🦁", "accent": "#38b000"},
    {"id": "b-13", "name": "Vespa", "country": "Italy", "founded": 1946, "tagline": "Freedom & Elegance", "icon": "🛵", "accent": "#00b4d8"},
    {"id": "b-14", "name": "Piaggio", "country": "Italy", "founded": 1884, "tagline": "Moving People Since 1884", "icon": "🛡️", "accent": "#52b788"}
  ],
  categories: [
    {"id": "cat-1", "name": "Sport Bikes", "description": "Aerodynamic agility and explosive throttle response.", "count": 14},
    {"id": "cat-2", "name": "Super Bikes", "description": "Track-honed performance and hyper-car level power.", "count": 18},
    {"id": "cat-3", "name": "Naked Bikes", "description": "Raw street fighter muscularity without fairings.", "count": 12},
    {"id": "cat-4", "name": "Cruiser", "description": "Low seat height, relaxed riding posture, deep V-twin rumble.", "count": 10},
    {"id": "cat-5", "name": "Adventure", "description": "Long-travel suspension engineered for continent-crossing.", "count": 8},
    {"id": "cat-6", "name": "Touring", "description": "Luxury long-distance comfort with integrated panniers.", "count": 6},
    {"id": "cat-7", "name": "Cafe Racer", "description": "Classic 1960s British racer heritage with modern tech.", "count": 7},
    {"id": "cat-8", "name": "Electric Bikes", "description": "Zero emissions, instant torque, futuristic silent power.", "count": 5},
    {"id": "cat-9", "name": "Scooters", "description": "Urban mobility, maximum efficiency, premium elegance.", "count": 9},
    {"id": "cat-10", "name": "Off-Road", "description": "Lightweight dual-sport machines built to dominate dirt.", "count": 11}
  ],
  orders: [],
  preOrders: [],
  settings: {
    showroomName: "UZair Bike Showroom",
    slogan: "Experience the Future of Riding.",
    currency: "$",
    paymentGateways: { creditCard: true, crypto: true, bankWire: true, stripe: true }
  }
};

class Store {
  constructor() {
    this.motorcycles = DEFAULT_DATA.motorcycles;
    this.brands = DEFAULT_DATA.brands;
    this.categories = DEFAULT_DATA.categories;
    this.orders = DEFAULT_DATA.orders;
    this.preOrders = DEFAULT_DATA.preOrders;
    this.settings = DEFAULT_DATA.settings;
    this.cart = this.loadCartFromStorage();
    this.adminToken = localStorage.getItem('uzair_admin_authenticated') === 'true';
    this.listeners = [];
  }

  async init() {
    try {
      const response = await fetch('/api/data');
      if (response.ok) {
        const data = await response.json();
        if (data.motorcycles && data.motorcycles.length > 0) {
          this.motorcycles = data.motorcycles;
          this.brands = data.brands || DEFAULT_DATA.brands;
          this.categories = data.categories || DEFAULT_DATA.categories;
          this.orders = data.orders || [];
          this.preOrders = data.preOrders || [];
          this.settings = data.settings || DEFAULT_DATA.settings;
          this.saveLocalCache(data);
        } else {
          this.loadLocalCache();
        }
      } else {
        this.loadLocalCache();
      }
    } catch (err) {
      console.warn('REST API unavailable, falling back to cached/default data:', err);
      this.loadLocalCache();
    }
    this.notify();
  }

  saveLocalCache(data) {
    try {
      localStorage.setItem('uzair_db_cache', JSON.stringify(data));
    } catch (e) {}
  }

  loadLocalCache() {
    try {
      const cached = localStorage.getItem('uzair_db_cache');
      if (cached) {
        const data = JSON.parse(cached);
        if (data.motorcycles && data.motorcycles.length > 0) {
          this.motorcycles = data.motorcycles;
          this.brands = data.brands || DEFAULT_DATA.brands;
          this.categories = data.categories || DEFAULT_DATA.categories;
          this.orders = data.orders || [];
          this.preOrders = data.preOrders || [];
          this.settings = data.settings || DEFAULT_DATA.settings;
          return;
        }
      }
    } catch (e) {}
    
    // Default fallback
    this.motorcycles = DEFAULT_DATA.motorcycles;
    this.brands = DEFAULT_DATA.brands;
    this.categories = DEFAULT_DATA.categories;
  }

  loadCartFromStorage() {
    try {
      return JSON.parse(localStorage.getItem('uzair_cart') || '[]');
    } catch (e) {
      return [];
    }
  }

  saveCartToStorage() {
    try {
      localStorage.setItem('uzair_cart', JSON.stringify(this.cart));
    } catch (e) {}
    this.notify();
  }

  subscribe(listener) {
    this.listeners.push(listener);
  }

  notify() {
    this.listeners.forEach(cb => cb(this));
  }

  addToCart(bike, colorName) {
    const existing = this.cart.find(item => item.bike.id === bike.id && item.color === colorName);
    if (existing) {
      existing.quantity += 1;
    } else {
      this.cart.push({
        bike: bike,
        color: colorName || (bike.colors && bike.colors[0] ? bike.colors[0].name : 'Standard'),
        quantity: 1
      });
    }
    this.saveCartToStorage();
  }

  removeFromCart(index) {
    this.cart.splice(index, 1);
    this.saveCartToStorage();
  }

  updateCartQuantity(index, quantity) {
    if (quantity <= 0) {
      this.removeFromCart(index);
    } else {
      this.cart[index].quantity = quantity;
      this.saveCartToStorage();
    }
  }

  clearCart() {
    this.cart = [];
    this.saveCartToStorage();
  }

  getCartTotal() {
    return this.cart.reduce((sum, item) => sum + (item.bike.price * item.quantity), 0);
  }

  async addMotorcycle(bikeData) {
    try {
      const res = await fetch('/api/motorcycles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bikeData)
      });
      if (res.ok) {
        const result = await res.json();
        this.motorcycles.unshift(result.motorcycle);
        this.saveLocalCache({ motorcycles: this.motorcycles, brands: this.brands, categories: this.categories, orders: this.orders, preOrders: this.preOrders, settings: this.settings });
        this.notify();
        return result.motorcycle;
      }
    } catch (err) {}
    
    bikeData.id = 'bike-' + Date.now();
    this.motorcycles.unshift(bikeData);
    this.notify();
    return bikeData;
  }

  async updateMotorcycle(bikeId, bikeData) {
    try {
      const res = await fetch(`/api/motorcycles/${bikeId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bikeData)
      });
      if (res.ok) {
        const result = await res.json();
        const idx = this.motorcycles.findIndex(b => b.id === bikeId);
        if (idx !== -1) this.motorcycles[idx] = result.motorcycle;
        this.notify();
        return result.motorcycle;
      }
    } catch (err) {}

    const idx = this.motorcycles.findIndex(b => b.id === bikeId);
    if (idx !== -1) {
      this.motorcycles[idx] = { ...this.motorcycles[idx], ...bikeData };
      this.notify();
    }
  }

  async deleteMotorcycle(bikeId) {
    try {
      await fetch(`/api/motorcycles/${bikeId}`, { method: 'DELETE' });
    } catch (e) {}
    this.motorcycles = this.motorcycles.filter(b => b.id !== bikeId);
    this.notify();
  }

  async placeOrder(orderData) {
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });
      if (res.ok) {
        const result = await res.json();
        this.orders.unshift(result.order);
        this.clearCart();
        this.notify();
        return result.order;
      }
    } catch (err) {}

    orderData.id = 'ORD-' + Math.floor(1000 + Math.random() * 9000);
    orderData.date = new Date().toISOString();
    this.orders.unshift(orderData);
    this.clearCart();
    this.notify();
    return orderData;
  }

  async placePreOrder(preOrderData) {
    try {
      const res = await fetch('/api/preorders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(preOrderData)
      });
      if (res.ok) {
        const result = await res.json();
        this.preOrders.unshift(result.preOrder);
        this.notify();
        return result.preOrder;
      }
    } catch (err) {}

    preOrderData.id = 'PRE-' + Math.floor(100 + Math.random() * 900);
    preOrderData.date = new Date().toISOString();
    this.preOrders.unshift(preOrderData);
    this.notify();
    return preOrderData;
  }

  async updateOrderStatus(orderId, statusData) {
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(statusData)
      });
      if (res.ok) {
        const result = await res.json();
        const idx = this.orders.findIndex(o => o.id === orderId);
        if (idx !== -1) this.orders[idx] = result.order;
        this.notify();
      }
    } catch (err) {}
  }

  async updateSettings(newSettings) {
    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSettings)
      });
      if (res.ok) {
        const result = await res.json();
        this.settings = result.settings;
        this.notify();
      }
    } catch (err) {}
  }
}

window.store = new Store();
