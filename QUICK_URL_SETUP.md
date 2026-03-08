# Quick Start: Simplify Your URL

Since you already own **devtest512.info**, here are your best options to simplify from `Randal.devtest512.info`:

## Option 1: Simplify Subdomain (Recommended) ⭐

Use a cleaner subdomain on your existing domain:

**Current:** `Randal.devtest512.info`
**New:** `resume.devtest512.info` or `randal.devtest512.info` (lowercase)

### Steps:
1. **Update DNS at your domain registrar:**
   - Go to your DNS management for `devtest512.info`
   - Find the existing record for `Randal` subdomain
   - Either:
     - Change `Randal` to `resume` or `randal` (lowercase)
     - Or add a new CNAME record for your preferred subdomain

2. **Update in Vercel Dashboard:**
   - Settings → Domains
   - Remove `Randal.devtest512.info`
   - Add `resume.devtest512.info` (or your chosen subdomain)
   - Vercel will provide the CNAME target value

3. **DNS Record Example:**
   ```
   Type: CNAME
   Name: resume
   Value: cname.vercel-dns.com
   TTL: 3600
   ```

**Better subdomain options:**
- `resume.devtest512.info` - Clear purpose
- `randal.devtest512.info` - Lowercase (cleaner)
- `portfolio.devtest512.info` - Professional
- `www.devtest512.info` - Use root domain

---

## Option 2: Use Root Domain

Make the resume site your main site at `devtest512.info`:

### Steps:
1. **In Vercel Dashboard:**
   - Settings → Domains
   - Add `devtest512.info`
   - Add `www.devtest512.info`

2. **Update DNS:**
   ```
   Type: A
   Name: @
   Value: 76.76.21.21

   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

3. **Set primary domain:**
   - Choose whether `devtest512.info` or `www.devtest512.info` is primary
   - The other will redirect automatically

---

## Option 3: Free Vercel Subdomain (Backup Option)

If DNS changes are difficult, use a free Vercel subdomain:

1. **Go to Vercel Dashboard:**
   - Settings → General → Project Name
   - Change to: `randal-resume`

2. **Your new URL will be:**
   - `randal-resume.vercel.app`

3. **Keep devtest512.info as well (optional):**
   - You can have both domains pointing to the same site

---

## Comparison

| Option | URL | Professional | Setup Time |
|--------|-----|--------------|------------|
| **Current** | Randal.devtest512.info | ⭐⭐ | - |
| **Option 1** | resume.devtest512.info | ⭐⭐⭐ | 15 min |
| **Option 2** | devtest512.info | ⭐⭐⭐⭐ | 15 min |
| **Option 3** | randal-resume.vercel.app | ⭐⭐ | 2 min |

**Recommended:** Option 1 (`resume.devtest512.info`) or Option 2 (`devtest512.info` root)

---

## Done! ✅

No code changes needed - all changes are in Vercel dashboard and DNS settings.

## Need Help?

- Full guide: [DOMAIN_SETUP.md](./DOMAIN_SETUP.md)
- DNS configuration: See your domain registrar's documentation
- Vercel docs: [vercel.com/docs/concepts/projects/domains](https://vercel.com/docs/concepts/projects/domains)
