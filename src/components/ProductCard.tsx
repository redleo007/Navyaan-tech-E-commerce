import { Star, Plus, Heart } from "lucide-react";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { Link } from "react-router-dom";

const ProductCard = ({ product }: { product: Product }) => {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const wishlisted = isInWishlist(product.id);
  const fallbackImage = "/common-thumbnail.svg";

  return (
    <div className="group rounded-2xl bg-card border overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <Link to={`/product/${product.id}`} className="block aspect-[4/3] overflow-hidden bg-secondary relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = fallbackImage;
          }}
        />
      </Link>
      <div className="p-4 space-y-2">
        <div className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground uppercase tracking-wider">{product.category}</p>
          <button
            onClick={() => toggleWishlist(product)}
            className="text-muted-foreground hover:text-destructive transition-colors"
          >
            <Heart className={`h-4 w-4 ${wishlisted ? "fill-destructive text-destructive" : ""}`} />
          </button>
        </div>
        <Link to={`/product/${product.id}`} className="block">
          <h3 className="font-medium text-card-foreground leading-snug line-clamp-1">{product.name}</h3>
        </Link>
        <p className="text-xs text-muted-foreground">{product.brand}</p>
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-3 w-3 ${i < Math.round(product.rating) ? "fill-amber-400 text-amber-400" : "text-border"}`}
            />
          ))}
          <span className="text-xs text-muted-foreground ml-1">{product.rating}</span>
        </div>
        <div className="flex items-center justify-between pt-1">
          <div>
            <span className="font-semibold text-card-foreground block">₹{product.price.toLocaleString("en-IN")}</span>
            <span className="text-[11px] text-muted-foreground">{product.stock > 0 ? `${product.stock} left` : "Out of stock"}</span>
          </div>
          <button
            onClick={() => addToCart(product)}
            className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:opacity-90 transition-opacity"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
