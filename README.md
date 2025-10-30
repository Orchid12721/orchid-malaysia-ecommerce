# 🌸 Orchid Malaysia E-commerce

Professional e-commerce website with Shopify Horizon-inspired design, built with modern web technologies.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-22.x-green.svg)
![React](https://img.shields.io/badge/react-19.1-blue.svg)

## ✨ Features

- 🎨 **Shopify Horizon Design** - Clean, modern black & white aesthetic
- 📱 **Fully Responsive** - Mobile-first design approach
- 🛍️ **6 Product Categories** - Pakistan, Indonesia, Thailand, Malaysia, Local, Cosmetic
- 🔐 **User Authentication** - Secure login and registration
- 🛒 **Shopping Cart** - Full cart and checkout functionality
- 💳 **Payment Ready** - Integration-ready payment system
- 📊 **Admin Panel** - Product and order management
- ⚡ **Fast Performance** - Optimized build with Vite
- 🎯 **SEO Friendly** - Optimized for search engines

## 🚀 Live Demo

**GitHub Repository:** [https://github.com/Orchid12721/orchid-malaysia-ecommerce](https://github.com/Orchid12721/orchid-malaysia-ecommerce)

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern UI library
- **TypeScript** - Type-safe development
- **Tailwind CSS 4** - Utility-first styling
- **Wouter** - Lightweight routing
- **tRPC** - End-to-end typesafe APIs
- **Radix UI** - Accessible components

### Backend
- **Node.js** - Runtime environment
- **Express 4** - Web framework
- **tRPC 11** - API layer
- **Drizzle ORM** - Type-safe database toolkit
- **MySQL/TiDB** - Database

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- pnpm (or npm/yarn)
- MySQL database

### Quick Start

1. **Clone the repository**
```bash
git clone https://github.com/Orchid12721/orchid-malaysia-ecommerce.git
cd orchid-malaysia-ecommerce
```

2. **Install dependencies**
```bash
pnpm install
# or
npm install
```

3. **Set up environment variables**

Create a `.env` file in the root directory:
```env
DATABASE_URL=your_mysql_connection_string
JWT_SECRET=your_secret_key
VITE_APP_TITLE=Orchid Malaysia
VITE_APP_LOGO=/logo.png
PORT=3000
```

4. **Initialize database**
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

## 🌐 Deploy to Netlify

### Option 1: Netlify UI (Recommended)

1. **Connect to Netlify**
   - Go to [Netlify](https://app.netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Choose "Deploy with GitHub"
   - Select `Orchid12721/orchid-malaysia-ecommerce`

2. **Configure build settings**
   - Build command: `pnpm install && pnpm build`
   - Publish directory: `dist/public`
   - Node version: `22`

3. **Add environment variables** (Optional)
   - Go to Site settings → Environment variables
   - Add your database and API keys if needed

4. **Deploy**
   - Click "Deploy site"
   - Your site will be live in minutes!

### Option 2: Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build the project
pnpm build

# Deploy
netlify deploy --prod
```

## 📁 Project Structure

```
orchid-malaysia-ecommerce/
├── client/               # Frontend React application
│   ├── src/
│   │   ├── pages/       # Page components
│   │   ├── components/  # Reusable UI components
│   │   ├── lib/         # Utilities and helpers
│   │   └── index.css    # Global styles
│   └── index.html       # HTML template
├── server/              # Backend Express server
│   ├── _core/          # Core server logic
│   ├── db.ts           # Database queries
│   ├── routers.ts      # tRPC API routes
│   └── storage.ts      # File storage handling
├── drizzle/            # Database schema and migrations
│   └── schema.ts       # Database schema definitions
├── shared/             # Shared types between client/server
├── scripts/            # Utility scripts
├── dist/               # Build output
└── package.json        # Dependencies and scripts
```

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

1. Place your logo in `client/public/logo.png`
2. Update `VITE_APP_LOGO` in `.env`

### Modify Categories

Edit `scripts/seed-categories.ts` and run:
```bash
node --loader ts-node/esm scripts/seed-categories.ts
```

## 📊 Database Schema

**Tables:**
- `users` - Customer accounts
- `categories` - Product categories
- `products` - Product catalog
- `orders` - Order records
- `orderItems` - Order line items
- `cartItems` - Shopping cart
- `addresses` - Shipping addresses
- `wishlistItems` - Customer wishlists

## 🔧 Available Scripts

```bash
# Development
pnpm dev          # Start development server

# Production
pnpm build        # Build for production
pnpm start        # Start production server

# Database
pnpm db:push      # Push schema to database

# Code Quality
pnpm check        # Type checking
pnpm format       # Format code
pnpm test         # Run tests
```

## 🌟 Features Roadmap

- [ ] Product search functionality
- [ ] Product filtering and sorting
- [ ] User reviews and ratings
- [ ] Wishlist functionality
- [ ] Order tracking
- [ ] Email notifications
- [ ] Multi-language support
- [ ] Payment gateway integration (Stripe/PayPal)
- [ ] Inventory management
- [ ] Analytics dashboard

## 📝 License

This project is licensed under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📧 Contact

For questions or support, please open an issue on GitHub.

---

**Built with ❤️ for Orchid Malaysia**
