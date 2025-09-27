# QWIZZ - Interactive Quiz Platform

QWIZZ is a modern, scalable online quiz platform built with a microservices architecture. It features AI-powered quiz generation, robust authentication, analytics, and a beautiful neo-brutalist UI.

---

## 🏗️ Architecture Overview

```
┌───────────────┐    ┌───────────────┐    ┌───────────────┐
│   React App   │    │ API Gateway   │    │ Eureka Server │
│   (3000)      │────│   (8080)      │────│   (8761)      │
└───────────────┘    └───────────────┘    └───────────────┘
        │                   │                   │
        │                   │                   │
        ▼                   ▼                   ▼
┌───────────────┐ ┌───────────────┐ ┌───────────────┐ ┌───────────────┐
│ User Service  │ │ Question Bank │ │ Result Svc    │ │ Analytics Svc │
│   (8083)      │ │   (8081)      │ │   (8082)      │ │   (8084)      │
└───────────────┘ └───────────────┘ └───────────────┘ └───────────────┘
        │                   │                   │                   │
        └───────────────────┴───────────────────┴───────────────────┘
                        │
                        ▼
                  ┌───────────────┐
                  │   MySQL DB    │
                  └───────────────┘
```

---

## ✨ Key Features

- AI-powered quiz generation (Google Gemini integration)
- Microservices architecture (Spring Boot, Spring Cloud, Eureka)
- JWT authentication & role-based access control
- Analytics dashboard for teachers & students
- Neo-brutalist, responsive React UI
- Secure, scalable, and production-ready

---

## 🛠️ Technology Stack

**Backend:**
- Java 21 LTS
- Spring Boot 3.3.x
- Spring Cloud 2023.0.x
- Spring Security, Spring Data JPA
- MySQL 8.0
- Maven 3.9+

**Frontend:**
- React 18.2.0
- TailwindCSS, React Router v6
- Axios, Framer Motion

**DevOps:**
- Maven, Git, Docker (optional)

---

## 📦 Microservices

- **API Gateway:** Central entry point, CORS, JWT, routing
- **Eureka Server:** Service discovery
- **User Service:** Auth, user management
- **Question Bank Service:** Quiz/question CRUD, AI generation
- **Result Service:** Quiz results, leaderboards
- **Analytics Service:** Performance analytics

---

## 🎨 UI & Design

- Neo-brutalist, high-contrast, accessible design
- Responsive for desktop, tablet, mobile
- Custom React components, smooth animations

---

## 🚀 Quick Start

1. Install Java 21+, Node.js 16+, Maven 3.9+, MySQL 8.0+
2. Create MySQL database `quiz_apc`
3. Update DB credentials in each service's `application.properties`
4. Run `start.bat` (Windows) or start services manually
5. Access the app at [http://localhost:3000](http://localhost:3000)

---

## 📂 Project Structure

```
quiz-apc/
├── backend/
│   ├── api-gateway/
│   ├── eureka-server/
│   ├── user-service/
│   ├── question-bank-service/
│   ├── result-service/
│   └── analytics-service/
├── frontend/
├── start.bat
├── stop.bat
└── README.md
```

---

## 📄 License

MIT License. See [LICENSE](LICENSE) for details.
