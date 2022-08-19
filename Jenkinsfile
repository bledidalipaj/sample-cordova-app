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
		stage('Checkout SCM') {
			steps {
				script {
					// if (params['Fresh Start']) {
					// 	echo 'Cleaning...'
					// 	cleanWs()	
					// }

					git credentialsId: 'github-creds', poll: false, url: 'https://github.com/bledidalipaj/sample-cordova-app.git', branch: params.Branch
				}
			}
		}

		stage('Create hello.txt') {
			steps {
				bat 'type null > hello.txt'
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