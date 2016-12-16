/**
 * Created by tranthanhtrung on 11/17/2016.
 */
var async = require('async');
var http = require('http');
var fs = require('fs');
async.series({
        requestOne: function (callback) {
            fetchURL(process.argv[2],callback);

        },
        requestTwo: function requestTwo(callback) {
            fetchURL(process.argv[3],callback);
        }
    }
    , function (error, results) {
        if(error) return console.error(error);
        console.log(results);
    });
function fetchURL(url,callback){
    var body = '';
    http.get(url, function (res) {
        res.on('data', function (chunk) {
            body += chunk;
        });
        res.on('end', function () {
            callback(null, body);
        })
    }).on('error', function (error) {
        callback(error);
    })
}