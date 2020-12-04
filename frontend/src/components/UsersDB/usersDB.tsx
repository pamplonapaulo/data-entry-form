import React from 'react'

import * as S from './styles'

import { User } from 'types/api'
import { formatFieldName } from 'utils/formatFieldName'

type Props = {
  users: User[]
}

type field = {
  name: string
  value: string | undefined
}

const UsersDB = ({ users }: Props) => {
  const getKeys = (obj: User) => {
    const arr = []
    for (const [key, value] of Object.entries(obj)) {
      arr.push({
        name: formatFieldName(key),
        value: value
      })
    }
    return arr
  }

  return (
    <S.Display>
      {users.reverse().map((user: User) => (
        <S.User key={user.id}>
          {getKeys(user).map((field: field) => (
            <S.Wrapper isEmpty={!field.value} key={field.name}>
              <S.Name>{field.name}</S.Name>
              <S.Field>
                <S.Value>{field.value}</S.Value>
              </S.Field>
            </S.Wrapper>
          ))}
        </S.User>
      ))}
    </S.Display>
  )
}

export default UsersDB
