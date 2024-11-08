// ImageGenerator.tsx
import React, { useState } from 'react';
import UploadToIPFS from './UploadToIPFS'; // Ensure this is the correct import path
import { useWriteContract } from 'wagmi';
import { abi } from '../generateImageAbi'; // Ensure that you import your contract ABI

interface ImageGeneratorProps {
  onUriSet: (uri: string) => void; // Prop to set the URI
}

const ImageGenerator: React.FC<ImageGeneratorProps> = ({ onUriSet }) => {
  const [prompt, setPrompt] = useState<string>('');
  const [base64Image, setBase64Image] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { writeContract } = useWriteContract();



const pay = async () => {
  const valueInWei = BigInt(0.007 * 10 ** 18); // Convert 0.007 ETH to Wei
  try {
    const tx = await writeContract({
      address: '0x69c4893Fbb213e7082180E619D03ccAF7808e52C',
      abi: abi,
      functionName: 'pay',
      value: valueInWei,
    });
    console.log('Transaction:', tx);
    return tx;
  } catch (error) {
    console.error('Error writing contract:', error);
    setError('Transaction failed');
    return null;
  }
};


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
      const response = await fetch(`https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}`, requestOptions);
      if (response.ok) {
        const blob = await response.blob();
        const reader = new FileReader();
        reader.onloadend = () => {
          setBase64Image(reader.result as string);
        };
        reader.readAsDataURL(blob);
      } else {
        setError('Failed to generate image');
      }
    } catch (error) {
      console.error(error);
      setError('Error generating image');
    } finally {
      setLoading(false);
    }
  };



  const handleSubmit = async () => {
    // const tx = await pay(); // Call the pay function
    // if (tx) {
      
      await generateImage(); // Call the generateImage function if payment was successful
    // }
    setPrompt('');
  };


  return (
    <div>
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter your prompt"
      />
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? 'Generating...' : 'Generate Image'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {base64Image && (
        <div>
          <img src={base64Image} alt="Generated" />
          <UploadToIPFS base64Image={base64Image.split(",")[1]} onUploadSuccess={onUriSet} />
        </div>
      )}
    </div>
  );
};

export default ImageGenerator;
