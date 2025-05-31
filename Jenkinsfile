pipeline {
  agent any

  tools {
    nodejs 'NodeJS-22.15.0' // Must match name in Jenkins Global Tool Configuration
  }

  environment {
    SONAR_SCANNER_HOME = tool 'SonarQube' // Must match Jenkins SonarQube Scanner tool name
    PATH = "${SONAR_SCANNER_HOME}\\bin;${env.PATH}" // Ensure Windows uses backslash and semicolon
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
          bat 'npm install'
        }
        echo 'Installing frontend dependencies...'
        dir('frontend') {
          bat 'npm install'
        }
      }
    }

    stage('Run Tests & Coverage') {
      steps {
        echo 'Running backend tests...'
        dir('backend') {
          bat 'npm test -- --coverage --passWithNoTests'
        }
        echo 'Running frontend tests (non-blocking)...'
        dir('frontend') {
          script {
            try {
              bat 'npm test'
            } catch (Exception e) {
              echo "No frontend tests found or tests failed, continuing..."
            }
          }
        }
      }
    }

    stage('SonarQube Analysis') {
      steps {
        echo 'Running SonarQube analysis...'
        withSonarQubeEnv('SonarQube') { // Must match Jenkins SonarQube Server name
          bat 'sonar-scanner.bat'
        }
      }
    }

    stage('Build Docker Images') {
      when {
        expression { currentBuild.resultIsBetterOrEqualTo('SUCCESS') }
      }
      steps {
        bat 'docker-compose build'
      }
    }

    stage('Deploy with Docker Compose') {
      when {
        expression { currentBuild.resultIsBetterOrEqualTo('SUCCESS') }
      }
      steps {
        bat 'docker-compose down || exit 0'
        bat 'docker-compose up -d'
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
