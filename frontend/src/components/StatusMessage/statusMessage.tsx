import React from 'react'

import * as S from './styles'

import { Requireds } from 'types/api'

type Props = {
  requireds: Requireds
}

const StatusMessage = ({ requireds }: Props) => {
  const formatFieldName = (name: string) => {
    const words = name.match(/[A-Z]+[^A-Z]*|[^A-Z]+/g)
    if (words) {
      return words.join(' ')
    } else {
      return name
    }
  }
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
        <S.ErrorMessage>Fields with error:</S.ErrorMessage>
      )}

      <S.List>
        {mapRequireds(requireds).map((name: string, i: number) => (
          <S.Item key={i}>{name}</S.Item>
        ))}
      </S.List>
    </S.Display>
  )
}

export default StatusMessage