import React, { useState } from 'react'
import { BDay } from 'types/api'
import Input from 'components/Input'
import { useRequireds, useUser } from 'contexts'

import {
  isDayValid,
  isMonthValid,
  isYearValid,
  validateFullDate,
  isDateValidNotReversed
} from '../../../../shared/formValidation'

const InputsBirthDay = () => {
  const [dateOfBirth, setDateOfBirth] = useState({
    birthDay: '',
    birthMonth: '',
    birthYear: ''
  })
  const { requireds, setRequireds } = useRequireds()
  const { userData, setUserData } = useUser()

  const handleBirthdayChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const target = e.target

    if (target.name === 'birthDay' && isDayValid(target.value))
      updateBirthState(target)

    if (target.name === 'birthMonth' && isMonthValid(target.value))
      updateBirthState(target)

    if (target.name === 'birthYear' && isYearValid(target.value))
      updateBirthState(target)
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

  const updateDateOfBirth = (dateField: string, dateValue: string) => {
    const bDay = {
      birthDay: dateOfBirth.birthDay,
      birthMonth: dateOfBirth.birthMonth,
      birthYear: dateOfBirth.birthYear,
      [dateField]: dateValue
    }
    const newString = reorderBirthString(mountBirthString(bDay))
    const isValid =
      isDateValidNotReversed(newString, validateFullDate) &&
      newString.length === 10

    if (isValid)
      setUserData({
        ...userData,
        dateOfBirth: newString
      })

    setRequireds({ ...requireds, dateOfBirth: isValid ? 1 : -1 })
  }

  const reorderBirthString = (date: string) =>
    date.substr(3, 2) + '/' + date.substr(0, 2) + '/' + date.substr(6, 4)

  const mountBirthString = (date: BDay) => {
    const dateString = `${
      date.birthDay.length == 2 ? date.birthDay : '0' + date.birthDay
    }/${
      date.birthMonth.length == 2 ? date.birthMonth : '0' + date.birthMonth
    }/${date.birthYear}`

    return dateString
  }

  return (
    <>
      <Input
        label="Date of birth"
        name="birthDay"
        type="number"
        showAlert={requireds.dateOfBirth}
        parentCallback={handleBirthdayChange}
        placeholder="DD"
        widthSmall="23%"
        width={'45px'}
        value={dateOfBirth.birthDay}
      />
      <Input
        name="birthMonth"
        type="number"
        showAlert={requireds.dateOfBirth}
        parentCallback={handleBirthdayChange}
        placeholder="MM"
        widthSmall="23%"
        width={'45px'}
        value={dateOfBirth.birthMonth}
      />
      <Input
        name="birthYear"
        type="number"
        showAlert={requireds.dateOfBirth}
        parentCallback={handleBirthdayChange}
        placeholder="YYYY"
        widthSmall="48%"
        width={'60px'}
        value={dateOfBirth.birthYear}
      />
    </>
  )
}

export default InputsBirthDay
