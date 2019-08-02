'use strict';

const AWS = require('aws-sdk');
const sns = new AWS.SNS();

module.exports.handle = event => {
  console.log(`Sending the following message: "${event.message}" to recipient ${event.recipient}`);

  const params = {
    Message: event.message,
    MessageStructure: 'string',
    PhoneNumber: event.recipient
  };

  return sns.publish(params).promise();
};