/* eslint-disable camelcase */
const moment = require('moment');
const stringSimilarity = require('string-similarity');

module.exports = {

  name: 'SRP',

  matcher: (keyValues, rawText) => {
    const tests = [
      (rawText.find((line) => line === 'PO BOX 80062')), // SRP PO Box
      (rawText.find((line) => line === '602-236-8888')), // Support phone number
      (rawText.find((line) => line === 'SurePay Date')),
      (rawText.find((line) => line === 'M-Power Balance')),
      (rawText.find((line) => line === 'srpnet.com')),
      (rawText.find((line) => line.startsWith('Account# '))),
    ];

    const results = tests.filter((t) => t !== undefined);

    // If PO Box and SRP Support phone number are both found, this is an SRP bill
    if (results[0] !== undefined && results[1] !== undefined) {
      return true;
    }

    return results.length >= 3;
  },

  normalizer: {
    date: (string) => {
      const formattable = [
        moment(string, 'MMM D, YYYY'),
        moment(string, 'MMM D, YY'),
      ].filter((mt) => mt.isValid());

      return formattable.length ? formattable[0].format('MM-DD-YYYY') : string;
    },
  },

  extractor: (keyValues, rawText) => {
    const keys = Object.keys(keyValues);
    const serviceFromLineIndex = rawText.findIndex((line) => line.match(/^SERVICE FROM (.*)$/g));
    let fullNameLine;
    let first_name;
    let last_name;

    if (serviceFromLineIndex >= 0) {
      fullNameLine = rawText[serviceFromLineIndex + 1];
      if (!fullNameLine.match(/^YOUR ACCOUNT SUMMARY(.*)$/g)) {
        // first name & last name (dropping anything between first and last words)
        first_name = fullNameLine.split(' ').slice(0, -1).join(' ');
        last_name = fullNameLine.split(' ').slice(-1).join(' ');
      }
    }

    let last10Lines = rawText.slice(-10);
    if (last10Lines.filter((line) => line === 'PRESCOTT AZ 86304-8062').length === 1) {
      // remove SRP address
      last10Lines = last10Lines.filter((line) => (
        line !== 'PO BOX 80062'
        && line !== 'PRESCOTT AZ 86304-8062'
      ));
    }

    // street address line 1 & 2
    let street_address_line_1;
    let street_address_line_2;

    // city, state, zip code
    let cityStateZipCodeLine = [];
    // city, state, zip code
    const lineWithCityStateZipCodeIndex = last10Lines.findIndex((line) => line.match(/^([A-Za-z\s]+) ([A-Z]{2}) ((\d\d\d\d\d-\d\d\d\d)|(\d\d\d\d\d))$/g));

    if (lineWithCityStateZipCodeIndex && lineWithCityStateZipCodeIndex !== -1) {
      if (!first_name || !last_name
        || !first_name.length || !last_name.length
        || first_name.match(/\d+/g) || last_name.match(/\d+/g)) {
        fullNameLine = last10Lines[lineWithCityStateZipCodeIndex - 2];
        first_name = fullNameLine.split(' ').slice(0, -1).join(' ');
        last_name = fullNameLine.split(' ').slice(-1).join(' ');
      }

      street_address_line_1 = last10Lines[lineWithCityStateZipCodeIndex - 1];
      street_address_line_2 = '';
      cityStateZipCodeLine = last10Lines[lineWithCityStateZipCodeIndex].split(' ');
    }

    const [city, state, zip_code] = cityStateZipCodeLine;

    // bill amount
    let bill_amount = keyValues['PLEASE PAY'];
    if (!bill_amount || !bill_amount.length) {
      bill_amount = keyValues['This Month\'s Charges'];
    }

    // bill date
    let bill_date = keyValues[keys[stringSimilarity.findBestMatch(
      'Please Pay by',
      keys,
    ).bestMatchIndex]];

    if (!bill_date || !bill_date.length || !bill_date.match(/^\w+ \d+, \d+$/g)) {
      bill_date = rawText.slice(-20).find((line) => line.match(/^\w+ \d+, \d+$/g));
    }

    // account number
    let account_number;
    const accountNumberLine = rawText.find((line) => line.match(/^(Account#|Account) (\d\d\d-\d\d\d-\d\d\d)$/g));
    if (accountNumberLine !== undefined && accountNumberLine !== -1) {
      // eslint-disable-next-line prefer-destructuring
      account_number = accountNumberLine.split(' ').slice(-1)[0];
    }

    return {
      type: module.exports.name,
      first_name,
      last_name,
      street_address_line_1,
      street_address_line_2,
      city,
      state,
      zip_code,
      bill_amount,
      bill_date,
      account_number,
    };
  },

};
