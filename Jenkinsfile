pipeline {
	agent any

	parameters {
		string(name: 'url', trim: true, description: '', defaultValue: '')
		string(name: 'fileName', trim: true, defaultValue: '', description: 'File to write to instead of stdout')

		string(name: 'Branch', trim: true, defaultValue: 'master', description: '')
	}

	options {
		skipDefaultCheckout(true)
	}

	stages {

		stage('Clean workspace') {
			steps {
				cleanWs();
			}
		}

		stage('Checkout SCM 2') {
			steps {
				script {
					// if (params['Fresh Start']) {
					// 	echo 'Cleaning...'
					// 	cleanWs()	
					// }

					git credentialsId: '', poll: false, url: 'https://github.com/bledidalipaj/sample-cordova-app.git', branch: params.Branch
				}
			}
		}

		stage('Test') {
			steps {
				echo 'Hello there'
			}
		}
	}
	post {
		always {
			archiveArtifacts artifacts: '**/build/outputs/apk/*.apk', fingerprint: true, onlyIfSuccessful: true
			// cleanWs()
		}
	}
}