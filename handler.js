'use strict';

const AWS = require('aws-sdk');
const sns = new AWS.SNS();

module.exports.handle = async () => {
  if (!process.env.RECIPIENT) {
    throw new Error('The RECIPIENT parameter is mandatory');
  }

  if (!process.env.MESSAGE) {
    throw new Error("The MESSAGE parameter is mandatory");
  }

  console.log(`Sending the message: "${process.env.MESSAGE}" to recipient ${process.env.RECIPIENT}`);

  try {
    await sns.publish({
      Message: process.env.MESSAGE,
      PhoneNumber: process.env.RECIPIENT
    }).promise();
  } catch (err) {
    console.error(`Failed to send the text message to ${process.env.RECIPIENT}. Error: ${err}`);
    throw err;
  }
  console.log(`Successfully sent a message to ${process.env.RECIPIENT}`);
};