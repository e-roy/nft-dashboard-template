import { useState, useEffect } from "react";
import { useMoralis } from "react-moralis";
import { NativeBalance, NFTBalance } from "@/components/elements";
import { Preferences, Coins } from "@/components/profile";
import { CONFIG } from "@/config";
import Loader from "@/assets/covalent-logo-loop_dark_v2.gif";
import axios from "axios";
import axiosRetry from "axios-retry";
import { covalentNetworks } from "@/helpers/networks";

const profileNavaigation = ["NFTs", "Coins", "Preferences"];

const ProfileView = ({ light, dark, vibrant }) => {
  const { account } = useMoralis();
  const [active, setActive] = useState(0);
  // console.log(account);

  // const [chain, setChain] = useState(CONFIG.TEMPLATE.block_chain_id);

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
    // console.log(covalentNetworks);
    if (account) {
      covalentNetworks.forEach((chain) => {
        const getAssets = async () => {
          // console.log(chain.chain_id);

          const result = await handleUserData(chain.chain_id, account);
          // console.log(chain.chain_id, chain.label, result);
          let networkAssets = walletAssets.find(
            (asset) => asset.chain_id === chain.chain_id
          );
          // console.log(networkAssets);
          networkAssets.items = result;
          // console.log("adjusted result", networkAssets);
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
              className="flex-1 text-center hover:bg-black"
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
          {/* <NativeBalance /> */}
          <Coins walletAssets={walletAssets} />
        </div>
      )}
      {active === 2 && <Preferences />}
    </div>
  );
};

export default ProfileView;
