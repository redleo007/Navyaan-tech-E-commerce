import { Link } from "react-router-dom";
import { Truck, ShieldCheck, RotateCcw, ArrowRight } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { products, categories } from "@/data/products";

const features = [
  { icon: Truck, title: "Free Shipping", desc: "On orders over $50" },
  { icon: ShieldCheck, title: "Secure Payment", desc: "100% protected checkout" },
  { icon: RotateCcw, title: "Easy Returns", desc: "30-day return policy" },
];

const categoryImages: Record<string, string> = {
  Keyboards: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=400&q=80",
  Mouse: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&q=80",
  Bags: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=80",
  Chargers: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=400&q=80",
  Accessories: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&q=80",
};

const Index = () => {
  const featured = products.slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="relative bg-secondary">
        <div className="container py-24 md:py-32 text-center space-y-6">
          <p className="text-sm uppercase tracking-widest text-muted-foreground">Premium Tech Accessories</p>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground leading-tight">
            Gear Up Your<br />Workspace
          </h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            Curated collection of keyboards, mice, bags, and accessories designed for modern professionals.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Shop Now <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Categories */}
      <section className="container py-16 space-y-8">
        <h2 className="text-2xl font-semibold text-foreground">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat}
              to={`/category/${cat}`}
              className="group relative aspect-square rounded-2xl overflow-hidden"
            >
              <img src={categoryImages[cat]} alt={cat} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
              <div className="absolute inset-0 bg-foreground/40 flex items-end p-4">
                <span className="text-primary-foreground font-medium text-sm">{cat}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="container py-16 space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-foreground">Featured Products</h2>
          <Link to="/products" className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
            View All <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((f) => (
            <div key={f.title} className="flex items-start gap-4 p-6 rounded-2xl bg-secondary">
              <div className="h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center shrink-0">
                <f.icon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-medium text-foreground">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
