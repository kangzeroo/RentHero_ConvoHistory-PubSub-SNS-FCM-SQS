const fcnAPI = require('../api/fcn/fcn_api')
const sqsAPI = require('../api/sqs/sqs_api')
const rdsAPI = require('../api/rds/rds_api')

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
    "title" : "New Message",
    "body" : JSON.parse(event.Records[0].Sns.Message).data
  }
  let proxy_id = JSON.parse(event.Records[0].Sns.Message).data.PROXY_ID
  if (typeof proxy_id === 'string') {
    proxy_id = parseInt(proxy_id, 10)
  }

  console.log('PROXY_ID: ', proxy_id)

  rdsAPI.grab_firebase_tokens_by_proxy_id(proxy_id)
    .then((data) => {
        const clientTokenIds = data.map(i => i.firebase_client_id)

        return fcnAPI.sendNotifications(notification, clientTokenIds)
    })
    // .then((data) => {
    //   console.log('===fcnAPI.sendNotifications PASSED')
    //   console.log(data)
    //   console.log('notification sent, now..')
    //   const params = {
    //     MessageBody: "Information about current NY Times fiction bestseller for week of 12/11/2016.",
    //     QueueUrl: process.env.OPERATOR_SQS_URL,
    //     MessageGroupId: '1111',
    //     DelaySeconds: 0,
    //     MessageAttributes: {
    //       'Title': {
    //         DataType: 'String', /* required */
    //         StringValue: 'Hello'
    //       }
    //     }
    //   }
    //   return sqsAPI.sendToOperatorSQS(params)
    // })
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
      console.log('ERROR IN MAIN: ', err)
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
