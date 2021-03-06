'use strict';

var grunt = require('grunt');
var path = require('path');
var fs = require('fs');
var http = require('http');
var helper = require('./helper');

var fixtures = helper.fixtures;

function cleanUp() {
  helper.cleanUp([
    'livereload/node_modules',
  ]);
}

// Helper for requesting the live reload server
function request(port, done) {
  var data = '';
  var req = http.request({
    hostname: 'localhost',
    port: port,
  }, function(res) {
    res.setEncoding('utf8');
    res.on('data', function(chunk) {
      data += chunk;
    });
    res.on('end', function() {
      done(data);
    });
  });
  req.end();
}

exports.livereload = {
  setUp: function(done) {
    cleanUp();
    fs.symlinkSync(path.join(__dirname, '../../node_modules'), path.join(fixtures, 'livereload', 'node_modules'));
    done();
  },
  tearDown: function(done) {
    cleanUp();
    done();
  },
  basic: function(test) {
    test.expect(4);
    var resultData = '';
    var cwd = path.resolve(fixtures, 'livereload');
    var assertWatch = helper.assertTask(['watch:basic', '-v'], {cwd: cwd});
    assertWatch([function() {
      request(35729, function(data) {
        resultData += data;
        grunt.file.write(path.join(cwd, 'lib', 'one.js'), 'var one = true;');
      });
    }], function(result) {
      result = helper.unixify(result);
      helper.verboseLog(result);
      test.ok(result.indexOf('I ran before livereload.') !== -1, 'task should have ran before live reload.');
      test.ok(result.indexOf('Live reload server started on *:35729') !== -1,
        'live reload server should have been started on port 35729.');
      test.ok(result.indexOf('Live reloading lib/one.js...') !== -1, 'live reload should have triggered on lib/one.js');
      resultData = JSON.parse(resultData);
      test.equal(resultData.tinylr, 'Welcome', 'tinylr server should have welcomed you.');
      test.done();
    });
  },
  customhost: function(test) {
    test.expect(4);
    var resultData = '';
    var cwd = path.resolve(fixtures, 'livereload');
    var assertWatch = helper.assertTask(['watch:customhost', '-v'], {cwd: cwd});
    assertWatch([function() {
      request(8675, function(data) {
        resultData += data;
        grunt.file.write(path.join(cwd, 'lib', 'one.js'), 'var one = true;');
      });
    }], function(result) {
      result = helper.unixify(result);
      helper.verboseLog(result);
      test.ok(result.indexOf('I ran before livereload.') !== -1, 'task should have ran before live reload.');
      test.ok(result.indexOf('Live reload server started on localhost:8675') !== -1,
        'live reload server should have been started on localhost:8675.');
      test.ok(result.indexOf('Live reloading lib/one.js...') !== -1, 'live reload should have triggered on lib/one.js');
      resultData = JSON.parse(resultData);
      test.equal(resultData.tinylr, 'Welcome', 'tinylr server should have welcomed you.');
      test.done();
    });
  },
  differentfiles: function(test) {
    test.expect(3);
    var cwd = path.resolve(fixtures, 'livereload');
    var assertWatch = helper.assertTask(['watch:differentfiles', '-v'], {cwd: cwd});
    assertWatch([function() {
      grunt.file.write(path.join(cwd, 'lib', 'one.js'), 'var one = true;');
    }, function() {
      grunt.file.write(path.join(cwd, 'lib', 'two.js'), 'var two = true;');
    }], function(result) {
      result = helper.unixify(result);
      helper.verboseLog(result);
      test.ok(result.indexOf('Live reloading lib/one.js...') !== -1, 'live reload should have triggered on lib/one.js');
      test.ok(result.indexOf('Live reloading lib/two.js...') !== -1, 'live reload should have triggered on lib/two.js');
      test.ok(!/Live reloading (lib\/one\.js, lib\/two.js|lib\/two.js, lib\/one.js)\.\.\./.test(result),
        'live reload should have cleared js file that was already reloaded');
      test.done();
    });
  },
  multiplefiles: function(test) {
    test.expect(4);
    var resultData = '';
    var cwd = path.resolve(fixtures, 'livereload');
    var assertWatch = helper.assertTask(['watch:multiplefiles', '-v'], {cwd: cwd});
    assertWatch([function() {
      request(9876, function(data) {
        resultData += data;
        grunt.file.write(path.join(cwd, 'lib', 'one.js'), 'var one = true;');
        grunt.file.write(path.join(cwd, 'lib', 'two.js'), 'var two = true;');
      });
    }], function(result) {
      result = helper.unixify(result);
      helper.verboseLog(result);
      test.ok(result.indexOf('I ran before livereload.') !== -1, 'task should have ran before live reload.');
      test.ok(result.indexOf('Live reload server started on *:9876') !== -1,
        'live reload server should have been started on port 9876.');
      test.ok(/Live reloading (lib\/one\.js, lib\/two.js|lib\/two.js, lib\/one.js)\.\.\./.test(result),
        'live reload should have triggered on lib/one.js and lib/two.js');
      resultData = JSON.parse(resultData);
      test.equal(resultData.tinylr, 'Welcome', 'tinylr server should have welcomed you.');
      test.done();
    });
  },
  nospawn: function(test) {
    test.expect(4);
    var resultData = '';
    var cwd = path.resolve(fixtures, 'livereload');
    var assertWatch = helper.assertTask(['watch:nospawn', '-v'], {cwd: cwd});
    assertWatch([function() {
      request(1337, function(data) {
        resultData += data;
        grunt.file.write(path.join(cwd, 'lib', 'one.js'), 'var one = true;');
      });
    }], function(result) {
      result = helper.unixify(result);
      helper.verboseLog(result);
      test.ok(result.indexOf('I ran before livereload.') !== -1, 'task should have ran before live reload.');
      test.ok(result.indexOf('Live reload server started on *:1337') !== -1,
        'live reload server should have been started on port 1337.');
      test.ok(result.indexOf('Live reloading lib/one.js...') !== -1, 'live reload should have triggered on lib/one.js');
      resultData = JSON.parse(resultData);
      test.equal(resultData.tinylr, 'Welcome', 'tinylr server should have welcomed you.');
      test.done();
    });
  },
  notasks: function(test) {
    test.expect(3);
    var resultData = '';
    var cwd = path.resolve(fixtures, 'livereload');
    var assertWatch = helper.assertTask(['watch:notasks', '-v'], {cwd: cwd});
    assertWatch([function() {
      request(35729, function(data) {
        resultData += data;
        grunt.file.write(path.join(cwd, 'lib', 'one.js'), 'var one = true;');
      });
    }], function(result) {
      result = helper.unixify(result);
      helper.verboseLog(result);
      test.ok(result.indexOf('Live reload server started on *:35729') !== -1,
        'live reload server should have been started on port 35729.');
      test.ok(result.indexOf('Live reloading lib/one.js...') !== -1, 'live reload should have triggered on lib/one.js');
      resultData = JSON.parse(resultData);
      test.equal(resultData.tinylr, 'Welcome', 'tinylr server should have welcomed you.');
      test.done();
    });
  },
  onlytriggeron: function(test) {
    test.expect(2);
    var cwd = path.resolve(fixtures, 'livereload');
    var assertWatch = helper.assertTask(['watch', '-v'], {cwd: cwd});
    assertWatch([function() {
      request(35729, function() {
        grunt.file.write(path.join(cwd, 'sass', 'one.scss'), '#one {}');
      });
    }], function(result) {
      result = helper.unixify(result);
      helper.verboseLog(result);
      test.ok(result.indexOf('Live reloading sass/one.scss') === -1,
        'Should not trigger live reload on non livereload targets.');
      test.ok(result.indexOf('Live reloading css/one.css') !== -1,
        'Should trigger live reload when other tasks trigger livereload targets.');
      test.done();
    });
  },
  livereloadOnErrorTrue: function(test) {
    test.expect(1);
    var cwd = path.resolve(fixtures, 'livereload');
    var assertWatch = helper.assertTask(['watch:livereloadOnErrorTrue', '-v'], {cwd: cwd});
    assertWatch([function() {
      request(35729, function() {
        grunt.file.write(path.join(cwd, 'lib', 'one.js'), 'var one = true;');
      });
    }], function(result) {
      result = helper.unixify(result);
      helper.verboseLog(result);
      test.ok(result.indexOf('Live reloading lib/one.js...') !== -1, 'Should livereload when a task errors w/o flag');
      test.done();
    });
  },
  livereloadOnErrorFalse: function(test) {
    test.expect(1);
    var cwd = path.resolve(fixtures, 'livereload');
    var assertWatch = helper.assertTask(['watch:livereloadOnErrorFalse', '-v'], {cwd: cwd});
    assertWatch([function() {
      request(35729, function() {
        grunt.file.write(path.join(cwd, 'lib', 'one.js'), 'var one = true;');
      });
    }], function(result) {
      result = helper.unixify(result);
      helper.verboseLog(result);
      test.ok(result.indexOf('Live reloading lib/one.js...') === -1,
        'Should not livereload when a task errors with flag');
      test.done();
    });
  },
  livereloadOnErrorFalseNoSpawn: function(test) {
    test.expect(1);
    var cwd = path.resolve(fixtures, 'livereload');
    var assertWatch = helper.assertTask(['watch:livereloadOnErrorFalseNoSpawn', '-v'], {cwd: cwd});
    assertWatch([function() {
      request(35729, function() {
        grunt.file.write(path.join(cwd, 'lib', 'one.js'), 'var one = true;');
      });
    }], function(result) {
      result = helper.unixify(result);
      helper.verboseLog(result);
      test.ok(result.indexOf('Live reloading lib/one.js...') === -1,
        'Should not livereload when a task errors with flag and spawn=false');
      test.done();
    });
  },
};
