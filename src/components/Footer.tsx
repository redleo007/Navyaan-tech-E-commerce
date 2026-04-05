import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

const Footer = () => (
  <footer className="border-t bg-secondary/50 mt-20">
    <div className="container py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
      <div>
        <div className="flex items-center gap-2 mb-3">
          <img src={logo} alt="Navyaan Techs" className="h-7 w-7 object-contain" width={28} height={28} />
          <h4 className="font-semibold text-foreground">Navyaan Techs</h4>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">Premium tech accessories for your everyday workflow.</p>
      </div>
      <div>
        <h4 className="font-semibold text-foreground mb-3">Shop</h4>
        <div className="flex flex-col gap-2">
          {["Keyboards", "Mouse", "Bags", "Chargers", "Accessories"].map((c) => (
            <Link key={c} to={`/category/${c}`} className="text-sm text-muted-foreground hover:text-foreground transition-colors">{c}</Link>
          ))}
        </div>
      </div>
      <div>
        <h4 className="font-semibold text-foreground mb-3">Support</h4>
        <div className="flex flex-col gap-2 text-sm text-muted-foreground">
          <span>help@navyantechs.com</span>
          <span>+91 1800-NAVYAN</span>
        </div>
      </div>
    </div>
    <div className="border-t">
      <div className="container py-6 text-center text-xs text-muted-foreground">
        © 2026 Navyaan Techs. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
