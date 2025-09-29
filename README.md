# QWIZZ - Advanced Quiz Application Platform

A comprehensive microservices-based quiz application with AI-powered question generation, built with Spring Boot backend and React frontend.

## 🚀 Features

### Core Functionality
- **User Management**: Teacher and Student roles with JWT authentication
- **Quiz Creation**: Manual quiz creation with multiple question types
- **AI Quiz Generation**: Generate quizzes using Google Gemini AI
- **Quiz Taking**: Timed quiz attempts with instant results
- **Analytics Dashboard**: Performance tracking and statistics
- **Result Management**: Comprehensive result tracking and scoring

### Technical Features
- **Microservices Architecture**: Scalable backend with Spring Boot
- **Service Discovery**: Eureka server for service registration
- **API Gateway**: Centralized routing and JWT validation
- **Real-time UI**: React with modern animations and responsive design
- **Database**: MySQL with JPA/Hibernate
- **Security**: JWT-based authentication across all services

## 🏗️ Architecture

### Backend Services
- **Eureka Server** (Port 8761): Service discovery and registration
- **API Gateway** (Port 8080): Routing, authentication, and CORS handling
- **Question Bank Service** (Port 8081): Quiz and question management with AI integration
- **Result Service** (Port 8082): Quiz attempts and result processing
- **User Service** (Port 8083): User authentication and management
- **Analytics Service** (Port 8084): Performance analytics and reporting

### Frontend
- **React Application** (Port 3000): Modern SPA with responsive design

## 📋 Prerequisites

### Software Requirements
- **Java 21** or higher
- **Node.js 16** or higher
- **MySQL 8.0** or higher
- **Maven 3.6** or higher (or Maven Wrapper included)

### Environment Setup
1. **Database Setup**: Create a MySQL database named `quiz_apc`
2. **Gemini AI API**: Obtain Google Gemini AI API key for quiz generation

### Environment Variables (Optional)
```bash
# Database Configuration
DB_URL=jdbc:mysql://localhost:3306/quiz_apc
DB_USERNAME=root
DB_PASSWORD=your_password

# JWT Security
JWT_SECRET=your_jwt_secret_key_here

# AI Configuration
GEMINI_API_KEY=your_gemini_api_key_here
```

## 🚀 Quick Start

### 1. Clone and Setup
```bash
git clone <repository-url>
cd quiz-apc
```

### 2. Database Setup
```sql
CREATE DATABASE quiz_apc;
CREATE USER 'quiz_user'@'localhost' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON quiz_apc.* TO 'quiz_user'@'localhost';
FLUSH PRIVILEGES;
```

### 3. Start Application (Windows)
```bash
# Run the automated startup script
start.bat
```

### 4. Manual Startup (Alternative)
```bash
# Start backend services (in separate terminals)
cd backend/eureka-server && mvn spring-boot:run
cd backend/api-gateway && mvn spring-boot:run
cd backend/user-service && mvn spring-boot:run
cd backend/question-bank-service && mvn spring-boot:run
cd backend/result-service && mvn spring-boot:run
cd backend/analytics-service && mvn spring-boot:run

# Start frontend
cd frontend && npm install && npm start
```

## 🌐 Application URLs

- **Frontend Application**: http://localhost:3000
- **API Gateway**: http://localhost:8080
- **Eureka Dashboard**: http://localhost:8761
- **Backend Services**: Accessible through API Gateway

## 👥 Default Users

For testing purposes, the application includes mock authentication:

### Teacher Account
- **Username**: teacher or teacher@example.com
- **Password**: password
- **Role**: TEACHER

### Student Account
- **Username**: student or student@example.com
- **Password**: password
- **Role**: STUDENT

### Admin Account
- **Username**: admin or admin@example.com
- **Password**: password
- **Role**: ADMIN

## 📊 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/refresh` - Refresh token

### Quiz Management
- `GET /api/quizzes` - Get all quizzes
- `POST /api/quizzes` - Create manual quiz
- `POST /api/quizzes/generate` - Generate AI quiz
- `GET /api/quizzes/{id}` - Get quiz by ID
- `DELETE /api/quizzes/{id}` - Delete quiz

### Results
- `POST /api/results/submit` - Submit quiz attempt
- `GET /api/results/user/{userId}` - Get user results
- `GET /api/results/quiz/{quizId}/stats` - Get quiz statistics

### Analytics
- `GET /api/analytics/dashboard` - Dashboard analytics
- `GET /api/analytics/quiz/{quizId}` - Quiz performance
- `GET /api/analytics/user/{userId}` - User analytics

## 🧪 Testing

### Backend Testing
```bash
# Run tests for all services
cd backend
mvn test
```

### Frontend Testing
```bash
cd frontend
npm test
```

## 🔧 Configuration

### Database Configuration
Update `application.properties` in each service:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/quiz_apc
spring.datasource.username=root
spring.datasource.password=your_password
```

### AI Configuration
Update `question-bank-service/application.properties`:
```properties
gemini.api.key=your_api_key_here
gemini.api.url=https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent
```

### JWT Configuration
All services use the same JWT secret for consistency:
```properties
jwt.secret=2b7e151628aed2a6abf7158809cf4f3c2b7e151628aed2a6abf7158809cf4f3c2b7e151628aed2a6abf7158809cf4f3c
jwt.expirationMs=3600000
```

## 🐛 Troubleshooting

### Common Issues

1. **Port conflicts**: Ensure all ports (8080, 8081-8084, 3000, 8761) are available
2. **Database connection**: Verify MySQL is running and credentials are correct
3. **Service discovery**: Wait for Eureka server to fully start before starting other services
4. **JWT tokens**: Ensure all services use the same JWT secret
5. **CORS issues**: Frontend URL is whitelisted in all backend services

### Service Health Checks
- Eureka Dashboard: http://localhost:8761
- API Gateway Health: http://localhost:8080/actuator/health
- Individual service health: http://localhost:{port}/actuator/health

## 📚 Development

### Adding New Features
1. **Backend**: Add new endpoints to appropriate microservice
2. **Frontend**: Create new components and integrate with services
3. **Gateway**: Update routing configuration if needed

### Code Structure
```
quiz-apc/
├── backend/
│   ├── eureka-server/          # Service discovery
│   ├── api-gateway/            # API routing and security
│   ├── user-service/           # Authentication and user management
│   ├── question-bank-service/  # Quiz and AI generation
│   ├── result-service/         # Quiz attempts and results
│   └── analytics-service/      # Performance analytics
├── frontend/
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   ├── pages/              # Application pages
│   │   ├── services/           # API service layer
│   │   ├── context/            # React context providers
│   │   └── styles/             # CSS styling
│   └── public/                 # Static assets
├── start.bat                   # Windows startup script
└── stop.bat                    # Windows shutdown script
```

## 🚦 Deployment

### Production Considerations
1. **Environment Variables**: Use external configuration for secrets
2. **Database**: Configure production-grade MySQL setup
3. **Load Balancing**: Consider multiple instances behind load balancer
4. **Monitoring**: Enable Spring Boot Actuator endpoints
5. **Logging**: Configure appropriate log levels and aggregation

### Docker Deployment (Optional)
Create Dockerfiles for each service and use Docker Compose for orchestration.

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Spring Boot and Spring Cloud for microservices framework
- React ecosystem for modern frontend development
- Google Gemini AI for quiz generation capabilities
- Netflix Eureka for service discovery
- JWT for secure authentication

---

For support or questions, please open an issue in the repository.