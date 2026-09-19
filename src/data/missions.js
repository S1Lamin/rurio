export const MISSIONS_DATA = [
  {
    id: 'm1',
    title: 'Spot Ancient Chestnut Tree',
    shortDesc: 'Identify an old-growth Castiñeiro (Chestnut tree) and analyze its trunk.',
    fullDesc: 'San Xoán de Río is famous for its centuries-old chestnut groves (Soutos). Locate an ancient chestnut tree along the forest path, point your camera at the bark and leaves to verify its species with our AI botanist.',
    category: 'Nature',
    points: 100,
    difficulty: 'Easy',
    estimatedTime: '15 mins',
    locationName: 'Souto de Castiñeiros',
    locationCoords: { x: 32, y: 38 }, // percentage on map
    verificationType: 'AI_VISION',
    verificationLabel: 'AI Vision Recognition',
    sampleEvidence: {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&w=800&q=80',
      label: 'Captured Chestnut Tree (Castanea sativa)',
      detectedEntity: 'Castanea Sativa (Sweet Chestnut)',
      confidence: 96.8,
      analysisDetails: [
        'Trunk circumference > 2.5m: Verified',
        'Leaf serration pattern: Matches Castanea sativa',
        'Habitat flora: Native Galician Souto confirmed'
      ]
    },
    funFact: 'Some chestnut trees in San Xoán are over 400 years old and provided staple food before potatoes arrived in Europe!'
  },
  {
    id: 'm2',
    title: 'Taste Traditional Bica at Bakery',
    shortDesc: 'Visit Panadería de Río, savor a slice of artisanal Bica cake and get local review.',
    fullDesc: 'Bica is the quintessential Galician sweet bread made with manteca (clarified butter) and dusted with cinnamon sugar. Order a fresh slice at the historic bakery, upload your tasting photo or receipt, and our local community verifiers will confirm your challenge.',
    category: 'Taste',
    points: 120,
    difficulty: 'Easy',
    estimatedTime: '20 mins',
    locationName: 'Panadería Tradicional de Río',
    locationCoords: { x: 48, y: 55 },
    verificationType: 'HUMAN_REVIEW',
    verificationLabel: 'Local Verifier Review',
    sampleEvidence: {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
      label: 'Photo with Bica Slice & Bakery Stamp',
      verifierName: 'Doña Carmen (Bakery Guild)',
      reviewNotes: 'Verified! Warm crust with proper cinnamon topping. Que aproveite!'
    },
    funFact: 'Traditional bica recipes are treasured family secrets passed down across generations.'
  },
  {
    id: 'm3',
    title: 'Roman Bridge Heritage Check-In',
    shortDesc: 'Stand on the ancient stone arches of Ponte Navea and check in with GPS.',
    fullDesc: 'Walk down the old Roman trade path to Ponte Navea crossing the river. Stand directly on the stone bridge platform to trigger the GPS geofence check-in and unlock the history audio note.',
    category: 'Culture',
    points: 80,
    difficulty: 'Medium',
    estimatedTime: '30 mins',
    locationName: 'Ponte Navea Arch Bridge',
    locationCoords: { x: 74, y: 68 },
    verificationType: 'GPS_CHECKIN',
    verificationLabel: 'GPS Geolocation Check-In',
    sampleEvidence: {
      type: 'gps',
      targetCoords: '42.3481° N, 7.3112° W',
      accuracy: 'Within 6 meters of landmark',
      label: 'Geofence Matched: Ponte Navea Heritage Site'
    },
    funFact: 'Legionaries and pilgrims on the Vía Nova passed through this very river crossing 2,000 years ago.'
  },
  {
    id: 'm4',
    title: 'Eco-Trail Clean-Up Action',
    shortDesc: 'Pick up stray litter along the river path and show before & after photo.',
    fullDesc: 'Help keep San Xoán’s pristine mountain trails clean. Gather discarded plastic or bottles, place them in the nearest recycling bin, and upload a before/after shot for AI environmental impact scoring.',
    category: 'Eco',
    points: 150,
    difficulty: 'Medium',
    estimatedTime: '25 mins',
    locationName: 'Navea River Trail',
    locationCoords: { x: 62, y: 44 },
    verificationType: 'AI_IMPACT',
    verificationLabel: 'AI Environmental Impact Scan',
    sampleEvidence: {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?auto=format&fit=crop&w=800&q=80',
      label: 'Cleaned Trail & Recycled Debris',
      detectedEntity: '3 Recycled Plastic Containers & Cans Removed',
      confidence: 94.2,
      analysisDetails: [
        'Trail ground before/after: Area cleared of debris',
        'Deposit verified at Green Point station',
        'Estimated carbon offset & microplastic prevention: +150 Green Impact Points'
      ]
    },
    funFact: 'Over 120 kg of roadside debris has been removed by visiting tourists in San Xoán this season!'
  },
  {
    id: 'm5',
    title: 'Learn a Galego Phrase from an Elder',
    shortDesc: 'Record an audio greeting saying "Boas tardes!" with a local resident.',
    fullDesc: 'Connect with the vibrant local community! Stop by the plaza, greet an elder resident with respect, and learn a traditional Galician saying or blessing. Upload the audio snippet for community host validation.',
    category: 'Culture',
    points: 90,
    difficulty: 'Easy',
    estimatedTime: '15 mins',
    locationName: 'Praza Maior de San Xoán',
    locationCoords: { x: 50, y: 50 },
    verificationType: 'HUMAN_REVIEW',
    verificationLabel: 'Community Host Validation',
    sampleEvidence: {
      type: 'audio',
      audioText: '"Moitas grazas veciño, que teñas un fermoso día!" (Thank you neighbor, have a wonderful day!)',
      verifierName: 'Xosé (San Xoán Cultural Center)',
      reviewNotes: 'Pronunciation is warm and respectful. Welcome to our community!'
    },
    funFact: 'Galego is closely related to Portuguese and has more than 70 words just to describe different kinds of rain!'
  },
  {
    id: 'm6',
    title: 'Discover the Hidden Granite Horreo',
    shortDesc: 'Find the traditional raised stone granary behind the municipal church.',
    fullDesc: 'Horreos are stone granaries raised on stone pillars (tornarratos) to protect corn and grain from moisture and rodents. Locate the antique granite Horreo, snap a photo showing its stone pillars.',
    category: 'Culture',
    points: 110,
    difficulty: 'Hard',
    estimatedTime: '35 mins',
    locationName: 'Old Church Quarter',
    locationCoords: { x: 22, y: 65 },
    verificationType: 'AI_VISION',
    verificationLabel: 'AI Architectural Vision',
    sampleEvidence: {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1590402494682-cd3fb53b1f70?auto=format&fit=crop&w=800&q=80',
      label: 'Granite Horreo Architectural Recognition',
      detectedEntity: 'Traditional Galician Hórreo (Granite)',
      confidence: 98.1,
      analysisDetails: [
        'Mushroom-cap rodent pilings detected (Tornarratos)',
        'Traditional slate roof identified',
        'Historic masonry style: 18th Century'
      ]
    },
    funFact: 'Horreos are legally protected historical monuments in Galicia; no two are exactly alike!'
  }
];

export const CATEGORIES = ['All', 'Nature', 'Culture', 'Taste', 'Eco'];
