import { useWeb3React } from "@web3-react/core";
// import Web3 from "web3";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import Container from "@mui/material/Container";

const SendTransaction = () => {
  const { active, account, activate, deactivate } = useWeb3React();

  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 2 },
        border: "1px solid gray",
        opacity: "0.6",
        borderRadius: "10px",
      }}
      noValidate
      autoComplete="off"
    >
      <Input defaultValue="Hello world" />
      <Input placeholder="Enter recipient's account" />
    </Box>
  );
};

export default SendTransaction;
