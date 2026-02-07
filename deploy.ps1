# DCJS Deploy Script - PowerShell version
# Builds and deploys DCJS docs site to Netlify

# Set log file
$LOG_FILE = "deploy.log"

# Clear previous log
"" | Out-File $LOG_FILE -Encoding UTF8
"===================================" | Out-File $LOG_FILE -Encoding UTF8 -Append
"DCJS Deploy Script" | Out-File $LOG_FILE -Encoding UTF8 -Append
Get-Date | Out-File $LOG_FILE -Encoding UTF8 -Append
"===================================" | Out-File $LOG_FILE -Encoding UTF8 -Append
"" | Out-File $LOG_FILE -Encoding UTF8 -Append

Write-Host "==================================="
Write-Host "DCJS Deploy Script"
Write-Host "==================================="
Write-Host ""
Write-Host "Log file: $LOG_FILE"
Write-Host ""

# 1. Build dc.js
Write-Host "1. Building dc.js..."
Write-Host "====================="
Write-Host ""
"[STEP 1] Building dc.js..." | Out-File $LOG_FILE -Encoding UTF8 -Append

try {
    npm run build 2>&1 | Out-File $LOG_FILE -Encoding UTF8 -Append
    if ($LASTEXITCODE -ne 0) {
        throw "Failed to build dc.js"
    }
    Write-Host "SUCCESS: dc.js built successfully"
    "SUCCESS: dc.js built successfully" | Out-File $LOG_FILE -Encoding UTF8 -Append
} catch {
    Write-Host "ERROR: Failed to build dc.js"
    "ERROR: Failed to build dc.js" | Out-File $LOG_FILE -Encoding UTF8 -Append
    Write-Host ""
    Write-Host "Check $LOG_FILE for details"
    Write-Host ""
    pause
    exit 1
}

Write-Host ""
"" | Out-File $LOG_FILE -Encoding UTF8 -Append

# 2. Build VitePress docs
Write-Host "2. Building VitePress docs..."
Write-Host "====================="
Write-Host ""
"[STEP 2] Building VitePress docs..." | Out-File $LOG_FILE -Encoding UTF8 -Append

try {
    npm run docs:build 2>&1 | Out-File $LOG_FILE -Encoding UTF8 -Append
    if ($LASTEXITCODE -ne 0) {
        throw "Failed to build VitePress docs"
    }
    Write-Host "SUCCESS: VitePress docs built successfully"
    "SUCCESS: VitePress docs built successfully" | Out-File $LOG_FILE -Encoding UTF8 -Append
} catch {
    Write-Host "ERROR: Failed to build VitePress docs"
    "ERROR: Failed to build VitePress docs" | Out-File $LOG_FILE -Encoding UTF8 -Append
    Write-Host ""
    Write-Host "Check $LOG_FILE for details"
    Write-Host ""
    pause
    exit 1
}

Write-Host ""
"" | Out-File $LOG_FILE -Encoding UTF8 -Append

# 3. Deploy to Netlify
Write-Host "3. Deploying to Netlify..."
Write-Host "====================="
Write-Host ""
"[STEP 3] Deploying to Netlify..." | Out-File $LOG_FILE -Encoding UTF8 -Append

# Check if netlify CLI is installed
Write-Host "Checking Netlify CLI..."
Write-Host ""
"Checking Netlify CLI..." | Out-File $LOG_FILE -Encoding UTF8 -Append
"" | Out-File $LOG_FILE -Encoding UTF8 -Append

