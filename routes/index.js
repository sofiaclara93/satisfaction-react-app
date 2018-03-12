var express = require('express');
var router = express.Router();
var request = require('request');

var auth = 'Basic ' + process.env.ZENDESK_KEY;

// sets Today as string
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1;
var yyyy = today.getFullYear();
var hh = today.getUTCHours();
var min = today.getMinutes();
if(dd<10){dd='0'+dd};
if(mm<10){mm='0'+mm};
if(min<10){min='0'+min}
var onedayAgo = dd -1;
if (onedayAgo<10){onedayAgo='0'+onedayAgo}
var todayDate = yyyy+'-'+mm+'-'+dd;
var dayAgo = yyyy + '-' + mm + "-" + onedayAgo + "T" + hh + ":00:00"
var rightNow = yyyy + '-' + mm + "-" + dd + "T" + hh + ":" + min + ":00"

// gets 30 days ago as string
var now = new Date();
var priordate = new Date();
priordate.setDate(now.getDate()-30);
var dd2 = priordate.getDate();
var mm2 = priordate.getMonth()+1;
var yyyy2 = priordate.getFullYear();
if(dd2<10){dd2='0'+dd2};
if(mm2<10){mm2='0'+mm2};
var thirtyDaysAgo = yyyy2+'-'+mm2+'-'+dd2;



var thirtyDayUnixCode = new Date(thirtyDaysAgo).getTime() / 1000
var todayDateUnixCode = new Date(todayDate).getTime() / 1000 // gives time for today at midnight
var todayUnixCode = new Date(rightNow).getTime() / 1000 //gives time now
var dayAgoUnixCode = new Date(dayAgo).getTime() / 1000
console.log(thirtyDayUnixCode);

const benchmarksOptions = {
    url: 'https://chartbeat.zendesk.com/api/v2/satisfaction_ratings.json?per_page=1&include=statistics&score=received&start_time='+ thirtyDayUnixCode,
    method: 'GET',
    headers: {
        "Authorization": auth
    }
};

const thirtydayReceivedOptions = {
    url: 'https://chartbeat.zendesk.com/api/v1/stats/summation/account/0/ticket_stats_by_account/created_count?start=' + thirtyDayUnixCode + '&end=' + todayDateUnixCode + '&interval=86400',
    method: 'GET',
    headers: {
        "Authorization": auth
    }
};

const thirtydaySolvedOptions = {
    url: 'https://chartbeat.zendesk.com/api/v1/stats/summation/account/0/ticket_stats_by_account/solve_count?start=' + thirtyDayUnixCode + '&end=' + todayDateUnixCode + '&interval=86400',
    method: 'GET',
    headers: {
        "Authorization": auth
    }
};

const todayReceivedOptions = {
    url: 'https://chartbeat.zendesk.com/api/v1/stats/summation/account/0/ticket_stats_by_account/created_count?start=' + dayAgoUnixCode + '&end='+ todayUnixCode + '&interval=3600',
    method: 'GET',
    headers: {
        "Authorization": auth
    }
};

const todaySolvedOptions = {
    url: 'https://chartbeat.zendesk.com/api/v1/stats/summation/account/0/ticket_stats_by_account/solve_count?start=' + dayAgoUnixCode + '&end='+ todayUnixCode + '&interval=3600',
    method: 'GET',
    headers: {
        "Authorization": auth
    }
};

/* GET 30 day benchmarks. */
router.get('/benchmarks', function(req, res, next) {
  request(benchmarksOptions, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                // var json = JSON.parse(body);
                res.json(JSON.parse(body));
            } else {
                console.log("There was an error: ") + response.statusCode;
                console.log(body);
            }
        });
});

/* GET 30 day received tickets. */
router.get('/thirty-days-received', function(req, res, next) {
  request(thirtydayReceivedOptions, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                // var json = JSON.parse(body);
                res.json(JSON.parse(body));
            } else {
                console.log("There was an error: ") + response.statusCode;
                console.log(body);
            }
        });
});

/* GET 30 day solved tickets. */
router.get('/thirty-days-solved', function(req, res, next) {
  request(thirtydaySolvedOptions, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                // var json = JSON.parse(body);
                res.json(JSON.parse(body));
            } else {
                console.log("There was an error: ") + response.statusCode;
                console.log(body);
            }
        });
});

/* GET today received tickets. */
router.get('/today-received', function(req, res, next) {
  request(todayReceivedOptions, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                // var json = JSON.parse(body);
                res.json(JSON.parse(body));
            } else {
                console.log("There was an error: ") + response.statusCode;
                console.log(body);
            }
        });
});

router.get('/today-solved', function(req, res, next) {
  request(todaySolvedOptions, function (error, response, body) {
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
