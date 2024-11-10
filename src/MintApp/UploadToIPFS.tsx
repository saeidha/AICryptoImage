// UploadToIPFS.tsx
import React, { useState } from 'react';
import { pinata } from '../utils/config'; // Ensure this is the correct path to your Pinata configuration
import { createTheme, alpha, getContrastRatio } from '@mui/material/styles';

const violetBase = '#7F00FF';
const violetMain = alpha(violetBase, 0.7);

const theme = createTheme({
  palette: {
    violet: {
      main: violetMain,
      light: alpha(violetBase, 0.5),
      dark: alpha(violetBase, 0.9),
      contrastText: getContrastRatio(violetMain, '#fff') > 4.5 ? '#fff' : '#111',
    },
  },
});

interface UploadToIPFSProps {
  base64Image: string | null;
  onUploadSuccess: (ipfsHash: string) => void; // Callback to set the URI
}


const UploadToIPFS: React.FC<UploadToIPFSProps> = ({ base64Image, onUploadSuccess }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);



  const base64ToBlob = (base64String: string, mimeType: string = 'image/png') => {
    const byteCharacters = atob(base64String); // Decode base64 string
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: mimeType });
  };
  
  const handleSubmission = async () => {
    if (!base64Image) return;

    setLoading(true);
    setError(null);

    try {
      // Convert base64 to Blob
       const blob = base64ToBlob(base64Image, 'image/png');
       const file = new File([blob], 'generated-image.png', { type: 'image/png' });
 

      // Upload to Pinata
      const upload = await pinata.upload.file(file);
      console.log(upload);
      try {
        const data = await pinata.gateways.get(upload.IpfsHash);
        console.log("--------------------------------")
        console.log(data)
      } catch (error) {
        console.log("--------------------------------error")
        console.log(error);
      }
      onUploadSuccess(upload.IpfsHash); // Call the callback with the IPFS hash
    } catch (error) {
      console.error(error);
      setError('Failed to upload to IPFS');
    } finally {
      setLoading(false);
      
    }
  };

  return (
    <div>
      <button className="btn btn-purple mt-3" onClick={handleSubmission} disabled={loading}>
        {loading ? 'Uploading...' : 'Upload to IPFS'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>

    
  );
};

export default UploadToIPFS;