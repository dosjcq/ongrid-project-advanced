// import "./App.css";
import { Web3ReactProvider } from "@web3-react/core";
import Web3 from "web3";

import StartConnection from "../startConnection/StartConnection";
import SendTransaction from "../sendTransaction/SendTransaction";

import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";

function getLibrary(provider) {
  return new Web3(provider);
}

function App() {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Container maxWidth="sm">
        <Stack spacing={2}>
          <StartConnection />
          <SendTransaction />
        </Stack>
      </Container>
    </Web3ReactProvider>
  );
}

export default App;
