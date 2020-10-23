const processDocument = require('../../lib/documentProcessor');
const processor = require('../../lib/documentTypes/arizonaDriverLicense');

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
//   expect(processedDocument.documentType).toBe('Arizona\'s Driver License');
//   expect(processedDocument.extracted.first_name).toBe(undefined);
//   expect(processedDocument.extracted.last_name).toBe(undefined);
//   expect(processedDocument.extracted.street_address_line_1).toBe(undefined);
//   expect(processedDocument.extracted.street_address_line_2).toBe('');
//   expect(processedDocument.extracted.city).toBe('PHOENIX');
//   expect(processedDocument.extracted.state).toBe('AZ');
//   expect(processedDocument.extracted.zip_code).toBe(undefined);
//   expect(processedDocument.extracted.issued_date).toBe(undefined);
//   expect(processedDocument.extracted.expiration_date).toBe(undefined);
//
//   expect(processedDocument.extracted.bill_amount).toBe(undefined);
//   expect(processedDocument.extracted.bill_date).toBe(undefined);
//   expect(processedDocument.extracted.account_number).toBe(undefined);
// });

it('document ocr id 14', async () => {
  const ocr = {
    keyValues: { '': 'USA ' },
    rawText: [
      'Arizonel',
      'USA',
      'DRIVER LICENSE',
      'MITED-TERM',
      '4d DLN D 11354987',
      '4b EXP 01/1 16/2028',
      '3 DOE 02/09/1999',
      '9 CLASS t',
      '93 END NONE',
      '12 REST NONE',
      'UNDER 21 UNTIL',
      '02/09/2020',
      '1 CLDMFL',
      '2 CKDLS DLLC',
      '8 3542 FAKE STREET ST APT 2033',
      'PHOENIX, AZ 85008-7021',
      '15 SEX F',
      '18 EYES BRO',
      '16 HGT 5\'-02\'',
      '19 HAIR BRO',
      '17 WGT 130 lb',
      '4a ISS 01/16/2020',
      'HM99',
      '02/09/99',
      '5 DD 1126E4873M5498',
    ],
  };

  // The Arizona Driver License processor should return true
  expect(processor.matcher(ocr.keyValues, ocr.rawText)).toBe(true);

  const processedDocument = processDocument(ocr.keyValues, ocr.rawText);
  expect(processedDocument.documentType).toBe('Arizona\'s Driver License');
  expect(processedDocument.extracted.last_name).toBe('CLDMFL');
  expect(processedDocument.extracted.first_name).toBe('CKDLS DLLC');
  expect(processedDocument.extracted.street_address_line_1).toBe('3542 FAKE STREET ST APT 2033');
  expect(processedDocument.extracted.street_address_line_2).toBe('');
  expect(processedDocument.extracted.city).toBe('PHOENIX');
  expect(processedDocument.extracted.state).toBe('AZ');
  expect(processedDocument.extracted.zip_code).toBe('85008-7021');
  expect(processedDocument.extracted.issued_date).toBe('01/16/2020');
  expect(processedDocument.extracted.expiration_date).toBe(undefined);

  expect(processedDocument.extracted.bill_amount).toBe(undefined);
  expect(processedDocument.extracted.bill_date).toBe(undefined);
  expect(processedDocument.extracted.account_number).toBe(undefined);
});