try {
    $netlifyPath = Get-Command netlify -ErrorAction SilentlyContinue
    if (-not $netlifyPath) {
        Write-Host "Installing Netlify CLI..."
        Write-Host ""
        "Installing Netlify CLI..." | Out-File $LOG_FILE -Encoding UTF8 -Append
        "" | Out-File $LOG_FILE -Encoding UTF8 -Append
        
        npm install -g netlify-cli 2>&1 | Out-File $LOG_FILE -Encoding UTF8 -Append
        if ($LASTEXITCODE -ne 0) {
            throw "Failed to install Netlify CLI"
        }
        Write-Host "SUCCESS: Netlify CLI installed successfully"
        "SUCCESS: Netlify CLI installed successfully" | Out-File $LOG_FILE -Encoding UTF8 -Append
        Write-Host ""
        "" | Out-File $LOG_FILE -Encoding UTF8 -Append
    } else {
        Write-Host "Netlify CLI is already installed"
        "Netlify CLI is already installed" | Out-File $LOG_FILE -Encoding UTF8 -Append
        Write-Host ""
        "" | Out-File $LOG_FILE -Encoding UTF8 -Append
    }
} catch {
    Write-Host "ERROR: Failed to check/install Netlify CLI"
    "ERROR: Failed to check/install Netlify CLI" | Out-File $LOG_FILE -Encoding UTF8 -Append
    Write-Host ""
    Write-Host "Check $LOG_FILE for details"
    Write-Host ""
    pause
    exit 1
}

# Login to Netlify
Write-Host "Logging in to Netlify..."
Write-Host ""
Write-Host "Note: A browser window will open for Netlify login"
Write-Host "Please complete the login process in the browser"
Write-Host ""
"Logging in to Netlify..." | Out-File $LOG_FILE -Encoding UTF8 -Append
"Note: A browser window will open for Netlify login" | Out-File $LOG_FILE -Encoding UTF8 -Append
"Please complete the login process in the browser" | Out-File $LOG_FILE -Encoding UTF8 -Append
"" | Out-File $LOG_FILE -Encoding UTF8 -Append

try {
    netlify login 2>&1 | Out-File $LOG_FILE -Encoding UTF8 -Append
    if ($LASTEXITCODE -ne 0) {
        throw "Failed to login to Netlify"
    }
    Write-Host "SUCCESS: Logged in to Netlify successfully"
    "SUCCESS: Logged in to Netlify successfully" | Out-File $LOG_FILE -Encoding UTF8 -Append
    Write-Host ""
    "" | Out-File $LOG_FILE -Encoding UTF8 -Append
} catch {
    Write-Host "ERROR: Failed to login to Netlify"
    "ERROR: Failed to login to Netlify" | Out-File $LOG_FILE -Encoding UTF8 -Append
    Write-Host ""
    Write-Host "Check $LOG_FILE for details"
    Write-Host ""
    pause
    exit 1
}

# Deploy docs site
Write-Host "Deploying docs site..."
Write-Host ""
"Deploying docs site..." | Out-File $LOG_FILE -Encoding UTF8 -Append
"" | Out-File $LOG_FILE -Encoding UTF8 -Append

try {
    netlify deploy --dir=docs\.vitepress\dist --prod 2>&1 | Out-File $LOG_FILE -Encoding UTF8 -Append
    if ($LASTEXITCODE -ne 0) {
        throw "Failed to deploy to Netlify"
    }
    Write-Host "SUCCESS: Deployed to Netlify successfully"
    "SUCCESS: Deployed to Netlify successfully" | Out-File $LOG_FILE -Encoding UTF8 -Append
    Write-Host ""
    "" | Out-File $LOG_FILE -Encoding UTF8 -Append
} catch {
    Write-Host "ERROR: Failed to deploy to Netlify"
    "ERROR: Failed to deploy to Netlify" | Out-File $LOG_FILE -Encoding UTF8 -Append
    Write-Host ""
    Write-Host "Check $LOG_FILE for details"
    Write-Host ""
    pause
    exit 1
}

# Complete
Write-Host "==================================="
Write-Host "DEPLOYMENT COMPLETED SUCCESSFULLY!"
Write-Host "==================================="
Write-Host ""
Write-Host "The docs site has been deployed to Netlify"
Write-Host "Check the deployment URL in the log file"
Write-Host ""
"===================================" | Out-File $LOG_FILE -Encoding UTF8 -Append
"DEPLOYMENT COMPLETED SUCCESSFULLY!" | Out-File $LOG_FILE -Encoding UTF8 -Append
Get-Date | Out-File $LOG_FILE -Encoding UTF8 -Append
"===================================" | Out-File $LOG_FILE -Encoding UTF8 -Append

# Wait for user input
Read-Host -Prompt "Press Enter to exit"
