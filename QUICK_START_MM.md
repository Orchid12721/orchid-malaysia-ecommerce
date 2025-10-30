# 🌸 Orchid Malaysia E-commerce - အမြန်စတင်ရန်လမ်းညွှန်

## 📦 ပရောဂျက်အကြောင်း

Shopify Horizon ဒီဇိုင်းပုံစံဖြင့် ပြုလုပ်ထားသော ခေတ်မီ E-commerce ဝက်ဘ်ဆိုက်တစ်ခုဖြစ်ပါသည်။

**GitHub Repository:** https://github.com/Orchid12721/orchid-malaysia-ecommerce

## ✨ အင်္ဂါရပ်များ

- ✅ Shopify Horizon ဒီဇိုင်း (အနက်-အဖြူ အရောင်စနစ်)
- ✅ Mobile-responsive ဒီဇိုင်း
- ✅ ကုန်ပစ္စည်းအမျိုးအစား ၆ မျိုး (Pakistan, Indonesia, Thailand, Malaysia, Local, Cosmetic)
- ✅ ကုန်ပစ္စည်းစီမံခန့်ခွဲမှုစနစ်
- ✅ Database ချိတ်ဆက်မှု
- ✅ အသုံးပြုသူ authentication
- ✅ Admin panel

## 🚀 Netlify တွင် Deploy လုပ်နည်း

### အဆင့် ၁: Netlify Account ဖန်တီးခြင်း

1. [Netlify](https://app.netlify.com/signup) သို့သွားပါ
2. GitHub account ဖြင့် Sign up လုပ်ပါ (အခမ်း)

### အဆင့် ၂: Repository ချိတ်ဆက်ခြင်း

1. Netlify Dashboard တွင် **"Add new site"** ကိုနှိပ်ပါ
2. **"Import an existing project"** ကိုရွေးပါ
3. **"Deploy with GitHub"** ကိုရွေးပါ
4. `orchid-malaysia-ecommerce` repository ကိုရှာပြီး ရွေးပါ

### အဆင့် ၃: Build Settings သတ်မှတ်ခြင်း

Netlify က အလိုအလျောက် သိရှိသွားပါလိမ့်မည်၊ စစ်ဆေးပါ:

**Build command:** `pnpm install && pnpm build`  
**Publish directory:** `dist/public`  
**Node version:** `22`

### အဆင့် ၄: Deploy လုပ်ခြင်း

1. **"Deploy site"** ကိုနှိပ်ပါ
2. ၂-၃ မိနစ်ခန့် စောင့်ပါ
3. သင့်ဝက်ဘ်ဆိုက် live ဖြစ်သွားပါပြီ! 🎉

**URL:** `https://random-name-123456.netlify.app`

### အဆင့် ၅: Site Name ပြောင်းခြင်း (ရွေးချယ်ခွင့်)

1. **Site settings** → **General** သို့သွားပါ
2. **"Change site name"** ကိုနှိပ်ပါ
3. သင်နှစ်သက်သော နာမည်ထည့်ပါ (ဥပမာ: `orchid-malaysia`)
4. URL: `https://orchid-malaysia.netlify.app` ဖြစ်သွားပါမည်

## 🎯 အပ်ဒိတ်များ Deploy လုပ်နည်း

ပြောင်းလဲမှုများပြုလုပ်ပြီးလျှင်:

```bash
git add .
git commit -m "Update website"
git push origin main
```

Netlify က အလိုအလျောက် build လုပ်ပြီး deploy လုပ်ပေးပါလိမ့်မည်!

## 📁 ပရောဂျက်ဖွဲ့စည်းပုံ

```
orchid-malaysia-ecommerce/
├── client/              # Frontend (React)
│   ├── src/pages/      # စာမျက်နှာများ
│   ├── src/components/ # UI components
│   └── public/         # Static files
├── server/             # Backend (Express)
├── drizzle/            # Database schema
├── dist/               # Build output
└── netlify.toml        # Netlify configuration
```

## 🎨 Customization လုပ်နည်း

### Logo ပြောင်းလဲခြင်း

1. သင့် logo ကို `client/public/logo.png` တွင်ထည့်ပါ
2. Git commit & push လုပ်ပါ

### အရောင်ပြောင်းလဲခြင်း

`client/src/index.css` ဖိုင်ကို ပြင်ဆင်ပါ:

```css
:root {
  --primary: oklch(0.15 0 0);        /* အနက်ရောင် */
  --primary-foreground: oklch(0.98 0 0); /* အဖြူရောင် */
}
```

### Category များထည့်ခြင်း

`scripts/seed-categories.ts` ဖိုင်ကို ပြင်ဆင်ပါ

## 🔧 အသုံးဝင်သော Commands များ

```bash
# Development
pnpm dev          # Development server စတင်ခြင်း

# Production
pnpm build        # Production အတွက် build လုပ်ခြင်း

# Database
pnpm db:push      # Database schema push လုပ်ခြင်း

# Code Quality
pnpm check        # Type checking
pnpm format       # Code format လုပ်ခြင်း
```

## 📊 Features Roadmap

- [ ] ကုန်ပစ္စည်းရှာဖွေမှု
- [ ] Filter & Sort လုပ်ဆောင်ချက်
- [ ] User reviews
- [ ] Wishlist
- [ ] Order tracking
- [ ] Email notifications
- [ ] ဘာသာစကားများစွာ support
- [ ] Payment gateway (Stripe/PayPal)

## 🆘 အကူအညီလိုအပ်ပါက

### အဖြစ်များသော ပြဿနာများ

**1. Build Failed**
- Netlify dashboard တွင် build logs ကိုကြည့်ပါ
- Node version မှန်ကန်မှုစစ်ဆေးပါ

**2. Site Shows 404**
- `_redirects` ဖိုင် ရှိမရှိစစ်ဆေးပါ
- Redeploy လုပ်ကြည့်ပါ

**3. Assets မတင်ပါက**
- Browser console ကိုစစ်ဆေးပါ
- Cache ရှင်းပြီး redeploy လုပ်ပါ

## 📞 ဆက်သွယ်ရန်

- **GitHub Issues:** https://github.com/Orchid12721/orchid-malaysia-ecommerce/issues
- **Netlify Docs:** https://docs.netlify.com

## 📄 License

MIT License

---

**Orchid Malaysia အတွက် ❤️ ဖြင့် ပြုလုပ်ထားပါသည်**

## 🎉 အောင်မြင်ပါစေ!

သင့်ဝက်ဘ်ဆိုက်ကို Netlify တွင် deploy လုပ်ပြီးပါပြီ!

**နောက်ထပ်လုပ်ဆောင်ရမည်များ:**
1. ✅ Site URL မျှဝေပါ
2. ✅ Admin panel မှ ကုန်ပစ္စည်းများထည့်ပါ
3. ✅ Custom domain သတ်မှတ်ပါ (လိုအပ်ပါက)
4. ✅ Payment gateway ချိတ်ဆက်ပါ
5. ✅ Analytics စစ်ဆေးပါ

---

**Deploy လုပ်ပြီးပါပြီ! 🚀**
