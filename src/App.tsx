import React, { useState } from 'react';
import { useAccount, useConnect, useDisconnect, useWriteContract } from 'wagmi';
import { abi } from './abi'; // Ensure that you import your contract ABI

const YourComponent: React.FC = () => {
  const account = useAccount();
  const { connectors, connect, status, error } = useConnect();
  const { disconnect } = useDisconnect();
  const { writeContract } = useWriteContract();

  // Replace with your contract address
  const contractAddress = '0x52E7D909Fcb558FcfC508D14F969D021F11dC92f';

  // Define the minting parameters
  const uri = 'ipfs://bafybeihzltmlvfqh7mrvvpbclk3tuenaqchz5xapmw46ttx5amw4psw4mi';
  const name = 'Your NFT Name';
  const description = 'Your NFT Description';

  // State to store the number of NFTs to mint
  const [quantity, setQuantity] = useState<number>(1);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Check if the account is connected
    if (!account.address) {
      console.error('No account connected');
      return;
    }

    // Call the writeContract function
    try {
      const tx = await writeContract({
        address: contractAddress,
        abi: abi,
        functionName: 'mintNFT', // Ensure this function can handle multiple mints
        args: [account.address, BigInt(quantity), uri, name, description], // Pass quantity as an argument
      });

      console.log('Transaction:', tx);
    } catch (error) {
      console.error('Error writing contract:', error);
    }
  }

  return (
    <div>
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

      {account.status === 'connected' && (
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
  );
};

export default YourComponent;