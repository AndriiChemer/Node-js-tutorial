const request = require('request');

exports.get_one_feed = (req, res, nexr) => {

    request('https://catalog.feedbooks.com/catalog/index.atom', function(error, response, body) {
        if(!error && response.statusCode == 200) {
            console.log('body = ' + body);

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
