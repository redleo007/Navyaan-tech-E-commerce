import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";

const CategoryPage = () => {
  const { name } = useParams<{ name: string }>();
  const filtered = products.filter((p) => p.category === name);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container py-10 space-y-8 flex-1">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
          <span>/</span>
          <span className="text-foreground">{name}</span>
        </div>
        <h1 className="text-3xl font-bold text-foreground">{name}</h1>
        {filtered.length === 0 ? (
          <p className="text-center text-muted-foreground py-20">No products in this category.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default CategoryPage;
