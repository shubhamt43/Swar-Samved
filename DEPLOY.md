# Deployment Guide: Swar-Samved

## Local Development

### Running Both Services

#### Terminal 1: Frontend
```bash
pnpm dev
# Frontend: http://localhost:3000
```

#### Terminal 2: Backend
```bash
cd backend
uv run main.py
# Backend: http://localhost:8000
```

## Production Deployment

### Option 1: Deploy to Vercel (Recommended for Frontend)

**Frontend Deployment:**

1. Push your code to GitHub:
```bash
git init
git add .
git commit -m "Initial commit: Swar-Samved AI Music Tutor"
git remote add origin https://github.com/YOUR_USERNAME/swar-samved.git
git push -u origin main
```

2. Go to [vercel.com](https://vercel.com) and connect your GitHub repository

3. Vercel will automatically detect it's a Next.js project and deploy

4. Update environment variable in Vercel dashboard:
```
NEXT_PUBLIC_API_URL=https://your-backend-url.com
```

**Backend Deployment:**

Since the backend requires Python dependencies (librosa, scipy), we recommend using a dedicated Python hosting service.

### Option 2: Deploy Backend to Railway

1. Install Railway CLI:
```bash
npm i -g @railway/cli
```

2. Login:
```bash
railway login
```

3. Create new project:
```bash
railway init
```

4. Configure Procfile in root:
```
web: cd backend && uv run main.py
```

5. Set environment variables in Railway dashboard:
```
PYTHON_VERSION=3.11
```

6. Deploy:
```bash
railway deploy
```

### Option 3: Deploy Backend to AWS Lambda (Serverless)

1. Install serverless framework:
```bash
npm install -g serverless
```

2. Create `serverless.yml`:
```yaml
service: swar-samved-backend

provider:
  name: aws
  region: us-east-1
  runtime: python3.11

functions:
  api:
    handler: backend/main.handler
    timeout: 30
    memorySize: 3008
    layers:
      - !Ref PythonRequirementsLayer

plugins:
  - serverless-python-requirements

custom:
  pythonRequirements:
    dockerizePip: true
    layer: true
```

3. Deploy:
```bash
serverless deploy
```

### Option 4: Deploy to Docker (Any Cloud)

1. Create `Dockerfile` in root:
```dockerfile
# Multi-stage build
FROM node:18-alpine as frontend-build
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install
COPY . .
RUN pnpm build

# Backend stage
FROM python:3.11-slim
WORKDIR /app

# Copy backend
COPY backend/ ./backend/
COPY --from=frontend-build /app/.next ./frontend/.next
COPY --from=frontend-build /app/public ./frontend/public

# Install Python dependencies
RUN pip install fastapi uvicorn python-multipart librosa numpy scipy pydantic

# Expose both ports
EXPOSE 8000 3000

# Run both services (production)
CMD ["sh", "-c", "cd backend && python -m uvicorn main:app --host 0.0.0.0 --port 8000 & cd frontend && next start -p 3000"]
```

2. Build and run:
```bash
docker build -t swar-samved .
docker run -p 3000:3000 -p 8000:8000 swar-samved
```

3. Deploy to cloud (AWS ECS, Google Cloud Run, Azure Container Instances, etc.)

## Environment Variables

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:8000  # Local
# OR
NEXT_PUBLIC_API_URL=https://your-api-domain.com  # Production
```

### Backend (backend/.env)
```
BACKEND_PORT=8000
CORS_ORIGINS=http://localhost:3000,https://your-domain.com
```

## Performance Optimization

### Frontend
- Images are optimized with Next.js Image component
- CSS is minified with Tailwind
- JavaScript is tree-shaken automatically
- Deploy to Vercel Edge Network for fast delivery

### Backend
- Implement caching for frequently analyzed files
- Use async operations to handle multiple requests
- Consider using Redis for session caching
- Monitor API response times

## Scaling Considerations

### Horizontal Scaling
- Frontend: Automatic with Vercel
- Backend: Use load balancer (AWS ALB, Nginx) to distribute traffic

### Vertical Scaling
- Increase backend memory (librosa/scipy are memory-intensive)
- Use higher-tier compute resources
- Consider async task queue (Celery) for long-running analyses

### Caching Strategy
```python
# Example Redis cache for audio analysis
from functools import lru_cache

@lru_cache(maxsize=100)
def analyze_audio_cached(file_hash):
    # Return cached results for identical files
    pass
```

## Monitoring & Logging

### Frontend Monitoring
- Vercel Analytics (included)
- Sentry for error tracking (optional)

### Backend Monitoring
```python
# Add to main.py
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@app.middleware("http")
async def log_requests(request, call_next):
    logger.info(f"Request: {request.method} {request.url}")
    response = await call_next(request)
    logger.info(f"Response: {response.status_code}")
    return response
```

## SSL/HTTPS

### For Production
- Vercel provides free SSL certificates
- AWS/Railway automatically handle SSL
- Use Let's Encrypt for custom domains

## Recommended Production Stack

```
┌─────────────────────────────────────────────────────┐
│                  Frontend (Vercel)                   │
│              Next.js + React + Tailwind              │
│           Global Edge Network with CDN               │
└──────────────────────┬──────────────────────────────┘
                       │ HTTPS
                       │
┌──────────────────────┴──────────────────────────────┐
│                  Load Balancer                       │
│              (AWS ALB / Cloudflare)                  │
└──────────────────────┬──────────────────────────────┘
                       │
      ┌────────────────┼────────────────┐
      │                │                │
   ┌──▼──┐          ┌──▼──┐          ┌──▼──┐
   │ API │          │ API │          │ API │
   │Pod 1│          │Pod 2│          │Pod 3│
   │     │          │     │          │     │
   │FastAPI         │FastAPI         │FastAPI
   │Port 8000       │Port 8000       │Port 8000
   └─────┘          └─────┘          └─────┘
      │                │                │
      └────────────────┼────────────────┘
                       │
            ┌──────────▼──────────┐
            │   Redis Cache       │
            │   (Optional)        │
            └─────────────────────┘
```

## Cost Estimation

### Monthly Costs (Estimated)

**Small Scale (< 100 daily users):**
- Vercel Frontend: $0-20/month
- Railway Backend: $20-50/month
- **Total: $20-70/month**

**Medium Scale (100-1000 daily users):**
- Vercel Frontend: $20-100/month
- AWS Lambda Backend: $50-200/month
- **Total: $70-300/month**

**Large Scale (1000+ daily users):**
- Vercel Enterprise: Custom pricing
- AWS Backend (auto-scaling): $500+/month
- Database/Cache: $100-500/month
- **Total: $600+/month**

## Backup & Disaster Recovery

Since this is a stateless application:
1. No database backups needed
2. All code is in Git (implement auto-backup)
3. Configure Git to auto-sync to GitHub
4. Use Vercel deployment history for rollbacks

## Monitoring Checklist

- [ ] Frontend error tracking enabled
- [ ] Backend API health checks configured
- [ ] CORS properly configured for production domain
- [ ] API rate limiting implemented
- [ ] Logging setup complete
- [ ] Auto-scaling configured
- [ ] SSL/HTTPS enforced
- [ ] Database backups automated (if using)

## Rollback Procedure

### Frontend
```bash
# Vercel automatically keeps deployment history
# Go to Vercel dashboard → select previous deployment → click "Promote to Production"
```

### Backend
```bash
# If using Railway
railway rollback [DEPLOYMENT_ID]

# If using Docker
docker run -p 8000:8000 swar-samved:previous-version
```

## Support

For deployment issues:
1. Check service status pages (Vercel, Railway, AWS, etc.)
2. Review logs (Vercel Logs, CloudWatch, etc.)
3. Test API connectivity with curl:
```bash
curl -X GET http://localhost:8000/health
```

---

Last Updated: March 2025
