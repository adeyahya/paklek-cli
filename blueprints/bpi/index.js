const R = require('ramda');
const currencyFormatter = require('currency-formatter');
const ora = require("ora");
const request = require("superagent");
const axios = require('axios');
const Table = require("cli-table");
const config = require('./config');

const bpi = async (command, callback) => {
  let endpoint = config.defaultEndpoint;
  switch (command) {
    case "monthly":
      endpoint = config.monthlyEndpoint;
      break;
  }
  const spinner = ora('Fetching data').start();
  try {
    const res = await axios.get(endpoint);
    spinner.succeed();
    let table = new Table();
    const {bpi} = res.data;
    if (command === "latest") {
      const bpiArray = R.values(bpi);
      table = new Table({
        head: ["CURRENCY", "VALUE", "DESCRIPTION"]
      });
      bpiArray.forEach(obj => {
        table.push([
          obj.code,
          currencyFormatter.format(obj.rate_float, {code: obj.code}),
          obj.description
        ]);
      });
    } else if (program.bpi === "monthly") {
      table = new Table({
        head: ["DATE", "VALUE"]
      });
      R.keys(bpi).forEach(item => {
        table.push([
          item, currencyFormatter.format(bpi[item], {code: "IDR"})
        ])
      })
    }
    console.log(table.toString());
    if (callback) return callback();
    process.exit();
  } catch (err) {
    throw new Error(err);
    process.exit();
  }
}

module.exports = bpi;
