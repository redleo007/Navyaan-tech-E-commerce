import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="border-t bg-secondary/50 mt-20">
    <div className="container py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
      <div>
        <h4 className="font-semibold text-foreground mb-3">Navyan Techs</h4>
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
        © 2026 Navyan Techs. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
