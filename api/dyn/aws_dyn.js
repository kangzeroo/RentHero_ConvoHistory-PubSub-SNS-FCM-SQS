const AWS = require('aws-sdk')
const path = require('path')
const pathToAWSConfig = path.join(__dirname, '../..', 'creds', process.env.NODE_ENV, 'aws_config.json')
const aws_config = require(pathToAWSConfig)
AWS.config.update(aws_config)
const parse = AWS.DynamoDB.Converter.output

module.exports.convertDYNSyntax = function(item) {
  return parse({ "M": item })
}
