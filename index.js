#!/usr/bin/env node
const path = require("path");
const program = require("commander");
const inquirer = require("inquirer");

// blueprints
const upload = require('./blueprints/upload');
const bpi = require('./blueprints/bpi');

program
  .version("0.0.1")
  .option("--bpi <bpi>", "latest Bitcoin Price Index")
  .option("-u --upload <file>", "Upload file into file.io")
  .parse(process.argv);

// immediately exit when no args provided
if (process.argv.length === 2) process.exit();
if (program.upload) upload(program.upload);
if (program.bpi) bpi(program.bpi)
