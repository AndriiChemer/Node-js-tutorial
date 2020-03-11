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


exports.download = (req, res, next) => {
    const url = req.body.url;

    res.download(url, (err) => {

        console.log('Error: ' + err);

        res.status(500).json({
            statusCode: 500, 
            message: "File did not download!",
            error: err
        });
    }); 

    console.log('Your file from ' + url + ' has been downloaded!')

    //TODO remove file
};

exports.downloadFile = (req, res, next) => {
    const url = req.body.url;

    request(url).pipe(res);  
}


async function downloadPDF(pdfURL, outputFilename) {
    let pdfBuffer = await request.get({uri: pdfURL, encoding: null});
    console.log("Writing downloaded PDF file to " + outputFilename + "...");
    fs.writeFileSync("./uploads/temp" + outputFilename, pdfBuffer);
}
