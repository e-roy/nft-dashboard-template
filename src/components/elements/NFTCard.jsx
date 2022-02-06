import { useNavigate } from "react-router-dom";

// import { useVerifyMetadata } from "@/hooks/useVerifyMetadata";
const NFTCard = ({ nft, chainId }) => {
  const navigate = useNavigate();

  //   const { verifyMetadata } = useVerifyMetadata();
  //   nft = verifyMetadata(nft);
  //   console.log(nft); path="/nft/${token_address}/${token_id}/${chainId}"
  if (!nft.image) return null;
  return (
    <div
      className="cursor-pointer max-w-sm bg-white rounded-xl shadow-lg transform hover:scale-105 transition duration-500"
      onClick={() => {
        navigate(`/nft/${nft.token_address}/${nft.token_id}/${chainId}`);
      }}
    >
      <div className="relative">
        <img className="w-full rounded-t-xl" src={nft.image} alt="Colors" />
      </div>
      <div className="p-4">
        <div className="my-3 text-xl font-bold text-indigo-600">
          {nft.metadata && nft.metadata.name}
        </div>
        <div className="mt-4 text-gray-800 text-lg font-bold cursor-pointer">
          {nft.metadata && nft.metadata.description}
        </div>
        <div className="mt-4 text-gray-800 text-lg font-bold cursor-pointer">
          {nft.metadata &&
            nft.metadata.attributes &&
            nft.metadata.attributes.map((attribute, index) => {
              return (
                <div key={index}>
                  {attribute.trait_type}: {attribute.value}
                </div>
              );
            })}
        </div>
      </div>

      {/* <div className="my-4">
                <button className="mt-4 text-xl w-full text-white bg-indigo-600 py-2 rounded-xl shadow-lg">
                  Start Watching Now
                </button>
              </div> */}
    </div>
  );
};

export default NFTCard;
