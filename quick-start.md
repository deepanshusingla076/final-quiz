# 🚀 QWIZZ Quick Start Guide

## One-Command Startup

Simply run:
```bash
./start.bat
```

That's it! The script will:
- ✅ Check prerequisites (.env file, MySQL, available ports)
- 🛠️ Start all backend services (Eureka, API Gateway, User Service, etc.)
- 🎨 Launch the React frontend
- 🌐 Automatically open your browser to http://localhost:3000

## Environment Setup (First Time Only)

1. **Copy environment template:**
   ```bash
   copy .env.example .env
   ```

2. **Edit `.env` with your values:**
   ```env
   DB_PASSWORD=your_mysql_password
   JWT_SECRET=your_256bit_jwt_secret
   GEMINI_API_KEY=your_gemini_api_key
   ```

3. **Ensure MySQL is running** on port 3306

## Available Commands

- `./start.bat` - Start entire application
- `./stop.bat` - Stop all services
- `./health-check.bat` - Check service status

## Access Points

- **Frontend:** http://localhost:3000
- **API Gateway:** http://localhost:8080
- **Eureka Server:** http://localhost:8761

## Features

✨ **Multi-tenant Quiz Platform**
- Student and Teacher dashboards
- AI-powered quiz generation via Gemini
- Real-time analytics
- Secure JWT authentication

🏗️ **Microservices Architecture**
- Service discovery with Eureka
- API Gateway routing
- Independent service scaling
- Health monitoring

🔒 **Security Hardened**
- Environment-based configuration
- JWT token authentication
- No hardcoded secrets
- Input validation

## Troubleshooting

If services fail to start:
1. Check MySQL is running
2. Verify .env file exists with correct values
3. Ensure ports 3000, 8080, 8761, 8081-8084 are available
4. Run `./health-check.bat` to diagnose issues

## Architecture

```
Frontend (React) :3000
    ↓
API Gateway :8080
    ↓
├── User Service :8081
├── Question Bank :8082  
├── Result Service :8083
└── Analytics Service :8084
    ↓
Eureka Server :8761
```

Happy quizzing! 🎯