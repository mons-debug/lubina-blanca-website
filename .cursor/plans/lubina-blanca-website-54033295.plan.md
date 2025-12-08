---
name: Admin Dashboard & Content Management System
overview: ""
todos:
  - id: aa204336-78ea-4852-ba98-3c492043232d
    content: Initialize Next.js project with TypeScript, install dependencies (Framer Motion, Tailwind CSS, React Icons), and configure Tailwind
    status: pending
  - id: 0835b13e-3a68-4cba-bc87-60647054af7f
    content: Create root layout and animated navigation component with mobile menu
    status: pending
  - id: 0e443675-303f-4cad-aaec-6ba88110f4ce
    content: Build animated hero section with full-screen imagery and call-to-action
    status: pending
  - id: 791fa59c-3356-469d-a554-fec3c49fada1
    content: Create about section and menu component with categories and animations
    status: pending
  - id: 7ba73713-b041-473d-b2d8-8b4ca3dab46a
    content: Build gallery section with grid layout and hover animations
    status: pending
  - id: f0641c11-59c8-4ce4-8256-b867290b259c
    content: Implement contact section with form, location info, and footer
    status: pending
  - id: f30fee24-d011-46ff-a21e-1e1e3a92d249
    content: Add scroll-triggered animations, smooth scrolling, and final polish
    status: pending
---

# Admin Dashboard & Content Management System

## Overview

Create a full-featured admin panel at `/admin` route where you can add, edit, and delete menu items, manage hero slides, upload images, and control all website content without touching code.

## Technology Additions

- **NextAuth.js** for authentication (simple credentials-based)
- **React Hook Form** for form management
- **Zod** for validation
- **Upload functionality** for images
- **Local JSON storage** (can be upgraded to database later)

## Admin Dashboard Features

### 1. Authentication System

- Simple login page at `/admin/login`
- Credentials-based authentication (username/password)
- Protected admin routes
- Session management
- Logout functionality

### 2. Dashboard Layout

- Sidebar navigation with sections:
  - Dashboard Home
  - Hero Management
  - Menu Items
  - Gallery
  - About Section
  - Contact Info
  - Settings
- Top bar with user info and logout
- Responsive admin interface

### 3. Hero Section Management

- Add/edit/delete hero slides
- Upload hero images
- Edit title, subtitle, description
- Reorder slides (drag and drop or up/down buttons)
- Toggle slide visibility
- Preview changes

### 4. Menu Management

- **List View**: Table of all menu items with quick actions
- **Add New Item**: Form to add menu items
  - Name, description, price
  - Category selection
  - Image upload
  - Availability toggle
- **Edit Item**: Modal or page to edit existing items
- **Delete Item**: Confirmation before deletion
- **Category Management**: Add/edit/delete categories
- **Bulk Actions**: Delete multiple items at once

### 5. Gallery Management

- Grid view of all gallery images
- Upload multiple images at once
- Drag and drop reordering
- Edit image alt text
- Delete images
- Preview gallery

### 6. Restaurant Info Editor

- Edit restaurant name, tagline, description
- Update contact information (phone, email, address)
- Modify business hours
- Update social media links
- Live preview of changes

### 7. About Section Editor

- Edit about text
- Update statistics (years, dishes, rating)
- Change about section image

### 8. Image Management

- Image upload with preview
- Image library browser
- Delete unused images
- Image optimization info

## Technical Implementation

### File Structure

```
app/
├── admin/
│   ├── layout.tsx          # Admin layout with sidebar
│   ├── page.tsx            # Dashboard home
│   ├── hero/page.tsx       # Hero management
│   ├── menu/page.tsx       # Menu management
│   ├── gallery/page.tsx    # Gallery management
│   ├── about/page.tsx      # About editor
│   ├── contact/page.tsx    # Contact info editor
│   └── login/page.tsx      # Login page
├── api/
│   ├── auth/[...nextauth]/route.ts  # Auth API
│   ├── menu/route.ts       # Menu CRUD API
│   ├── hero/route.ts       # Hero CRUD API
│   ├── gallery/route.ts    # Gallery CRUD API
│   ├── upload/route.ts     # Image upload API
│   └── data/route.ts       # General data updates
components/
├── admin/
│   ├── AdminLayout.tsx     # Admin wrapper
│   ├── Sidebar.tsx         # Admin sidebar
│   ├── MenuForm.tsx        # Menu item form
│   ├── HeroForm.tsx        # Hero slide form
│   ├── ImageUpload.tsx     # Image upload component
│   └── DataTable.tsx       # Reusable table
lib/
├── auth.ts                 # Auth configuration
├── dataManager.ts          # JSON file operations
└── uploadHandler.ts        # Image upload handler
```

### Data Storage Approach

- Use JSON files in `/data` directory (already structured)
- API routes to read/write JSON files
- Can easily migrate to database later
- Automatic backup before changes

### API Routes

- `POST /api/menu` - Add menu item
- `PUT /api/menu/[id]` - Update menu item
- `DELETE /api/menu/[id]` - Delete menu item
- `GET /api/menu` - Get all menu items
- Similar routes for hero, gallery, contact info
- `POST /api/upload` - Handle image uploads

### Security Features

- Password hashing
- Protected API routes (require authentication)
- CSRF protection
- Rate limiting on auth endpoints
- Input validation and sanitization

### User Experience

- Toast notifications for actions (success/error)
- Loading states for async operations
- Form validation with helpful error messages
- Confirmation dialogs for destructive actions
- Responsive design (manage from phone/tablet)
- Auto-save drafts (optional)

## Implementation Steps

1. **Setup Authentication**

   - Install NextAuth.js and dependencies
   - Create auth configuration
   - Build login page
   - Protect admin routes

2. **Build Admin Layout**

   - Create admin layout with sidebar
   - Build navigation components
   - Add logout functionality

3. **Create API Routes**

   - Menu CRUD endpoints
   - Hero CRUD endpoints
   - Gallery CRUD endpoints
   - Data update endpoints
   - Image upload endpoint

4. **Build Management Pages**

   - Dashboard home with overview
   - Menu management page with table and forms
   - Hero management page
   - Gallery management page
   - Settings pages for info editing

5. **Image Upload System**

   - File upload component
   - Image preview
   - Save to public folder
   - Update data references

6. **Polish & Testing**

   - Add loading states
   - Error handling
   - Responsive design
   - Test all CRUD operations

## Default Admin Credentials

- Username: `admin`
- Password: `lubinablanca2024` (you can change this in settings)

## Future Enhancements

- Database integration (PostgreSQL/MySQL)
- Image optimization on upload
- Bulk import/export (CSV)
- Analytics dashboard
- Reservation management
- Email notifications