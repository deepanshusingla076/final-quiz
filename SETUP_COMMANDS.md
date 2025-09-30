# Required Setup Commands

## 🔧 ENVIRONMENT SETUP (Run these commands in PowerShell)

### 1. Generate JWT Secret
```powershell
cd c:\Users\deepa\OneDrive\Desktop\quiz-apc
[System.Web.Security.Membership]::GeneratePassword(64, 8)
```
**Copy the output - you'll need it for step 3**

### 2. Create Environment File
```powershell
cd c:\Users\deepa\OneDrive\Desktop\quiz-apc
copy .env.example .env
```

### 3. Edit .env File
Open `.env` in your text editor and set:
- `DB_PASSWORD=your_actual_database_password`
- `JWT_SECRET=paste_the_secret_from_step_1_here`
- `GEMINI_API_KEY=your_gemini_api_key_here`

### 4. Build and Test
```powershell
cd c:\Users\deepa\OneDrive\Desktop\quiz-apc
mvn clean compile -f backend
mvn test -f backend/user-service/pom.xml
```

### 5. Verify Endpoints (After Starting Services)
```powershell
cd c:\Users\deepa\OneDrive\Desktop\quiz-apc
.\verify_endpoints.ps1
```

## 🚀 STARTUP COMMANDS

### Start Backend Services:
```powershell
# Terminal 1 - Eureka Server
cd c:\Users\deepa\OneDrive\Desktop\quiz-apc\backend\eureka-server
mvn spring-boot:run

# Terminal 2 - API Gateway  
cd c:\Users\deepa\OneDrive\Desktop\quiz-apc\backend\api-gateway
mvn spring-boot:run

# Terminal 3 - User Service
cd c:\Users\deepa\OneDrive\Desktop\quiz-apc\backend\user-service
mvn spring-boot:run

# Terminal 4 - Question Bank Service
cd c:\Users\deepa\OneDrive\Desktop\quiz-apc\backend\question-bank-service
mvn spring-boot:run

# Terminal 5 - Result Service
cd c:\Users\deepa\OneDrive\Desktop\quiz-apc\backend\result-service
mvn spring-boot:run

# Terminal 6 - Analytics Service
cd c:\Users\deepa\OneDrive\Desktop\quiz-apc\backend\analytics-service
mvn spring-boot:run
```

### Start Frontend:
```powershell
# Terminal 7 - Frontend
cd c:\Users\deepa\OneDrive\Desktop\quiz-apc\frontend
npm install
npm start
```

## 📊 VERIFICATION

After all services are running:

1. **Check Eureka Dashboard**: http://localhost:8761
2. **Check API Gateway**: http://localhost:8080/actuator/health  
3. **Check Frontend**: http://localhost:3000
4. **Run Endpoint Tests**: `.\verify_endpoints.ps1`

## ⚠️ TROUBLESHOOTING

If services fail to start:
1. Ensure all environment variables are set in `.env`
2. Check MySQL is running on port 3306
3. Wait 2-3 minutes for Eureka registration
4. Check logs for "JWT secret must be provided" errors