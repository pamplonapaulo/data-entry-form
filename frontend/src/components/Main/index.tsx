import React, { useState } from 'react'
import api from 'services/api'
import { User } from 'types/api'

import Input from 'components/Input'

import * as S from './styles'

import {
  isEmailValid,
  isTextValid,
  phoneMask,
  isPhoneValid,
  isGenderValid,
  isDayValid,
  isMonthValid,
  isYearValid,
  isDateValid
} from 'utils/formValidation'

const Main = () => {
  const [step, setStep] = useState(1)
  const [statusMessage, setStatusMessage] = useState('')
  const [userData, setUserData] = useState({
    firstName: '',
    surname: '',
    email: '',
    phone: '',
    gender: '',
    dateOfBirth: '',
    comments: ''
  })
  const [dateOfBirth, setDateOfBirth] = useState({
    birthDay: '',
    birthMonth: '',
    birthYear: ''
  })
  const [users, setUsers] = useState([])
  const [requireds, setRequireds] = useState({
    firstName: false,
    surname: false,
    email: false,
    phone: false,
    gender: false,
    dateOfBirth: false
  })

  const dateValidation = (bool: boolean) => {
    setRequireds({
      ...requireds,
      dateOfBirth: bool
    })
  }

  const genders = [
    'Select Gender',
    'Male/ Man',
    'Female/ Woman',
    'TransMale/ TransMan',
    'TransFemale/ TransWoman',
    'Genderqueer/ Gender nonconforming',
    'Something Else',
    'Decline to Answer'
  ]

  const handleNext = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()

    if (step == 3) {
      handlePost()
    }

    if (
      step == 2 &&
      requireds.gender === true &&
      requireds.dateOfBirth === true &&
      requireds.phone === true
    ) {
      setStep(3)
    } else if (step == 2) {
      setStatusMessage(
        `Fields with error:
          ${!requireds.gender ? ' Gender ' : ''}
          ${!requireds.phone ? ' Telephone number ' : ''}
          ${!requireds.dateOfBirth ? ' Date Of Birth ' : ''}
          `
      )
    }

    if (
      step == 1 &&
      requireds.firstName === true &&
      requireds.surname === true &&
      requireds.email === true
    ) {
      setStep(2)
    } else if (step == 1) {
      setStatusMessage(
        `Fields with error:
          ${!requireds.firstName ? ' First Name ' : ''}
          ${!requireds.surname ? ' Surname ' : ''}
          ${!requireds.email ? ' Email ' : ''}
          `
      )
    }
  }

  async function handlePost() {
    try {
      const response = await api.post('users', userData)
      console.log(response)
      setStep(4)
      handleGet()
    } catch (err) {
      alert(`Error on saving, please try again.`)
    }
  }

  async function handleGet() {
    try {
      const response = await api.get('users')
      console.log('Loading data...')
      console.log(response)
      setUsers(response.data)
    } catch (err) {
      alert('Error on loading')
    }
  }

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const target = e.target

    if (target.name === 'firstName' && isTextValid(target.value, 100)) {
      setRequireds({ ...requireds, firstName: true })
      updateState(target)
    }

    if (target.name === 'surname' && isTextValid(target.value, 100)) {
      setRequireds({ ...requireds, surname: true })
      updateState(target)
    }

    if (target.name === 'email' && isEmailValid(target.value)) {
      setRequireds({ ...requireds, email: true })
      updateState(target)
    }

    if (target.name === 'gender' && isGenderValid(target.value, genders)) {
      setRequireds({ ...requireds, gender: true })
      updateState(target)
    }

    if (target.name === 'phone') {
      updateState(target, phoneMask(target.value))
      isPhoneValid(phoneMask(target.value))
        ? setRequireds({ ...requireds, phone: true })
        : setRequireds({ ...requireds, phone: false })
    }

    if (target.name === 'birthDay' && isDayValid(target.value))
      updateBirthState(target)

    if (target.name === 'birthMonth' && isMonthValid(target.value))
      updateBirthState(target)

    if (target.name === 'birthYear' && isYearValid(target.value))
      updateBirthState(target)

    if (target.name === 'comments' && isTextValid(target.value, 5000))
      updateState(target)
  }

  const updateState = (
    target: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement,
    value?: string
  ) => {
    setUserData({
      ...userData,
      [target.name]: value ? value : target.value
    })
  }

  const updateBirthState = (
    target: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement,
    value?: string
  ) => {
    setDateOfBirth({
      ...dateOfBirth,
      [target.name]: value ? value : target.value
    })

    updateDateOfBirth(target.name, target.value)
  }

  const mountDateString = (day: string, month: string, year: string) => {
    return `${month.length == 2 ? month : '0' + month}/${
      day.length == 2 ? day : '0' + day
    }/${year}`
  }

  const updateDateOfBirth = (dateField: string, dateValue: string) => {
    let dateString = ''

    if (dateField === 'birthDay') {
      dateString = mountDateString(
        dateValue,
        dateOfBirth.birthMonth,
        dateOfBirth.birthYear
      )
    }

    if (dateField === 'birthMonth') {
      dateString = mountDateString(
        dateOfBirth.birthDay,
        dateValue,
        dateOfBirth.birthYear
      )
    }

    if (dateField === 'birthYear') {
      dateString = mountDateString(
        dateOfBirth.birthDay,
        dateOfBirth.birthMonth,
        dateValue
      )
    }

    const isValid = isDateValid(dateString)

    if (dateString.length == 10 && isValid) {
      dateValidation(true)
      dateString =
        dateString.substr(3, 2) +
        '/' +
        dateString.substr(0, 2) +
        '/' +
        dateString.substr(6, 4)

      setUserData({
        ...userData,
        dateOfBirth: dateString
      })
    } else {
      dateValidation(false)
    }
  }

  return (
    <S.Wrapper>
      <S.Step>
        <S.Form isOpened={step == 1}>
          <S.Header>Step 1: Your details</S.Header>
          <S.Field>
            <Input
              label="First Name"
              autoFocus={true}
              name="firstName"
              type="text"
              parentCallback={handleInputChange}
              value={userData.firstName}
            />
            <Input
              label="Surname"
              name="surname"
              type="text"
              parentCallback={handleInputChange}
              value={userData.surname}
            />
          </S.Field>

          <S.Field>
            <Input
              label="Email Address"
              name="email"
              type="email"
              parentCallback={handleInputChange}
              width={'300px'}
            />
          </S.Field>

          <S.Button onClick={(e) => handleNext(e)}>{'Next >'}</S.Button>
        </S.Form>
      </S.Step>

      <S.Step>
        <S.Form isOpened={step == 2}>
          <S.Header>Step 2: More comments</S.Header>
          <S.Field>
            <Input
              label="Telephone number"
              name="phone"
              parentCallback={handleInputChange}
              value={userData.phone}
            />
            <Input
              label="Gender"
              elementType="select"
              name="gender"
              options={genders}
              parentCallback={handleInputChange}
              value={userData.phone}
            />
          </S.Field>

          <S.Field>
            <Input
              label="Date of birth"
              name="birthDay"
              type="number"
              parentCallback={handleInputChange}
              placeholder="DD"
              width={'55px'}
              value={dateOfBirth.birthDay}
            />
            <Input
              name="birthMonth"
              type="number"
              parentCallback={handleInputChange}
              placeholder="MM"
              width={'55px'}
              value={dateOfBirth.birthMonth}
            />
            <Input
              name="birthYear"
              type="number"
              parentCallback={handleInputChange}
              placeholder="YYYY"
              width={'80px'}
              value={dateOfBirth.birthYear}
            />
          </S.Field>

          <S.Button onClick={(e) => handleNext(e)}>{'Next >'}</S.Button>
        </S.Form>
      </S.Step>

      <S.Step>
        <S.Form isOpened={step == 3}>
          <S.Header>Step 3: Final comments</S.Header>
          <S.Field>
            <Input
              label="Comments"
              elementType="textArea"
              name="comments"
              parentCallback={handleInputChange}
            />
          </S.Field>

          <S.Button onClick={(e) => handleNext(e)}>{'Next >'}</S.Button>
        </S.Form>
      </S.Step>

      {step == 4 && (
        <S.Display>
          <table>
            <thead>
              <S.TableRow>
                <S.TableHeader>Id</S.TableHeader>
                <S.TableHeader>First name</S.TableHeader>
                <S.TableHeader>Surname</S.TableHeader>
                <S.TableHeader>Email</S.TableHeader>
                <S.TableHeader>Phone</S.TableHeader>
                <S.TableHeader>Gender</S.TableHeader>
                <S.TableHeader>Date of birth</S.TableHeader>
                <S.TableHeader>Comments</S.TableHeader>
              </S.TableRow>
            </thead>
            <tbody>
              {users.map((user: User) => (
                <S.TableRow key={user.id}>
                  <S.TableData>{user.id}</S.TableData>
                  <S.TableData>{user.firstName}</S.TableData>
                  <S.TableData>{user.surname}</S.TableData>
                  <S.TableData>{user.email}</S.TableData>
                  <S.TableData>{user.phone}</S.TableData>
                  <S.TableData>{user.gender}</S.TableData>
                  <S.TableData>{user.dateOfBirth}</S.TableData>
                  <S.TableData>{user.comments}</S.TableData>
                </S.TableRow>
              ))}
            </tbody>
          </table>
        </S.Display>
      )}
      {statusMessage.length > 0 && (
        <S.Display>
          <h1>{statusMessage}</h1>
        </S.Display>
      )}
    </S.Wrapper>
  )
}

export default Main
