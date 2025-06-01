// utils/helpers.js

function formatUserName(firstName, lastName) {
  return `${firstName.trim()} ${lastName.trim()}`;
}

function calculateTax(amount, taxRate = 0.1) {
  return amount * taxRate;
}

module.exports = { formatUserName, calculateTax };
