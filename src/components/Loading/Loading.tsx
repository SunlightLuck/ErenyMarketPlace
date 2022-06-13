import React from 'react'
import styled from 'styled-components'

const Loading = () => {
  return (
    <Container>
      <Spinner />
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
`
const Spinner = styled.div`
margin: 0 auto;
  width: 80px;
  height: 80px;
  border: 10px solid #9c9c9c;
  border-right: 10px solid #5c2fff;
  border-radius: 50%;
  animation: rotate 1s infinite linear;
  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`
export default Loading;