
module.exports = function(event, context, callback) {
  console.log('------ dynConvoHistoryOnUpdate() ------')
  console.log('------ LAMBDA EVENT OBJECT ------')
  console.log(event)
  console.log(event.Body)
  console.log('------ LAMBDA CONTEXT OBJECT ------')
  console.log(context)
  
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your function (dynConvoHistoryOnUpdate) executed successfully!',
      input: event,
    }),
  };

  callback(null, response);

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
}
