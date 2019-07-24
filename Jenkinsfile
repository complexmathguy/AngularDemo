pipeline {
    agent { docker { image 'node:8' } }
        
    stages {
        stage('install') {
            steps {
                sh 'npm install -g @angular/cli'
                sh 'mkdir -p $WORKSPACE/appRoot && cd $WORKSPACE/appRoot && ng new demo --defaults'
                sh 'cp -r $WORKSPACE/demo/. $WORKSPACE/appRoot/demo'
$set( $deployDirective = "" )
                sh 'cd $WORKSPACE/appRoot/demo && npm install --prod && npm run setup && ng build ${deployDirective}'
            }
        }
        stage('build') {
            steps {
                sh 'cd $WORKSPACE/appRoot/demo && ng build'
            }
        }
    }
}
