/**
 * Created by tranthanhtrung on 11/17/2016.
 */
var http = require('http')
    , async = require('async');

async.each(process.argv.slice(2), function (url, callback) {
        http.get(url, function (respone) {
            body = ''
            respone.on('data', function (chunk) {
                body += chunk;
            })
            respone.on('end', function () {
                callback(null)
            })
        }).on('error', function (error) {
            if (error) {
               callback(error)
            }
        });
    }
    , function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log('Done');
        }
    });
