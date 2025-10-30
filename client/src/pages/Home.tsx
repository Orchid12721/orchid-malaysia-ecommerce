import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Search, User, Heart, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { categoryStore, productStore, Category, Product } from "@/lib/store";

export default function Home() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load data from localStorage
    setCategories(categoryStore.getAll());
    setFeaturedProducts(productStore.getFeatured());
    setLoading(false);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Announcement Bar */}
      <div className="bg-black text-white text-center py-2.5 text-sm font-medium tracking-wide">
        Free shipping on orders over $50
      </div>

      {/* Header - Enhanced Horizon Style */}
      <header className="border-b sticky top-0 z-50 bg-white/95 backdrop-blur-sm">
        <div className="container">
          <div className="flex items-center justify-between h-20">
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Logo */}
            <Link href="/">
              <a className="text-2xl md:text-3xl font-bold tracking-tighter hover:opacity-70 transition">
                ORCHID MALAYSIA
              </a>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-10">
              <Link href="/products">
                <a className="text-sm font-medium tracking-wide hover:opacity-60 transition-opacity">
                  SHOP ALL
                </a>
              </Link>
              <Link href="/categories">
                <a className="text-sm font-medium tracking-wide hover:opacity-60 transition-opacity">
                  CATEGORIES
                </a>
              </Link>
              <Link href="/admin">
                <a className="text-sm font-medium tracking-wide hover:opacity-60 transition-opacity">
                  ADMIN
                </a>
              </Link>
            </nav>

            {/* Icon Actions */}
            <div className="flex items-center gap-2 md:gap-4">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition" aria-label="Search">
                <Search className="w-5 h-5" />
              </button>
              <button className="hidden md:block p-2 hover:bg-gray-100 rounded-lg transition" aria-label="Account">
                <User className="w-5 h-5" />
              </button>
              <button className="hidden md:block p-2 hover:bg-gray-100 rounded-lg transition" aria-label="Wishlist">
                <Heart className="w-5 h-5" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition relative" aria-label="Cart">
                <ShoppingBag className="w-5 h-5" />
                <span className="absolute top-0 right-0 bg-black text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium">
                  0
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t bg-white animate-scale-in">
            <nav className="container py-6 space-y-4">
              <Link href="/products">
                <a className="block text-base font-medium tracking-wide hover:opacity-60 transition">
                  SHOP ALL
                </a>
              </Link>
              <Link href="/categories">
                <a className="block text-base font-medium tracking-wide hover:opacity-60 transition">
                  CATEGORIES
                </a>
              </Link>
              <div className="pt-4 border-t">
                <Link href="/admin">
                  <a className="block text-sm text-gray-600 hover:text-black transition">
                    Admin Panel
                  </a>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section - Ultra Clean */}
      <section className="relative min-h-[70vh] md:min-h-[85vh] bg-gradient-to-br from-gray-50 to-gray-100 flex items-center">
        <div className="container">
          <div className="max-w-2xl animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-[1.1] tracking-tight">
              Discover<br />Beautiful<br />Fashion
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-10 leading-relaxed max-w-lg">
              Traditional and modern clothing from Pakistan, Indonesia, Thailand, Malaysia, and beyond.
            </p>
            <Button 
              size="lg" 
              className="bg-black hover:bg-gray-800 text-white px-10 h-14 text-base font-medium tracking-wide rounded-none transition-all hover:scale-105"
            >
              SHOP COLLECTION
            </Button>
          </div>
        </div>
      </section>

      {/* Categories Grid - Professional */}
      <section className="py-20 md:py-32">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Shop by Category</h2>
            <p className="text-gray-600 text-lg">Explore our curated collections</p>
          </div>
          
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-10 h-10 border-4 border-gray-200 border-t-black rounded-full animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
              {categories.filter(c => c.isActive).map((category, index) => (
                <Link key={category.id} href={`/category/${category.slug}`}>
                  <div 
                    className="group cursor-pointer animate-fade-in-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="aspect-[3/4] bg-gray-100 mb-5 overflow-hidden relative">
                      {category.imageUrl ? (
                        <img
                          src={category.imageUrl}
                          alt={category.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                          <ShoppingBag className="w-20 h-20 text-gray-300" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
                    </div>
                    <h3 className="text-lg md:text-xl font-semibold text-center tracking-wide group-hover:opacity-60 transition-opacity">
                      {category.name}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Featured Products - Premium */}
      <section className="py-20 md:py-32 bg-gray-50">
        <div className="container">
          <div className="flex items-end justify-between mb-16">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-3 tracking-tight">Featured Products</h2>
              <p className="text-gray-600">Handpicked favorites</p>
            </div>
            <Link href="/products">
              <a className="text-sm font-medium tracking-wide underline underline-offset-4 hover:opacity-60 transition-opacity hidden md:block">
                VIEW ALL
              </a>
            </Link>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-10 h-10 border-4 border-gray-200 border-t-black rounded-full animate-spin" />
            </div>
          ) : featuredProducts.length === 0 ? (
            <div className="text-center py-20">
              <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No featured products yet</p>
              <Link href="/admin">
                <Button variant="outline" className="mt-6 rounded-none px-8">
                  ADD PRODUCTS IN ADMIN
                </Button>
              </Link>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                {featuredProducts.map((product, index) => (
                  <Link key={product.id} href={`/product/${product.slug}`}>
                    <div 
                      className="group cursor-pointer animate-fade-in-up"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="aspect-[3/4] bg-white mb-5 overflow-hidden relative">
                        {product.imageUrl ? (
                          <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
                            <ShoppingBag className="w-20 h-20 text-gray-300" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
                      </div>
                      <h3 className="font-medium mb-2 line-clamp-2 leading-snug group-hover:opacity-60 transition-opacity">
                        {product.name}
                      </h3>
                      <div className="flex items-center gap-3">
                        <span className="font-semibold text-lg">
                          ${(product.price / 100).toFixed(2)}
                        </span>
                        {product.compareAtPrice && (
                          <span className="text-sm text-gray-400 line-through">
                            ${(product.compareAtPrice / 100).toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="text-center mt-12 md:hidden">
                <Link href="/products">
                  <Button variant="outline" className="rounded-none px-8">
                    VIEW ALL PRODUCTS
                  </Button>
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Newsletter - Elegant */}
      <section className="py-20 md:py-32 bg-black text-white">
        <div className="container text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">Stay in the know</h2>
          <p className="text-gray-400 mb-10 text-lg">Subscribe to get special offers and exclusive updates</p>
          <div className="max-w-md mx-auto flex gap-0">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 bg-white text-black focus:outline-none focus:ring-2 focus:ring-white/20 text-base"
            />
            <Button className="bg-white text-black hover:bg-gray-200 px-10 h-auto font-medium tracking-wide transition-all hover:scale-105">
              SUBSCRIBE
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 border-t py-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
              <h3 className="font-bold text-xl mb-4 tracking-tight">ORCHID MALAYSIA</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Your destination for beautiful traditional and modern fashion.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 tracking-wide">SHOP</h4>
              <ul className="space-y-3 text-sm text-gray-600">
                <li><Link href="/products"><a className="hover:text-black transition">All Products</a></Link></li>
                <li><Link href="/categories"><a className="hover:text-black transition">Categories</a></Link></li>
                <li><Link href="/admin"><a className="hover:text-black transition">Admin Panel</a></Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 tracking-wide">SUPPORT</h4>
              <ul className="space-y-3 text-sm text-gray-600">
                <li><a href="#" className="hover:text-black transition">Contact Us</a></li>
                <li><a href="#" className="hover:text-black transition">FAQs</a></li>
                <li><a href="#" className="hover:text-black transition">Shipping</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 tracking-wide">FOLLOW US</h4>
              <ul className="space-y-3 text-sm text-gray-600">
                <li><a href="#" className="hover:text-black transition">Facebook</a></li>
                <li><a href="#" className="hover:text-black transition">Instagram</a></li>
                <li><a href="#" className="hover:text-black transition">Twitter</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-12 pt-8 text-center text-sm text-gray-500">
            <p>&copy; 2024 Orchid Malaysia. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
