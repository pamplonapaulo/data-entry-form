import React from 'react'

import * as S from './styles'

import { Requireds } from 'types/api'
import { formatFieldName } from 'utils/formatFieldName'

type Props = {
  requireds: Requireds
}

const ErrorMessage = ({ requireds }: Props) => {
  const mapRequireds = (requireds: Requireds) => {
    const arr = []
    for (const [key, value] of Object.entries(requireds)) {
      if (value === -1) arr.push(formatFieldName(key))
    }
    return arr
  }

  return (
    <S.Display>
      {mapRequireds(requireds).length > 0 && (
        <S.Message>Fields with error:</S.Message>
      )}

      <S.List>
        {mapRequireds(requireds).map((name: string, i: number) => (
          <S.Item key={i}>{name}</S.Item>
        ))}
      </S.List>
    </S.Display>
  )
}

export default ErrorMessage
