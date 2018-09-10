const axios = require('axios')
const google = require('googleapis')
const authHeaders = require('../authHeaders').authHeaders
const PROJECT_ID = require(`../../creds/${process.env.NODE_ENV}/firebase_creds.json`).project_id

module.exports.sendNotifications = function(notification, clientTokenIds) {
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
    getAccessToken().then((access_token) => {
      const header = authHeaders(access_token)
      const x = clientTokenIds.map((cid) => {
        const msg = {
          "message":{
            "token" : cid,
            "notification": notification
           }
        }
        return axios.post(`https://fcm.googleapis.com/v1/projects/${PROJECT_ID}/messages:send`, msg, header) // { httpsAgent: agent })
      })
      return Promise.all(x)
    })
    .then((data) => {
      // once we have the response, only then do we dispatch an action to Redux
      console.log(data)
      res(data)
    })
    .catch((err) => {
      rej(err)
    })
  })
  return p
}

const getAccessToken = () => {
  const p = new Promise((res, rej) => {
    const key = require(`../../creds/${process.env.NODE_ENV}/firebase_creds.json`)
    const jwtClient = new google.auth.JWT(
      key.client_email,
      null,
      key.private_key,
      ['https://www.googleapis.com/auth/firebase.messaging'],
      null
    )
    jwtClient.authorize(function(err, tokens) {
      if (err) {
        rej(err)
        return
      }
      res(tokens.access_token)
    })
  })
  return p
}
