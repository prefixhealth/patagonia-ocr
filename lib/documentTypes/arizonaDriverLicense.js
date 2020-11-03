/* eslint-disable camelcase */
const moment = require('moment');

function issueAndExpirationDateParser(rawText) {
  let issued_date;
  let expiration_date;

  const expirationDateLine = rawText.find((line) => line.match(/4b EXP (\d\d\/\d\d\/\d\d\d\d)/g));
  const issueDateLine = rawText.find((line) => line.match(/4a ISS (\d\d\/\d\d\/\d\d\d\d)/g));
  const expAndIssLine = rawText.find((line) => line.match(/^4b(.*)$/g) || line.match(/^.+[E,e][X,x][P,p].+[I,i][S,s][S,s].+$/g));

  if (expAndIssLine) {
    const dates = expAndIssLine.match(/^.*(\d\d\/\d\d\/\d\d\d\d).*(\d\d\/\d\d\/\d\d\d\d).*$/);
    if (dates && dates.length > 1) {
      // eslint-disable-next-line prefer-destructuring
      expiration_date = dates[1];
      // eslint-disable-next-line prefer-destructuring
      issued_date = dates[2];
    }
  }

  if (!expiration_date && expirationDateLine) {
    [expiration_date] = expirationDateLine.match(/(\d\d\/\d\d\/\d\d\d\d)/g);
  }

  if (!issued_date && issueDateLine) {
    [issued_date] = issueDateLine.match(/(\d\d\/\d\d\/\d\d\d\d)/g);
  }

  return [issued_date, expiration_date];
}

/**
 * 1 - Last Name
 * 2 - First Name
 */

module.exports = {

  name: 'Arizona\'s Driver License',

  /**
   * TODO: Change the tests so that certain entries have more 'weight' than other entries. For
   * instance, if 'Arizona' and 'Driver License' and 'USA' appear in the document, then we are
   * almost certain this document is an AZDL. We only need those 3 to conclude that. Meanwhile,
   * there are smaller indicators that we may require more than 3 matches:
   *
   * '3 DOB', '4d DLN', '9a END', '12 REST'
   *
   * The reason for that is, during testing, the fields with the numbers appear to have more
   * anomalies ('9 CEASS', '3 boe', etc)
   *
   * @param keyValues results from Textract
   * @param rawText results from Textract
   * @returns {boolean} <code>true</code> if the document appears to be an Arizona Driver License
   * and <code>false</code> otherwise
   */
  matcher: (keyValues, rawText) => {
    const tests = [
      /**
       * TODO: Add some kind of weight to these
       */
      (rawText.find((line) => line.endsWith('rizona'))),
      (rawText.find((line) => line === 'NOT FOR FEDERAL IDENTIFICATION')),
      (rawText.find((line) => line === 'DRIVER LICENSE')),
      (rawText.find((line) => line === 'USA')),

      /**
       * TODO: If IDENTIFICATION and CARD are found, then confident
       * This is different from the AZ Driver License
       * See example 150
       * the result is usually [..., 'IDENTIFICATION', 'USA', 'CARD', ...]
       */
      // (rawText.find((line) => line === 'LIMITED-TERM')),
      // (rawText.find((line) => line === 'IDENTIFICATION')),
      // (rawText.find((line) => line === 'CARD')),

      /**
       * TODO: Add a weight of some sort
       */
      (rawText.find((line) => line.includes('3 DOB'))),
      (rawText.find((line) => line.includes('4d DLN'))),
      (rawText.find((line) => line.includes('4b EXP'))),
      (rawText.find((line) => line.includes('4a ISS'))),
      (rawText.find((line) => line.includes('9a END'))),
      (rawText.find((line) => line.includes('12 REST'))),
      (rawText.find((line) => line.includes('15 SEX'))),
      (rawText.find((line) => line.includes('16 HGT'))),
      (rawText.find((line) => line.includes('17 WGT'))),
      (rawText.find((line) => line.includes('18 EYES'))),
      (rawText.find((line) => line.includes('19 HAIR'))),

      (rawText.find((line) => /\d+ CLASS/g.test(line))),
      (rawText.find((line) => /\d+ DOB \d+\/\d+\/\d+/g.test(line))),
    ];

    const results = tests.filter((t) => t !== undefined);

    return results.length >= 3;
  },

  normalizer: {
    date: (string) => {
      const formattable = [
        moment(string, 'MM/DD/YYYY'),
      ].filter((mt) => mt.isValid());

      return formattable.length ? formattable[0].format('MM-DD-YYYY') : string;
    },
  },

  extractor: (keyValues, rawText) => {
    // first name
    let first_name = rawText.find((line) => line.match(/^2 (.*)$/g));
    if (first_name && first_name.substr(0, 2) === '2 ') {
      first_name = first_name.replace('2 ', '');
    }

    // last name
    let last_name = rawText.find((line) => line.match(/^1 (.*)$/g));
    if (last_name && last_name.substr(0, 2) === '1 ') {
      last_name = last_name.replace('1 ', '');
    }

    // Expiration and issued dates
    const [issued_date, expiration_date] = issueAndExpirationDateParser(rawText);

    // street address line 1 & 2
    let streetAddressLineIndex = rawText.findIndex((line) => line.match(/^8(.*)$/g));
    const lineWithCityStateZipIndex = rawText.findIndex((line) => line.match(/^([A-Za-z\s]+,? )?[A-Z]{2} \d+-?\d+?$/g));
    if (streetAddressLineIndex < 0 && lineWithCityStateZipIndex >= 0) {
      streetAddressLineIndex = lineWithCityStateZipIndex - 1;
    }
    let street_address_line_1 = rawText[streetAddressLineIndex];
    let street_address_line_2 = rawText[streetAddressLineIndex + 1];

    if (street_address_line_1 && street_address_line_1.substr(0, 2) === '8 ') {
      street_address_line_1 = street_address_line_1.replace('8 ', '');
    }
    if (street_address_line_1 === '8') {
      street_address_line_1 = undefined;
    }

    // city, state, zip code
    const lineWithCityStateZip = rawText[lineWithCityStateZipIndex];
    if (!street_address_line_1 && lineWithCityStateZipIndex > 0) {
      street_address_line_1 = rawText[lineWithCityStateZipIndex - 1];
    }
    if (lineWithCityStateZip === street_address_line_2
      || street_address_line_1 === street_address_line_2) {
      // case of no street_address_line_2
      street_address_line_2 = '';
    }

    if (street_address_line_1 !== undefined && !street_address_line_1.substr(0, 1).match(/\d+/)) {
      const matchedStreetAddress = /^([A-Za-z\s]+)?(.*)$/g.exec(street_address_line_1) || [];
      [, , street_address_line_1] = matchedStreetAddress;
      console.log('removed a part', matchedStreetAddress);
    }
    const matchedCityStateZip = /^([A-Za-z\s]+,? )?([A-Z]{2}) (\d+-?\d+?)$/g.exec(lineWithCityStateZip) || [];
    let [, city] = matchedCityStateZip;
    const [, , state, zip_code] = matchedCityStateZip;
    if (city) {
      city = city.replace(', ', '').trim();
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
      issued_date,
      expiration_date,
    };
  },
};

