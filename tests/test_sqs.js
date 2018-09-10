const sqsAPI = require('../api/sqs/sqs_api')

// $ NODE_ENV=development OPERATOR_SQS_URL="https://sqs.us-east-1.amazonaws.com/637888834967/ConvoHistory_Operator_Messages_Dev.fifo" node tests/test_sqs.js

// const testSQSSend = () => {
//   const params = {
//     MessageBody: "On the way to the moon",
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
      console.log(data)
    })
    .catch((err) => {
      console.log(Object.getOwnPropertyNames(err))
      console.log(err.message)
      console.log('FAILURE')
    })
}
testSQSRetrieve()
