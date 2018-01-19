const R = require('ramda');
const request = require('superagent');
const config = require('./config');
const ora = require("ora");
const Table = require("cli-table");
let table = new Table();

const getYoutubeVideoId = url => {
  const rules = /(youtu\.be\/|youtube\.com\/(watch\?(.*&)?v=|(embed|v)\/))([^\?&"'>]+)/;
  return R.pathOr(null, [5], url.match(rules));
}

const spinner = ora('Ngumpulno kabeh komen sek yo!').start();
const ytcRandomizer = async (command, callback, pageToken = null, result = []) => {
  try {
    const videoId = getYoutubeVideoId(command)
    if (!videoId) {
      console.log("error parsing url");
      process.exit();
    }
    let pageTokenString = pageToken ? pageToken : '';
    const response = await request.get(`${config.endpoint}${videoId}/comments/${pageTokenString}`);
    const data = await JSON.parse(response.text);
    result = [
      ...result,
      ...data.items,
    ]
    if (data.nextPageToken) {
      return ytcRandomizer(command, callback, data.nextPageToken, result);
    }
    const dataToRandomize = result.map(item => item.snippet.topLevelComment.snippet);
    spinner.info(`Ketemu ${dataToRandomize.length} komen iki bos!`)
    spinner.start();
    let i = 0;
    const log = (i = 0) => {
      if (i < dataToRandomize.length) {
        setTimeout(() => {
          spinner.color = 'cyan';
          spinner.text = `Sik ngelotre bos: ` + dataToRandomize[i].authorDisplayName;
          log(i + 1)
        }, 10)
      } else {
        spinner.succeed('Ketemu Malinge!');
        const randomNumber = Math.floor(Math.random() * dataToRandomize.length) + 1;
        table.push(
          {"jenenge": dataToRandomize[randomNumber].authorDisplayName},
          {"channele'e": dataToRandomize[randomNumber].authorChannelUrl},
          {"komen'e": dataToRandomize[randomNumber].textOriginal},
        );
        console.log(table.toString());
        process.exit();
      }
    }
    log();
  } catch (err) {
    console.log(err)
  }
}

module.exports = ytcRandomizer;
