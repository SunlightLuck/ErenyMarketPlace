import React, { useRef } from 'react'
import styled from 'styled-components'
import {create, IPFSHTTPClient} from 'ipfs-http-client'
import { useTokenContract } from '../../hooks/useContract';
import { useWeb3React } from '@web3-react/core';

let ipfs: IPFSHTTPClient | undefined;

try {
  ipfs = create({url: "https://ipfs.infura.io:5001/api/v0"})
} catch (error) {
  console.log(error)
  ipfs = undefined
}

const UploadCard = () => {
  const contract = useTokenContract();
  const {account} = useWeb3React();
  const fileRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLInputElement>(null);

  const fileUpload = async (e: any) => {
    try {
      e.preventDefault()

      const files = fileRef.current?.files;

      if(!files || files.length === 0) {
        return alert("Select file first")
      }

      const result = await (ipfs as IPFSHTTPClient).add(files[0]);
      const metadata = {
        name: nameRef.current?.value,
        description: descRef.current?.value,
        image: `https://ipfs.infura.io/ipfs/${result.path}`
      }
      console.log(metadata)
      const metadataURI = await (ipfs as IPFSHTTPClient).add(JSON.stringify(metadata));
      console.log(metadataURI);
      await contract?.mint(account, metadataURI.path);
    } catch(err) {
      console.log(err);
    }
  }

  return (
    <Container>
      {!ipfs ? <p>Not connected to IPFS.</p> : null}
      <form onSubmit={fileUpload}>
        <input type={'file'} ref={fileRef}></input>
        <input type='text' placeholder='Name' ref={nameRef}></input>
        <input type='text' placeholder='Description' ref={descRef}></input>
        <button type='submit'>Upload</button>
      </form>
    </Container>
  )
}

const Container = styled.div`
  margin: 30px;
  width: 100%;
  padding: 20px;
  background-color: #eee;
  display: flex;
  flex-direction: column;
  align-items: center;
  input {
    width: 100%;
    border: 1px solid grey;
  }
  button {
    margin-top: 20px;
    padding: 10px 30px;
    border: 2px solid purple;
    color: purple;
    font-size: 20px;
    background-color: white;
    border-radius: 50px;
  }
`

export default UploadCard;