import styled from 'styled-components'

export const Step = styled.div`
  background-color: #fff;
  overflow: hidden;
  padding: 5px;
  width: 100%;

  &&:nth-of-type(1) {
    border-radius: 7px 7px 0 0;
  }

  &&:nth-of-type(3) {
    border-radius: 0 0 7px 7px;
  }

  @media only screen and (min-width: 1024px) {
    width: 75%;
  }
`

export const Form = styled.form<{ isOpened: boolean }>`
  background-color: ${(p) => (p.isOpened ? '#dedede' : 'transparent')};
  border-radius: 7px;
  display: flex;
  flex-direction: column;
  height: auto;
  min-height: 55px;
  max-height: ${(p) => (p.isOpened ? '600px' : '55px')};
  transition: all 0.9s ease;
  overflow: hidden;
`

export const Header = styled.h1`
  background-color: #f2b107;
  border-radius: 7px;
  font-weight: 200;
  font-size: 1.7rem;
  text-align: left;
  padding: 15px;
  text-shadow: 1px 1px rgba(0, 0, 0, 0.5);

  @media only screen and (min-width: 1024px) {
    font-size: 2rem;
  }
`

export const Field = styled.fieldset`
  border: none;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 10px;
  padding: 0 10px;

  @media only screen and (min-width: 1024px) {
    justify-content: end;
  }
`

export const Button = styled.button`
  align-self: flex-end;
  background-color: #655bb4;
  border-radius: 10px;
  border: none;
  color: #fff;
  cursor: pointer;
  height: 30px;
  margin: 10px;
  width: 100px;
  transition: all 0.2s ease;
  background-color: #655bb4;
  outline: none;

  &:hover {
    background-color: #28262c;
  }

  &:active {
    background-color: #655bb4;
  }
`
