pipeline {
    agent { label 'docker_agent' }
    environment {
        PROJECT_ID = 'otoke-282610'
        CLUSTER_NAME = 'production'
        LOCATION = 'asia-southeast1-b'
        CREDENTIALS_ID = 'cicd_user'
    }
    stages {
        stage("Checkout code") {
            steps {
                checkout scm
            }
        }
        stage("Build image") {   
            steps {
                script {
                    myapp = docker.build("asia.gcr.io/otoke-282610/all-chain-web:${env.BUILD_ID}", "--no-cache .")
                }
            }
        }
        stage("Push image") {
            steps {
                script {
                    docker.withRegistry('https://asia.gcr.io', 'gcr:cicd_user') {
                            myapp.push("latest")
                            myapp.push("${env.BUILD_ID}")
                    }
                }
            }
        }
        stage("Remove images after pushed gcr") {
            steps {
                sh "docker rmi asia.gcr.io/otoke-282610/all-chain-web:${env.BUILD_ID}"
                sh "docker rmi asia.gcr.io/otoke-282610/all-chain-web:latest"
            }
        }
        stage("Confirm to Deploy") {
            steps {
                input message: "Please Confirm to Deploy on Production", ok: "Confirm"
            }
        }
        stage('Deploy to GKE') {
            steps{
                sh "sed -i 's/all-chain-web:latest/all-chain-web:${env.BUILD_ID}/g' deployment.yaml"
                step([$class: 'KubernetesEngineBuilder', projectId: env.PROJECT_ID, clusterName: env.CLUSTER_NAME, location: env.LOCATION, manifestPattern: 'deployment.yaml', credentialsId: env.CREDENTIALS_ID, verifyDeployments: false])
            }
        }        
    }    
}