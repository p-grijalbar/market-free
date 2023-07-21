var gulp =          require('gulp');
var concat =        require('gulp-concat');
var connect =       require('gulp-connect');
var argv =          require('yargs').argv;
var gulpif =        require('gulp-if');
var jshint =        require('gulp-jshint');
var beautify =      require('gulp-beautify');
var rename =        require('gulp-rename');
var replace =       require('gulp-replace');
var sass =          require('gulp-sass')(require('sass'));
var sassThemes =    require('gulp-sass-themes');
var uglify =        require('gulp-uglify');
var cssbeautify =   require('gulp-cssbeautify');
var ext_replace =   require('gulp-ext-replace');
var processhtml =   require('gulp-processhtml');
var del =           require('del');
var path =          require('path');
var runSequence =   require('run-sequence').use(gulp);
var changed =       require('gulp-changed');
var merge =         require('merge-stream');

var config =        require('./gulp/config');

var paths = {
    dist : path.join(config.folders.dist),
    assets : path.join(config.folders.dist, config.folders.assets),
    html : path.join(config.folders.dist),
    js : path.join(config.folders.dist, config.folders.assets, 'js'),
    jsConcat : path.join(config.folders.dist, config.folders.assets, 'js'),
    fonts : path.join(config.folders.dist, config.folders.assets, 'fonts'),
    media : path.join(config.folders.dist, config.folders.assets, 'media'),
    css : path.join(config.folders.dist, config.folders.assets, 'css'),
    img : path.join(config.folders.dist, config.folders.assets, 'img'),
    plugins : path.join(config.folders.dist, config.folders.assets, config.folders.plugins),
    revolution : path.join(config.folders.dist, config.folders.assets, config.folders.plugins, 'revolution')
};

var themeOptions = {
    primaryColor: argv.color || config.primaryColor,
    shineColor: argv.shine || config.shine,
    headerClass: argv.header || config.headerClass,
    navbarClass: argv.navbar || config.navbarClass,
    navbarMode: argv.navbarMode || config.navbarMode
};

var targets = {
    dist : {
        environment: 'dist',
        data: {
            assets: config.folders.assets,
            primaryColor: themeOptions.primaryColor + '-' + themeOptions.shineColor,
            headerClass: themeOptions.headerClass,
            navbarClass: themeOptions.navbarClass
        },
    },
    navbar : {
        environment: 'navbar',
        data: {
            assets: config.folders.assets,
            primaryColor: themeOptions.primaryColor + '-' + themeOptions.shineColor,
            headerClass: themeOptions.headerClass,
            navbarClass: themeOptions.navbarClass + ' navbar-mode'
        },
    },
    demo : {
        environment: 'demo',
        data: {
            assets: config.folders.assets,
            primaryColor: themeOptions.primaryColor + '-' + themeOptions.shineColor,
            headerClass: themeOptions.headerClass,
            navbarClass: themeOptions.navbarClass
        },
    },
    dev : {
        environment: 'dev',
        data: {
            assets: config.folders.assets,
            primaryColor: themeOptions.primaryColor + '-' + themeOptions.shineColor,
            headerClass: themeOptions.headerClass,
            navbarClass: themeOptions.navbarClass
        },
    },
};

async function plugins() {
    await gulp.src(config.plugins.js)
        .pipe(gulp.dest(paths.js));

    await gulp.src(config.plugins.jsConcat)
        .pipe(gulpif(config.concat, concat('plugins.min.js')))
        .pipe(gulpif(config.concat, uglify()))
        .pipe(gulp.dest(paths.jsConcat));

    await gulp.src(config.plugins.css)
        .pipe(gulpif(config.concat, concat('plugins.min.css')))
        .pipe(gulp.dest(paths.css));

    await gulp.src(config.plugins.fonts)
        .pipe(gulp.dest(paths.fonts));

    await gulp.src(config.plugins.img)
        .pipe(gulp.dest(paths.img));
}

