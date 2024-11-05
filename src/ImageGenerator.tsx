// ImageGenerator.tsx
import React, { useState } from 'react';
import UploadToIPFS from './UploadToIPFS'; // Ensure this is the correct import path

interface ImageGeneratorProps {
  onUriSet: (uri: string) => void; // Prop to set the URI
}

const ImageGenerator: React.FC<ImageGeneratorProps> = ({ onUriSet }) => {
  const [prompt, setPrompt] = useState<string>('');
  const [base64Image, setBase64Image] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const generateImage = async () => {
    setLoading(true);
    setError(null);
    setBase64Image(null);
    
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("x-freepik-api-key", import.meta.env.FREE_PICK_APIKey);

    const raw = JSON.stringify({
      "prompt": prompt,
      "negative_prompt": "b&w, earth, cartoon, ugly",
      "guidance_scale": 2,
      "seed": 42,
      "num_images": 1,
      "image": {
        "size": "square_1_1"
      },
      "styling": {
        "style": "digital-art",
        "color": "electric",
        "lightning": "warm",
        "framing": "portrait"
      }
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow" as RequestRedirect,
    };

    try {
      const response = await fetch("https://api.freepik.com/v1/ai/text-to-image", requestOptions);
      const result = await response.json();

      if (response.ok && result.data && result.data.length > 0) {
        setBase64Image(result.data[0].base64);
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

  return (
    <div>
      <input type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter your prompt"
      />
      <button onClick={generateImage} disabled={loading}>
        {loading ? 'Generating...' : 'Generate Image'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {base64Image && (
        <div>
          <img src={`data:image/png;base64,${base64Image}`} alt="Generated" />
          <UploadToIPFS base64Image={base64Image} onUploadSuccess={onUriSet} />
        </div>
      )}
    </div>
  );
};

export default ImageGenerator;