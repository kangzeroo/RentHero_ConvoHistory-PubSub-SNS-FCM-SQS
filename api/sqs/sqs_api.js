const AWS = require('aws-sdk')
const path = require('path')
const pathToAWSConfig = path.join(__dirname, '../..', 'creds', process.env.NODE_ENV, 'aws_config.json')
const aws_config = require(pathToAWSConfig)
AWS.config.update(aws_config)
const sqs = new AWS.SQS({apiVersion: '2012-11-05'})

module.exports.sendToOperatorSQS = function(params) {
  const p = new Promise((res, rej) => {
    console.log(params)
    sqs.sendMessage(params, function(err, data) {
      if (err) {
        // console.log("Error", err)
        rej(err)
      } else {
        console.log("Success", data.MessageId)
        res(data.MessageId)
      }
    })
  })
  return p
}

module.exports.grabFromOperatorSQS = function(params) {
  const p = new Promise((res, rej) => {
    console.log(params)
    sqs.receiveMessage(params, function(err, data) {
      if (err) {
        // console.log("Error", err)
        rej(err)
      } else {
        console.log("Success", data)
        res(data)
      }
    })
  })
  return p
}
