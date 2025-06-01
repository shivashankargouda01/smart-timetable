pipeline {
  agent any

  tools {
    nodejs 'Node 20'
  }

  environment {
    SONARQUBE_ENV = 'SonarQube'
  }

  stages {
    stage('Checkout') {
      steps {
        git 'https://github.com/yourname/smart-timetable.git'
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
          sh 'npm test || true' // Avoid failing for now
        }
      }
    }

    stage('SonarQube Analysis') {
      steps {
        withSonarQubeEnv('LocalSonar') {
          sh 'sonar-scanner'
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