async function revolution() {
    return await gulp.src([
    './plugins/slider-revolution/revolution/**/*',
    './plugins/slider-revolution/revolution-addons/**/*',
    './plugins/slider-revolution/assets/**/*'],
    {base: './plugins/slider-revolution/'})
    .pipe(gulp.dest(paths.revolution));
}

async function html() {
    return await gulp.src(['src/html/**/*.html', '!src/html/layout/**/*'])
    .pipe(changed(path.join(paths.html)))
    .pipe(processhtml({
        recursive: true,
        process: true,
        strip: true,
        environment: targets[config.environment].environment,
        data: targets[config.environment].data,
        customBlockTypes: ['gulp/components-menu.js']
    }))
    .pipe(gulp.dest(path.join(paths.html)))
    .pipe(connect.reload());
}

async function html_dist() {
    return await gulp.src(['src/html/**/*.html', '!src/html/layout/**/*'])
    .pipe(processhtml({
        recursive: true,
        process: true,
        strip: true,
        environment: targets[config.environment].environment,
        data: targets[config.environment].data,
        customBlockTypes: ['gulp/components-menu.js']
    }))
    .pipe(gulp.dest(path.join(paths.html)))
    .pipe(connect.reload());
}

async function html_release() {
    for (var h in config.headers) {
        targets.dist.data.headerClass = 'ms-' + config.headers[h];

        for (var n in config.navbars) {
            targets.dist.data.navbarClass = 'ms-' + config.navbars[n];
            await gulp.src(['src/html/**/*.html', '!src/html/layout/**/*'])
                .pipe(processhtml({
                    recursive: true,
                    process: true,
                    strip: true,
                    environment: targets[config.environment].environment,
                    data: targets[config.environment].data,
                    customBlockTypes: ['gulp/components-menu.js']
                }))
                .pipe(gulp.dest(paths.html + '/' + config.headers[h] + '-' + config.navbars[n]))
                .pipe(connect.reload());
        }
    }

    for (var nav in config.navbars) {
        config.environment = 'navbar';
        targets.navbar.data.navbarClass = 'ms-' + config.navbars[nav] + ' navbar-mode';
        await gulp.src(['src/html/**/*.html', '!src/html/layout/**/*'])
            .pipe(processhtml({
                recursive: true,
                process: true,
                strip: true,
                environment: targets[config.environment].environment,
                data: targets[config.environment].data,
                customBlockTypes: ['gulp/components-menu.js']
            }))
            .pipe(gulp.dest(path.join(paths.html, config.navbars[nav])))
            .pipe(connect.reload());
    }
}

