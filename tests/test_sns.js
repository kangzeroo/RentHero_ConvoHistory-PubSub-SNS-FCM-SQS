const snsAPI = require('../api/sns/aws_sns')

// $ NODE_ENV=development NEW_MESSAGE_SNS_TOPIC_ARN='arn:aws:sns:us-east-1:637888834967:New_Message_For_Agents_DEV' node tests/test_sns.js

const testSNS = () => {
  const params = {
    Message: JSON.stringify({
      default: 'You have received a new message from DYN:CONVO_HISTORY!'
    }), /* required */
    // MessageAttributes: {
    //   'default': {
    //     DataType: 'STRING_VALUE', /* required */
    //     // BinaryValue: 'STRING_VALUE' /* Strings will be Base-64 encoded on your behalf */,
    //     // StringValue: 'STRING_VALUE'
    //   },
    //   /* '<String>': ... */
    // },
    // MessageStructure: 'json',
    // PhoneNumber: 'STRING_VALUE',
    // Subject: 'STRING_VALUE',
    // TargetArn: 'STRING_VALUE',
    TopicArn: process.env.NEW_MESSAGE_SNS_TOPIC_ARN
  }
  snsAPI.publishSNSTopic(params)
    .then((data) => {
      console.log('SUCCESS')
    })
    .catch((err) => {
      console.log(err)
      console.log('FAILURE')
    })
}

testSNS()
