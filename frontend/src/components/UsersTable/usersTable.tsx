import React from 'react'

import * as S from './styles'

import { User } from 'types/api'

type Props = {
  data: User[]
}

const UsersTable = ({ data }: Props) => (
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
      {data.map((user: User) => (
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
)

export default UsersTable
