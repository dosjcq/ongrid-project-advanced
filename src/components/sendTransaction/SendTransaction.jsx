import { useRef, useState } from "react";

import { useWeb3React } from "@web3-react/core";
import Web3 from "web3";

import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";

const SendTransaction = () => {
  const { account } = useWeb3React();

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
            getTransactionReceipt(hash); // first occurance of recursive survey for get transactions
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

  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 2 },
        border: "1px solid gray",
        borderRadius: "10px",
      }}
      noValidate
      autoComplete="off"
    >
      {/* <Input
        defaultValue={account ? account : null}
        placeholder="Enter your account"
        ref={fromInput}
      />
      <Input placeholder="Enter recipient's account" ref={toInput} />
      <Input placeholder="Enter value" ref={valueToSend} /> */}
      <div>
        from
        <input defaultValue={account} ref={fromInput} />
      </div>
      <div>
        to
        <input ref={toInput} />
      </div>
      <div>
        value
        <input ref={valueToSend} />
      </div>
      <Button variant="contained" sx={{ width: "350px" }} onClick={send}>
        Send
      </Button>
      {paymentSend ? <p>Transaction sended</p> : null}
      {paymentSend ? (
        <p>
          To see details
          <a
            href={`https://rinkeby.etherscan.io/tx/${transactions[0].transactionHash}`}
          >
            click
          </a>
        </p>
      ) : null}
    </Box>
  );
};

export default SendTransaction;
