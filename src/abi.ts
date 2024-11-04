export const abi = [
    {
        "inputs": [
          { "internalType": "address", "name": "recipient", "type": "address" },
          { "internalType": "address", "name": "quantity", "type": "uint256" },
          { "internalType": "string", "name": "uri", "type": "string" },
          { "internalType": "string", "name": "name", "type": "string" },
          { "internalType": "string", "name": "description", "type": "string" }
        ],
        "name": "mintNFT",
        "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
        "stateMutability": "nonpayable",
        "type": "function"
      }
] as const