module.exports = (processed) => {
  const validated = {};
  const { type } = processed;
  const errors = [];

  // TODO: Move this to the documentType so that it defines what it views as required
  const requiredFields = [
    'type',
    'first_name',
    'last_name',
    'street_address_line_1',
    'street_address_line_2',
    'city',
    'state',
    'zip_code',
  ];

  if (type === 'Arizona\'s Driver License') {
    // Driver license requires expiration and issued date
    requiredFields.push('issued_date', 'expiration_date');
  }

  if (type === 'APS' || type === 'City of Phoenix Water' || type === 'Southwest Gas' || type === 'SRP') {
    // bills require these too
    requiredFields.push('bill_amount', 'bill_date', 'account_number');
  }

  requiredFields.forEach((field) => {
    if (Object.hasOwnProperty.call(processed, field)
      && processed[field]
      && processed[field].length) {
      // some data normalization could be applied
      validated[field] = processed[field];
    } else {
      errors.push(field);
      validated[field] = '';
    }
  });

  if (errors.length) {
    validated.errors = errors;
  }

  return validated;
};
