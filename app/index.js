'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');

var initAppOptions = function (gen) {
  var appOptions = {};
  var _ = gen._;

  var appname = gen.appname || path.basename(process.cwd());

  var slugged = _.slugify(_.humanize(appname));
  var match = slugged.match(/^docpad-plugin-(.+)/);

  if (match && match.length === 2) {
    appOptions.pluginName = match[1].toLowerCase();
  } else {
    appOptions.pluginName = slugged;
  }

  return appOptions;
};

var DocpadPluginGenerator = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');

    this.argument('appname', { type: String, required: false });

    this.appOptions = initAppOptions(this);
  },

  prompting: function () {
    var done = this.async();
    var appOptions = this.appOptions;

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the awe-inspiring DocpadPlugin generator!'
    ));

    var prompts = [{
      name: 'pluginName',
      message: 'What\'s the base name of your docpad plugin?',
      default: appOptions.pluginName
    }, {
      name: 'githubUser',
      message: 'What\'s the name of your github account?'
    } ];

    this.prompt(prompts, function (props) {
      ['pluginName', 'githubUser'].forEach(function (key) {
        this.appOptions[key] = props[key];
      }.bind(this));

      this.appOptions.classname = this._.classify(props.pluginName);

      done();
    }.bind(this));
  },

  writing: {
    app: function () {

      ['.plugin.coffee', '.test.coffee'].forEach(function (ext) {
        this.copy('src/yourpluginname' + ext, path.join('src', this.appOptions.pluginName + ext));
      }.bind(this));

      this.directory('./test', './test');
    },

    projectfiles: function () {
      var options = { dot: true, cwd: this.sourceRoot() };
      this.expandFiles('*', options).forEach(function (file) {
        this.copy(file, file);
      }.bind(this));
    }
  },

  end: function () {
    if (!this.options['skip-install']) {
      this.installDependencies();
    }
  }
});

module.exports = DocpadPluginGenerator;
