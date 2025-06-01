pipeline {
  agent any

  tools {
    nodejs 'NodeJS-22.15.0' // Ensure this matches your Jenkins NodeJS config
    // sonarQubeScanner is NOT a valid tool type in Declarative Pipeline - REMOVED
  }

  environment {
    SONARQUBE_ENV = 'SonarQube' // SonarQube server name (configured in Jenkins → Configure System)
    SONAR_TOKEN = credentials('sonar-token') // Secret text credential in Jenkins
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
          sh 'npm test'
        }
      }
    }

    stage('SonarQube Analysis') {
      steps {
        withSonarQubeEnv("${SONARQUBE_ENV}") {
          dir('backend') {
            sh '''
              sonar-scanner \
                -Dsonar.projectKey=smart-timetable \
                -Dsonar.sources=. \
                -Dsonar.host.url=http://localhost:9000 \
                -Dsonar.login=$SONAR_TOKEN
            '''
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
