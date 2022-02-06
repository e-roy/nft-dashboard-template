import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMoralis } from "react-moralis";
import { Blockie } from "@/components/elements";
import "./style.css";
import Logo from "@/assets/white-logo.png";
import bannerImg from "@/assets/Covalent-Background_5.jpg";
import { Icon } from "@blueprintjs/core";
import { CONFIG } from "@/config";

const Banner = ({ light, dark, vibrant }) => {
  const { authenticate, isAuthenticated, user, logout, account } = useMoralis();
  const navigate = useNavigate();
  const [address, setAddress] = useState("");
  const [head, setHead] = useState("Covalent Dashboard");
  const [subhead, setSubhead] = useState("Code Template");
  const [displayAddress, setDisplayAddress] = useState("");
  // console.log(CONFIG);
  // console.log(img);
  // const head = "PolygonPunks Dashboard";
  // const subhead = "Code Template";
  const img = "";

  useEffect(() => {
    if (user) {
      // console.log(user.attributes.accounts[0]);
      setAddress(user.attributes.accounts[0]);
      setSubhead("Welcome");
      setHead("Your Dashboard");
    }
  }, [user]);

  useEffect(() => {
    if (account) {
      let shortenAddress = `${account.substring(0, 4)}...${account.substring(
        account.length - 4
      )}`.toLowerCase();
      setDisplayAddress(shortenAddress);
    }
  }, [account]);

  return (
    <div
      className="relative w-full h-40 shadow-lg mb-12"
      style={{ backgroundColor: vibrant }}
    >
      <div
        className="absolute inset-0 overflow-hidden banner "
        style={{ backgroundImage: `url(${img ? img : bannerImg})` }}
      >
        <div className="absolute inset-0 backdrop-blur-5 bg-gradient-to-b from-transparent to-black"></div>
      </div>

      <div className="flex justify-between px-2 md:px-8 translate-y-8">
        <div className="flex">
          <div className="md:mt-16 lg:mt-8 overflow-hidden">
            {address ? (
              <div
                className="cursor-pointer"
                onClick={() => {
                  navigate("/profile");
                }}
              >
                <div className="hidden lg:block">
                  <Blockie
                    className="rounded-full"
                    address={address}
                    scale={18}
                    avatar
                    currentWallet
                  />
                </div>
                <div className="hidden md:block lg:hidden">
                  <Blockie
                    className="rounded-full"
                    address={address}
                    scale={12}
                    avatar
                    currentWallet
                  />
                </div>
                <div className="block md:hidden">
                  <Blockie
                    className="rounded-full"
                    address={address}
                    scale={5}
                    avatar
                    currentWallet
                  />
                </div>
              </div>
            ) : (
              <img
                className="rounded-lg shadow-xl cursor-pointer w-12 h-12 md:w-24 md:h-24 lg:w-36 lg:h-36"
                src={Logo}
                alt=""
                onClick={() => {
                  navigate("/");
                }}
              />
            )}

            <div className=""></div>
          </div>
          <div className="text-white pt-12 pl-4 md:pl-8">
            <div className="text-lg md:text-xl font-semibold opacity-60">
              {subhead} {displayAddress}
            </div>
            <div className="flex">
              <h1 className="text-xl md:text-3xl  lg:text-5xl font-bold">
                {head}
              </h1>
              <div className="md:mt-8 ">
                <div
                  className="tag flex justify-center align-middle ml-4 py-1 px-3 rounded-xl text-sm md:text-base text-white uppercase font-bold"
                  style={{ backgroundColor: vibrant }}
                >
                  Beta
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          {isAuthenticated ? (
            <button
              onClick={() => {
                logout();
                setAddress("");
              }}
              className="border border-gray-100 hover:border-white text-gray-100 hover:text-white tracking-widest py-2 px-4 rounded uppercase font-bold backdrop-blur-md"
            >
              logout
            </button>
          ) : (
            <button
              onClick={() => {
                authenticate();
              }}
              className="border border-gray-100 hover:border-white text-gray-100 hover:text-white tracking-widest py-2 px-4 rounded uppercase font-bold backdrop-blur-md"
            >
              login
            </button>
          )}
        </div>
      </div>
      <div className="flex justify-between mt-16 md:mt-4 mx-4 sm:mx-12 md:mx-40 lg:mx-52 uppercase font-bold tracking-widest text-xl">
        <div
          className="flex cursor-pointer w-24"
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
            className="pt-0.5 pr-1"
          />
          Back
        </div>
        <div
          className="flex cursor-pointer w-24"
          style={{ color: light ? light : "#FF4C8B" }}
          onClick={() => {
            navigate("/global");
          }}
        >
          Global
          <Icon
            icon={"chevron-right"}
            size={24}
            intent="primary"
            color={light ? light : "#FF4C8B"}
            className="pt-0.5 pl-1"
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
