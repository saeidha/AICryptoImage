// MintApp.tsx
import React, { useState } from 'react';
import { useAccount, useConnect, useDisconnect, useWriteContract } from 'wagmi';
import { abi } from '../abi'; // Ensure that you import your contract ABI
import ImageGenerator from './ImageGenerator';
import TabBar from '../Tabbar/TabBar';
import './MintApp.css'
const MintApp: React.FC = () => {
  const account = useAccount();
  const { connectors, connect, status, error } = useConnect();
  const { disconnect } = useDisconnect();
  const { writeContract } = useWriteContract();

  const contractAddress = import.meta.env.VITE_CONTRACT_ADDREESS;
  const [uri, setUri] = useState<string | null>(null);
  const name = 'Your NFT Name';
  const description = 'Your NFT Description';
  const [quantity, setQuantity] = useState<number>(1);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!uri) {
      console.error('No URI set');
      return;
    }

    if (!account.address) {
      console.error('No account connected');
      return;
    }

    try {
      const tx = await writeContract({
        address: contractAddress,
        abi: abi,
        functionName: 'mintNFTs',
        args: [account.address, BigInt(quantity), uri, name, description],
      });

      console.log('Transaction:', tx);
    } catch (error) {
      console.error('Error writing contract:', error);
    }
  }

  return (
    <div className="base-container">
      <TabBar />
      <div className="container">
      <span>The Home</span>
      <ImageGenerator onUriSet={setUri} />

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
      </div>
    </div>
  );
};

export default MintApp;