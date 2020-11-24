import React, { useState, useEffect } from 'react'
import api from '../../services/api'
import * as S from './styles'

import { isEmailValid, isTextValid } from 'utils/formValidation'

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

  useEffect(() => {
    console.log(userData)
  }, [userData])

  const handleNext = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()

    if (step == 3) {
      handlePost()
      setStep(4)
    }
    if (step == 2) setStep(3)
    if (step == 1) setStep(2)
  }

  async function handlePost() {
    try {
      const response = await api.post('users', userData)
      console.log(`Id: ${response.data}`)
    } catch (err) {
      alert(`Error on saving, please try again.`)
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

    if (target.name === 'gender') {
      updateState(target)
    }

    if (target.name === 'phone') updateState(target, phoneMask(target.value))

    if (target.name === 'birthDay') dayMask(target)

    if (target.name === 'birthMonth') monthMask(target.value)

    if (target.name === 'birthYear') yearMask(target.value)

    if (target.name === 'comments' && isTextValid(target.value, 5000))
      updateState(target)
  }

  const phoneMask = (value: string) =>
    value
      .replace(/[\D+]/g, '')
      .replace(/(\+44|44|)(7|07)(\d)/, '07$3')
      .replace(/(\d{11})\d+?$/, '$1')

  const dayMask = (
    target: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  ) => {
    const stringNumber = target.value
      .replace(/(0)(\d{2})(\d+)/g, '$2')
      .replace(/^([0-3]\d|[1-9]\d{2,})$/g, '$1')

    const numberNumber = parseInt(stringNumber, 10)

    if (numberNumber > 0 && numberNumber < 32) {
      setDateOfBirth({
        ...dateOfBirth,
        birthDay: target.value
      })
      setUserData({
        ...userData,
        dateOfBirth:
          numberNumber.toString() +
          '/' +
          dateOfBirth.birthMonth +
          '/' +
          dateOfBirth.birthYear
      })
    }
  }

  const monthMask = (value: string) => {
    const stringNumber = value
      .replace(/(0)(\d{2})(\d+)/g, '$2')
      .replace(/^([0-1]\d|[1-9]\d{2,})$/g, '$1')

    const numberNumber = parseInt(stringNumber, 10)

    if (numberNumber > 0 && numberNumber < 13) {
      setDateOfBirth({
        ...dateOfBirth,
        birthMonth: numberNumber.toString()
      })
      setUserData({
        ...userData,
        dateOfBirth:
          dateOfBirth.birthDay +
          '/' +
          numberNumber.toString() +
          '/' +
          dateOfBirth.birthYear
      })
    }
  }

  const yearMask = (value: string) => {
    const numberNumber = parseInt(value, 10)

    if (value.length < 5 && numberNumber < new Date().getFullYear() - 18) {
      setDateOfBirth({
        ...dateOfBirth,
        birthYear: value
      })
      setUserData({
        ...userData,
        dateOfBirth:
          dateOfBirth.birthDay + '/' + dateOfBirth.birthMonth + '/' + value
      })
    }
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
                <option value="Select Gender">Select Gender</option>
                <option value="Male/ Man">Male/ Man</option>
                <option value="Female/ Woman">Female/ Woman</option>
                <option value="TransMale/ TransMan">TransMale/ TransMan</option>
                <option value="TransFemale/ TransWoman">
                  TransFemale/ TransWoman
                </option>
                <option value="Genderqueer/ Gender nonconforming">
                  Genderqueer/ Gender nonconforming
                </option>
                <option value="Something Else">Something Else</option>
                <option value="Decline to Answer">Decline to Answer</option>
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
    </S.Wrapper>
  )
}

export default Main
