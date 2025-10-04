## ✨ DevCard: Developer Spotlight Template

A modern, customizable developer profile spotlight landing page built with Next.js, TypeScript, Tailwind CSS, and shadcn/ui components.

**Modern Design**: Clean, professional layout with dark/light mode support.  
**Fully Customizable**: Single configuration file for all profile data.  
**Fast & Responsive**: Optimized for all screens & built with Next.js app router.

Maintained by Praveen Thirumurugan (mail@praveent.com) and the community.

---

### Quick start

#### Installation

```bash
npm install
npm run init
```

This will install the required package dependencies and load the dynamic data into your workspace. The `/data` directory contains the basic information for your profile, such as your name, social networks, work experience, etc.

#### Start developing

```bash
npm run dev
```

Server will start running on `http://localhost:3000` by default.

#### Environment Configuration

DevCard supports environment-based configuration for hostnames, security settings, and more. Create a `.env.local` file (or use `.env.example` as a template) to customize your deployment:

```bash
# Port to run the application
PORT=3001

# Base URL for the application
NEXT_PUBLIC_BASE_URL=https://your-domain.com

# Allow search engines to crawl the site (true/false)
NEXT_PUBLIC_ALLOW_ROBOTS=false

# Allowed hostnames for images (comma-separated list)
NEXT_PUBLIC_ALLOWED_IMAGE_HOSTNAMES=placehold.co,your-cdn.com,images.unsplash.com

# Allowed hostnames for external resources (comma-separated list)
NEXT_PUBLIC_ALLOWED_HOSTNAMES=api.your-domain.com,cdn.your-domain.com

# Additional security settings
NEXT_PUBLIC_STRICT_CSP=true

# Development-specific image hostnames (for local development)
NEXT_PUBLIC_DEV_IMAGE_HOSTNAMES=localhost,127.0.0.1
```

**Environment Variables:**

- `NEXT_PUBLIC_BASE_URL`: Your site's base URL (used for SEO and sitemap)
- `NEXT_PUBLIC_ALLOW_ROBOTS`: Controls whether search engines can crawl your site
- `NEXT_PUBLIC_ALLOWED_IMAGE_HOSTNAMES`: Comma-separated list of hostnames allowed for Next.js Image optimization
- `NEXT_PUBLIC_ALLOWED_HOSTNAMES`: General hostnames for external resources
- `NEXT_PUBLIC_STRICT_CSP`: Enable strict Content Security Policy
- `NEXT_PUBLIC_DEV_IMAGE_HOSTNAMES`: Additional image hostnames for development (supports both HTTP and HTTPS)

**Hostname Configuration Examples:**

For production deployment:

```bash
NEXT_PUBLIC_ALLOWED_IMAGE_HOSTNAMES=cdn.example.com,images.example.com,your-bucket.s3.amazonaws.com
```

For development with local images:

```bash
NEXT_PUBLIC_DEV_IMAGE_HOSTNAMES=localhost:3001,192.168.1.100
```

The configuration automatically handles different environments and validates hostnames to ensure security.

Feel free to modify the components to suit your use-case. Note that we keep the `/data` folder backwards-compatible for future versions, but you will see conflicts if `/src` is modified.

#### File Structure

```
src/
├── app/
│   ├── layout.tsx             # Root layout
│   ├── page.tsx               # Main page component
│   ├── articles/              # Articles (MDX-backed)
│   ├── community/             # Community (MDX-backed)
│   ├── projects/              # Projects and stacks
│   ├── work/                  # Work experience pages
│   └── education/             # Education pages
├── components/                # UI and section components
├── styles/                    # Global styles and theme
├── types/                     # TypeScript type definitions
└── lib/                       # Helper utilities
```

#### Deployment

When deploying DevCard to production, make sure to:

1. **Set environment variables** in your hosting platform (Vercel, Netlify, etc.)
2. **Configure allowed hostnames** for any external image sources or CDNs
3. **Enable strict CSP** for enhanced security in production
4. **Set the correct base URL** for proper SEO and sitemap generation

---

##### Contributing & License

See [CONTRIBUTING.md](CONTRIBUTING.md) for details on open-source contributions. This project is licensed under the MIT License.

##### Assets and trademarks

Logos and trademarks in `public/images/tech-icons` and elsewhere are the property of their respective owners and are used here for identification purposes only. If you are an owner and would like your asset removed or attributed differently, please open an issue.

---

Made with love, for the community ❤️
