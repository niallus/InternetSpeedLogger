'use strict!'

function LogSpeed() {
    console.log(" =====----- Kicking Off -----===== ")
    const speedTest = require('speedtest-net');
    const test = speedTest({maxTime: 5000});
    const fs = require('fs');
    let dt = new Date();

    let pad = (n, width, z) => {
        z = z || '0';
        n = n + '';
        return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
    }

    test.on('data', data => {
        let dt = new Date();
        let res = `${dt.getFullYear()}/${pad(dt.getMonth(),2)}/${pad(dt.getDate(),2)} ${pad(dt.getHours(),2)}:${pad(dt.getMinutes(),2)}, ${data.speeds.download}, ${data.speeds.upload}`;
        console.dir(res);
        fs.appendFile(
            './speeds.txt',
            res + '\n', 
            (err) => {}
        );
    });

    test.on('error', err => {
        console.error(err);
    });
}
var schedule = require('node-schedule');

var j = schedule.scheduleJob('0 0 * * * *', function(){
    LogSpeed();
});

// https://github.com/node-schedule/node-schedule