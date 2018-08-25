const sqsAPI = require('../api/sqs/sqs_api')

// $ NODE_ENV=development OPERATOR_SQS_URL="https://sqs.us-east-1.amazonaws.com/637888834967/Message_Notifications_For_Agents.fifo" node tests/test_sqs.js

// const testSQSSend = () => {
//   const params = {
//     MessageBody: "Information about current NY Times fiction bestseller for week of 12/11/2016.",
//     QueueUrl: process.env.OPERATOR_SQS_URL,
//     MessageGroupId: '111',
//     DelaySeconds: 0,
//     MessageAttributes: {
//       'Title': {
//         DataType: 'String', /* required */
//         StringValue: 'Hello'
//       }
//     }
//   }
//   // console.log(params)
//   sqsAPI.sendToOperatorSQS(params)
//     .then((data) => {
//       console.log('SUCCESS')
//     })
//     .catch((err) => {
//       console.log(Object.getOwnPropertyNames(err))
//       console.log(err.message)
//       console.log('FAILURE')
//     })
// }
// testSQSSend()



const testSQSRetrieve = () => {
  const params = {
    QueueUrl: process.env.OPERATOR_SQS_URL
  }
  sqsAPI.grabFromOperatorSQS(params)
    .then((data) => {
      console.log('SUCCESS')
    })
    .catch((err) => {
      console.log(Object.getOwnPropertyNames(err))
      console.log(err.message)
      console.log('FAILURE')
    })
}
testSQSRetrieve()
