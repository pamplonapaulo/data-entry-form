import React from 'react'
import { useUser, useRequireds } from 'contexts'

import * as S from './styles'

import { User, Requireds, FieldElement, InputElement } from 'types/api'

import Input from 'components/Input'
import InputsBirthDay from 'components/InputsBirthDay'

type Props = {
  status: number
  number: number
  title: string
  elements: FieldElement[]
  callBackInputChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void
  callBackInputBlur: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void
  callBackNextBtn: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

const Step = ({
  status,
  number,
  title,
  elements,
  callBackInputChange,
  callBackInputBlur,
  callBackNextBtn
}: Props) => {
  const { userData } = useUser()
  const { requireds } = useRequireds()

  const getKeyValue = (props: Requireds | User, name: string) => {
    for (const [key, value] of Object.entries(props)) {
      if (key === name) return value
    }
  }

  return (
    <S.Step>
      <S.Form isOpened={status == number}>
        <S.Header>
          Step {number}: {title}
        </S.Header>
        {elements.map((field: FieldElement, i: number) => (
          <S.Field key={i}>
            {field.map((input: InputElement) => {
              if (input.elementType === 'birthday') {
                return <InputsBirthDay key={input.elementType} />
              } else {
                return (
                  <Input
                    key={input.name}
                    label={input.label}
                    elementType={input.elementType}
                    type={input.type}
                    name={input.name}
                    width={input.width}
                    widthSmall={100 / field.length - field.length + '%'}
                    showAlert={getKeyValue(requireds, input.name)}
                    parentBlurCallback={callBackInputBlur}
                    parentCallback={callBackInputChange}
                    value={getKeyValue(userData, input.name)}
                    options={input.options}
                  />
                )
              }
            })}
          </S.Field>
        ))}

        <S.Button onClick={(e) => callBackNextBtn(e)}>{'Next >'}</S.Button>
      </S.Form>
    </S.Step>
  )
}

export default Step
