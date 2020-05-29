const fs = require('fs').promises;
const processDocument = require('./documentProcessor');
const mapTextractOutput = require('./textractMapper');

it('Expect AZ diver license to be detected and processed', async () => {
  const mockData = {
    keyValues: { '4d': 'D08954796' },
    rawText: [
      'Arizona',
      'DRIVER LICENSE',
      'USA',
      '9 CLASS D',
      '4d DLN D08954796',
      'Sa END NONE',
      '12 REST B',
      '3 DOB 01/01/1974',
      '1 SAMPLE',
      '2 JELANI',
      '8',
      '123 MAIN ST',
      'PHOENIX, AZ 85007',
      'EXP 04/01/2024 4a ISS 04/01/2016',
      '15 SEX M',
      '18 EYES BRO VETERAN',
      '16 HGT 5\'-09" 19 HAIR BRO',
      '17 WGT 185 lb',
      'ores',
      'Jarmple',
      '01/01/74',
      'DONOR',
      '5 DD 9001A9691S142134',
    ],
  };

  const response = processDocument(mockData.keyValues, mockData.rawText);

  expect(response.found).toBe(true);
  expect(response.documentType).toBe('AZDL');
  expect(response.keyValues.first_name).toBe('SAMPLE');
  expect(response.keyValues.last_name).toBe('JELANI');
  expect(response.keyValues.street_address_line_1).toBe('123 MAIN ST');
  expect(response.keyValues.street_address_line_2).toBe('');
  expect(response.keyValues.city).toBe('PHOENIX');
  expect(response.keyValues.state).toBe('AZ');
  expect(response.keyValues.zip_code).toBe('85007');
});

it('Expect APS bill to be detected and processed', async () => {
  const textractOutput = await fs.readFile(
    `${__dirname}/../_samples/textract_output_aps_bill.json`,
  );

  const output = JSON.parse(textractOutput.toString());
  const ocr = mapTextractOutput(output);
  const response = processDocument(ocr.keyValues, ocr.rawText);

  expect(response.found).toBe(true);
  expect(response.documentType).toBe('APS');
  expect(response.keyValues.first_name).toBe('John A');
  expect(response.keyValues.last_name).toBe('Doe');
  expect(response.keyValues.street_address_line_1).toBe('653 E ARAUCARIA LN');
  expect(response.keyValues.street_address_line_2).toBe('');
  expect(response.keyValues.city).toBe('PHOENIX');
  expect(response.keyValues.state).toBe('AZ');
  expect(response.keyValues.zip_code).toBe('85310-5875');
  expect(response.keyValues.bill_amount).toBe('$ 214.00');
  expect(response.keyValues.bill_date).toBe('May 8, 2020');
  expect(response.keyValues.account_number).toBe('4563211000');
});

it('Expect SOUTHWESTGAS bill to be detected and processed', async () => {
  const textractOutput = await fs.readFile(
    `${__dirname}/../_samples/textract_output_southwest_gas_bill.json`,
  );

  const output = JSON.parse(textractOutput.toString());
  const ocr = mapTextractOutput(output);
  const response = processDocument(ocr.keyValues, ocr.rawText);

  expect(response.found).toBe(true);
  expect(response.documentType).toBe('SOUTHWESTGAS');
  expect(response.keyValues.first_name).toBe('CHARLES');
  expect(response.keyValues.last_name).toBe('DOE');
  expect(response.keyValues.street_address_line_1).toBe('2561 W ARCADIA LN 85310');
  expect(response.keyValues.street_address_line_2).toBe('');
  expect(response.keyValues.city).toBe('PHOENIX');
  expect(response.keyValues.state).toBe('AZ');
  expect(response.keyValues.zip_code).toBe('85310');
  expect(response.keyValues.bill_amount).toBe('$33.72');
  expect(response.keyValues.bill_date).toBe('05/01/20');
  expect(response.keyValues.account_number).toBe('421-6415508-002');
});

it('Expect CITYOFPHOENIXWATER bill to be detected and processed', async () => {
  const textractOutput = await fs.readFile(
    `${__dirname}/../_samples/textract_output_city_of_phoenix_water_bill.json`,
  );

  const output = JSON.parse(textractOutput.toString());
  const ocr = mapTextractOutput(output);
  const response = processDocument(ocr.keyValues, ocr.rawText);

  expect(response.found).toBe(true);
  expect(response.documentType).toBe('CITYOFPHOENIXWATER');
  expect(response.keyValues.first_name).toBe('MARY A');
  expect(response.keyValues.last_name).toBe('GREGORY');
  expect(response.keyValues.street_address_line_1).toBe('2560 E FIFTH AVE');
  expect(response.keyValues.street_address_line_2).toBe('');
  expect(response.keyValues.city).toBe('PHOENIX');
  expect(response.keyValues.state).toBe('AZ');
  expect(response.keyValues.zip_code).toBe('85016-3014');
  expect(response.keyValues.bill_amount).toBe('$53.20');
  expect(response.keyValues.bill_date).toBe('05/07/2020');
  expect(response.keyValues.account_number).toBe('6372280000');
});

it('Expect SRP bill to be detected and processed', async () => {
  const textractOutput = await fs.readFile(
    `${__dirname}/../_samples/textract_output_srp_bill.json`,
  );

  const output = JSON.parse(textractOutput.toString());
  const ocr = mapTextractOutput(output);
  const response = processDocument(ocr.keyValues, ocr.rawText);

  expect(response.found).toBe(true);
  expect(response.documentType).toBe('SRP');
  expect(response.keyValues.first_name).toBe('JANE F');
  expect(response.keyValues.last_name).toBe('FERGUSON');
  expect(response.keyValues.street_address_line_1).toBe('3740 W GOETHE AVE');
  expect(response.keyValues.street_address_line_2).toBe('');
  expect(response.keyValues.city).toBe('PHOENIX');
  expect(response.keyValues.state).toBe('AZ');
  expect(response.keyValues.zip_code).toBe('85016-3014');
  expect(response.keyValues.bill_amount).toBe('$102.29');
  expect(response.keyValues.bill_date).toBe('5/12/2020');
  expect(response.keyValues.account_number).toBe('628-654-000');
});