it('document ocr id 36', async () => {
  const ocr = {
    keyValues: {
      '4b EXP ': '10/08/2020 ',
      '3 DOB ': '02/28/1985 ',
    },
    rawText: [
      'Brizona',
      'DRIVER LICENSE',
      'USA',
      'NOT FOR FEDERAL IDENTIFICATION',
      'LIMITED-TERM',
      '9 CLASS D',
      '4d DLN D76963548',
      '9a END NONE',
      '12 REST NONE',
      '3 DOB 02/28/1985',
      '1 CLKSKJDF',
      '2 XJLSLEIR',
      '8 502 N FAKE ST',
      'APT 84',
      'PHOENIX, AZ 850086641',
      '4b EXP 10/08/2020',
      '4a ISS 07/01/2020',
      '15 SEX M',
      '18 EYES BRO',
      '16 HGT 5\'-09" 19 HAIR BLK',
      '17 WGT 123 3 lb lb',
      '02/28/85',
      '5 DD 78412549FM457984',
    ],
  };

  // The Arizona Driver License processor should return true
  expect(processor.matcher(ocr.keyValues, ocr.rawText)).toBe(true);

  const processedDocument = processDocument(ocr.keyValues, ocr.rawText);
  expect(processedDocument.documentType).toBe('Arizona\'s Driver License');
  expect(processedDocument.extracted.first_name).toBe('XJLSLEIR');
  expect(processedDocument.extracted.last_name).toBe('CLKSKJDF');
  expect(processedDocument.extracted.street_address_line_1).toBe('502 N FAKE ST');
  expect(processedDocument.extracted.street_address_line_2).toBe('APT 84');
  expect(processedDocument.extracted.city).toBe('PHOENIX');
  expect(processedDocument.extracted.state).toBe('AZ');
  expect(processedDocument.extracted.zip_code).toBe('850086641');
  expect(processedDocument.extracted.issued_date).toBe('07/01/2020');
  expect(processedDocument.extracted.expiration_date).toBe('10/08/2020');

  expect(processedDocument.extracted.bill_amount).toBe(undefined);
  expect(processedDocument.extracted.bill_date).toBe(undefined);
  expect(processedDocument.extracted.account_number).toBe(undefined);
});

it('document ocr id 83', async () => {
  const ocr = {
    keyValues: {
      '3 DOB ': '310/02/1994 ',
      '4b EXP ': '04/11/2026 ',
    },
    rawText: [
      'DRIVER LICENSE',
      'USA',
      'NOT FOR FEDERAL IDENTIFICATION',
      'LIMITED-TERM',
      '9 CLASS D',
      '4d DLN D48576158',
      '9a END NONE',
      '12 REST B',
      '3 DOB 310/02/1994',
      '1 LKJSDF',
      '2 LKCJ',
      '8 4879 N FAKE DR',
      'PHOENIX, AZ 85051-3308',
      '4b EXP 04/11/2026 4a ISS 12/06/2019',
      '15 SEX M',
      '18 EYESHA HAZ',
      '16 HGT 6\'-03" 19 HAIR BLK',
      '17 WGT 220 lb',
      '10/02/94',
      '5 DD 3847C38375K3847A4',
    ],
  };

  // The Arizona Driver License processor should return true
  expect(processor.matcher(ocr.keyValues, ocr.rawText)).toBe(true);

  const processedDocument = processDocument(ocr.keyValues, ocr.rawText);
  expect(processedDocument.documentType).toBe('Arizona\'s Driver License');
  expect(processedDocument.extracted.first_name).toBe('LKCJ');
  expect(processedDocument.extracted.last_name).toBe('LKJSDF');
  expect(processedDocument.extracted.street_address_line_1).toBe('4879 N FAKE DR');
  expect(processedDocument.extracted.street_address_line_2).toBe('');
  expect(processedDocument.extracted.city).toBe('PHOENIX');
  expect(processedDocument.extracted.state).toBe('AZ');
  expect(processedDocument.extracted.zip_code).toBe('85051-3308');
  expect(processedDocument.extracted.issued_date).toBe('12/06/2019');
  expect(processedDocument.extracted.expiration_date).toBe('04/11/2026');

  expect(processedDocument.extracted.bill_amount).toBe(undefined);
  expect(processedDocument.extracted.bill_date).toBe(undefined);
  expect(processedDocument.extracted.account_number).toBe(undefined);
});

