const AWS = require('aws-sdk')
const path = require('path')
const pathToAWSConfig = path.join(__dirname, '../..', 'creds', process.env.NODE_ENV, 'aws_config.json')
const aws_config = require(pathToAWSConfig)
AWS.config.update(aws_config)
const sns = new AWS.SNS()

module.exports.publishSNSTopic = function(params) {
  const p = new Promise((res, rej) => {
    sns.publish(params, function(err, data) {
      if (err) {
        // an error occurred
        console.log(`---------------- SNS ERROR OCCURRED ----------------`)
        console.log(err, err.stack)
        rej(err)
      } else {
        // successful response
        console.log(`---------------- SUCCESSFUL SNS PUBLISH ----------------`)
        console.log(data)
        res(data)
      }
    })
  })
  return p
}
