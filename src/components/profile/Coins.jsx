import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { Container, ContractAddress } from "@/components/elements";

const Coins = ({ walletAssets }) => {
  //   console.log("walletAssets", walletAssets);
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    setAssets(walletAssets);
  }, [walletAssets]);

  return (
    <div className="my-8">
      {assets.map((asset, index) => {
        // console.log("asset", asset.items);

        if (
          asset.items &&
          asset.items.length === 1 &&
          asset.items[0].balance === "0"
        )
          return null;
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
                let balance = ethers.utils.formatUnits(
                  item.balance,
                  item.contract_decimals
                );
                if (balance === "0.0") return null;
                return (
                  <div key={index}>
                    {item.type === "cryptocurrency" && (
                      <div className="border-b border-gray-600 flex p-2">
                        <div className="w-12">
                          {item.logo_url && (
                            <img
                              src={item.logo_url}
                              className="h-10 w-10"
                              alt="token"
                            />
                          )}
                        </div>
                        <span className="pt-2 pl-4 w-20">
                          {item.contract_ticker_symbol}
                        </span>
                        <span className="pt-2 pl-4 w-44">
                          {Math.round(
                            (Number(balance) + Number.EPSILON) * 10000
                          ) / 10000}
                        </span>
                        <span className="pt-2 pl-4">
                          <ContractAddress
                            address={item.contract_address}
                            chainId={asset.chain_id}
                            light={""}
                            shorten
                          />
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
          </Container>
        );
      })}
    </div>
  );
};

export default Coins;
