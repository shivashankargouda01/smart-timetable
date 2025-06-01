pipeline {
  agent any

  tools {
    nodejs 'NodeJS-22.15.0'
  }

  environment {
    SONARQUBE_ENV = 'SonarQube'            // SonarQube server name in Jenkins config
    SONAR_TOKEN = credentials('sonar-token') // Secret text credential in Jenkins
  }

  stages {
    stage('Checkout') {
      steps {
        git credentialsId: 'github-jenkins', url: 'https://github.com/shivashankargouda01/smart-timetable.git'
      }
    }

    stage('Install Dependencies') {
      steps {
        dir('backend') {
          bat 'npm install'
        }
      }
    }

    stage('Run Tests and Coverage') {
      steps {
        dir('backend') {
          // Run Jest with lcov coverage report explicitly
          bat 'npx jest --coverage --coverageReporters=lcov'
        }
      }
    }

    stage('SonarQube Analysis') {
      steps {
        withSonarQubeEnv("${SONARQUBE_ENV}") {
          bat '''
            "C:\\Tools\\sonar-scanner\\bin\\sonar-scanner.bat" ^
              -Dsonar.projectKey=SmartTimetable ^
              -Dsonar.projectName="Smart Timetable & Substitution Manager" ^
              -Dsonar.projectVersion=1.0 ^
              -Dsonar.sources=frontend/src,backend ^
              -Dsonar.sourceEncoding=UTF-8 ^
              -Dsonar.inclusions=**/*.js,**/*.jsx,**/*.mjs ^
              -Dsonar.exclusions=**/node_modules/**,**/public/**,**/build/**,**/dist/**,**/*.test.js,**/*.spec.js,**/__tests__/**,**/*.json,**/*.md,**/*.pdf,**/*.sh,**/docker/**,**/docker-compose*.yml,**/.DS_Store,**/requirements.txt ^
              -Dsonar.javascript.lcov.reportPaths=backend/coverage/lcov.info ^
              -Dsonar.host.url=http://localhost:9000 ^
              -Dsonar.login=%SONAR_TOKEN%
          '''
        }
      }
    }

    stage('Deploy') {
      steps {
        dir('backend') {
          bat '''
            pm2 stop backend || exit 0
            pm2 start index.js --name backend
          '''
        }
      }
    }

    stage('Quality Gate') {
      steps {
        timeout(time: 2, unit: 'MINUTES') {
          waitForQualityGate abortPipeline: true
        }
      }
    }
  }

  post {
    success {
      echo 'CI Success - Quality Gate Passed!'
    }
    failure {
      echo 'CI Failed - Please check SonarQube dashboard and Jenkins logs.'
    }
  }
}
