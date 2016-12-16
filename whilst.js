/**
 * Created by tranthanhtrung on 11/21/2016.
 */
var http = require('http');
var async = require('async');
var count = 0;
var body = '';
var c = 0;
async.whilst(function () {
    return !/meerkat/.test(body);
}, function (callback) {
    var resBody = '';
    http.get(process.argv[2],function (res) {
        res.on('data',function (chunk) {
            resBody +=chunk;
        })
        res.on('end',function () {
            ++count;
            body = resBody;
            console.log(body);
        });
        callback(null,count);
    }).on('error',function (err) {
        if(err) console.log(err);
    });
}, function (err, n) {
    if (err) console.log(err);
    console.log(n);
})

