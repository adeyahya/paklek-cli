const config = require('./config');
const ora = require("ora");
const wallpaper = require('wallpaper');
const https = require('https');
const os = require('os');
const fs = require('fs');
const path = require('path');
const request = require('superagent');

const wallpaperUpdater = async (command, callback) => {
  try {
    const folderName = os.homedir();
    const spinner = ora('Fetching data').start();
    const response = await request.get(config.endpoint);
    const images = await JSON.parse(response.text);
    const randomNumber = Math.floor(Math.random() * (images.length - 0 + 1)) + 0;
    const image = images[randomNumber];
    spinner.color = 'red';
    spinner.text = `Downloading image from ${image.urls.full}`;
    const file = fs.createWriteStream(path.join(folderName, 'wallpaper.jpg'));
    https.get(image.urls.full, (response) => {
      response.pipe(file);
    })

    file.on('close', () => {
      spinner.color = 'yellow';
      spinner.text = 'Changing wallpaper';
      wallpaper.set(path.join(folderName, 'wallpaper.jpg'), {scale: 'fill'}).then(() => {
        console.log('\n');
        process.exit();
      });
    })
  } catch (err) {
    throw new Error(err);
    console.log('\n');
    process.exit();
  }
}

module.exports = wallpaperUpdater;
