import { useState, useEffect } from "react";

import { useWeb3React } from "@web3-react/core";
import Web3 from "web3";
import { connector } from "../../connectors/connector";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

const StartConnection = () => {
  const { active, account, activate, deactivate } = useWeb3React();
  let web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");

  const [balance, setBalance] = useState(null);
  const [id, setId] = useState(null);

  async function onConnect() {
    try {
      await activate(connector);
    } catch (ex) {
      console.log(ex);
    }
    console.log(web3.eth.accounts);
  }

  async function onDisconnect() {
    try {
      await deactivate(connector);
    } catch (ex) {
      console.log(ex);
    }
  }

  useEffect(() => {
    let timerId = setInterval(() =>
      web3.eth.net.getId().then((res) => setId(res), 1000)
    );

    return () => {
      clearInterval(timerId);
    };
  }, []);

  function getBalances() {
    if (account) {
      web3.eth.getBalance(account).then((res) => {
        console.log(res);
        const etherRes = web3.utils.fromWei(res);
        setBalance(etherRes);
      });
    }
  }

  useEffect(() => {
    getBalances();
  }, [account, id]);

  const connectButton = !active ? (
    <Button variant="contained" sx={{ width: "350px" }} onClick={onConnect}>
      Connect to MetaMask
    </Button>
  ) : null;

  const disconnectButton = active ? (
    <Button variant="contained" sx={{ width: "350px" }} onClick={onDisconnect}>
      Disconnect from MetaMask
    </Button>
  ) : null;

  const accountName = active ? (
    <span>{account}</span>
  ) : (
    <span>Not connected</span>
  );

  const networkName = active ? <span>{renderSwitch()}</span> : null;

  const balanceAmount = account ? <span>{balance}</span> : null;

  function renderSwitch() {
    switch (id) {
      case 1:
        return "Network Etherium Mainnet";
      case 3:
        return "Test Network Ropsten";
      case 4:
        return "Test Network Kovan";
      case 5:
        return "Test Network Rinkeby";
      case 42:
        return "Test Network Goerli";
      default:
        return "No netrwork";
    }
  }

  return (
    <Box
      component="div"
      sx={{
        "& > :not(style)": { m: 2 },
        border: "1px solid gray",
        borderRadius: "10px",
      }}
      noValidate
      autoComplete="off"
    >
      <Stack spacing={2} alignItems={"center"}>
        {connectButton}
        {disconnectButton}
        {accountName}
        {networkName}
        {balanceAmount}
      </Stack>
    </Box>
  );
};

export default StartConnection;
