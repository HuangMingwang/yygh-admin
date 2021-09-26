pipeline {
    agent {
        node {
            label 'nodejs'
        }

    }
    stages {
        stage('拉取代码') {
            agent none
            steps {
                container('nodejs') {
                    git(url: 'https://gitee.com/leifengyang/yygh-admin.git', credentialsId: 'gitee-id', branch: 'master', changelog: true, poll: false)
                    sh 'ls -al'
                }

            }
        }

        stage('项目编译') {
            agent none
            steps {
                container('nodejs') {
                    sh 'npm i node-sass --sass_binary_site=https://npm.taobao.org/mirrors/node-sass/'
                    sh 'npm install --registry=https://registry.npm.taobao.org'
                    sh 'npm run build'
                    sh 'ls'
                }

            }
        }

        stage('构建镜像') {
            agent none
            steps {
                container('nodejs') {
                    sh 'ls'
                    sh 'docker build -t yygh-admin:latest -f Dockerfile  .'
                }

            }
        }

        stage('推送镜像') {
            agent none
            steps {
                container('nodejs') {
                    withCredentials([usernamePassword(credentialsId : 'aliyun-docker-registry' ,usernameVariable : 'DOCKER_USER_VAR' ,passwordVariable : 'DOCKER_PWD_VAR' ,)]) {
                        sh 'echo "$DOCKER_PWD_VAR" | docker login $REGISTRY -u "$DOCKER_USER_VAR" --password-stdin'
                        sh 'docker tag yygh-admin:latest $REGISTRY/$DOCKERHUB_NAMESPACE/yygh-admin:SNAPSHOT-$BUILD_NUMBER'
                        sh 'docker push  $REGISTRY/$DOCKERHUB_NAMESPACE/yygh-admin:SNAPSHOT-$BUILD_NUMBER'
                    }

                }

            }
        }

        stage('部署到dev环境') {
            agent none
            steps {
                kubernetesDeploy(configs: 'deploy/**', enableConfigSubstitution: true, kubeconfigId: "$KUBECONFIG_CREDENTIAL_ID")
            }
        }

        //1、配置全系统的邮件：                   全系统的监控
        //2、修改ks-jenkins的配置，里面的邮件；   流水线发邮件
        stage('发送确认邮件') {
            agent none
            steps {
                mail(to: '17512080612@163.com', subject: 'yygh-admin构建结果', body: "构建成功了  $BUILD_NUMBER")
            }
        }

    }
    environment {
        DOCKER_CREDENTIAL_ID = 'dockerhub-id'
        GITHUB_CREDENTIAL_ID = 'github-id'
        KUBECONFIG_CREDENTIAL_ID = 'demo-kubeconfig'
        REGISTRY = 'registry.cn-hangzhou.aliyuncs.com'
        DOCKERHUB_NAMESPACE = 'lfy_hello'
        GITHUB_ACCOUNT = 'kubesphere'
        APP_NAME = 'devops-java-sample'
        ALIYUNHUB_NAMESPACE = 'lfy_hello'
    }
}