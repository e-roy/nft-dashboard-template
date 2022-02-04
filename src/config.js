export const CONFIG = {
  TEMPLATE: {
    // 1. Set your NFT collection contract address
    collection_address: "0x9498274b8c82b4a3127d67839f2127f2ae9753f4",

    // 2. Set your blockchain chain ID where your NFT collection contract address is deployed (see below for value options)
    block_chain_id: "137",

    // 3. Set the default title of your dashboard. If found, this template uses the NFT Collection name for the title.
    title: "My NFT Collection",

    // 4. (Optional) Display the floor price chart
    timeseries_chart: true,

    // 5. (Optional) Set your banner image
    banner_picture:
      "https://www.superflexfitness.com/wp-content/uploads/2017/03/3D-banner-background.jpg",
  },

  // These options just for your reference
  FILTER_OPTIONS: [
    { name: "Ethereum", value: 1 },
    { name: "Polygon", value: 137 },
    { name: "Avalanche", value: 43114 },
  ],
  GRAPH_OPTIONS: [
    { name: "7 Days", value: 7 },
    { name: "1 Month", value: 30 },
    { name: "3 Month", value: 90 },
    { name: "1 Year", value: 365 },
    { name: "All time", value: 0 },
  ],
};
