import React, { useState } from 'react'
import api from 'services/api'
import { useRequireds, useUser } from 'contexts'

import Input from 'components/Input'
import InputsBirthDay from 'components/InputsBirthDay'
import UsersTable from 'components/UsersTable'

import * as S from './styles'

import {
  isEmailValid,
  isTextValid,
  phoneMask,
  isPhoneValid,
  isGenderValid
} from '../../../../shared/formValidation'

const Main = () => {
  const [step, setStep] = useState(1)
  const [statusMessage, setStatusMessage] = useState('')

  const { userData, setUserData } = useUser()

  const [users, setUsers] = useState([])

  const { requireds, setRequireds } = useRequireds()

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

    if (step == 3 && requireds.comments >= 0) handlePost()

    if (
      step == 2 &&
      requireds.gender === 1 &&
      requireds.dateOfBirth === 1 &&
      requireds.phone === 1
    ) {
      setStatusMessage('')
      setStep(3)
    } else if (step == 2) {
      setStatusMessage(
        `Fields with error:
          ${requireds.gender < 1 ? ' Gender ' : ''}
          ${requireds.phone < 1 ? ' Telephone number ' : ''}
          ${requireds.dateOfBirth < 1 ? ' Date Of Birth ' : ''}
          `
      )
      setRequireds({
        ...requireds,
        gender: requireds.gender < 1 ? -1 : 1,
        phone: requireds.phone < 1 ? -1 : 1,
        dateOfBirth: requireds.dateOfBirth < 1 ? -1 : 1
      })
    }

    if (
      step == 1 &&
      requireds.firstName === 1 &&
      requireds.surname === 1 &&
      requireds.email === 1
    ) {
      setStatusMessage('')
      setStep(2)
    } else if (step == 1) {
      setStatusMessage(
        `Fields with error:
          ${requireds.firstName < 1 ? ' First Name ' : ''}
          ${requireds.surname < 1 ? ' Surname ' : ''}
          ${requireds.email < 1 ? ' Email ' : ''}
          `
      )
      setRequireds({
        ...requireds,
        firstName: requireds.firstName < 1 ? -1 : 1,
        surname: requireds.surname < 1 ? -1 : 1,
        email: requireds.email < 1 ? -1 : 1
      })
    }
  }

  async function handlePost() {
    try {
      const response = await api.post('users', userData)
      console.log(response)
      handleGet()
      setStep(4)
    } catch (err) {
      alert(`Error on saving, please try again.`)
      console.log(err)
    }
  }

  async function handleGet() {
    try {
      const response = await api.get('users')
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

    if (target.name === 'phone') {
      updateState(target, phoneMask(target.value))
    } else {
      updateState(target)
    }

    handleValidator(e)
  }

  const handleValidator = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const target = e.target

    let bool

    if (
      target.name === 'firstName' ||
      target.name === 'surname' ||
      target.name === 'comments'
    )
      bool = isTextValid(
        target.value,
        target.name === 'comments' ? 0 : 2,
        target.name === 'comments' ? 5000 : 100
      )

    if (target.name === 'email') bool = isEmailValid(target.value)

    if (target.name === 'phone') bool = isPhoneValid(target.value)

    if (target.name === 'gender') bool = isGenderValid(target.value)

    console.log(target.name)
    console.log(bool)

    setRequireds({ ...requireds, [target.name]: bool ? 1 : -1 })
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
            <Input
              label="First Name"
              autoFocus={true}
              name="firstName"
              widthSmall="48%"
              width="auto"
              type="text"
              showAlert={requireds.firstName}
              parentBlurCallback={handleValidator}
              parentCallback={handleInputChange}
              value={userData.firstName}
            />
            <Input
              label="Surname"
              name="surname"
              widthSmall="48%"
              width="70%"
              type="text"
              showAlert={requireds.surname}
              parentBlurCallback={handleValidator}
              parentCallback={handleInputChange}
              value={userData.surname}
            />
          </S.Field>

          <S.Field>
            <Input
              label="Email Address"
              name="email"
              widthSmall="100%"
              type="email"
              showAlert={requireds.email}
              parentBlurCallback={handleValidator}
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
              widthSmall="48%"
              name="phone"
              showAlert={requireds.phone}
              parentCallback={handleInputChange}
              value={userData.phone}
            />
            <Input
              label="Gender"
              elementType="select"
              widthSmall="48%"
              name="gender"
              options={genders}
              showAlert={requireds.gender}
              parentCallback={handleInputChange}
              value={userData.phone}
            />
          </S.Field>

          <S.Field>
            <InputsBirthDay />
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
              type="text"
              name="comments"
              widthSmall="100%"
              showAlert={requireds.comments}
              parentCallback={handleInputChange}
              value={userData.comments}
            />
          </S.Field>

          <S.Button onClick={(e) => handleNext(e)}>{'Next >'}</S.Button>
        </S.Form>
      </S.Step>

      {step == 4 && (
        <S.Display>
          <UsersTable data={users} />
        </S.Display>
      )}
      {statusMessage.length > 0 && (
        <S.Display>
          <S.ErrorMessage>{statusMessage}</S.ErrorMessage>
        </S.Display>
      )}
    </S.Wrapper>
  )
}

export default Main
