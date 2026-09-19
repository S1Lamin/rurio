export const PRODUCTS_DATA = [
  {
    id: 'p1',
    title: '3D Roman Bridge Souvenir Fridge Magnet',
    type: 'PHYSICAL',
    category: 'Magnets & Souvenirs',
    pointsCost: 110,
    rating: 4.9,
    reviewsCount: 86,
    merchant: 'San Xoán Souvenirs Guild',
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=80',
    badge: 'Best Seller',
    isDeliveryIncluded: true,
    estimatedDays: '3-5 business days',
    specs: {
      Material: 'High-density cast polyresin (hand-painted relief)',
      Dimensions: '7.5 cm x 5.5 cm',
      Magnet: 'Extra-strong neodymium backing',
      Origin: 'San Xoán de Río, Galicia'
    },
    description: 'Vibrant 3D raised-relief collector fridge magnet featuring the ancient Roman arch bridge of Ponte Navea and the winding Río Navea. Hand-painted with rich durable acrylic glazes.'
  },
  {
    id: 'p2',
    title: '3D Traditional Granite Hórreo Magnet',
    type: 'PHYSICAL',
    category: 'Magnets & Souvenirs',
    pointsCost: 100,
    rating: 4.8,
    reviewsCount: 64,
    merchant: 'San Xoán Souvenirs Guild',
    image: 'https://images.unsplash.com/photo-1590402494682-cd3fb53b1f70?auto=format&fit=crop&w=600&q=80',
    badge: 'Popular',
    isDeliveryIncluded: true,
    estimatedDays: '3-5 business days',
    specs: {
      Material: 'Embossed stone-resin with matte finish',
      Dimensions: '8.0 cm x 5.0 cm',
      Magnet: 'Heavy-duty magnetic base',
      Origin: 'San Xoán de Río, Galicia'
    },
    description: 'Handcrafted miniature 3D magnet depicting Galicia’s iconic stone granary (Hórreo) perched on mushroom pillars with Celtic cross finials.'
  },
  {
    id: 'p3',
    title: 'Hand-Carved Chestnut Wood Keychain',
    type: 'PHYSICAL',
    category: 'Keychains & Crafts',
    pointsCost: 85,
    rating: 4.9,
    reviewsCount: 112,
    merchant: 'Artesanía Do Río',
    image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=600&q=80',
    badge: 'Eco Handmade',
    isDeliveryIncluded: true,
    estimatedDays: '3-5 business days',
    specs: {
      Material: 'Fallen native chestnut hardwood',
      Finish: 'Organic beeswax coating',
      Ring: 'Antiqued brass split-ring',
      Origin: 'Artisan Workshop, San Xoán'
    },
    description: 'Turned and carved by local woodcraft master Xurxo from pruned chestnut orchard branches. Burnished with the ancient Galician triskele knot.'
  },
  {
    id: 'p4',
    title: 'San Xoán Morning Mist Ceramic Coffee Mug',
    type: 'PHYSICAL',
    category: 'Mugs & Living',
    pointsCost: 135,
    rating: 4.7,
    reviewsCount: 48,
    merchant: 'Cerámica da Ribeira',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80',
    badge: 'Craft Pottery',
    isDeliveryIncluded: true,
    estimatedDays: '4-6 business days',
    specs: {
      Capacity: '350 ml (12 oz)',
      Material: 'Double-glazed stoneware ceramic',
      Care: 'Microwave & Dishwasher safe',
      Origin: 'Ourense Artisans'
    },
    description: 'Rustic stoneware mug handcrafted with a gradient blue-emerald glaze reminiscent of early dawn over the Navea river gorge. Stamped with the RuRio emblem.'
  },
  {
    id: 'p5',
    title: 'Silver Triskele Celtic Pendant Necklace',
    type: 'PHYSICAL',
    category: 'Jewelry',
    pointsCost: 240,
    rating: 5.0,
    reviewsCount: 39,
    merchant: 'Ourivaría Castro',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80',
    badge: 'Sterling 925',
    isDeliveryIncluded: true,
    estimatedDays: '3-5 business days',
    specs: {
      Metal: 'Solid 925 Sterling Silver',
      Chain: '45 cm sterling rope chain included',
      Box: 'Eco-friendly velvet keepsake gift pouch',
      Origin: 'Galician Silversmiths'
    },
    description: 'Exquisite Celtic triple spiral necklace symbolizing eternal movement, earth, water and air. Hallmarked by certified regional jewelers.'
  },
  {
    id: 'p6',
    title: 'Raw Mountain Chestnut Honey Jar (500g)',
    type: 'PHYSICAL',
    category: 'Local Food',
    pointsCost: 160,
    rating: 4.9,
    reviewsCount: 142,
    merchant: 'Apicultura Souto Verde',
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=600&q=80',
    badge: 'Direct Delivery',
    isDeliveryIncluded: true,
    estimatedDays: '3-5 business days',
    specs: {
      NetWeight: '500g (1.1 lbs)',
      Packaging: 'Cushioned recyclable glass jar',
      Harvest: 'Wild floral chestnut blossom',
      Origin: 'Monte Candedo apiaries'
    },
    description: 'Direct-from-hive unprocessed chestnut honey safely packed and delivered right to your home address. Rich dark notes with lingering floral maltiness.'
  },

  /* =========================================================
     COUPONS & DISCOUNTS
     ========================================================= */
  {
    id: 'c1',
    title: '50% OFF 2nd Litre of Mountain Honey',
    type: 'COUPON',
    category: 'Coupons & Discounts',
    pointsCost: 55,
    rating: 4.9,
    reviewsCount: 97,
    merchant: 'Apicultura Souto Verde',
    image: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&w=600&q=80',
    badge: '50% OFF',
    discountCode: 'HONEY50-RURIO',
    discountAmount: '50% Discount',
    validity: 'Valid for 90 days',
    description: 'Get 50% discount on your second glass jar or litre of raw honey when purchasing directly from the producer in San Xoán or online store.',
    instructions: 'Saved to your Backpack. Show this promo code at checkout online or in the shop.'
  },
  {
    id: 'c2',
    title: '30% OFF Bica Cake Family Box & Coffees',
    type: 'COUPON',
    category: 'Coupons & Discounts',
    pointsCost: 40,
    rating: 4.8,
    reviewsCount: 118,
    merchant: 'Panadería Tradicional de Río',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80',
    badge: '30% OFF',
    discountCode: 'BICA30-RURIO',
    discountAmount: '30% Discount',
    validity: 'Valid for 30 days',
    description: 'Enjoy 30% off any family-sized box of freshly baked traditional Bica pastry plus 2 complimentary artisanal pot coffees.',
    instructions: 'Present this coupon code from your Backpack at the bakery register.'
  },
  {
    id: 'c3',
    title: '€10 OFF River Kayak or Guided Trail Tour',
    type: 'COUPON',
    category: 'Coupons & Discounts',
    pointsCost: 65,
    rating: 5.0,
    reviewsCount: 42,
    merchant: 'Río Navea Outdoor Adventures',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80',
    badge: '€10 Voucher',
    discountCode: 'KAYAK10-RURIO',
    discountAmount: '€10 Voucher',
    validity: 'Valid for 120 days',
    description: '€10 direct savings coupon towards guided canyon kayaking, e-bike rentals, or heritage walking excursions across the Ribeira Sacra.',
    instructions: 'Apply discount code during online booking or give to your excursion guide.'
  }
];

export const MARKET_CATEGORIES = [
  'All',
  'Magnets & Souvenirs',
  'Keychains & Crafts',
  'Mugs & Living',
  'Jewelry',
  'Local Food',
  'Coupons & Discounts'
];
