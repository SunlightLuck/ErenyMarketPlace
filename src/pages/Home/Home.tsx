import React, { useEffect } from 'react'
import styled from 'styled-components'

import ImageCard from '../../components/ImageCard/ImageCard'
import {useTokenContract} from '../../hooks/useContract';
import { useWeb3React } from '@web3-react/core';
import UploadCard from '../../components/UploadCard/UploadCard';
import { useDispatch, useSelector } from 'react-redux';
import { addData, changeOwner, gallerySelector, setCommoditize, setImageCount, setUpdating } from '../../reducers/galleryReducer';
import useGallery from '../../hooks/useGallery';
import Loading from '../../components/Loading/Loading';

const Home = (props: any) => {
  const {account} = useWeb3React();
  const contract = useTokenContract()
  const dispatch = useDispatch();
  const {initData, getMetadata} = useGallery();
  const {metadata, owner, isCommodity, count, isUpdating} = useSelector(gallerySelector);

  useEffect(() => {
    if(account) {
      dispatch(setUpdating(true));
      console.log("---", account);
//      getCount();
      contract?.on('Mint', (recipient: any, tokenId: any) => {
        console.log('MINTED', recipient, tokenId);
        getMetadata(tokenId).then(metadata => dispatch(addData({
          metadata, owner: recipient
        })));
        
      })
      contract?.on('Buy', (from: any, to: any, tokenId: any) => {
        console.log('SOLD', from, to, tokenId);
        dispatch(changeOwner({
          to, tokenId: parseInt(tokenId)
        }))
      })
      contract?.on('Commoditize', (tokenId: any) => {
        console.log('COMMODITIZE', tokenId);
        dispatch(setCommoditize({tokenId: parseInt(tokenId)}))
      })
      initData();
    }
    return () => {
      console.log("-------------REMOVE")
      contract?.removeAllListeners('Mint');
      contract?.removeAllListeners('Buy');
    }
  }, [account])

  const galleryList = metadata.map((el: any, i: any) => (
    (props.showMode === 0 || (props.showMode === 1 && owner[i] === account) || (props.showMode === 2 && isCommodity[i]) ? <ImageCard key={i} info={el} showMode = {props.showMode} isMine = {owner[i] === account} tokenId={i}></ImageCard> : null)
  ))

  return(
    <>
      {account ? <><Container>
        { !isUpdating ? galleryList : <Loading />}
        <UploadCard></UploadCard>
      </Container></> : null}
    </>
    );
}

const Container = styled.div`
  width: 100%;
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
`

export default Home;