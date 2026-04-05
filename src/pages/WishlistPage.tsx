import { Link } from "react-router-dom";
import { Heart, ShoppingBag, Trash2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";

const WishlistPage = () => {
  const { wishlist, toggleWishlist, addToCart } = useCart();

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container flex-1 flex flex-col items-center justify-center gap-4 py-20">
          <Heart className="h-16 w-16 text-muted-foreground/30" />
          <h1 className="text-2xl font-semibold text-foreground">Your wishlist is empty</h1>
          <p className="text-muted-foreground">Save items you love for later.</p>
          <Link to="/products" className="mt-4 inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2.5 rounded-full text-sm font-medium hover:opacity-90 transition-opacity">
            Browse Products
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container py-10 flex-1 space-y-8">
        <h1 className="text-3xl font-bold text-foreground">Wishlist ({wishlist.length})</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {wishlist.map((product) => (
            <div key={product.id} className="rounded-2xl bg-card border overflow-hidden">
              <Link to={`/product/${product.id}`} className="block aspect-[4/3] overflow-hidden bg-secondary">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" loading="lazy" />
              </Link>
              <div className="p-4 space-y-3">
                <Link to={`/product/${product.id}`}>
                  <h3 className="font-medium text-card-foreground line-clamp-1">{product.name}</h3>
                </Link>
                <p className="font-semibold text-card-foreground">₹{product.price.toLocaleString("en-IN")}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => addToCart(product)}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 bg-primary text-primary-foreground py-2 rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
                  >
                    <ShoppingBag className="h-3.5 w-3.5" /> Add to Cart
                  </button>
                  <button
                    onClick={() => toggleWishlist(product)}
                    className="h-9 w-9 rounded-full border flex items-center justify-center text-muted-foreground hover:text-destructive hover:border-destructive transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default WishlistPage;
