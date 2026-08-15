/**
 * SPIDER — BRAND & ASSET CONFIGURATION
 * 
 * Central asset catalog, menu database, and API hook points.
 * Easily replace image paths, pricing, and API endpoints below.
 */

export const ASSETS = {
  // ==========================================
  // REPLACEABLE ASSET PLACEHOLDERS
  // ==========================================
  // [HERO_SPIDER_IMAGE] — 3D metallic spider emblem & web reveal
  HERO_SPIDER_IMAGE: 'assets/images/spider_hero_emblem.jpg',

  // [HERO_IMAGE] — Main cinematic hero dish photography
  HERO_IMAGE: 'assets/images/hero_food.jpg',

  // [CHICKEN_IMAGE] — Signature crispy fried chicken
  CHICKEN_IMAGE: 'assets/images/signature_chicken.jpg',

  // [BURGER_IMAGE] — Asymmetrical editorial burger
  BURGER_IMAGE: 'assets/images/editorial_burger.jpg',

  // [SHAKE_IMAGE] — Luxury dark chocolate / brownie shakes
  SHAKE_IMAGE: 'assets/images/shakes_luxury.jpg',

  // [MOJITO_IMAGE] — Sparkling electric berry mojito
  MOJITO_IMAGE: 'assets/images/mojito_cocktail.jpg',

  // [COLD_COFFEE_IMAGE] — Nitro dark velvet cold brew
  COLD_COFFEE_IMAGE: 'assets/images/cold_coffee.jpg',

  // [VEG_IMAGE] — Plant-powered loaded gourmet veg burger
  VEG_IMAGE: 'assets/images/veg_special.jpg',

  // [FINAL_IMAGE] — Midnight cafe table feast & neon ambiance
  FINAL_IMAGE: 'assets/images/final_feast.jpg'
};

