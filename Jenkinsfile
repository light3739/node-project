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
         withCredentials([usernamePassword(credentialsId: 'github-auth', usernameVariable: 'GIT_USERNAME', passwordVariable: 'GIT_PASSWORD')]) {
         dir('app'){
            sh "git config --global user.email 'jenkins@example.com'"
            sh "git config --global user.name 'Jenkins'"
            sh "git add ."
            sh "git commit -m 'Commit message'"
            sh "git push https://${GIT_USERNAME}:${GIT_PASSWORD}@github.com/light3739/node-project.git main"
         }
       }
    }
  }
 }
}