// MintApp.tsx
import { useState } from "react";
import { useAccount } from "wagmi";
import { simulateContract, writeContract } from "@wagmi/core";
import { abi } from "../abi";
import TabBar from "../Tabbar/TabBar";
import "./ChatBotApp.css";
import GeneratedModal from "../Modal/GeneratedModal/GeneratedModal";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import AppTheme from "../theme/AppTheme";
// import DismissibleAlert from "../DismissibleAlert";
import logo from "../images/logo-mini.svg";
import MintResult from "../Modal/MintResult/MintResult";
import LoadingModal from "../Modal/LoadingModal/LoadingModal"

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

export default function ChatBotApp(props: { disableCustomTheme?: boolean }) {
  const account = useAccount();
  // const { connectors, connect, status, error } = useConnect();
  // const { disconnect } = useDisconnect();
  // const { writeContract } = useWriteContract();
  // const [alert, setAlert] = useState<{ type: 'success' | 'info' | 'warning' | 'error'; message: string } | null>(null);

  const contractAddress = import.meta.env.VITE_CONTRACT_ADDREESS;
  const [uri, setUri] = useState<string | null>(null);
  const [base64Image, setBase64Image] = useState<string>('');

  const [openSucccessModal, setOpenSucccessModal] = useState(false); // Manage the open state in the parent
  const [mintResultName, setMintResultName] = useState('');
  const [mintResultQuantity, setMintResultQuantite] = useState(1);
  const [mintResultIsListed, setMintResultIsListed] = useState<boolean | null>(null);


  return (
    <AppTheme {...props}>
      <TabBar />
      <CssBaseline enableColorScheme />
    </AppTheme>
  );
}
