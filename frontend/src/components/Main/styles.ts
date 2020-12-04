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
  justify-content: end;

  @media only screen and (min-width: 1024px) {
    justify-content: center;
  }
`

export const SubWrapper = styled.div`
  align-items: center;
  width: 100%;
  justify-content: center;
  display: flex;
  flex-direction: column;
  justify-content: end;

  @media only screen and (min-width: 1024px) {
    height: 50%;
    justify-content: center;

    &&:nth-of-type(1) {
      justify-content: flex-end;
    }

    &&:nth-of-type(2) {
      justify-content: end;
    }
  }
`