it('document ocr id 144', async () => {
  const ocr = {
    keyValues: {
      '4b EXP ': '04/10/2021 ',
    },
    rawText: [
      'Brizonc',
      'DRIVER LICENSE',
      'USA',
      'NOT FOR FEDERAL IDENTIFICATION',
      'LIMITED-TERM',
      '9 CLASS D',
      '4d DLN X57985478',
      '9a END NONE',
      '12 REST NONE',
      '3 DOB 01/01/1986',
      '1 CLKJFD',
      '2 CLKJSDLKJF',
      '8 3857 N FAKE AVE',
      'APT 2116',
      'PHOENIX, AZ 850354238',
      '4b EXP 04/10/2021 4a ISS 05/04/2020',
      '15 SEX M',
      '18 EYES BRO',
      '1',
      '16 HGT 5\'-04" 19 HAIR BLK',
      '17 WGT 120 lb',
      '01/01/86',
      '5 DD 478135469A123456',
    ],
  };

  // The Arizona Driver License processor should return true
  expect(processor.matcher(ocr.keyValues, ocr.rawText)).toBe(true);

  const processedDocument = processDocument(ocr.keyValues, ocr.rawText);
  expect(processedDocument.documentType).toBe('Arizona\'s Driver License');
  expect(processedDocument.extracted.first_name).toBe('CLKJSDLKJF');
  expect(processedDocument.extracted.last_name).toBe('CLKJFD');
  expect(processedDocument.extracted.street_address_line_1).toBe('3857 N FAKE AVE');
  expect(processedDocument.extracted.street_address_line_2).toBe('APT 2116');
  expect(processedDocument.extracted.city).toBe('PHOENIX');
  expect(processedDocument.extracted.state).toBe('AZ');
  expect(processedDocument.extracted.zip_code).toBe('850354238');
  expect(processedDocument.extracted.issued_date).toBe('05/04/2020');
  expect(processedDocument.extracted.expiration_date).toBe('04/10/2021');

  expect(processedDocument.extracted.bill_amount).toBe(undefined);
  expect(processedDocument.extracted.bill_date).toBe(undefined);
  expect(processedDocument.extracted.account_number).toBe(undefined);
});

it('document ocr id 150', async () => {
  const ocr = {
    keyValues: {
      '4b EXP ': '04/23/2030 ',
    },
    rawText: [
      'Arizona',
      'IDENTIFICATION',
      'USA',
      'CARD',
      'NOT FOR FEDERAL IDENTIFICATION',
      'LIMITED-TERM',
      '4d IDN D12345678',
      '3 DOB 01/01/1994',
      '1 CJFLKJSDF',
      '2 KLJDLKJSDF',
      '8 1234 W FAKE ST',
      'PHOENIX, AZ 850212963',
      '4b EXP 04/23/2030 4a ISS 08/11/2020',
      '15 SEX E',
      '18 EYES BRO',
      '16 HGT 5\'-05" 19 HAIR BLK',
      '17 WGT 145 lb',
      '01/01/94',
      '5 DD 123456AF1M123456',
    ],
  };

  // The Arizona Driver License processor should return true
  expect(processor.matcher(ocr.keyValues, ocr.rawText)).toBe(true);

  const processedDocument = processDocument(ocr.keyValues, ocr.rawText);
  expect(processedDocument.documentType).toBe('Arizona\'s Driver License');
  expect(processedDocument.extracted.first_name).toBe('KLJDLKJSDF');
  expect(processedDocument.extracted.last_name).toBe('CJFLKJSDF');
  expect(processedDocument.extracted.street_address_line_1).toBe('1234 W FAKE ST');
  expect(processedDocument.extracted.street_address_line_2).toBe('');
  expect(processedDocument.extracted.city).toBe('PHOENIX');
  expect(processedDocument.extracted.state).toBe('AZ');
  expect(processedDocument.extracted.zip_code).toBe('850212963');
  expect(processedDocument.extracted.issued_date).toBe('08/11/2020');
  expect(processedDocument.extracted.expiration_date).toBe('04/23/2030');

  expect(processedDocument.extracted.bill_amount).toBe(undefined);
  expect(processedDocument.extracted.bill_date).toBe(undefined);
  expect(processedDocument.extracted.account_number).toBe(undefined);
});

