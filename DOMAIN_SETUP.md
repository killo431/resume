# Domain Setup Guide: Simplifying Your Website URL

## Current Situation

Your website is currently accessible at **Randal.devtest512.info**. This guide will help you set up a simpler, more professional URL.

## Overview

The good news is that **no code changes are required**. The domain `Randal.devtest512.info` is not hardcoded anywhere in the application. All URL changes are handled through:
1. Vercel Dashboard (deployment platform)
2. DNS Provider (domain registrar)

## Recommended URL Options

Here are some simpler URL options you could use:

### Option 1: Personal Domain (Recommended)
- `randal.dev` - Professional and clean
- `randalderego.com` - Full name variant
- `rderego.com` - Abbreviated variant

### Option 2: Subdomain
- `resume.randal.dev` - Keep resume separate from main site
- `portfolio.randal.dev` - Professional portfolio subdomain

### Option 3: Free Vercel Domain
- `randal-resume.vercel.app` - Free Vercel subdomain (no custom domain needed)
- `randal-portfolio.vercel.app` - Alternative free option

## Step-by-Step Setup Process

### Step 1: Choose and Purchase a Domain (if needed)

If you want a custom domain like `randal.dev`:

1. **Purchase from a registrar:**
   - [Namecheap](https://www.namecheap.com) - Affordable, good UI
   - [Google Domains](https://domains.google) - Easy integration
   - [Cloudflare](https://www.cloudflare.com/products/registrar/) - At-cost pricing
   - [GoDaddy](https://www.godaddy.com) - Popular option

2. **Cost:** Typically $10-15/year for `.com` domains, $20-30/year for `.dev` domains

### Step 2: Configure Domain in Vercel

1. **Log into Vercel Dashboard:**
   - Go to [vercel.com](https://vercel.com)
   - Navigate to your project (resume)

2. **Add Custom Domain:**
   - Click on your project
   - Go to **Settings** → **Domains**
   - Click **Add Domain**
   - Enter your new domain (e.g., `randal.dev`)
   - Click **Add**

3. **Vercel will provide DNS records** you need to configure

### Step 3: Configure DNS Records

You'll need to add these DNS records at your domain registrar:

#### For Root Domain (e.g., `randal.dev`):
```
Type: A
Name: @
Value: 76.76.21.21
TTL: 3600 (or automatic)
```

#### For www Subdomain:
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600 (or automatic)
```

#### Alternative (CNAME for root domain):
Some providers allow:
```
Type: CNAME
Name: @
Value: cname.vercel-dns.com
TTL: 3600
```

### Step 4: Verify Domain

1. **Wait for DNS propagation** (can take 5 minutes to 48 hours, usually ~15 minutes)
2. **Check propagation status:**
   - Use [whatsmydns.net](https://www.whatsmydns.net)
   - Enter your domain
   - Check if A or CNAME records are showing correctly

3. **Verify in Vercel:**
   - Return to Vercel → Settings → Domains
   - Your domain should show as "Valid" with a green checkmark
   - SSL certificate will be automatically provisioned

### Step 5: Set Primary Domain (Optional)

If you added multiple domains:

1. In Vercel → Settings → Domains
2. Click the three dots next to your preferred domain
3. Select **Set as Primary Domain**
4. All other domains will redirect to this one

## Using Free Vercel Domain (No Custom Domain Needed)

If you want to simplify without purchasing a domain:

1. **Go to Vercel Dashboard** → Your Project
2. **Settings** → **General** → **Project Name**
3. **Change project name** to something simple like:
   - `randal-resume`
   - `randal-portfolio`
   - `randal-dev`

4. Your URL will automatically become:
   - `randal-resume.vercel.app`
   - Much simpler than `Randal.devtest512.info`!

## Removing Old Domain

Once your new domain is working:

1. **In Vercel Dashboard:**
   - Go to Settings → Domains
   - Find `Randal.devtest512.info`
   - Click the three dots → **Remove**

2. **In DNS Provider (devtest512.info):**
   - Remove or update the DNS record for `Randal` subdomain
   - Or keep it as a redirect if you want

## DNS Configuration Examples by Provider

### Namecheap
1. Dashboard → Domain List
2. Click **Manage** next to your domain
3. Go to **Advanced DNS** tab
4. Click **Add New Record**
5. Add the A or CNAME records from Vercel

### Cloudflare
1. Select your domain
2. Go to **DNS** tab
3. Click **Add Record**
4. Add the A or CNAME records from Vercel
5. **Important:** Set proxy status to "DNS only" (gray cloud)

### Google Domains
1. Select your domain
2. Click **DNS** in the left menu
3. Scroll to **Custom resource records**
4. Add the A or CNAME records from Vercel

## Troubleshooting

### Domain not working after DNS configuration
- **Check DNS propagation:** Use whatsmydns.net
- **Wait longer:** DNS can take up to 48 hours
- **Check DNS records:** Ensure they match exactly what Vercel provided
- **Clear browser cache:** Press Ctrl+F5 or Cmd+Shift+R

### SSL Certificate issues
- Vercel automatically provisions SSL certificates
- Can take 5-10 minutes after DNS is verified
- Check in Vercel → Settings → Domains for certificate status

### "Domain already in use" error
- Domain might be claimed by another Vercel project
- Remove it from the old project first
- Or contact Vercel support to transfer

## Verification Checklist

- [ ] Domain purchased (or decided to use free Vercel domain)
- [ ] Domain added in Vercel Dashboard
- [ ] DNS A record configured (or CNAME)
- [ ] DNS www CNAME configured (if using root domain)
- [ ] DNS propagation verified (whatsmydns.net)
- [ ] Domain shows "Valid" in Vercel
- [ ] SSL certificate provisioned (https:// works)
- [ ] Set as primary domain (if multiple domains)
- [ ] Old domain removed (optional)
- [ ] Website loads correctly on new URL

## Need Help?

- **Vercel Documentation:** [vercel.com/docs/concepts/projects/domains](https://vercel.com/docs/concepts/projects/domains)
- **DNS Help:** [vercel.com/docs/concepts/projects/domains/troubleshooting](https://vercel.com/docs/concepts/projects/domains/troubleshooting)
- **Vercel Support:** Available through dashboard

## Summary

**For simplest solution without cost:**
- Change Vercel project name to `randal-resume`
- Use `randal-resume.vercel.app` (free!)

**For professional custom domain:**
- Purchase `randal.dev` or similar (~$20-30/year)
- Add to Vercel → Settings → Domains
- Configure DNS records at your registrar
- Wait for DNS propagation
- Verify and set as primary

**No code changes needed!** Your application is already configured to work with any domain.
