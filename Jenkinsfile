pipeline {
    agent {
        docker {
            image 'node:20'  // Ensures Node.js and npm are available
            args '-u root'   // Run as root if file permissions are needed
        }
    }

    environment {
        MONGO_URI = credentials('mongo-uri')
        JWT_SECRET = credentials('jwt-secret')
        DOCKER_CREDENTIALS_ID = 'docker-hub-creds'
    }

    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/shivashankargouda01/smart-timetable.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('SonarQube') {
                    sh 'npm install -g sonar-scanner'
                    sh 'sonar-scanner'
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    dockerImage = docker.build("shivutech/smart-timetable")
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    docker.withRegistry('', DOCKER_CREDENTIALS_ID) {
                        dockerImage.push()
                    }
                }
            }
        }
    }

    post {
        success {
            echo '✅ Pipeline completed successfully.'
        }
        failure {
            echo '❌ Pipeline failed.'
        }
    }
}
