# ConstructionCody - Complete Deployment Guide

## Quick Deploy (5 Minutes)

### Step 1: Get Google API Key (2 minutes)

1. Go to https://makersuite.google.com/app/apikey
2. Click "Get API Key"
3. Click "Create API key in new project"
4. Copy the key (starts with `AIza...`)

### Step 2: Deploy to Vercel (3 minutes)

#### Option A: GitHub + Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/constructioncody.git
   git push -u origin main
   ```

2. **Connect to Vercel**
   - Go to https://vercel.com/new
   - Click "Import Git Repository"
   - Select your repository
   - Click "Import"

3. **Add Environment Variable**
   - In Vercel dashboard, go to Settings > Environment Variables
   - Add variable:
     - Name: `GOOGLE_API_KEY`
     - Value: Your Google API key
   - Click "Save"

4. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes
   - Done! Your app is live

#### Option B: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - Project name? constructioncody
# - Directory? ./
# - Override settings? No

# Add environment variable
vercel env add GOOGLE_API_KEY production

# Paste your Google API key when prompted

# Deploy to production
vercel --prod
```

## Your Live URL

After deployment, you'll get:
- **Production**: `https://constructioncody.vercel.app`
- **Preview**: `https://constructioncody-git-main-yourusername.vercel.app`

## Custom Domain (Optional)

1. Go to Project Settings > Domains
2. Add your domain (e.g., `constructioncody.com`)
3. Update DNS records as shown
4. Wait for DNS propagation (5-30 minutes)

## Vercel Dashboard Features

### Analytics

- View visitors, page views, and conversions
- Free on all plans
- Enable: Project Settings > Analytics

### Logs

- View API logs and errors
- Real-time monitoring
- Access: Deployments > [Your Deployment] > Logs

### Environment Variables

- Manage API keys securely
- Separate values for production/preview/development
- Access: Project Settings > Environment Variables

## Testing Your Deployment

1. **Visit Your URL**
   ```
   https://constructioncody.vercel.app
   ```

2. **Test AI Chat**
   - Type a question about construction
   - Verify you get a response
   - Check question counter updates

3. **Test on Mobile**
   - Open on phone browser
   - Check responsive design
   - Test chat functionality

## Monitoring

### Check API Usage

1. Go to https://makersuite.google.com/app/apikey
2. Click on your API key
3. View usage statistics
4. Monitor rate limits

### Check Vercel Usage

1. Go to Vercel Dashboard
2. Click on your project
3. View Analytics tab
4. Monitor bandwidth and requests

## Common Issues

### Issue: "API key not found"

**Solution:**
```bash
# Add environment variable
vercel env add GOOGLE_API_KEY production
```

### Issue: "Too many requests"

**Solution:**
- You've hit the free tier limit (60 req/min)
- Wait a minute or upgrade to paid tier
- Consider adding rate limiting

### Issue: Build fails

**Solution:**
```bash
# Check build locally first
npm run build

# If it works locally, check Vercel logs
vercel logs
```

## Updating Your App

### Push Updates

```bash
git add .
git commit -m "Update feature"
git push origin main
```

Vercel automatically rebuilds and deploys!

### Manual Deploy

```bash
vercel --prod
```

## Performance Optimization

### Enable Edge Functions

In `src/app/api/chat/route.ts`, add:
```typescript
export const runtime = 'edge';
```

Benefits:
- Faster response times
- Lower latency globally
- Better scaling

### Add Caching

Create `src/middleware.ts`:
```typescript
import { NextResponse } from 'next/server';

export function middleware(request: Request) {
  const response = NextResponse.next();
  
  response.headers.set('Cache-Control', 's-maxage=60, stale-while-revalidate');
  
  return response;
}
```

## Security Best Practices

### 1. Rate Limiting

Install rate limiting:
```bash
npm install @upstash/ratelimit @upstash/redis
```

### 2. Environment Variables

- Never commit `.env.local`
- Use Vercel environment variables
- Rotate API keys regularly

### 3. CORS Configuration

Already configured in API route. Adjust as needed:
```typescript
export async function OPTIONS() {
  return new NextResponse(null, {
    headers: {
      'Access-Control-Allow-Origin': 'https://yourdomain.com',
      // ...
    },
  });
}
```

## Scaling Plan

### Free Tier (Current)
- ✅ Unlimited bandwidth
- ✅ 100 GB-hours serverless functions
- ✅ Great for MVP and testing

### Pro Tier ($20/month)
- ✅ Advanced analytics
- ✅ Team collaboration
- ✅ Priority support
- ✅ Custom domains

### Enterprise
- ✅ Dedicated infrastructure
- ✅ SLA guarantees
- ✅ Advanced security
- ✅ Custom contracts

## Cost Estimation

### Current Stack (All Free!)

| Service | Free Tier | Cost |
|---------|-----------|------|
| Vercel | 100 GB bandwidth | $0 |
| Google Gemini | 60 req/min | $0 |
| **Total** | - | **$0/month** |

### At Scale (1,000 users/day)

| Service | Usage | Cost |
|---------|-------|------|
| Vercel | ~500GB/month | $20/month (Pro) |
| Google Gemini | ~30K requests/day | ~$10/month |
| **Total** | - | **~$30/month** |

## Backup Strategy

### Export Your Code

```bash
# Always have local copy
git clone https://github.com/yourusername/constructioncody.git
```

### Database Backups

When you add a database:
- Use Vercel Postgres (auto backups)
- Or manually backup with `pg_dump`

## Next Steps After Deployment

1. **Add Analytics**
   - Vercel Analytics (free)
   - Google Analytics
   - PostHog for product analytics

2. **Add Authentication**
   - NextAuth.js for OAuth
   - Email/password auth
   - Social logins

3. **Add Database**
   - Vercel Postgres
   - PlanetScale MySQL
   - Supabase PostgreSQL

4. **Add Email**
   - Resend (5K emails/month free)
   - SendGrid
   - AWS SES

5. **Add Payments**
   - Stripe integration
   - Subscription management
   - Billing portal

## Support Resources

- **Vercel**: https://vercel.com/docs
- **Next.js**: https://nextjs.org/docs
- **Google AI**: https://ai.google.dev/docs
- **Community**: Vercel Discord, GitHub Discussions

## Troubleshooting Commands

```bash
# Check current deployment
vercel ls

# View logs
vercel logs

# Check environment variables
vercel env ls

# Remove deployment
vercel remove constructioncody

# Rollback to previous deployment
vercel rollback [deployment-url]
```

## Success Checklist

- [ ] App deployed to Vercel
- [ ] Google API key configured
- [ ] Custom domain connected (optional)
- [ ] Analytics enabled
- [ ] Tested on mobile
- [ ] Error monitoring set up
- [ ] Shared with first users
- [ ] Documented feedback process

---

**You're live!** 🎉

Your ConstructionCody app is now deployed and ready to help construction professionals worldwide.

Next: Share your URL and start getting feedback!
