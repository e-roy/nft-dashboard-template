import { useState, useEffect } from "react";
import { useMoralis } from "react-moralis";
import { Preferences, Coins, NFTBalance } from "@/components/profile";
import axios from "axios";
import axiosRetry from "axios-retry";
import { covalentNetworks } from "@/helpers/networks";

const profileNavaigation = ["NFTs", "Coins", "Preferences"];

const ProfileView = ({ light, dark, vibrant }) => {
  const { account } = useMoralis();
  const [active, setActive] = useState(0);
  // console.log(account);
  // console.log(covalentNetworks);

  const [market, setMarket] = useState([]);
  const [activeLoader, setLoader] = useState(true);
  // const API_KEY = process.env["REACT_APP_COVALENT_API"];

  const [walletAssets, setWalletAssets] = useState(covalentNetworks);

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
    if (account) {
      covalentNetworks.forEach((chain) => {
        const getAssets = async () => {
          const result = await handleUserData(chain.chain_id, account);
          let networkAssets = walletAssets.find(
            (asset) => asset.chain_id === chain.chain_id
          );
          networkAssets.items = result;
          setWalletAssets([...walletAssets, networkAssets]);
        };
        getAssets();
      });
    }
  }, [account]);

  // Request for user data (multiple chains)
  const handleUserData = async (id, address) => {
    setLoader(true);
    try {
      const resp = await axios.get(
        `https://api.covalenthq.com/v1/${id}/address/${address}/balances_v2/?quote-currency=USD&format=JSON&nft=true&no-nft-fetch=false&key=ckey_docs`
      );
      setMarket(resp.data.data.items);
      setLoader(false);
      return resp.data.data.items;
    } catch (error) {}
  };

  return (
    <div>
      <div className="flex h-12 m-8">
        {profileNavaigation.map((item, index) => {
          return (
            <button
              className="flex-1 text-center rounded hover:bg-gray-700 hover:bg-opacity-30"
              style={{
                color: vibrant,
                border: `1px solid ${vibrant}`,
              }}
              key={index}
              onClick={() => {
                setActive(index);
              }}
            >
              <div className="text-sm sm:text-base md:text-lg tracking-widest font-bold">
                {item}
              </div>
            </button>
          );
        })}
      </div>
      {active === 0 && <NFTBalance walletAssets={walletAssets} />}
      {active === 1 && (
        <div>
          <Coins walletAssets={walletAssets} />
        </div>
      )}
      {active === 2 && <Preferences />}
    </div>
  );
};

export default ProfileView;
