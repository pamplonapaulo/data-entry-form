import styled from 'styled-components'

export const Wrapper = styled.main`
  color: #fff;
  margin: 0 auto;
  max-width: 900px;
  width: 100%;
  height: 100%;
  padding: 3rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const Step = styled.div`
  background-color: #fff;
  overflow: hidden;
  padding: 5px;
  width: 75%;

  &&:nth-of-type(1) {
    border-radius: 7px 7px 0 0;
  }

  &&:nth-of-type(3) {
    border-radius: 0 0 7px 7px;
  }
`

export const Form = styled.form<{ isOpened: boolean }>`
  background-color: #dedede;
  border-radius: 7px;
  display: flex;
  flex-direction: column;
  height: auto;
  min-height: 50px;
  max-height: ${(p) => (p.isOpened ? '600px' : '50px')};
  transition: max-height 0.6s ease;
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
  margin-top: 10px;
  padding: 0 10px;
`

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 10px;
`

export const InLine = styled.div`
  display: flex;
  flex-direction: row;
`

export const Label = styled.label`
  color: #000;
  font-size: 15px;
  margin-bottom: 5px;
  text-align: left;
`

export const Input = styled.input<{ customWidth?: string }>`
  border-color: #ccc;
  border-radius: 10px;
  border-width: 0;
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.6);
  font-size: 1.5rem;
  height: 30px;
  margin-right: 5px;
  outline-width: 0;
  padding: 10px;
  width: ${(p) => (p.customWidth ? p.customWidth : 'auto')};

  &::-webkit-input-placeholder {
    letter-spacing: 1.5px;
    font-weight: 400;
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 5px;
    text-align: center;
    padding: 0px;
  }

  /* Chrome, Safari, Edge, Opera */
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  &[type='number'] {
    text-align: center;
    -moz-appearance: textfield;
  }
`

export const Select = styled.select`
  border-color: #ccc;
  border-radius: 10px;
  border-width: 1px;
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.6);
  height: 30px;
  outline-width: 0;
  margin-right: 5px;
`

export const TextArea = styled.textarea`
  border-color: #ccc;
  border-radius: 10px;
  border-width: 1px;
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.6);
  font-size: 1.5rem;
  height: 150px;
  outline-width: 0;
  padding: 10px;
  width: 300px;
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

  &:hover {
    background-color: #28262C;
  }
`

export const Display = styled.section`
  background-color: #28262C;
  margin-top: 50px;
  width: 75%;
`

export const TableRow = styled.tr`
  background: #ccc;
  color: black;
  height: 30px;
`
export const TableHeader = styled.th`
  margin: 10px 0;
`

export const TableData = styled.td`
  padding: 0 5px;
`
