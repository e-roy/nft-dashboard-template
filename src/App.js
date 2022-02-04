import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Global from "./pages/GlobalView";
import CollectionView from "./pages/CollectionView";
import NFTView from "./pages/NFTView";
import Logo from "./assets/logo.svg";
import * as Vibrant from "node-vibrant";
// import img from './assets/banner.png'
import { CONFIG } from "./config";
import "./App.css";

function App() {
  useEffect(() => {
    if (CONFIG.TEMPLATE.banner_picture !== "") {
      getColor();
    }
  }, []);

  const [bg, setBg] = useState("");
  const [vibrant, setVibrant] = useState("");
  const [light, setLight] = useState("");
  const [dark, setDark] = useState("");

  const getColor = async () => {
    const palette = await Vibrant.from(
      CONFIG.TEMPLATE.banner_picture
    ).getPalette();
    // console.log(palette);
    setBg(palette.DarkMuted.getHex());
    setLight(palette.LightVibrant.getHex());
    setVibrant(palette.Vibrant.getHex());
    setDark(palette.DarkVibrant.getHex());
    return palette;
  };

  return (
    <div className="App" style={{ backgroundColor: `${bg}` }}>
      <Routes>
        <Route
          path="/nft/:address/:id/:chainId"
          element={<NFTView light={light} vibrant={vibrant} dark={dark} />}
        />
        <Route
          path="/collection/:address/:id"
          element={
            <CollectionView light={light} vibrant={vibrant} dark={dark} />
          }
        />
        <Route
          path="/global"
          element={<Global light={light} vibrant={vibrant} dark={dark} />}
        />
        <Route
          path="/"
          element={
            <CollectionView light={light} vibrant={vibrant} dark={dark} />
          }
        />
      </Routes>
      <div className="logo">
        <img src={Logo} alt=""></img>
      </div>
    </div>
  );
}

export default App;
