pipeline {
	agent any

	stages {
		stage('Build') {
			steps {
				bat 'npm install'
				bat 'cordova platform add android'
				bat 'cordova build android'
			}
		}
	}
}