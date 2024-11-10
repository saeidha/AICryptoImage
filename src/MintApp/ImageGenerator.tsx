// ImageGenerator.tsx
import React, { useState } from "react";
import UploadToIPFS from "./UploadToIPFS"; // Ensure this is the correct import path
import { useAccount } from "wagmi";
import { simulateContract, writeContract } from "@wagmi/core";
import { abi } from "../generateImageAbi"; // Ensure that you import your contract ABI
import { config } from "../wagmi";
import Modal from "../Modal/Modal"; // Import the Modal component
import "./ImageGenerator.css";
import PromptForm from "./Promp"
interface ImageGeneratorProps {
  onUriSet: (uri: string) => void; // Prop to set the URI
}

const ImageGenerator: React.FC<ImageGeneratorProps> = ({ onUriSet }) => {
  const [prompt, setPrompt] = useState<string>("");
  const [base64Image, setBase64Image] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // State to control modal visibility

  // const { writeContract } = useWriteContract();
  const account = useAccount();

  const pay = async () => {
    if (!account.address) {
      console.error("No account connected");
      return;
    }
    const valueInWei = BigInt(0.0007 * 10 ** 18); // Convert 0.007 ETH to Wei
    try {
      // Simulate the contract call to check if it will succeed
      const { request } = await simulateContract(config, {
        abi,
        address: "0x69c4893Fbb213e7082180E619D03ccAF7808e52C",
        functionName: "pay",
        args: [], // Add any necessary arguments for the 'pay' function here
        value: valueInWei,
      });
      // Proceed to write the contract if simulation succeeded
      console.log("Simulation succeeded, proceeding with transaction.");

      const hash = await writeContract(config, request);
      // Optionally, you can wait for the transaction receipt if needed
      console.log("Transaction sent, hash:", hash);
      return true;
    } catch (error) {
      console.error("Error writing contract:", error);
      setError("Transaction failed");
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
    const tx = await pay(); // Call the pay function
    if (tx) {
      await generateImage(); // Call the generateImage function if payment was successful
    }
    setPrompt("");
  };

  return (
    <div className="centered-container">
      <PromptForm
        sendPrompt={handleSubmit}
        prompt={prompt}
        setPrompt={setPrompt}
      />
      <button onClick={() => setIsModalOpen(true)}>Open Image Generator</button>

      {loading ? "Generating..." : "Generate Image"}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {base64Image && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <div>
            <img src={base64Image} alt="Generated" className="image" />
            <UploadToIPFS
              base64Image={base64Image.split(",")[1]}
              onUploadSuccess={onUriSet}
            />
          </div>
        </Modal>
      )}

      {/* <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
      <div className="image-container">
      <img src='../temp.png' alt="Generated" />
      </div>
      
      <div className="button-container">
      <Stack spacing={2} direction="row">
      <UploadToIPFS base64Image={'base64Image'.split(",")[1]} onUploadSuccess={onUriSet} />
      <UploadToIPFS base64Image={'base64Image'.split(",")[1]} onUploadSuccess={onUriSet} />
      <UploadToIPFS base64Image={'base64Image'.split(",")[1]} onUploadSuccess={onUriSet} />
      </Stack>
    </div>
    
</Modal> */}
    </div>
  );
};

export default ImageGenerator;
