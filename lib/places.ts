export const companyLogo = {
  src: '/logos/food%20n%20bev%20transparent.png',
  alt: 'Food N Bev & Beyond',
} as const

export type MenuItem = {
  name: string
  description: string
  image: string
  category: string
  label?: string
  price?: string
}

export type MenuPageImage = {
  src: string
  alt: string
}

export type RestaurantContact = {
  phone?: string
  email?: string
  socials?: readonly {
    label: 'Facebook' | 'Instagram'
    href: string
  }[]
}

const createMenuPages = (
  folder: string,
  restaurantName: string,
  filenames: string[],
): MenuPageImage[] =>
  filenames.map((filename, index) => ({
    src: `/menu/${encodeURIComponent(folder)}/${filename}`,
    alt: `${restaurantName} menu page ${index + 1}`,
  }))

const cocoMenuPages = createMenuPages('coco resto', 'Coco Resto', [
  '696800924_877029875423088_509179651657349311_n.jpg',
  '696740121_877030025423073_7785433009023255129_n.jpg',
  '696752902_877029892089753_341069622740391321_n.jpg',
  '696852191_877029915423084_5474973399116602578_n.jpg',
  '697114675_877029992089743_3573531783787085638_n.jpg',
  '697169509_877030155423060_1703440675300972876_n.jpg',
  '697262911_877030005423075_6693953800073512685_n.jpg',
  '697792701_877030135423062_852488164349084780_n.jpg',
])

const lighthouseMenuPages = createMenuPages(
  'the lighthouse',
  'The Lighthouse',
  [
    '638423217_1326450142842667_2612447647782276608_n.jpg',
    '639420889_1326450309509317_8199899221116282333_n.jpg',
    '641319795_1326450129509335_4376497536129235095_n.jpg',
    '641341615_1326450192842662_5523786068882403915_n.jpg',
    '641413925_1326450089509339_7378741064376351114_n.jpg',
    '641702724_1326450399509308_2272948472590233529_n.jpg',
    '641710799_1326450276175987_8952194939582688582_n.jpg',
    '642732913_1326450339509314_3190120128922850056_n.jpg',
  ],
)

const kurbadaMenuPages = createMenuPages(
  'kurbada',
  'Sa Kurbada Hapag-Karaenan',
  [
    '514263605_122101329278931772_6488704892675949429_n.jpg',
    '514324517_122101329392931772_1367126368428515067_n.jpg',
    '514360028_122101329368931772_1291149952249848435_n.jpg',
    '515710299_122101329296931772_6924833209486966951_n.jpg',
    '516581427_122101329242931772_4188546006283171215_n.jpg',
  ],
)

const moringaMenuPages = createMenuPages('moringa treee', 'Moringa Tree', [
  '778938604_122175731630708163_5521280107427700646_n.jpg',
  '778928528_122175731768708163_5086541778804462974_n.jpg',
  '778767418_122175732236708163_6029863537722972503_n.jpg',
  '777851647_122175732206708163_2250587907523088329_n.jpg',
  '777531108_122175731774708163_18460844739789983_n.jpg',
  '775333686_122175731798708163_7970678902934086531_n.jpg',
  '775260527_122175732050708163_8854022605701448185_n.jpg',
  '775260441_122175732218708163_6901628054066444364_n.jpg',
])

