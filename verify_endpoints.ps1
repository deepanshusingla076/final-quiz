# ============================================================================
# QWIZZ API Endpoint Verification Script (PowerShell)
# This script tests all major API endpoints and generates a JSON report
# ============================================================================

param(
    [string]$GatewayUrl = "http://localhost:8080",
    [string]$ReportFile = "endpoint_verification_report.json"
)

$ErrorActionPreference = "Continue"
$timestamp = Get-Date -Format "yyyy-MM-dd_HH-mm-ss"

Write-Host ""
Write-Host "============================================================================" -ForegroundColor Cyan
Write-Host " QWIZZ API ENDPOINT VERIFICATION" -ForegroundColor Yellow
Write-Host "============================================================================" -ForegroundColor Cyan
Write-Host " Timestamp: $timestamp" -ForegroundColor Green
Write-Host " Gateway URL: $GatewayUrl" -ForegroundColor Green  
Write-Host " Report File: $ReportFile" -ForegroundColor Green
Write-Host "============================================================================" -ForegroundColor Cyan
Write-Host ""

# Initialize counters
$testCount = 0
$passCount = 0
$failCount = 0
$testResults = @()

# Function to test endpoint
function Test-Endpoint {
    param(
        [string]$TestName,
        [string]$Endpoint,
        [string]$Method = "GET",
        [string]$Body = "",
        [hashtable]$Headers = @{}
    )
    
    $global:testCount++
    Write-Host "Testing: $TestName" -ForegroundColor White
    
    try {
        $uri = "$GatewayUrl$Endpoint"
        $requestParams = @{
            Uri = $uri
            Method = $Method
            ContentType = "application/json"
            Headers = $Headers
            TimeoutSec = 30
        }
        
        if ($Body -and $Method -eq "POST") {
            $requestParams.Body = $Body
        }
        
        $response = Invoke-WebRequest @requestParams -ErrorAction SilentlyContinue
        $httpStatus = $response.StatusCode
        $passed = $httpStatus -ge 200 -and $httpStatus -lt 300
        
    } catch {
        $httpStatus = if ($_.Exception.Response) { $_.Exception.Response.StatusCode.value__ } else { 0 }
        
        # For protected endpoints, 401 is expected without auth
        $passed = if ($TestName -notlike "*Auth*" -and $httpStatus -eq 401) { $true } else { $false }
        if ($TestName -like "*Auth*" -and $httpStatus -eq 401) { $passed = $false }
    }
    
    # Create test result object
    $testResult = @{
        test_name = $TestName
        endpoint = $Endpoint
        method = $Method
        http_status = $httpStatus
        passed = $passed
        timestamp = $timestamp
    }
    
    $global:testResults += $testResult
    
    if ($passed) {
        $global:passCount++
        Write-Host "  ✓ PASS ($httpStatus)" -ForegroundColor Green
    } else {
        $global:failCount++
        Write-Host "  ✗ FAIL ($httpStatus)" -ForegroundColor Red
    }
}

# Run endpoint tests
Test-Endpoint "Gateway Health" "/actuator/health"
Test-Endpoint "Auth Test Endpoint" "/api/auth/test"
Test-Endpoint "Auth Register" "/api/auth/register" "POST" '{"username":"testuser","email":"test@example.com","password":"Test123!@#","firstName":"Test","lastName":"User","role":"STUDENT"}'
Test-Endpoint "Auth Login" "/api/auth/login" "POST" '{"usernameOrEmail":"testuser","password":"Test123!@#"}'
Test-Endpoint "User Profile" "/api/users/profile"
Test-Endpoint "Quiz List" "/api/quizzes"  
Test-Endpoint "Create Quiz" "/api/quizzes" "POST" '{"title":"Test Quiz","description":"Test Description","timeLimit":30,"totalQuestions":5,"category":"test","difficulty":"EASY"}'
Test-Endpoint "Results List" "/api/results"
Test-Endpoint "Analytics Dashboard" "/api/analytics/dashboard"

# Generate JSON report
$report = @{
    timestamp = $timestamp
    gateway_url = $GatewayUrl
    summary = @{
        total_tests = $testCount
        passed = $passCount
        failed = $failCount
        success_rate = [math]::Round(($passCount / $testCount) * 100, 2)
    }
    test_results = $testResults
}

$report | ConvertTo-Json -Depth 3 | Out-File -FilePath $ReportFile -Encoding UTF8

Write-Host ""
Write-Host "============================================================================" -ForegroundColor Cyan
Write-Host " VERIFICATION COMPLETE" -ForegroundColor Yellow
Write-Host "============================================================================" -ForegroundColor Cyan
Write-Host " Report saved to: $ReportFile" -ForegroundColor Green
Write-Host " Summary:" -ForegroundColor White
Write-Host "   - Total Tests: $testCount" -ForegroundColor White
Write-Host "   - Passed: $passCount" -ForegroundColor Green
Write-Host "   - Failed: $failCount" -ForegroundColor Red
Write-Host "   - Success Rate: $([math]::Round(($passCount / $testCount) * 100, 2))%" -ForegroundColor White
Write-Host "============================================================================" -ForegroundColor Cyan
Write-Host ""

# Display report contents
if (Test-Path $ReportFile) {
    Write-Host "Report Preview:" -ForegroundColor Yellow
    Get-Content $ReportFile | Write-Host
}