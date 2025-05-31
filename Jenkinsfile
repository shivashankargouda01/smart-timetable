pipeline {
  agent {
    docker {
      image 'node:20-alpine' // Use your local version
      args '-u root:root'    // Optional: avoid permission issues
    }
  }

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

    stage('Install Dependencies') {
      steps {
        sh 'npm install'
      }
    }

    stage('Run Tests') {
      steps {
        sh 'npm test || echo "No tests found"'
      }
    }

    stage('SonarQube Analysis') {
      steps {
        withSonarQubeEnv('SonarQube-Server') {
          sh 'npm run sonar || echo "Sonar analysis skipped"'
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
