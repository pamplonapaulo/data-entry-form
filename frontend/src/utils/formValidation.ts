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
