module.exports = Object.freeze({
  isEmailValid: (email) => /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email),
  isTextValid: (text, minLength, maxLength) => {
    const regex = new RegExp(`^[a-z ,.'-]{` + minLength + `,` + maxLength + '}', 'i')
    return regex.test(text)
  },
  isGenderValid: (gender) => {
    const genders = [
      'Male/ Man',
      'Female/ Woman',
      'TransMale/ TransMan',
      'TransFemale/ TransWoman',
      'Genderqueer/ Gender nonconforming',
      'Something Else',
      'Decline to Answer'
    ]
    const match = (el) => el === gender

    return genders.some(match)
  },
  phoneMask: (value) =>
    value
      .replace(/[\D+]/g, '')
      .replace(/(\+44|44|)(7|07)(\d)/, '07$3')
      .replace(/(\d{11})\d+?$/, '$1'),
  isPhoneValid: (value) => {
    const number = value
    .replace(/[\D+]/g, '')
    .replace(/(\+44|44|)(7|07)(\d)/, '07$3')
    .replace(/(\d{11})\d+?$/, '$1')
  
    return number.length === 11
  },
  isDayValid: (value) => {
    const day = value
      .replace(/(0)(\d{2})(\d+)/g, '$2')
      .replace(/^([0-3]\d|[1-9]\d{2,})$/g, '$1')
  
    return parseInt(day, 10) > 0 && parseInt(day, 10) < 32
  },
  isMonthValid: (value) => {
    const month = value
      .replace(/(0)(\d{2})(\d+)/g, '$2')
      .replace(/^([0-1]\d|[1-9]\d{2,})$/g, '$1')
  
    return parseInt(month, 10) > 0 && parseInt(month, 10) < 13
  },
  isYearValid: (value) => {
    const year = parseInt(value, 10)
  
    return value.length < 5 && year < new Date().getFullYear() - 18
  },
  isDateValid: (dateStr, callbackOne, callbackTwo) => {
    const reversed = callbackOne(dateStr)
    callbackTwo(reversed)
  },
  isDateValidNotReversed: (dateStr, callback) => callback(dateStr),
  reverseDateString: (dateStr) => dateStr.substr(3, 2) + '/' + dateStr.substr(0, 2) + '/' + dateStr.substr(6, 4),
  validateFullDate: (dateStr) => {
    const dateObj = new Date(dateStr)
    const actualDate = dateObj.getDate()
    const actualMonth = dateObj.getMonth() + 1
    const actualFullYear = dateObj.getFullYear()
    const [strMonth, strDate, strFullYear] = dateStr.split('/').map(Number)
    console.log('validation shared file')
    console.log(
      strMonth === actualMonth &&
      strDate === actualDate &&
      strFullYear === actualFullYear
    )
    return (
      strMonth === actualMonth &&
      strDate === actualDate &&
      strFullYear === actualFullYear
    )
  }
});
