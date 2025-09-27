# QWIZZ - Interactive Quiz Platform

<<<<<<< HEAD
QWIZZ is a modern, scalable online quiz platform built with a microservices architecture. It features AI-powered quiz generation, robust authentication, analytics, and a beautiful neo-brutalist UI. The platform supports role-based access for teachers and students, enabling seamless quiz creation, taking, and performance tracking.

---

## 🏗️ System Architecture
=======
QWIZZ is a modern, scalable online quiz platform built with a microservices architecture. It features AI-powered quiz generation, robust authentication, analytics, and a beautiful neo-brutalist UI.

---

## 🏗️ Architecture Overview
>>>>>>> bd15782c414931367642ad74303b1c11ba7244df

```
┌───────────────┐    ┌───────────────┐    ┌───────────────┐
│   React App   │    │ API Gateway   │    │ Eureka Server │
│   (3000)      │────│   (8080)      │────│   (8761)      │
└───────────────┘    └───────────────┘    └───────────────┘
        │                   │                   │
<<<<<<< HEAD
=======
        │                   │                   │
>>>>>>> bd15782c414931367642ad74303b1c11ba7244df
        ▼                   ▼                   ▼
┌───────────────┐ ┌───────────────┐ ┌───────────────┐ ┌───────────────┐
│ User Service  │ │ Question Bank │ │ Result Svc    │ │ Analytics Svc │
│   (8083)      │ │   (8081)      │ │   (8082)      │ │   (8084)      │
└───────────────┘ └───────────────┘ └───────────────┘ └───────────────┘
<<<<<<< HEAD
=======
        │                   │                   │                   │
        └───────────────────┴───────────────────┴───────────────────┘
>>>>>>> bd15782c414931367642ad74303b1c11ba7244df
                        │
                        ▼
                  ┌───────────────┐
                  │   MySQL DB    │
                  └───────────────┘
```

<<<<<<< HEAD
### How It Works
- **Frontend (React)**: Single-page application handling user interactions, routing, and UI rendering.
- **API Gateway**: Central entry point for all client requests, handling authentication, CORS, load balancing, and routing to appropriate microservices.
- **Eureka Server**: Service discovery mechanism allowing microservices to register and discover each other dynamically.
- **Microservices**: Independent services communicating via REST APIs, each handling specific business logic.
- **Database**: Shared MySQL database for data persistence across services.

---

## 📦 Microservices Overview

### 1. API Gateway (Port 8080)
**Functionality**:
- Acts as a single entry point for all client requests.
- Handles JWT authentication and authorization.
- Manages CORS (Cross-Origin Resource Sharing) for frontend-backend communication.
- Routes requests to appropriate microservices based on URL paths.
- Provides load balancing and circuit breaker patterns.

**How It Works**:
- Intercepts all `/api/*` requests from the frontend.
- Validates JWT tokens and user roles.
- Forwards authenticated requests to the correct service (e.g., `/api/users/*` → User Service).
- Returns unified responses to the client.

### 2. Eureka Server (Port 8761)
**Functionality**:
- Service registry and discovery.
- Allows microservices to register themselves and discover other services.

**How It Works**:
- Each microservice registers with Eureka on startup.
- Services query Eureka to find endpoints of other services.
- Enables dynamic scaling and fault tolerance.

### 3. User Service (Port 8083)
**Functionality**:
- User registration, login, and profile management.
- JWT token generation and validation.
- Role-based access control (Teacher, Student, Admin).
- Password hashing with BCrypt.

**How It Works**:
- Handles `/api/users/*` endpoints.
- Stores user data in MySQL (`users` table).
- Generates JWT tokens on login for session management.
- Validates user roles for protected routes.

### 4. Question Bank Service (Port 8081)
**Functionality**:
- Quiz and question CRUD operations.
- AI-powered quiz generation using Google Gemini API.
- Question types: Multiple choice, True/False.
- Topic-based quiz creation.

