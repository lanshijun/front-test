'use strict';  

module.exports = function(grunt){ 
    grunt.initConfig({ 
		//��ȡ��package.json����
        pkg: grunt.file.readJSON('package.json'),
		jshint: { 
            options: {
                curly: true,
                eqeqeq: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                boss: true,
                node: true,
                globals: {
                    exports: true,
                    jQuery: true
                }
            },
            files:['src/test1.js', 'src/test2.js']
        },
        concat: {
			options: {
				separator: ';',
			},
			dist: {
				src: ['src/test1.js', 'src/test2.js'],
				dest: 'src/dist/built.js'
			},
		},
		//jsѹ��
        uglify: { 
            //ʹ��options�������
            options: { 
                //Ϊtrue��ʾ�������ͷ����Ϣ
                stripBanners: true,
                //��ͷ����� js�ļ�����ʱ���ע��
                banner: '/*! <%=pkg.name%>-<%=pkg.version%>.js <%=grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            //files�������⣬�����·���build �ؼ���src-destҪָʾ��
            files: { 
                src: 'src/dist/built.js',
                dest: 'src/dist/<%=pkg.name%>-<%=pkg.version%>.min.js'
            }
        },
        //css ѹ��
        cssmin: { 
            options:{ 
                report:'gzip'
            },
            build: { 
                expand: true,
                cwd: './static/style',
                src: ['test.css'],
                dest: './build/static/style'
            }
        },
        //html ѹ��
        htmlmin: { 
            options: { 
            removeComments: true,
            removeCommentsFromCDATA: true,
            collapseWhitespace: true,
            collapseBooleanAttributes: true,
            removeAttributeQuotes: true,
            removeRedundantAttributes: true,
            useShortDoctype: true,
            removeEmptyAttributes: true,
            removeOptionalTags: true
            },
            build:{ 
                expand: true,
                cwd: './',
                src: ['*.html'],
                dest: './'
            }
        },
		sass:{ 
            dist:{ 
                options:{ 
                    style: 'expanded'
                },
                files:{ 
                    './static/style/test.css':'./static/style/test.scss'
                }
            }
        },
		watch: { 
			css: {
				files: '**/*.sass',
				tasks: ['sass'],
				options: {
				  livereload: true,
				}
			},
			all: {
				files: ['**/*.js','**/*.css'],
				tasks: ['jshint', 'concat', 'uglify', 'cssmin', 'htmlmin'],
				options: {
				  spawn: false,
				}
			}
        }
    });
    
	grunt.event.on('watch', function(action, filepath, target) {
          grunt.log.writeln(target + ': ' + filepath + ' has ' + action);
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-watch');
     
    grunt.registerTask('default',['jshint', 'concat', 'uglify', 'cssmin', 'htmlmin', 'watch']);
};