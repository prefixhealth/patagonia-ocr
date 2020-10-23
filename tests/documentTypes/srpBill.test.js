const processDocument = require('../../lib/documentProcessor');
const processor = require('../../lib/documentTypes/srpBill');

/**
 * TEMPLATE
 */
// it('', async () => {
//   const ocr = {
//     keyValues: { },
//     rawText: [
//
//     ],
//   };
//
//   // The Arizona Driver License processor should return true
//   expect(processor.matcher(ocr.keyValues, ocr.rawText)).toBe(true);
//
//   const processedDocument = processDocument(ocr.keyValues, ocr.rawText);
//   expect(processedDocument.documentType).toBe('SRP');
//   expect(processedDocument.extracted.first_name).toBe(undefined);
//   expect(processedDocument.extracted.last_name).toBe(undefined);
//   expect(processedDocument.extracted.street_address_line_1).toBe(undefined);
//   expect(processedDocument.extracted.street_address_line_2).toBe('');
//   expect(processedDocument.extracted.city).toBe('PHOENIX');
//   expect(processedDocument.extracted.state).toBe('AZ');
//   expect(processedDocument.extracted.zip_code).toBe(undefined);
//   expect(processedDocument.extracted.issued_date).toBe(undefined);
//   expect(processedDocument.extracted.expiration_date).toBe(undefined);
//   expect(processedDocument.extracted.bill_amount).toBe(undefined);
//   expect(processedDocument.extracted.bill_date).toBe(undefined);
//   expect(processedDocument.extracted.account_number).toBe(undefined);
// });

it('document ocr id 247', async () => {
  const ocr = {
    keyValues: {
      'Prior Read ': '35511 ',
      'Energy ': '3,031 ',
      'Type ': 'kWh ',
      'Meter a ': '1526421 ',
      'Current Read ': '38542 ',
      'Previous Balance ': '1303 ',
      '2020 ': '',
      '8117 Payment - Thark you ': '',
      '': '123456 HPA MYINT 1234 FAKE ST PHOENIX AZ 85051-4082 ',
      'Economy Price Plan Discount ': '-2230 ',
      'This Month\'s Charges ': '$391.63 ',
      'Make Check Payable To ': 'PO BOX 80062 PRESCOTT AZ 86304-8062 ',
      'Country and Stafe Tax ': '',
      'Please Pay by ': 'Sep 15, 2020 ',
      'You would have Laver $7.2 $7 23 this the EZ-3 Plan Savings for the last 12 would have bean $7.52 ': '',
      'Monthly Service Charge ': '1323 ',
    },
    rawText: [
      'Please Pay by',
      '123-456-789',
      'Sep 15, 2020',
      '$391.68',
      'Com',
      '602-236-8888',
      'SEPVICE FROM 1242 . 31',
      'HPA MYINT',
      'Basic 2808 Plan LAWRENCE LN PHOENIX',
      'YOUR ACCOUNT SUMMARY AS OF',
      'Previous Balance',
      '1303',
      '8117 Payment - Thark you',
      'ENERGY 3.080 HISTORY',
      'Balance Before Charges',
      '2,540',
      'Monthly Service Charge',
      '$20.00',
      '2,200',
      'Energy Change',
      '1323',
      'Economy Price Plan Discount',
      '-2230',
      '1,760',
      'Phoenix City Tax',
      '2370',
      '1,320',
      'Country and Stafe Tax',
      'This Month\'s Charges',
      '$391.63',
      '440',
      'O',
      'PLEASE PAY',
      '$391.82',
      'Jan Felb Mar Apr May Jun Jull Aug Sep Oct Now Dec',
      '2018',
      '2019',
      'MESSAGES FOR YOU',
      '2020',
      'if you are having trouble paying your bill FOW',
      'have programs 204 that you Our',
      'team is available 2417 a 1602) or was',
      'COMPARISON (Daily Averages)',
      'You would have Laver $7.2 $7 23 this the EZ-3 Plan',
      'Days',
      'kWh',
      'Savings for the last 12 would have bean $7.52',
      'Cost',
      'Aug 2020',
      'Temp',
      '31',
      '98',
      'Jul 2020',
      '$12.63',
      '98.8',
      'Surrimen Peal prices and with this bill Your new 611 will',
      '31',
      '94',
      '$12.11',
      '97.0°',
      'reflect surniner prices',
      'dollars fer',
      'Meter a',
      'Type',
      'Current Read Prior Read Energy',
      'yef -> 4670235',
      '1526421',
      'kWh',
      '38542',
      '35511',
      '3,031',
      'Total 18393-68',
      'PLEASE RETURN THIS PORTION WHEN MAILING YOUR PAYMENT',
      'Please Pay by',
      'E',
      'Sep 15, 2020',
      'Account 123-456-789',
      '$391.68',
      'To TO SHARE please add 51 $2 COT 55 to your Dayment',
      'Make Check Payable To',
      '0078793',
      'HPA MYINT',
      'PO BOX 80062',
      '1234 FAKE ST',
      'PRESCOTT AZ 86304-8062',
      'PHOENIX AZ 85051-4082',
      '200825000',
      '01673800500000000000000000000000391688',
    ],
  };

  // The Arizona Driver License processor should return true
  expect(processor.matcher(ocr.keyValues, ocr.rawText)).toBe(true);

  const processedDocument = processDocument(ocr.keyValues, ocr.rawText);
  expect(processedDocument.documentType).toBe('SRP');
  expect(processedDocument.extracted.first_name).toBe('HPA');
  expect(processedDocument.extracted.last_name).toBe('MYINT');
  expect(processedDocument.extracted.street_address_line_1).toBe('1234 FAKE ST');
  expect(processedDocument.extracted.street_address_line_2).toBe('');
  expect(processedDocument.extracted.city).toBe('PHOENIX');
  expect(processedDocument.extracted.state).toBe('AZ');
  expect(processedDocument.extracted.zip_code).toBe('85051-4082');
  expect(processedDocument.extracted.issued_date).toBe(undefined);
  expect(processedDocument.extracted.expiration_date).toBe(undefined);
  expect(processedDocument.extracted.bill_amount).toBe(undefined);
  expect(processedDocument.extracted.bill_date).toBe('Sep 15, 2020');
  expect(processedDocument.extracted.account_number).toBe('123-456-789');
});

