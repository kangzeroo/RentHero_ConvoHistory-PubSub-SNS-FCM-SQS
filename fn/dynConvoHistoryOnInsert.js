const dynAPI = require('../api/dyn/aws_dyn')
const sesAPI = require('../api/ses/aws_ses')
const snsAPI = require('../api/sns/aws_sns')

module.exports = function(event, context, callback) {
  console.log('------ dynConvoHistoryOnInsert() ------')
  console.log('------ LAMBDA EVENT OBJECT ------')
  console.log(event)
  console.log(event.Records[0])
  console.log(event.Records[0].dynamodb.NewImage)
  console.log('------ LAMBDA CONTEXT OBJECT ------')
  console.log(context)

  // variables
  console.log('------ DYN MESSAGE ------')
  const ENTRY = dynAPI.convertDYNSyntax(event.Records[0].dynamodb.NewImage)
  console.log(ENTRY)

  // logic
  if (ENTRY.RECEIVER_TYPE === 'AGENT_ID') {
    const params = {
      Message: JSON.stringify({
        default: 'You have received a new message from DYN:CONVO_HISTORY!',
        data: ENTRY
      }), /* required */
      // MessageAttributes: {
      //   '<String>': {
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
        const response = {
          statusCode: 200,
          body: JSON.stringify({
            message: 'Your function (dynConvoHistoryOnInsert) executed successfully!',
            input: event,
          }),
        };
        callback(null, response);
      })
      .catch((err) => {
        reportIssue(callback, err, context)
      })
  } else {
    const response = {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Your function (dynConvoHistoryOnInsert) executed successfully!',
        input: event,
      }),
    };
    callback(null, response);
  }
  // const response = {
  //   statusCode: 200,
  //   body: JSON.stringify({
  //     message: 'Go Serverless v1.0! Your function (dynConvoHistoryOnInsert) executed successfully!',
  //     input: event,
  //   }),
  // };
  // callback(null, response);

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
}

const reportIssue = (callback, err, context) => {
  console.log('------ REPORTING AN ISSUE... ------')
  sesAPI.sendErrorReportEmail(err, context)
    .then((data) => {
      callback(null, err)
    })
    .catch((fail) => {
      console.log('------ COULD NOT REPORT AN ISSUE... ------')
      console.log(fail)
      callback(null, fail)
    })
}
