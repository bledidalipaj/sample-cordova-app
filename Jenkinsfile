def modules = [:]

pipeline {
	agent any

	parameters {
		string(name: 'url', trim: true, description: '', defaultValue: '')
		string(name: 'fileName', trim: true, defaultValue: '', description: 'File to write to instead of stdout')

		string(name: 'Branch', trim: true, defaultValue: 'master', description: '')
		string(name: 'Tag', trim: true, defaultValue: '', description: '')
		booleanParam(name: 'Fresh Start', defaultValue: false, description: 'Start fresh. Delete workspace before build.')
	}

	options {
		// skipDefaultCheckout(true)

		// Discard build records
		// Build records include the console output, archived artifacts, 
		// and any other metadata related to the build.
		buildDiscarder(logRotator(
			daysToKeepStr: '',
			numToKeepStr: '2'
		))
	}

	stages {
		stage('Init') {
			steps {
				script {
					// if (params['Fresh Start']) {
					// 	echo 'Cleaning...'
					// 	cleanWs()	
					// }

					// git credentialsId: 'github-creds', poll: false, url: 'https://github.com/bledidalipaj/sample-cordova-app.git', branch: params.Branch

					modules.grunt = load 'build-grunt-cmd.groovy'
					modules.curl = load 'build-curl-cmd.groovy'
				}
			}
		}

		stage('Before build') {
			steps {
				script {
					try {
						bat 'grunt clean-before-build'
					} catch (error) {
						echo error.getMessage()
					}
				}
			}
		}
		stage('Build') {
			steps {
				script {
					if (params.crosswalk) {
						echo 'crosswalk'
					}

					if (params.config) {
						echo params.config
					}
				}

				bat 'npm install'
				script {
					// Needs to be inside try catch block otherwise it throws an error
					// if the android platform is already installed
					try {
						bat 'cordova platform add android'
					} catch (error) {
						echo error.getMessage()
						bat 'cordova platform add android'
					}
				}
				bat 'cordova build android'
			}
		}

		stage('Make request to json placeholder') {
			when {
				expression { params.url != '' }
			}
			steps {
				script {
					bat modules.curl.buildCurlCmd(params.url, params.fileName)
				}
			}
		}
	}
	post {
		always {
			archiveArtifacts artifacts: '**/build/outputs/apk/*.apk', fingerprint: true, onlyIfSuccessful: true
			// cleanWs()
		}

		success {
			bat 'copy config.xml config__previous-build.xml';
			bat 'copy package.json package__previous-build.json';
		}
	}
}