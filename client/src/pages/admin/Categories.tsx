import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Home, Plus, Edit, Trash2 } from "lucide-react";
import { categoryStore, Category } from "@/lib/store";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);

  const loadCategories = () => {
    setCategories(categoryStore.getAll());
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleDelete = (id: number, name: string) => {
    if (confirm(`Are you sure you want to delete "${name}"?`)) {
      const success = categoryStore.delete(id);
      if (success) {
        toast.success("Category deleted successfully");
        loadCategories();
      } else {
        toast.error("Failed to delete category");
      }
    }
  };

  const toggleActive = (category: Category) => {
    categoryStore.update(category.id, { isActive: !category.isActive });
    toast.success(`Category ${category.isActive ? 'deactivated' : 'activated'}`);
    loadCategories();
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
                  <a className="text-sm font-medium text-black">
                    Categories
                  </a>
                </Link>
                <Link href="/admin/products">
                  <a className="text-sm font-medium text-gray-600 hover:text-black transition">
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
            <h1 className="text-4xl font-bold mb-2">Categories</h1>
            <p className="text-gray-600">Manage your product categories</p>
          </div>
          <Link href="/admin/categories/new">
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Add Category
            </Button>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Categories ({categories.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Slug</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Order</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categories.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-12 text-gray-500">
                      No categories found. Add your first category!
                    </TableCell>
                  </TableRow>
                ) : (
                  categories.map((category) => (
                    <TableRow key={category.id}>
                      <TableCell className="font-medium">{category.name}</TableCell>
                      <TableCell className="text-gray-600">{category.slug}</TableCell>
                      <TableCell className="text-gray-600 max-w-xs truncate">
                        {category.description || '-'}
                      </TableCell>
                      <TableCell>{category.displayOrder}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={category.isActive ? "default" : "secondary"}
                          className="cursor-pointer"
                          onClick={() => toggleActive(category)}
                        >
                          {category.isActive ? 'Active' : 'Inactive'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link href={`/admin/categories/${category.id}/edit`}>
                            <Button variant="ghost" size="sm" className="gap-2">
                              <Edit className="w-4 h-4" />
                              Edit
                            </Button>
                          </Link>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                            onClick={() => handleDelete(category.id, category.name)}
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
