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
  firstName: number
  surname: number
  email: number
  phone: number
  gender: number
  dateOfBirth: number
  comments: number
}

export type InputElement = {
  label: string
  elementType: string
  type?: string
  name: string
  widthSmall?: string
  width?: string
  options?: string[]
}

export type FieldElement = InputElement[]
