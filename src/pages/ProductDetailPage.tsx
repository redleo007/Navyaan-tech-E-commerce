import { useParams, Link } from "react-router-dom";
import { Star, Plus, ArrowLeft, Heart } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const wishlisted = products.find((p) => p.id === Number(id)) ? isInWishlist(Number(id)) : false;
  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container flex-1 flex items-center justify-center">
          <p className="text-muted-foreground">Product not found.</p>
        </div>
        <Footer />
      </div>
    );
  }

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container py-10 space-y-12 flex-1">
        <Link to="/products" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to Products
        </Link>

        <div className="grid md:grid-cols-2 gap-10">
          <div className="aspect-square rounded-2xl overflow-hidden bg-secondary">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          </div>
          <div className="space-y-6 flex flex-col justify-center">
            <p className="text-sm uppercase tracking-widest text-muted-foreground">{product.category}</p>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">{product.name}</h1>
            <div className="flex items-center gap-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`h-4 w-4 ${i < Math.round(product.rating) ? "fill-amber-400 text-amber-400" : "text-border"}`} />
              ))}
              <span className="text-sm text-muted-foreground">{product.rating} rating</span>
            </div>
            <p className="text-muted-foreground leading-relaxed">{product.description}</p>
            <p className="text-3xl font-bold text-foreground">₹{product.price.toLocaleString("en-IN")}</p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => addToCart(product)}
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
              >
                <Plus className="h-4 w-4" /> Add to Cart
              </button>
              <button
                onClick={() => toggleWishlist(product)}
                className={`h-11 w-11 rounded-full border flex items-center justify-center transition-colors ${wishlisted ? "border-destructive text-destructive" : "text-muted-foreground hover:text-destructive hover:border-destructive"}`}
              >
                <Heart className={`h-5 w-5 ${wishlisted ? "fill-destructive" : ""}`} />
              </button>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-foreground">Related Products</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetailPage;
