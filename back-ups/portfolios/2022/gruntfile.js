module.exports = function (grunt) {
	const sass = require('sass');

	/**
   * [Just-in-time plugin loader: improve speed tasks]
   */
	require('jit-grunt')(grunt, {
		svgmin: 'grunt-svgmin',
		htmllint: 'grunt-html'
	});

	/**
   * [Paths]
   */
	const buildPath = 'dest/';

	const imgBuildPath = `${buildPath}img/`;
	const svgBuildPath = `${imgBuildPath}svg/`;
	const imgMiscBuildPath = imgBuildPath;
	const fontBuildPath = `${buildPath}font/`;
	const jsBuildPath = `${buildPath}js/`;
	const jsBuildComponentsPath = `${jsBuildPath}components/`;
	const jsBuildPagesPath = `${jsBuildPath}pages/`;
	const cssBuildPath = `${buildPath}css/`;
	const pagesBuildPath = `${buildPath}pages/`;

	const sourcesPath = 'src/';

	const imgPath = `${sourcesPath}img/`;
	const svgPath = `${imgPath}svg/`;
	const iconsPath = `${imgPath}icons/`;
	const imgMiscPath = `${imgPath}misc/`;
	const scssPath = `${sourcesPath}scss/`;
	const fontPath = `${sourcesPath}font/`;
	const jsPath = `${sourcesPath}js/`;
	const jsComponentsPath = `${jsPath}components/`;
	const jsPagesPath = `${jsPath}pages/`;
	const templatesPath = `${sourcesPath}templates/`;

	/**
     * [PostCSS Plugins]
     */
	const cssnano = require('cssnano');
	const rucksack = require('rucksack-css');
	const autoprefixer = require('autoprefixer');
	const mqsort = require('node-css-mqpacker');
	const mqextract = require('postcss-extract-media-query');

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		/**
     * [Task for keeping multiple browsers & devices in sync when building websites]
     */
		browserSync: {
			bsFiles: {
				src: [
					`${cssBuildPath}**/*.css`,
					`${jsBuildPath}**/*.js`,
					`*.html`,
					'../../views/**/*.html',
				],
			},
			options: {
				watchTask: true,
				proxy: 'http://localhost/alexis-degryse.com/',
			},
		},
		/**
     * [Compiles .pug templates]
     */
		pug: {
			options: {
				pretty: true,
				data: {
					debug: false,
				},
			},
			dist: {
				files: [ {
					expand: true,
					src: [ 'index.pug' ],
					cwd: `${templatesPath}/`,
					dest: `./`,
					ext: '.html',
				} ],
			},
		},
		/**
     * [Minify HTML]
     */
		htmlmin: {
			options: {
				removeComments: true,
				collapseWhitespace: true,
				collapseInlineTagWhitespace: false,
			},
			dist: {
				files: [ {
					expand: true,
					src: [ 'index.html' ],
					cwd: `./`,
					dest: `./`,
					ext: '.html',
				} ],
			}
		},
		/**
     * [HTML Validation]
     */
    htmllint: {
		  options: {
		  	noLangDetect: true,
		  	force: true,
		    ignore: 
		    	[
		    		'The “dialog” element is not supported in all browsers. Please be sure to test, and consider using a polyfill.',
		    		'The “date” input type is not supported in all browsers. Please be sure to test, and consider using a polyfill.',
		    		'Consider using the “h1” element as a top-level heading only (all “h1” elements are treated as top-level headings by many screen readers and other tools).',
		    		'The “banner” role is unnecessary for element “header”.',
		    		'The “contentinfo” role is unnecessary for element “footer”.',
		    		'The “main” role is unnecessary for element “main”.',
		    		'The “navigation” role is unnecessary for element “nav”.'
		    	]
		  },
    	all: [ 'index.html' ]
    },
		/**
	   * [Sass compiler]
	   */
		sass: {
			options: {
				implementation: sass,
				sourceMap: true,
				sourceComments: true,
				outputStyle: 'expanded',
			},
			dist: {
				files: [ {
					expand: true,
					src: [ '**/*.scss', '!pages/**/*.scss' ],
					cwd: scssPath,
					dest: cssBuildPath,
					ext: '.css',
				} ],
			},
			pages: {
				files: [ {
					expand: true,
					src: [ 'pages/**/*.scss' ],
					cwd: scssPath,
					dest: cssBuildPath,
					ext: '.css',
				} ],
			},
		},
		shell: {
			options: {
				failOnError: false,
			},
			/**
       * [Stylelint]
       */
			lint: {
				command: `stylelint "${scssPath}**/*.scss" --config ${scssPath}.stylelintrc --fix`,
			},
		},
		/**
     * [Apply several post-processors to CSS using PostCSS]
     */
		postcss: {
			dist: {
				options: {
					map: {
						inline: false, // save all sourcemaps as separate files...
						annotation: `${cssBuildPath}/sourcemaps/`, // ...to the specified directory
					},
					processors: [
						/**
	           * [A little bag of CSS superpowers]
	           */
						rucksack({
							autoprefixer: false,
							fontPath: false,
							hexRGBA: false,
						}),
						/**
	           * [Adds vendor prefixes, using data from Can I Use]
	           */
						autoprefixer({
							overrideBrowserslist : [ 'last 2 Chrome versions', 'last 2 Firefox versions', 'last 2 Edge versions', 'last 2 Safari versions', 'last 2 Opera versions', 'last 2 iOS versions', 'last 2 ChromeAndroid versions' ],
						}),
						/**
	           * [Pack same CSS media query rules]
	           */
	          mqsort({
	          	sort: true
	          }),
						/**
	           * [Optimize CSS size]
	           */
						cssnano({
							safe: true,
						}),
						/**
		         * [Extract all @media rules and emit them as separate files]
		         */
						mqextract({
							output: {
								path: cssBuildPath,
								name: '[name]-[query].min.[ext]'
							},
							extractAll: false,
							queries: {
				        'screen and (min-width:36rem)': 'sm',
				        'screen and (min-width:48rem)': 'md',
				        'screen and (min-width:75rem)': 'lg'
					    }
						}),
					],
				},
				files: [ {
					expand: true,
					cwd: cssBuildPath,
					src: [ 'styles.css' ],
					dest: cssBuildPath,
					ext: '.min.css',
				} ],
			},
			pages: {
				options: {
					map: {
						inline: false, // save all sourcemaps as separate files...
						annotation: `${cssBuildPath}/sourcemaps/`, // ...to the specified directory
					},
					processors: [
						/**
	           * [A little bag of CSS superpowers]
	           */
						rucksack({
							autoprefixer: false,
							fontPath: false,
							hexRGBA: false,
						}),
						/**
	           * [Adds vendor prefixes, using data from Can I Use]
	           */
						autoprefixer({
							overrideBrowserslist : [ 'last 2 Chrome versions', 'last 2 Firefox versions', 'last 2 Edge versions', 'last 2 Safari versions', 'last 2 Opera versions', 'last 2 iOS versions', 'last 2 ChromeAndroid versions' ],
						}),
						/**
	           * [Pack same CSS media query rules]
	           */
	          mqsort({
	          	sort: true
	          }),
						/**
	           * [Optimize CSS size]
	           */
						cssnano({
							safe: true,
						}),
					],
				},
				files: [ {
					expand: true,
					cwd: cssBuildPath,
					src: [ 'pages/**/*.css', '!pages/**/*.min.css' ],
					dest: cssBuildPath,
					ext: '.min.css',
				} ],
			}
		},
		/**
     * [Generate SVG sprite]
     */
		svgstore: {
			options: {
				prefix: 'icon-',
				cleanup: [ 'fill', 'style' ],
				includeTitleElement: false,
				svg: {
					xmlns: 'http://www.w3.org/2000/svg',
				},
			},
			dist: {
				files: {
					[`${imgBuildPath}sprite.svg`]: [ `${iconsPath}*.svg` ],
				},
			},
		},
		/**
     * [Validate files with JSHint]
     */
		jshint: {
			options: {
				// '-W083': true,
				esversion: 6,
			},
			dist: [ `${jsPath}**/*.js` ],
		},
		/**
     * [Babel transpiler]
     */
		babel: {
			options: {
				presets: [ '@babel/preset-env' ],
			},
			dist: {
				files: [ {
					src: `${jsPath}scripts.js`,
					dest: `${jsBuildPath}scripts.transpiled.js`,
				} ],
			},
			components: {
				files: [ {
					expand: true,
					src: [ '**/*.js' ],
					cwd: jsComponentsPath,
					dest: jsBuildComponentsPath,
					ext: '.transpiled.js',
				} ],
			},
			pages: {
				files: [ {
					expand: true,
					src: [ '**/*.js' ],
					cwd: jsPagesPath,
					dest: jsBuildPagesPath,
					ext: '.transpiled.js',
				} ],
			},
		},
		/**
     * [Minify JavaScript files]
     */
		uglify: {
			dist: {
				files: [ {
					src: `${jsBuildPath}scripts.transpiled.js`,
					dest: `${jsBuildPath}scripts.min.js`,
				} ],
			},
			pages: {
				files: [ {
					expand: true,
					src: [ '**/*.transpiled.js' ],
					cwd: jsBuildPagesPath,
					dest: jsBuildPagesPath,
					ext: '.min.js',
				} ],
			},
			components: {
				files: [ {
					expand: true,
					src: [ '**/*.transpiled.js' ],
					cwd: jsBuildComponentsPath,
					dest: jsBuildComponentsPath,
					ext: '.min.js',
				} ],
			},
		},
		/**
     * [Optimize SVG file]
     */
		svgmin: {
			options: {
				plugins: [
					{ removeComments: false },
					{ removeViewBox: false },
					{ removeUselessStrokeAndFill: false },
					{ removeXMLNS: false },
				],
			},
			dist: {
				files: [ {
					expand: true,
					cwd: svgPath,
					src: [ '*.svg' ],
					dest: svgBuildPath,
					ext: '.svg',
				} ],
			}
		},
		/**
     * [Images JPG/PNG optimization]
     */
		image: {
			dist: {
				expand: true,
				src: [ '*.jpg', '*.png', '*webp' ],
				cwd: imgMiscPath,
				dest: imgMiscBuildPath,
			},
		},
		/**
     * [Clear files & folders]
     */
		clean: {
			options: {
				force: true,
			},
			svg: `${svgBuildPath}*.svg`,
			componentsJs: `${jsBuildComponentsPath}*.js`,
			pagesJs: `${jsBuildPagesPath}*.js`,
			font: [ `${fontBuildPath}*` ]
		},
		/**
     * [Copy to the build folder the sources that are not generated/processed/compiled]
     */
		copy: {
			font: {
				expand: true,
				src: [ '**' ],
				cwd: fontPath,
				dest: fontBuildPath,
			}
		},
		/**
	   * [Run tasks whenever watched files change]
	   */
		watch: {
			options: {
				spawn: false,
			},
			pug: {
				files: `${templatesPath}**/*`,
				tasks: [ 'pug', 'htmlmin:dist', 'htmllint' ],
			},
			style: {
				options: {
					spawn: true
				},
				files: [ `${scssPath}**/*.scss`, `!${scssPath}pages/**/*.scss` ],
				tasks: [ 'shell:lint', 'sass:dist', 'postcss:dist' ],
			},
			stylePages: {
				files: [ `${scssPath}pages/**/*.scss` ],
				tasks: [ 'shell:lint', 'newer:sass:pages', 'newer:postcss:pages' ],
			},
			sprite: {
				files: `${iconsPath}*.svg`,
				tasks: [ 'svgstore', 'pug', 'htmlmin:dist' ],
			},
			svg: {
				files: `${svgPath}*.svg`,
				tasks: [ 'clean:svg', 'svgmin' ],
			},
			imgMisc: {
				files: [ `${imgMiscPath}*` ],
				tasks: [ 'newer:image' ],
			},
			jshint: {
				files: [ `${jsPath}**/*.js` ],
				tasks: [ 'jshint' ],
			},
			uglifyMainJs: {
				files: [ `${jsPath}scripts.js` ],
				tasks: [ 'babel:dist', 'uglify:dist' ],
			},
			uglifyComponentsJs: {
				files: [ `${jsComponentsPath}**/*.js` ],
				tasks: [ 'newer:babel:components', 'newer:uglify:components' ],
			},
			uglifyPagesJs: {
				files: [ `${jsPagesPath}**/*.js` ],
				tasks: [ 'newer:babel:pages', 'newer:uglify:pages' ],
			},
			copyFont: {
				files: `${fontPath}**/*`,
				tasks: [ 'clean:font', 'copy:font' ],
			},
		},
	});

	grunt.registerTask('default', [ 'browserSync', 'watch' ]);

	grunt.registerTask('build:templates', [ 'pug', 'htmlmin:dist' ]);

	grunt.registerTask('lint:styles', [ 'shell:lint' ]);

	grunt.registerTask('build:styles', [ 'svgstore', 'clean:font', 'copy:font', 'sass', 'postcss' ]);

	grunt.registerTask('build:pagesJs', [ 'clean:pagesJs', 'babel:pages', 'uglify:pages' ]);

	grunt.registerTask('build:componentsJs', [ 'clean:componentsJs', 'babel:components', 'uglify:components' ]);

	grunt.registerTask('build:mainJs', [ 'babel:dist', 'uglify:dist' ]);

	grunt.registerTask('build:js', [ 'build:pagesJs', 'build:componentsJs', 'build:mainJs' ]);

	grunt.registerTask('build:img', [ 'clean:svg', 'svgmin', 'image' ]);

	grunt.registerTask('build', [ 'build:styles', 'build:js' ]);
};
