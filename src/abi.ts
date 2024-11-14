export const abi = [
  {
      "inputs": [
          {
              "internalType": "string",
              "name": "name",
              "type": "string"
          },
          {
              "internalType": "string",
              "name": "symbol",
              "type": "string"
          },
          {
              "internalType": "uint256",
              "name": "quantity",
              "type": "uint256"
          },
          {
              "internalType": "string",
              "name": "uri",
              "type": "string"
          },
          {
              "internalType": "string",
              "name": "description",
              "type": "string"
          }
      ],
      "name": "createNFTContract",
      "outputs": [
          {
              "internalType": "address",
              "name": "",
              "type": "address"
          }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "string",
              "name": "name",
              "type": "string"
          },
          {
              "internalType": "string",
              "name": "symbol",
              "type": "string"
          },
          {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
          },
          {
              "internalType": "string",
              "name": "description",
              "type": "string"
          },
          {
              "internalType": "string",
              "name": "uri",
              "type": "string"
          },
          {
              "internalType": "uint256",
              "name": "count",
              "type": "uint256"
          },
          {
              "internalType": "uint256",
              "name": "price",
              "type": "uint256"
          }
      ],
      "name": "sellNFT",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "address",
              "name": "nftAddress",
              "type": "address"
          },
          {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
          },
          {
              "internalType": "uint256",
              "name": "count",
              "type": "uint256"
          }
      ],
      "name": "buyNFT",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "address",
              "name": "nftAddress",
              "type": "address"
          }
      ],
      "name": "getBuyableNFTs",
      "outputs": [
          {
              "components": [
                  {
                      "internalType": "address",
                      "name": "nftAddress",
                      "type": "address"
                  },
                  {
                      "internalType": "uint256",
                      "name": "tokenId",
                      "type": "uint256"
                  },
                  {
                      "internalType": "string",
                      "name": "name",
                      "type": "string"
                  },
                  {
                      "internalType": "string",
                      "name": "description",
                      "type": "string"
                  },
                  {
                      "internalType": "string",
                      "name": "uri",
                      "type": "string"
                  },
                  {
                      "internalType": "uint256",
                      "name": "count",
                      "type": "uint256"
                  },
                  {
                      "internalType": "uint256",
                      "name": "price",
                      "type": "uint256"
                  },
                  {
                      "internalType": "address",
                      "name": "seller",
                      "type": "address"
                  }
              ],
              "internalType": "struct NFTFactory.NFTSale[]",
              "name": "",
              "type": "tuple[]"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [],
      "name": "getDeployedNFTContracts",
      "outputs": [
          {
              "internalType": "address[]",
              "name": "",
              "type": "address[]"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [],
      "name": "deployedNFTContracts",
      "outputs": [
          {
              "internalType": "address[]",
              "name": "",
              "type": "address[]"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "anonymous": false,
      "inputs": [
          {
              "indexed": true,
              "internalType": "address",
              "name": "nftContract",
              "type": "address"
          },
          {
              "indexed": false,
              "internalType": "string",
              "name": "name",
              "type": "string"
          },
          {
              "indexed": false,
              "internalType": "string",
              "name": "symbol",
              "type": "string"
          }
      ],
      "name": "NFTContractCreated",
      "type": "event"
  },
  {
      "anonymous": false,
      "inputs": [
          {
              "indexed": true,
              "internalType": "address",
              "name": "nftContract",
              "type": "address"
          },
          {
              "indexed": true,
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
          },
          {
              "indexed": true,
              "internalType": "address",
              "name": "buyer",
              "type": "address"
          },
          {
              "indexed": false,
              "internalType": "uint256",
              "name": "count",
              "type": "uint256"
          },
          {
              "indexed": false,
              "internalType": "uint256",
              "name": "price",
              "type": "uint256"
          }
      ],
      "name": "NFTSold",
      "type": "event"
  }
] as const;
