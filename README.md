# Lifted Up Junk - Website

A warm, community-focused website for Lifted Up Junk, a locally owned junk removal company providing fast, friendly, and affordable hauling services.

## 🚚 About

Lifted Up Junk is a faith-driven, eco-friendly junk removal service that treats customers with respect and care. We donate reusable items, recycle materials, and minimize landfill waste while providing transparent pricing and same-week service.

## 🌟 Features

- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Warm Color Palette**: Orange and cream tones create a welcoming, community feel
- **SEO Optimized**: Meta tags, structured data, and semantic HTML for better search rankings
- **Interactive Elements**: FAQ accordion, smooth scrolling, mobile menu
- **Contact Form**: Easy quote request system
- **Accessibility**: Proper ARIA labels and semantic markup

## 📄 Pages/Sections

- **Home**: Hero section with clear value proposition
- **How It Works**: 3-step process explanation
- **Services**: Comprehensive list of junk removal services
- **Why Choose Us**: Key benefits and differentiators
- **Eco-Friendly**: Commitment to donation and recycling
- **About**: Company story and values
- **FAQ**: Common questions and answers
- **Service Area**: Geographic coverage information
- **Contact**: Quote request form and contact information

## 🚀 Deployment on Netlify

### Quick Deploy

1. **Push to GitHub** (if not already done):
   ```bash
   git add .
   git commit -m "Initial website commit"
   git push origin main
   ```

2. **Connect to Netlify**:
   - Go to [Netlify](https://app.netlify.com/)
   - Click "Add new site" → "Import an existing project"
   - Choose "GitHub" and authorize Netlify
   - Select the `liftedupjunk/website` repository
   - Netlify will auto-detect the settings from `netlify.toml`
   - Click "Deploy site"

3. **Custom Domain** (optional):
   - In Netlify dashboard, go to "Domain settings"
   - Click "Add custom domain"
   - Follow instructions to connect your domain

### Manual Deploy

Alternatively, you can drag and drop the entire folder to Netlify:

1. Go to [Netlify Drop](https://app.netlify.com/drop)
2. Drag the website folder
3. Your site will be live instantly

## 🛠️ Local Development

To view the website locally:

1. Simply open `index.html` in a web browser, or
2. Use a local server:
   ```bash
   # Using Python
   python3 -m http.server 8000
   
   # Using Node.js
   npx serve
   
   # Using PHP
   php -S localhost:8000
   ```
3. Visit `http://localhost:8000` in your browser

## 📁 File Structure

```
website/
├── index.html          # Main HTML file with all content
├── styles.css          # Complete styling and responsive design
├── script.js           # Interactive features and functionality
├── netlify.toml        # Netlify configuration
├── _redirects          # URL redirects for Netlify
├── README.md           # This file
└── documents/          # Client documentation (PDFs)
```

## 🎨 Design System

### Colors
- **Primary Orange**: #E67E22 (warm, friendly)
- **Dark Orange**: #D35400 (accents)
- **Cream**: #FFF8F0 (background)
- **Beige**: #F5E6D3 (sections)
- **Text Dark**: #2C1810 (headings)

### Typography
- **Headings**: Poppins (sans-serif)
- **Body**: Open Sans (sans-serif)

### Key Features
- Smooth animations and transitions
- Card-based layout with shadows
- Gradient backgrounds
- Mobile-first responsive design

## 📝 Customization

### Update Contact Information

Edit the contact section in `index.html` to add:
- Phone number
- Email address
- Physical address
- Business hours

### Add Service Area

Replace `[City + nearby cities and counties]` in the Service Area section with actual locations.

### Add Images

Replace the placeholder sections with actual photos:
1. Team photos in the About section
2. Before/after photos in Services
3. Eco-friendly donation photos
4. Add a logo in the navigation

### Enable Contact Form

The form is ready for Netlify Forms. To activate:
1. Add `name="contact"` and `data-netlify="true"` to the form tag
2. Deploy to Netlify
3. Form submissions will appear in your Netlify dashboard

## 🔍 SEO Setup

The website includes:
- ✅ Meta descriptions
- ✅ Open Graph tags for social sharing
- ✅ Structured data (JSON-LD) for rich search results
- ✅ Semantic HTML5
- ✅ Mobile-friendly design
- ✅ Fast loading times

### Next Steps for SEO:
1. Add your Google Business Profile
2. Create a Google Search Console account
3. Submit sitemap (Netlify auto-generates this)
4. Build local citations and backlinks

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📄 License

© 2025 Lifted Up Junk. All rights reserved.

## 🤝 Support

For questions about the website, contact the development team or refer to the Netlify documentation for hosting questions.

---

**Built with ❤️ for the Lifted Up Junk community**