export const networkConfigs = {
  "0x1": {
    chainId: 1,
    currencySymbol: "ETH",
    blockExplorerUrl: "https://etherscan.io/",
    wrapped: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
  },
  "0x3": {
    chainId: 3,
    currencySymbol: "ETH",
    blockExplorerUrl: "https://ropsten.etherscan.io/",
  },
  "0x4": {
    chainId: 4,
    currencySymbol: "ETH",
    blockExplorerUrl: "https://kovan.etherscan.io/",
  },
  "0x2a": {
    chainId: 42,
    currencySymbol: "ETH",
    blockExplorerUrl: "https://rinkeby.etherscan.io/",
  },
  "0x5": {
    chainId: 5,
    currencySymbol: "ETH",
    blockExplorerUrl: "https://goerli.etherscan.io/",
  },
  "0x539": {
    chainName: "Local Chain",
    currencyName: "ETH",
    currencySymbol: "ETH",
    rpcUrl: "http://127.0.0.1:7545",
  },
  "0xa86a": {
    chainId: 43114,
    chainName: "Avalanche Mainnet",
    currencyName: "AVAX",
    currencySymbol: "AVAX",
    rpcUrl: "https://api.avax.network/ext/bc/C/rpc",
    blockExplorerUrl: "https://cchain.explorer.avax.network/",
  },
  "0x38": {
    chainId: 56,
    chainName: "Smart Chain",
    currencyName: "BNB",
    currencySymbol: "BNB",
    rpcUrl: "https://bsc-dataseed.binance.org/",
    blockExplorerUrl: "https://bscscan.com/",
    wrapped: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
  },
  "0x61": {
    chainId: 97,
    chainName: "Smart Chain - Testnet",
    currencyName: "BNB",
    currencySymbol: "BNB",
    rpcUrl: "https://data-seed-prebsc-1-s1.binance.org:8545/",
    blockExplorerUrl: "https://testnet.bscscan.com/",
  },
  "0x89": {
    chainId: 137,
    chainName: "Polygon Mainnet",
    currencyName: "MATIC",
    currencySymbol: "MATIC",
    rpcUrl: "https://rpc-mainnet.maticvigil.com/",
    blockExplorerUrl: "https://explorer-mainnet.maticvigil.com/",
    wrapped: "0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
  },
  "0x13881": {
    chainId: 80001,
    chainName: "Mumbai",
    currencyName: "MATIC",
    currencySymbol: "MATIC",
    rpcUrl: "https://rpc-mumbai.matic.today/",
    blockExplorerUrl: "https://mumbai.polygonscan.com/",
  },
};

export const getNativeByChain = (chain) =>
  networkConfigs[chain]?.currencySymbol || "NATIVE";

export const getChainById = (chain) => networkConfigs[chain]?.chainId || null;

export const getExplorer = (chain) => networkConfigs[chain]?.blockExplorerUrl;

export const getWrappedNative = (chain) =>
  networkConfigs[chain]?.wrapped || null;

export const covalentNetworks = [
  {
    name: "eth-mainnet",
    chain_id: "1",
    is_testnet: false,
    db_schema_name: "chain_eth_mainnet",
    label: "Ethereum Mainnet",
    logo_url:
      "https://www.covalenthq.com/static/images/icons/display-icons/ethereum-eth-logo.png",
  },
  {
    name: "eth-kovan",
    chain_id: "42",
    is_testnet: true,
    db_schema_name: "chain_eth_kovan",
    label: "Ethereum Testnet Kovan",
    logo_url:
      "https://www.covalenthq.com/static/images/icons/display-icons/ethereum-eth-logo.png",
  },
  {
    name: "matic-mainnet",
    chain_id: "137",
    is_testnet: false,
    db_schema_name: "chain_matic_mainnet",
    label: "Matic Mainnet",
    logo_url:
      "https://www.covalenthq.com/static/images/icons/display-icons/polygon-matic-logo.png",
  },
  {
    name: "matic-mumbai",
    chain_id: "80001",
    is_testnet: true,
    db_schema_name: "chain_matic_mumbai",
    label: "Matic Testnet Mumbai",
    logo_url:
      "https://www.covalenthq.com/static/images/icons/display-icons/polygon-matic-logo.png",
  },
  {
    name: "avalanche-mainnet",
    chain_id: "43114",
    is_testnet: false,
    db_schema_name: "chain_avalanche_mainnet",
    label: "Avalanche C-Chain Mainnet",
    logo_url:
      "https://www.covalenthq.com/static/images/icons/display-icons/avalanche-avax-logo.png",
  },
  {
    name: "avalanche-testnet",
    chain_id: "43113",
    is_testnet: true,
    db_schema_name: "chain_avalanche_testnet",
    label: "Avalanche Fuji Testnet",
    logo_url:
      "https://www.covalenthq.com/static/images/icons/display-icons/avalanche-avax-logo.png",
  },
  {
    name: "bsc-mainnet",
    chain_id: "56",
    is_testnet: false,
    db_schema_name: "chain_bsc_mainnet",
    label: "Binance Smart Chain",
    logo_url:
      "https://www.covalenthq.com/static/images/icons/display-icons/binance-coin-bnb-logo.png",
  },
  {
    name: "bsc-testnet",
    chain_id: "97",
    is_testnet: true,
    db_schema_name: "chain_bsc_testnet",
    label: "Binance Smart Chain Testnet",
    logo_url:
      "https://www.covalenthq.com/static/images/icons/display-icons/binance-coin-bnb-logo.png",
  },
];
