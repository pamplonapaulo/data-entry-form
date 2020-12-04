import styled from 'styled-components'

export const Display = styled.section`
  display: flex;
  flex-direction: column;
  margin-top: 50px;
  max-height: 400px;
  overflow-y: scroll;
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

export const User = styled.div`
  align-content: flex-start;
  background: #ccc;
  border: 1px solid black;
  border-radius: 10px;
  color: black;
  display: flex;
  flex-flow: wrap;
  height: 400px;
  margin-bottom: 3rem;
  padding: 10px;
  width: 100%;
`

export const Wrapper = styled.div<{ isEmpty: boolean }>`
  display: ${(p) => (p.isEmpty ? 'none' : 'flex')};
  flex-direction: column;
  width: fit-content;
  text-align: left;
  margin: 5px 0;
`

export const Field = styled.div`
  color: black;
  background: #fff;
  border: 1px solid black;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  font-weight: 100;
  font-size: 2rem;
  list-style: none;
  margin: 0 5px;
  padding: 10px;
  text-transform: capitalize;
  justify-content: center;
  text-align: left;
`

export const Name = styled.h3`
  color: black;
  font-size: 1.2rem;
  font-weight: 100;
  margin-left: 5px;
  text-transform: capitalize;
`

export const Value = styled.h2`
  color: black;
  font-size: 1.3rem;
  font-weight: 300;
  min-height: 16px;
  padding: 0 5px;
`
