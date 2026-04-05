import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle2, CreditCard, Landmark, Smartphone, Wallet, ShieldCheck } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";

type PaymentMethod = "cod" | "upi" | "card" | "netbanking" | "wallet";

const CheckoutPage = () => {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState<"form" | "success">("form");
  const [paymentError, setPaymentError] = useState("");
  const shipping = totalPrice >= 2000 ? 0 : 99;
  const grandTotal = totalPrice + shipping;
  const fallbackImage = "/common-thumbnail.svg";

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
    payment: "cod" as PaymentMethod,
    upiId: "",
    cardNumber: "",
    cardName: "",
    cardExpiry: "",
    cardCvv: "",
    bank: "",
    walletProvider: "",
  });

  const paymentOptions: { value: PaymentMethod; label: string; desc: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { value: "upi", label: "UPI", desc: "Google Pay, PhonePe, Paytm and other UPI apps", icon: Smartphone },
    { value: "card", label: "Credit / Debit Card", desc: "Visa, Mastercard, RuPay, Amex", icon: CreditCard },
    { value: "netbanking", label: "Net Banking", desc: "All major Indian banks", icon: Landmark },
    { value: "wallet", label: "Wallets", desc: "Paytm, Amazon Pay and more", icon: Wallet },
    { value: "cod", label: "Cash on Delivery", desc: "Pay when your order arrives", icon: ShieldCheck },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (e.target.name === "payment") {
      setPaymentError("");
    }
  };

  const validatePaymentDetails = () => {
    if (form.payment === "upi" && !form.upiId.trim()) return "Please enter a valid UPI ID.";
    if (form.payment === "card") {
      if (!form.cardNumber.trim() || !form.cardName.trim() || !form.cardExpiry.trim() || !form.cardCvv.trim()) {
        return "Please complete all card details.";
      }
    }
    if (form.payment === "netbanking" && !form.bank) return "Please select your bank.";
    if (form.payment === "wallet" && !form.walletProvider) return "Please select a wallet provider.";
    return "";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const paymentValidationError = validatePaymentDetails();
    if (paymentValidationError) {
      setPaymentError(paymentValidationError);
      return;
    }
    clearCart();
    setStep("success");
  };

  if (items.length === 0 && step !== "success") {
    navigate("/cart", { replace: true });
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
      <div className="container py-8 md:py-10 flex-1 space-y-6 md:space-y-8">
        <Link to="/cart" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to Cart
        </Link>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">Checkout</h1>

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
              <div className="flex items-center justify-between gap-2">
                <h2 className="font-semibold text-card-foreground">Payment Method</h2>
                <p className="text-xs text-muted-foreground inline-flex items-center gap-1">
                  <ShieldCheck className="h-3.5 w-3.5" /> Secure checkout
                </p>
              </div>
              <div className="space-y-3">
                {paymentOptions.map((opt) => (
                  <label key={opt.value} className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${form.payment === opt.value ? "border-primary bg-secondary" : "hover:bg-secondary/50"}`}>
                    <input type="radio" name="payment" value={opt.value} checked={form.payment === opt.value} onChange={handleChange} className="accent-primary" />
                    <opt.icon className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <span>
                      <span className="text-sm text-card-foreground block">{opt.label}</span>
                      <span className="text-xs text-muted-foreground">{opt.desc}</span>
                    </span>
                  </label>
                ))}
              </div>

              {form.payment === "upi" && (
                <div className="space-y-2">
                  <label className="text-sm text-card-foreground">UPI ID</label>
                  <input
                    name="upiId"
                    placeholder="example@upi"
                    value={form.upiId}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
              )}

              {form.payment === "card" && (
                <div className="grid sm:grid-cols-2 gap-4">
                  <input
                    name="cardNumber"
                    placeholder="Card Number"
                    value={form.cardNumber}
                    onChange={handleChange}
                    className="sm:col-span-2 w-full px-4 py-2.5 rounded-xl border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                  <input
                    name="cardName"
                    placeholder="Name on Card"
                    value={form.cardName}
                    onChange={handleChange}
                    className="sm:col-span-2 w-full px-4 py-2.5 rounded-xl border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                  <input
                    name="cardExpiry"
                    placeholder="MM/YY"
                    value={form.cardExpiry}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                  <input
                    name="cardCvv"
                    placeholder="CVV"
                    value={form.cardCvv}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
              )}

              {form.payment === "netbanking" && (
                <div className="space-y-2">
                  <label className="text-sm text-card-foreground">Select Bank</label>
                  <select
                    name="bank"
                    value={form.bank}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="">Choose a bank</option>
                    <option value="sbi">State Bank of India</option>
                    <option value="hdfc">HDFC Bank</option>
                    <option value="icici">ICICI Bank</option>
                    <option value="axis">Axis Bank</option>
                  </select>
                </div>
              )}

              {form.payment === "wallet" && (
                <div className="space-y-2">
                  <label className="text-sm text-card-foreground">Select Wallet</label>
                  <select
                    name="walletProvider"
                    value={form.walletProvider}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="">Choose a wallet</option>
                    <option value="amazonpay">Amazon Pay</option>
                    <option value="paytm">Paytm</option>
                    <option value="mobikwik">MobiKwik</option>
                  </select>
                </div>
              )}

              {form.payment === "cod" && (
                <p className="text-xs text-muted-foreground rounded-xl border bg-background p-3">
                  Cash on Delivery is available for this order. Keep exact change ready for faster delivery handoff.
                </p>
              )}

              {paymentError && <p className="text-sm text-destructive">{paymentError}</p>}
            </div>
          </div>

          {/* Summary */}
          <div>
            <div className="rounded-2xl border bg-card p-6 space-y-4 lg:sticky lg:top-24">
              <h2 className="font-semibold text-card-foreground">Order Summary</h2>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg overflow-hidden bg-secondary shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = fallbackImage;
                        }}
                      />
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