it('document ocr id 276', async () => {
  const ocr = {
    keyValues: {
      'Meter # ': '1234567 ',
      'Energy ': '770 ',
      'Type ': 'kWh ',
      'Prior Read ': '63576 ',
      'Current Read ': '64346 ',
      'Monthly Service Charge ': '$20.00 ',
      'Phoenix City Tax ': '$2.81 ',
      'Energy Charge ': '$84.00 ',
      'County and State Tax ': '$6.55 ',
      'Account# ': '123-456-789 ',
      'PLEASE PAY ': '$110.73 ',
      'Apr ': '2018 ',
      '8/10 Payment - Thank you ': '-$145.00 ',
      'This Month\'s Charges ': '$113.36 ',
      'Please Pay by ': 'Sep 29, 2020 ',
      'Jul ': '2019 ',
      'Previous Balance ': '$142.37 ',
      'Balance Before Charges ': '-$2.63 ',
      'Feb ': '',
      'May ': '',
      'Mar ': '',
      'Aug ': '',
    },
    rawText: [
      'R',
      'Please Pay by',
      'Account# 123-456-789',
      'Sep 29, 2020',
      '$110.73',
      'srpnet.com',
      '602-236-8888',
      'SERVICE FROM 8/4/2020 - 9/3/2020 (31 Days)',
      'KLSJDF ZX DFS LKSJDFL',
      'YOUR ACCOUNT SUMMARY AS OF 9/8/2020',
      '1234 W FAKE STREET UN 1012 PHOENIX',
      'Previous Balance',
      '$142.37',
      'Basic Plan',
      '8/10 Payment - Thank you',
      '-$145.00',
      'Balance Before Charges',
      '-$2.63',
      'Monthly Service Charge',
      '$20.00',
      'ENERGY HISTORY (kWh)',
      'Energy Charge',
      '$84.00',
      '980',
      'Phoenix City Tax',
      '$2.81',
      '840',
      'County and State Tax',
      '$6.55',
      '700',
      'This Month\'s Charges',
      '$113.36',
      '560',
      'PLEASE PAY',
      '$110.73',
      '420',
      '280',
      '140',
      'MESSAGES FOR YOU',
      '0',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
      'If you are having trouble paying your bill, act now, we',
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'have programs and resources that may help you. Our',
      '2018',
      '2019',
      '2020',
      'team is available 24/7 at (602) 236-8888 or visit',
      'srpnet.com/heretohelp.',
      'COMPARISON (Daily Averages)',
      'Days',
      'kWh',
      'Cost',
      'Temp',
      '31',
      '25',
      '$3.66',
      '97.6°',
      'Sep 2020',
      '31',
      '31',
      '$4.59',
      '99.0°',
      'Aug 2020',
      'Sep 2019',
      '31',
      '28',
      '$4.03',
      '95.9°',
      'Meter #',
      'Type',
      'Current Read',
      'Prior Read',
      'Energy',
      'kWh',
      '64346',
      '63576',
      '770',
      '1234567',
    ],
  };

  // The Arizona Driver License processor should return true
  expect(processor.matcher(ocr.keyValues, ocr.rawText)).toBe(true);

  const processedDocument = processDocument(ocr.keyValues, ocr.rawText);
  expect(processedDocument.documentType).toBe('SRP');
  expect(processedDocument.extracted.first_name).toBe('KLSJDF ZX DFS');
  expect(processedDocument.extracted.last_name).toBe('LKSJDFL');
  expect(processedDocument.extracted.street_address_line_1).toBe(undefined);
  expect(processedDocument.extracted.street_address_line_2).toBe(undefined);
  expect(processedDocument.extracted.city).toBe(undefined);
  expect(processedDocument.extracted.state).toBe(undefined);
  expect(processedDocument.extracted.zip_code).toBe(undefined);
  expect(processedDocument.extracted.issued_date).toBe(undefined);
  expect(processedDocument.extracted.expiration_date).toBe(undefined);
  expect(processedDocument.extracted.bill_amount).toBe(undefined);
  expect(processedDocument.extracted.bill_date).toBe(undefined);
  expect(processedDocument.extracted.account_number).toBe('123-456-789');
});