it('document ocr id 159', async () => {
  const ocr = {
    keyValues: { },
    rawText: [
      'Prizona',
      'DRIVER LICENSE',
      'USA',
      'NOT FOR FEDERAL IDENTIFICATION',
      '^',
      'LIMITED-TERM',
      'STCASS D',
      'Sa END NONE',
      'DLN D12345678',
      '12 REST NONE',
      'DOB 11/10/1954',
      '1. ASAN',
      '2 NASIBU',
      '8 1234 N FAKE OR',
      'PHOENIX, AZ\'85017-1408',
      '4b EXP 01/24/2023 4a ISS 06/18/2018',
      '15 SEX M',
      '18 EYES BRO',
      '16 HGT 5-06" 19 HAIR BLK',
      '17 WGT 150 lb',
      '11/10/54',
      '5 on 1234F1234A1234NA',
    ],
  };

  // The Arizona Driver License processor should return true
  expect(processor.matcher(ocr.keyValues, ocr.rawText)).toBe(true);

  const processedDocument = processDocument(ocr.keyValues, ocr.rawText);
  expect(processedDocument.documentType).toBe('Arizona\'s Driver License');
  expect(processedDocument.extracted.first_name).toBe('NASIBU');
  expect(processedDocument.extracted.last_name).toBe(undefined);
  expect(processedDocument.extracted.street_address_line_1).toBe('1234 N FAKE OR');

  // TODO: This test is not here to say these are the correct
  //  values but to track changes in the AZDL algorithm
  expect(processedDocument.extracted.street_address_line_2).toBe('PHOENIX, AZ\'85017-1408');
  expect(processedDocument.extracted.city).toBe(undefined);
  expect(processedDocument.extracted.state).toBe(undefined);
  expect(processedDocument.extracted.zip_code).toBe(undefined);

  expect(processedDocument.extracted.issued_date).toBe('06/18/2018');
  expect(processedDocument.extracted.expiration_date).toBe('01/24/2023');

  expect(processedDocument.extracted.bill_amount).toBe(undefined);
  expect(processedDocument.extracted.bill_date).toBe(undefined);
  expect(processedDocument.extracted.account_number).toBe(undefined);
});

it('document ocr id 165', async () => {
  const ocr = {
    keyValues: { },
    rawText: [
      'IDENTIFICATION USA',
      'CARD',
      'NOT FOR FEDERAL IDENTIFICATION',
      'LIMITED-TERM',
      '4d IDN D12345678',
      '3 DOB 01/01/1983',
      '1 KLJSDF',
      '2 CKLSDF',
      '8',
      '3549 N 6TH FAKE AVE APT 245',
      'PHOENIX, AZ 85015-3716',
      '4b EXP 05/03/2026 4a ISS 10/04/2019',
      '15 SEX M 18 EYES BLK',
      '16 HGT 5\'-01" 19 19 HAIR BLK',
      '17 WGT 115lb',
      '01/01/83',
      '5 DD 1234E1234B1234B3',
    ],
  };

  // The Arizona Driver License processor should return true
  expect(processor.matcher(ocr.keyValues, ocr.rawText)).toBe(true);

  const processedDocument = processDocument(ocr.keyValues, ocr.rawText);
  expect(processedDocument.documentType).toBe('Arizona\'s Driver License');
  expect(processedDocument.extracted.first_name).toBe('CKLSDF');
  expect(processedDocument.extracted.last_name).toBe('KLJSDF');
  expect(processedDocument.extracted.street_address_line_1).toBe('3549 N 6TH FAKE AVE APT 245');
  expect(processedDocument.extracted.street_address_line_2).toBe('');
  expect(processedDocument.extracted.city).toBe('PHOENIX');
  expect(processedDocument.extracted.state).toBe('AZ');
  expect(processedDocument.extracted.zip_code).toBe('85015-3716');
  expect(processedDocument.extracted.issued_date).toBe('10/04/2019');
  expect(processedDocument.extracted.expiration_date).toBe('05/03/2026');

  expect(processedDocument.extracted.bill_amount).toBe(undefined);
  expect(processedDocument.extracted.bill_date).toBe(undefined);
  expect(processedDocument.extracted.account_number).toBe(undefined);
});

