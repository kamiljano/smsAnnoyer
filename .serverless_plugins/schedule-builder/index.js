'use strict';

module.exports = class {

  constructor(serverless, options) {

    this.commands = {
      deploy: {
        lifecycleEvents: ['resources', 'functions'],
        commands
      }
    };

    this.hooks = {
      'before:deploy:resources': this.buildSchedule
    };
  }

  buildSchedule() {

  }

};