it('document ocr id 290', async () => {
  const ocr = {
    keyValues: {
      'M-Power Balance ': '$198.74 ',
      'Previous Balance ': '$0.00 ',
      'BEGINNING ADJUSTMENT ': '$198.74 ',
      '11/1-11/4 Energy (kWh) Used 29 kWh ': '$4.65 ',
      'Account# ': '367-577-009 ',
      '11/1 Service Establishment Fee ': '$49.06 ',
      '11/4 M-Power Advance to Meter ': '$30.00 ',
      '11/1 Deposit Billed ': '$102.50 ',
      '11/4 M-Power Box Refurb Fee ': '$12.53 ',
      // eslint-disable-next-line no-dupe-keys
      'M-Power Balance ': '$198.74 ',
    },
    rawText: [
      'R',
      'Account# 123-456-789',
      'M-Power Balance',
      '$198.74',
      'srpnet.com',
      '602-236-8888',
      'YOUR ACCOUNT SUMMARY AS OF 11/4/2019',
      'ASDF S ZXCV',
      '1234 S FAKE ST APT 222 PHOENIX',
      'Previous Balance',
      '$0.00',
      '11/1-11/4 Energy (kWh) Used 29 kWh',
      '$4.65',
      'M-Power Plan',
      '11/4 M-Power Box Refurb Fee',
      '$12.53',
      '11/1 Deposit Billed',
      '$102.50',
      '11/1 Service Establishment Fee',
      '$49.06',
      '11/4 M-Power Advance to Meter',
      '$30.00',
      'BEGINNING ADJUSTMENT',
      '$198.74',
      'Welcome to the SRP M-Power program The amount owed to SRP at the time you began the program is detailed above.',
      'You may pay this balance, in part or in full, by visiting My Account at srpnet com. If not paid in full, a percentage of any',
      'future purchases will be applied towara the amount apove.',
      'Please note that amounts transferred from previous accounts may not be included in the above balance.',
      'Any future power purchases can be made by visiting My Account at srpnet.com or by downloading the SRP M-Power App.',
      'M-Power Balance',
      '$198.74',
      'Account# 123-456-789',
      '0000123',
      'ASDF S ZXCV',
      '1234 S FASK ST APT 222',
      'PHOENIX AZ 85040',
    ],
  };

  // The Arizona Driver License processor should return true
  expect(processor.matcher(ocr.keyValues, ocr.rawText)).toBe(true);

  const processedDocument = processDocument(ocr.keyValues, ocr.rawText);
  expect(processedDocument.documentType).toBe('SRP');
  expect(processedDocument.extracted.first_name).toBe('ASDF S');
  expect(processedDocument.extracted.last_name).toBe('ZXCV');
  expect(processedDocument.extracted.street_address_line_1).toBe('1234 S FASK ST APT 222');
  expect(processedDocument.extracted.street_address_line_2).toBe('');
  expect(processedDocument.extracted.city).toBe('PHOENIX');
  expect(processedDocument.extracted.state).toBe('AZ');
  expect(processedDocument.extracted.zip_code).toBe('85040');
  expect(processedDocument.extracted.issued_date).toBe(undefined);
  expect(processedDocument.extracted.expiration_date).toBe(undefined);
  expect(processedDocument.extracted.bill_amount).toBe(undefined);
  expect(processedDocument.extracted.bill_date).toBe(undefined);
  expect(processedDocument.extracted.account_number).toBe('123-456-789');
});

