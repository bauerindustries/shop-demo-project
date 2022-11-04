function isEmpty(value) {
  return !value || value.trim() === '';
}

function userCredentialsAreValid(email, password) {
  return email && email.includes('@') && password.trim().length >= 5;
}

function userDetailsAreValid(email, password, name, street, city, postcode) {
  return (
    userCredentialsAreValid(email, password) &&
    !isEmpty(name) &&
    !isEmpty(street) &&
    !isEmpty(city) &&
    !isEmpty(postcode)
  );
}

function emailIsConfirmed(email, confirmedEmail) {
  return email === confirmedEmail;
}

module.exports = {
  userDetailsAreValid: userDetailsAreValid,
  emailIsConfirmed: emailIsConfirmed,
};
