import React from 'react'

import * as S from './styles'

type Props = {
  label?: string
  elementType?: string
  name: string
  type?: string
  options?: string[]
  placeholder?: string
  value?: string
  autoFocus?: boolean
  parentCallback: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void
  width?: string
}

const Input = ({
  label,
  elementType,
  name,
  type,
  options,
  placeholder,
  value,
  autoFocus,
  parentCallback,
  width
}: Props) => (
  <>
    <S.InputWrapper customWidth={width}>
      <S.Label>{label ? label : ' '}</S.Label>
      {!elementType && (
        <S.Input
          autoFocus={autoFocus}
          name={name}
          type={type}
          onChange={parentCallback}
          value={value}
          placeholder={placeholder}
          customWidth={width}
        />
      )}

      {elementType === 'textArea' && (
        <S.TextArea name={name} onChange={parentCallback} />
      )}

      {elementType === 'select' && (
        <S.SelectWrapper>
          <S.Select
            defaultValue={`Select Gender`}
            name="gender"
            onChange={parentCallback}
          >
            {options?.map((gender: string) => (
              <option
                key={gender}
                value={gender}
                disabled={gender == 'Select Gender' ? true : false}
              >
                {gender}
              </option>
            ))}
          </S.Select>
        </S.SelectWrapper>
      )}
    </S.InputWrapper>
  </>
)

export default Input
