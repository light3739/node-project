def version

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
  stage('Increment v'){
       steps{
         dir('app'){
           sh 'npm version patch'
         }
       }
    }

 stage('Commit'){
       steps{
            withCredentials([usernamePassword(credentialsId: 'github-auth', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
          sh 'git config --global user.email "jenkins@example.com"'
          sh 'git config --global user.name "Jenkins"'
          sh 'git add .'
          sh 'git commit -m "Jenkins build"'
          sh 'git push https://${USERNAME}:${PASSWORD}@github.com/light3739/node-project.git HEAD:main'
       }
    }
  }

stage('Build'){
    steps{
        script{
            version = sh(script: "cat app/package.json | grep version | head -1 | awk -F: '{ print \$2 }' | sed 's/[\", ]//g'", returnStdout: true).trim()
            echo "${version}"
            def credentials = credentials('docker-hub')
            def username = credentials.username
            script {
                sh 'docker --version'
                sh "docker build -t ${username}/my-image:${version} ."
            }
        }
    }
}

 stage("Deploy"){
    steps {
        script {
            withCredentials([usernamePassword(credentialsId: 'docker-hub', usernameVariable: 'DOCKERHUB_USERNAME', passwordVariable: 'DOCKERHUB_PASSWORD')]) {
                sh "docker login -u ${DOCKERHUB_USERNAME} -p ${DOCKERHUB_PASSWORD}"
                sh "docker push my-image:${version}"
            }
        }
    }
    }
  }
}
