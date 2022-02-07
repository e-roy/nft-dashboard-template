import { useNavigate } from "react-router-dom";

// import { useVerifyMetadata } from "@/hooks/useVerifyMetadata";
const NFTCard = ({ nft, chainId }) => {
  const navigate = useNavigate();

  //   const { verifyMetadata } = useVerifyMetadata();
  // nft = verifyMetadata(nft);
  //   console.log(nft);
  if (!nft.image) return null;
  // console.log(nft);
  // console.log(nft.image);

  return (
    <div
      className="cursor-pointer max-w-sm bg-gray-200 rounded-xl shadow-lg transform hover:scale-105 transition duration-500"
      onClick={() => {
        navigate(`/nft/${nft.token_address}/${nft.token_id}/${chainId}`);
      }}
    >
      <div className="relative">
        <img className="w-full rounded-t-xl" src={nft.image} alt="" />
      </div>
      <div className="p-4">
        <div className="my-3 text-xl font-bold text-black">
          {nft.metadata && nft.metadata.name}
        </div>
        <div className="mt-4 text-gray-900 font-bold">
          {nft.metadata && nft.metadata.description.substring(0, 140)}...
        </div>
      </div>
    </div>
  );
};

export default NFTCard;
