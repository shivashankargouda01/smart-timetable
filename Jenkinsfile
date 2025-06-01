pipeline {
    agent any
     tools {
        nodejs 'NodeJS-22.15.0'
    }
     environment {
        SONARQUBE_ENV = 'SonarQube'
        SONAR_TOKEN = credentials('sonar-token')
    }

    stages {
        stage('Install') {
            steps {
                bat 'npm install'
            }
        }
        stage('Test') {
            steps {
                bat 'npm run test'
            }
        }
        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('SonarQube') {
                    bat 'sonar-scanner'
                }
            }
        }
    }
}
