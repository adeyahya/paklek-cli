const fs = require("fs");
const request = require("superagent");
const path = require("path");
const ProgressBar = require('progress');
const config = require('./config');

const upload = (filename, callback) => {
  const pathFile = path.join(process.cwd(), filename);
  let bar = new ProgressBar('Uploading to https://file.io [:bar] :rate/bps :percent :etas', {
    complete: '=',
    incomplete: ' ',
    width: 60,
    total: 100,
  });
  const req = request.post(config.endpoint)
    .attach("file", fs.createReadStream(pathFile))
    .on('progress', function (chunk) {
      bar.tick(chunk.percent);
    }).on('response', res => {
      bar.tick(100);
      console.log('\n');
      console.log(JSON.parse(res.text).link);
    }).end((res) => {
      if (callback) return callback(res);
      process.exit();
    });
}


module.exports = upload;
