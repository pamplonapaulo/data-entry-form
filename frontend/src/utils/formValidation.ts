export const isEmailValid = (email: string) =>
  /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email)

export const isTextValid = (text: string, length: number) => {
  const regex = new RegExp(`^[a-z ,.'-]{1,` + length + '}', 'i')
  return regex.test(text)
}

export const phoneMask = (value: string) =>
  value
    .replace(/[\D+]/g, '')
    .replace(/(\+44|44|)(7|07)(\d)/, '07$3')
    .replace(/(\d{11})\d+?$/, '$1')

export const isPhoneValid = (value: string) => phoneMask(value).length === 11

export const isGenderValid = (gender: string, array: string[]) => {
  const match = (el: string) => el === gender
  return array.some(match)
}

export const isDayValid = (value: string) => {
  const day = value
    .replace(/(0)(\d{2})(\d+)/g, '$2')
    .replace(/^([0-3]\d|[1-9]\d{2,})$/g, '$1')

  return parseInt(day, 10) > 0 && parseInt(day, 10) < 32
}

export const isMonthValid = (value: string) => {
  const month = value
    .replace(/(0)(\d{2})(\d+)/g, '$2')
    .replace(/^([0-1]\d|[1-9]\d{2,})$/g, '$1')

  return parseInt(month, 10) > 0 && parseInt(month, 10) < 13
}

export const isYearValid = (value: string) => {
  const year = parseInt(value, 10)

  return value.length < 5 && year < new Date().getFullYear() - 18
}

export const isDateValid = (dateStr: string) => {
  const dateObj = new Date(dateStr)
  const actualDate = dateObj.getDate()
  const actualMonth = dateObj.getMonth() + 1 // months are from 0 to 11 in JS
  const actualFullYear = dateObj.getFullYear()
  const [strMonth, strDate, strFullYear] = dateStr.split('/').map(Number)

  return (
    strMonth === actualMonth &&
    strDate === actualDate &&
    strFullYear === actualFullYear
  )
}
