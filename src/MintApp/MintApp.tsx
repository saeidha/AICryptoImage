// MintApp.tsx
import React, { useState } from "react";
import { useAccount, useConnect, useDisconnect, useWriteContract } from "wagmi";
import { abi } from "../abi"; // Ensure that you import your contract ABI
import ImageGenerator from "./ImageGenerator";
import TabBar from "../Tabbar/TabBar";
import "./MintApp.css";

// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import Checkbox from '@mui/material/Checkbox';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Divider from '@mui/material/Divider';
// import FormLabel from '@mui/material/FormLabel';
// import FormControl from '@mui/material/FormControl';
// import Link from '@mui/material/Link';
// import TextField from '@mui/material/TextField';

import CssBaseline from "@mui/material/CssBaseline";

import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import AppTheme from "../theme/AppTheme";

import logo from "../images/logo-mini.svg";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "450px",
  },
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

const MintContainer = styled(Stack)(({ theme }) => ({
  height: "calc((1 - var(--template-frame-height, 0)) * 100dvh)",
  minHeight: "100%",
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
  "&::before": {
    content: '""',
    display: "block",
    position: "absolute",
    zIndex: -1,
    inset: 0,
    backgroundImage:
      "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
    backgroundRepeat: "no-repeat",
    ...theme.applyStyles("dark", {
      backgroundImage:
        "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
    }),
  },
}));

export default function MintApp(props: { disableCustomTheme?: boolean }) {
  const account = useAccount();
  const { connectors, connect, status, error } = useConnect();
  const { disconnect } = useDisconnect();
  const { writeContract } = useWriteContract();

  const contractAddress = import.meta.env.VITE_CONTRACT_ADDREESS;
  const [uri, setUri] = useState<string | null>(null);
  const name = "Your NFT Name";
  const description = "Your NFT Description";
  const [quantity, setQuantity] = useState<number>(1);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!uri) {
      console.error("No URI set");
      return;
    }

    if (!account.address) {
      console.error("No account connected");
      return;
    }

    try {
      const tx = await writeContract({
        address: contractAddress,
        abi: abi,
        functionName: "mintNFTs",
        args: [account.address, BigInt(quantity), uri, name, description],
      });

      console.log("Transaction:", tx);
    } catch (error) {
      console.error("Error writing contract:", error);
    }
  }

  return (
    <AppTheme {...props}>
      <TabBar />
      <CssBaseline enableColorScheme />
      <MintContainer direction="column" justifyContent="space-between">
        <Card variant="outlined" sx={{ minWidth: 1000, maxWidth: 1000 }}>
          <img src={logo} width={"50px"} height={"50px"} />
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
          >
            AI NFT Generator
          </Typography>

          <div className="container">
            <ImageGenerator onUriSet={setUri} />

            <form onSubmit={submit}>
              <label>
                Number of NFTs to mint:
                <input
                  type="number"
                  value={quantity}
                  min="1"
                  onChange={(e) => setQuantity(Number(e.target.value))}
                />
              </label>
              <button type="submit">Mint NFT</button>
            </form>

            <h2>Account</h2>
            <div>
              status: {account.status}
              <br />
              addresses: {JSON.stringify(account.addresses)}
              <br />
              chainId: {account.chainId}
            </div>

            {account.status === "connected" && (
              <button type="button" onClick={() => disconnect()}>
                Disconnect
              </button>
            )}

            <div>
              <h2>Connect</h2>
              {connectors.map((connector) => (
                <button
                  key={connector.uid}
                  onClick={() => connect({ connector })}
                  type="button"
                >
                  {connector.name}
                </button>
              ))}
              <div>{status}</div>
              <div>{error?.message}</div>
            </div>
          </div>
        </Card>
      </MintContainer>
    </AppTheme>
  );
}
