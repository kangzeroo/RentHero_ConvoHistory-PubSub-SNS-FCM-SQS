const sqsAPI = require('../api/sqs/sqs_api')

module.exports = function(event, context, callback) {
  console.log('------ pushToOperators() ------')
  console.log('------ LAMBDA EVENT OBJECT ------')
  console.log(event)
  console.log(event.Records[0].Sns)
  console.log(JSON.parse(event.Records[0].Sns.Message))
  console.log('------ LAMBDA CONTEXT OBJECT ------')
  console.log(context)

  const params = {
    QueueUrl: process.env.OPERATOR_SQS_URL
  }
  sqsAPI.grabFromOperatorSQS(params)
    .then((data) => {
      console.log(data)
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
      console.log(err)
      const response = {
        statusCode: 500,
        body: JSON.stringify({
          message: 'Failure',
          input: event,
        }),
      };
      callback(null, response);
    })
  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
}
