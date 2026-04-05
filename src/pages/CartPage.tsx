import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, ArrowRight, ShoppingBag } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";

const CartPage = () => {
  const { items, removeFromCart, updateQuantity, totalPrice } = useCart();
  const fallbackImage = "/common-thumbnail.svg";

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container flex-1 flex flex-col items-center justify-center gap-4 py-20">
          <ShoppingBag className="h-16 w-16 text-muted-foreground/30" />
          <h1 className="text-2xl font-semibold text-foreground">Your cart is empty</h1>
          <p className="text-muted-foreground">Add some products to get started.</p>
          <Link to="/products" className="mt-4 inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2.5 rounded-full text-sm font-medium hover:opacity-90 transition-opacity">
            Browse Products <ArrowRight className="h-4 w-4" />
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
        <h1 className="text-3xl font-bold text-foreground">Shopping Cart</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex gap-4 p-4 rounded-2xl border bg-card">
                <Link to={`/product/${item.id}`} className="w-24 h-24 rounded-xl overflow-hidden bg-secondary shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = fallbackImage;
                    }}
                  />
                </Link>
                <div className="flex-1 min-w-0 space-y-1">
                  <Link to={`/product/${item.id}`} className="font-medium text-card-foreground line-clamp-1 hover:underline">{item.name}</Link>
                  <p className="text-xs text-muted-foreground">{item.category}</p>
                  <p className="font-semibold text-card-foreground">₹{item.price.toLocaleString("en-IN")}</p>
                </div>
                <div className="flex flex-col items-end justify-between">
                  <button onClick={() => removeFromCart(item.id)} className="text-muted-foreground hover:text-destructive transition-colors">
                    <Trash2 className="h-4 w-4" />
                  </button>
                  <div className="flex items-center gap-2 border rounded-full px-1">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="h-7 w-7 flex items-center justify-center text-muted-foreground hover:text-foreground">
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="text-sm font-medium w-5 text-center">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="h-7 w-7 flex items-center justify-center text-muted-foreground hover:text-foreground">
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl border bg-card p-6 space-y-4">
              <h2 className="font-semibold text-card-foreground">Order Summary</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span>₹{totalPrice.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Shipping</span>
                  <span>{totalPrice >= 2000 ? "Free" : "₹99"}</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-semibold text-card-foreground">
                  <span>Total</span>
                  <span>₹{(totalPrice + (totalPrice >= 2000 ? 0 : 99)).toLocaleString("en-IN")}</span>
                </div>
              </div>
              <Link
                to="/checkout"
                className="w-full inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3 rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
              >
                Proceed to Checkout <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CartPage;
