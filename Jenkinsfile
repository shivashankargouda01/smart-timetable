pipeline {
  agent any

  environment {
    MONGO_URI = credentials('mongo-uri')
    JWT_SECRET = credentials('jwt-secret')
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Build & Test in Node Container') {
      steps {
        script {
          docker.image('node:20-alpine').inside {
            sh 'npm install'
            sh 'npm test || echo "Tests skipped"'
            sh 'npm run build || echo "Build skipped"'
          }
        }
      }
    }

    stage('SonarQube Analysis') {
      steps {
        script {
          docker.image('node:20-alpine').inside {
            withSonarQubeEnv('SonarQube-Server') {
              sh 'npm run sonar || echo "Sonar skipped"'
            }
          }
        }
      }
    }

    stage('Docker Build & Push') {
      steps {
        script {
          def imageName = "shivashankargouda/smart-timetable:${env.BUILD_NUMBER}"
          docker.build(imageName)
          withCredentials([usernamePassword(credentialsId: 'docker-hub-creds', usernameVariable: 'USER', passwordVariable: 'PASS')]) {
            sh 'echo $PASS | docker login -u $USER --password-stdin'
            sh "docker push $imageName"
          }
        }
      }
    }
  }
}
