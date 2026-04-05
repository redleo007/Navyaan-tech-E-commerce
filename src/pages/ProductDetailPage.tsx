import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Star, Plus, Minus, ArrowLeft, Heart } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";

const ProductDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const [quantity, setQuantity] = useState(1);
  const fallbackImage = "/common-thumbnail.svg";
  const wishlisted = products.find((p) => p.id === Number(id)) ? isInWishlist(Number(id)) : false;
  const product = products.find((p) => p.id === Number(id));

  const addSelectedQuantityToCart = () => {
    if (!product) return;
    for (let count = 0; count < quantity; count += 1) {
      addToCart(product);
    }
  };

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
      <div className="container py-8 md:py-10 space-y-8 md:space-y-12 flex-1">
        <Link to="/products" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to Products
        </Link>

        <div className="grid md:grid-cols-2 gap-10">
          <div className="aspect-square rounded-2xl overflow-hidden bg-secondary">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = fallbackImage;
              }}
            />
          </div>
          <div className="space-y-5 md:space-y-6 flex flex-col justify-center">
            <p className="text-sm uppercase tracking-widest text-muted-foreground">{product.category}</p>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">{product.name}</h1>
            <div className="flex items-center gap-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`h-4 w-4 ${i < Math.round(product.rating) ? "fill-amber-400 text-amber-400" : "text-border"}`} />
              ))}
              <span className="text-sm text-muted-foreground">{product.rating} rating</span>
            </div>
            <p className="text-muted-foreground leading-relaxed">{product.description}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div className="rounded-xl border p-3 bg-card">
                <p className="text-muted-foreground">Brand</p>
                <p className="font-medium text-card-foreground">{product.brand}</p>
              </div>
              <div className="rounded-xl border p-3 bg-card">
                <p className="text-muted-foreground">SKU</p>
                <p className="font-medium text-card-foreground">{product.sku}</p>
              </div>
              <div className="rounded-xl border p-3 bg-card">
                <p className="text-muted-foreground">Availability</p>
                <p className={`font-medium ${product.stock > 10 ? "text-foreground" : "text-amber-600"}`}>
                  {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
                </p>
              </div>
              <div className="rounded-xl border p-3 bg-card">
                <p className="text-muted-foreground">Warranty</p>
                <p className="font-medium text-card-foreground">{product.warranty}</p>
              </div>
            </div>

            <div className="rounded-xl border p-4 bg-card space-y-2">
              <p className="text-sm font-medium text-card-foreground">Highlights</p>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-5">
                {product.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
              <p className="text-xs text-muted-foreground pt-1">{product.delivery}</p>
            </div>

            <p className="text-2xl sm:text-3xl font-bold text-foreground">₹{product.price.toLocaleString("en-IN")}</p>
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 border rounded-full px-1">
                <button
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                  className="h-9 w-9 flex items-center justify-center text-muted-foreground hover:text-foreground"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="text-sm font-medium w-7 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity((prev) => Math.min(10, prev + 1))}
                  className="h-9 w-9 flex items-center justify-center text-muted-foreground hover:text-foreground"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              <button
                onClick={addSelectedQuantityToCart}
                className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 sm:px-8 py-3 rounded-full text-sm font-medium hover:opacity-90 transition-opacity w-full sm:w-auto"
              >
                <Plus className="h-4 w-4" /> Add to Cart
              </button>

              <button
                onClick={() => {
                  addSelectedQuantityToCart();
                  navigate("/checkout");
                }}
                className="inline-flex items-center justify-center gap-2 border px-6 py-3 rounded-full text-sm font-medium hover:bg-secondary transition-colors w-full sm:w-auto"
              >
                Buy Now
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
