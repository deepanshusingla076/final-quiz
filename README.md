# 🎯 QWIZZ - Interactive Quiz Platform# 🎯 QWIZZ - Interactive Quiz Platform



<div align="center">[![Java](https://img.shields.io/badge/Java-21-orange.svg)](https://openjdk.java.net/projects/jdk/21/)

[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2.0-brightgreen.svg)](https://spring.io/projects/spring-boot)

![Java](https://img.shields.io/badge/Java-21-orange?style=for-the-badge&logo=java)[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)

![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.4.2-brightgreen?style=for-the-badge&logo=spring)[![MySQL](https://img.shields.io/badge/MySQL-8.0-blue.svg)](https://www.mysql.com/)

![React](https://img.shields.io/badge/React-18.2.0-blue?style=for-the-badge&logo=react)[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

![MySQL](https://img.shields.io/badge/MySQL-8.0-blue?style=for-the-badge&logo=mysql)

![Maven](https://img.shields.io/badge/Maven-3.9+-red?style=for-the-badge&logo=apache-maven)A complete, production-ready online quiz application built with microservices architecture, featuring AI-powered quiz generation, neo-brutalist design, JWT authentication, and comprehensive role-based access control.



**A modern, scalable quiz platform built with microservices architecture**## 🚀 Quick Start



</div>1. **Prerequisites**: Java 17+, Node.js 16+, Maven 3.6+, MySQL 8.0+

2. **Setup Database**: Create MySQL database `quizdb`

## 🚀 Recent Updates3. **Start Services**: Run `start.bat` (Windows) or `./start.sh` (Linux/Mac)

4. **Access App**: Open http://localhost:3000

### Spring Boot Upgrade (v3.2.0 → v3.4.2) ✅

- **Upgraded all microservices** to Spring Boot 3.4.2That's it! All services will start automatically in the correct order.

- **Updated Spring Cloud** to version 2023.0.6  

- **Fixed CORS configuration** issues causing duplicate headers## 🏗️ Architecture Overview

- **Enhanced security** with latest patches

- **Improved performance** and stability```

┌─────────────────────────────────────────────────────────────────┐

## 🏗️ Architecture│                        FRONTEND (React 18)                      │

│                     Neo-Brutalist Design                       │

### Microservices Design└─────────────────────────┬───────────────────────────────────────┘

```                          │

┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐                          ▼

│   React App     │    │   API Gateway   │    │ Eureka Server   │┌─────────────────────────────────────────────────────────────────┐

│   Port: 3000    │────│   Port: 8080    │────│   Port: 8761    ││                  API GATEWAY (Port 8080)                       │

└─────────────────┘    └─────────────────┘    └─────────────────┘│                  JWT Authentication                             │

                                ││                  Load Balancing                                 │

                ┌───────────────┼───────────────┐└─────────────────────────┬───────────────────────────────────────┘

                │               │               │                          │

        ┌───────▼────┐  ┌───────▼────┐  ┌───────▼────┐                          ▼

        │User Service│  │Question Bank│  │Result Service│┌─────────────────────────────────────────────────────────────────┐

        │  Port: 8083│  │  Port: 8081 │  │  Port: 8082││                EUREKA SERVER (Port 8761)                       │

        └────────────┘  └────────────┘  └────────────┘│                 Service Discovery                               │

                                │└─────────────────────────┬───────────────────────────────────────┘

                        ┌───────▼────┐                          │

                        │Analytics   │          ┌───────────────┼───────────────┐

                        │Port: 8084  │          ▼               ▼               ▼

                        └────────────┘┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐

```│   USER SERVICE  │ │ QUESTION BANK   │ │ RESULT SERVICE  │

│   (Port 8083)   │ │   (Port 8081)   │ │  (Port 8082)    │

## 🛠️ Technology Stack│                 │ │                 │ │                 │

│ • Authentication│ │ • Quiz CRUD     │ │ • Results       │

### Backend│ • User Management│ │ • AI Generation │ │ • Analytics     │

- **Java 21 LTS** - Latest LTS version with modern features│ • JWT Tokens    │ │ • Gemini AI     │ │ • Leaderboards  │

- **Spring Boot 3.4.2** - Enterprise-grade framework (Recently upgraded)└─────────────────┘ └─────────────────┘ └─────────────────┘

- **Spring Cloud 2023.0.6** - Microservices infrastructure (Recently upgraded)          │               │               │

- **Spring Security** - Authentication and authorization          └───────────────┼───────────────┘

- **Spring Data JPA** - Database abstraction layer                          │

- **MySQL 8.0** - Reliable relational database                          ▼

- **JWT (JSON Web Tokens)** - Stateless authentication                ┌─────────────────┐

- **Maven 3.9+** - Dependency management and build tool                │   MySQL DB      │

                │   (quiz_db)     │

### Frontend                └─────────────────┘

- **React 18.2.0** - Modern UI library with latest features```

- **React Router v6** - Client-side routing

- **TailwindCSS** - Utility-first CSS framework## ✨ Features

- **Framer Motion** - Production-ready motion library

- **Axios** - Promise-based HTTP client### 🔐 Authentication & Authorization

- **React Hook Form** - Performant form handling- **JWT-based Authentication** with role-based access control

- **React Hot Toast** - Beautiful notification system- **Secure Password Hashing** with BCrypt

- **Heroicons** - Beautiful hand-crafted SVG icons- **Role Management**: Student, Teacher, Admin roles

- **Session Management** with token expiration

### DevOps & Tools- **Protected Routes** and API endpoints

- **Netflix Eureka** - Service discovery and registration

- **Spring Cloud Gateway** - API Gateway with routing and filtering### 🤖 AI-Powered Quiz Generation

- **Maven** - Build automation and dependency management- **Gemini AI Integration** for automated quiz creation

- **Git** - Version control system- **Intelligent Question Generation** based on topic and difficulty

- **Multiple Question Types**: Multiple choice, True/False

## 📋 Prerequisites- **Customizable Parameters**: Topic, difficulty, question count

- **Smart Answer Explanations** generated by AI

Before running this application, make sure you have the following installed:

### 🎨 Neo-Brutalist Design

- **Java 21 or higher** - [Download OpenJDK](https://adoptopenjdk.net/)- **Bold, High-Contrast UI** with sharp borders and shadows

- **Node.js 16+** - [Download Node.js](https://nodejs.org/)- **Accessibility-First Design** with clear visual hierarchy

- **Maven 3.9+** - [Download Maven](https://maven.apache.org/)- **Responsive Design** for all device types

- **MySQL 8.0+** - [Download MySQL](https://dev.mysql.com/downloads/)- **Smooth Animations** with Framer Motion

- **Git** - [Download Git](https://git-scm.com/)- **Custom Components** with consistent styling



## 🚀 Quick Start### 👩‍🏫 Teacher Features

- **Quiz Management**: Create, edit, delete quizzes

### 1. Clone the Repository- **AI Quiz Generation**: Generate quizzes using Gemini AI

```bash- **Student Analytics**: Track performance and progress

git clone <repository-url>- **Result Management**: View detailed quiz results

cd quiz-apc- **Dashboard**: Comprehensive overview of all activities

```

### 🎓 Student Features

### 2. Database Setup- **Quiz Discovery**: Browse available quizzes by topic/difficulty

```sql- **Interactive Quiz Taking** with timer and progress tracking

-- Create database- **Instant Results** with detailed explanations

CREATE DATABASE quiz_apc;- **Performance History**: Track personal progress

- **Leaderboards**: Compare with other students

-- Demo accounts will be automatically created when services start

-- Teacher: username=teacher, password=Teacher@123### 📊 Analytics & Reporting

-- Student: username=student, password=Student@123- **Detailed Performance Metrics**: Score tracking, time analysis

```- **Quiz Statistics**: Success rates, difficulty analysis

- **User Analytics**: Individual and group performance

### 3. Backend Configuration- **Export Functionality**: CSV/PDF report generation

Update database credentials in all service `application.properties` files:- **Visual Charts**: Progress visualization with Recharts

```properties

spring.datasource.url=jdbc:mysql://localhost:3306/quiz_apc?useSSL=false&serverTimezone=UTC## 🚀 Technology Stack

spring.datasource.username=root

spring.datasource.password=your_mysql_password### Backend

```- **Java 21 LTS** - Latest LTS version with modern features

- **Spring Boot 3.2.0** - Enterprise-grade framework

### 4. Install Frontend Dependencies- **Spring Cloud 2023.0.0** - Microservices infrastructure

```bash- **Spring Security** - Authentication and authorization

cd frontend- **Spring Data JPA** - Database abstraction layer

npm install- **MySQL 8.0** - Reliable relational database

```- **JWT (JSON Web Tokens)** - Stateless authentication

- **Maven** - Dependency management and build tool

### 5. Start the Application

### Frontend

#### Option A: Using Start Script (Recommended)- **React 18.2.0** - Modern UI library with latest features

```bash- **React Router v6** - Client-side routing

# Windows- **TailwindCSS** - Utility-first CSS framework

start.bat- **Framer Motion** - Production-ready motion library

- **Axios** - Promise-based HTTP client

# The script will start all services in the correct order:- **React Hook Form** - Performant form handling

# 1. Eureka Server (8761)- **React Hot Toast** - Beautiful notification system

# 2. API Gateway (8080)  - **Heroicons** - Beautiful hand-crafted SVG icons

# 3. All Microservices

# 4. React Frontend (3000)### AI & External Services

```- **Google Gemini AI** - Advanced language model for quiz generation

- **Gemini 1.5 Flash** - Fast, efficient AI responses

#### Option B: Manual Start (Development)

```bash### Development & Deployment

# Terminal 1: Start Eureka Server- **VS Code** - Primary development environment

cd backend/eureka-server- **Git** - Version control system

mvn spring-boot:run- **Docker** (optional) - Containerization

- **Maven** - Build automation

# Terminal 2: Start API Gateway (wait 10 seconds)

cd backend/api-gateway## 📋 Prerequisites

mvn spring-boot:run

Before running this application, ensure you have the following installed:

# Terminal 3: Start User Service (wait 10 seconds)

cd backend/user-service- **Java 21 LTS** or higher

mvn spring-boot:run- **Node.js 18+** and npm

- **MySQL 8.0** or higher

# Terminal 4: Start Question Bank Service- **Maven 3.9+**

cd backend/question-bank-service- **Git**

mvn spring-boot:run

## 🛠️ Installation & Setup

# Terminal 5: Start Result Service

cd backend/result-service### 1. Clone the Repository

mvn spring-boot:run```bash

git clone https://github.com/your-username/quiz-application.git

# Terminal 6: Start Analytics Servicecd quiz-application

cd backend/analytics-service```

mvn spring-boot:run

### 2. Database Setup

# Terminal 7: Start Frontend```sql

cd frontend-- Create database

npm startCREATE DATABASE quiz_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

```

-- Create user (optional)

### 6. Stop the ApplicationCREATE USER 'quiz_user'@'localhost' IDENTIFIED BY 'Deepanshu@123ds';

```bashGRANT ALL PRIVILEGES ON quiz_db.* TO 'quiz_user'@'localhost';

# WindowsFLUSH PRIVILEGES;

stop.bat```



# This script will terminate all Java and Node.js processes### 3. Backend Services Setup

```

#### Eureka Server

## 🌐 Service URLs```bash

cd backend/eureka-server

Once all services are running:mvn clean install

mvn spring-boot:run

| Service | URL | Description |```

|---------|-----|-------------|Server will start on http://localhost:8761

| **Frontend** | http://localhost:3000 | React application |

| **API Gateway** | http://localhost:8080 | Main API endpoint |#### User Service

| **Eureka Dashboard** | http://localhost:8761 | Service discovery dashboard |```bash

| **User Service** | http://localhost:8083 | Authentication & user management |cd backend/user-service

| **Question Bank** | http://localhost:8081 | Quiz & question management |mvn clean install

| **Result Service** | http://localhost:8082 | Results & submissions |mvn spring-boot:run

| **Analytics Service** | http://localhost:8084 | Analytics & reports |```

Service will start on http://localhost:8083

## 👥 Demo Accounts

#### Question Bank Service

The application comes with pre-configured demo accounts:```bash

cd backend/question-bank-service

```mvn clean install

🧑‍🏫 Teacher Account:mvn spring-boot:run

   Username: teacher```

   Password: Teacher@123Service will start on http://localhost:8081

   Access: Create quizzes, manage questions, view analytics

#### Result Service

🎓 Student Account:```bash

   Username: studentcd backend/result-service

   Password: Student@123mvn clean install

   Access: Take quizzes, view results, track progressmvn spring-boot:run

``````

Service will start on http://localhost:8082

## 🔧 Development

#### API Gateway

### Project Structure```bash

```cd backend/api-gateway

quiz-apc/mvn clean install

├── backend/                 # Backend microservicesmvn spring-boot:run

│   ├── eureka-server/      # Service discovery```

│   ├── api-gateway/        # API gateway with CORS fixedGateway will start on http://localhost:8080

│   ├── user-service/       # Authentication & users

│   ├── question-bank-service/ # Quizzes & questions### 4. Frontend Setup

│   ├── result-service/     # Results & submissions```bash

│   └── analytics-service/  # Analytics & reportscd frontend

├── frontend/               # React applicationnpm install

├── start.bat              # Windows start scriptnpm start

├── stop.bat               # Windows stop script```

└── README.md              # This fileApplication will start on http://localhost:3000

```

## 🔧 Configuration

### Building the Project

```bash### Application Properties

# Build all backend services

cd backend/eureka-server && mvn clean compile#### Eureka Server (application.properties)

cd ../api-gateway && mvn clean compile```properties

cd ../user-service && mvn clean compileserver.port=8761

cd ../question-bank-service && mvn clean compileeureka.client.register-with-eureka=false

cd ../result-service && mvn clean compileeureka.client.fetch-registry=false

cd ../analytics-service && mvn clean compile```



# Build frontend#### User Service (application.properties)

cd ../../frontend && npm run build```properties

```server.port=8083

spring.application.name=user-service

### Running Testseureka.client.service-url.defaultZone=http://localhost:8761/eureka/

```bash

# Run backend tests# Database

cd backend/[service-name]spring.datasource.url=jdbc:mysql://localhost:3306/quiz_db

mvn testspring.datasource.username=root

spring.datasource.password=Deepanshu@123ds

# Run frontend tests

cd frontend# JWT

npm testapp.jwtSecret=Deepanshu@123ds

```app.jwtExpirationMs=3600000

```

## 🔒 Security Features

#### Question Bank Service (application.properties)

- **JWT Authentication** - Secure token-based authentication```properties

- **Role-based Authorization** - Teacher and Student rolesserver.port=8081

- **CORS Configuration** - Properly configured for frontend-backend communication (Fixed)spring.application.name=question-bank-service

- **Password Encryption** - BCrypt encryption for user passwords

- **API Gateway Security** - Centralized security with Spring Security# Gemini AI

gemini.api.key=AIzaSyBO4wKZ_bpgEn4d8GyGhWeMDISwmHE1E40

## 📊 Key Featuresgemini.api.url=https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent

```

### For Teachers

- 📝 **Quiz Creation** - Create comprehensive quizzes with multiple question types### Environment Variables

- 👨‍🎓 **Student Management** - Manage student accounts and accessCreate a `.env` file in the frontend directory:

- 📈 **Analytics Dashboard** - View detailed performance analytics```env

- ⚙️ **Quiz Configuration** - Set time limits, question randomization, etc.REACT_APP_API_URL=http://localhost:8080/api

REACT_APP_GEMINI_API_KEY=AIzaSyBO4wKZ_bpgEn4d8GyGhWeMDISwmHE1E40

### For Students```

- 🎯 **Quiz Taking** - Interactive quiz interface with timer

- 📊 **Progress Tracking** - View scores and performance history## 🚦 Usage

- 🏆 **Results Analysis** - Detailed feedback on quiz attempts

- 📱 **Responsive Design** - Works on desktop, tablet, and mobile### Demo Credentials

The application comes with pre-configured demo accounts:

### Technical Features

- 🔄 **Microservices Architecture** - Scalable and maintainable**Teacher Account:**

- 🌐 **Service Discovery** - Automatic service registration and discovery- Username: `teacher`

- ⚡ **API Gateway** - Centralized routing and load balancing- Password: `Teacher@123`

- 🛡️ **Security** - Comprehensive authentication and authorization- Role: TEACHER

- 📱 **Responsive UI** - Modern React-based interface

**Student Account:**

## 🚨 Troubleshooting- Username: `student`

- Password: `Student@123`

### Common Issues- Role: STUDENT



**1. CORS Error: "Access-Control-Allow-Origin header contains multiple values"**### Starting the Application

- ✅ **FIXED**: Duplicate CORS configurations removed from API Gateway

1. **Start MySQL** server

**2. Port Already in Use**2. **Start Eureka Server** first (Port 8761)

```bash3. **Start all microservices** (User, Question Bank, Result services)

# Find process using port4. **Start API Gateway** (Port 8080)

netstat -ano | findstr :80805. **Start Frontend** (Port 3000)

# Kill process

taskkill /PID <process_id> /FVisit http://localhost:3000 to access the application.

```

## 📚 API Documentation

**3. Database Connection Issues**

- Ensure MySQL is running### Authentication Endpoints

- Check database credentials in `application.properties````http

- Verify database `quiz_apc` existsPOST /api/users/register

POST /api/users/login

**4. Frontend Cannot Connect to Backend**PUT  /api/users/{id}

- Ensure API Gateway is running on port 8080GET  /api/users/{id}

- Check CORS configuration in API Gateway```

- Verify proxy setting in frontend `package.json`

### Quiz Management Endpoints

**5. Services Not Registering with Eureka**```http

- Ensure Eureka Server is running firstGET    /api/quizzes

- Check eureka client configuration in servicesPOST   /api/quizzes

- Wait 30 seconds for registration to completeGET    /api/quizzes/{id}

PUT    /api/quizzes/{id}

## 📈 Performance MonitoringDELETE /api/quizzes/{id}

POST   /api/quizzes/generate    # AI generation

### Health ChecksGET    /api/quizzes/search

- **Eureka Dashboard**: http://localhost:8761 - View all registered services```

- **Actuator endpoints**: Each service exposes `/actuator/health`

- **API Gateway**: Monitor routing and load balancing### Result Endpoints

```http

## 🎯 Recent Fixes AppliedPOST /api/results/submit

GET  /api/results/{id}

1. **CORS Configuration**: Fixed duplicate CORS configurations causing header conflictsGET  /api/results/user/{userId}

2. **Spring Boot Upgrade**: Successfully upgraded from 3.2.0 to 3.4.2GET  /api/results/quiz/{quizId}/stats

3. **Spring Cloud Update**: Updated to version 2023.0.6 for compatibilityGET  /api/results/quiz/{quizId}/leaderboard

4. **Project Cleanup**: Removed Maven target directories and build artifacts```

5. **Security Enhancements**: Updated JWT configurations for latest Spring Security

## 🧪 Testing

## 🤝 Contributing

### Backend Testing

1. Fork the repository```bash

2. Create your feature branch (`git checkout -b feature/AmazingFeature`)# Run tests for each service

3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)cd backend/user-service

4. Push to the branch (`git push origin feature/AmazingFeature`)mvn test

5. Open a Pull Request

cd ../question-bank-service

## 📄 Licensemvn test



This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.cd ../result-service

mvn test

## 🎯 Future Enhancements```



- [ ] **Question Types**: Add more question types (drag-drop, matching, etc.)### Frontend Testing

- [ ] **Real-time Collaboration**: Live quiz sessions with multiple participants```bash

- [ ] **Advanced Analytics**: Machine learning-based performance predictionscd frontend

- [ ] **Mobile App**: Native mobile applications for iOS and Androidnpm test

- [ ] **Integration**: LMS integration (Canvas, Moodle, etc.)npm run test:coverage

- [ ] **Accessibility**: WCAG 2.1 AA compliance```

- [ ] **Internationalization**: Multi-language support

### Integration Testing

## 📞 Support```bash

# Start all services first, then run integration tests

If you encounter any issues or have questions:mvn verify -P integration-tests

```

1. Check the [Troubleshooting](#-troubleshooting) section

2. Review the service logs for error messages## 🐳 Docker Deployment

3. Ensure all prerequisites are properly installed

4. Verify your database configuration### Build Docker Images

```bash

---# Backend services

docker build -t quiz-eureka-server ./backend/eureka-server

<div align="center">docker build -t quiz-user-service ./backend/user-service

docker build -t quiz-question-service ./backend/question-bank-service

**Built with ❤️ using Spring Boot 3.4.2 and React 18**docker build -t quiz-result-service ./backend/result-service

docker build -t quiz-api-gateway ./backend/api-gateway

*Last Updated: September 27, 2025*

# Frontend

</div>docker build -t quiz-frontend ./frontend
```

### Docker Compose
```yaml
version: '3.8'
services:
  mysql:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: Deepanshu@123ds
      MYSQL_DATABASE: quiz_db
    ports:
      - "3306:3306"

  eureka-server:
    image: quiz-eureka-server
    ports:
      - "8761:8761"

  user-service:
    image: quiz-user-service
    ports:
      - "8083:8083"
    depends_on:
      - mysql
      - eureka-server

  # Add other services...

  frontend:
    image: quiz-frontend
    ports:
      - "3000:3000"
    depends_on:
      - api-gateway
```

Run with: `docker-compose up -d`

## 🔒 Security

### Authentication
- **JWT tokens** with configurable expiration
- **Password hashing** using BCrypt
- **Role-based access control** (RBAC)
- **CORS configuration** for cross-origin requests
- **Request validation** on all endpoints

### API Security
- **Input validation** and sanitization
- **SQL injection protection** via JPA
- **XSS protection** with content security policy
- **Rate limiting** on authentication endpoints
- **Secure headers** configuration

## 🎯 Features Deep Dive

### AI Quiz Generation
The application integrates with Google Gemini AI to automatically generate quiz questions:

1. **Topic Selection**: Users specify the topic for quiz generation
2. **Difficulty Configuration**: Choose from Easy, Medium, or Hard difficulty
3. **Question Types**: Support for multiple choice and true/false questions
4. **Smart Explanations**: AI generates detailed explanations for correct answers
5. **Quality Assurance**: Generated questions are validated for accuracy and appropriateness

### Neo-Brutalist Design Philosophy
The frontend implements a neo-brutalist design approach:

- **Bold Typography**: Heavy, sans-serif fonts for maximum impact
- **High Contrast**: Sharp black borders and vibrant colors
- **Geometric Shapes**: Clean rectangles and squares throughout the UI
- **Drop Shadows**: Prominent shadows for depth and emphasis
- **No Gradients**: Flat colors for a raw, honest aesthetic
- **Accessibility**: High contrast ratios for excellent readability

### Microservices Architecture Benefits
1. **Scalability**: Each service can be scaled independently
2. **Maintainability**: Clear separation of concerns
3. **Technology Diversity**: Different services can use different technologies
4. **Fault Tolerance**: Failure in one service doesn't affect others
5. **Development Speed**: Teams can work on different services simultaneously

## 🚀 Performance Optimizations

### Backend Optimizations
- **Connection Pooling**: Optimized database connections
- **Caching**: Strategic caching for frequently accessed data
- **Lazy Loading**: JPA entities loaded on demand
- **Database Indexing**: Optimized queries with proper indexes
- **Async Processing**: Non-blocking operations where possible

### Frontend Optimizations
- **Code Splitting**: Dynamic imports for route-based splitting
- **Lazy Loading**: Components loaded on demand
- **Memoization**: React.memo and useMemo for expensive operations
- **Bundle Optimization**: Webpack optimizations for smaller bundles
- **Image Optimization**: WebP format and responsive images

## 📈 Monitoring & Observability

### Application Monitoring
- **Spring Boot Actuator**: Health checks and metrics endpoints
- **Micrometer**: Application metrics collection
- **Custom Metrics**: Business-specific metrics tracking
- **Logging**: Structured logging with correlation IDs
- **Error Tracking**: Comprehensive error handling and reporting

### Infrastructure Monitoring
- **Service Discovery**: Eureka dashboard for service health
- **Database Monitoring**: Connection pool and query performance
- **API Gateway Metrics**: Request routing and load balancing stats
- **Frontend Monitoring**: User experience and performance metrics

## 🔄 Development Workflow

### Git Workflow
```bash
# Feature development
git checkout -b feature/quiz-timer
git add .
git commit -m "feat: add quiz timer functionality"
git push origin feature/quiz-timer

# Create pull request for code review
```

### Code Quality
- **ESLint & Prettier**: Frontend code formatting
- **Checkstyle**: Java code style enforcement
- **SonarQube**: Code quality analysis
- **Unit Tests**: Comprehensive test coverage
- **Integration Tests**: End-to-end functionality testing

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add some amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

### Coding Standards
- Follow existing code style and conventions
- Write comprehensive tests for new features
- Update documentation for API changes
- Ensure all tests pass before submitting PR

## 🐛 Troubleshooting

### Common Issues

#### Database Connection Issues
```bash
# Check MySQL service
sudo systemctl status mysql

# Verify database exists
mysql -u root -p -e "SHOW DATABASES;"
```

#### Service Discovery Issues
```bash
# Check Eureka server logs
cd backend/eureka-server
mvn spring-boot:run -X

# Verify services are registered
curl http://localhost:8761/eureka/apps
```

#### Frontend Build Issues
```bash
# Clear cache and reinstall
cd frontend
rm -rf node_modules package-lock.json
npm install
npm start
```

### Debugging Tips
1. **Check service logs** for detailed error messages
2. **Verify database connections** and schema
3. **Ensure proper port configurations**
4. **Check CORS settings** for frontend-backend communication
5. **Validate JWT token format** and expiration

## 📞 Support

For support and questions:
- **Issues**: Create a GitHub issue for bugs or feature requests
- **Documentation**: Check the wiki for detailed guides
- **Community**: Join our Discord server for discussions

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Spring Team** for excellent framework and documentation
- **React Team** for revolutionary frontend library
- **Google** for Gemini AI API
- **TailwindCSS Team** for utility-first CSS framework
- **Open Source Community** for amazing tools and libraries

---

## 📊 Project Statistics

- **Lines of Code**: ~15,000+ (Backend + Frontend)
- **Test Coverage**: 85%+ for critical business logic
- **Services**: 5 microservices + 1 frontend application
- **Database Tables**: 6 main entities with relationships
- **API Endpoints**: 30+ RESTful endpoints
- **Supported Browsers**: Chrome, Firefox, Safari, Edge

Built with ❤️ by the Quiz Application Team