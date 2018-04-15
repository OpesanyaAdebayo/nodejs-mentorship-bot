var express = require('express');
var router = express.Router();
const request = require('request');
const {
  WebClient
} = require('@slack/client');


const token = process.env.BOT_TOKEN;
const web = new WebClient(token);

/* GET users listing. */
router.post('/', function (req, res, next) {
  let q = req.body;

  if (q.type === 'url_verification') {
    res.send(q.challenge);
  }

  if (q.token !== process.env.SLACK_VERIFICATION_TOKEN) {
    res.sendStatus(400);
    return;
  }

  if (q.event.type === 'member_joined_channel') {
      let channel = q.event.channel;
      let user = q.event.user;
      console.log("hi");
      res.json({text: "hello!"});
      web.chat.postEphemeral({
          channel: channel,
          text: `Welcome <@${user}> :party:\nIt's great to have you here.\nPlease update your status to indicate if you applied as a mentor or mentee.\nThank you!`,
          user: user
        });
  }

  });

module.exports = router;