// ==========================================
// BRAND MENU DATASET (PRICES IN INR ₹)
// ==========================================
export const MENU_DATA = {
  chicken: [
    {
      id: 'chk-01',
      name: 'Venom Crimson Drumsticks',
      category: 'chicken',
      tagline: 'Triple-dipped spicy crunch with smoky chili paprika dust',
      badge: 'SIGNATURE',
      flavor: 'CRISPY',
      price: 399,
      calories: '740 kcal',
      image: ASSETS.CHICKEN_IMAGE,
      description: 'Hand-battered bone-in chicken marinated for 24 hours in black garlic buttermilk, fried to razor-sharp crunch and finished with SPIDER red spice glaze.',
      options: {
        spiceLevel: ['Classic Dark', 'Venom Hot', 'Inferno Black'],
        dips: ['Spider Garlic Aioli', 'Chipotle Crimson Mayo', 'Ghost Pepper Ranch']
      }
    },
    {
      id: 'chk-02',
      name: 'Black Widow Tenders (6 pcs)',
      category: 'chicken',
      tagline: 'Extra-crisp whole breast tenders with charcoal sesame glaze',
      badge: 'TOP SELLER',
      flavor: 'JUICY',
      price: 329,
      calories: '610 kcal',
      image: ASSETS.CHICKEN_IMAGE,
      description: 'Tender inner breast fillets dredged in panko & black sesame crumble, served with two artisanal house dips.',
      options: {
        spiceLevel: ['Mild Crunch', 'Smoked Paprika', 'Red Hazard'],
        dips: ['Truffle Honey Mustard', 'Spider Garlic Aioli', 'Inferno Dip']
      }
    },
    {
      id: 'chk-03',
      name: 'Obsidian Wings Feast (12 pcs)',
      category: 'chicken',
      tagline: 'Flash-fried jumbo wings tossed in flaming honey sriracha',
      badge: 'SHARING',
      flavor: 'SPICY',
      price: 549,
      calories: '980 kcal',
      image: ASSETS.CHICKEN_IMAGE,
      description: 'Double-cooked crisp skin jumbo wings glazed in caramelized dark honey, smoked chili, and fresh lime zest.',
      options: {
        spiceLevel: ['Smoky Sweet', 'Red Venom Hot', 'Nuclear Reaper'],
        dips: ['Blue Cheese Cream', 'Spider Garlic Aioli']
      }
    }
  ],

  burgers: [
    {
      id: 'brg-01',
      name: 'The Dark Arachnid Smash',
      category: 'burgers',
      tagline: 'Double smash patty, melted pepperjack, dark brioche',
      badge: 'CHEF PICK',
      flavor: 'JUICY',
      price: 389,
      calories: '890 kcal',
      image: ASSETS.BURGER_IMAGE,
      description: 'Two dry-aged smashed beef patties with crispy lacy edges, smoked cheddar, blistered charred jalapeños, and secret SPIDER burger sauce on a charcoal brioche bun.',
      options: {
        bun: ['Charcoal Brioche', 'Toasted Sesame Brioche', 'Lettuce Wrap'],
        doneness: ['Medium Well', 'Well Done', 'Lacy Smash Crisp'],
        addOns: ['Extra Smoked Bacon', 'Double Melted Cheese', 'Fried Egg']
      }
    },
    {
      id: 'brg-02',
      name: 'Crimson Crunch Crispy Burger',
      category: 'burgers',
      tagline: 'Massive fried chicken thigh, purple slaw, chipotle drip',
      badge: 'BESTSELLER',
      flavor: 'CRISPY',
      price: 349,
      calories: '820 kcal',
      image: ASSETS.HERO_IMAGE,
      description: 'Colossal buttermilk fried chicken thigh with red spice crunch, crunchy purple cabbage slaw, pickled cucumbers, and melted artisan cheese sauce.',
      options: {
        bun: ['Toasted Sesame Brioche', 'Charcoal Bun'],
        spiceLevel: ['Smoky Gold', 'Crimson Hot', 'Inferno Red'],
        addOns: ['Extra Cheese Drip', 'Crispy Bacon Strips']
      }
    },
    {
      id: 'brg-03',
      name: 'Inferno Truffle Double Burger',
      category: 'burgers',
      tagline: 'Double beef, black truffle aioli, charred onion jam',
      badge: 'PREMIUM',
      flavor: 'SMOKY',
      price: 449,
      calories: '940 kcal',
      image: ASSETS.BURGER_IMAGE,
      description: 'Double smashed beef, wild mushroom sauté, Italian black truffle mayo, arugula, and slow-cooked red onion jam on a dark toasted bun.',
      options: {
        bun: ['Charcoal Brioche', 'Classic Brioche'],
        addOns: ['Truffle Fries Pairing', 'Double Cheddar Slice']
      }
    }
  ],

  shakes: [
    {
      id: 'shk-01',
      name: 'Dark Velvet Brownie Blast',
      category: 'shakes',
      tagline: 'Belgian dark chocolate fudge, fudge brownie chunks, whipped cream',
      badge: 'SIGNATURE',
      flavor: 'CREAMY',
      price: 249,
      calories: '590 kcal',
      image: ASSETS.SHAKE_IMAGE,
      description: 'Handspun rich Belgian chocolate gelato blended with dark chocolate drizzle, baked fudge brownie pieces, and cocoa dust.',
      options: {
        size: ['Standard (350ml)', 'Colossal (500ml)'],
        extra: ['Extra Brownie Chunk', 'Espresso Shot Float', 'KitKat Crumble']
      }
    },
    {
      id: 'shk-02',
      name: 'KitKat Crimson Crunch Shake',
      category: 'shakes',
      tagline: 'Vanilla bean & crushed KitKat wafers with red berry swirl',
      badge: 'POPULAR',
      flavor: 'SWEET',
      price: 229,
      calories: '540 kcal',
      image: ASSETS.SHAKE_IMAGE,
      description: 'Madagascar vanilla gelato spun with crunchy milk chocolate KitKat fingers and a rim dipped in ruby chocolate crisps.',
      options: {
        size: ['Standard (350ml)', 'Colossal (500ml)'],
        extra: ['Extra KitKat Bar', 'Whipped Cream Mountain']
      }
    },
    {
      id: 'shk-03',
      name: 'Black Forest Silk Shake',
      category: 'shakes',
      tagline: 'Dark cherry compote, chocolate ganache, shaved dark flakes',
      badge: 'NEW',
      flavor: 'CREAMY',
      price: 259,
      calories: '560 kcal',
      image: ASSETS.SHAKE_IMAGE,
      description: 'Tart black cherries stewed with vanilla, blended into creamy dark cocoa milk and topped with dark chocolate shavings.',
      options: {
        size: ['Standard (350ml)', 'Colossal (500ml)'],
        extra: ['Extra Cherry Drizzle', 'Oreo Dust']
      }
    }
  ],

  mojitos: [
    {
      id: 'moj-01',
      name: 'Blood Berry Sparkling Mojito',
      category: 'mojitos',
      tagline: 'Crushed raspberries, fresh mint, lime wheel, electric soda fizz',
      badge: 'REFRESHING',
      flavor: 'FRESH',
      price: 189,
      calories: '180 kcal',
      image: ASSETS.MOJITO_IMAGE,
      description: 'Fresh wild raspberries and black currants muddled with organic mint leaves, fresh key lime juice, cane sugar, and sparkling mineral water over cracked ice.',
      options: {
        ice: ['Cracked Crystal Ice', 'Less Ice', 'No Ice'],
        sweetness: ['Standard', 'Light Sugar', 'Zero Sugar']
      }
    },
    {
      id: 'moj-02',
      name: 'Crimson Citrus Venom Sparkler',
      category: 'mojitos',
      tagline: 'Blood orange, ruby grapefruit, bruised basil, sparkling soda',
      badge: 'CITRUS',
      flavor: 'FRESH',
      price: 199,
      calories: '195 kcal',
      image: ASSETS.MOJITO_IMAGE,
      description: 'Sicilian blood orange extract infused with red grapefruit juice, fresh garden basil, and sparkling tonic water.',
      options: {
        ice: ['Cracked Crystal Ice', 'Less Ice'],
        sweetness: ['Standard', 'Extra Tart', 'Light Sugar']
      }
    }
  ],

  cold_coffee: [
    {
      id: 'cof-01',
      name: 'Obsidian Nitro Cold Brew',
      category: 'cold_coffee',
      tagline: '20-hour steep single-origin Arabica with velvet cream cascade',
      badge: 'ENERGETIC',
      flavor: 'BOLD',
      price: 199,
      calories: '120 kcal',
      image: ASSETS.COLD_COFFEE_IMAGE,
      description: 'Slow cold-steeped Ethiopian & Colombian dark roast infused with nitrogen for a silky smooth Guinness-style micro-foam head and naturally sweet chocolate finish.',
      options: {
        milk: ['Whole Velvet Milk', 'Oat Milk Barista', 'Almond Milk', 'Black Nitro'],
        sweetener: ['None (Pure Dark)', 'Vanilla Bean', 'Salted Caramel']
      }
    },
    {
      id: 'cof-02',
      name: 'Dark Mocha Cold Cream Coffee',
      category: 'cold_coffee',
      tagline: 'Double espresso over ice spheres with dark chocolate ganache swirl',
      badge: 'INDULGENT',
      flavor: 'CREAMY',
      price: 219,
      calories: '240 kcal',
      image: ASSETS.COLD_COFFEE_IMAGE,
      description: 'Fresh pulled espresso poured over artisanal ice spheres, shaken with whole milk and layered with dark cocoa syrup.',
      options: {
        milk: ['Whole Velvet Milk', 'Oat Milk', 'Skim Milk'],
        sweetness: ['Signature Sweet', 'Light Sweet', 'Sugar Free']
      }
    }
  ],

  veg: [
    {
      id: 'veg-01',
      name: 'Truffle Paneer Crunch Burger',
      category: 'veg',
      tagline: 'Crispy spiced paneer slab, charred jalapeño salsa, waffle fries',
      badge: 'VEG HERO',
      flavor: 'CRISPY',
      price: 329,
      calories: '710 kcal',
      image: ASSETS.VEG_IMAGE,
      description: 'Thick cut artisanal cottage cheese crusted in spicy seasoned herbs, stacked with fresh avocado, arugula, and charred green jalapeño salsa on brioche.',
      options: {
        bun: ['Charcoal Brioche', 'Sesame Brioche'],
        spiceLevel: ['Herbed Mild', 'Spicy Jalapeño Crunch', 'Venom Red'],
        addOns: ['Truffle Waffle Fries', 'Extra Melted Cheddar']
      }
    },
    {
      id: 'veg-02',
      name: 'Smoked Truffle Waffle Fries',
      category: 'veg',
      tagline: 'Cross-cut golden crispy potatoes, parmesan dust, garlic aioli',
      badge: 'CRUNCH',
      flavor: 'CRISPY',
      price: 179,
      calories: '420 kcal',
      image: ASSETS.VEG_IMAGE,
      description: 'Lattice-cut golden potatoes fried to an audible crunch, dusted with black truffle sea salt, fresh parsley, and grated parmesan.',
      options: {
        dip: ['Spider Garlic Aioli', 'Crimson Truffle Mayo', 'Smoky BBQ']
      }
    }
  ],

  more: [
    {
      id: 'mor-01',
      name: 'Loaded Venom Nachos',
      category: 'more',
      tagline: 'Charcoal tortilla chips, molten cheese, jalapeños, salsa',
      badge: 'SHAREABLE',
      flavor: 'SPICY',
      price: 269,
      calories: '650 kcal',
      image: ASSETS.FINAL_IMAGE,
      description: 'Crisp black corn tortilla chips loaded with molten cheese sauce, pico de gallo, pickled jalapeños, and guacamole.',
      options: {
        meatAddOn: ['None (Pure Veg)', 'Crispy Chicken Bites (+ ₹80)']
      }
    },
    {
      id: 'mor-02',
      name: 'Spider Red Velvet Lava Cup',
      category: 'more',
      tagline: 'Warm molten red velvet sponge cake with flowing dark cream',
      badge: 'DESSERT',
      flavor: 'SWEET',
      price: 199,
      calories: '480 kcal',
      image: ASSETS.FINAL_IMAGE,
      description: 'Freshly baked crimson sponge cake with an oozing liquid dark chocolate core, served warm with vanilla ice cream.',
      options: {
        topping: ['Vanilla Bean Scoop', 'Whipped Cream', 'Chocolate Drizzle']
      }
    }
  ]
};

