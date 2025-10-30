import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Home, Plus, Edit, Trash2, Star } from "lucide-react";
import { productStore, categoryStore, Product } from "@/lib/store";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Map<number, string>>(new Map());

  const loadData = () => {
    setProducts(productStore.getAll());
    const cats = categoryStore.getAll();
    const catMap = new Map(cats.map(c => [c.id, c.name]));
    setCategories(catMap);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = (id: number, name: string) => {
    if (confirm(`Are you sure you want to delete "${name}"?`)) {
      const success = productStore.delete(id);
      if (success) {
        toast.success("Product deleted successfully");
        loadData();
      } else {
        toast.error("Failed to delete product");
      }
    }
  };

  const toggleActive = (product: Product) => {
    productStore.update(product.id, { isActive: !product.isActive });
    toast.success(`Product ${product.isActive ? 'deactivated' : 'activated'}`);
    loadData();
  };

  const toggleFeatured = (product: Product) => {
    productStore.update(product.id, { isFeatured: !product.isFeatured });
    toast.success(`Product ${product.isFeatured ? 'removed from' : 'added to'} featured`);
    loadData();
  };

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
                  <a className="text-sm font-medium text-gray-600 hover:text-black transition">
                    Dashboard
                  </a>
                </Link>
                <Link href="/admin/categories">
                  <a className="text-sm font-medium text-gray-600 hover:text-black transition">
                    Categories
                  </a>
                </Link>
                <Link href="/admin/products">
                  <a className="text-sm font-medium text-black">
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
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Products</h1>
            <p className="text-gray-600">Manage your product catalog</p>
          </div>
          <Link href="/admin/products/new">
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Add Product
            </Button>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Products ({products.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Featured</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-12 text-gray-500">
                      No products found. Add your first product!
                    </TableCell>
                  </TableRow>
                ) : (
                  products.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell className="text-gray-600">
                        {categories.get(product.categoryId) || 'Unknown'}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">
                            ${(product.price / 100).toFixed(2)}
                          </span>
                          {product.compareAtPrice && (
                            <span className="text-sm text-gray-400 line-through">
                              ${(product.compareAtPrice / 100).toFixed(2)}
                            </span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{product.stock}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={product.isActive ? "default" : "secondary"}
                          className="cursor-pointer"
                          onClick={() => toggleActive(product)}
                        >
                          {product.isActive ? 'Active' : 'Inactive'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleFeatured(product)}
                        >
                          <Star 
                            className={`w-4 h-4 ${product.isFeatured ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'}`}
                          />
                        </Button>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link href={`/admin/products/${product.id}/edit`}>
                            <Button variant="ghost" size="sm" className="gap-2">
                              <Edit className="w-4 h-4" />
                              Edit
                            </Button>
                          </Link>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                            onClick={() => handleDelete(product.id, product.name)}
                          >
                            <Trash2 className="w-4 h-4" />
                            Delete
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
