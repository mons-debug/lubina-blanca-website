# Lubina Blanca Restaurant Website

A modern, animated website for Lubina Blanca Mediterranean seafood restaurant built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.

## 🌟 Features

### Public Website
- **Modern Design**: Clean, elegant design with a sophisticated color palette
- **Smooth Animations**: Page load animations, scroll-triggered effects, and hover interactions using Framer Motion
- **Responsive**: Mobile-first design that works perfectly on all devices
- **Interactive Navigation**: Sticky header with smooth scroll navigation and mobile hamburger menu
- **Dynamic Menu**: Filterable menu by category with beautiful card layouts
- **Dynamic Hero Slides**: Auto-rotating hero section with multiple slides
- **Image Gallery**: Responsive grid layout with hover effects
- **Reservation Form**: Contact form for making reservations
- **SEO Optimized**: Proper meta tags and semantic HTML

### Admin Dashboard 🔐
- **Complete CMS**: Manage all website content without touching code
- **Hero Management**: Add, edit, delete hero slides with image upload
- **Menu Management**: Full CRUD operations for menu items
- **Gallery Management**: Upload and manage restaurant photos
- **Content Editor**: Edit restaurant info, about section, and contact details
- **Image Upload**: Easy file upload with preview
- **Authentication**: Secure login system with JWT tokens
- **Real-time Updates**: Changes reflect immediately on the website

## 🎨 Sections

1. **Hero Section**: Full-screen hero with animated text and call-to-action buttons
2. **About Section**: Restaurant story with statistics and beautiful imagery
3. **Menu Section**: Categorized menu items with filtering functionality
4. **Gallery**: Photo showcase of dishes and restaurant ambiance
5. **Contact/Reservations**: Reservation form with business hours and location
6. **Footer**: Quick links and social media integration

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: React Icons
- **Fonts**: Google Fonts (Geist Sans, Geist Mono, Playfair Display)

### Admin System
- **Authentication**: JWT with HTTP-only cookies
- **Password Hashing**: bcryptjs
- **Forms**: React Hook Form
- **Validation**: Zod
- **Notifications**: React Hot Toast
- **File Upload**: Next.js API Routes
- **Data Storage**: JSON files (easily upgradable to database)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd lubinablancasite
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Admin Panel Access

1. Navigate to [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
2. Login with default credentials:
   - **Username**: `admin`
   - **Password**: `lubinablanca2024`
3. Start managing your website content!

📖 **See [ADMIN_GUIDE.md](ADMIN_GUIDE.md) for complete admin documentation**

## 📁 Project Structure

```
lubinablancasite/
├── app/
│   ├── admin/                    # Admin dashboard
│   │   ├── layout.tsx            # Admin layout with sidebar
│   │   ├── page.tsx              # Dashboard home
│   │   ├── login/page.tsx        # Login page
│   │   ├── hero/page.tsx         # Hero management
│   │   ├── menu/page.tsx         # Menu management
│   │   ├── gallery/page.tsx      # Gallery management
│   │   ├── about/page.tsx        # About editor
│   │   └── contact/page.tsx      # Contact editor
│   ├── api/                      # API routes
│   │   ├── auth/                 # Authentication endpoints
│   │   ├── menu/route.ts         # Menu CRUD
│   │   ├── hero/route.ts         # Hero CRUD
│   │   ├── gallery/route.ts      # Gallery CRUD
│   │   ├── restaurant/route.ts   # Restaurant info
│   │   └── upload/route.ts       # Image upload
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Homepage
│   └── globals.css               # Global styles
├── components/
│   ├── admin/                    # Admin components
│   │   ├── AdminAuth.tsx         # Auth wrapper
│   │   └── Sidebar.tsx           # Admin sidebar
│   ├── Navigation.tsx            # Public navigation
│   ├── Hero.tsx                  # Dynamic hero section
│   ├── About.tsx                 # About section
│   ├── Menu.tsx                  # Menu with filtering
│   ├── Gallery.tsx               # Image gallery
│   ├── Contact.tsx               # Contact form
│   └── Footer.tsx                # Footer
├── data/
│   ├── menuData.ts               # Menu items and categories
│   ├── restaurantData.ts         # Restaurant info and gallery
│   └── heroData.json             # Hero slides (managed by admin)
├── lib/
│   ├── auth.ts                   # Authentication logic
│   └── dataManager.ts            # Data file operations
├── public/
│   └── uploads/                  # Uploaded images
└── ADMIN_GUIDE.md                # Admin documentation
```

## 🎨 Customization

### Using the Admin Dashboard (Recommended)

The easiest way to manage your website is through the admin dashboard:

1. Login at `/admin/login`
2. Use the visual interface to:
   - Add/edit menu items
   - Manage hero slides
   - Upload images
   - Update restaurant info
   - Change business hours

### Manual Editing (Advanced)

You can also directly edit data files:

#### Updating Restaurant Information

Edit `/data/restaurantData.ts` to update:
- Restaurant name, tagline, and description
- Contact information (phone, email, address)
- Business hours
- Social media links

### Updating Menu Items

Edit `/data/menuData.ts` to:
- Add/remove menu items
- Update prices and descriptions
- Modify categories
- Change placeholder images

### Changing Colors

Edit `/app/globals.css` to customize the color scheme:
```css
:root {
  --primary: #5eb3ce;      /* Turquoise Blue */
  --primary-dark: #3a8fa8; /* Dark Turquoise */
  --secondary: #1a3a52;    /* Navy Blue */
  --accent: #6dd3e3;       /* Light Cyan */
}
```

## 📦 Building for Production

```bash
npm run build
npm start
```

## 🌐 Deployment

This project can be deployed to:
- **Vercel** (recommended for Next.js)
- **Netlify**
- **AWS Amplify**
- **Digital Ocean**
- Any hosting platform that supports Node.js

## 📱 Social Media

- Instagram: [@lubinablanca](https://www.instagram.com/lubinablanca/)
- Google Business: [View Profile](https://share.google/SESErFCedXhv1CeNP)

## 📝 License

This project is created for Lubina Blanca restaurant.

## 🤝 Contributing

To add new features or make changes:
1. Create a new branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## 📞 Support

For questions or issues, please contact the development team.

---

Made with ❤️ for food lovers
