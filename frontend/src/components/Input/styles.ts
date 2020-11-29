import styled from 'styled-components'

export const InputWrapper = styled.div<{ customWidth?: string }>`
  display: flex;
  flex-direction: column;
  margin-right: 5px;
  width: ${(p) => (p.customWidth ? p.customWidth : 'auto')};
`

export const Label = styled.label`
  color: #000;
  font-size: 15px;
  margin-bottom: 5px;
  text-align: left;
  min-height: 18px;
  white-space: nowrap;
`

export const Input = styled.input<{ customWidth?: string }>`
  border-color: #ccc;
  border-radius: 10px;
  border-width: 0;
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.6);
  font-size: 1.4rem;
  height: 35px;
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

export const SelectWrapper = styled.div`
  position: relative;

  &:after {
    content: 'V';
    font-family: sans-serif;
    font-weight: 800;
    position: absolute;
    top: 13px;
    right: 10px;
    z-index: 5;
    height: auto;
    font-size: 11px;
    color: #727272;
    transform: translateY(-30%);
    padding-right: 6px;
  }
`

export const Select = styled.select`
  height: 35px;
  outline-width: 0;
  margin-right: 5px;
  appearance: none;
  border-color: #ccc;
  border-radius: 10px;
  border-width: 1px;
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.6);
  outline-width: 0;
  margin-right: 5px;
  padding-left: 1rem;
  cursor: pointer;
`

export const TextArea = styled.textarea`
  border-color: #ccc;
  border-radius: 10px;
  border-width: 1px;
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.6);
  font-size: 1.5rem;
  height: 150px;
  outline-width: 0;
  padding: 10px;
  width: 300px;
`
