pipeline {
  agent any

  environment {
    SONARQUBE_SCANNER_HOME = tool 'SonarScanner' 
  }

  stages {
    stage('Checkout') {
      steps {
        git 'https://github.com/shivashankargouda01/smart-timetable.git'
      }
    }

    stage('Install Dependencies') {
      steps {
        sh 'cd backend && npm install'
        sh 'cd frontend && npm install'
      }
    }

    stage('Run Tests & Coverage') {
      steps {
        sh 'cd backend && npm test -- --coverage'
        sh 'cd frontend && npm test'
      }
    }

    stage('SonarQube Analysis') {
      steps {
        withSonarQubeEnv('SonarQube') {
          sh 'sonar-scanner'
        }
      }
    }

    stage('Build Docker Images') {
      steps {
        sh 'docker-compose build'
      }
    }

    stage('Deploy with Docker Compose') {
      steps {
        sh 'docker-compose down && docker-compose up -d'
      }
    }
  }

  post {
    always {
      echo 'Pipeline completed.'
    }
  }
}
