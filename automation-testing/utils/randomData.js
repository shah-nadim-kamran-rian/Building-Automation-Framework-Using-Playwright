function generateEmail() {
  return `user_${Date.now()}@mailtest.com`;
}

module.exports = { generateEmail };