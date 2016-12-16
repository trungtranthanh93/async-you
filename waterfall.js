/**
 * Created by tranthanhtrung on 11/17/2016.
 */
var http = require('http')
    , async = require('async')
    ,fs = require('fs');

async.waterfall([
    function(cb){
        fs.readFile(process.argv[2],function (error,data) {
            if(error){
                console.error(error.message);
            }
            cb(null,data);
        })
    },
    function(port, cb){

        //var port = JSON.parse(body).port;
       //cb(port);
        var body = '';
        http.get(port, function(res){
            res.setEncoding('utf8');
            res.on('data', function(chunk){
                body += chunk.toString();
            });
            res.on('end', function(){
                cb(null, body);
            });
        }).on('error', function(err) {
            cb(err);
        });
    }
], function(err, result){
    if (err) return console.error(err);
    console.log(result);
});

