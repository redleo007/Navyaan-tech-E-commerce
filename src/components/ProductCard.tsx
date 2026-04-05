import { Star, Plus } from "lucide-react";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { Link } from "react-router-dom";

const ProductCard = ({ product }: { product: Product }) => {
  const { addToCart } = useCart();

  return (
    <div className="group rounded-2xl bg-card border overflow-hidden transition-shadow hover:shadow-lg">
      <Link to={`/product/${product.id}`} className="block aspect-square overflow-hidden bg-secondary">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </Link>
      <div className="p-4 space-y-2">
        <p className="text-xs text-muted-foreground uppercase tracking-wider">{product.category}</p>
        <Link to={`/product/${product.id}`} className="block">
          <h3 className="font-medium text-card-foreground leading-snug line-clamp-1">{product.name}</h3>
        </Link>
        <div className="flex items-center gap-1">
          <Star className="h-3.5 w-3.5 fill-foreground text-foreground" />
          <span className="text-xs text-muted-foreground">{product.rating}</span>
        </div>
        <div className="flex items-center justify-between pt-1">
          <span className="font-semibold text-card-foreground">${product.price.toFixed(2)}</span>
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
