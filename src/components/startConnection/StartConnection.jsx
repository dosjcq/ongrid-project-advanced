import { useState, useEffect } from "react";

import { useWeb3React } from "@web3-react/core";
import Web3 from "web3";
import { connector } from "../../connectors/connector";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

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

  // function getLogs() {
  //   // web3.eth
  //   //   .getPastLogs({
  //   //     fromBlock: "0x0",
  //   //     address: "0xA155E792068a5e00b702Df7475EbbfD034f8a482",
  //   //   })
  //   //   .then((res) => {
  //   //     res.forEach((rec) => {
  //   //       console.log(rec.blockNumber, rec.transactionHash, rec.topics);
  //   //     });
  //   //   })
  //   //   .catch((err) => console.log("getPastLogs failed", err));
  //   // web3.eth
  //   //   .getPastLogs({
  //   //     fromBlock: 9934568,
  //   //     toBlock: 9960871,
  //   //     address: "0xA155E792068a5e00b702Df7475EbbfD034f8a482",
  //   //   })
  //   //   .then(console.log);
  //   web3.eth
  //     .getPastLogs({
  //       address: "0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe",
  //       topics: [web3.utils.sha3("adduintevent(uint256,uint256)")],
  //     })
  //     .then(console.log);
  // }

  // async function checkBlock() {
  //   let block = await web3.eth.getBlock("latest");
  //   let number = block.number;
  //   let transactions = block.transactions;
  //   //console.log('Search Block: ' + transactions);

  //   if (block != null && block.transactions != null) {
  //     for (let txHash of block.transactions) {
  //       let tx = await web3.eth.getTransaction(txHash);

  //       console.log(
  //         "from: " +
  //           tx.from.toLowerCase() +
  //           " to: " +
  //           tx.to.toLowerCase() +
  //           " value: " +
  //           tx.value
  //       );
  //     }
  //   }
  // }

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
    <ListItem disablePadding>
      <ListItemText primary={account} />
    </ListItem>
  ) : (
    <ListItem disablePadding>
      <ListItemText primary="Not connected" />
    </ListItem>
  );

  const networkName = active ? (
    <ListItem disablePadding>
      <ListItemText primary={renderSwitch()} />
    </ListItem>
  ) : null;

  const balanceAmount = account ? (
    <ListItem disablePadding>
      <ListItemText primary={balance + " ETH"} />
    </ListItem>
  ) : null;

  function renderSwitch() {
    switch (id) {
      case 1:
        return "Network Etherium Mainnet";
      case 3:
        return "Test Network Ropsten";
      case 4:
        return "Test Network Rinkeby";
      case 5:
        return "Test Network Goerli";
      case 42:
        return "Test Network Kovan";
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
      </Stack>
      <List>
        {accountName}
        {networkName}
        {balanceAmount}
      </List>
    </Box>
  );
};

export default StartConnection;
