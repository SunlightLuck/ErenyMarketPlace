import { useTokenContract } from "./useContract";
import { BigNumber } from "ethers";
import { IPFSHTTPClient, create } from "ipfs-http-client";
import { useDispatch } from "react-redux";
import { setGalleryData } from "../reducers/galleryReducer";
import {Buffer} from 'buffer'

let ipfs: IPFSHTTPClient | undefined;

try {
  ipfs = create({url: "https://ipfs.infura.io:5001/api/v0"})
} catch (error) {
  console.log(error)
  ipfs = undefined
}

const useGallery = () => {
  const contract = useTokenContract();
  const dispatch = useDispatch();

  const initData = async () => {
    const count = parseInt(await contract?.count());
    console.log(count);
    let metadatas = [];
    let owners = [];
    let commodities = [];
    for(let i = 0; i < count ; i ++) {
      const metadataURI = await contract?.tokenURI(BigNumber.from(i));
      let content = [];
      for await(const chunk of (ipfs as IPFSHTTPClient).cat(metadataURI)) {
        content.push(Buffer.from(chunk.buffer));
      }
      const meta = JSON.parse(Buffer.concat(content).toString('utf-8'));
      metadatas.push(meta);
      const owner = await contract?.ownerOf(BigNumber.from(i));
      owners.push(owner);
      const commodity = await contract?.isCommodity(BigNumber.from(i));
      commodities.push(commodity);
    }
    dispatch(setGalleryData({
      count,
      metadata: metadatas,
      owner: owners,
      isCommodity: commodities
    }))
    console.log("-----------", count, metadatas, owners, commodities)
  }

  const getMetadata = async (tokenId: any) => {
    const metadataURI = await contract?.tokenURI(BigNumber.from(tokenId));
    let content = [];
    for await(const chunk of (ipfs as IPFSHTTPClient).cat(metadataURI)) {
      content.push(Buffer.from(chunk.buffer));
    }
    const meta = JSON.parse(Buffer.concat(content).toString('utf-8'));
    return meta;
  }
  return {initData, getMetadata}
}

export default useGallery;