import { BigNumber } from 'ethers';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useTokenContract } from '../../hooks/useContract';
import {IPFSHTTPClient, create} from 'ipfs-http-client'
import {Buffer } from 'buffer'
import { useWeb3React } from '@web3-react/core';
import Modal from '../Modal/Modal';
import web3 from 'web3'

let ipfs: IPFSHTTPClient | undefined;

try {
  ipfs = create({url: "https://ipfs.infura.io:5001/api/v0"})
} catch (error) {
  console.log(error)
  ipfs = undefined
}

interface Props {
  tokenId: number;
  showMode: number;
}

const ImageCard : React.FC<Props> = (props) => {
  const [imageInfo, setImageInfo] = useState({
    name: "", description: "", image: "", alt: "Loading"
  });
  const [show, setShow] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const contract = useTokenContract();
  const {account} = useWeb3React();

  const getMetadata = async () => {
    try {
      const metadataURI = await contract?.tokenURI(BigNumber.from(props.tokenId));
      
      let content = [];
      for await(const chunk of (ipfs as IPFSHTTPClient).cat(metadataURI)) {
        content.push(Buffer.from(chunk.buffer));
      }
      const meta = JSON.parse(Buffer.concat(content).toString('utf-8'))
      setImageInfo(meta);
    } catch (err) {
      console.log(err);
      setImageInfo({
        name: "", description: "", image: "", alt: "Failed"
      })
    }
  }

  const isMine = async () => {
    const owner = await contract?.ownerOf(BigNumber.from(props.tokenId));
    return owner === account;
  }

  const isCommodity = async () => {
    const commodity = await contract?.isCommodity(BigNumber.from(props.tokenId));
    return commodity;
  }

  const sellHandler = async () => {
    const isOwner = await isMine();
    if(isOwner) {
      setModalOpen(true)
    } else {
      alert("not Mine");
    }
  }

  const buyHandler = async () => {
    const mine = await isMine();
    if(mine) {
      return alert("It's yours");
    }
    const price = contract?.getTokenPrice(BigNumber.from(props.tokenId));
    contract?.buy(account, BigNumber.from(props.tokenId), {value: price});
  }

  const commoditizeHandler = async (price: any) => {
    console.log(price);
    await contract?.setToCommodity(account, BigNumber.from(props.tokenId), BigNumber.from(price));
  }

  useEffect(() => {
    getMetadata();
  }, [])

  useEffect(() => {
    switch(props.showMode) {
      case 0:
        setShow(true);
        break;
      case 1:
        isMine().then(res => setShow(res));
        break;
      case 2:
        isCommodity().then(res => setShow(res));
        break;
      default:
        break;
    }
  }, [props.showMode])

  return (
    <>
    {show ? (<Container>
    <div>
      <img src={imageInfo.image} alt="Failed"></img>
    </div>
    <div>{imageInfo.name}</div>
    <div>{imageInfo.description}</div>
    {props.showMode !== 0 ?   
      <div className='overlay'>
        <a onClick={() => props.showMode === 1 ? sellHandler() : buyHandler()}>{props.showMode === 1 ? 'Sale' : 'Buy'}</a>
      </div> : null
    }
  </Container>) : null}
      <Modal image={imageInfo.image} show={modalOpen} close={() => setModalOpen(false)} commoditize = {commoditizeHandler}></Modal>
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