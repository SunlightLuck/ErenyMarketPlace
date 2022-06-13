import React, { useRef } from 'react'
import styled from 'styled-components'

const Modal = (props: any) => {
  const priceRef = useRef<HTMLInputElement>(null);
  const commoditizeHandler = () => {
    const price = priceRef.current?.value;
    if(price === "") {
      return alert("Input Price")
    }
    props.commoditize(price);
  }
  return (props.show ? 
    <>
      <Overlay onClick={props.close}></Overlay>
      <Container>
        <Image>
          <img src={props.image}></img>
        </Image>
        <Form>
          <div>
            <input type='text' ref={priceRef}></input>
          </div>
          <button onClick={commoditizeHandler}>Commoditize</button>
        </Form>
      </Container>
    </> : null
  )
}

const Container = styled.div`
  height: 150px;
  background-color: white;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
  display: flex;
  align-items: center;
  padding: 20px;
  z-index: 1000;
`
const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  background-color: rgba(0, 0, 0, .7);
`
const Image = styled.div`
  height: 100%;
  border: 1px solid #ccc;
  > img {
    height: 100%;
  }
`
const Form = styled.div`
  margin-left: 20px;
  div {
    margin-bottom: 20px;
  }
  input {
    width: 150px;
  }
`

export default Modal;