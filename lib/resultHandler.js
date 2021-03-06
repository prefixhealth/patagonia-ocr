const csvParser = require('csv-parse/lib/sync');
const ApiError = require('./ApiError');
const { store, exists } = require('./uploader');
const normalizeValidated = require('./validatedNormalizator');

const filename = 'result.csv';

module.exports.saveResult = async (result, requestId) => {
  // save keyValues as a .csv
  let body = result;
  const keys = Object.keys(body);
  const values = Object.values(body);
  let string = 'key,value\n';
  keys.forEach((key, index) => {
    string += `"${key}","${values[index]}"\n`;
  });
  body = string;

  const saved = await store.set(`${requestId}/${filename}`, body, 'text/csv; charset=utf-8');
  console.log('saved result', saved);
  return saved;
};

module.exports.retrieveResult = async (requestId) => {
  let json = {};
  try {
    const data = await store.get(`${requestId}/${filename}`);
    const csv = data.Body.toString();
    const array = csvParser(csv, {
      columns: true,
      skip_empty_lines: true,
    });
    array.forEach((line) => {
      json[line.key] = line.value;
    });
    json = normalizeValidated(json);
  } catch (err) {
    // result object not found
    console.log('retrieveResult cannot find the processed result');

    if (!await exists(requestId)) { // check for invalid requestId
      throw new ApiError('Not Found', 404);
    }

    json = null;
  }
  return json;
};
