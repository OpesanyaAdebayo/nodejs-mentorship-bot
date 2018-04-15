var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  let data = {
    form: {
        client_id: process.env.SLACK_CLIENT_ID,
        client_secret: process.env.SLACK_CLIENT_SECRET,
        code: req.query.code
    }
};
request.post('https://slack.com/api/oauth.access', data, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        if (JSON.parse(body).error == 'missing scope') {
            res.send('Watson Bot has been added to your team!');
        }
        let token = JSON.parse(body).access_token;

        request.post('https://slack.com/api/team.info', {
            form: {
                token: token
            }
        }, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                if (JSON.parse(body).error == 'missing_scope') {
                    res.send('Watson Bot has been added to your team!');
                } else {
                    let team = JSON.parse(body).team.domain;
                    res.redirect('http://' + team + '.slack.com');
                }
            }
        });
    }
});

});

module.exports = router;
