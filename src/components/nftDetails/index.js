import { ContractAddress } from "@/components/elements";

const NftDetails = ({ data, color, contract, chainId }) => {
  return (
    <div className="md:flex">
      <div className="flex-2">
        <img
          onError={(event) => {
            event.target.classList.add("error-image");
            event.target.classList.remove("nft-img");
          }}
          className="m-auto max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg"
          src={data?.external_data?.image}
          alt=""
        ></img>
      </div>

      <div
        className="py-2 px-4 text-gray-100"
        style={{ backgroundColor: color }}
      >
        <h1 className="font-bold text-xl">{data?.external_data?.name}</h1>
        <h2 className="font-bold text-lg">Token ID : {data?.token_id}</h2>
        <ContractAddress address={contract} chainId={chainId} light={""} />
        <p>{data?.external_data?.description}</p>
        <table className="font-semibold">
          <tbody>
            {data?.external_data?.attributes ? (
              <>
                {data.external_data.attributes.map((o, i) => {
                  return (
                    <tr key={i}>
                      <td> {o.trait_type} </td>
                      <td> {o.value} </td>
                    </tr>
                  );
                })}
              </>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NftDetails;
