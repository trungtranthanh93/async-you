/**
 * Created by tranthanhtrung on 11/18/2016.
 */
var async = require('async');
var http = require('http');
var hostname = process.argv[2];
var port = process.argv[3];
var url = 'http://' + hostname + ':' + port;
async.series({
    post: function (done) {
        async.times(5, function (n, next) {
            createUser(++n, function (err) {
                next(err);
            })
        }, function next(error) {
            if (error) {
                return done(error);
            }
            done(null, 'saved!')
        })
    },
    get: function (done) {
        var path = url + '/users';
        http.get(path, function (res) {
            var body = ''
            res.on('data', function (chunk) {
                body += chunk;
            });
            res.on('end', function () {
                done(null, body);
            })

        }).on('error', done);
    }
}, function done(error, result) {
    if (error) return console.log(error);
    console.log(result.get);
});
function createUser(user_id, next) {
    var postData = JSON.stringify({'user_id': user_id});
    var options = {
        hostname: hostname,
        port: port,
        method: 'POST',
        path: '/users/create',
        headers: {
            'Content-Length': postData.length
        }
    };
    var req = http.request(options, function (res) {
        res.on('data', function (chunk) {
        })
        res.on('end', function () {
            next();
        });
    });
    req.on('error', function (error) {
        next(error);
    });
    req.write(postData);
    req.end();

}