// import "./App.css";
import { Web3ReactProvider } from "@web3-react/core";
import Web3 from "web3";

import StartConnection from "../startConnection/StartConnection";
import SendTransaction from "../sendTransaction/SendTransaction";

import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Header from "../Header/Header";

function getLibrary(provider) {
  return new Web3(provider);
}

function App() {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Header></Header>
      <Container sx={{ mt: "1rem" }} maxWidth="sm">
        <Stack spacing={2}>
          <StartConnection />
          <SendTransaction />
        </Stack>
      </Container>
    </Web3ReactProvider>
  );
}

export default App;
