'use strict';

const AWS = require('aws-sdk');

let lastMessageIndex = 0;

function getMessageFromFile(file) {
  const messages = require(file);
  if (!messages instanceof Array) {
    throw `The content of ${file} is expected to be an array`;
  }
  if (!file.length) {
    throw `The array specified at ${file} has to specify at least one message`;
  }
  const result = messages[lastMessageIndex];
  if (lastMessageIndex < messages.length - 1) {
    lastMessageIndex ++;
  } else {
    lastMessageIndex = 0;
  }
  return result;
}

function getMessage(event) {
  return event.messagesInput
    ? getMessageFromFile(event.messagesInput)
    : event.message;
}

module.exports.handle = (event, context, callback) => {

  console.log(`Using SNS region: ${event.region}`);

  let message;
  try {
    message = getMessage(event);
  } catch(err) {
    callback(err);
    return;
  }
  console.log(`Sending the following message: "${message}" to recipient ${event.recipient}`);

  const sns = new AWS.SNS({region: event.region});

  const params = {
    Message: message,
    MessageStructure: 'string',
    PhoneNumber: event.recipient
  };

  sns.publish(params, err => {
    err ? callback(err) : callback(null, "SMS sent successfully");
  });
};