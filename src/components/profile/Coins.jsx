import { useState, useEffect } from "react";
import { ethers } from "ethers";
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
          <div
            key={index}
            className="border border-gray-400 rounded shadow-md mx-4 my-2 md:mx-8 p-2 font-semibold text-gray-200 tracking-widest"
          >
            {asset.label}
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
                          {item.contract_address}
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
        );
      })}
    </div>
  );
};

export default Coins;
