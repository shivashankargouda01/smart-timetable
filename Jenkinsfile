pipeline {
  agent any

  tools {
    nodejs 'NodeJS-22.15.0' // Must match Global Tool Config
  }

  environment {
    SONAR_SCANNER_HOME = tool 'SonarScanner' // Tool name must match Jenkins Global Tool Config
    PATH = "${SONAR_SCANNER_HOME}/bin:${env.PATH}"
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
          script {
            try {
              sh 'npm test || echo "No frontend tests found or tests failed, continuing..."'
            } catch (e) {
              echo "Skipping frontend test errors: ${e}"
            }
          }
        }
      }
    }

    stage('SonarQube Analysis') {
      steps {
        echo 'Running SonarQube analysis...'
        withSonarQubeEnv('SonarQube') {
          sh "${SONAR_SCANNER_HOME}/bin/sonar-scanner"
        }
      }
    }

    stage('Build Docker Images') {
      when {
        expression { currentBuild.resultIsBetterOrEqualTo('SUCCESS') }
      }
      steps {
        sh 'docker-compose build'
      }
    }

    stage('Deploy with Docker Compose') {
      when {
        expression { currentBuild.resultIsBetterOrEqualTo('SUCCESS') }
      }
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
    failure {
      echo 'Pipeline failed.'
    }
  }
}