it('document ocr id 181', async () => {
  const ocr = {
    keyValues: {
      '4b EXP ': '08/20/2029 ',
      'DOB ': '01/01/1971 ',
      '4d IDN ': 'D09981721 ',
    },
    rawText: [
      'Arizonc',
      'IDENTIFICATION',
      'USA',
      'CARD',
      'NOT FOR FEDERAL IDENTIFICATION',
      'LIMITED-TERM',
      '4d IDN D12345678',
      '3 DOB 01/01/1971',
      '1 KLJSDLKFJSD',
      '2 LSDKLFS LKSJDF CJKLXCV LKSJDFS',
      '8 1234 W FAKE AVE APT 1106',
      'PHOENIX, AZ 85021-7856',
      '4b EXP 08/20/2029 4a ISS 01/21/2020',
      '15 SEX F',
      '18 EYES BLK',
      '16 HGT 5\'-00" 19 HAIR BLK',
      '17 WGT 132 lb',
      '01/01/71',
      '5 DD 1234C1234P1234M1',
    ],
  };

  // The Arizona Driver License processor should return true
  expect(processor.matcher(ocr.keyValues, ocr.rawText)).toBe(true);

  const processedDocument = processDocument(ocr.keyValues, ocr.rawText);
  expect(processedDocument.documentType).toBe('Arizona\'s Driver License');
  expect(processedDocument.extracted.first_name).toBe('LSDKLFS LKSJDF CJKLXCV LKSJDFS');
  expect(processedDocument.extracted.last_name).toBe('KLJSDLKFJSD');
  expect(processedDocument.extracted.street_address_line_1).toBe('1234 W FAKE AVE APT 1106');
  expect(processedDocument.extracted.street_address_line_2).toBe('');
  expect(processedDocument.extracted.city).toBe('PHOENIX');
  expect(processedDocument.extracted.state).toBe('AZ');
  expect(processedDocument.extracted.zip_code).toBe('85021-7856');
  expect(processedDocument.extracted.issued_date).toBe('01/21/2020');
  expect(processedDocument.extracted.expiration_date).toBe('08/20/2029');

  expect(processedDocument.extracted.bill_amount).toBe(undefined);
  expect(processedDocument.extracted.bill_date).toBe(undefined);
  expect(processedDocument.extracted.account_number).toBe(undefined);
});

it('document ocr id 199', async () => {
  const ocr = {
    keyValues: {
      '': 'D11277495 ',
      '3 DOB ': '09/30/1989 ',
    },
    rawText: [
      'Arizonal',
      'IDENTIFICATION',
      'USA',
      'CARD',
      'NOT FOR FEDERAL IDENTIFICATION',
      'LIMITED-TERM',
      'ID',
      'D12345678',
      '3 DOB 09/30/1989',
      '1 SDFSDF SDFSCXVX',
      '2 SDFSDF',
      '8 1234 N FAKE PL',
      'SCOTTSDALE, AZ 85250-7405',
      '4b EXP 09/26/2024 4a ISS 11/12/2019',
      '15 SEX M',
      '18 EYES BRO',
      '16 HGT 5\'-06" 19 HAIR BRO',
      '17 WGT 178 78 lb lb',
      'DONOR v',
      '09/30/89',
      'Somuel',
      '5 DD 1234E1234G1234S9',
    ],
  };

  // The Arizona Driver License processor should return true
  expect(processor.matcher(ocr.keyValues, ocr.rawText)).toBe(true);

  const processedDocument = processDocument(ocr.keyValues, ocr.rawText);
  expect(processedDocument.documentType).toBe('Arizona\'s Driver License');
  expect(processedDocument.extracted.first_name).toBe('SDFSDF');
  expect(processedDocument.extracted.last_name).toBe('SDFSDF SDFSCXVX');
  expect(processedDocument.extracted.street_address_line_1).toBe('1234 N FAKE PL');
  expect(processedDocument.extracted.street_address_line_2).toBe('');
  expect(processedDocument.extracted.city).toBe('SCOTTSDALE');
  expect(processedDocument.extracted.state).toBe('AZ');
  expect(processedDocument.extracted.zip_code).toBe('85250-7405');
  expect(processedDocument.extracted.issued_date).toBe('11/12/2019');
  expect(processedDocument.extracted.expiration_date).toBe('09/26/2024');

  expect(processedDocument.extracted.bill_amount).toBe(undefined);
  expect(processedDocument.extracted.bill_date).toBe(undefined);
  expect(processedDocument.extracted.account_number).toBe(undefined);
});

