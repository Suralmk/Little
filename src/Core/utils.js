function log () {
  for (let i = 0; i < arguments.length; i++) {
    let arg = arguments[i]

    if (typeof arg === 'object') {
      arg = JSON.stringify(arg, null, 2)
    }
    console.log(arg)
  }
}
function validatePhoneNumber (phoneNumber) {
  const phoneRegex = /^\+?[1-9]\d{1,14}$/
  return phoneRegex.test(phoneNumber)
}

function validateEmail (email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}
export default { log, validateEmail, validatePhoneNumber }