**How It Works**:
- Manages `/api/quizzes/*` and `/api/questions/*` endpoints.
- Integrates with Gemini AI for generating questions based on topic, difficulty, and count.
- Stores quizzes and questions in MySQL (`quizzes`, `questions` tables).
- Supports manual quiz creation by teachers.

### 5. Result Service (Port 8082)
**Functionality**:
- Quiz attempt submission and scoring.
- Result storage and retrieval.
- Leaderboards and performance tracking.

**How It Works**:
- Handles `/api/results/*` endpoints.
- Calculates scores based on correct answers.
- Stores attempt data in MySQL (`quiz_attempts`, `results` tables).
- Provides detailed feedback and statistics.

### 6. Analytics Service (Port 8084)
**Functionality**:
- Performance analytics for teachers and students.
- Quiz statistics, success rates, and trends.
- User progress tracking and reports.

**How It Works**:
- Processes data from Result Service.
- Generates charts and metrics using aggregated data.
- Provides `/api/analytics/*` endpoints for dashboards.

---

## 🎨 Frontend (React Application)

**Technology Stack**:
- React 18.2.0 with hooks and functional components.
- React Router v6 for client-side routing.
- TailwindCSS for styling with neo-brutalist design.
- Axios for API calls.
- Framer Motion for animations.
- React Hot Toast for notifications.
- React Hook Form for form validation.
- Heroicons for SVG icons.
- Context API for state management.

### Key Features
- **Responsive Design**: Works on desktop, tablet, and mobile.
- **Role-Based UI**: Different dashboards for teachers and students.
- **Real-Time Feedback**: Toast notifications for actions.
- **Form Handling**: React Hook Form for validation.
- **State Management**: Context API for authentication state.

### How It Works
- **Routing**: Uses `createBrowserRouter` for declarative routing with protected routes.
- **Authentication**: Stores JWT in localStorage, validates on each request.
- **API Integration**: All requests go through API Gateway with auth headers.
- **Components**: Modular components for reusability (e.g., ProtectedRoute, PublicRoute, LoadingSpinner, Navigation, DashboardLayout, QuizCard).
- **Pages**:
  - **LandingPage**: Public homepage with hero section and features overview.
  - **AuthPage**: Login/register forms with validation.
  - **TeacherDashboard**: Quiz management, student analytics, and performance metrics.
  - **StudentDashboard**: Available quizzes, recent results, and progress tracking.
  - **QuizCreate**: Manual quiz creation with question builder.
  - **QuizAiGenerate**: AI-powered quiz generation with topic selection.
  - **QuizAttempt**: Interactive quiz taking with timer and progress bar.
  - **QuizResults**: Detailed results with explanations and scores.
  - **Profile**: User profile management and settings.
  - **Analytics**: Teacher analytics with charts and reports.
  - **NotFound**: 404 error page.

---

## 🔐 Authentication & Security

- **JWT-Based Auth**: Stateless tokens with expiration.
- **Role-Based Access**: Teacher/Student/Admin roles.
- **Protected Routes**: Frontend checks roles before rendering.
- **API Security**: Gateway validates tokens on each request.
- **Password Security**: BCrypt hashing.
- **CORS**: Configured in API Gateway.

---

## 🤖 AI Integration

- **Google Gemini AI**: Used for quiz generation.
- **API Key**: Stored securely (not in code).
- **Functionality**: Generates questions based on topic, difficulty, and count.
- **Fallback**: Manual quiz creation if AI fails.

---

## 🗄️ Database Schema

- **MySQL 8.0**: Relational database with JSON support and improved performance.
- **Connection**: JDBC URL with SSL disabled for local development.
- **Tables**:
  - `users`: User accounts, roles (TEACHER/STUDENT), profiles, timestamps.
  - `quizzes`: Quiz metadata (title, description, settings, creator), timestamps.
  - `questions`: Question content, options, correct answers, types (MCQ/True-False).
  - `quiz_attempts`: User quiz sessions with start/end times.
  - `results`: Scores, feedback, detailed answers, timestamps.
