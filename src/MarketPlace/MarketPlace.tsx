// MarketPlace.tsx
import { useState } from "react";
import { useAccount } from "wagmi";
import { simulateContract, writeContract } from "@wagmi/core";
import { abi } from "../abi";
import TabBar from "../Tabbar/TabBar";
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
import MintResult from "../Modal/MintResult/MintResult";
import LoadingModal from "../Modal/LoadingModal/LoadingModal";
import "./MarketPlace.css";
import { config } from "../MintApp/wagmi";
import Collection from "./Collection/Collection";

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

export default function MarketPlace(props: { disableCustomTheme?: boolean }) {
  const account = useAccount();
  // const { connectors, connect, status, error } = useConnect();
  // const { disconnect } = useDisconnect();
  // const { writeContract } = useWriteContract();
  const [alert, setAlert] = useState<{
    type: "success" | "info" | "warning" | "error";
    message: string;
  } | null>(null);

  const contractAddress = import.meta.env.VITE_CONTRACT_ADDREESS;
  const [uri, setUri] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [base64Image, setBase64Image] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const [openSucccessModal, setOpenSucccessModal] = useState(false); // Manage the open state in the parent

  const [loading, setOnLoading] = useState(""); // Manage the open state in the parent

  const items = [
    { title: "Card 1", description: "Description for Card 1" },
    { title: "Card 2", description: "Description for Card 2" },
    { title: "Card 3", description: "Description for Card 3" },
    { title: "Card 1", description: "Description for Card 1" },
    { title: "Card 2", description: "Description for Card 2" },
    { title: "Card 3", description: "Description for Card 3" },
    { title: "Card 1", description: "Description for Card 1" },
    { title: "Card 2", description: "Description for Card 2" },
    { title: "Card 3", description: "Description for Card 3" },
    { title: "Card 1", description: "Description for Card 1" },
    { title: "Card 2", description: "Description for Card 2" },
    { title: "Card 3", description: "Description for Card 3" },
    // Add more items as needed
  ];

  async function submit() {
    if (!uri) {
      console.error("No URI set");
      return;
    }

    if (!account.address) {
      console.error("No account connected");
      return;
    }

    console.log("Sending");
    console.log("contractAddress " + contractAddress);
    console.log("quantity " + quantity);
    console.log("account address " + account.address);
    console.log("name " + name);
    console.log("description " + description);
    console.log("uri " + uri);
    console.log("abi " + abi);

    try {
      const { request } = await simulateContract(config, {
        abi,
        address: contractAddress,
        functionName: "createNFTContract",
        args: [name, "symbol", BigInt(quantity), uri, description],
      });

      // Proceed to write the contract if simulation succeeded
      console.log("Simulation succeeded, proceeding with transaction.");
      const hash = await writeContract(config, request);

      // Optionally, you can wait for the transaction receipt if needed
      console.log("Transaction sent, hash:", hash);
      setOpenSucccessModal(true);
      setUri(null);
      setQuantity(1);
      setBase64Image("");
      setName("");
      setDescription("");
    } catch (error) {
      console.error("Error writing contract:", error);
    }
  }

  const handleSetImage = (image: string) => {
    setBase64Image(image);
  };

  const onSetQunatity = async (
    quantityy: number,
    name: string,
    description: string
  ) => {
    console.log("on mint processwith qunatity: " + quantityy);
    setQuantity(quantityy);
    setName(name);
    setDescription(description);
    setAlert({ type: "success", message: "Minted Successfully" });
    try {
      await submit();
    } catch (e) {
      console.error("Error in payment process:", e);
    }
  };

  // fix it
  const onSetSellNFT = async (
    price: number,
    name: string,
    description: string
  ) => {
    console.log(
      "on sell with " +
        " price: " +
        price +
        " name: " +
        name +
        " description: " +
        description
    );
    // setQuantity(quantity)
    // setName(name)
    // setDescription(description)
    // setAlert({ type: "success", message: "Minted Successfully" })
    // try {
    //   await submit();
    // } catch (e) {
    //   console.error("Error in payment process:", e);
    // }
  };

  const [openModal, setOpenModal] = useState(true); // Manage the open state in the parent
  const isShowSample = false;
  const setSampleBase64 = () => {
    // setOpenSucccessModal(true)
    // setOnLoading('Generating...')
    setBase64Image("jaksdaldajdkl");
    setOpenModal(true);
    setUri("bafkreigjwuujkanbznrd4q5ully3wu7ldozb3jjocdqjou4gvl7uf5hhdu");
  };

  return (
    <AppTheme {...props}>
      <TabBar />
      <CssBaseline enableColorScheme />

      <MintContainer direction="column" justifyContent="space-between">
        <Stack
          sx={{
            paddingTop: "150px",
            paddingBottom: "50px",
            alignItems: "center",
          }}
        >
          <p className="typed-text">NFT Market Place</p>

          {base64Image !== "" && (
            <GeneratedModal
              base64Image={base64Image}
              onSetMint={onSetQunatity}
              onSetSell={onSetSellNFT}
              open={openModal} // Pass the open state
              setOpen={setOpenModal} // Pass the setOpen function
            />
          )}

          <LoadingModal text={loading} open={loading !== ""} />

          <MintResult
            name={name}
            number={quantity}
            open={openSucccessModal}
            setOpen={setOpenSucccessModal}
          />

          {/*Samplllllleeee*/}
          {isShowSample && (
            <Button onClick={setSampleBase64}>Open modal</Button>
          )}
          {/*Samplllllleeee*/}
        </Stack>
        <Card
          variant="outlined"
          sx={{ minWidth: 1400, maxWidth: 1400, minHeight: 0 }}
        >
          <Collection items={items} />
        </Card>
      </MintContainer>
    </AppTheme>
  );
}
