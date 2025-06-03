function validateForm(data) {
  const errors = {};

  if (!data.fullName || data.fullName.length < 3) {
    errors.fullName = "Full name must be at least 3 characters long.";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    errors.email = "Invalid email address.";
  }

  const phoneRegex = /^(?:\+98|98|0)?9\d{9}$/;
  if (!phoneRegex.test(data.phone)) {
    errors.phone = "Invalid phone number.";
  }
  const passwordRegex = /^[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,}$/;
  if (data.password.length < 8 || !passwordRegex.test(data.password)) {
    errors.password = "Password must be at least 8 characters long and only contain valid characters.";
  }

  if (data.password !== data.confirmPassword) {
    errors.confirmPassword = "Passwords do not match.";
  }

  const dobRegex = /^(19\d{2}|20\d{2})-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
  if (!data.dob || !dobRegex.test(data.dob)) {
    errors.dob = "Date of birth must be in MM/DD/YYYY format and year should be 1900 or later.";
  }

  if (!data.address || data.address.length < 5) {
    errors.address = "Address must be at least 5 characters long.";
  }

  return errors;
}

module.exports = {validateForm};