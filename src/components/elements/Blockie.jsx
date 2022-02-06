import Blockies from "react-blockies";
import { useMoralis } from "react-moralis";

/**
 * Shows a blockie image for the provided wallet address
 * @param {*} props
 * @returns <Blockies> JSX Elemenet
 */

function Blockie(props) {
  const { account, isAuthenticated } = useMoralis();
  //   console.log(isAuthenticated);
  //   console.log(account);
  //   console.log(props);
  if (!props.address && (!account || !isAuthenticated)) return null;
  // return <Skeleton.Avatar active size={40} />;

  return (
    <Blockies
      //   seed={
      //     props.currentWallet
      //       ? account.toLowerCase()
      //       : props.address.toLowerCase()
      //   }
      seed={
        props.currentWallet
          ? props.address.toLowerCase()
          : "0x0000000000000000000000000000000000000000"
      }
      className="identicon"
      {...props}
    />
  );
}

export default Blockie;
