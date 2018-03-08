var express = require('express');
var router = express.Router();
var request = require('request');

var auth = 'Basic ' + process.env.ZENDESK_KEY;
const options = {
    url: 'https://chartbeat.zendesk.com/api/v2/satisfaction_ratings.json?score=good&start_time=1514764800',
    method: 'GET',
    headers: {
        "Authorization": auth
    }
};

/* GET good API. */
router.get('/good-sat', function(req, res, next) {
  request(options, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                // var json = JSON.parse(body);
                res.json(JSON.parse(body));
            } else {
                console.log("There was an error: ") + response.statusCode;
                console.log(body);
            }
        });
});


module.exports = router;
