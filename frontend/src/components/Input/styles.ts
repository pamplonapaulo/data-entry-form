import styled from 'styled-components'

export const InputWrapper = styled.div<{
  widthSmall?: string
  customWidth?: string
  dataName: string
}>`
  display: flex;
  flex-direction: column;
  width: ${(p) => (p.widthSmall ? p.widthSmall : 'auto')};

  @media only screen and (min-width: 1024px) {
    margin-right: 5px;
    width: ${(p) => (p.customWidth ? p.customWidth : 'auto')};
  }
`

export const Label = styled.label`
  color: #000;
  font-size: 15px;
  margin-bottom: 5px;
  text-align: left;
  min-height: 18px;
  white-space: nowrap;
`

export const Input = styled.input<{
  customWidth?: string
  showAlert?: number
}>`
  border-color: #ccc;
  border-radius: 10px;
  border-width: 0;
  box-shadow: inset 0 0 6px
    ${(p) => (p.showAlert === -1 ? 'red' : 'rgba(0, 0, 0, 0.6);')};
  background-image: radial-gradient(transparent, transparent, #ccc);
  font-size: 1.4rem;
  font: 400 13.3333px Arial;
  height: 35px;
  margin-right: 5px;
  outline-width: 0;
  padding: 10px;
  width: 100%;

  &::-webkit-input-placeholder {
    letter-spacing: 1px !important;
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

  @media only screen and (min-width: 1024px) {
    width: ${(p) => (p.customWidth ? p.customWidth : 'auto')};
  }
`

export const SelectWrapper = styled.div<{
  showAlert?: number
}>`
  position: relative;

  &:after {
    background-image: radial-gradient(transparent, transparent, #ccc);
    content: 'V';
    font-family: sans-serif;
    font-weight: 800;
    position: absolute;
    top: 0;
    right: 10px;
    z-index: 5;
    height: 100%;
    font-size: 11px;
    color: #727272;
    padding-right: 3px;
    background: red;
    transform: translate(9px, 0);
    width: 15px;
    border-radius: 0 10px 10px 0;
    background: #fff;
    box-shadow: inset 0 0 6px
    ${(p) => (p.showAlert === -1 ? 'red' : 'rgba(0, 0, 0, 0.6);')};
    display: flex;
    justify-content: center;
    align-items: center;
    pointer-events: none;
  }
`

export const Select = styled.select<{
  customWidth?: string
  showAlert?: number
}>`
  height: 35px;
  outline-width: 0;
  margin-right: 5px;
  appearance: none;
  border-color: #ccc;
  border-radius: 10px;
  border-width: 1px;
  box-shadow: inset 0 0 6px
    ${(p) => (p.showAlert === -1 ? 'red' : 'rgba(0, 0, 0, 0.6);')};
  outline-width: 0;
  margin-right: 5px;
  padding-left: 1rem;
  cursor: pointer;
  width: 100%;
`

export const TextArea = styled.textarea<{
  showAlert?: number
}>`
  border-color: #ccc;
  border-radius: 10px;
  border-width: 1px;
  box-shadow: inset 0 0 6px
    ${(p) => (p.showAlert === -1 ? 'red' : 'rgba(0, 0, 0, 0.6);')};
  font-size: 1.4rem;
  font: 400 13.3333px Arial;
  height: 150px;
  outline-width: 0;
  padding: 10px;
  width: 100%;

  @media only screen and (min-width: 1024px) {
    width: 300px;
  }
`
