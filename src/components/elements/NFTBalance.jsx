import { useState, useEffect } from "react";
import { useNFTBalances, useChain } from "react-moralis";
import { NFTCard } from ".";

function NFTBalance({ walletAssets }) {
  const { data: NFTBalances } = useNFTBalances();
  const { chain } = useChain();

  // console.log("NFTBalances", NFTBalances);

  // console.log("walletAssets", walletAssets);
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    setAssets(walletAssets);
  }, [walletAssets]);

  return (
    <div className="my-8">
      <div>
        {assets.map((asset, index) => {
          // console.log("asset", asset.items);
          if (
            asset.items &&
            asset.items.length === 1 &&
            asset.items[0].balance === "0"
          )
            return null;

          // console.log("asset", asset);
          return (
            <div
              key={index}
              className="border border-gray-400 rounded shadow-md mx-4 my-2 md:mx-8 p-2 font-semibold text-gray-200 tracking-widest"
            >
              {asset.label}
              <span className="pl-4 font-regular text-sm text-gray-400">
                CHAIN ID - {asset.chain_id}
              </span>
              {asset.items &&
                asset.items.map((item, index) => {
                  // console.log(item);
                  return (
                    <div key={index}>
                      {item.type === "nft" && (
                        <div className="border-b border-gray-600 flex p-2">
                          <span className="pr-2">{item.balance} :</span>
                          {item.contract_name} -{item.contract_ticker_symbol}
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>
          );
        })}
      </div>
      <div className="border border-gray-400 rounded shadow-md mx-4 my-2 md:mx-8 p-2">
        <div className=" text-gray-200 tracking-widest">
          {chain && (
            <span>
              <span className="px-4 font-semibold">{chain.name}</span>
              <span className="px-4 font-regular text-sm text-gray-400">
                CHAIN ID - {chain.networkId}
              </span>
            </span>
          )}
          Wallet's Connencted Network
        </div>
        <div className="my-12 px-4 md:grid md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-8 space-y-4 md:space-y-0">
          {NFTBalances &&
            NFTBalances.result.map((nft, index) => {
              return (
                <NFTCard key={index} nft={nft} chainId={chain.networkId} />
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default NFTBalance;
