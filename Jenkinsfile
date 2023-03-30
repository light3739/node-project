pipeline{
 agent any
  tools {
    nodejs 'node'
  }
 stages {
 stage('Build') {
      steps {
        dir('/app') {
          sh 'npm install'
          sh 'npm run build'
        }
      }
    }
 }
}