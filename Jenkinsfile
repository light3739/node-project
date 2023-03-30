pipeline{
 agent any
  tools {
    nodejs 'node'
  }
 stages {
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
 stage('Increment version'){
       steps{
         dir('app'){
           sh 'npm version patch'
         }
       }
    }
 }
}