import { useWeb3React } from "@web3-react/core";
import Web3 from "web3";
import { connector } from "../../connectors/connector";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

const StartConnection = () => {
  const { active, account, activate, deactivate } = useWeb3React();
  let web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");

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

  console.log(active);
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
        {active ? <span>{account}</span> : <span>Not connected</span>}
      </Stack>
    </Box>
  );
};

export default StartConnection;
