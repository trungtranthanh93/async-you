/**
 * Created by tranthanhtrung on 11/21/2016.
 */
var async = require('async');
var http = require('http');
var hostname = process.argv[2];
var port = process.argv[3];
async.series({
    post:function (done) {
        async.times(5, function(n, next) {
            createUser(++n, function(err, user) {
                next(err, user);
            });
        }, function(err) {
            if(err) console.log(err);
            done(null, 'saved!');
        });
    },
    get:function (done) {
        var url = 'http://'+ hostname + ":" + port + "/users";
        var body = '';
        http.get(url,function (res) {
            res.on('data',function (chunk) {
                body +=chunk;
            });
            res.on('end',function () {
                done(null,body);
            })
        }).on('error',function (err) {
            if(err) console.log(err);
        })

    }
},function (err,result) {
    if(err) console.log(err);
    console.log(result.get);
});
function createUser(id,done) {
    var op = {
        port:port,
        hostname: hostname,
        path : '/users/create',
        method : 'POST'
    };
    var body = JSON.stringify({user_id:id});
    var req = http.request(op,function (res) {
        res.on('data',function () {

        });
        res.on('end',function () {
            done(null);
        })
    });
    req.on('error',function (err) {
        done(err);
    })
    req.write(body);
    req.end();
}