import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Stack from "@mui/material/Stack";
import UploadToIPFS from "../../MintApp/UploadToIPFS";
import Typography from "@mui/material/Typography";
import './GeneratedModal.css'
import MintModal from "../MintModal/MintModal";
import SellModal from "../SellModal/SellModal";
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

interface NestedModalProps {
  onUriSet: (uri: string) => void;
}

export default function NestedModal({ onUriSet }: NestedModalProps) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleSellDone = () => {
    setOpen(false);
  };

  const onSetMintNumber = (number: number) => {
    console.log(number)
  };

  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        
        
        <Box sx={{ ...style, width: 500 }}>
          
        <Stack spacing={2}>
        <Typography
            component="h1"
            variant="h4"
            sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)", textAlign: "center" }}
          >
            Generated NFT
          </Typography>

          <div className="image-container">
      <img src='../temp.png' alt="Generated" />
      </div>
      
      <div className="button-container">
      <Stack spacing={2} direction="row" useFlexGap sx={{justifyContent: "space-between" }}>
        <MintModal onSetMintNumber={onSetMintNumber} />
        <SellModal done={handleSellDone} />
      {/* <UploadToIPFS base64Image={'base64Image'.split(",")[1]} onUploadSuccess={onUriSet} /> */}
      </Stack>
    </div>

    </Stack>

        </Box>
      </Modal>
    </div>
  );
}