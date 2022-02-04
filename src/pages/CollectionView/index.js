import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SelectDropdown from "../../components/selectDropdown";
import Banner from "../../components/banner";
import Loader from "../../assets/covalent-logo-loop_dark_v2.gif";
import TimeSeries from "../../components/timeseriesChart";
import axios from "axios";
import "./style.css";
import { CONFIG } from "../../config";
import moment from "moment";
import axiosRetry from "axios-retry";
import { Icon } from "@blueprintjs/core";

export default function CollectionView({ light, vibrant, dark }) {
  const [nft, setNft] = useState([]);
  const [graphData, setGraph] = useState([]);
  const [weiData, setWei] = useState([]);
  const [activeLoader, setLoader] = useState(true);
  const [graphLoader, setGraphLoader] = useState(true);
  const [collectionData, setData] = useState([]);
  const [graphErr, setErr] = useState(false);
  const [filter, setFilter] = useState(7);
  const navigate = useNavigate();
  const currentDay = moment().format("YYYY-MM-DD");
  let { address, id } = useParams();

  let blockchain_id = id ? id : CONFIG.TEMPLATE.block_chain_id;
  let address_id = address ? address : CONFIG.TEMPLATE.collection_address;

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

  var formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  // const API_KEY = process.env['REACT_APP_COVALENT_API']

  useEffect(() => {
    handleCollection();
    handleNft();
  }, []);

  // Handle Graph data
  const handleGraph = async (filter) => {
    setFilter(filter);
    setGraphLoader(true);
    setErr(false);
    setGraph([]);
    setWei([]);
    let from = moment().subtract(filter, "days").format("YYYY-MM-DD");

    // If filter is 0 (All time), apply different parameters
    let api_call =
      filter > 0
        ? // 2 dates (from - to)
          `https://api.covalenthq.com/v1/${blockchain_id}/nft_market/collection/${address_id}/?from=${from}&to=${currentDay}&key=ckey_docs`
        : // 1 date (current date - all data before it)
          `https://api.covalenthq.com/v1/${blockchain_id}/nft_market/collection/${address_id}/?to=${currentDay}&key=ckey_docs`;

    // Request for floor prices and add parameters to format for graph
    try {
      const resp = await axios.get(api_call);

      // Organize response data to insert into graph
      setGraph(
        resp.data.data.items
          .map((i) => ({ x: i.opening_date, y: i.floor_price_quote_7d }))
          .reverse()
      );
      setWei(
        resp.data.data.items
          .map((i) => ({
            x: i.opening_date,
            y: i.floor_price_wei_7d / 10 ** 18,
          }))
          .reverse()
      );
      setErr(false);
    } catch (error) {
      setErr(true);
    }

    setGraphLoader(false);
  };

  // Request for collection data
  const handleCollection = async () => {
    try {
      const resp = await axios.get(
        `https://api.covalenthq.com/v1/${blockchain_id}/nft_market/collection/${address_id}/?&key=ckey_docs`
      );
      setData([...resp.data.data.items]);

      if (CONFIG.TEMPLATE.title !== "" && !address) {
        CONFIG.TEMPLATE.title = `${
          resp.data.data.items[0].collection_name !== ""
            ? resp.data.data.items[0].collection_name
            : CONFIG.TEMPLATE.title
        } Dashboard`;
      }
    } catch (error) {}

    if (CONFIG.TEMPLATE.timeseries_chart) {
      // Call endpoint with 7 day parameters as default for graph
      handleGraph(7);
    }
  };

  // Request for nft collection (first 5)
  const handleNft = async () => {
    let resp;
    let collection = [];
    try {
      resp = await axios.get(
        `https://api.covalenthq.com/v1/${blockchain_id}/tokens/${address_id}/nft_token_ids/?quote-currency=USD&format=JSON&page-size=5&key=ckey_docs`
      );

      // Request for nft metadata for display pictures
      for (let i of resp.data.data.items) {
        try {
          let resp2 = await axios.get(
            `https://api.covalenthq.com/v1/${blockchain_id}/tokens/${address_id}/nft_metadata/${i.token_id}/?quote-currency=USD&format=JSON&key=ckey_docs`
          );

          collection.push(
            resp2.data.data.items[0].nft_data != null
              ? resp2.data.data.items[0].nft_data[0]
              : { external_data: { image: "" } }
          );
        } catch (err) {}
      }
      setNft([...collection]);
      setLoader(false);
    } catch (err) {}
  };

  return (
    <>
      <Banner
        img={
          CONFIG.TEMPLATE.banner_picture !== ""
            ? CONFIG.TEMPLATE.banner_picture
            : null
        }
        head={CONFIG.TEMPLATE.title}
        subhead={"Code Template"}
        color={vibrant}
      />
      <div className="main">
        {!address ? (
          <div
            className="global"
            style={{ color: light ? light : "#FF4C8B" }}
            onClick={() => {
              navigate("/global");
            }}
          >
            Global View
            <Icon
              icon={"chevron-right"}
              size={24}
              intent="primary"
              color={light ? light : "#FF4C8B"}
              className="icon"
            />
          </div>
        ) : (
          <div
            className="back"
            style={{ color: light ? light : "#FF4C8B" }}
            onClick={() => {
              navigate(-1);
            }}
          >
            <Icon
              icon={"chevron-left"}
              size={24}
              intent="primary"
              color={light ? light : "#FF4C8B"}
              className="icon"
            />
            Back
          </div>
        )}
        <div className="content">
          <div className="info">
            <div className="image">
              {activeLoader ? (
                <img src={Loader} alt=""></img>
              ) : (
                <img
                  className="collection-img"
                  onError={(event) => {
                    event.target.classList.add("error-image");
                    event.target.classList.remove("collection-img");
                  }}
                  src={nft[0]?.external_data?.image}
                  alt=""
                ></img>
              )}
            </div>
            <div className="details">
              <div className="title-cont">
                <h1 style={{ color: light }}>Collection Address </h1>
                <h3
                  onClick={() => {
                    if (blockchain_id === 1) {
                      window.open(
                        `https://etherscan.io/address/${address_id}`,
                        "_blank"
                      );
                    } else if (blockchain_id === 137) {
                      window.open(
                        `https://polygonscan.com/address/${address_id}`,
                        "_blank"
                      );
                    } else {
                      window.open(
                        `https://snowtrace.io/address/${address_id}`,
                        "_blank"
                      );
                    }
                  }}
                >
                  {address_id}{" "}
                  <Icon
                    icon={"share"}
                    size={15}
                    intent="primary"
                    color={light ? light : "#FF4C8B"}
                    className="share"
                  />
                </h3>
                <table className="collection-table">
                  <tbody>
                    <tr className="title-row" style={{ color: light }}>
                      <td>Ticker Symbol</td>
                      <td>24hr Volume</td>
                      <td>24hr Sold Count</td>
                    </tr>
                    <tr className="data-row">
                      <td>
                        {collectionData[0]?.collection_ticker_symbol
                          ? collectionData[0]?.collection_ticker_symbol
                          : 0}
                      </td>
                      <td>
                        {" "}
                        {collectionData[0]?.volume_quote_day
                          ? formatter
                              .format(collectionData[0]?.volume_quote_day)
                              .split(".")[0]
                          : 0}
                      </td>
                      <td>
                        {collectionData[0]?.unique_token_ids_sold_count_day
                          ? collectionData[0]?.unique_token_ids_sold_count_day
                          : 0}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        {CONFIG.TEMPLATE.timeseries_chart && (
          <div className="graph-cont">
            {graphLoader && (
              <div className="graph-loader">
                <img src={Loader} alt=""></img>
              </div>
            )}
            {graphErr && (
              <div className="graph-err">
                No data available between these dates
              </div>
            )}
            <div className="graph-header">
              <h2>Floor Price </h2>
              <SelectDropdown
                options={CONFIG.GRAPH_OPTIONS}
                value={filter}
                onChange={(e) => {
                  handleGraph(e.target.value);
                }}
              />
            </div>
            <div className="graph">
              <TimeSeries quote={graphData} wei={weiData} />
            </div>
          </div>
        )}
        <div className="bottom-section">
          <h1>NFT Preview (First 5)</h1>
          {activeLoader ? (
            <div className="collection-load">
              <img src={Loader} alt=""></img>
            </div>
          ) : (
            <div className="collection-display">
              {nft &&
                nft.map((o, i) => {
                  return (
                    <div className="nft" key={i}>
                      <img
                        onError={(event) => {
                          event.target.classList.add("error-image");
                          event.target.classList.remove("collection-img");
                        }}
                        className="collection-img"
                        key={i}
                        src={o?.external_data?.image}
                        alt=""
                        onClick={() => {
                          navigate(
                            `/nft/${address_id}/${o.token_id}/${blockchain_id}`
                          );
                        }}
                      ></img>
                      {o?.external_data?.name}
                    </div>
                  );
                })}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
