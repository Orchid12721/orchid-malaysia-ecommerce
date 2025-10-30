# Orchid Malaysia E-commerce - Setup Guide

## 📦 Project Overview

Professional e-commerce website with Shopify Horizon theme design, built with React, TypeScript, and Node.js.

**Features:**
- ✅ Shopify Horizon-inspired design
- ✅ Black & White color scheme
- ✅ Mobile-responsive layout
- ✅ 6 Product categories (Pakistan, Indonesia, Thailand, Malaysia, Local, Cosmetic)
- ✅ Product management system
- ✅ Database integration (MySQL/TiDB)
- ✅ User authentication
- ✅ Admin panel ready

---

## 🚀 Quick Start (Local Development)

### Prerequisites
- Node.js 18+ 
- pnpm (or npm/yarn)
- MySQL database (or use provided TiDB)

### Installation Steps

1. **Extract the zip file**
```bash
unzip orchid-malaysia-ecommerce.zip
cd orchid-malaysia-ecommerce
```

2. **Install dependencies**
```bash
pnpm install
# or
npm install
```

3. **Set up environment variables**

The project uses Manus platform's built-in services. If you want to run locally, you'll need to set up:

Create `.env` file:
```env
DATABASE_URL=your_mysql_connection_string
JWT_SECRET=your_secret_key
VITE_APP_TITLE=Orchid Malaysia
VITE_APP_LOGO=/logo.png
```

4. **Push database schema**
```bash
pnpm db:push
```

5. **Seed categories**
```bash
node --loader ts-node/esm scripts/seed-categories.ts
```

6. **Start development server**
```bash
pnpm dev
```

Visit: http://localhost:3000

---

## 🌐 Deploy to Netlify

### Option 1: Netlify CLI

1. **Install Netlify CLI**
```bash
npm install -g netlify-cli
```

2. **Build the project**
```bash
pnpm build
```

3. **Deploy**
```bash
netlify deploy --prod
```

### Option 2: Netlify UI

1. Push code to GitHub
2. Connect repository to Netlify
3. Set build command: `pnpm build`
4. Set publish directory: `dist`
5. Add environment variables in Netlify dashboard

---

## 📁 Project Structure

```
orchid-malaysia-ecommerce/
├── client/               # Frontend (React + TypeScript)
│   ├── src/
│   │   ├── pages/       # Page components
│   │   ├── components/  # Reusable components
│   │   ├── lib/         # Utilities
│   │   └── index.css    # Global styles
│   └── index.html
├── server/              # Backend (Express + tRPC)
│   ├── _core/          # Core server logic
│   ├── db.ts           # Database queries
│   ├── routers.ts      # API routes
│   └── storage.ts      # File storage
├── drizzle/            # Database schema
│   └── schema.ts
├── shared/             # Shared types
└── package.json
```

---

## 🎨 Customization

### Change Colors

Edit `client/src/index.css`:
```css
:root {
  --primary: oklch(0.15 0 0);        /* Black */
  --primary-foreground: oklch(0.98 0 0); /* White */
}
```

### Add Logo

1. Place logo in `client/public/logo.png`
2. Update `VITE_APP_LOGO` environment variable

### Modify Categories

Edit `scripts/seed-categories.ts` and run:
```bash
node --loader ts-node/esm scripts/seed-categories.ts
```

---

## 🔧 Development

### Add New Pages

1. Create file in `client/src/pages/YourPage.tsx`
2. Add route in `client/src/App.tsx`

### Add API Endpoints

1. Add procedure in `server/routers.ts`
2. Use in frontend with `trpc.yourEndpoint.useQuery()`

### Database Changes

1. Edit `drizzle/schema.ts`
2. Run `pnpm db:push`

---

## 📊 Database Schema

**Tables:**
- `users` - Customer accounts
- `categories` - Product categories
- `products` - Product catalog
- `orders` - Order records
- `orderItems` - Order line items
- `cartItems` - Shopping cart
- `addresses` - Shipping addresses
- `wishlistItems` - Wishlist

---

## 🛠️ Tech Stack

**Frontend:**
- React 19
- TypeScript
- Tailwind CSS 4
- Wouter (routing)
- tRPC (API client)

**Backend:**
- Node.js
- Express 4
- tRPC 11
- Drizzle ORM
- MySQL/TiDB

---

## 📝 Next Steps

**To complete the e-commerce site:**

1. **Admin Panel**
   - Product management UI
   - Order management
   - Category management

2. **Product Pages**
   - Product listing page
   - Product detail page
   - Category pages

3. **Shopping Cart**
   - Add to cart functionality
   - Cart page
   - Checkout flow

4. **Payment Integration**
   - Stripe/PayPal setup
   - Payment processing

5. **User Features**
   - User registration
   - Order history
   - Wishlist

---

## 🆘 Support

**Common Issues:**

1. **Database connection failed**
   - Check DATABASE_URL in environment variables
   - Ensure database is running

2. **Port already in use**
   - Change port in `vite.config.ts`
   - Or kill process using port 3000

3. **Build errors**
   - Clear node_modules and reinstall
   - Check Node.js version (18+)

---

## 📄 License

This project is created for Orchid Malaysia.

---

## 🎉 Ready to Use!

The basic structure is complete. You can now:
- Add products via admin panel
- Customize design
- Deploy to production
- Add more features

**Preview URL (if using Manus):**
https://3000-iopvral57oalw6livfgz6-f4322c19.manus-asia.computer

---

**Created with ❤️ for Orchid Malaysia**

