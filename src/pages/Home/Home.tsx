import React, { useEffect } from 'react'
import styled from 'styled-components'

import ImageCard from '../../components/ImageCard/ImageCard'
import {useTokenContract} from '../../hooks/useContract';
import { useWeb3React } from '@web3-react/core';
import UploadCard from '../../components/UploadCard/UploadCard';
import { useDispatch, useSelector } from 'react-redux';
import { gallerySelector, setImageCount } from '../../reducers/galleryReducer';

const Home = (props: any) => {
  const {account} = useWeb3React();
  const contract = useTokenContract()
  const {count} = useSelector(gallerySelector);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(contract)
    getCount();
    contract?.on('Mint', (...args: any) => {
      console.log('MINTED', args);
      getCount();
    })
    contract?.on('Buy', (...args: any) => {
      console.log('SOLD', args);
    })
  }, [account])

  const getCount = async () => {
    const count = await contract?.count();
    if(count)
      dispatch(setImageCount(parseInt(count)));
  }

  return (
    <>
    {count}
    {account ? <Container>
      { Array(count).fill(0).map((_: any, i) => (
        <ImageCard key={i} tokenId={i} showMode={props.showAll}></ImageCard>
      ))}
      <UploadCard></UploadCard>
    </Container> : null}
    </>
    
  )
}

const Container = styled.div`
  width: 100%;
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
`

export default Home;