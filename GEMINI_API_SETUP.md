# Gemini API Setup and Debugging Guide

## Summary of Changes

The Gemini API integration has been fixed to properly route requests through the backend server instead of making direct API calls from the browser. This improves security and follows best practices.

### What Was Fixed

1. **Backend Route (`app/api/gemini/route.ts`)** - Fixed all issues:
   - ✅ Updated API endpoint from `v1alpha2` to `v1beta`
   - ✅ Changed authentication from `Bearer` token to `?key=` query parameter
   - ✅ Fixed request format to use `{ prompt, systemInstruction }` → `{ contents: [...] }`
   - ✅ Fixed response parsing to extract `data.candidates[0].content.parts[0].text`
   - ✅ Added proper TypeScript types
   - ✅ Added environment variable validation

2. **Frontend (`app/page.tsx`)** - Removed exposed API key:
   - ✅ Removed hardcoded API key `AIzaSyCSimpkdSKmddX_yDyF0NM-mrl0l4tkajA`
   - ✅ Updated `callGeminiAPI()` to call `/api/gemini` backend route
   - ✅ Kept retry logic with exponential backoff

3. **Environment Configuration**:
   - ✅ Created `.env.local.example` template
   - ✅ Updated `.gitignore` to exclude `.env.local` but include `.env.local.example`

## Setup Instructions

### 1. Set Up Environment Variables

**For Local Development:**
```bash
# Copy the example file
cp .env.local.example .env.local

# Edit .env.local and add your API key
# Get your API key from: https://aistudio.google.com/app/apikey
```

**For Vercel Deployment:**
1. Go to your Vercel project settings
2. Navigate to "Environment Variables"
3. Add: `GEMINI_API_KEY` = `your_actual_api_key`
4. Save and redeploy

### 2. Rotate the Exposed API Key

**IMPORTANT:** The API key `AIzaSyCSimpkdSKmddX_yDyF0NM-mrl0l4tkajA` was exposed in the frontend code and should be rotated immediately:

1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Find the exposed key (ending in `...tkajA`)
3. Click "Delete" to revoke it
4. Create a new API key
5. Use the new key in your `.env.local` file (local) or Vercel environment variables (production)

## How to Debug

### If You Get Errors in the Browser

1. **Open Browser DevTools** (F12 or Right-click → Inspect)
2. **Go to Network Tab**
3. **Click "Analyze Fit"** or send a chat message
4. **Find the `/api/gemini` request** and check:

#### Common Error Scenarios:

**Status 500 - "Server configuration error"**
```json
{ "error": "Server configuration error" }
```
**Solution:** `GEMINI_API_KEY` is not set. Check your environment variables.

**Status 400 - "Prompt is required"**
```json
{ "error": "Prompt is required" }
```
**Solution:** Frontend is sending empty prompt. Check the browser console for errors.

**Status 403 - API Key Invalid**
```json
{
  "error": "Gemini API error: API key not valid",
  "status": 403,
  "details": { ... }
}
```
**Solution:** Your API key is invalid or revoked. Generate a new one.

**Status 429 - Rate Limit**
```json
{
  "error": "Gemini API error: Resource has been exhausted",
  "status": 429,
  "details": { ... }
}
```
**Solution:** You've hit the API rate limit. Wait and try again, or upgrade your quota.

### Check Server Logs

**Local Development:**
Check your terminal where you ran `npm run dev`. You should see:
- ✅ Successful: No errors
- ❌ Failed: `GEMINI_API_KEY environment variable is not set`
- ❌ Failed: `Gemini API Error (403): ...`

**Vercel Deployment:**
1. Go to your Vercel dashboard
2. Click on your project
3. Go to "Deployments" → Click on your latest deployment
4. Click "View Function Logs"
5. Look for logs from `/api/gemini`

## API Request/Response Format

### Frontend → Backend (`/api/gemini`)

**Request:**
```json
{
  "prompt": "Analyze this job description...",
  "systemInstruction": "You are an expert IT recruiter..."
}
```

**Response (Success):**
```json
{
  "text": "Based on the job description, Randal is an excellent fit because..."
}
```

**Response (Error):**
```json
{
  "error": "Error message here",
  "status": 500,
  "details": { ... }
}
```

### Backend → Google Gemini API

**Request:**
```json
{
  "contents": [
    {
      "parts": [
        { "text": "Analyze this job description..." }
      ]
    }
  ],
  "system_instruction": {
    "parts": [
      { "text": "You are an expert IT recruiter..." }
    ]
  }
}
```

**Response:**
```json
{
  "candidates": [
    {
      "content": {
        "parts": [
          { "text": "Based on the job description..." }
        ]
      }
    }
  ]
}
```

## Testing the Fix

### Local Testing:

```bash
# 1. Install dependencies
npm install

# 2. Create .env.local with your API key
echo "GEMINI_API_KEY=your_new_api_key_here" > .env.local

# 3. Start the dev server
npm run dev

# 4. Open http://localhost:3000
# 5. Try the "Analyze Fit" feature
# 6. Check browser Network tab for /api/gemini request
# 7. Verify the response has status 200 and contains "text" field
```

### What to Look For:

✅ **Success indicators:**
- Network tab shows `/api/gemini` with status `200`
- Response body contains `{ "text": "..." }`
- No errors in browser console
- No errors in terminal/server logs

❌ **Failure indicators:**
- Status `500`, `403`, or `400`
- Error messages in response body
- Console errors: "Backend API Error"
- Terminal shows: "GEMINI_API_KEY environment variable is not set"

## Security Notes

- ✅ API key is now stored server-side only
- ✅ API key is in `.env.local` which is gitignored
- ✅ Requests go through backend route, not directly from browser
- ⚠️ Remember to rotate the exposed key
- ⚠️ Never commit `.env.local` to git
- ⚠️ Always use environment variables for sensitive data

## Additional Resources

- [Google Gemini API Documentation](https://ai.google.dev/docs)
- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
