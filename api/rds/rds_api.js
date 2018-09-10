const axios = require('axios')
const DATABASE_CONNECTION = require(`../../creds/${process.env.NODE_ENV}/API_URLS`).DATABASE_CONNECTION

export.modules.sendNotifications = function(notification, clientTokenIds) {
  /**/
  const header = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  const p = new Promise((res, rej) => {
    axios.post(`${DATABASE_CONNECTION}/operators_for_push_notification`, {}, header)
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