it('document ocr id 223', async () => {
  const ocr = {
    keyValues: {
      'Resident Since: ': '04/15/15 ',
      'Card Expires: ': '09/12/27 ',
    },
    rawText: [
      'DRIVER LICENSE',
      'USA',
      'NOT FOR FEDERAL IDENTIFICATION',
      'IMITED-TERM',
      '9:',
      'CLASS D',
      'Sa END NONE',
      '4d DLN D12345678',
      '12 REST NONE',
      '3 DOB 12/16/1957',
      '1. AL ZXKCLK',
      '2 SDJFLS',
      'is',
      '1234 w FAKE RD',
      'APT 1051',
      'PHOENIX, AZ 1850219316',
      '4b',
      'EXP',
      '12/16/2022 4a ISS 06/05/2020',
      '15 SEX; M 13 EYES BLK',
      '16 HGT 5\'-07" 19 HAIR BLK',
      '17 WGT 134 lb',
      '12/16/57',
      '5 DD 12345789CA123415',
      'Hot 7 O E',
      'UNITED STATES OF AMERICA',
      'PERMANENT RESIDENT',
      'HIPAFAR',
      'R 16 bEc',
      'Surname',
      'AL ZXKCLK',
      'Given Name',
      'SDJFLS R',
      'USCIS#',
      'Category',
      '546-125-875 RE6',
      'Country of Birth',
      'Iraq',
      'Date of Birth',
      'Sex',
      '16 DEC 1957 M',
      'Card Expires:',
      '09/12/27',
      'Signature Waived',
      'Resident Since:',
      '04/15/15',
      '6 - 1673',
    ],
  };

  // The Arizona Driver License processor should return true
  expect(processor.matcher(ocr.keyValues, ocr.rawText)).toBe(true);

  const processedDocument = processDocument(ocr.keyValues, ocr.rawText);
  expect(processedDocument.documentType).toBe('Arizona\'s Driver License');
  expect(processedDocument.extracted.first_name).toBe('SDJFLS');
  expect(processedDocument.extracted.last_name).toBe(undefined);
  expect(processedDocument.extracted.street_address_line_1).toBe('1051');
  expect(processedDocument.extracted.street_address_line_2).toBe('');
  expect(processedDocument.extracted.city).toBe('PHOENIX');
  expect(processedDocument.extracted.state).toBe('AZ');
  expect(processedDocument.extracted.zip_code).toBe('1850219316');
  expect(processedDocument.extracted.issued_date).toBe('12/16/2022');
  expect(processedDocument.extracted.expiration_date).toBe(undefined);

  expect(processedDocument.extracted.bill_amount).toBe(undefined);
  expect(processedDocument.extracted.bill_date).toBe(undefined);
  expect(processedDocument.extracted.account_number).toBe(undefined);
});

