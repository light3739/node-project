pipeline{
 agent any
  tools {
    nodejs 'node'
  }
 stages {
 stage('Build') {
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
 }
}