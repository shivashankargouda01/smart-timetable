pipeline {
    agent any
    tools {
        nodejs 'NodeJS-22.15.0'
    }
    environment {
        SONARQUBE_ENV = 'SonarQube'
        SONAR_TOKEN = credentials('sonar-token')
    }

    stages {
        stage('Install') {
            steps {
                bat 'npm install'
            }
        }
        stage('Test') {
            steps {
                bat 'npm run test'
            }
        }
        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv("${SONARQUBE_ENV}") {
                    

                    bat '''
 "C:\Tools\sonar-scanner\bin\sonar-scanner.bat" ^
    -Dsonar.projectKey=SmartTimetable ^
    -Dsonar.projectName="Smart Timetable & Substitution Manager" ^
    -Dsonar.projectVersion=1.0 ^
    -Dsonar.sources=backend ^
    -Dsonar.tests=backend/__tests__ ^
    -Dsonar.test.inclusions=backend/__tests__/**/*.test.js ^
    -Dsonar.javascript.lcov.reportPaths=backend/coverage/lcov.info ^
    -Dsonar.coverage.exclusions=**/node_modules/**,**/__tests__/**,**/*.test.js ^
    -Dsonar.duplication.exclusions=**/node_modules/**,**/extra/**,**/__tests__/** ^
    -Dsonar.sourceEncoding=UTF-8 ^
    -Dsonar.login=%SONAR_TOKEN%

'''
                }
            }
        }
    }
}
