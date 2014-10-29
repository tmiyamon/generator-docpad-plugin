/*global describe, beforeEach, it*/
'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');

describe('docpad-plugin:app', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../app'))
      .inDir(path.join(os.tmpdir(), './temp-test'))
      .withOptions({ 'skip-install': true })
      .withPrompt({
        pluginName: 'sample',
        githubUser: 'sampleUser'
      })
      .on('end', done);
  });

  it('creates files', function () {
    var expected = [
      '.editorconfig',
      '.gitignore',
      '.npmignore',
      '.travis.yml',
      'CONTRIBUTING.md',
      'Cakefile',
      'HISTORY.md',
      'LICENSE.md',
      'README.md',
      'package.json',
      'src/sample.plugin.coffee',
      'src/sample.test.coffee'
    ]
    assert.file(expected);
  });

  it('fills package.json with correct information', function () {
    assert.fileContent('package.json',  /"name": "docpad-plugin-sample"/);
  });

  describe('app files', function () {
    it('fills plugin with correct class name', function () {
      assert.fileContent('src/sample.plugin.coffee',  /class SamplePlugin/);
    });

    it('fills plugin with correct plugin name', function () {
      assert.fileContent('src/sample.plugin.coffee',  /name: 'sample'/);
    });
  })
});
