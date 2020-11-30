export type User = {
  id?: string
  firstName: string
  surname: string
  email: string
  phone: string
  gender: string
  dateOfBirth: string
  comments: string
}

export type BDay = {
  birthDay: string
  birthMonth: string
  birthYear: string
}

export type Requireds = {
  firstName: boolean
  surname: boolean
  email: boolean
  phone: boolean
  gender: boolean
  dateOfBirth: boolean
}
