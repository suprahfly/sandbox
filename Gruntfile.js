module.exports = function (grunt) {
  // Loading tasks
  require('load-grunt-tasks')(grunt);
  // Show timing
  require('time-grunt')(grunt);

  // Some globals
  var config = {
    app: {
      root: 'client/app',
      assets: 'client/assets',
      scripts: 'client/app/scripts',
      styles: 'client/app/styles',
      views: 'client/app/views',
      tmp: '.tmp'
    },
    assets: {
      images: 'client/assets/images',
      fonts: 'client/assets/fonts'
    },
    components: {
      root: 'client/components',
      vendor: 'client/vendor'
    }
  };

  // Congiguring tasks
  grunt.initConfig({

    app: config.app,
    assets: config.assets,
    components: config.components,

    // Sass compile
    sass: {
      dev: {
        options: {
          // style: 'nested',
          precision: 4,
          lineNumbers: true,
          sourcemap: 'inline'
        },
        files: [{
          expand: true,
          cwd: '<%= app.styles %>',
          src: ['*.{sass, scss}'],
          // dest: '<%= app.styles %>',
          dest: '<%= app.tmp %>/styles',
          ext: '.css'
        }]
      }
    },

    // Prefixing css
    autoprefixer: {
      dev: {
        options: {
          browsers: ['> 3%'],
          cascade: true,
          // map: true
        },
        src: ['<%= app.tmp %>/styles/*.css'],
      }
    },

    // Shell config
    // shell: {
    //   server: {
    //     options: {
    //       stdin: false
    //     },
    //     command: function (port) {
    //       if (!isNaN(port)) return 'http-server client/app -o -p ' + port;
    //       else return 'http-server client/app -o -p 9000';
    //     }
    //   }
    // },

    // Copy config
    // copy: {
    //   styles: {
    //     expand: true,
    //     dot: true,
    //     cwd: '<%= app.styles %>',
    //     dest: '.tmp/styles/',
    //     src: '{,*/}*.css'
    //   }
    // },

    // Clean folders
    clean: {
      temp: '.tmp'
    },

    // Concurrent tasks
    concurrent: {
      options: {
        // logConcurrentOutput: false
      },
      server: ['wiredep', 'styles']
    },

    // Run http-server
    connect: {
      options: {
        port: 9000,
        protocol: 'http',
        hostname: 'localhost',
        livereload: 1337,
        open: true,
        debug: true
      },
      server: {
        options: {
          middleware: function (connect) {
            return [
              connect.static('.tmp'),
              connect().use('/components', connect.static(config.components.root)),
              connect().use('/vendor', connect.static(config.components.vendor)),
              connect.static(config.app.assets),
              connect.static(config.app.root)
            ];
          }
        }
      }
    },

    // Wire Bower dependencies
    wiredep: {
      dev: {
        src: '<%= app.root %>/index.html',
        ignorePath: /\.\.\/?/g
      }
    },

    // Watch config
    watch: {
      config: { // Watch Gruntfile for changes
        files: ['Gruntfile.js'],
        reload: true
      },
      bower: { // Watch Bower for new dependencies
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: ['bower.json'],
        tasks: ['wiredep']
      },
      styles: {
        options: { // Watch style files for changes
        },
        files: ['<%= app.styles %>/**/*.{sass, scss}'],
        tasks: ['styles']
      },
      livereload: {
        files: [ // Files firing reload event on save
          '<%= app.root %>/index.html',
          '<%= app.views %>/{,*/}*.html',
          '<%= app.scripts %>/**/*.js',
          '<%= app.tmp %>/styles/{,*/}*.css'
        ],
        options: {
          livereload: '<%= connect.options.livereload %>'
          // spawn: true,
          // interrupt: true,
          // event: ['added', 'changed', 'deleted'],
          // atBegin: false,
          // livereload: true,
          // livereloadOnError: false
        }
      }
    }
  });



  // My test task
  grunt.registerTask('test', 'My Grunt Task', function () {

    // var child = require('server');
    // console.log(child);

    // grunt.log.writeln(task);
    // Output to cmd
    // var args = [], i;
    // if (dev) {
    //   grunt.log.writeln(this.name + ':dev RUN');
    // } else if (arguments.length === 0) {
    //   grunt.log.writeln(this.name + ' RUN, no args');
    // } else {
    //   for (i = 0; i < arguments.length; i++) {
    //     args.push(arguments[i])
    //   }
    //   grunt.log.writeln(this.name +':'+ args.join(':') + ' RUN');
    // }
  });

  // Aliases
  grunt.registerTask('styles', ['sass:dev', 'autoprefixer']);
  grunt.registerTask('server', ['clean:temp', 'concurrent:server', 'connect', 'watch']);

  // Default task
  grunt.registerTask('default', ['server']);
}