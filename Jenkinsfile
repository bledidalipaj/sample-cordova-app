pipeline {
	agent any

	stages {
		stage('Build') {
			steps {
				if (params.crosswalk) {
					echo 'crosswalk'
				}

				if (params.config) {
					echo params.config
				}

				bat 'npm install'
				bat 'cordova platform add android'
				bat 'cordova build android'
			}
		}
	}
}