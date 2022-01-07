import { useWeb3React } from "@web3-react/core";
import Web3 from "web3";
import { connector } from "../../connectors/connector";

const StartConnection = () => {
  const { account, activate, deactivate } = useWeb3React();
  let web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");

  async function onConnect() {
    try {
      await activate(connector);
    } catch (ex) {
      console.log(ex);
    }
    console.log(web3.eth.accounts);
  }

  return (
    <div>
      <button onClick={onConnect}>Connect to MetaMask</button>
    </div>
  );
};

export default StartConnection;
