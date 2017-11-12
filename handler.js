'use strict';

const AWS = require('aws-sdk');

module.exports.handle = (event, context, callback) => {

  console.log(`Using SNS region: ${event.region}`);
  console.log(`Sending the following message: ${event.message} to recipient ${event.recipient}`);

  const sns = new AWS.SNS({region: event.region});

  const params = {
    Message: event.message,
    MessageStructure: 'string',
    PhoneNumber: event.recipient
  };

  sns.publish(params, err => {
    err ? callback(err) : callback(null, "SMS sent successfully");
  });
};