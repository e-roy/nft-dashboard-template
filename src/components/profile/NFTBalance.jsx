import { useState, useEffect } from "react";
import { useNFTBalances, useChain } from "react-moralis";
import { NFTCard, Container } from "@/components/elements";
// import { NFTBalanceAnyNetwork } from ".";

function NFTBalance({ walletAssets }) {
  const { getNFTBalances, data: NFTBalances } = useNFTBalances();
  const { chain } = useChain();

  // console.log("chain", chain);
  // console.log("NFTBalances", NFTBalances);

  // console.log("walletAssets", walletAssets);
  const [assets, setAssets] = useState([]);
  const [viewNetworkName, setViewNetworkName] = useState("");
  const [viewNetworkId, setViewNetworkId] = useState("");

  useEffect(() => {
    if (chain) {
      setViewNetworkName(chain.name);
      setViewNetworkId(chain.networkId);
    }
  }, [chain]);

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
            <Container key={index}>
              <div>
                <span className="font-semibold">{asset.label}</span>
                <span className="px-4 font-regular text-sm text-gray-300">
                  CHAIN ID - {asset.chain_id}
                </span>
              </div>

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
              <button
                className="mt-1 px-2 border rounded-lg text-gray-300 hover:text-gray-100 border-gray-500 hover:border-gray-100"
                onClick={() => {
                  getNFTBalances({ params: { chain: asset.chainHex } });
                  setViewNetworkName(asset.label);
                  setViewNetworkId(asset.chain_id);
                }}
              >
                View
              </button>
            </Container>
          );
        })}
      </div>
      <Container>
        <div className="text-gray-200 tracking-wider">
          {chain && (
            <span>
              <span className="font-semibold">{viewNetworkName}</span>
              <span className="px-4 font-regular text-sm text-gray-300">
                CHAIN ID - {viewNetworkId}
              </span>
            </span>
          )}
        </div>
        <div className="my-12 px-4 md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-5 gap-8 space-y-4 md:space-y-0">
          {NFTBalances &&
            NFTBalances.result.map((nft, index) => {
              return <NFTCard key={index} nft={nft} chainId={viewNetworkId} />;
            })}
        </div>
      </Container>
    </div>
  );
}

export default NFTBalance;
