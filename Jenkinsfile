pipeline {
  agent any

  tools {
    nodejs 'NodeJS-22.15.0' // Ensure this name matches Global Tool Configuration
    // Optional: Add this only if using Maven or other tools
  }

  environment {
    SONARQUBE_SCANNER_HOME = tool 'SonarScanner' // Must match tool name in Global Config
    PATH = "${tool 'SonarScanner'}/bin:${env.PATH}"
  }

  stages {
    stage('Checkout') {
      steps {
        git 'https://github.com/shivashankargouda01/smart-timetable.git'
      }
    }

    stage('Install Dependencies') {
      steps {
        dir('backend') {
          sh 'npm install'
        }
        dir('frontend') {
          sh 'npm install'
        }
      }
    }

    stage('Run Tests & Coverage') {
      steps {
        dir('backend') {
          sh 'npm test -- --coverage'
        }
        dir('frontend') {
          sh 'npm test'
        }
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
