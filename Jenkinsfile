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
    stage('Checkout') {
      steps {
        git credentialsId: 'github-jenkins', url: 'https://github.com/shivashankargouda01/smart-timetable.git'
      }
    }

    stage('Install Dependencies') {
      parallel {
        stage('Install Backend Deps') {
          steps {
            dir('backend') {
              bat 'npm install'
            }
          }
        }
        stage('Install Frontend Deps') {
          steps {
            dir('frontend') {
              bat 'npm install'
            }
          }
        }
      }
    }

    stage('Run Backend Tests') {
      steps {
        dir('backend') {
          bat 'npm test || echo Tests failed, continuing SonarQube analysis...'
        }
      }
    }

    stage('SonarQube Analysis') {
      steps {
        withSonarQubeEnv("${SONARQUBE_ENV}") {
          dir('.') {
            bat """
              C:\\sonar-scanner\\bin\\sonar-scanner.bat ^
                -Dsonar.projectKey=smart-timetable ^
                -Dsonar.projectName="Smart Timetable & Substitution Manager" ^
                -Dsonar.sources=frontend/src,backend ^
                -Dsonar.inclusions=**/*.js,**/*.jsx ^
                -Dsonar.exclusions=**/node_modules/**,**/*.test.js,**/*.spec.js,**/public/** ^
                -Dsonar.sourceEncoding=UTF-8 ^
                -Dsonar.login=%SONAR_TOKEN%
            """
          }
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
