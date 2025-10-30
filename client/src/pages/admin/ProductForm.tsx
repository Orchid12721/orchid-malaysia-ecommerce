import { Link, useRoute, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Home, ArrowLeft } from "lucide-react";
import { productStore, categoryStore } from "@/lib/store";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function ProductForm() {
  const [, params] = useRoute("/admin/products/:id/edit");
  const [, setLocation] = useLocation();
  const isEdit = !!params?.id;
  const productId = params?.id ? parseInt(params.id) : null;

  const [categories, setCategories] = useState(categoryStore.getAll());
  const [formData, setFormData] = useState({
    categoryId: 0,
    name: "",
    slug: "",
    description: "",
    price: "",
    compareAtPrice: "",
    imageUrl: "",
    stock: "0",
    isActive: true,
    isFeatured: false
  });

  useEffect(() => {
    setCategories(categoryStore.getAll());
    
    if (isEdit && productId) {
      const product = productStore.getById(productId);
      if (product) {
        setFormData({
          categoryId: product.categoryId,
          name: product.name,
          slug: product.slug,
          description: product.description || "",
          price: (product.price / 100).toFixed(2),
          compareAtPrice: product.compareAtPrice ? (product.compareAtPrice / 100).toFixed(2) : "",
          imageUrl: product.imageUrl || "",
          stock: product.stock.toString(),
          isActive: product.isActive,
          isFeatured: product.isFeatured
        });
      }
    } else if (categories.length > 0 && formData.categoryId === 0) {
      setFormData(prev => ({ ...prev, categoryId: categories[0].id }));
    }
  }, [isEdit, productId, categories.length]);

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
      toast.error("Product name is required");
      return;
    }

    if (!formData.slug.trim()) {
      toast.error("Product slug is required");
      return;
    }

    if (!formData.price || parseFloat(formData.price) <= 0) {
      toast.error("Valid price is required");
      return;
    }

    if (formData.categoryId === 0) {
      toast.error("Please select a category");
      return;
    }

    try {
      const productData = {
        categoryId: formData.categoryId,
        name: formData.name,
        slug: formData.slug,
        description: formData.description || null,
        price: Math.round(parseFloat(formData.price) * 100),
        compareAtPrice: formData.compareAtPrice ? Math.round(parseFloat(formData.compareAtPrice) * 100) : null,
        imageUrl: formData.imageUrl || null,
        stock: parseInt(formData.stock) || 0,
        isActive: formData.isActive,
        isFeatured: formData.isFeatured
      };

      if (isEdit && productId) {
        productStore.update(productId, productData);
        toast.success("Product updated successfully");
      } else {
        productStore.create(productData);
        toast.success("Product created successfully");
      }
      setLocation("/admin/products");
    } catch (error) {
      toast.error("Failed to save product");
    }
  };

  if (categories.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>No Categories Found</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600">
              You need to create at least one category before adding products.
            </p>
            <Link href="/admin/categories/new">
              <Button className="w-full">Create Category</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

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
        <div className="mb-8">
          <Link href="/admin/products">
            <Button variant="ghost" className="gap-2 mb-4">
              <ArrowLeft className="w-4 h-4" />
              Back to Products
            </Button>
          </Link>
          <h1 className="text-4xl font-bold mb-2">
            {isEdit ? 'Edit Product' : 'Add New Product'}
          </h1>
          <p className="text-gray-600">
            {isEdit ? 'Update product information' : 'Create a new product'}
          </p>
        </div>

        <Card className="max-w-2xl">
          <CardHeader>
            <CardTitle>Product Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="categoryId">Category *</Label>
                <Select
                  value={formData.categoryId.toString()}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, categoryId: parseInt(value) }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id.toString()}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">Product Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  placeholder="e.g., Traditional Batik Dress"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="slug">Slug *</Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                  placeholder="e.g., traditional-batik-dress"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Product description"
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Price ($) *</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.price}
                    onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                    placeholder="0.00"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="compareAtPrice">Compare at Price ($)</Label>
                  <Input
                    id="compareAtPrice"
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.compareAtPrice}
                    onChange={(e) => setFormData(prev => ({ ...prev, compareAtPrice: e.target.value }))}
                    placeholder="0.00"
                  />
                  <p className="text-sm text-gray-500">Original price (for sale items)</p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="stock">Stock Quantity</Label>
                <Input
                  id="stock"
                  type="number"
                  min="0"
                  value={formData.stock}
                  onChange={(e) => setFormData(prev => ({ ...prev, stock: e.target.value }))}
                  placeholder="0"
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
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-0.5">
                    <Label htmlFor="isActive">Active Status</Label>
                    <p className="text-sm text-gray-500">
                      Show this product on the storefront
                    </p>
                  </div>
                  <Switch
                    id="isActive"
                    checked={formData.isActive}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isActive: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-0.5">
                    <Label htmlFor="isFeatured">Featured Product</Label>
                    <p className="text-sm text-gray-500">
                      Display on homepage featured section
                    </p>
                  </div>
                  <Switch
                    id="isFeatured"
                    checked={formData.isFeatured}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isFeatured: checked }))}
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <Button type="submit" className="flex-1">
                  {isEdit ? 'Update Product' : 'Create Product'}
                </Button>
                <Link href="/admin/products">
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
