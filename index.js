const express = require('express');
const path = require('path');
const request = require('request');

const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));


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
if (onedayAgo <10 && onedayAgo === '00')
  {
    var yesterdayMM = mm - 1;
    if (mm === '04' || mm === '06' || mm === '09' || mm === '11'){
      onedayAgo='30'
    }
    else if (mm === '02'){
      onedayAgo='31'
    } else {
      onedayAgo='30'
    }
    if(yesterdayMM<10){yesterdayMM='0'+yesterdayMM}
    var dayAgo = yyyy + '-' + yesterdayMM + "-" + onedayAgo + "T" + hh + ":00:00";
  } else {
    var dayAgo = yyyy + '-' + mm + "-" + onedayAgo + "T" + hh + ":00:00";
  }
  
var todayDate = yyyy+'-'+mm+'-'+dd; //gets today's date

var rightNow = yyyy + '-' + mm + "-" + dd + "T" + hh + ":" + min + ":00" //gets time right now

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


var priorday = new Date();
priorday.setDate(now.getDate()-60);
var dd3 = priorday.getDate();
var mm3 = priorday.getMonth()+1;
var yyyy3 = priorday.getFullYear();
if(dd3<10){dd3='0'+dd3};
if(mm3<10){mm3='0'+mm3};
var sixtyDaysAgo = yyyy3+'-'+mm3+'-'+dd3;


var thirtyDayUnixCode = new Date(thirtyDaysAgo).getTime() / 1000
var todayDateUnixCode = new Date(todayDate).getTime() / 1000 // gives time for today at midnight
var todayUnixCode = new Date(rightNow).getTime() / 1000 //gives time now
var dayAgoUnixCode = new Date(dayAgo).getTime() / 1000
var sixtyDayUnixCode = new Date(sixtyDaysAgo).getTime() / 1000

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

const commentsOptions = {
  url: 'https://chartbeat.zendesk.com/api/v2/satisfaction_ratings.json?score=good_with_comment&start_time=' + sixtyDayUnixCode,
  method: 'GET',
  headers: {
      "Authorization": auth
  }
};


const commentsTwoOptions = {
  url: 'https://chartbeat.zendesk.com/api/v2/satisfaction_ratings.json?page=2&score=good_with_comment&start_time=' + sixtyDayUnixCode,
  method: 'GET',
  headers: {
      "Authorization": auth
  }
};

/* GET 30 day benchmarks. */
app.get('/benchmarks', function(req, res, next) {
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
app.get('/thirty-days-received', function(req, res, next) {
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
app.get('/thirty-days-solved', function(req, res, next) {
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
app.get('/today-received', function(req, res, next) {
  request(todayReceivedOptions, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                // var json = JSON.parse(body);
                res.json(JSON.parse(body));
            } else {
              console.log(todayReceivedOptions);
                console.log("There was an error: ") + response.statusCode;
                console.log(body);
            }
        });
});

app.get('/today-solved', function(req, res, next) {
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

app.get('/comments', function(req, res, next) {
  request(commentsOptions, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                // var json = JSON.parse(body);
                res.json(JSON.parse(body));
            } else {
                console.log("There was an error: ") + response.statusCode;
                console.log(body);
            }
        });
});

app.get('/comments-page-2', function(req, res, next) {
  request(commentsTwoOptions, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                // var json = JSON.parse(body);
                res.json(JSON.parse(body));
            } else {
                console.log("There was an error: ") + response.statusCode;
                console.log(body);
            }
        });
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});


const port = process.env.PORT || 5000;
app.listen(port);

console.log(`listening on ${port}`);

module.exports = app;
