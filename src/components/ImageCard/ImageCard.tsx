import { BigNumber } from 'ethers';
import React, { useState } from 'react'
import styled from 'styled-components'
import { useTokenContract } from '../../hooks/useContract';
import { useWeb3React } from '@web3-react/core';
import Modal from '../Modal/Modal';

const ImageCard = (props: any) => {
  const [modalOpen, setModalOpen] = useState(false);
  const contract = useTokenContract();
  const {account} = useWeb3React();

  const buyHandler = async () => {
    if(props.isMine) {
      return alert("It's yours");
    }
    const price = contract?.getTokenPrice(BigNumber.from(props.tokenId));
    contract?.buy(account, BigNumber.from(props.tokenId), {value: price});
  }

  const commoditizeHandler = async (price: any) => {
    console.log(price);
    await contract?.setToCommodity(account, BigNumber.from(props.tokenId), BigNumber.from(price));
  }

  return (
    <>
      <Container>
        <div>
          <img src={props.info.image} alt="Failed"></img>
        </div>
        <div>{props.info.name}</div>
        <div>{props.info.description}</div>
        {props.showMode !== 0 ?   
          <div className='overlay'>
            <a onClick={() => props.showMode === 1 ? setModalOpen(true) : buyHandler()}>{props.showMode === 1 ? 'Sale' : 'Buy'}</a>
          </div> : null
        }
      </Container>
      <Modal image={props.info.image} show={modalOpen} close={() => setModalOpen(false)} commoditize = {commoditizeHandler}></Modal>
    </>
  )
}

const Container = styled.div`
  width: 10%;
  user-select: none;
  background-color: #eee;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 10px;
  margin: 10px;
  font-size: 16px;
  position: relative;
  > div {
    width: 100%;
  }

  img {
    border: 1px solid #ccc;
    width: 100%;
  }

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    opacity: 0;
    transition: all .2s;
  }
  .overlay a {
    position: absolute;
    font-size: 20px;
    color: white;
    font-weight: bold;
    text-decoration: none;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    cursor: pointer;
    transition: all .2s;
  }
  .overlay a:hover {
    color: #ccc;
  }
  .overlay a:active {
    color: #eee;
  }
  :hover .overlay {
    opacity: 1;
  }
`

export default ImageCard