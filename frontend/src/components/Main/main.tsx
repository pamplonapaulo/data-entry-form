import React, { useState } from 'react'
import api from 'services/api'
import { useRequireds, useUser } from 'contexts'

import UsersDB from 'components/UsersDB'
import ErrorMessage from 'components/ErrorMessage'
import Step from 'components/Step'

import * as S from './styles'

import { genders } from '../../../../shared/diversity'

import {
  isEmailValid,
  isTextValid,
  phoneMask,
  isPhoneValid,
  isGenderValid
} from '../../../../shared/formValidation'

const Main = () => {
  const [step, setStep] = useState(1)
  const [errorMessage, setErrorMessage] = useState(false)

  const { userData, setUserData } = useUser()

  const [users, setUsers] = useState([])

  const { requireds, setRequireds } = useRequireds()

  const handleNext = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()

    if (step == 3 && requireds.comments != -1) {
      handlePost()
    } else if (step == 3) {
      setErrorMessage(true)
    }

    if (
      step == 2 &&
      requireds.gender === 1 &&
      requireds.dateOfBirth === 1 &&
      requireds.phone === 1
    ) {
      setErrorMessage(false)
      setStep(3)
    } else if (step == 2) {
      setErrorMessage(true)
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
      setErrorMessage(false)
      setStep(2)
    } else if (step == 1) {
      setErrorMessage(true)
      setRequireds({
        ...requireds,
        firstName: requireds.firstName < 1 ? -1 : 1,
        surname: requireds.surname < 1 ? -1 : 1,
        email: requireds.email < 1 ? -1 : 1
      })
    }
  }

  async function handlePost() {
    console.log('try to post')
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

    if (target.name === 'gender') bool = isGenderValid(target.value, genders)

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
      <S.SubWrapper>
        <Step
          status={step}
          number={1}
          title={'Your details'}
          callBackInputChange={handleInputChange}
          callBackInputBlur={handleValidator}
          callBackNextBtn={handleNext}
          elements={[
            [
              {
                name: 'firstName',
                label: 'First Name',
                elementType: 'input'
              },
              {
                name: 'surname',
                label: 'Surname',
                width: '70%',
                elementType: 'input'
              }
            ],
            [
              {
                name: 'email',
                type: 'email',
                label: 'Email Address',
                width: '300px',
                elementType: 'input'
              }
            ]
          ]}
        />
        <Step
          status={step}
          number={2}
          title={'More comments'}
          callBackInputChange={handleInputChange}
          callBackInputBlur={handleValidator}
          callBackNextBtn={handleNext}
          elements={[
            [
              {
                name: 'phone',
                label: 'Telephone number',
                elementType: 'input'
              },
              {
                name: 'gender',
                label: 'Gender',
                elementType: 'select',
                options: genders
              }
            ],
            [
              {
                name: '',
                label: '',
                elementType: 'birthday'
              }
            ]
          ]}
        />
        <Step
          status={step}
          number={3}
          title={'Final comments'}
          callBackInputChange={handleInputChange}
          callBackInputBlur={handleValidator}
          callBackNextBtn={handleNext}
          elements={[
            [
              {
                name: 'comments',
                label: 'Comments',
                elementType: 'textArea'
              }
            ]
          ]}
        />
      </S.SubWrapper>
      <S.SubWrapper>
        {step == 4 && <UsersDB users={users} />}

        {errorMessage && <ErrorMessage requireds={requireds} />}
      </S.SubWrapper>
    </S.Wrapper>
  )
}

export default Main
