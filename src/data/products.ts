export type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  rating: number;
  description: string;
};

export const categories = [
  "Keyboards",
  "Mouse",
  "Bags",
  "Chargers",
  "Accessories",
] as const;

export type Category = (typeof categories)[number];

export const products: Product[] = [
  { id: 1, name: "Mechanical Keyboard Pro", price: 12499, category: "Keyboards", image: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=600&q=80&fit=crop", rating: 4.8, description: "Premium mechanical keyboard with Cherry MX switches and RGB backlighting." },
  { id: 2, name: "Wireless Compact Keyboard", price: 7499, category: "Keyboards", image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&q=80&fit=crop", rating: 4.5, description: "Slim wireless keyboard with Bluetooth 5.0 connectivity." },
  { id: 3, name: "Ergonomic Split Keyboard", price: 16999, category: "Keyboards", image: "https://images.unsplash.com/photo-1595225476474-87563907a212?w=600&q=80&fit=crop", rating: 4.7, description: "Split ergonomic design to reduce wrist strain." },
  { id: 4, name: "Gaming Keyboard RGB", price: 10999, category: "Keyboards", image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=600&q=80&fit=crop", rating: 4.6, description: "Gaming keyboard with per-key RGB and macro support." },
  { id: 5, name: "Precision Wireless Mouse", price: 6499, category: "Mouse", image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&q=80&fit=crop", rating: 4.9, description: "High-precision wireless mouse with 16000 DPI sensor." },
  { id: 6, name: "Ergonomic Vertical Mouse", price: 4999, category: "Mouse", image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=600&q=80&fit=crop", rating: 4.4, description: "Vertical design for natural hand positioning." },
  { id: 7, name: "Gaming Mouse Ultra", price: 8499, category: "Mouse", image: "https://images.unsplash.com/photo-1623820919239-0d0ff10797a1?w=600&q=80&fit=crop", rating: 4.7, description: "Ultra-lightweight gaming mouse with adjustable weights." },
  { id: 8, name: "Bluetooth Travel Mouse", price: 3299, category: "Mouse", image: "https://images.unsplash.com/photo-1586816879360-004f5b0c51e3?w=600&q=80&fit=crop", rating: 4.3, description: "Compact Bluetooth mouse perfect for travel." },
  { id: 9, name: "Laptop Backpack Pro", price: 9999, category: "Bags", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80&fit=crop", rating: 4.8, description: "Water-resistant backpack with padded laptop compartment." },
  { id: 10, name: "Messenger Bag Classic", price: 7499, category: "Bags", image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80&fit=crop", rating: 4.5, description: "Classic messenger bag with multiple compartments." },
  { id: 11, name: "Tech Organizer Pouch", price: 2899, category: "Bags", image: "https://images.unsplash.com/photo-1491637639811-60e2756cc1c7?w=600&q=80&fit=crop", rating: 4.6, description: "Keep all your cables and accessories organized." },
  { id: 12, name: "USB-C Fast Charger 65W", price: 4199, category: "Chargers", image: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=600&q=80&fit=crop", rating: 4.7, description: "GaN charger with 65W output for laptops and phones." },
  { id: 13, name: "Wireless Charging Pad", price: 2499, category: "Chargers", image: "https://images.unsplash.com/photo-1615526675159-e248c68ef0fb?w=600&q=80&fit=crop", rating: 4.4, description: "Qi wireless charging pad with fast charge support." },
  { id: 14, name: "Multi-Port Charging Station", price: 5799, category: "Chargers", image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=600&q=80&fit=crop", rating: 4.6, description: "Charge up to 4 devices simultaneously." },
  { id: 15, name: "Laptop Stand Aluminum", price: 4999, category: "Accessories", image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&q=80&fit=crop", rating: 4.8, description: "Adjustable aluminum stand for better ergonomics." },
  { id: 16, name: "USB-C Hub 7-in-1", price: 3699, category: "Accessories", image: "https://images.unsplash.com/photo-1625842268584-8f3296236761?w=600&q=80&fit=crop", rating: 4.5, description: "Expand your ports with HDMI, USB-A, SD card, and more." },
  { id: 17, name: "Desk Mat XL", price: 2099, category: "Accessories", image: "https://images.unsplash.com/photo-1616628188550-808682f3926d?w=600&q=80&fit=crop", rating: 4.6, description: "Extra-large desk mat with stitched edges." },
  { id: 18, name: "Webcam HD 1080p", price: 5799, category: "Accessories", image: "https://images.unsplash.com/photo-1587826080692-f439cd0b70da?w=600&q=80&fit=crop", rating: 4.4, description: "Full HD webcam with auto-focus and noise-cancelling mic." },
];
