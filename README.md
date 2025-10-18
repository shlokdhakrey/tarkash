# InnovateX 2025 - Hackathon Management Platform

<div align="center">
  
  ![InnovateX 2025](https://via.placeholder.com/800x200/4f46e5/ffffff?text=InnovateX+2025)
  
  **A modern, full-stack hackathon management platform built with Next.js, NestJS, and PostgreSQL**

  [![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)](https://www.typescriptlang.org/)
  [![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
  [![NestJS](https://img.shields.io/badge/NestJS-10-red)](https://nestjs.com/)
  [![Prisma](https://img.shields.io/badge/Prisma-5.7-2D3748)](https://www.prisma.io/)
  [![License](https://img.shields.io/badge/License-MIT-green)](./LICENSE)

</div>

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [Development](#development)
- [Deployment](#deployment)
- [Documentation](#documentation)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Overview

**InnovateX 2025** is a comprehensive hackathon management platform designed for **College of Engineering** to streamline the entire hackathon lifecycle—from participant registration and team formation to submission management, judging, and winner announcements.

Built with modern, enterprise-grade technologies and following best practices for security, scalability, and maintainability.

### Event Details
- **Event:** InnovateX 2025
- **College:** College of Engineering
- **Timezone:** Asia/Kolkata (IST)

---

## ✨ Features

### 🎓 **For Participants**
- ✅ User registration & authentication (JWT + OAuth)
- 👥 Team creation & management (1-4 members)
- 📝 Project idea submission with file uploads
- 📊 Real-time status tracking & dashboard
- 🔔 Notifications & announcements
- 📅 Event timeline & schedule
- ❓ FAQ & support

### 👨‍⚖️ **For Judges**
- 🎯 Blind submission evaluation
- 📋 Weighted rubric-based scoring
- 💬 Comments & feedback
- 📈 Real-time leaderboard
- 🔄 Batch assignment management

### 🔐 **For Admins**
- 📊 Comprehensive analytics dashboard
- ✅ Team approval workflows
- 👥 Judge & sponsor management
- 📧 Bulk email notifications
- 📥 CSV/Excel exports
- 🏆 Certificate generation
- 🎨 Dynamic event configuration
- 📝 Audit logs

### 🔒 **Security & Compliance**
- 🔐 JWT authentication with refresh tokens
- 🔑 Password hashing (bcrypt)
- 🛡️ Input validation & sanitization
- 🚦 Rate limiting & DDoS protection
- 🔒 Helmet, CORS, CSRF protection
- 📁 Secure file uploads with virus scanning
- 🔍 GDPR-compliant data handling
- 📜 Audit trail

### 🎨 **UI/UX**
- 🌐 Fully responsive design
- ♿ WCAG 2.1 accessibility compliance
- 🎭 Framer Motion animations
- 🌌 Three.js animated backgrounds
- 🎨 Dark mode support
- 📱 PWA with offline support
- 🚀 Optimized performance (Lighthouse 90+)

---

## 🛠 Tech Stack

### **Frontend**
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript 5.3
- **Styling:** TailwindCSS 4
- **Animation:** Framer Motion, Three.js, Lottie
- **State:** React Query (TanStack Query)
- **Forms:** React Hook Form + Zod
- **UI Components:** Custom design system + Storybook

### **Backend**
- **Framework:** NestJS 10
- **Language:** TypeScript 5.3
- **Database:** PostgreSQL 15
- **ORM:** Prisma 5.7
- **Authentication:** JWT + Passport
- **Validation:** class-validator
- **API Docs:** Swagger/OpenAPI
- **Caching:** Redis (optional)

### **Infrastructure**
- **Containerization:** Docker + Docker Compose
- **CI/CD:** GitHub Actions
- **Frontend Hosting:** Vercel
- **Backend Hosting:** DigitalOcean / AWS
- **Storage:** S3 / MinIO
- **Monitoring:** Sentry, Winston/Pino

### **Testing**
- **Unit Tests:** Jest + React Testing Library
- **E2E Tests:** Playwright
- **Code Quality:** ESLint, Prettier, Husky

---

## 🏗 Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                       Client (Browser)                       │
│              Next.js 14 (App Router) + React                │
└────────────────────────┬────────────────────────────────────┘
                         │
                         │ HTTPS / REST API
                         │
┌────────────────────────▼────────────────────────────────────┐
│                    API Gateway / CORS                        │
│                  NestJS Backend (Node.js)                   │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Auth    Teams    Submissions   Judges    Admin     │  │
│  │  Module  Module     Module      Module    Module    │  │
│  └──────────────────────┬───────────────────────────────┘  │
└─────────────────────────┼──────────────────────────────────┘
                          │
          ┌───────────────┼───────────────┐
          │               │               │
┌─────────▼─────┐  ┌─────▼─────┐  ┌─────▼──────┐
│   PostgreSQL  │  │   Redis   │  │  MinIO/S3  │
│   (Prisma)    │  │  (Cache)  │  │  (Storage) │
└───────────────┘  └───────────┘  └────────────┘
```

See [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md) for detailed architecture diagrams.

---

## 🚀 Getting Started

### **Prerequisites**

- Node.js 20+ ([Download](https://nodejs.org/))
- pnpm 8+ (`npm install -g pnpm`)
- Docker Desktop ([Download](https://www.docker.com/products/docker-desktop))
- Git

### **Quick Start (5 minutes)**

```bash
# 1. Clone the repository
git clone https://github.com/innovatex/platform.git
cd platform

# 2. Install dependencies
pnpm install

# 3. Copy environment variables
copy .env.example .env

# 4. Start infrastructure (PostgreSQL, Redis, MinIO)
pnpm docker:up

# 5. Setup database & seed data
pnpm prisma:migrate
pnpm seed

# 6. Start development servers
pnpm dev
```

**🎉 Done!** Access the application:
- **Frontend:** http://localhost:3000
- **API:** http://localhost:4000
- **API Docs:** http://localhost:4000/api/docs
- **Storybook:** http://localhost:6006
- **Prisma Studio:** Run `pnpm prisma:studio` → http://localhost:5555

### **Default Credentials (Development Only)**

```
Admin Account:
Email: admin@innovatex2025.edu
Password: Admin123!

⚠️ CRITICAL: Change these credentials before deploying to production!
```

---

## 💻 Development

### **Project Structure**

```
innovatex-2025/
├── .github/
│   └── workflows/              # CI/CD pipelines
├── apps/
│   ├── web/                    # Next.js frontend
│   │   ├── app/                # App Router pages
│   │   ├── components/         # React components
│   │   ├── lib/                # Utilities & config
│   │   └── public/             # Static assets
│   └── api/                    # NestJS backend
│       ├── src/
│       │   ├── modules/        # Feature modules
│       │   ├── common/         # Shared code
│       │   └── main.ts         # Entry point
│       └── prisma/             # Database schema
├── packages/
│   ├── ui/                     # Shared UI components
│   └── utils/                  # Shared utilities
├── infra/
│   ├── docker/                 # Docker configs
│   ├── terraform/              # IaC templates
│   └── k8s/                    # Kubernetes manifests
├── scripts/                    # Build & deploy scripts
└── docs/                       # Documentation
```

### **Available Scripts**

```bash
# Development
pnpm dev                        # Start all services in dev mode
pnpm dev:web                    # Start frontend only
pnpm dev:api                    # Start backend only

# Building
pnpm build                      # Build all apps
pnpm start                      # Start production builds

# Database
pnpm prisma:generate            # Generate Prisma Client
pnpm prisma:migrate             # Run migrations
pnpm prisma:studio              # Open Prisma Studio GUI
pnpm seed                       # Seed demo data

# Testing
pnpm test                       # Run all unit tests
pnpm test:e2e                   # Run E2E tests
pnpm test:coverage              # Generate coverage report

# Code Quality
pnpm lint                       # Lint all code
pnpm format                     # Format with Prettier
pnpm typecheck                  # TypeScript type checking

# Docker
pnpm docker:up                  # Start all containers
pnpm docker:down                # Stop all containers
pnpm docker:logs                # View container logs
```

### **Environment Variables**

See [`.env.example`](./.env.example) for all available environment variables.

Key variables:
- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - Secret for JWT signing
- `NEXT_PUBLIC_API_URL` - API endpoint for frontend
- `S3_*` - File storage configuration

---

## 🌐 Deployment

### **Frontend (Vercel)**

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd apps/web
vercel --prod
```

### **Backend (DigitalOcean / AWS)**

See [docs/DEPLOY.md](./docs/DEPLOY.md) for detailed deployment instructions for:
- DigitalOcean App Platform
- AWS Elastic Beanstalk
- Docker Compose on VPS
- Kubernetes

### **Docker Deployment**

```bash
# Build images
docker-compose -f infra/docker/docker-compose.prod.yml build

# Deploy
docker-compose -f infra/docker/docker-compose.prod.yml up -d
```

---

## 📚 Documentation

- [📖 Architecture Guide](./docs/ARCHITECTURE.md)
- [🔌 API Documentation](./docs/API.md)
- [🚀 Deployment Guide](./docs/DEPLOY.md)
- [👨‍💼 Admin Guide](./docs/ADMIN.md)
- [🤝 Contributing Guide](./docs/CONTRIBUTING.md)
- [🔒 Security Policy](./docs/SECURITY.md)
- [🔐 Secrets Management](./docs/SECRETS.md)
- [📊 Monitoring Guide](./docs/MONITORING.md)

---

## 🧪 Testing

```bash
# Run all tests
pnpm test

# Run with coverage
pnpm test:coverage

# Run E2E tests
pnpm test:e2e

# Run tests in watch mode
pnpm test:watch
```

**Test Coverage Goal:** 80%+

---

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](./docs/CONTRIBUTING.md) for guidelines.

### **Development Workflow**

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests (`pnpm test`)
5. Commit with conventional commits (`git commit -m 'feat: add amazing feature'`)
6. Push to your fork (`git push origin feature/amazing-feature`)
7. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

---

## 🙏 Acknowledgments

- **College of Engineering** for organizing InnovateX 2025
- All contributors and maintainers
- Open source community

---

## 📞 Support

- **Email:** support@innovatex2025.edu
- **Discord:** [Join our community](https://discord.gg/innovatex)
- **Issues:** [GitHub Issues](https://github.com/innovatex/platform/issues)

---

<div align="center">
  
  **Built with ❤️ by the InnovateX Team**
  
  [Website](https://innovatex2025.edu) • [Twitter](https://twitter.com/innovatex) • [LinkedIn](https://linkedin.com/company/innovatex)

</div>
