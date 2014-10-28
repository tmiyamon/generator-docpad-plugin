'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');

var DocpadPluginGenerator = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the awe-inspiring DocpadPlugin generator!'
    ));

    var prompts = [{
      type: 'confirm',
      name: 'someOption',
      message: 'Would you like to enable this option?',
      default: true
    }];

    this.prompt(prompts, function (props) {
      this.someOption = props.someOption;

      done();
    }.bind(this));
  },

  writing: {
    app: function () {


      //this.directory('.', '.');
    },
    projectfiles: function () {
      var options = { dot: true, cwd: this.sourceRoot()};
      this.expandFiles('*', options).forEach(function (file) {
        this.copy(file, file);
      }.bind(this));
    }
  },

  end: function () {
    this.installDependencies();
  }
});

module.exports = DocpadPluginGenerator;
