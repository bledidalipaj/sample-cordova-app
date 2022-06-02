def modules = [:]

pipeline {
	agent any

	parameters {
		string(name: 'url', trim: true, description: '')
		string(name: 'fileName', trim: true, defaultValue: '', description: 'File to write to instead of stdout')
	}

	options {
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
					modules.grunt = load 'build-grunt-cmd.groovy'
					modules.curl = load 'build-curl-cmd.groovy'
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
					}
				}
				bat 'cordova build android'
			}
		}

		stage('Make request to json placeholder') {
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
		}
	}
}