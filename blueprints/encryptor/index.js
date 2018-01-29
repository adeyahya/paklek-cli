// @TODO:
// replace key
// delete original file
const fileEncryptor = require('file-encryptor');
const path = require('path');
const ora = require("ora");
const fs = require("fs");
const key = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi nesciunt asperiores, veritatis molestias facere excepturi? Quas similique quasi culpa earum optio suscipit hic, error, fuga, rem facilis rerum praesentium est!';

const encryptor = (filename, callback) => {
  const spinner = ora('Encrypting file').start();
  const pathFile = path.join(process.cwd(), filename);
  fileEncryptor.encryptFile(pathFile, `${pathFile}.dat`, key, err => {
    if (err) throw err;
    spinner.succeed('Encryption done!');
    if (callback) return callback();
    process.exit();
  })
}

const decryptor = (filename, callback) => {
  const spinner = ora('Decrypting file').start();
  const pathFile = path.join(process.cwd(), filename);
  fileEncryptor.decryptFile(pathFile, pathFile.replace('.dat',''), key, err => {
    if (err) throw err;
    spinner.succeed('Decryption done!');
    if (callback) return callback();
    process.exit();
  })
}

module.exports = {
  encryptor,
  decryptor,
}
