/**
 * Created by tranthanhtrung on 11/18/2016.
 */
var async = require('async');
var http = require('http');
async.map(process.argv.slice(2),function (url,callback) {
    http.get(url,function (response) {
        var body = '';
        response.on('data',function (chunk) {
            body +=chunk;
        })
        response.on('end',function () {
            callback(null,body);
        })
    }).on('error',function (error) {
        callback(error)
    })
},function (error,body) {
    if(error) console.log(error);
    console.log(body);
});