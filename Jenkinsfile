def isIgnoreBuild
pipeline {
        agent {
            node {
                label "acazia-imac-2017"
            }
        }
        stages {
            stage("check-version") {
                steps {
                    script {
                        def current_commit = sh(script: "git log --pretty=format:'%h' -n 1", returnStdout: true).trim()
                        def last_commit = sh(script: "cat begincommit", returnStdout: true).trim()
                        isIgnoreBuild = current_commit == last_commit
                        if (isIgnoreBuild) {
                            slackSend color: "warning", message: "[cpadmin site] Current version is latest", channel: "#eco_shipper"
                        } else {
                            def lastCommitInfo = sh(script: "export CURRENT_COMMIT=`git log --pretty=format:'%h' -n 1` && export BEGIN_COMMIT=`cat begincommit` && export GIT_LOG=`git log --oneline \$CURRENT_COMMIT...\$BEGIN_COMMIT` && echo \"\$GIT_LOG\"", returnStdout: true).trim()
                            slackSend color: "warning", message: "$lastCommitInfo", channel: "#eco_shipper"
                        }
                    }
                }
            }
            stage("install dependence") {
                steps {
                    script {
                        if (!isIgnoreBuild) {
                            slackSend color: "good", message: "[cpadmin site] install dependence", channel: "#eco_shipper"
                            sh '''
                            yarn
                            '''
                        }
                    }
                }
            }
            stage("make build") {
                steps {
                    script {
                        if (!isIgnoreBuild) {
                            slackSend color: "good", message: "[cpadmin site] make build", channel: "#eco_shipper"
                            sh '''
                            yarn build:dev
                            '''
                        }
                    }
                }
            }
            stage("remove old build") {
                steps {
                    script {
                        if (!isIgnoreBuild) {
                            slackSend color: "good", message: "[cpadmin site] remove old build", channel: "#eco_shipper"
                            sh '''
                            ssh acazia3t@192.168.1.41 'rm -rf /home/acazia3t/eco_shipper/cpadmin/*'
                            '''
                        }
                    }
                }
            }
            stage("copy new build") {
                steps {
                    script {
                        if (!isIgnoreBuild) {
                            slackSend color: "good", message: "[cpadmin site] copy new build", channel: "#eco_shipper"
                            sh '''
                            scp -i ~/.ssh/id_rsa -r /Users/azimac2017/Documents/jenkins/workspace/ecoshipper-cpadmin-site-dev/build/* acazia3t@192.168.1.41:/home/acazia3t/eco_shipper/cpadmin/
                            '''
                        }
                    }
                }
            }
        }
        post {
            always {
                slackSend color: "good", message: "FE admin site finished", channel: "#eco_shipper"
            }
            success {
                slackSend color: "good", message: "FE admin site success", channel: "#eco_shipper"
                sh '''
                export CURRENT_COMMIT=`git log --pretty=format:'%h' -n 1`
                echo $CURRENT_COMMIT > begincommit
                '''
            }
            failure {
                slackSend color: "danger", message: "FE admin site failure", channel: "#eco_shipper"
                sh '''
                echo "Build failed."
                git reset --hard
                '''
            }
            unstable {
                slackSend color: "danger", message: "FE admin site unstable", channel: "#eco_shipper"
                echo "Process unstable. Please try again."
            }
        }
    }
