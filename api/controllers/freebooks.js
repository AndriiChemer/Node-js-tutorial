const request = require('request');
const http = require('http');
const fs = require('fs');

exports.get_one_feed = (req, res, next) => {

    const url = req.body.url;
    console.log(url);

    request(url, function(error, response, body) {
        if(!error && response.statusCode == 200) {
            // console.log('body = ' + body);

            return res.status(200).json({
                statusCode: 200,
                body: body
            });
        } else {
            console.log('error = ' + error);
            console.log('response.statusCode = ' + response.statusCode);

            return res.status(response.statusCode).json({
                statusCode: response.statusCode,
                error: error
            });
        }
    })
}

exports.downloadFile = (req, res, next) => {
    const url = req.body.url;

    request(url).pipe(res);  
}

exports.test = (req, res, next) => {
    res.send("Welcome to NodeJS App on Heroku!");
}
