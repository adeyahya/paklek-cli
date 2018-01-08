#!/usr/bin/env node
const path = require("path");
const program = require("commander");
const inquirer = require("inquirer");

// blueprints
const upload = require('./blueprints/upload');
const bpi = require('./blueprints/bpi');

program
  .version("0.0.1")
  .option("--bpi [options]", "Check bitcoin price index latest|monthly default: latest")
  .option("-u --upload <filename>", "Upload file into file.io")
  .parse(process.argv);

// immediately exit when no args provided
if (process.argv.length === 2) process.exit();
if (program.upload) upload(program.upload);
if (program.bpi) bpi(program.bpi);
