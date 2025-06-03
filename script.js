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

function getFormData() {
  return {
    fullName: document.getElementById('fullName').value.trim(),
    email: document.getElementById('email').value.trim(),
    phone: document.getElementById('phone').value.trim(),
    password: document.getElementById('password').value,
    confirmPassword: document.getElementById('confirmPassword').value,
    dob: document.getElementById('dob').value,
    address: document.getElementById('address').value.trim()
  };
}

function showErrors(errors) {
  document.querySelectorAll('span.error').forEach(el => el.textContent = '');
  document.querySelectorAll('input, textarea').forEach(el => el.classList.remove('invalid'));

  Object.keys(errors).forEach(key => {
    const span = document.getElementById(`error-${key}`);
    const field = document.getElementById(key);
    if (span) span.textContent = errors[key];
    if (field) field.classList.add('invalid');
  });
}

function validateSingleField(fieldName) {
  const data = getFormData();
  const errors = validateForm(data);

  const errorSpan = document.getElementById(`error-${fieldName}`);
  const field = document.getElementById(fieldName);

  if (errorSpan) errorSpan.textContent = errors[fieldName] || '';
  if (field) {
    if (errors[fieldName]) {
      field.classList.add('invalid');
    } else {
      field.classList.remove('invalid');
    }
  }
}

document.getElementById('signupForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const data = getFormData();
  const errors = validateForm(data);
  showErrors(errors);

  if (Object.keys(errors).length === 0) {
    alert('Form submitted successfully!');
  }
});

['fullName', 'email', 'phone', 'password', 'confirmPassword', 'dob', 'address'].forEach(fieldName => {
  const field = document.getElementById(fieldName);
  if (field) {
    field.addEventListener('input', () => validateSingleField(fieldName));
  }
});
