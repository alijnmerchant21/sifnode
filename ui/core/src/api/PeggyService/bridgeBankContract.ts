import Web3 from "web3";
import { AbiItem } from "web3-utils";
const bridgeBankABI: AbiItem[] = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "_token",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "_symbol",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "_beneficiary",
        type: "address",
      },
    ],
    name: "LogBridgeTokenMint",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "_from",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "_to",
        type: "bytes",
      },
      {
        indexed: false,
        internalType: "address",
        name: "_token",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "_symbol",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_value",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_nonce",
        type: "uint256",
      },
    ],
    name: "LogBurn",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "_from",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "_to",
        type: "bytes",
      },
      {
        indexed: false,
        internalType: "address",
        name: "_token",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "_symbol",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_value",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_nonce",
        type: "uint256",
      },
    ],
    name: "LogLock",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "_token",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "_symbol",
        type: "string",
      },
    ],
    name: "LogNewBridgeToken",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "_to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "_token",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "_symbol",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_value",
        type: "uint256",
      },
    ],
    name: "LogUnlock",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "_token",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "_value",
        type: "bool",
      },
    ],
    name: "LogWhiteListUpdate",
    type: "event",
  },
  {
    payable: true,
    stateMutability: "payable",
    type: "fallback",
  },
  {
    constant: true,
    inputs: [],
    name: "bridgeTokenCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "cosmosBridge",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "cosmosDepositNonce",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "string",
        name: "_symbol",
        type: "string",
      },
    ],
    name: "getBridgeToken",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "address",
        name: "_token",
        type: "address",
      },
    ],
    name: "getCosmosTokenInWhiteList",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "string",
        name: "_symbol",
        type: "string",
      },
    ],
    name: "getLockedFunds",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "string",
        name: "_symbol",
        type: "string",
      },
    ],
    name: "getLockedTokenAddress",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "address",
        name: "_token",
        type: "address",
      },
    ],
    name: "getTokenInEthWhiteList",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "lockBurnNonce",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "lockedFunds",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    name: "lockedTokenList",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "operator",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "oracle",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [],
    name: "initialize",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "_operatorAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "_oracleAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "_cosmosBridgeAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "_owner",
        type: "address",
      },
    ],
    name: "initialize",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "bytes",
        name: "_sifAddress",
        type: "bytes",
      },
    ],
    name: "verifySifPrefix",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "pure",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "string",
        name: "_symbol",
        type: "string",
      },
    ],
    name: "createNewBridgeToken",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "_contractAddress",
        type: "address",
      },
    ],
    name: "addExistingBridgeToken",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "_token",
        type: "address",
      },
      {
        internalType: "bool",
        name: "_inList",
        type: "bool",
      },
    ],
    name: "updateEthWhiteList",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "bytes",
        name: "_cosmosSender",
        type: "bytes",
      },
      {
        internalType: "address payable",
        name: "_intendedRecipient",
        type: "address",
      },
      {
        internalType: "address",
        name: "_bridgeTokenAddress",
        type: "address",
      },
      {
        internalType: "string",
        name: "_symbol",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "mintBridgeTokens",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "bytes",
        name: "_recipient",
        type: "bytes",
      },
      {
        internalType: "address",
        name: "_token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "burn",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "bytes",
        name: "_recipient",
        type: "bytes",
      },
      {
        internalType: "address",
        name: "_token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "lock",
    outputs: [],
    payable: true,
    stateMutability: "payable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address payable",
        name: "_recipient",
        type: "address",
      },
      {
        internalType: "string",
        name: "_symbol",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "unlock",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "bytes32",
        name: "_id",
        type: "bytes32",
      },
    ],
    name: "getCosmosDepositStatus",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "bytes32",
        name: "_id",
        type: "bytes32",
      },
    ],
    name: "viewCosmosDeposit",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
      {
        internalType: "address payable",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
];

export function getBridgeBankContract(web3: Web3, address: string) {
  return new web3.eth.Contract(bridgeBankABI, address);
}