it('document ocr id 229', async () => {
  const ocr = {
    keyValues: {
      '4b EXP ': '12/27/2021 ',
      '3 DOB ': '12/26/1990 ',
    },
    rawText: [
      'DRIVER LICENSE',
      'USA',
      'NOT FOR FEDERAL IDENTIFICATION',
      'LIMITED-TERM',
      '9 CLASS D',
      '4d DLN D12345678',
      '9a END NONE',
      '12 REST NONE',
      '3 DOB 12/26/1990',
      '1 SDF',
      '2 XCV',
      '8 2345 N FAKE OR',
      '4',
      'PHOENIX, AZ 85051-8214',
      '4b EXP 12/27/2021 4a ISS 08/02/2018',
      '15 SEX M',
      '13 EYES BRO',
      '16 HGT 5\'-01" 19 HAIR BLK',
      '17 WGT 120 lb',
      '12/26/90',
      '5 DD 1234MV123H1234TO',
    ],
  };

  // The Arizona Driver License processor should return true
  expect(processor.matcher(ocr.keyValues, ocr.rawText)).toBe(true);

  const processedDocument = processDocument(ocr.keyValues, ocr.rawText);
  expect(processedDocument.documentType).toBe('Arizona\'s Driver License');
  expect(processedDocument.extracted.first_name).toBe('XCV');
  expect(processedDocument.extracted.last_name).toBe('SDF');
  expect(processedDocument.extracted.street_address_line_1).toBe('2345 N FAKE OR');
  expect(processedDocument.extracted.street_address_line_2).toBe('4');
  expect(processedDocument.extracted.city).toBe('PHOENIX');
  expect(processedDocument.extracted.state).toBe('AZ');
  expect(processedDocument.extracted.zip_code).toBe('85051-8214');
  expect(processedDocument.extracted.issued_date).toBe('08/02/2018');
  expect(processedDocument.extracted.expiration_date).toBe('12/27/2021');

  expect(processedDocument.extracted.bill_amount).toBe(undefined);
  expect(processedDocument.extracted.bill_date).toBe(undefined);
  expect(processedDocument.extracted.account_number).toBe(undefined);
});

it('document ocr id 237', async () => {
  const ocr = {
    keyValues: { },
    rawText: [
      'trizona',
      'DRIVER LICENSE',
      'USA',
      'LIMITED TERM',
      'DLV-D12345678',
      'Dob^12/11/1975',
      'SLKDJF',
      'KLJSDLKFS',
      '1234 N FAKE AVE',
      'PHOENIX AZ 850092084',
      'BEXP 09/15/2028 4aliss 09/15/20201',
      '15 SPX M',
      '16',
      '16HHT 19 HAIR BLK',
      '17 WGT 124:lb',
      '12/11/75',
      'is DD 1254657D2J123455',
      '4',
      'the the',
      ';',
      'the the -',
    ],
  };

  // The Arizona Driver License processor should return true
  expect(processor.matcher(ocr.keyValues, ocr.rawText)).toBe(true);

  const processedDocument = processDocument(ocr.keyValues, ocr.rawText);
  expect(processedDocument.documentType).toBe('Arizona\'s Driver License');
  expect(processedDocument.extracted.first_name).toBe(undefined);
  expect(processedDocument.extracted.last_name).toBe(undefined);
  expect(processedDocument.extracted.street_address_line_1).toBe('1234 N FAKE AVE');
  expect(processedDocument.extracted.street_address_line_2).toBe('');
  expect(processedDocument.extracted.city).toBe('PHOENIX');
  expect(processedDocument.extracted.state).toBe('AZ');
  expect(processedDocument.extracted.zip_code).toBe('850092084');
  expect(processedDocument.extracted.issued_date).toBe('09/15/2020');
  expect(processedDocument.extracted.expiration_date).toBe('09/15/2028');

  expect(processedDocument.extracted.bill_amount).toBe(undefined);
  expect(processedDocument.extracted.bill_date).toBe(undefined);
  expect(processedDocument.extracted.account_number).toBe(undefined);
});

