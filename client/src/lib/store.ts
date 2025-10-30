// Local storage data store for static deployment
export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  imageUrl: string | null;
  displayOrder: number;
  isActive: boolean;
}

export interface Product {
  id: number;
  categoryId: number;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  compareAtPrice: number | null;
  imageUrl: string | null;
  stock: number;
  isActive: boolean;
  isFeatured: boolean;
}

const STORAGE_KEYS = {
  CATEGORIES: 'orchid_categories',
  PRODUCTS: 'orchid_products',
  NEXT_CATEGORY_ID: 'orchid_next_category_id',
  NEXT_PRODUCT_ID: 'orchid_next_product_id',
};

// Initialize default data
const DEFAULT_CATEGORIES: Category[] = [
  {
    id: 1,
    name: "Pakistan Collection",
    slug: "pakistan",
    description: "Traditional Pakistani clothing and accessories",
    imageUrl: null,
    displayOrder: 1,
    isActive: true
  },
  {
    id: 2,
    name: "Indonesia Collection",
    slug: "indonesia",
    description: "Beautiful Indonesian traditional wear",
    imageUrl: null,
    displayOrder: 2,
    isActive: true
  },
  {
    id: 3,
    name: "Thailand Collection",
    slug: "thailand",
    description: "Elegant Thai fashion and accessories",
    imageUrl: null,
    displayOrder: 3,
    isActive: true
  },
  {
    id: 4,
    name: "Malaysia Collection",
    slug: "malaysia",
    description: "Malaysian traditional and modern clothing",
    imageUrl: null,
    displayOrder: 4,
    isActive: true
  },
  {
    id: 5,
    name: "Local Collection",
    slug: "local",
    description: "Locally sourced fashion items",
    imageUrl: null,
    displayOrder: 5,
    isActive: true
  },
  {
    id: 6,
    name: "Cosmetic Collection",
    slug: "cosmetic",
    description: "Beauty and cosmetic products",
    imageUrl: null,
    displayOrder: 6,
    isActive: true
  }
];

// Initialize storage if empty
function initializeStorage() {
  if (!localStorage.getItem(STORAGE_KEYS.CATEGORIES)) {
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(DEFAULT_CATEGORIES));
    localStorage.setItem(STORAGE_KEYS.NEXT_CATEGORY_ID, '7');
  }
  if (!localStorage.getItem(STORAGE_KEYS.PRODUCTS)) {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify([]));
    localStorage.setItem(STORAGE_KEYS.NEXT_PRODUCT_ID, '1');
  }
}

// Category operations
export const categoryStore = {
  getAll: (): Category[] => {
    initializeStorage();
    const data = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
    return data ? JSON.parse(data) : [];
  },

  getById: (id: number): Category | undefined => {
    const categories = categoryStore.getAll();
    return categories.find(c => c.id === id);
  },

  create: (category: Omit<Category, 'id'>): Category => {
    initializeStorage();
    const categories = categoryStore.getAll();
    const nextId = parseInt(localStorage.getItem(STORAGE_KEYS.NEXT_CATEGORY_ID) || '1');
    
    const newCategory: Category = {
      ...category,
      id: nextId
    };
    
    categories.push(newCategory);
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
    localStorage.setItem(STORAGE_KEYS.NEXT_CATEGORY_ID, (nextId + 1).toString());
    
    return newCategory;
  },

  update: (id: number, updates: Partial<Category>): Category | null => {
    const categories = categoryStore.getAll();
    const index = categories.findIndex(c => c.id === id);
    
    if (index === -1) return null;
    
    categories[index] = { ...categories[index], ...updates };
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
    
    return categories[index];
  },

  delete: (id: number): boolean => {
    const categories = categoryStore.getAll();
    const filtered = categories.filter(c => c.id !== id);
    
    if (filtered.length === categories.length) return false;
    
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(filtered));
    return true;
  }
};

// Product operations
export const productStore = {
  getAll: (): Product[] => {
    initializeStorage();
    const data = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
    return data ? JSON.parse(data) : [];
  },

  getById: (id: number): Product | undefined => {
    const products = productStore.getAll();
    return products.find(p => p.id === id);
  },

  getByCategory: (categoryId: number): Product[] => {
    const products = productStore.getAll();
    return products.filter(p => p.categoryId === categoryId);
  },

  getFeatured: (): Product[] => {
    const products = productStore.getAll();
    return products.filter(p => p.isFeatured && p.isActive);
  },

  create: (product: Omit<Product, 'id'>): Product => {
    initializeStorage();
    const products = productStore.getAll();
    const nextId = parseInt(localStorage.getItem(STORAGE_KEYS.NEXT_PRODUCT_ID) || '1');
    
    const newProduct: Product = {
      ...product,
      id: nextId
    };
    
    products.push(newProduct);
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
    localStorage.setItem(STORAGE_KEYS.NEXT_PRODUCT_ID, (nextId + 1).toString());
    
    return newProduct;
  },

  update: (id: number, updates: Partial<Product>): Product | null => {
    const products = productStore.getAll();
    const index = products.findIndex(p => p.id === id);
    
    if (index === -1) return null;
    
    products[index] = { ...products[index], ...updates };
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
    
    return products[index];
  },

  delete: (id: number): boolean => {
    const products = productStore.getAll();
    const filtered = products.filter(p => p.id !== id);
    
    if (filtered.length === products.length) return false;
    
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(filtered));
    return true;
  }
};
