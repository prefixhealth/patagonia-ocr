/**
 * TODO: Implement Levenshtein distance formula for 'THIS NUMBER HAS BEEN ESTABLISHED FOR'
 */

module.exports = {
  name: 'Social Security Card',
  matcher: (keyValues, rawText) => {
    const tests = [
      (rawText.find((line) => line === 'THIS NUMBER HAS BEEN ESTABLISHED FOR')),
      (rawText.find((line) => line === 'SIGNATURE')),
    ];

    return tests.filter((t) => {
      console.log('results', t, !t, !!t);
      return !t;
    }).length <= 0;
  },
  normalizer: {
    date: (string) => string,
  },
  extractor: (keyValues, rawText) => {
    console.log(keyValues, rawText);

    const referenceIndex = rawText.findIndex((line) => line === 'THIS NUMBER HAS BEEN ESTABLISHED FOR');
    let firstName = '';
    let lastName = '';
    if (referenceIndex) {
      firstName = rawText[referenceIndex + 1];
      lastName = rawText[referenceIndex + 2];
    }

    const retval = {
      type: module.exports.name,
      first_name: firstName,
      last_name: lastName,
    };

    console.log('retval', retval);

    return retval;
  },
};
