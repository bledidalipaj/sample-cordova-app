pipeline {
	agent any

	stages {
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
	}
}