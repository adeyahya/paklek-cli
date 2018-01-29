#!/usr/bin/env node
const path = require("path");
const program = require("commander");
const inquirer = require("inquirer");

// blueprints
const upload = require('./blueprints/upload');
const bpi = require('./blueprints/bpi');
const wallpaperUpdater = require('./blueprints/wallpaperUpdater');
const ytcr = require('./blueprints/ytcRandomizer');
const {encryptor, decryptor} = require('./blueprints/encryptor');

program
  .version("0.0.1")
  .option("--bpi [options]", "Check bitcoin price index latest|monthly default: latest")
  .option("-u --upload <filename>", "Upload file into file.io")
  .option("--ytcr <youtube-video-url>", "Youtube Comment Randomizer")
  .option("-e --encrypt <filename>", "Encrypt file")
  .option("-d --decrypt <filename>", "Decrypt file")
  .parse(process.argv);

// immediately exit when no args provided
if (process.argv.length === 2) process.exit();
if (program.upload) upload(program.upload);
if (program.bpi) bpi(program.bpi);
if (program.ytcr) ytcr(program.ytcr);
if (program.encrypt) encryptor(program.encrypt);
if (program.decrypt) decryptor(program.decrypt);
