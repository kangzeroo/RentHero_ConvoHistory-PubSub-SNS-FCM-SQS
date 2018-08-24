
module.exports = function(event, context, callback) {
  console.log('------ pushToOperators() ------')
  console.log('------ LAMBDA EVENT OBJECT ------')
  console.log(event)
  console.log(event.Records[0].Sns)
  console.log(JSON.parse(event.Records[0].Sns.Message))
  console.log('------ LAMBDA CONTEXT OBJECT ------')
  console.log(context)

  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your function (pushToOperators) executed successfully!',
      input: event,
    }),
  };

  callback(null, response);

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
}
