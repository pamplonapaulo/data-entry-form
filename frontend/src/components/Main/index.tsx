import React, { useState } from 'react'
import api from 'services/api'
import { User } from 'types/api'
import { useRequireds, useUser } from 'contexts'

import Input from 'components/Input'
import InputsBirthDay from 'components/InputsBirthDay'

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
    ) {
      bool = isTextValid(
        target.value,
        target.name === 'comments' ? 0 : 2,
        target.name === 'comments' ? 5000 : 100
      )
    }

    if (target.name === 'email') {
      bool = isEmailValid(target.value)
    }

    if (target.name === 'phone') {
      bool = isPhoneValid(target.value)
    }

    if (target.name === 'gender') {
      bool = isGenderValid(target.value)
    }

    setRequireds({ ...requireds, [target.name]: bool })
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
              type="text"
              showAlert={!requireds.firstName}
              parentBlurCallback={handleValidator}
              parentCallback={handleInputChange}
              value={userData.firstName}
            />
            <Input
              label="Surname"
              name="surname"
              type="text"
              showAlert={!requireds.surname}
              parentBlurCallback={handleValidator}
              parentCallback={handleInputChange}
              value={userData.surname}
            />
          </S.Field>

          <S.Field>
            <Input
              label="Email Address"
              name="email"
              type="email"
              showAlert={!requireds.email}
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
