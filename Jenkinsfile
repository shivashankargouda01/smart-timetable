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
          sh 'npm install'
        }
      }
    }

    stage('Run Tests') {
      steps {
        dir('backend') {
          sh 'npm test'
        }
      }
    }
stage('Test & Coverage') {
    steps {
        dir('backend') {
            sh 'npm test -- --coverage'
        }
    }
}

    stage('SonarQube Analysis') {
      steps {
        withSonarQubeEnv("${SONARQUBE_ENV}") {
          // Run sonar-scanner from workspace root because sources include frontend and backend
          bat '''
            "C:\\Tools\\sonar-scanner\\bin\\sonar-scanner.bat" ^
              -Dsonar.projectKey=SmartTimetable ^
              -Dsonar.projectName="Smart Timetable & Substitution Manager" ^
              -Dsonar.projectVersion=1.0 ^
              -Dsonar.sources=frontend/src,backend ^
              -Dsonar.sourceEncoding=UTF-8 ^
              -Dsonar.inclusions=**/*.js,**/*.jsx,**/*.mjs ^
              -Dsonar.exclusions=**/node_modules/**,**/public/**,**/build/**,**/dist/**,^
**/*.test.js,**/*.spec.js,**/__tests__/**,^
**/*.json,**/*.md,**/*.pdf,**/*.sh,**/docker/**,^
**/docker-compose*.yml,**/.DS_Store,**/requirements.txt ^
              -Dsonar.host.url=http://localhost:9000 ^
              -Dsonar.login=%SONAR_TOKEN%
          '''
        }
      }
    }
    stage('Deploy') {
    steps {
        dir('backend') {
            sh 'pm2 stop backend || true'
            sh 'pm2 start index.js --name backend'
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
}