export const STORE_INFO = {
  name: 'SPIDER CAFE',
  tagline: 'CRAVE THE DARK.',
  address: 'Spider Cafe, Kondalampatti Bypass (Near Indian Oil Petrol Bunk), Salem, Tamil Nadu 636010',
  mapsUrl: 'https://maps.app.goo.gl/4VNg33rjj6LS36kSA',
  coordinates: '11.6315° N, 78.1264° E',
  hours: 'Mon – Sun: 11:00 AM – 03:00 AM (Late Night Service)',
  social: {
    instagram: '@spiderfoodcraft',
    twitter: '@spidercraft',
    tiktok: '@spidercrave'
  }
};

// ==========================================
// BACKEND API INTEGRATION PLACEHOLDERS
// Connect your production order/payment webhook below
// ==========================================
export const API_ENDPOINTS = {
  CREATE_ORDER: '/api/v1/orders/create', // Replace with your actual backend endpoint
  PROCESS_PAYMENT: '/api/v1/payments/checkout',
  TRACK_ORDER: '/api/v1/orders/track'
};

/**
 * Dispatches an order to the backend system.
 * Replace this mock implementation with your real fetch() / Axios call.
 */
export async function submitOrderToBackend(orderPayload) {
  console.log('[SPIDER API] Dispatching order payload to server:', orderPayload);
  
  // Simulate network latency for demonstration
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        orderId: 'SPD-' + Math.floor(100000 + Math.random() * 900000),
        estimatedTimeMinutes: 20,
        status: 'CONFIRMED'
      });
    }, 1200);
  });
}
