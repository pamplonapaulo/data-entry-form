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
  parentBlurCallback?: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void
  widthSmall?: string
  width?: string
  showAlert?: number
}

const Input = ({
  label,
  elementType = 'input',
  name,
  type,
  options,
  placeholder,
  value,
  autoFocus,
  parentCallback,
  parentBlurCallback,
  widthSmall,
  width,
  showAlert
}: Props) => (
  <>
    <S.InputWrapper widthSmall={widthSmall} customWidth={width}>
      <S.Label>{label ? label : ' '}</S.Label>
      {elementType === 'input' && (
        <S.Input
          autoFocus={autoFocus}
          name={name}
          type={type ? type : 'text'}
          onChange={parentCallback}
          onBlur={parentBlurCallback}
          value={value}
          placeholder={placeholder}
          customWidth={width}
          showAlert={showAlert}
        />
      )}

      {elementType === 'textArea' && (
        <S.TextArea
          name={name}
          value={value}
          onChange={parentCallback}
          showAlert={showAlert}
        />
      )}

      {elementType === 'select' && (
        <S.SelectWrapper showAlert={showAlert}>
          <S.Select
            defaultValue={`Select Gender`}
            name="gender"
            onChange={parentCallback}
            showAlert={showAlert}
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
