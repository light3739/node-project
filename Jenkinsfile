pipeline{
 agent any
  tools {
    nodejs 'node' 
  }
 stages {
  stage('Checkout') {
      steps {
        checkout([$class: 'GitSCM', branches: [[name: '*/main']], userRemoteConfigs: [[credentialsId: 'github-token', url: 'https://github.com/light3739/node-project.git']]])
      }
     }
 stage('Install') {
      steps {
        dir('app') {
          sh 'npm install'
        }
      }
    }
 stage('Test'){
      steps{
        dir('app'){
          sh 'npm test'
        }
      }
   }
  stage('Increment v'){
       steps{
         dir('app'){
           sh 'npm version patch'
         }
       }
    }

 stage('Commit'){
       steps{
          withCredentials([string(credentialsId: 'github-token', variable: 'TOKEN')]) {
            sh "git config --global user.email 'jenkins@example.com'"
            sh "git config --global user.name 'Jenkins'"
            sh "git add ."
            sh "git commit -m 'Commit message'"
            sh "git push https://github.com/light3739/node-project?github-token=${TOKEN} HEAD:main"
       }
    }
  }
 }
}
