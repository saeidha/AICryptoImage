import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import './SellModal.css'
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

interface SellModalProps {
  done: () => void;
}

export default function SellModal({ done }: SellModalProps) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" color="secondary" onClick={handleOpen} sx={{width: 205}}>Sell NFT on MarketPlace</Button>
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
            Sell NFT on MarketPlace
          </Typography>

          <div className="image-container">
      <Button onClick={done}> done</Button>
    </div>

    </Stack>

        </Box>
      </Modal>
    </div>
  );
}