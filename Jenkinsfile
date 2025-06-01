pipeline {
  agent any

  tools {
    nodejs 'NodeJS-22.15.0' // Ensure this matches your Jenkins NodeJS config
    sonarQubeScanner 'SonarScanner' // Ensure this name matches Jenkins config
  }

  environment {
    SONARQUBE_ENV = 'SonarQube' // Must match your SonarQube server config name
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
          sh 'npm test' // Remove || true unless needed
        }
      }
    }

    stage('SonarQube Analysis') {
      steps {
        withSonarQubeEnv('SonarQube') {
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
