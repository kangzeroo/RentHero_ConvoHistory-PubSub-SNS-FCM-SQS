const fcnAPI = require('../api/fcn/fcn_api')

// NODE_ENV='development' node tests/test_fcm.js

const client_tokens = [
  'cOMjFAEpPvI:APA91bFxRKyW2-C0T8ovXZrkaOlMD60-wzp_q1OpsNrmHfohJx-VpO38ScB1W_f2b4_XB7SzIIPlUp_IoREOJ8JJxA6ZGPppnxGWvBKyb46GjFLd_HY2nX4pKqtxMWz38oH9cYvj7peV'
]
const notification = {
  "title" : "New Message",
  "body" : {
    "HANDLED": false,
    "MEDIUM": "SMS",
    "MESSAGE": "Hello Kenny, this is Junell again from Zolo Realty. Do you still need assistance with your rental search?\n",
    "META": "{\"proxy\":{\"proxy_id\":24,\"proxy_email\":\"ronykrentals@flexximail.org\",\"proxy_phone\":\"+16475593821\"},\"lead\":{\"lead_id\":\"2c63a436-f83e-4c3e-8a0b-0afd215d4267\",\"first_name\":\"Kenny\",\"last_name\":\"Cheng\",\"email\":\"kwanjai01@hotmail.com\",\"channel_email\":null,\"thumbnail\":null,\"phone\":\"+16472293388\"},\"body\":\"Hello Kenny, this is Junell again from Zolo Realty. Do you still need assistance with your rental search?\\n\",\"operator\":{\"operator_id\":\"us-east-1:5ffc6581-61a0-4176-8a79-47d5e4a5d57d\",\"first_name\":\"Junell\",\"last_name\":\"Pongase\",\"email\":\"junell.thebest1@gmail.com\",\"phone\":null,\"updated_at\":\"2018-09-20T17:24:55.189Z\",\"created_at\":\"2018-09-19T16:30:10.120Z\",\"intelligence_groups\":[\"3ad4e7e9-7e55-4c87-baf4-bff22a34ac0e\"]}}",
    "PROXY_CONTACT": "+16475593821",
    "PROXY_ID": "24",
    "RECEIVER_CONTACT": "+16472293388",
    "RECEIVER_ID": "2c63a436-f83e-4c3e-8a0b-0afd215d4267",
    "RECEIVER_TYPE": "LEAD_ID",
    "SEEN": "1969-12-31T19:00:00-05:00",
    "SENDER_CONTACT": "Junell Pongase",
    "SENDER_ID": "us-east-1:5ffc6581-61a0-4176-8a79-47d5e4a5d57d",
    "SENDER_TYPE": "OPERATOR_ID",
    "SES_MESSAGE_ID": "SM133d5ea7546d455c84092e5943e9074d",
    "TIMESTAMP": "2018-09-20T18:14:19+00:00"
  }
}
console.log(notification)
fcnAPI.sendNotifications(notification, client_tokens)
  .then((data) => {
    console.log(data)
  })
  .catch((err) => {
    console.log(err)
  })