async function js() {
    await gulp.src(['src/js/**/*.js', '!src/js/configurator.js', '!src/js/pages/**/*'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(gulpif(config.compress, concat('app.min.js')))
        .pipe(gulpif(config.compress, uglify()))
        .pipe(gulp.dest(paths.js))
        .pipe(connect.reload());
    await gulp.src('src/js/configurator.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(gulpif(config.compress, concat('configurator.min.js')))
        .pipe(gulpif(config.compress, uglify()))
        .pipe(gulp.dest(paths.js))
        .pipe(connect.reload());
    await gulp.src('src/js/pages/**/*')
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(gulpif(config.compress, uglify()))
        .pipe(gulp.dest(paths.js))
        .pipe(connect.reload());
}

function themes() {
    var out = [];
    for (var color in config.themes) {
        for (var shine in config.shines) {
            var color_light = Number(config.shines[shine]) - 100;
            var color_dark = Number(config.shines[shine]) + 100;
            out.push(gulp.src(['src/scss/_config.scss'])
                .pipe(replace('light-blue-400', 'change400'))
                .pipe(replace('light-blue-500', 'change500'))
                .pipe(replace('light-blue-600', 'change600'))
                .pipe(replace('change400', config.themes[color] + '-' + color_light.toString()))
                .pipe(replace('change500', config.themes[color] + '-' + config.shines[shine]))
                .pipe(replace('change600', config.themes[color] + '-' + color_dark.toString()))
                .pipe(replace(' !default', ''))
                .pipe(rename('_' + config.themes[color] + '-' + config.shines[shine] + '.scss'))
                .pipe(gulp.dest('src/scss/themes')));
        }
    }
    return merge(out);
}

function generateNames() {
    var result = [];
    for (var color in config.themes) {
        for (var shine in config.shines) {
            result.push('' + config.themes[color] + '-' + config.shines[shine]);
        }
    }
    return result;
}

async function scss() {

    await gulp.src('src/scss/**/*.scss')
    .pipe(gulpif(config.allColors, sassThemes('src/scss/themes/_*.scss', generateNames())))
    .pipe(sass().on('error', sass.logError))
    .pipe(gulpif(config.compress, rename({
        suffix: '.min',
        extname: '.css'
    })))
    //.pipe(gulpif(!config.compress, rename('style.' + config.defaultTheme + '.min.css')))
    .pipe(gulp.dest(paths.css))
    .pipe(connect.reload());
}

async function css_beautify() {
    await gulp.src(path.join(paths.css, '/**/*.css'))
    .pipe(cssbeautify())
    .pipe(ext_replace('.css', '.min.css'))
    .pipe(gulp.dest('uncompressed/css/'));
}

async function js_beautify() {
    await gulp.src('src/js/**/*.js')
    .pipe(gulp.dest('uncompressed/js/'));
}

async function img() {
    await gulp.src('src/img/**/*')
    // .pipe(gulpif(config.compress, imagemin()))
    .pipe(gulp.dest(paths.img))
    .pipe(connect.reload());
}

async function fonts() {
    await gulp.src('src/fonts/**/*')
    .pipe(gulp.dest(paths.fonts))
    .pipe(connect.reload());
}

async function media() {
    await gulp.src('src/media/**/*')
    .pipe(gulp.dest(paths.media))
    .pipe(connect.reload());
}

async function clean() {
    return await del.sync([
        paths.dist,
        'src/scss/themes/*',
        'uncompressed'
    ]);
}

async function server() {
    return await connect.server({
        host: '0.0.0.0',
        root: config.folders.dist,
        port: 8000,
        livereload: true
    });
}

function watch() {
    gulp.watch('src/html/**/*', html);
    gulp.watch('src/html/layout/**/*', html_dist);
    gulp.watch('src/js/**/*', js);
    gulp.watch('src/scss/**/*', scss);
    gulp.watch('src/img/**/*', img);
    gulp.watch('src/fonts/**/*', fonts);
    gulp.watch('src/media/**/*', media);
}

  
exports.default =  gulp.series(server);

async function dist_config() {
    config.compress = true;
    config.environment = 'dist';
    config.allColors = true;

    config.themes = [themeOptions.primaryColor];
    config.shines = [themeOptions.shineColor];


    if(themeOptions.navbarMode) {
        config.environment = 'navbar';
    }
}

exports.dist = gulp.series(
    dist_config,
    clean,
    themes,
    gulp.parallel(plugins, html_dist, js, scss, img, fonts, media, revolution)
);


async function demo_config() {
    config.allColors = true;
    config.compress = true;
    config.environment = 'demo';
}

exports.demo = gulp.series(
    demo_config,
    clean,
    themes,
    gulp.parallel(plugins, html, js, scss, img, fonts, media, revolution)
);

async function dev_config() {
    config.environment = 'dev';
}

exports.dev = gulp.series(
    dev_config,
    clean,
    gulp.parallel(plugins, html, js, scss, img, fonts, media, revolution)
);

async function work_config() {
    config.environment = 'dev';
}

exports.work = gulp.series(
    work_config,
    clean,
    gulp.parallel(plugins, html, js, scss, img, fonts, media, revolution),
    gulp.parallel(server, watch)
);

async function release_config() {
    config.allColors = true;
    config.compress = true;
    config.environment = 'dist';
}

exports.release = gulp.series(
    release_config,
    clean,
    themes,
    gulp.parallel(plugins, html_release, js, scss, img, fonts, media, revolution),
);

exports.uncompressed = gulp.series(css_beautify, js_beautify);