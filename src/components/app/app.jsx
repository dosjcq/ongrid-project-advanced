// import "./App.css";
import { Web3ReactProvider } from "@web3-react/core";
import Web3 from "web3";
import StartConnection from "../startConnection/StartConnection";
// import Content from "../content/content";

function getLibrary(provider) {
  return new Web3(provider);
}

function App() {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <div className="App">
        <StartConnection />
      </div>
    </Web3ReactProvider>
  );
}

export default App;
