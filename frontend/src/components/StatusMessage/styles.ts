import styled from 'styled-components'

export const Display = styled.section`
  margin-top: 10px;
  overflow-y: scroll;
  max-height: 400px;
  width: 100%;

  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  @media only screen and (min-width: 1024px) {
    width: 75%;
  }
`

export const ErrorMessage = styled.h1`
  border-radius: 10px;
  color: red;
  font-weight: 100;
  font-size: 2.5rem;
  padding: 10px;
  text-align: left;
`

export const List = styled.ul`
  padding: 5px;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: end;
`

export const Item = styled.li`
  color: black;
  background: #fff;
  border: 1px solid red;
  border-radius: 10px;
  font-weight: 100;
  font-size: 2rem;
  height: 50px;
  list-style: none;
  margin: 0 5px;
  padding: 10px;
  text-transform: capitalize;
`
