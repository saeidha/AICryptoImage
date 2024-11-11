// MintApp.tsx
import { useState } from "react";
import { useAccount } from "wagmi";
import { simulateContract, writeContract } from "@wagmi/core";
import { abi } from "../abi";
import ImageGenerator from "./ImageGenerator";
import TabBar from "../Tabbar/TabBar";
import "./MintApp.css";
import GeneratedModal from "../Modal/GeneratedModal/GeneratedModal";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import AppTheme from "../theme/AppTheme";
import DismissibleAlert from "../DismissibleAlert";
import logo from "../images/logo-mini.svg";
import { config } from "./wagmi";

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
  // const { connectors, connect, status, error } = useConnect();
  // const { disconnect } = useDisconnect();
  // const { writeContract } = useWriteContract();
  const [alert, setAlert] = useState<{ type: 'success' | 'info' | 'warning' | 'error'; message: string } | null>(null);

  const contractAddress = import.meta.env.VITE_CONTRACT_ADDREESS;
  const [uri, setUri] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [base64Image, setBase64Image] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  async function submit() {

    if (!uri) {
      console.error("No URI set");
      return;
    }

    if (!account.address) {
      console.error("No account connected");
      return;
    }

    console.log("Sending")
    console.log("contractAddress " + contractAddress)
    console.log("quantity " + quantity)
    console.log("account address " + account.address)
    console.log("name " + name)
    console.log("description " + description)
    console.log("uri " + uri)
    console.log("abi " + abi)

    try {


      const { request } = await simulateContract(config, {
        abi,
        address: contractAddress,
        functionName: "mintNFTs",
        args: [account.address, BigInt(quantity), uri, name, description],
      });

      // Proceed to write the contract if simulation succeeded
      console.log("Simulation succeeded, proceeding with transaction.");
      const hash = await writeContract(config, request);

      // Optionally, you can wait for the transaction receipt if needed
      console.log("Transaction sent, hash:", hash);
      setUri(null);
      setQuantity(1);
      setBase64Image("");
      setName("");
      setDescription("");
      setAlert({type: "success", message: "Minted Successfully"})
    } catch (error) {
      console.error("Error writing contract:", error);
    }
    
  }

  const handleSetImage= (image: string) => {
    setBase64Image(image)
  }

  const onSetQunatity= async (quantity: number, name: string, description: string) => {
    console.log("on mint processwith qunatity");
    setQuantity(quantity)
    setName(name)
    setDescription(description)
    setAlert({type: "success", message: "Minted Successfully"})
    try {
      await submit();
    } catch (e) {
      console.error("Error in payment process:", e);
    }
  }

  const [openModal, setOpenModal] = useState(true); // Manage the open state in the parent

  const setSampleBase64 = () => {
    setAlert({type: "success", message: "Minted Successfully"})
    // setBase64Image('jaksdaldajdkl')
    // setOpenModal(true)
    // setUri('bafkreigjwuujkanbznrd4q5ully3wu7ldozb3jjocdqjou4gvl7uf5hhdu')
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
{/*Samplllllleeee*/}
          <Button onClick={setSampleBase64}>Open modal</Button>
{/*Samplllllleeee*/}
          {base64Image !== '' && (
          <GeneratedModal base64Image={base64Image}
          onSetMint={onSetQunatity}
          open={openModal} // Pass the open state
          setOpen={setOpenModal} // Pass the setOpen function
         />
          )}
          <ImageGenerator onUriSet={setUri} onBase64ImageSet={handleSetImage} />


          {/* <div className="container">
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
            
          </div> */}

          
        </Card>

        {alert && (
            <Stack sx={{ width: "90%", alignItems: "center", bottom:"20" }} spacing={2}>
              <DismissibleAlert type={alert.type} message={alert.message} />
            </Stack>
          )}
      </MintContainer>
    </AppTheme>
  );
}
