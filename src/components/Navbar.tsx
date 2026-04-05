import { Link } from "react-router-dom";
import { ShoppingBag, Search, Menu, X, Heart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import logo from "@/assets/logo.png";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Products" },
  { to: "/category/Keyboards", label: "Keyboards" },
  { to: "/category/Mouse", label: "Mouse" },
  { to: "/category/Bags", label: "Bags" },
];

const Navbar = () => {
  const { totalItems, wishlist } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b">
      <div className="container flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Navyaan Techs" className="h-8 w-8 object-contain" width={32} height={32} />
          <span className="text-xl font-semibold tracking-tight">Navyaan Techs</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <Link key={l.to} to={l.to} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <Link to="/products" className="text-muted-foreground hover:text-foreground transition-colors">
            <Search className="h-5 w-5" />
          </Link>
          <Link to="/wishlist" className="relative text-muted-foreground hover:text-foreground transition-colors">
            <Heart className="h-5 w-5" />
            {wishlist.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground text-[10px] font-medium w-4 h-4 rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </Link>
          <Link to="/cart" className="relative text-muted-foreground hover:text-foreground transition-colors">
            <ShoppingBag className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-[10px] font-medium w-4 h-4 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
          <button className="md:hidden text-foreground" onClick={() => setOpen(!open)}>
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t bg-background pb-4">
          {navLinks.map((l) => (
            <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="block px-6 py-3 text-sm text-muted-foreground hover:text-foreground transition-colors">
              {l.label}
            </Link>
          ))}
          <Link to="/cart" onClick={() => setOpen(false)} className="block px-6 py-3 text-sm text-muted-foreground hover:text-foreground transition-colors">Cart</Link>
          <Link to="/wishlist" onClick={() => setOpen(false)} className="block px-6 py-3 text-sm text-muted-foreground hover:text-foreground transition-colors">Wishlist</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
