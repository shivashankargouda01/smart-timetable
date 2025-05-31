pipeline {
    agent any

    environment {
        NODE_ENV = 'production'
        MONGO_URI = credentials('mongo-uri') // Configure in Jenkins Credentials
        JWT_SECRET = credentials('jwt-secret')
    }

    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/yourusername/your-mern-repo.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                dir('backend') {
                    bat 'npm install'
                }
                dir('frontend') {
                    bat 'npm install'
                }
            }
        }

        stage('Run Tests & SonarQube Analysis') {
            steps {
                dir('backend') {
                    bat 'npm test'
                }
                dir('frontend') {
                    bat 'npm test'
                }
                withSonarQubeEnv('SonarQube') {
                    bat 'sonar-scanner'
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                bat 'docker build -t smart_timetable_backend ./backend'
                bat 'docker build -t smart_timetable_frontend ./frontend'
            }
        }

        stage('Deploy') {
            steps {
                bat 'docker-compose up -d --build'
            }
        }
    }

    post {
        always {
            junit 'backend/test-results/**/*.xml'
            junit 'frontend/test-results/**/*.xml'
        }
    }
}
