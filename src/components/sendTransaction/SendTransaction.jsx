import { useRef, useState } from "react";

import { useWeb3React } from "@web3-react/core";
import Web3 from "web3";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

const SendTransaction = () => {
  const { active, account } = useWeb3React();

  const [transactions, setTransactions] = useState([]);
  const [paymentSend, setPaymentSend] = useState(false);

  const toInput = useRef(null);
  const fromInput = useRef(null);
  const valueToSend = useRef(null);

  let web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");

  function send() {
    console.log(valueToSend.current.value);
    console.log(toInput.current.value);
    console.log(fromInput.current.value);
    web3.eth
      .sendTransaction({
        from: fromInput.current.value,
        to: toInput.current.value,
        value: valueToSend.current.value,
      })
      .on("transactionHash", (hash) => {
        web3.eth.getTransactionReceipt(hash).then((res) => {
          if (!res) {
            getTransactionReceipt(hash);
          }
        });
      });
  }

  function getTransactionReceipt(hash) {
    web3.eth.getTransactionReceipt(hash).then((res) => {
      if (!res) {
        getTransactionReceipt(hash);
      } else {
        setTransactions([...transactions, res]);
        setPaymentSend(true);
        console.log([...transactions, res]);
      }
    });
  }

  const transactionLogs = paymentSend ? (
    <div>
      <p>Transaction sended {String(transactions[0].status)}</p>
      <p>
        To see details
        <a
          href={`https://rinkeby.etherscan.io/tx/${transactions[0].transactionHash}`}
        >
          click
        </a>
      </p>
    </div>
  ) : null;

  function renderTransactionLogs() {
    const transactionLogs = transactions.map((log) => {
      let logLink = "https://rinkeby.etherscan.io/tx/" + log.transactionHash;
      return (
        <>
          <ListItem disablePadding>
            <ListItemButton
              sx={{ color: log.status ? "green" : "red", cursor: "auto" }}
            >
              <ListItemText
                primary={
                  log.status ? "Transaction confirmed" : "Transaction declined"
                }
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href={logLink}>
              <ListItemText primary="To see details - click" />
            </ListItemButton>
          </ListItem>
        </>
      );
    });
    return <List>{transactionLogs}</List>;
  }

  return (
    <Box
      sx={{
        "& > :not(style)": { m: 2 },
        border: "1px solid gray",
        borderRadius: "10px",
      }}
    >
      <Box
        component="form"
        noValidate
        autoComplete="off"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
        }}
      >
        <TextField
          id="outlined-basic"
          label="Your account"
          variant="outlined"
          defaultValue={active ? account : null}
          inputRef={fromInput}
          disabled={!active}
        />
        <TextField
          id="outlined-basic"
          label="Recepient account"
          variant="outlined"
          inputRef={toInput}
          disabled={!active}
        />
        <TextField
          id="outlined-basic"
          label="Value to send"
          variant="outlined"
          inputRef={valueToSend}
          disabled={!active}
          InputProps={{
            endAdornment: <InputAdornment position="end">ETH</InputAdornment>,
          }}
        />

        <Button
          disabled={!active}
          variant="contained"
          sx={{ width: "350px" }}
          onClick={send}
        >
          Send
        </Button>
      </Box>
      {renderTransactionLogs()}
    </Box>
  );
};

export default SendTransaction;
