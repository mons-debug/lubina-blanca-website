# Admin Dashboard Guide

## Accessing the Admin Panel

1. Navigate to: `http://localhost:3000/admin/login`
2. Default credentials:
   - **Username**: `admin`
   - **Password**: `lubinablanca2024`

## Admin Features

### Dashboard Home
- Overview of your website statistics
- Quick access to all management sections
- System information

### Hero Slides Management (`/admin/hero`)
Manage the homepage hero section:
- **Add New Slides**: Create multiple hero slides with different images and text
- **Edit Slides**: Update title, subtitle, description, and background image
- **Toggle Visibility**: Show/hide slides without deleting them
- **Auto-Rotation**: Slides automatically rotate every 7 seconds
- **Image Upload**: Upload custom images or use URLs

### Menu Management (`/admin/menu`)
Complete menu item control:
- **Add Items**: Name, description, price, category, and image
- **Edit Items**: Update any menu item details
- **Delete Items**: Remove items with confirmation
- **Categories**: Appetizers, Main Courses, Seafood Specialties, Desserts, Drinks
- **Image Upload**: Upload food photos or use image URLs
- **Table View**: See all menu items at a glance

### Gallery Management (`/admin/gallery`)
Manage restaurant photos:
- **Upload Images**: Add multiple images to the gallery
- **Delete Images**: Remove unwanted photos
- **Alt Text**: Add descriptions for accessibility
- **Grid View**: Visual overview of all gallery images

### About Section (`/admin/about`)
Edit restaurant information:
- Restaurant name
- Tagline
- Full description
- **Live Preview**: See changes before saving

### Contact Information (`/admin/contact`)
Update all contact details:
- **Contact**: Phone number and email
- **Address**: Street, city, state, ZIP code
- **Business Hours**: Set hours for each day of the week
- **Social Media**: Instagram and Google Business links

## Tips & Best Practices

### Images
- **Recommended Size**: 1920x1080px for hero slides, 800x600px for menu items
- **Format**: JPG or PNG
- **Upload Location**: Files are saved to `/public/uploads/`
- **URLs**: You can also use external image URLs (like Unsplash)

### Menu Items
- Keep descriptions concise (50-100 characters)
- Use consistent pricing format (e.g., "$25" not "25 dollars")
- Assign correct categories for filtering

### Hero Slides
- Use high-quality, appetizing images
- Keep titles short and impactful
- Ensure text is readable over the background image
- Limit to 3-5 active slides for best performance

### Business Hours
- Use consistent format: "5:00 PM - 10:00 PM"
- For closed days, use "Closed"
- Update hours before holidays

## Image Upload Guide

### Method 1: Upload Files
1. Click the "Upload" button in any form
2. Select an image from your computer
3. Wait for upload confirmation
4. Image URL will be automatically filled

### Method 2: Use URLs
1. Copy an image URL (from your website, Unsplash, etc.)
2. Paste directly into the image field
3. Preview will show immediately

## Data Management

### Backups
- Automatic backups are created before any changes
- Backup files are stored in `/data/` with `.backup` extension
- Restore by renaming the backup file

### Data Files
- **Menu**: `/data/menuData.ts`
- **Restaurant Info**: `/data/restaurantData.ts`
- **Hero Slides**: `/data/heroData.json`
- All changes update these files in real-time

## Security

### Password Change
To change the admin password:
1. Open `/lib/auth.ts`
2. Generate a new hash:
   ```bash
   node -e "const bcrypt = require('bcryptjs'); bcrypt.hash('YOUR_NEW_PASSWORD', 10).then(hash => console.log(hash));"
   ```
3. Replace the hash in the `ADMIN_USERS` array

### Production Deployment
- Set a strong unique password
- Use HTTPS in production
- Set `JWT_SECRET` environment variable
- Enable rate limiting on auth endpoints

## Troubleshooting

### Can't Login
- Check credentials (case-sensitive)
- Clear browser cookies
- Check browser console for errors

### Images Not Uploading
- Check file size (max 10MB)
- Ensure `/public/uploads/` directory exists
- Check file permissions

### Changes Not Showing
- Hard refresh the page (Ctrl+F5 or Cmd+Shift+R)
- Check browser console for errors
- Verify data files updated

### Lost Access
If you lose admin access:
1. Stop the development server
2. Check `/lib/auth.ts` for correct credentials
3. Restart the server
4. Try logging in again

## Keyboard Shortcuts

- **Esc**: Close modals and forms
- **Ctrl/Cmd + S**: Save changes (in forms)
- **Tab**: Navigate through form fields

## Mobile Admin Access

The admin panel is responsive and works on:
- Tablets (iPad, Android tablets)
- Smartphones (with some limitations)
- Desktop recommended for best experience

## Support

For technical issues or questions:
- Check the console for error messages
- Review the main README.md
- Check data file formats
- Verify all dependencies are installed

## Future Features (Coming Soon)

- [ ] Reservation management
- [ ] Analytics dashboard
- [ ] Bulk menu import/export
- [ ] Image optimization
- [ ] Multi-user support
- [ ] Email notifications
- [ ] Database integration