- **Relationships**: Users create quizzes, quizzes have questions, users attempt quizzes (many-to-many via attempts).

---

## 📡 API Endpoints

All endpoints are prefixed with `/api` and routed through the API Gateway.

### Authentication
- `POST /api/users/register` - User registration
- `POST /api/users/login` - User login (returns JWT)
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile

### Quizzes
- `GET /api/quizzes` - List all quizzes (filtered by user role)
- `POST /api/quizzes` - Create new quiz
- `GET /api/quizzes/{id}` - Get quiz details
- `PUT /api/quizzes/{id}` - Update quiz
- `DELETE /api/quizzes/{id}` - Delete quiz
- `POST /api/quizzes/generate` - AI-generated quiz
- `GET /api/quizzes/search` - Search quizzes by topic/difficulty

### Questions
- `GET /api/quizzes/{quizId}/questions` - Get quiz questions
- `POST /api/quizzes/{quizId}/questions` - Add question to quiz
- `PUT /api/questions/{id}` - Update question
- `DELETE /api/questions/{id}` - Delete question

### Results
- `POST /api/results/submit` - Submit quiz attempt
- `GET /api/results/{id}` - Get result details
- `GET /api/results/user/{userId}` - Get user's results
- `GET /api/results/quiz/{quizId}/stats` - Quiz statistics
- `GET /api/results/quiz/{quizId}/leaderboard` - Quiz leaderboard

### Analytics
- `GET /api/analytics/overview` - Teacher analytics overview
- `GET /api/analytics/students` - Student performance data
- `GET /api/analytics/quizzes` - Quiz performance metrics

---

## 🚀 Quick Start

1. **Prerequisites**: Java 21+, Node.js 16+, Maven 3.9+, MySQL 8.0+.
2. **Database Setup**: Create `quiz_apc` database, update credentials in `application.properties`.
3. **Backend**:
   - Run Eureka Server first.
   - Start other services in any order.
4. **Frontend**:
   - `npm install`
   - `npm start`
5. **Access**: http://localhost:3000

### Demo Accounts
- **Teacher**: username=teacher, password=Teacher@123
- **Student**: username=student, password=Student@123

---

## ⚙️ Configuration

### Environment Variables (Frontend)
Create a `.env` file in `frontend/` directory:
```
REACT_APP_API_URL=http://localhost:8080/api
REACT_APP_GEMINI_API_KEY=your_gemini_api_key_here
```

### Application Properties (Backend)
Update in each service's `src/main/resources/application.properties`:
```
# Database
spring.datasource.url=jdbc:mysql://localhost:3306/quiz_apc?useSSL=false&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=your_mysql_password

# JWT
app.jwtSecret=your_jwt_secret_key
app.jwtExpirationMs=3600000

# Eureka (for all services except eureka-server)
eureka.client.service-url.defaultZone=http://localhost:8761/eureka/

# Gemini AI (question-bank-service)
gemini.api.key=your_gemini_api_key
gemini.api.url=https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent
```

### Service Ports
- API Gateway: 8080
- Eureka Server: 8761
- User Service: 8083
- Question Bank Service: 8081
- Result Service: 8082
- Analytics Service: 8084
- Frontend: 3000
=======
---

## ✨ Key Features

- AI-powered quiz generation (Google Gemini integration)
- Microservices architecture (Spring Boot, Spring Cloud, Eureka)
- JWT authentication & role-based access control
- Analytics dashboard for teachers & students
- Neo-brutalist, responsive React UI
- Secure, scalable, and production-ready
>>>>>>> bd15782c414931367642ad74303b1c11ba7244df

---

## 🛠️ Technology Stack

