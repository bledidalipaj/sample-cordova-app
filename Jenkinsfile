pipeline {
	agent any

	parameters {
		string(name: 'url', trim: true, description: '', defaultValue: '')
		string(name: 'fileName', trim: true, defaultValue: '', description: 'File to write to instead of stdout')

		string(name: 'Branch', trim: true, defaultValue: 'master', description: '')
		booleanParam(name: 'Save workspace', defaultValue: false, description: 'Save workspace')
		string(name: 'Tag', trim: true, defaultValue: '', description: 'Your tag')
	}

	options {
		skipDefaultCheckout(true)
	}

	stages {

		stage('Checkout SCM 2') {
			steps {
				script {
					// if (params['Fresh Start']) {
					// 	echo 'Cleaning...'
					// 	cleanWs()	
					// }

					cleanWs()

					git credentialsId: '', poll: false, url: 'https://github.com/bledidalipaj/sample-cordova-app.git', branch: params.Branch

					if  (params.Tag) {
						git checkout params.Tag
					}
				}
			}
		}

		stage('Test') {
			steps {
				echo 'Hello there'
			}
		}

		stage('Save workspace') {
			when {
				expression { params['Save workspace'] == true }
			}
			steps {
				echo 'Copy workspace'
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