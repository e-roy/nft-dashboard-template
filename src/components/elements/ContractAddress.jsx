import { Icon } from "@blueprintjs/core";

const ContractAddress = ({ address, chainId, light, shorten }) => {
  let shortenAddress =
    address.substring(0, 10) + "..." + address.substring(address.length - 10);

  return (
    <div
      className="flex cursor-pointer"
      onClick={() => {
        if (chainId === "1") {
          window.open(`https://etherscan.io/address/${address}`, "_blank");
        } else if (chainId === "137") {
          window.open(`https://polygonscan.com/address/${address}`, "_blank");
        } else if (chainId === "56") {
          window.open(`https://bscscan.com/address/${address}`, "_blank");
        } else {
          window.open(`https://snowtrace.io/address/${address}`, "_blank");
        }
      }}
    >
      {shorten ? (
        <div className="underline">{shortenAddress} </div>
      ) : (
        <div>
          <div className="underline block md:hidden">{shortenAddress} </div>
          <div className="underline hidden md:block">{address} </div>
        </div>
      )}

      <Icon
        icon={"share"}
        size={15}
        intent="primary"
        color={light ? light : "#FF4C8B"}
        className="share"
      />
    </div>
  );
};

export default ContractAddress;
