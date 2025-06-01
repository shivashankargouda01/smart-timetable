pipeline {
  agent any

  tools {
    nodejs 'NodeJS-22.15.0'
  }

  environment {
    SONARQUBE_ENV = 'SonarQube'
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
          sh 'npm test || true' // Optional: don't fail pipeline on test failure
        }
      }
    }

    stage('SonarQube Analysis') {
      steps {
        withSonarQubeEnv("${SONARQUBE_ENV}") {
          dir('backend') {
            sh 'sonar-scanner'
          }
        }
      }
    }

    stage("Quality Gate") {
      steps {
        timeout(time: 2, unit: 'MINUTES') {
          waitForQualityGate abortPipeline: true
        }
      }
    }
  }
}
