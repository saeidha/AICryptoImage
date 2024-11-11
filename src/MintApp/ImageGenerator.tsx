// ImageGenerator.tsx
import React, { useState, useEffect } from 'react';
 import UploadToIPFS from "./UploadToIPFS";
import PromptForm from "./Promp"
import { useProceedToPay } from "./Pay/ProceedToPay";
import { Button } from '@mui/material';



interface ImageGeneratorProps {
  onUriSet: (uri: string) => void; // Prop to set the URI
}

const ImageGenerator: React.FC<ImageGeneratorProps> = ({ onUriSet }) => {
  const [prompt, setPrompt] = useState<string>("");
  const [base64Image, setBase64Image] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  /// Pay result
  const { proceedToPay, isPay, errorr } = useProceedToPay();
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const handlePaymentSuccess = async () => {
      if (isPay) {
        console.log('Payment was successful!');
        // Call the generateImage function if payment was successful
        try {
          await generateImage();
          setPrompt("");
        } catch (error) {
          console.error('Error generating image:', error);
        }
      }
    };

    handlePaymentSuccess();
  }, [isPay]);
  useEffect(() => {
    if (error) {
      console.error('There was an error with the payment:', error);
      // Additional actions on error, e.g., display a notification
      setError(error);
    }
  }, [errorr]);
  

  const generateImage = async () => {
    setLoading(true);
    setError(null);
    setBase64Image(null);

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
    };

    try {
      const response = await fetch(
        `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}`,
        requestOptions
      );
      if (response.ok) {
        const blob = await response.blob();
        const reader = new FileReader();
        reader.onloadend = () => {
          setBase64Image(reader.result as string);
        };
        reader.readAsDataURL(blob);
      } else {
        setError("Failed to generate image");
      }
    } catch (error) {
      console.error(error);
      setError("Error generating image");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    console.log("Start payment process");
    try {
      await proceedToPay();
    } catch (e) {
      console.error('Error in payment process:', e);
    }
  };

  return (
    <div className="centered-container">
      <PromptForm
        sendPrompt={handleSubmit}
        prompt={prompt}
        setPrompt={setPrompt}
      />

      {loading ? "Generating..." : "Generate Image"}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {base64Image 
      && (
        <UploadToIPFS
              base64Image={base64Image.split(",")[1]}
              onUploadSuccess={onUriSet}
            />
      )
      }
    </div>
  );
};

export default ImageGenerator;
