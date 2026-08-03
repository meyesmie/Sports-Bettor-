This document explains how to deploy the Sports Bettor prediction platform in a production environment using Docker Compose and optional customisations.

Prerequisites
Docker & Docker Compose installed

A domain name pointing to your server’s public IP (optional)

SSL certificate for HTTPS (recommended, can be handled by a reverse proxy like Traefik or managed by a cloud provider)

Environment variables ready (see .env.example files in both backend/ and frontend/)

Project Structure (for Deployment)
text
sports-bettor/
├── backend/          # Express API + Prisma
├── frontend/         # Next.js app
├── nginx/            # Reverse proxy config
├── docker-compose.yml
└── .env              # (optional, consolidated env)
Quick Start (Local Testing)
Clone the repository

bash
git clone https://github.com/your-repo/sports-bettor.git
cd sports-bettor
Set up environment variables

Copy backend/.env.example to backend/.env

Copy frontend/.env.example to frontend/.env.local

Fill in all required values (database, payment keys, JWT secrets).

Start the stack

bash
docker-compose up -d
This will build and start:

PostgreSQL database

Backend API on port 5000

Frontend on port 3000

Nginx on port 80

Run database migrations (first time only)

bash
docker-compose exec backend npx prisma migrate deploy
Access the app

Frontend: http://localhost

Admin panel: http://localhost/admin/login
(Create the first admin via a script or seed – see below)

Production Considerations
1. Environment Variables
Store all secrets in a secure way. Never commit .env files. For production, you might use Docker secrets, a .env file with restricted permissions, or a secret manager. The essential variables are:

Backend (backend/.env)

text
DATABASE_URL=postgresql://user:password@postgres:5432/sportsbettor
JWT_SECRET=<random-64-char-string>
JWT_REFRESH_SECRET=<another-random-64-char-string>
PAYPAL_CLIENT_ID=...
PAYPAL_SECRET=...
SKRILL_MERCHANT_EMAIL=...
SKRILL_SECRET_WORD=...
PAYSTACK_SECRET_KEY=...
FRONTEND_URL=https://yourdomain.com   # must match actual domain
Frontend (frontend/.env.local)

text
NEXT_PUBLIC_API_URL=https://yourdomain.com/api
NEXT_PUBLIC_PAYPAL_CLIENT_ID=...
NEXT_PUBLIC_PAYSTACK_KEY=pk_live_...
2. Database
The provided docker-compose.yml uses a simple PostgreSQL container. For production:

Use a managed database service (e.g., AWS RDS, DigitalOcean Managed DB).

Update DATABASE_URL accordingly.

Enable backups.

3. HTTPS / SSL
Nginx is currently configured for HTTP only. To add HTTPS:

Option A: Mount SSL certificates into the Nginx container and update default.conf to listen on 443, add certificate paths.

Option B: Use a reverse proxy like Traefik or Caddy that handles SSL automatically via Let’s Encrypt. In that case you can remove the Nginx container and adjust compose file.

4. File Uploads
Team logos and other uploads are stored in the ./uploads directory on the host (mounted as a volume in the backend service). In a multi‑server setup, consider using an object storage (S3, Cloudflare R2) and the backend can be adapted to upload there.

5. First Admin User
Create the initial admin account via a custom script or by connecting to the database:

bash
docker-compose exec backend npx ts-node prisma/seed-admin.ts
Or manually insert a record in the Admin table with a bcrypt‑hashed password.

6. Payment Webhooks
Make sure your payment gateways can reach your server. For local development use tools like ngrok to expose https://your-ngrok-url/api/webhooks/paystack.
In production, set the webhook URL in your PayPal/Paystack dashboard to https://yourdomain.com/api/webhooks/paypal (or /paystack).

Scaling
The backend is stateless and can be scaled horizontally (more containers) if you use an external session store or stick to JWT.

The frontend (Next.js) can also be replicated behind a load balancer.

Nginx is configured to proxy requests to the service names (frontend:3000, backend:5000). Multiple instances can be defined in Docker Compose with replicated services.

Monitoring & Logging
Backend logs are written to stdout and can be collected by Docker logging drivers (e.g., Fluentd, ELK).

Add health checks to containers in docker-compose.yml.

Use a monitoring tool like Prometheus or Datadog for performance metrics.

Troubleshooting
Database connection refused: Ensure PostgreSQL is healthy and DATABASE_URL is correct. Run docker-compose logs postgres.

Payment webhook 401 errors: Check that the webhook URL is correctly set, and that your payment gateway’s IP whitelist includes your server IP.

Admin login loop: Verify JWT secrets are identical across all backend instances and that cookies are sent with Secure and SameSite settings (if you have HTTPS).

Images not loading: Check that uploads/ directory exists and is writable, and that backend is serving them correctly.

Quick Commands
bash
# Rebuild images after changes
docker-compose build

# View logs
docker-compose logs -f backend

# Run database migrations
docker-compose exec backend npx prisma migrate deploy

# Create a backup of the database
docker-compose exec postgres pg_dump -U sportsbettor sportsbettor > backup.sql
