pipeline {
  agent any

  tools {
    nodejs 'NodeJS-22.15.0' // Match this with your Jenkins Node.js tool name
  }

  environment {
    SONAR_SCANNER_HOME = tool 'SonarQube' // Jenkins SonarQube Scanner tool name
    PATH = "${SONAR_SCANNER_HOME}\\bin;${env.PATH}" // Windows path handling
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
              echo 'Frontend tests failed or not present. Continuing...'
            }
          }
        }
      }
    }

    stage('SonarQube Analysis') {
      steps {
        echo 'Running SonarQube analysis...'
        withSonarQubeEnv('SonarQube') {
          bat """
            sonar-scanner.bat ^
            -Dsonar.projectKey=smart-timetable ^
            -Dsonar.sources=. ^
            -Dsonar.host.url=%SONAR_HOST_URL% ^
            -Dsonar.login=sqp_cde9e16cf03c856f29531816abccf934d52ae3ee
          """
          // For production, use credentials:
          // withCredentials([string(credentialsId: 'sonar-token', variable: 'SONAR_TOKEN')]) {
          //   bat "sonar-scanner.bat -Dsonar.login=%SONAR_TOKEN%"
          // }
        }
      }
    }

    stage('Build Docker Images') {
      when {
        expression { currentBuild.resultIsBetterOrEqualTo('SUCCESS') }
      }
      steps {
        echo 'Building Docker images...'
        bat 'docker-compose build'
      }
    }

    stage('Deploy with Docker Compose') {
      when {
        expression { currentBuild.resultIsBetterOrEqualTo('SUCCESS') }
      }
      steps {
        echo 'Deploying application using Docker Compose...'
        bat 'docker-compose down || exit 0'
        bat 'docker-compose up -d'
      }
    }
  }

  post {
    always {
      echo 'Pipeline execution completed.'
    }
    failure {
      echo 'Pipeline execution failed.'
    }
  }
}
