import { useEffect, useState, useContext, createContext } from "react";
import { Route, Routes, Outlet, Navigate } from "react-router-dom";
import { CollectionView, GlobalView, NFTView, ProfileView } from "@/pages";
import Banner from "@/components/banner";
import { useMoralis } from "react-moralis";
import Logo from "./assets/logo.svg";
import Loader from "@/assets/covalent-logo-loop_dark_v2.gif";
import * as Vibrant from "node-vibrant";
// import img from './assets/banner.png'
import { CONFIG } from "@/config";
import "./App.css";

function App() {
  useEffect(() => {
    if (CONFIG.TEMPLATE.banner_picture !== "") {
      getColor();
    }
  }, []);

  // const [bg, setBg] = useState("");
  const [vibrant, setVibrant] = useState("");
  const [light, setLight] = useState("");
  const [dark, setDark] = useState("");

  const getColor = async () => {
    const palette = await Vibrant.from(
      CONFIG.TEMPLATE.banner_picture
    ).getPalette();
    // console.log(palette);
    // setBg(palette.DarkMuted.getHex());
    setLight(palette.LightVibrant.getHex());
    setVibrant(palette.Vibrant.getHex());
    setDark(palette.DarkVibrant.getHex());
    return palette;
  };

  return (
    <AuthProvider>
      <Routes>
        <Route element={<AppLayout />}>
          <Route
            path="/"
            element={
              <CollectionView light={light} vibrant={vibrant} dark={dark} />
            }
          />
          <Route
            exact
            path="/global"
            element={<GlobalView light={light} vibrant={vibrant} dark={dark} />}
          />
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
            exact
            path="/profile"
            element={
              <RequireAuth>
                <ProfileView light={light} vibrant={vibrant} dark={dark} />
              </RequireAuth>
            }
          />
        </Route>
      </Routes>
      <div className="logo">
        <img src={Logo} alt=""></img>
      </div>
    </AuthProvider>
  );
}

export default App;

const AppLayout = () => {
  // let auth = useAuth();
  const [bg, setBg] = useState("");
  const [vibrant, setVibrant] = useState("");
  const [light, setLight] = useState("");
  const [dark, setDark] = useState("");

  useEffect(() => {
    const getColor = async () => {
      const palette = await Vibrant.from(
        CONFIG.TEMPLATE.banner_picture
      ).getPalette();
      // console.log(palette);
      setBg(palette.DarkMuted.getHex());
      setLight(palette.LightVibrant.getHex());
      setVibrant(palette.Vibrant.getHex());
      setDark(palette.DarkVibrant.getHex());
    };
    if (CONFIG.TEMPLATE.banner_picture !== "") {
      getColor();
    }
  }, []);

  return (
    <div className="App" style={{ backgroundColor: `${bg}` }}>
      <div className="">
        <header className="mb-8 md:mb-20">
          <Banner light={light} vibrant={vibrant} dark={dark} />
        </header>
        <main className="mb-16">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const { isAuthenticated, user, isInitialized, isWeb3Enabled, enableWeb3 } =
    useMoralis();

  useEffect(() => {
    if (isInitialized && isAuthenticated && !isWeb3Enabled) {
      enableWeb3();
    }
  }, [isInitialized, isAuthenticated, isWeb3Enabled]);

  let value = { user, isAuthenticated, isInitialized };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
  return useContext(AuthContext);
};

const RequireAuth = ({ children }) => {
  let auth = useAuth();
  if (!auth.isInitialized) {
    return (
      <div className="load">
        <img src={Loader} alt=""></img>
      </div>
    );
  }

  if (!auth.user && !auth.isAuthenticated) {
    return <Navigate to="/" />;
  }

  return children;
};
