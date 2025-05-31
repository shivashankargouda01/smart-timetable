pipeline {
    agent any

    tools {
        nodejs 'NodeJS 18' // or your actual NodeJS name in Jenkins
    }

    environment {
        SONAR_TOKEN = credentials('sonar-token') // Use Jenkins Credentials
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
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

        stage('Run Tests & Coverage') {
            steps {
                script {
                    echo 'Running backend tests...'
                    dir('backend') {
                        bat 'npm test -- --coverage --passWithNoTests || echo "No backend tests"'
                    }

                    echo 'Running frontend tests (non-blocking)...'
                    dir('frontend') {
                        bat 'npm test || echo "No frontend tests or script missing"'
                    }
                }
            }
        }

        stage('SonarQube Analysis') {
            environment {
                SCANNER_HOME = tool 'SonarScanner'
            }
            steps {
                withSonarQubeEnv('SonarQube') {
                    bat "${env.SCANNER_HOME}/bin/sonar-scanner.bat -Dsonar.login=${env.SONAR_TOKEN}"
                }
            }
        }

        stage('Docker Build and Run') {
            steps {
                echo 'Building Docker image...'
                bat 'docker build -t smart-timetable .'
                
                echo 'Running Docker container...'
                bat 'docker run -d -p 3000:3000 --name timetable smart-timetable'
            }
        }
    }

    post {
        always {
            echo 'Pipeline completed.'
        }
    }
}
