import React, { useState } from 'react'
import api from '../../services/api'
import { Users, User } from '../../types/api'

import * as S from './styles'

import { isEmailValid, isTextValid, phoneMask } from 'utils/formValidation'

const Main = () => {
  const [step, setStep] = useState(1)

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

    if (step == 2) {
      setStep(3)
      setUserData({
        ...userData,
        dateOfBirth:
          dateOfBirth.birthDay +
          '/' +
          dateOfBirth.birthMonth +
          '/' +
          dateOfBirth.birthYear
      })
    }

    if (step == 1) setStep(2)
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

    if (target.name === 'firstName' && isTextValid(target.value, 100))
      updateState(target)

    if (target.name === 'surname' && isTextValid(target.value, 100))
      updateState(target)

    if (target.name === 'email' && isEmailValid(target.value))
      updateState(target)

    if (target.name === 'gender') updateState(target)

    if (target.name === 'phone') updateState(target, phoneMask(target.value))

    if (target.name === 'birthDay') dayMask(target)

    if (target.name === 'birthMonth') monthMask(target)

    if (target.name === 'birthYear') yearMask(target)

    if (target.name === 'comments' && isTextValid(target.value, 5000))
      updateState(target)
  }

  const dayMask = (
    target: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  ) => {
    const stringNumber = target.value
      .replace(/(0)(\d{2})(\d+)/g, '$2')
      .replace(/^([0-3]\d|[1-9]\d{2,})$/g, '$1')

    const numberNumber = parseInt(stringNumber, 10)

    if (numberNumber > 0 && numberNumber < 32) {
      updateDateOfBirth(target)
    }
  }

  const monthMask = (
    target: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  ) => {
    const stringNumber = target.value
      .replace(/(0)(\d{2})(\d+)/g, '$2')
      .replace(/^([0-1]\d|[1-9]\d{2,})$/g, '$1')

    const numberNumber = parseInt(stringNumber, 10)

    if (numberNumber > 0 && numberNumber < 13) {
      updateDateOfBirth(target)
    }
  }

  const yearMask = (
    target: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  ) => {
    const numberNumber = parseInt(target.value, 10)

    if (
      target.value.length < 5 &&
      numberNumber < new Date().getFullYear() - 18
    ) {
      updateDateOfBirth(target)
    }
  }

  const updateDateOfBirth = (
    target: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement,
    value?: string
  ) => {
    setDateOfBirth({
      ...dateOfBirth,
      [target.name]: value ? value : target.value
    })
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

  return (
    <S.Wrapper>
      <S.Step>
        <S.Form isOpened={step == 1}>
          <S.Header>Step 1: Your details</S.Header>
          <S.Field>
            <S.InputWrapper>
              <S.Label>First Name</S.Label>
              <S.Input
                autoFocus
                name="firstName"
                type="text"
                onChange={handleInputChange}
                value={userData.firstName}
              />
            </S.InputWrapper>
            <S.InputWrapper>
              <S.Label>Surname</S.Label>
              <S.Input
                name="surname"
                type="text"
                onChange={handleInputChange}
                value={userData.surname}
              />
            </S.InputWrapper>
          </S.Field>

          <S.Field>
            <S.InputWrapper>
              <S.Label>Email Adress:</S.Label>
              <S.Input
                name="email"
                type="email"
                onChange={handleInputChange}
                customWidth={'300px'}
              />
            </S.InputWrapper>
          </S.Field>

          <S.Button onClick={(e) => handleNext(e)}>{'Next >'}</S.Button>
        </S.Form>
      </S.Step>

      <S.Step>
        <S.Form isOpened={step == 2}>
          <S.Header>Step 2: More comments</S.Header>
          <S.Field>
            <S.InputWrapper>
              <S.Label>Telephone number</S.Label>
              <S.Input
                name="phone"
                onChange={handleInputChange}
                value={userData.phone}
              />
            </S.InputWrapper>
            <S.InputWrapper>
              <S.Label>Gender</S.Label>
              <S.Select name="gender" onChange={handleInputChange}>
                {genders.map((gender: string) => (
                  <option key={gender} value={gender}>
                    {gender}
                  </option>
                ))}
              </S.Select>
            </S.InputWrapper>
          </S.Field>

          <S.Field>
            <S.InputWrapper>
              <S.Label>Date of birth</S.Label>
              <S.InLine>
                <S.Input
                  name="birthDay"
                  type="number"
                  placeholder="DD"
                  customWidth={'55px'}
                  onChange={handleInputChange}
                  value={dateOfBirth.birthDay}
                />
                <S.Input
                  name="birthMonth"
                  type="number"
                  placeholder="MM"
                  customWidth={'55px'}
                  onChange={handleInputChange}
                  value={dateOfBirth.birthMonth}
                />
                <S.Input
                  name="birthYear"
                  type="number"
                  placeholder="YYYY"
                  customWidth={'80px'}
                  onChange={handleInputChange}
                  value={dateOfBirth.birthYear}
                />
              </S.InLine>
            </S.InputWrapper>
          </S.Field>

          <S.Button onClick={(e) => handleNext(e)}>{'Next >'}</S.Button>
        </S.Form>
      </S.Step>

      <S.Step>
        <S.Form isOpened={step == 3}>
          <S.Header>Step 3: Final comments</S.Header>
          <S.Field>
            <S.InputWrapper>
              <S.Label>Comments</S.Label>
              <S.TextArea name="comments" onChange={handleInputChange} />
            </S.InputWrapper>
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
    </S.Wrapper>
  )
}

export default Main
