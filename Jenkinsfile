pipeline {
  agent any

  tools {
    nodejs 'NodeJS-22.15.0' // Ensure this matches the Global Tool Configuration
  }

  environment {
    SONARQUBE_SCANNER_HOME = tool 'SonarScanner'
    PATH = "${tool 'SonarScanner'}/bin:${env.PATH}"
  }

  stages {
    stage('Checkout') {
      steps {
        echo 'Checking out source code...'
        git 'https://github.com/shivashankargouda01/smart-timetable.git'
      }
    }

    stage('Install Dependencies') {
      steps {
        echo 'Installing backend dependencies...'
        dir('backend') {
          sh 'npm install'
        }
        echo 'Installing frontend dependencies...'
        dir('frontend') {
          sh 'npm install'
        }
      }
    }

    stage('Run Tests & Coverage') {
      steps {
        echo 'Running backend tests...'
        dir('backend') {
          sh 'npm test -- --coverage --passWithNoTests'
        }
        echo 'Running frontend tests (non-blocking)...'
        dir('frontend') {
          // If frontend tests fail or are not present, it logs a warning and continues
          sh 'npm test || echo "No frontend tests found or tests failed, continuing..."'
        }
      }
    }

    stage('SonarQube Analysis') {
      steps {
        echo 'Running SonarQube analysis...'
        withSonarQubeEnv('SonarQube') {
          sh 'sonar-scanner'
        }
      }
    }

    stage('Build Docker Images') {
      steps {
        echo 'Building Docker images...'
        sh 'docker-compose build'
      }
    }

    stage('Deploy with Docker Compose') {
      steps {
        echo 'Deploying with Docker Compose...'
        sh 'docker-compose down || true'
        sh 'docker-compose up -d'
      }
    }
  }

  post {
    always {
      echo 'Pipeline completed.'
    }
  }
}
