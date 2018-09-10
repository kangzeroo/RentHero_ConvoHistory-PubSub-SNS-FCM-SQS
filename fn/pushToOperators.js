const fcnAPI = require('../api/fcn/fcn_api')
const sqsAPI = require('../api/sqs/sqs_api')

module.exports = function(event, context, callback) {
  console.log('------ pushToOperators() ------')
  console.log('------ LAMBDA EVENT OBJECT ------')
  console.log(event)
  console.log(event.Records[0].Sns)
  console.log(JSON.parse(event.Records[0].Sns.Message))
  console.log(JSON.parse(event.Records[0].Sns.Message).data)
  console.log('------ LAMBDA CONTEXT OBJECT ------')
  console.log(context)
  const notification = {
    "body" : "This is an FCM notification message!",
    "title" : "FCM Message",
  }
  const clientTokenIds = [

  ]
  // grabRelevantOperators().then()...
  fcnAPI.sendNotifications(notification, clientTokenIds)
    .then((data) => {
      const params = {
        MessageBody: "Information about current NY Times fiction bestseller for week of 12/11/2016.",
        QueueUrl: process.env.OPERATOR_SQS_URL,
        MessageGroupId: '1111',
        DelaySeconds: 0,
        MessageAttributes: {
          'Title': {
            DataType: 'String', /* required */
            StringValue: 'Hello'
          }
        }
      }
      return sqsAPI.sendToOperatorSQS(params)
    })
    .then((data) => {
      const response = {
        statusCode: 200,
        body: JSON.stringify({
          message: 'Go Serverless v1.0! Your function (pushToOperators) executed successfully!',
          input: event,
        }),
      };
      callback(null, response);
    })
    .catch((err) => {
      const response = {
        statusCode: 500,
        body: JSON.stringify({
          message: 'Go Serverless v1.0! Your function (pushToOperators) executed successfully!',
          input: event,
        }),
      };
      callback(null, response);
    })

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
}
