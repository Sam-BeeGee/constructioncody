# ConstructionCody - AI Construction Assistant

A professional AI-powered construction management platform built with Next.js 14, Google Gemini API, and deployed on Vercel.

## Features

- **Free AI Chat**: 30 free questions powered by Google Gemini Pro
- **Real-time Responses**: Instant AI responses about construction, NEC codes, and best practices
- **Professional UI**: Clean, modern interface without distractions
- **Freemium Model**: Try before you buy with smooth upgrade path
- **Mobile Responsive**: Works perfectly on all devices

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **AI**: Google Gemini Pro API
- **Deployment**: Vercel
- **State Management**: React Hooks

## Prerequisites

- Node.js 18+ installed
- Google API key (free from Google AI Studio)
- Vercel account (free tier works great)

## Getting Started

### 1. Clone and Install

```bash
# Create a new Next.js project or use this code
npm install
```

### 2. Get Google Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Click "Get API Key"
3. Create a new API key (it's free!)
4. Copy the key

### 3. Set Up Environment Variables

Create a `.env.local` file in the root directory:

```env
GOOGLE_API_KEY=your_google_gemini_api_key_here
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deploy to Vercel

### Option 1: Using Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Add environment variable
vercel env add GOOGLE_API_KEY
```

### Option 2: Using Vercel Dashboard

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Add environment variable:
   - Name: `GOOGLE_API_KEY`
   - Value: Your Google API key
6. Click "Deploy"

### Option 3: Deploy Button

Click this button to deploy:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/constructioncody)

## Project Structure

```
constructioncody-app/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── chat/
│   │   │       └── route.ts          # Gemini API endpoint
│   │   ├── layout.tsx                # Root layout
│   │   ├── page.tsx                  # Main chat page
│   │   └── globals.css               # Global styles
│   └── components/
│       ├── ChatMessage.tsx           # Message bubble component
│       ├── ChatInput.tsx             # Input with suggestions
│       ├── Sidebar.tsx               # Pro features sidebar
│       └── LoginModal.tsx            # Sign up/in modal
├── public/                           # Static assets
├── .env.local                        # Environment variables (local)
├── .env.example                      # Example env file
├── next.config.js                    # Next.js configuration
├── tailwind.config.js                # Tailwind configuration
├── tsconfig.json                     # TypeScript configuration
└── package.json                      # Dependencies
```

## API Routes

### POST /api/chat

Send a message to the AI and get a response.

**Request:**
```json
{
  "message": "What are NEC grounding requirements?",
  "conversationHistory": [
    {
      "role": "user",
      "content": "Previous question"
    },
    {
      "role": "assistant",
      "content": "Previous answer"
    }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "response": "According to NEC Article 250...",
  "timestamp": "2025-10-13T12:00:00Z"
}
```

## Customization

### Update System Prompt

Edit the `SYSTEM_PROMPT` in `src/app/api/chat/route.ts` to customize the AI's behavior and expertise.

### Change Free Question Limit

Update `MAX_FREE_QUESTIONS` in `src/app/page.tsx` (currently set to 30).

### Modify Suggestions

Edit the `SUGGESTIONS` array in `src/components/ChatInput.tsx`.

### Customize Styling

All styles use Tailwind CSS. The primary color scheme is defined in `tailwind.config.js`.

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `GOOGLE_API_KEY` | Google Gemini API key | Yes |
| `NEXT_PUBLIC_APP_URL` | Your app URL | No (defaults to localhost) |

## Google Gemini API

### Why Gemini?

- **Free Tier**: Generous free quota
- **No Credit Card**: Start immediately without payment info
- **Powerful**: Comparable to GPT-4 for most tasks
- **Fast**: Low latency responses
- **Easy**: Simple API, great docs

### API Limits (Free Tier)

- 60 requests per minute
- Plenty for small-to-medium apps
- Upgrade to paid tier for higher limits

### Getting the API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with Google
3. Click "Get API Key"
4. Copy and use immediately

## Performance

- **First Load**: ~500ms (Next.js 14 optimizations)
- **API Response**: 1-3 seconds (Gemini Pro)
- **Caching**: Built-in with Next.js
- **Bundle Size**: Optimized with tree-shaking

## Security

- API key stored in environment variables
- Never exposed to client
- CORS protection enabled
- Rate limiting recommended for production

## Production Checklist

- [ ] Set production `GOOGLE_API_KEY`
- [ ] Update `NEXT_PUBLIC_APP_URL`
- [ ] Add rate limiting (Vercel Edge Config)
- [ ] Set up analytics (Vercel Analytics)
- [ ] Configure custom domain
- [ ] Test on mobile devices
- [ ] Set up error monitoring (Sentry)
- [ ] Add SEO metadata
- [ ] Test all user flows

## Scaling Considerations

### If You Get Popular

1. **Rate Limiting**: Add rate limiting per IP/user
2. **Caching**: Cache common questions/responses
3. **Paid Tier**: Upgrade to Gemini API paid tier
4. **Database**: Add PostgreSQL for user accounts
5. **Authentication**: Implement proper auth (NextAuth.js)
6. **Analytics**: Track usage and conversions

### Estimated Costs

- **Hosting (Vercel)**: Free for up to 100GB bandwidth
- **API (Google)**: Free for first 60 req/min, then $0.00025/1K characters
- **Example**: 10K questions/day = ~$1-2/day

## Troubleshooting

### API Key Not Working

- Check `.env.local` file exists
- Verify key is correct (no extra spaces)
- Restart dev server after adding key

### Deployment Fails

- Ensure environment variables are set in Vercel
- Check build logs for errors
- Verify all dependencies are installed

### API Returns 500 Error

- Check API key is valid
- Verify internet connection
- Check Google AI Studio for service status

## Next Steps

1. **Add Authentication**: Implement user accounts
2. **Add Database**: Store conversation history
3. **Pro Features**: Build document upload, RFI management
4. **Mobile App**: Create React Native version
5. **Analytics**: Track conversions and usage

## Support

- **Documentation**: [Next.js Docs](https://nextjs.org/docs)
- **Gemini API**: [Google AI Docs](https://ai.google.dev/docs)
- **Vercel**: [Vercel Docs](https://vercel.com/docs)

## License

Proprietary - All rights reserved

## Credits

Built with:
- [Next.js](https://nextjs.org/)
- [Google Gemini](https://ai.google.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vercel](https://vercel.com/)

---

**Ready to deploy?** Push to GitHub and connect to Vercel. You'll be live in minutes!
