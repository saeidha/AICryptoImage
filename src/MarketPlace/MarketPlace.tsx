// MarketPlace.tsx
import React, { useEffect, useState } from 'react';
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



import { useReadContract } from 'wagmi'

type SellOfferType = {
  count: number;
  description: string;
  name: string;
  nftContract: string;
  price: number;
  seller: string;
  uri: string;
};

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
  const contractAddress = import.meta.env.VITE_CONTRACT_ADDREESS;
  
  const [quantity, setQuantity] = useState<number>(1);

  const [openSucccessModal, setOpenSucccessModal] = useState(false); // Manage the open state in the parent

  const [loading, setOnLoading] = useState(""); // Manage the open state in the parent


  const fetchMarketPlaceData = async (): Promise<SellOfferType[]> => {
    try {
      const result = await useReadContract({
        address: contractAddress,
        abi: abi,
        functionName: 'getSellOffers',
        args: []
      });
  
      const offers = result.data ?? [];
  
      return offers.map(offer => ({
        count: Number(offer.count),
        description: offer.description,
        name: offer.name,
        nftContract: offer.nftContract,
        price: Number(offer.price),
        seller: offer.seller,
        uri: offer.uri,
      }));
    } catch (error) {
      console.error("Error reading contract:", error);
      return [];
    }
  };


  const [offers, setOffers] = useState<SellOfferType[]>([]);

  // fetchMarketPlaceData().then(offers => {
  //   setOffers(offers);
  // });



  const [openModal, setOpenModal] = useState(true); // Manage the open state in the parent
  const isShowSample = true;
  var isLoadFirst = false; 
const fetch = () => {
  if (isLoadFirst == false) {
    fetchMarketPlaceData().then(offers => {
      setOffers(offers);
    });
    isLoadFirst = true
  }
  
}

fetch()

  return (
    <AppTheme {...props}>
      <TabBar />
      <CssBaseline enableColorScheme />

      <MintContainer direction="column" justifyContent="space-between">
        <Stack
          sx={{
            paddingTop: "100px",
            paddingBottom: "50px",
            alignItems: "center",
          }}
        >
          <p className="typed-text">NFT Market Place</p>

          {/* {base64Image !== "" && (
            <GeneratedModal
              base64Image={base64Image}
              onSetMint={onSetQunatity}
              onSetSell={onSetSellNFT}
              open={openModal} // Pass the open state
              setOpen={setOpenModal} // Pass the setOpen function
            />
          )} */}

          <LoadingModal text={loading} open={loading !== ""} />

          {/* <MintResult
            name={name}
            number={quantity}
            open={openSucccessModal}
            isListed={false}
            setOpen={setOpenSucccessModal}
          /> */}

          {/*Samplllllleeee*/}
          {/* {isShowSample && (
            <Button onClick={fetchMarketPlaceData}>Open modal</Button>
          )} */}
          {/*Sampllllleeee*/}
        </Stack>
        <Card
          variant="outlined"
          sx={{ minWidth: 1400, maxWidth: 1400, minHeight: 0 }}
        >
          <Collection items={offers} address={account.address} />
        </Card>
      </MintContainer>
    </AppTheme>
  );
}
