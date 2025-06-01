pipeline {
  agent any

  tools {
    nodejs 'NodeJS-22.15.0'
  }

  environment {
    SONARQUBE_ENV = 'SonarQube' // SonarQube server name from Jenkins config
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
            // Full path used below (Windows-style path, using ^ for multi-line in cmd)
            bat '''
              "C:\\Tools\\sonar-scanner\\bin\\sonar-scanner.bat" ^
                -Dsonar.projectKey=smart-timetable ^
                -Dsonar.sources=. ^
                -Dsonar.host.url=http://localhost:9000 ^
                -Dsonar.login=%SONAR_TOKEN%
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
