const axios = require('axios')
const { google } = require('googleapis')
const moment = require('moment')
const authHeaders = require('../authHeaders').authHeaders
const RDS_MS = require(`../../creds/${process.env.NODE_ENV}/API_URLS`).RDS_MS
const PROJECT_ID = require(`../../creds/${process.env.NODE_ENV}/firebase_creds.json`).project_id

module.exports.sendNotifications = function(notification, clientTokenIds) {
  // console.log(clientTokenIds)
  /*
      const notification = {
        "body" : "This is an FCM notification message!",
        "title" : "FCM Message",
      }
      const clientTokenIds = [
        '76rfcufojlsaf-sdafasdf8osdf-sdfos8dfsfp',
        'h89saufojlsaf-sdafasdf98osdf-sdfos8dfsf'
      ]
  */
  const p = new Promise((res, rej) => {
    console.log('Sending Notifications...')
    getAccessToken().then((access_token) => {
      console.log('access_token: ', access_token)
      const header = authHeaders(access_token)
      console.log('SEEN: ', notification.body.SEEN)

      // This is to check if the insertion into Dynamo is for new messages (SEEN === UNIX 0) or updated messages
      if (moment(notification.body.SEEN).unix() === 0) {
        const x = clientTokenIds.map((cid) => {
          const msg = {
            "message":{
              "token" : cid,
              "data": {
                title: `${notification.title} from ${notification.body.SENDER_CONTACT}`,
                icon: "https://s3.amazonaws.com/dianhua.renthero.ca/operator_icon.png",
                body: notification.body.MESSAGE,
                json: JSON.stringify(notification.body)
              }
             }
          }
          console.log(header, JSON.stringify(msg))
          return axios.post(`https://fcm.googleapis.com/v1/projects/${PROJECT_ID}/messages:send`, msg, header) // { httpsAgent: agent })
        })
        return Promise.all(x)
      } else {
        console.log('SEEN NOT FOUNd')
        rej('DONT NEED TO SEND NOTIFICATION')
      }
    })
    .then((data) => {
      // once we have the response, only then do we dispatch an action to Redux
      console.log(data)
      res(data)
    })
    .catch((err) => {
      console.log('Error object keys...')
      console.log(Object.keys(err))
      console.log(err.config)
      console.log(Object.keys(err.config))
      console.log(Object.keys(err.config).map(k => console.log(typeof k)))
      console.log(err.request)
      console.log(err.response)

      // const token = JSON.parse(err.config.data).message.token
      // if (token) {
      //   console.log(token)
      //   removeAccessToken(token)
      //     .then((data) => {
      //       console.log(data)
      //       res(data)
      //     })
      //     .catch((err) => {
      //       console.log('ERROR IN removeAccessToken: ', err)
      //       console.log(err.config.response.data.error)
      //       rej(err)
      //     })
      // } else {
      //   console.log('nope no token provided')
        console.log('ERROR IN sendNotifications: ', err)
        console.log(err.response.data.error)
        rej(err)
      // }
    })
  })
  return p
}

const getAccessToken = () => {
  console.log('getting access token')
  const p = new Promise((res, rej) => {
    const key = require(`../../creds/${process.env.NODE_ENV}/firebase_creds.json`)
    console.log(key)
    const jwtClient = new google.auth.JWT(
      key.client_email,
      null,
      key.private_key,
      ['https://www.googleapis.com/auth/firebase.messaging'],
      null
    )
    console.log(jwtClient)
    jwtClient.authorize(function(err, tokens) {
      if (err) {
        console.log(err)
        rej(err)
        return
      }
      console.log('=====ACCESS TOKEN AUTHORIZED')
      console.log('====Tokens: ', tokens)
      res(tokens.access_token)
    })
  })
  return p
}

const removeAccessToken = (client_id) => {
  console.log('Removing access token...')
  const p = new Promise((res, rej) => {
    const header = {}
    // firebase_client_id
    axios.post(`${RDS_MS}/remove_firebase_client_id`, { firebase_client_id: client_id }, header)
      .then((data) => {
        console.log(data)
        res(data)
      })
      .catch((err) => {
        console.log(err)
        rej(err)
      })
  })
  return p
}
