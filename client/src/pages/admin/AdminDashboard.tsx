import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, FolderTree, Home, Plus } from "lucide-react";
import { categoryStore, productStore } from "@/lib/store";
import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    categories: 0,
    products: 0,
    activeProducts: 0,
    featuredProducts: 0
  });

  useEffect(() => {
    const categories = categoryStore.getAll();
    const products = productStore.getAll();
    
    setStats({
      categories: categories.length,
      products: products.length,
      activeProducts: products.filter(p => p.isActive).length,
      featuredProducts: products.filter(p => p.isFeatured).length
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <Link href="/admin">
                <a className="text-xl font-bold tracking-tight">
                  ORCHID ADMIN
                </a>
              </Link>
              <nav className="hidden md:flex items-center gap-6">
                <Link href="/admin">
                  <a className="text-sm font-medium hover:text-gray-600 transition">
                    Dashboard
                  </a>
                </Link>
                <Link href="/admin/categories">
                  <a className="text-sm font-medium hover:text-gray-600 transition">
                    Categories
                  </a>
                </Link>
                <Link href="/admin/products">
                  <a className="text-sm font-medium hover:text-gray-600 transition">
                    Products
                  </a>
                </Link>
              </nav>
            </div>
            <Link href="/">
              <Button variant="outline" size="sm" className="gap-2">
                <Home className="w-4 h-4" />
                Back to Store
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
          <p className="text-gray-600">Manage your e-commerce store</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total Categories
              </CardTitle>
              <FolderTree className="w-4 h-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.categories}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total Products
              </CardTitle>
              <Package className="w-4 h-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.products}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Active Products
              </CardTitle>
              <Package className="w-4 h-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.activeProducts}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Featured Products
              </CardTitle>
              <Package className="w-4 h-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.featuredProducts}</div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Categories</CardTitle>
              <CardDescription>
                Manage product categories and collections
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Link href="/admin/categories">
                <Button className="w-full gap-2">
                  <FolderTree className="w-4 h-4" />
                  Manage Categories
                </Button>
              </Link>
              <Link href="/admin/categories/new">
                <Button variant="outline" className="w-full gap-2">
                  <Plus className="w-4 h-4" />
                  Add New Category
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Products</CardTitle>
              <CardDescription>
                Add and manage your product catalog
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Link href="/admin/products">
                <Button className="w-full gap-2">
                  <Package className="w-4 h-4" />
                  Manage Products
                </Button>
              </Link>
              <Link href="/admin/products/new">
                <Button variant="outline" className="w-full gap-2">
                  <Plus className="w-4 h-4" />
                  Add New Product
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Info Card */}
        <Card className="mt-6 bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-900">💡 Getting Started</CardTitle>
          </CardHeader>
          <CardContent className="text-blue-800 space-y-2">
            <p>• Categories are already set up with 6 default collections</p>
            <p>• Add products to showcase them on your storefront</p>
            <p>• Mark products as "Featured" to display on the homepage</p>
            <p>• All data is stored locally in your browser</p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
