# About
SMS Annoyer is a small AWS Lambda that sends a pre-specified SMS to a pre-specified phone number
every X minutes. "Why?" you might ask. Well... just to annoy them :P

# Requirements
The lambda is written with Node.js and therefore requires Node.js 6.10 or higher to be installed on your machine.

# First time preparation
Before you can do anything about the lambda, you need to install the necessary dependencies.
You can do so by running

        npm install
        
# Local debugging
The lambda is written with the serverless framework and therefore makes is trivial to deploy and debug.
To run the lambda locally, run the following command:

        ./node_modules/serverless/bin/serverless invoke local -f handle --data "{\"region\": \"<region>\", \"recipient\": \"<recipient>\", \"message\": \"<message>\"}"
        
        Pre-filled example:
        
        ./node_modules/serverless/bin/serverless invoke local -f handle --data "{\"region\": \"eu-west-1\", \"recipient\": \"358406781234\", \"message\": \"Hello!\"}"

# AWS Deployment
The lambda uses the serverless framework that makes it super easy to deploy it into the CloudFormation stack.

# Single repetitive message
It is possible to specify one single repetitive message that will be sent every few minutes

You can do so by running the following command:
        
        ./node_modules/serverless/bin/serverless deploy -v --region "<region>" --recipient "<recipient>" --message "<message>"
        
        Pre-filled example:
        
        ./node_modules/serverless/bin/serverless deploy -v --region "eu-west-1" --recipient "358406781234" --message "Hello!"
        
# Multiple looped messages
It is possible to specify multiple messages that will be sent in a loop

You can do so by running the following command:
        
        ./node_modules/serverless/bin/serverless deploy -v --region "<region>" --recipient "<recipient>" --messagesInput "<messageFile>"
        
        Pre-filled example:
        
        ./node_modules/serverless/bin/serverless deploy -v --region "eu-west-1" --recipient "358406781234" --message "./messages.json"

# Command parameter description
* `region` - AWS region. To save money, you should probably choose one that is the nearest to your recipient
* `recipient` - the phone number of your recipient. Note, that it should not contain any spaces and should start with a country code (although without +), so for instance, for Finland it could look like `358406781234`
* `message` - a string representing the actual message that should be sent