<<<<<<< HEAD
**Backend**:
- **Java 21 LTS**: Latest LTS version with modern features like records, text blocks, and improved performance.
- **Spring Boot 3.3.x**: Framework for building microservices, with auto-configuration and embedded Tomcat.
- **Spring Cloud 2023.0.x**: For microservices patterns like service discovery, gateway, and load balancing.
- **Spring Security**: Authentication and authorization with JWT.
- **Spring Data JPA**: ORM for database interactions with Hibernate.
- **MySQL 8.0**: Relational database with JSON support and improved performance.
- **JWT (JSON Web Tokens)**: Stateless authentication with configurable expiration.
- **Maven 3.9+**: Dependency management and build tool.
- **Netflix Eureka**: Service registry for dynamic service discovery.
- **Spring Cloud Gateway**: API gateway for routing, filtering, and load balancing.
- **BCrypt**: Password hashing for secure user authentication.
- **Google Gemini AI**: For AI-powered quiz generation via REST API.

**Frontend**:
- **React 18.2.0**: UI library with concurrent features, hooks, and functional components.
- **React Router v6**: Client-side routing with `createBrowserRouter` and future flags for v7 compatibility.
- **TailwindCSS**: Utility-first CSS framework for rapid styling.
- **Axios**: HTTP client for API requests with interceptors for auth.
- **Framer Motion**: Animation library for smooth transitions and interactions.
- **React Hot Toast**: Notification system for user feedback.
- **React Hook Form**: Performant form handling with validation.
- **Heroicons**: SVG icon library for consistent UI elements.
- **Context API**: State management for authentication and user data.
- **LocalStorage**: Client-side storage for JWT tokens and user sessions.

**DevOps & Tools**:
- **Maven**: Build automation, dependency resolution, and plugin management.
- **Git**: Version control with branching and collaboration.
- **PowerShell/Batch Scripts**: `start.bat` and `stop.bat` for orchestrating service startup/shutdown.
- **VS Code**: Primary IDE with extensions for Java, React, and debugging.
- **Postman**: API testing and documentation.
- **Docker** (optional): Containerization for deployment.

**External Services**:
- **Google Gemini API**: AI model for generating quiz questions.
- **MySQL Workbench**: Database design and management tool.
=======
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
>>>>>>> bd15782c414931367642ad74303b1c11ba7244df

---

## 📂 Project Structure

```
quiz-apc/
├── backend/
<<<<<<< HEAD
│   ├── api-gateway/          # API Gateway service
│   ├── eureka-server/        # Service discovery
│   ├── user-service/         # Auth & users
│   ├── question-bank-service/ # Quizzes & AI
│   ├── result-service/       # Results & scoring
│   └── analytics-service/    # Analytics & reports
├── frontend/
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/           # Page components
│   │   ├── services/        # API service functions
│   │   └── context/         # React context
│   └── public/              # Static assets
├── start.bat                # Windows startup script
├── stop.bat                 # Windows shutdown script
└── README.md

---

## 🏃‍♂️ Development & Deployment

### Running Locally
1. **Start MySQL**: Ensure MySQL server is running.
2. **Database**: Create `quiz_apc` database and run any initial scripts.
3. **Eureka Server**: Start first (`mvn spring-boot:run` in eureka-server).
4. **Services**: Start in any order after Eureka.
5. **Frontend**: `npm install && npm start`.
6. **Scripts**: Use `start.bat` for Windows to start all services.

### Building
- **Backend**: `mvn clean install` in each service directory.
- **Frontend**: `npm run build` for production build.

### Docker (Optional)
- Each service can be containerized with Docker.
- Use `docker-compose.yml` for orchestrated deployment.
- Example: `docker build -t quiz-api-gateway ./backend/api-gateway`

### Testing
- **Backend**: `mvn test` for unit tests.
- **Frontend**: `npm test` for React tests.
- **Integration**: Manual testing with Postman or frontend.

### Monitoring
- **Eureka Dashboard**: http://localhost:8761 for service health.
- **Spring Actuator**: `/actuator/health` on each service for metrics.
- **Logs**: Check console output for errors and debugging.
=======
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
>>>>>>> bd15782c414931367642ad74303b1c11ba7244df

---

## 📄 License

MIT License. See [LICENSE](LICENSE) for details.
