export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
  features: string[];
  popular: boolean;
  discount?: number;
}

export const productCategories = [
  { id: 'electronics', name: 'Electronics', icon: '📱' },
  { id: 'fashion', name: 'Fashion', icon: '👕' },
  { id: 'home', name: 'Home & Garden', icon: '🏠' },
  { id: 'sports', name: 'Sports & Fitness', icon: '⚽' },
  { id: 'books', name: 'Books & Media', icon: '📚' },
];

export const products: Product[] = [
  // Electronics Category
  {
    id: '1',
    name: 'Wireless Bluetooth Headphones',
    description: 'Premium noise-canceling wireless headphones with 30-hour battery life and superior sound quality',
    price: 299.99,
    image_url: 'https://picsum.photos/800/600?random=1',
    category: 'electronics',
    features: ['30-hour battery', 'Noise canceling', 'Wireless charging'],
    popular: true,
  },
  {
    id: '2',
    name: 'Smart Fitness Watch',
    description: 'Advanced fitness tracker with heart rate monitoring, GPS, and smartphone connectivity',
    price: 249.99,
    image_url: 'https://picsum.photos/800/600?random=2',
    category: 'electronics',
    features: ['Heart rate monitor', 'GPS tracking', 'Water resistant'],
    popular: false,
  },
  {
    id: '3',
    name: 'Portable Bluetooth Speaker',
    description: 'Waterproof portable speaker with 360-degree sound and 12-hour playtime',
    price: 89.99,
    image_url: 'https://picsum.photos/800/600?random=3',
    category: 'electronics',
    features: ['Waterproof', '360° sound', '12-hour battery'],
    popular: true,
    discount: 15,
  },
  {
    id: '4',
    name: 'Wireless Phone Charger',
    description: 'Fast wireless charging pad compatible with all Qi-enabled devices',
    price: 39.99,
    image_url: 'https://picsum.photos/800/600?random=4',
    category: 'electronics',
    features: ['Fast charging', 'Universal compatibility', 'LED indicator'],
    popular: false,
  },

  // Fashion Category
  {
    id: '5',
    name: 'Premium Cotton T-Shirt',
    description: 'Soft, comfortable 100% organic cotton t-shirt in various colors and sizes',
    price: 29.99,
    image_url: 'https://picsum.photos/800/600?random=5',
    category: 'fashion',
    features: ['100% organic cotton', 'Multiple colors', 'Pre-shrunk'],
    popular: true,
  },
  {
    id: '6',
    name: 'Designer Denim Jeans',
    description: 'Classic fit denim jeans with premium stitching and comfortable stretch fabric',
    price: 79.99,
    image_url: 'https://picsum.photos/800/600?random=6',
    category: 'fashion',
    features: ['Stretch fabric', 'Classic fit', 'Premium denim'],
    popular: true,
    discount: 20,
  },
  {
    id: '7',
    name: 'Leather Crossbody Bag',
    description: 'Handcrafted genuine leather crossbody bag with adjustable strap and multiple compartments',
    price: 149.99,
    image_url: 'https://picsum.photos/800/600?random=7',
    category: 'fashion',
    features: ['Genuine leather', 'Multiple compartments', 'Adjustable strap'],
    popular: false,
  },

  // Home & Garden Category
  {
    id: '8',
    name: 'Smart LED Light Bulbs (4-Pack)',
    description: 'WiFi-enabled smart bulbs with 16 million colors and voice control compatibility',
    price: 59.99,
    image_url: 'https://picsum.photos/800/600?random=8',
    category: 'home',
    features: ['16M colors', 'Voice control', 'Energy efficient'],
    popular: false,
  },
  {
    id: '9',
    name: 'Ceramic Plant Pot Set',
    description: 'Set of 3 modern ceramic planters with drainage holes and saucers',
    price: 45.99,
    image_url: 'https://picsum.photos/800/600?random=9',
    category: 'home',
    features: ['Drainage holes', 'Modern design', 'Set of 3'],
    popular: true,
  },
  {
    id: '10',
    name: 'Memory Foam Pillow',
    description: 'Ergonomic memory foam pillow with cooling gel layer for better sleep',
    price: 69.99,
    image_url: 'https://picsum.photos/800/600?random=10',
    category: 'home',
    features: ['Memory foam', 'Cooling gel', 'Ergonomic design'],
    popular: true,
    discount: 10,
  },

  // Sports & Fitness Category
  {
    id: '11',
    name: 'Yoga Mat with Carrying Strap',
    description: 'Non-slip yoga mat made from eco-friendly materials with alignment guides',
    price: 34.99,
    image_url: 'https://picsum.photos/800/600?random=11',
    category: 'sports',
    features: ['Non-slip surface', 'Eco-friendly', 'Alignment guides'],
    popular: true,
  },
  {
    id: '12',
    name: 'Adjustable Dumbbells Set',
    description: 'Space-saving adjustable dumbbells with quick-change weight system (5-50 lbs each)',
    price: 299.99,
    image_url: 'https://picsum.photos/800/600?random=12',
    category: 'sports',
    features: ['5-50 lbs range', 'Quick-change', 'Space-saving'],
    popular: false,
    discount: 25,
  },
  {
    id: '13',
    name: 'Resistance Bands Set',
    description: 'Complete resistance training set with 5 bands, handles, and door anchor',
    price: 24.99,
    image_url: 'https://picsum.photos/800/600?random=13',
    category: 'sports',
    features: ['5 resistance levels', 'Door anchor included', 'Portable'],
    popular: true,
  },

  // Books & Media Category
  {
    id: '14',
    name: 'Bestselling Novel Collection',
    description: 'Set of 5 current bestselling novels from award-winning authors',
    price: 89.99,
    image_url: 'https://picsum.photos/800/600?random=14',
    category: 'books',
    features: ['5 bestsellers', 'Award-winning authors', 'Hardcover editions'],
    popular: true,
  },
  {
    id: '15',
    name: 'Vintage Vinyl Record',
    description: 'Classic rock vinyl record in mint condition with original album artwork',
    price: 34.99,
    image_url: 'https://picsum.photos/800/600?random=15',
    category: 'books',
    features: ['Mint condition', 'Original artwork', 'Classic rock'],
    popular: false,
    discount: 15,
  },
];