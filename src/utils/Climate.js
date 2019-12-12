const request = require('request');

const cli = (cords, cb) => {
    let url =
        'https://api.darksky.net/forecast/ed85e5d67899130203d150fc38399088/' +
        cords[0] +
        ',' +
        cords[1];

    request({ url, json: true }, (error, response) => {
        if (error) {
            return cb(error, undefined);
        }
        // cb(undefined,response.body.timezone);
        cb(
            undefined,
            'Temperature : ' +
                response.body.currently.temperature +
                '°F Chances of raining: ' +
                response.body.currently.precipProbability +
                '%'
        );
    });
};

// cli([ 31.68, 76.52 ],(err,res)=>{
//     if(err) console.log(err)
//     else console.log(res)
// })
module.exports = cli;