export const places = [
  {
    slug: 'coco-resto-filipino-restaurant',
    name: 'Coco Resto Filipino Restaurant',
    shortName: 'Coco Resto',
    category: 'Restaurant',
    description:
      'Filipino comfort food, island seafood, and generous plates made for family-style meals in El Nido.',
    location: 'El Nido, Palawan',
    image: '/banners/coco resto.jpg',
    imageAlt: 'Guests dining beside the pool at Coco Resto in the evening',
    logo: '/logos/transparent/coco-resto.png',
    logoShape: 'wide',
    accent: 'Filipino restaurant',
    hero: 'Classic Filipino favorites, cooked for sharing.',
    features: [
      'Filipino comfort food',
      'Fresh island seafood',
      'Family-style platters',
      'Warm local service',
    ],
    contact: {
      phone: '0961 529 0660',
      email: 'cocorestoelnido@gmail.com',
      socials: [
        {
          label: 'Facebook',
          href: 'https://www.facebook.com/profile.php?id=100093482504688',
        },
        {
          label: 'Instagram',
          href: 'https://www.instagram.com/cocorestoelnido',
        },
      ],
    },
    menuPages: cocoMenuPages,
    menu: [
      {
        name: 'Seafood Kare-Kare',
        description:
          'Filipino stew made with thick savoury peanut sauce and vegetables.',
        image: '/images/dish-platter.png',
        category: 'Filipino Classics',
        label: 'Best seller',
        price: 'Php850',
      },
      {
        name: 'Boneless Chicken Inasal',
        description:
          'Boneless chicken quarter leg, flavored and grilled the Ilonggo way.',
        image: '/images/dish-fish.png',
        category: 'Filipino Classics',
        label: 'Chef’s pick',
        price: 'Php550',
      },
      {
        name: 'Lechon Kawali with Sarsa o Toyo-Mansi',
        description:
          'Crispy fried pork belly served with rice, pickled papaya, and two favorite dips.',
        image: '/images/dish-shrimp.png',
        category: 'Filipino Classics',
        label: 'Guest favorite',
        price: 'Php650',
      },
    ],
  },
  {
    slug: 'the-lighthouse-seafood-restaurant',
    name: 'The Lighthouse Seafood Restaurant',
    shortName: 'The Lighthouse',
    category: 'Restaurant',
    description: 'Fresh seafood, coastal flavors, and unforgettable dining.',
    location: 'El Nido, Palawan',
    image: '/banners/lighthouse.jpg',
    imageAlt: 'Seafood platters, lobster, and pasta from The Lighthouse',
    logo: '/logos/transparent/the-lighthouse.png',
    logoShape: 'portrait',
    accent: 'Coastal dining',
    hero: 'Fresh from the sea. Made for unforgettable moments.',
    features: [
      'Fresh local ingredients',
      'Filipino hospitality',
      'Sea-to-table cooking',
      'Sunset tables',
    ],
    contact: {
      phone: '751 3324',
      email: 'thelighthouselnido@gmail.com',
      socials: [
        {
          label: 'Facebook',
          href: 'https://www.facebook.com/TheLightHouseElNido0956',
        },
      ],
    },
    menuPages: lighthouseMenuPages,
    menu: [
      {
        name: 'Gambas Al Ajillo',
        description:
          'Garlicky and spicy succulent shrimps served with toasted bread.',
        image: '/images/dish-shrimp.png',
        category: 'Appetizer',
        label: 'Best seller',
        price: 'Php450',
      },
      {
        name: 'The Bad Ass Burger',
        description:
          'Signature beefy burger with smoked bacon, tomato, lettuce, cucumber, cheese, onions, jalapeno, and mayo-mustard dressing.',
        image: '/images/dish-platter.png',
        category: 'Sandwiches',
        label: 'Guest favorite',
        price: 'Php650',
      },
      {
        name: 'Seafood Kare-Kare',
        description:
          'Filipino stew made with thick savoury peanut sauce and vegetables.',
        image: '/images/dish-fish.png',
        category: 'Filipino Specials',
        label: 'Chef’s pick',
        price: 'Php750',
      },
    ],
  },
  {
    slug: 'moringa-tree-mediterranean-restaurant-pizzeria',
    name: 'Moringa Tree Mediterranean Restaurant & Pizzeria',
    shortName: 'Moringa Tree',
    category: 'Restaurant',
    description:
      'Mediterranean plates, garden-fresh flavors, handmade pizzas, and easygoing dinners under the Palawan sky.',
    location: 'El Nido, Palawan',
    image: '/banners/the moringa tree.jpg',
    imageAlt: 'The Moringa Tree team welcoming guests into the restaurant',
    logo: '/logos/transparent/moringa-tree.png',
    logoShape: 'wide',
    accent: 'Mediterranean pizzeria',
    hero: 'Mediterranean comfort, handmade pizzas, and garden-fresh flavor.',
    features: [
      'Handmade pizzas',
      'Mediterranean plates',
      'Fresh herbs and greens',
      'Easygoing garden dining',
    ],
    contact: {
      phone: '0969 275 0341',
      email: 'themoringatree.elnido@gmail.com',
      socials: [
        {
          label: 'Facebook',
          href: 'https://www.facebook.com/profile.php?id=61571244896967',
        },
      ],
    },
    menuPages: moringaMenuPages,
    menu: [
      {
        name: 'Mezze Platter',
        description:
          'Beef kofta, chicken meatballs, pita bread, olives, roasted peppers, pickled red onion, tomatoes, hummus, tzatziki, and sour cream.',
        image: '/images/dish-platter.png',
        category: 'Appetizers / Starters',
        label: 'Best seller',
        price: 'Php950',
      },
      {
        name: 'Pescatore-Seafood',
        description:
          'Calamares, shrimp, mussels, and garlic butter on a handmade pizza crust.',
        image: '/images/dish-fish.png',
        category: 'Pizza',
        label: 'Guest favorite',
        price: 'Php650',
      },
      {
        name: 'Shrimp Aglio Olio',
        description:
          'A simple, delicious pasta meal with garlic, pepper flakes, and parmesan cheese.',
        image: '/images/dish-shrimp.png',
        category: 'Pasta',
        label: 'Chef’s pick',
        price: 'Php550',
      },
    ],
  },
  {
    slug: 'sa-kurbada-hapag-karaenan',
    name: 'Sa Kurbada Hapag-Karaenan',
    shortName: 'Sa Kurbada',
    category: 'Restaurant',
    description: 'Authentic Filipino flavors served with warmth and tradition.',
    location: 'El Nido, Palawan',
    image: '/banners/sa kurbada hapag karaenan.jpg',
    imageAlt: 'Wooden tables and woven walls at Sa Kurbada overlooking palms',
    logo: '/logos/transparent/sa-kurbada.png',
    logoShape: 'round',
    accent: 'Filipino table',
    hero: 'Filipino food served with warmth, memory, and tradition.',
    features: [
      'Regional Filipino dishes',
      'Generous shared meals',
      'Comforting classics',
      'Family-style service',
    ],
    contact: {
      socials: [
        {
          label: 'Facebook',
          href: 'https://www.facebook.com/profile.php?id=61577953162741',
        },
      ],
    },
    menuPages: kurbadaMenuPages,
    menu: [
      {
        name: 'Kansi Lawas',
        description:
          'An Ilonggo delicacy made from slow-cooked beef shank with green jackfruit and batuan soup base.',
        image: '/images/dish-platter.png',
        category: 'Filipino Favorites',
        label: 'Best seller',
        price: 'Php850',
      },
      {
        name: 'Classic Bulalo Soup',
        description:
          'Flavorful beefy broth with beef shank and vegetables, a classic Filipino favorite.',
        image: '/images/dish-fish.png',
        category: 'Filipino Favorites',
        label: 'House classic',
        price: 'Php850',
      },
      {
        name: 'Lechon Kawali with Sarsa o Toyo-Mansi',
        description:
          'Crispy fried pork belly served with rice, pickled papaya, and two favorite dips.',
        image: '/images/dish-shrimp.png',
        category: 'Filipino Favorites',
        label: 'Guest favorite',
        price: 'Php650',
      },
    ],
  },
] as const

export const otherPlaces = (slug: string) =>
  places.filter((place) => place.slug !== slug)

export const restaurantPlaces = places.filter(
  (place) => place.category === 'Restaurant',
)

export const otherRestaurants = (slug: string) =>
  restaurantPlaces.filter((place) => place.slug !== slug)

export const placePath = (slug: string) => `/places/${slug}`

export const placeMenuPath = (slug: string) => `/places/${slug}/menu`
