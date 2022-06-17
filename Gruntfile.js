module.exports = function  (grunt) {
	const { exec, execSync} = require('child_process');

	// Project configuration
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json')
	});


	grunt.registerTask('clean-before-build', async function () {
		var done = this.async();
		const PREVIOUS_BUILD_FILE_SUFFIX = '__previous-build';

		const EXIT_CODES = {
			NO_DIFFERENCES : 0,
			FILES_HAVE_DIFFERENCES : 1,
			ERROR : 2
		};

		const filePathPairsToCompare = [
			['./config.xml', `./config${PREVIOUS_BUILD_FILE_SUFFIX}.xml`],
			['./package.json', `./package${PREVIOUS_BUILD_FILE_SUFFIX}.json`],
		];

		let isCleanBuildNeeded = false;

		for (pair of filePathPairsToCompare) {
			const exitCode = await diff(pair[0], pair[1]);

			if (exitCode === EXIT_CODES.FILES_HAVE_DIFFERENCES || exitCode === EXIT_CODES.ERROR) {
				isCleanBuildNeeded = true;
				break;
			}
		}

		grunt.log.writeln(isCleanBuildNeeded);

		// clean old build files
		if (isCleanBuildNeeded) {
			grunt.log.writeln('Cleaning folders before build')

			execSync('rm -rf ./plugins');
			execSync('rm -rf ./platforms');

			grunt.log.writeln('Old folders were successfully removed.');
		}

		done();
	});

	/**
	 * Compares the content of two files and returns an exit code.
	 * 0 => files are the same
	 * 1 => files have differences
	 * 2 => error
	 *
	 * @returns {Number} exit code
	 */
	 function diff (file1Path, file2Path) {
		const cmd = `diff ${file1Path} ${file2Path}`;
		

		return new Promise((resolve, reject) => {
			let exitCode = 0;
			
			try {
				exec(cmd, (error, stdout, stderr) => {
					if (error) {
						exitCode = error.code;
					}
					console.log('Inside diff');	
					resolve(exitCode);
				});
			} catch (error) {
				console.log('Inside error');	
				console.log(error);
				reject(error);
			}
		});
	}
}