it('document ocr id 287', async () => {
  const ocr = {
    keyValues: { },
    rawText: [
      'DRIVER LICENSE',
      'USA',
      'NOT FOR FEDERAL IDENTIFICATION',
      'D',
      '. NONE',
      'B12345678',
      'ARST NONE',
      '01/01/1971',
      'AL-SLKCJ',
      'Tor',
      'SLKJDFD A J',
      '*',
      'R',
      '123 N FAKE ST APT 11',
      '..',
      'PHOENIX, AZ 85008-6455',
      'sh',
      'EXP',
      '01/01/2036',
      '02/01/2017',
      '16 SEX M',
      'BLK',
      'in HGT',
      '5\'-09" 19 HAIR BLK',
      '160 lb',
      '01/01/71',
      ': DO 1234C1234A1234M1',
    ],
  };

  // The Arizona Driver License processor should return true
  expect(processor.matcher(ocr.keyValues, ocr.rawText)).toBe(true);

  const processedDocument = processDocument(ocr.keyValues, ocr.rawText);
  expect(processedDocument.documentType).toBe('Arizona\'s Driver License');
  expect(processedDocument.extracted.first_name).toBe(undefined);
  expect(processedDocument.extracted.last_name).toBe(undefined);
  expect(processedDocument.extracted.street_address_line_1).toBe('..');
  expect(processedDocument.extracted.street_address_line_2).toBe('');
  expect(processedDocument.extracted.city).toBe('PHOENIX');
  expect(processedDocument.extracted.state).toBe('AZ');
  expect(processedDocument.extracted.zip_code).toBe('85008-6455');
  expect(processedDocument.extracted.issued_date).toBe(undefined);
  expect(processedDocument.extracted.expiration_date).toBe(undefined);

  expect(processedDocument.extracted.bill_amount).toBe(undefined);
  expect(processedDocument.extracted.bill_date).toBe(undefined);
  expect(processedDocument.extracted.account_number).toBe(undefined);
});

it('document ocr id 299', async () => {
  const ocr = {
    keyValues: { '4b EXP ': '02/09/2028 da 1ss.06/18/20:20 ' },
    rawText: [
      'Brizono',
      'DRIVER LICENSE',
      'USA',
      'NOT FOR FEDERAL IDENTIFICATION',
      'LIMITED-TERM',
      '9 CEASS/D',
      '4d DLN X84015795',
      '9a END NONE',
      '12 REST NONE',
      '3 boe 03/08/1986',
      '1 DARIEN',
      '2 HAMLET FARAD',
      '8 6189 W DOORTON DR',
      'APT 820',
      'PHOENIX. AZ Z850292660',
      '4b',
      'EXP 02/09/2028',
      'da 1ss.06/18/20:20',
      '15 SEX M',
      '18 EYES BRO',
      '16 HGT 5-04" 19 HAIR BRO',
      '17 WGT 150 IB',
      '03/08/86',
      '5 DD 02804315ZX13805',
    ],
  };

  expect(processor.matcher(ocr.keyValues, ocr.rawText)).toBe(true);

  const processedDocument = processDocument(ocr.keyValues, ocr.rawText);
  expect(processedDocument.documentType).toBe('Arizona\'s Driver License');
  expect(processedDocument.extracted.last_name).toBe('DARIEN');
  expect(processedDocument.extracted.first_name).toBe('HAMLET FARAD');
  expect(processedDocument.extracted.street_address_line_1).toBe('6189 W DOORTON DR');
  expect(processedDocument.extracted.street_address_line_2).toBe('APT 820');
  expect(processedDocument.extracted.city).toBe(undefined);
  expect(processedDocument.extracted.state).toBe(undefined);
  expect(processedDocument.extracted.zip_code).toBe(undefined);
  expect(processedDocument.extracted.issued_date).toBe(undefined);
  expect(processedDocument.extracted.expiration_date).toBe(undefined);

  expect(processedDocument.extracted.bill_amount).toBe(undefined);
  expect(processedDocument.extracted.bill_date).toBe(undefined);
  expect(processedDocument.extracted.account_number).toBe(undefined);
});
