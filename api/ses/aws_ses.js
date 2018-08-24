const axios = require('axios')
const mailcomposer = require('mailcomposer')
const path = require('path')
const SES_ERROR_REPORT = require(`../../creds/${process.env.NODE_ENV}/ses_error_reporting`).ses_error
const pathToAWSConfig = path.join(__dirname, '../..', 'creds', process.env.NODE_ENV, 'aws_config.json')
const aws_config = require(pathToAWSConfig)
const AWS = require('aws-sdk')
AWS.config.update(aws_config)


module.exports.sendErrorReportEmail = function(err, context) {
  console.log(`------ SENDING OUT ERROR REPORT EMAIL ------`)
  const p = new Promise((res, rej) => {
    const ses = new AWS.SES()
    const mail = mailcomposer({
      from: `no-reply${process.env.PROXY_EMAIL}`,
      replyTo: `no-reply${process.env.PROXY_EMAIL}`,
      to: SES_ERROR_REPORT.email,
      subject: `Error in DYN:CONVO_HISTORY Pub/Sub - See Cloudwatch RequestID: ${context.awsRequestId} and LogStreamName: ${context.logStreamName}`,
      text: JSON.stringify(err)
    })
    mail.build((err, message) => {
      if (err) {
        rej({ message: `Error creating raw email with mailcomposer: ${err}`, err: err })
        return
      }
      const params = { RawMessage: { Data: message }}
      console.log('params: ', params)
      ses.sendRawEmail(params, function(err, data) {
        if (err) {
          rej({ message: `Error sending raw email with SES: ${err}`, err: err })
        }
        console.log(`------ SES SUCCESSFULLY SENT ERROR REPORT EMAIL ------`)
        console.log(data)
        res(data)
      })
    })
  })
  return p
}