it('Expect SRP bill to be detected and processed', async () => {
  const ocr = {
    keyValues: {
      'Energy ': '1,285 ',
      'SurePay Date ': 'Aug 5, 2020 ',
      'Prior Read ': '30979 ',
      'Type ': 'kWh ',
      // eslint-disable-next-line no-dupe-keys
      'SurePay Date ': 'Aug 5, 2020 ',
      'Current Read ': '32264 ',
      'Energy Charge ': '$148.69 ',
      'Monthly Service Charge ': '$20.00 ',
      'Previous Balance ': '$119.79 ',
      'Phoenix City Tax ': '$4.55 ',
      '3846 W ROVEY AVE ': 'PHOENIX ',
      '7/7 SurePay Payment - Thank you ': '-$119.79 ',
      'This Month\'s Charges ': '$183.87 ',
      'You would have saved $30.83 this month on the EZ-3 Plan Savings for the last 12 months would have been $35.73 ': '',
      'Balance Before Charges ': '$0.00 ',
      '2020 ': '',
      'PLEASE PAY ': '$183.87 ',
      'County and State Tax ': '$10.63 ',
      'Basic ': 'Plan ',
    },
    rawText: [
      'SurePay Date',
      'Account# 123-456-789',
      'Aug 5, 2020',
      '$183.87',
      '602-236-8888',
      'SERVICE FROM 6/13/2020 - 7/13/2020 (31 Days)',
      'srpnet.com',
      'ASDF ZXCV QWER',
      'YOUR ACCOUNT SUMMARY AS OF 7/15/2020',
      '1234 W FAKE AVE PHOENIX',
      'Previous Balance',
      '$119.79',
      'Basic Plan',
      '7/7 SurePay Payment - Thank you',
      '-$119.79',
      'Balance Before Charges',
      '$0.00',
      'Monthly Service Charge',
      '$20.00',
      'ENERGY HISTORY (kWh)',
      'Energy Charge',
      '$148.69',
      '1,330',
      'Phoenix City Tax',
      '$4.55',
      '1,140',
      'County and State Tax',
      '$10.63',
      '950',
      'This Month\'s Charges',
      '$183.87',
      '760',
      'PLEASE PAY',
      '$183.87',
      '570',
      '380',
      '190',
      '0',
      'MESSAGES FOR YOU',
      'Jan Feb Mar Apr May Jun Jul Aug Sep Oct Now Dec',
      'During this time of uncertainty we are always here to help.',
      '2018',
      '2019',
      '2020',
      'Our team is available 24/7 at (602) 236-8888 or visit',
      'srpnet.com/heretohelp',
      'You would have saved $30.83 this month on the EZ-3 Plan',
      'Savings for the last 12 months would have been $35.73',
      'COMPARISON (Daily Averages)',
      'Days',
      'kWh',
      'Cost',
      'Temp',
      'Jul 2020',
      '31',
      '41',
      '$5.93',
      '95.0°',
      'Jun 2020',
      '30',
      '27',
      '$3.99',
      '88.2°',
      'Meter #',
      'Type',
      'Current Read',
      'Prior Read',
      'Energy',
      '1535554',
      'kWh',
      '32264',
      '30979',
      '1,285',
      'SurePay Date',
      'Aug 5, 2020',
      '$183.87',
      '.',
      'Account# 123-456-789',
      'Payment will be withdrawn from your account on or after Aug 5. 2020',
      '0001452',
      'ASDF ZXCV QWER',
      '1234 W FAKE AVE',
      'PHOENIX AZ 85019-1735',
    ],
  };

  // The SRP Bill processor should return true
  expect(processor.matcher(ocr.keyValues, ocr.rawText)).toBe(true);

  const processedDocument = processDocument(ocr.keyValues, ocr.rawText);
  expect(processedDocument.documentType).toBe('SRP');

  expect(processedDocument.found).toBe(true);
  expect(processedDocument.documentType).toBe('SRP');
  expect(processedDocument.extracted.first_name).toBe('ASDF ZXCV');
  expect(processedDocument.extracted.last_name).toBe('QWER');
  expect(processedDocument.extracted.street_address_line_1).toBe('1234 W FAKE AVE');
  expect(processedDocument.extracted.street_address_line_2).toBe('');
  expect(processedDocument.extracted.city).toBe('PHOENIX');
  expect(processedDocument.extracted.state).toBe('AZ');
  expect(processedDocument.extracted.zip_code).toBe('85019-1735');
  expect(processedDocument.extracted.bill_amount).toBe(undefined);
  expect(processedDocument.extracted.bill_date).toBe('Aug 5, 2020');
  expect(processedDocument.extracted.account_number).toBe('123-456-789');
  expect(processedDocument.extracted.issued_date).toBe(undefined);
  expect(processedDocument.extracted.expiration_date).toBe(undefined);
});
