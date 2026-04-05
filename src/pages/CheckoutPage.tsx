import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";

const CheckoutPage = () => {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState<"form" | "success">("form");
  const shipping = totalPrice >= 2000 ? 0 : 99;
  const grandTotal = totalPrice + shipping;

  const [form, setForm] = useState({
    name: "", email: "", phone: "", address: "", city: "", pincode: "", payment: "cod",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    clearCart();
    setStep("success");
  };

  if (items.length === 0 && step !== "success") {
    navigate("/cart");
    return null;
  }

  if (step === "success") {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container flex-1 flex flex-col items-center justify-center gap-4 py-20 text-center">
          <CheckCircle2 className="h-20 w-20 text-green-500" />
          <h1 className="text-3xl font-bold text-foreground">Order Placed!</h1>
          <p className="text-muted-foreground max-w-md">
            Thank you for your order. We'll send a confirmation to your email shortly.
          </p>
          <Link to="/products" className="mt-4 inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2.5 rounded-full text-sm font-medium hover:opacity-90 transition-opacity">
            Continue Shopping
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
        <Link to="/cart" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to Cart
        </Link>
        <h1 className="text-3xl font-bold text-foreground">Checkout</h1>

        <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping */}
            <div className="rounded-2xl border bg-card p-6 space-y-4">
              <h2 className="font-semibold text-card-foreground">Shipping Details</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <input name="name" required placeholder="Full Name" value={form.name} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                <input name="email" type="email" required placeholder="Email" value={form.email} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                <input name="phone" required placeholder="Phone Number" value={form.phone} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                <input name="pincode" required placeholder="PIN Code" value={form.pincode} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                <input name="address" required placeholder="Address" value={form.address} onChange={handleChange} className="sm:col-span-2 w-full px-4 py-2.5 rounded-xl border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                <input name="city" required placeholder="City" value={form.city} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
              </div>
            </div>

            {/* Payment */}
            <div className="rounded-2xl border bg-card p-6 space-y-4">
              <h2 className="font-semibold text-card-foreground">Payment Method</h2>
              <div className="space-y-3">
                {[
                  { value: "cod", label: "Cash on Delivery" },
                  { value: "upi", label: "UPI / Google Pay / PhonePe" },
                  { value: "card", label: "Credit / Debit Card" },
                  { value: "netbanking", label: "Net Banking" },
                ].map((opt) => (
                  <label key={opt.value} className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${form.payment === opt.value ? "border-primary bg-secondary" : "hover:bg-secondary/50"}`}>
                    <input type="radio" name="payment" value={opt.value} checked={form.payment === opt.value} onChange={handleChange} className="accent-primary" />
                    <span className="text-sm text-card-foreground">{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Summary */}
          <div>
            <div className="rounded-2xl border bg-card p-6 space-y-4 sticky top-24">
              <h2 className="font-semibold text-card-foreground">Order Summary</h2>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg overflow-hidden bg-secondary shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-card-foreground line-clamp-1">{item.name}</p>
                      <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                    <span className="text-xs font-medium text-card-foreground">₹{(item.price * item.quantity).toLocaleString("en-IN")}</span>
                  </div>
                ))}
              </div>
              <div className="border-t pt-3 space-y-2 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span>₹{totalPrice.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? "Free" : `₹${shipping}`}</span>
                </div>
                <div className="flex justify-between font-semibold text-card-foreground border-t pt-2">
                  <span>Total</span>
                  <span>₹{grandTotal.toLocaleString("en-IN")}</span>
                </div>
              </div>
              <button type="submit" className="w-full bg-primary text-primary-foreground py-3 rounded-full text-sm font-medium hover:opacity-90 transition-opacity">
                Place Order — ₹{grandTotal.toLocaleString("en-IN")}
              </button>
            </div>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default CheckoutPage;
