import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NftDetails from "@/components/nftDetails";
import Loader from "@/assets/covalent-logo-loop_dark_v2.gif";
import axios from "axios";
import axiosRetry from "axios-retry";
import "./style.css";
// import { Icon } from "@blueprintjs/core";

export default function NFTView({ light, dark, vibrant }) {
  let { address, id, chainId } = useParams();
  const [nft, setNft] = useState({});
  const [activeLoader, setLoader] = useState(true);
  // const API_KEY = process.env['REACT_APP_COVALENT_API']
  // const navigate = useNavigate();

  axiosRetry(axios, {
    retries: 3,
    retryDelay: (retryCount) => {
      console.log(`retry attempt: ${retryCount}`);
      return retryCount * 2000;
    },
    retryCondition: (error) => {
      return error.response.status === 503;
    },
  });

  useEffect(() => {
    // Request for nft metadata
    const handleNft = async () => {
      const resp = await axios.get(
        `https://api.covalenthq.com/v1/${chainId}/tokens/${address}/nft_metadata/${id}/?quote-currency=USD&format=JSON&key=ckey_docs`
      );
      setNft(
        resp.data.data.items[0].nft_data !== null
          ? resp.data.data.items[0].nft_data[0]
          : { external_data: { image: "" } }
      );
      setLoader(false);
    };
    handleNft();
  }, [address, id, chainId]);

  useEffect(() => {
    console.log(nft);
    // console.log(chainId, address, id);
  }, [nft]);

  return (
    <>
      {activeLoader ? (
        <div className="load">
          <img src={Loader} alt=""></img>
        </div>
      ) : (
        <>
          <div className="main">
            <NftDetails data={nft} color={dark} />
          </div>
        </>
      )}
    </>
  );
}
