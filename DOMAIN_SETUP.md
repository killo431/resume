# Domain Setup Guide: Simplifying Your Website URL

## Current Situation

Your website is currently accessible at **Randal.devtest512.info**. Since you already own **devtest512.info**, this guide will help you optimize your URL structure without purchasing a new domain.

## Quick Start: Using Your Existing Domain

Since you already own **devtest512.info**, you have FREE options to simplify your URL:

### Best Option: Use Root Domain
**Current:** `Randal.devtest512.info`
**New:** `devtest512.info`

✅ Shortest possible URL with your domain
✅ No extra cost
✅ Most professional

[Jump to setup instructions](#using-your-existing-domain-devtest512info)

### Alternative: Cleaner Subdomain
**Current:** `Randal.devtest512.info`
**New:** `resume.devtest512.info` or `randal.devtest512.info`

✅ Clear purpose
✅ No extra cost
✅ Keeps root available for other uses

[Jump to setup instructions](#using-your-existing-domain-devtest512info)

---

## Overview

The good news is that **no code changes are required**. The domain `Randal.devtest512.info` is not hardcoded anywhere in the application. All URL changes are handled through:
1. Vercel Dashboard (deployment platform)
2. DNS Provider (your domain registrar for devtest512.info)

## Recommended URL Options

Here are your options, prioritizing your existing domain:

### Using Your Existing Domain (FREE)

#### Option 1: Root Domain (Recommended)
- `devtest512.info` - Shortest and cleanest with your domain

#### Option 2: Cleaner Subdomain
- `resume.devtest512.info` - Clear purpose
- `randal.devtest512.info` - Personal (lowercase)
- `portfolio.devtest512.info` - Professional focus

### Alternative Options (If Purchasing New Domain)

#### Option 3: Personal Domain
- `randal.dev` - Professional and clean
- `randalderego.com` - Full name variant
- `rderego.com` - Abbreviated variant

#### Option 4: Free Vercel Domain
- `randal-resume.vercel.app` - Free Vercel subdomain (no custom domain needed)

---

## Using Your Existing Domain: devtest512.info

Since you already own this domain, here's how to optimize its use:

### Setup Option A: Use Root Domain (devtest512.info)

This gives you the shortest URL with your existing domain.

#### Step 1: Configure DNS Records

Log into your DNS provider where you manage `devtest512.info` and add/update these records:

**For Root Domain:**
```
Type: A
Name: @ (or leave blank for root)
Value: 76.76.21.21
TTL: 3600 (or automatic)
```

**For www Subdomain:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600 (or automatic)
```

#### Step 2: Configure in Vercel

1. **Log into Vercel Dashboard:**
   - Go to [vercel.com](https://vercel.com)
   - Navigate to your project (resume)

2. **Add Domains:**
   - Click on your project
   - Go to **Settings** → **Domains**
   - Click **Add Domain**
   - Enter `devtest512.info`
   - Click **Add**
   - Repeat to add `www.devtest512.info`

3. **Set Primary Domain:**
   - Click the three dots next to your preferred domain (e.g., `devtest512.info`)
   - Select **Set as Primary Domain**
   - The www version will redirect to it

4. **Remove Old Domain:**
   - Find `Randal.devtest512.info` in the domain list
   - Click the three dots → **Remove**

#### Step 3: Verify

1. Wait 5-30 minutes for DNS propagation
2. Visit [whatsmydns.net](https://www.whatsmydns.net)
3. Enter `devtest512.info` and check if records show correctly
4. Visit your new URL to confirm it's working
5. Check that HTTPS is working (Vercel auto-provisions SSL)

---

### Setup Option B: Use Cleaner Subdomain (resume.devtest512.info)

This keeps your root domain available for other uses.

#### Step 1: Configure DNS Records

Log into your DNS provider where you manage `devtest512.info`:

**Option 1: Update Existing Record**
If you have a record for `Randal`:
```
Type: CNAME
Name: Change "Randal" to "resume" (or "randal" lowercase)
Value: cname.vercel-dns.com
TTL: 3600
```

**Option 2: Add New Record**
If you want to keep the old one temporarily:
```
Type: CNAME
Name: resume (or randal, or portfolio)
Value: cname.vercel-dns.com
TTL: 3600
```

#### Step 2: Configure in Vercel

1. **Log into Vercel Dashboard:**
   - Go to [vercel.com](https://vercel.com)
   - Navigate to your project (resume)

2. **Add New Domain:**
   - Go to **Settings** → **Domains**
   - Click **Add Domain**
   - Enter `resume.devtest512.info` (or your chosen subdomain)
   - Click **Add**
   - Vercel will verify the DNS record

3. **Set as Primary (optional):**
   - If you want this as your main URL
   - Click the three dots next to the domain
   - Select **Set as Primary Domain**

4. **Remove Old Domain:**
   - Find `Randal.devtest512.info` in the domain list
   - Click the three dots → **Remove**

#### Step 3: Verify

1. Wait 5-15 minutes for DNS propagation
2. Visit [whatsmydns.net](https://www.whatsmydns.net)
3. Enter `resume.devtest512.info` and check CNAME record
4. Visit your new URL to confirm it's working
5. Check that HTTPS is working (Vercel auto-provisions SSL)

---

## Purchasing a New Domain (Optional Future Upgrade)

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
