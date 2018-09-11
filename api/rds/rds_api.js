const axios = require('axios')
const RDS_MS = require(`../../creds/${process.env.NODE_ENV}/API_URLS`).RDS_MS

module.exports.sendNotifications = function(notification, clientTokenIds) {
  /**/
  const header = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  const p = new Promise((res, rej) => {
    axios.post(`${RDS_MS}/operators_for_push_notification`, {}, header)
      .then((data) => {
        console.log('Successful POST/operators_for_push_notification')
        console.log(data.data)
        res(data.data)
      })
      .catch((err) => {
        console.log('Error POST/operators_for_push_notification')
        console.log(err)
        rej(err)
      })
  })
  return p
}

module.exports.grab_firebase_tokens_by_proxy_id = function(proxy_id) {
  /**/
  const header = {
    headers: {
      Authorization: `Bearer xxxx`
    }
  }
  const p = new Promise((res, rej) => {
    axios.post(`${RDS_MS}/grab_firebase_tokens_by_proxy_id`, { proxy_id, }, header)
      .then((data) => {
        console.log('Successful POST/grab_firebase_tokens_by_proxy_id')
        console.log(data.data)
        res(data.data)
      })
      .catch((err) => {
        console.log('Error POST/grab_firebase_tokens_by_proxy_id')
        console.log(err)
        rej(err)
      })
  })
  return p
}
