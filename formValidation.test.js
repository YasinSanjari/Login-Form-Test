const { validateForm } = require('./validation');

describe('Form Validation Tests', () => {
  test('Full name must be at least 3 characters', () => {
    const data = {
      fullName: 'A',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      dob: '',
      address: ''
    };
    expect(validateForm(data).fullName).toBe('Full name must be at least 3 characters long.');
  });

  test('Invalid email should be detected', () => {
    const data = {
      fullName: 'Ali',
      email: 'invalid@',
      phone: '',
      password: '',
      confirmPassword: '',
      dob: '',
      address: ''
    };
    expect(validateForm(data).email).toBe('Invalid email address.');
  });

  test('Invalid phone number should be detected', () => {
    const data = {
      fullName: 'Ali',
      email: 'a@a.com',
      phone: '123',
      password: '',
      confirmPassword: '',
      dob: '',
      address: ''
    };
    expect(validateForm(data).phone).toBe('Invalid phone number.');
  });

  test('Password must be at least 8 characters', () => {
    const data = {
      fullName: 'Ali',
      email: 'a@a.com',
      phone: '+989123456789',
      password: '123',
      confirmPassword: '123',
      dob: '',
      address: ''
    };
    expect(validateForm(data).password).toBe("Password must be at least 8 characters long and only contain valid characters.");
  });

  test('Password and confirmation must match', () => {
    const data = {
      fullName: 'Ali',
      email: 'a@a.com',
      phone: '+989123456789',
      password: '12345678',
      confirmPassword: '87654321',
      dob: '',
      address: ''
    };
    expect(validateForm(data).confirmPassword).toBe('Passwords do not match.');
  });

  test('Date of birth must be valid', () => {
    const data = {
      fullName: 'Ali',
      email: 'a@a.com',
      phone: '+989123456789',
      password: '12345678',
      confirmPassword: '12345678',
      dob: 'invalid-date',
      address: ''
    };
    expect(validateForm(data).dob).toBe("Date of birth must be in MM/DD/YYYY format and year should be 1900 or later.");
  });

  test('Address must be at least 5 characters', () => {
    const data = {
      fullName: 'Ali',
      email: 'a@a.com',
      phone: '+989123456789',
      password: '12345678',
      confirmPassword: '12345678',
      dob: '1990-01-01',
      address: 'Teh'
    };
    expect(validateForm(data).address).toBe('Address must be at least 5 characters long.');
  });

  test('Valid form should return no errors', () => {
    const data = {
      fullName: 'Ali Mohammadi',
      email: 'ali@example.com',
      phone: '+989123456789',
      password: 'pass1234!',
      confirmPassword: 'pass1234!',
      dob: '1995-02-20',
      address: 'Valiasr Street, Tehran'
    };
    expect(validateForm(data)).toEqual({});
  });
});