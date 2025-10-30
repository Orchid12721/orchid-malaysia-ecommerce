import { Link, useRoute, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Home, ArrowLeft } from "lucide-react";
import { categoryStore } from "@/lib/store";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function CategoryForm() {
  const [, params] = useRoute("/admin/categories/:id/edit");
  const [, setLocation] = useLocation();
  const isEdit = !!params?.id;
  const categoryId = params?.id ? parseInt(params.id) : null;

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    imageUrl: "",
    displayOrder: 0,
    isActive: true
  });

  useEffect(() => {
    if (isEdit && categoryId) {
      const category = categoryStore.getById(categoryId);
      if (category) {
        setFormData({
          name: category.name,
          slug: category.slug,
          description: category.description || "",
          imageUrl: category.imageUrl || "",
          displayOrder: category.displayOrder,
          isActive: category.isActive
        });
      }
    }
  }, [isEdit, categoryId]);

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleNameChange = (name: string) => {
    setFormData(prev => ({
      ...prev,
      name,
      slug: prev.slug || generateSlug(name)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error("Category name is required");
      return;
    }

    if (!formData.slug.trim()) {
      toast.error("Category slug is required");
      return;
    }

    try {
      if (isEdit && categoryId) {
        categoryStore.update(categoryId, formData);
        toast.success("Category updated successfully");
      } else {
        categoryStore.create(formData);
        toast.success("Category created successfully");
      }
      setLocation("/admin/categories");
    } catch (error) {
      toast.error("Failed to save category");
    }
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
        <div className="mb-8">
          <Link href="/admin/categories">
            <Button variant="ghost" className="gap-2 mb-4">
              <ArrowLeft className="w-4 h-4" />
              Back to Categories
            </Button>
          </Link>
          <h1 className="text-4xl font-bold mb-2">
            {isEdit ? 'Edit Category' : 'Add New Category'}
          </h1>
          <p className="text-gray-600">
            {isEdit ? 'Update category information' : 'Create a new product category'}
          </p>
        </div>

        <Card className="max-w-2xl">
          <CardHeader>
            <CardTitle>Category Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Category Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  placeholder="e.g., Pakistan Collection"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="slug">Slug *</Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                  placeholder="e.g., pakistan"
                  required
                />
                <p className="text-sm text-gray-500">
                  URL-friendly version of the name (lowercase, no spaces)
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Brief description of this category"
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="imageUrl">Image URL</Label>
                <Input
                  id="imageUrl"
                  type="url"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData(prev => ({ ...prev, imageUrl: e.target.value }))}
                  placeholder="https://example.com/image.jpg"
                />
                <p className="text-sm text-gray-500">
                  Optional: Enter a URL to an image for this category
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="displayOrder">Display Order</Label>
                <Input
                  id="displayOrder"
                  type="number"
                  value={formData.displayOrder}
                  onChange={(e) => setFormData(prev => ({ ...prev, displayOrder: parseInt(e.target.value) || 0 }))}
                  placeholder="0"
                />
                <p className="text-sm text-gray-500">
                  Lower numbers appear first
                </p>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-0.5">
                  <Label htmlFor="isActive">Active Status</Label>
                  <p className="text-sm text-gray-500">
                    Show this category on the storefront
                  </p>
                </div>
                <Switch
                  id="isActive"
                  checked={formData.isActive}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isActive: checked }))}
                />
              </div>

              <div className="flex gap-4 pt-4">
                <Button type="submit" className="flex-1">
                  {isEdit ? 'Update Category' : 'Create Category'}
                </Button>
                <Link href="/admin/categories">
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
