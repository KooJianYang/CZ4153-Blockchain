import './App.css';
import React, { useState, useEffect } from "react";
import Web3 from 'web3';
import { Biconomy } from "@biconomy/mexa";

//Smart Contract For Token Meta-transactions
const contractAddress = "0x31a9f5203203af4FF71D56fb043B3ced4ee9eDb2"
const contractAbi = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "senderAddress",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "recipientAddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenValue",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "tokenReward",
				"type": "uint256"
			}
		],
		"name": "metaTransfer",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_token",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "token",
		"outputs": [
			{
				"internalType": "contract ERC20Permit",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

//Token used. Can be any token that inherits from ERC20Permit such as Dai Stablecoin and USD Coin on mainnet. 
const tokencontractAddress = "0x01b40844C0C72fa43f981d15F3A875B801eD7e5C"
const tokencontractAbi = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "DOMAIN_SEPARATOR",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "admin",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			}
		],
		"name": "allowance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "burn",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "decimals",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "subtractedValue",
				"type": "uint256"
			}
		],
		"name": "decreaseAllowance",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "addedValue",
				"type": "uint256"
			}
		],
		"name": "increaseAllowance",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "mint",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "nonces",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "deadline",
				"type": "uint256"
			},
			{
				"internalType": "uint8",
				"name": "v",
				"type": "uint8"
			},
			{
				"internalType": "bytes32",
				"name": "r",
				"type": "bytes32"
			},
			{
				"internalType": "bytes32",
				"name": "s",
				"type": "bytes32"
			}
		],
		"name": "permit",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]

const Permit = [
	{ name: "owner", type: "address" },
	{ name: "spender", type: "address" },
	{ name: "value", type: "uint256" },
	{ name: "nonce", type: "uint256" },
	{ name: "deadline", type: "uint256" }
];

const EIP712Domain = [
	{ name: "name", type: "string" },
	{ name: "version", type: "string" },
	{ name: "chainId", type: "uint256" },
	{ name: "verifyingContract", type: "address" },
];

const domainData = {
	name: "Dai Coin", //Name initialized in coin using constructor
	version: "1",		//Version used by ERC20Permit	
	chainId: "4", 	// Rinkeby
	verifyingContract: "0x01b40844C0C72fa43f981d15F3A875B801eD7e5C", //tokenAddress
};

let web3;
let contract;
let tokenContract;
let userAddress;
let balance;

function App() {

	const [recipientAddress, setRecipient] = useState("");
	const [tokenValue, setValue] = useState("");
	const [tokenReward, setReward] = useState("");

	useEffect(() => {

		//Check if Metamask is installed
		if (!window.ethereum) {
			console.log("Metamask is required to use this DApp")
			document.getElementById("UserAddress").textContent = "Metamask is required to use this DApp";
			document.getElementById("UserToken").textContent = "Metamask is required to use this DApp";
			return;
		}

		//Initialize Biconomy to use its relayer network. API Key required from Biconomy Dashboard. 
		const biconomy = new Biconomy(window.ethereum, { apiKey: "6yawG_gFB.71f09ba2-fb4d-4994-87c3-17521e977a52" });
		web3 = new Web3(biconomy);

		biconomy.onEvent(biconomy.READY, async () => {
			//Connect with wallet
			await window.ethereum.enable();

			//Initialize necessary contracts
			contract = new web3.eth.Contract(contractAbi, contractAddress);
			tokenContract = new web3.eth.Contract(tokencontractAbi, tokencontractAddress);

			updateUserDetails();

		}).onEvent(biconomy.ERROR, (error, message) => {
			// Handle error while initializing mexa
			console.log(error)
		});
	}, []);


	const onRecipientInput = event => {
		setRecipient(event.target.value);
	};

	const onValueInput = event => {
		setValue(event.target.value);
	};

	const onRewardInput = event => {
		setReward(event.target.value);
	};

	async function updateUserDetails() {
		//Display user's wallet address in dapp
		userAddress = window.ethereum.selectedAddress;
		console.log("Wallet Address:", userAddress);
		document.getElementById("UserAddress").textContent = "User Address: " + userAddress;

		//Display user's wallet token balance in dapp
		balance = await tokenContract.methods.balanceOf(userAddress).call();
		console.log("Wallet Balance:", balance);
		//As Javascript maximum precision for number of decimals is only 17 and our TDT token requires 18, we are forced to slice and concat
		//strings instead of simply dividing by power 10 to display accurate token balance user possess in their account. 
		let display_balance = (balance.slice(0, balance.length - 18)).concat(".", balance.slice(-18));
		document.getElementById("UserToken").textContent = "User Token (TDT): " + (display_balance);
	}

	function valueCorrection(value) {
		console.log("value=",value)
		if (value % 1 != 0) {
			let result = ( value * Math.pow(10, 18) ).toString();
			console.log("result=", result);
			return result;
		}
		else {
			value = value.toString();
			return value.concat("000000000000000000");
		}
	}

	async function loginMeta() {
		//Connect with wallet
		await window.ethereum.enable();
		updateUserDetails();
	}

	async function onButtonClickMeta() {

		if (recipientAddress == "" || tokenValue == "" || tokenReward == "") {	
			document.getElementById("Signature1").textContent = "There are unfilled inputs!";
			return NaN;
		}

		let tokenTotal = valueCorrection( parseFloat(tokenValue) + parseFloat(tokenReward) );
		let nonce = await tokenContract.methods.nonces(userAddress).call();		//to prevent replay attack
		let deadline = Date.now() + 900000;		//set deadline for permit to be 15 minutes

		let message = {};
		message.owner = userAddress;
		message.spender = contractAddress  //contract address
		message.value = tokenTotal;
		message.nonce = parseInt(nonce);
		message.deadline = deadline;

		const dataToSign = JSON.stringify({
			primaryType: "Permit",
			types: { EIP712Domain, Permit },
			domain: domainData,
			message: message
		});

		console.log("unsigned");
		document.getElementById("Signature1").textContent = "Signature 1:"
		document.getElementById("Signature2").textContent = "Signature 2:"
		document.getElementById("Signature3").textContent = "Signature 3:"

		web3.currentProvider.sendAsync(
			{
				method: "eth_signTypedData_v4",
				params: [userAddress, dataToSign],
				from: userAddress
			},

			async function (err, result) {

				if (err) {
					console.log("error")
					return console.error(err);
				}

				const signature = result.result.substring(2);
				const r = "0x" + signature.substring(0, 64);
				const s = "0x" + signature.substring(64, 128);
				const v = parseInt(signature.substring(128, 130), 16);
				
				console.log("signed1");
				document.getElementById("Signature1").textContent = "Signature 1: Signed!"
				document.getElementById("Signature2").textContent = "Signature 2: Permitting token transaction, please sign and wait..."

				await tokenContract.methods.permit(userAddress, contractAddress, tokenTotal, deadline, v, r, s).send({from: userAddress});

				let allowance = await tokenContract.methods.allowance(userAddress, contractAddress).call();
				console.log("Allowance:", allowance);

				console.log("signed2")
				document.getElementById("Signature2").textContent = "Signature 2: Signed! Token transaction permitted!"
				document.getElementById("Signature3").textContent = "Signature 3: Processing transaction, please sign and wait..."

				await contract.methods.metaTransfer(userAddress, recipientAddress, valueCorrection(tokenValue), valueCorrection(tokenReward)).send({from: userAddress});
				
				console.log("signed3")
				document.getElementById("Signature3").textContent = "Signature 3: Signed! Transaction completed!"
				
				updateUserDetails();
			}
		);


	}

	return (
		<div className="App">
			*Use this DApp only on Rinkeby Network.
			Project Done by:
			Daryl Neo,
			Koo Jian Yang,
			Yeoh Shun Bing
			<header className="App-header">
				<h1>Gasless Token Transfer</h1>
				<section className="main">
					<div className="mb-wrap mb-style-2">
						<button type="button" className="button" onClick={loginMeta}>Click to connect MetaMask</button>
						<h4 id="UserAddress">{"Loading..."} </h4>
						<h4 id="UserToken">{"Loading User Token..."} </h4>
						<h4 id="Message">{ } </h4>
					</div>
				</section>
				<section>
					<div className="submit-container">
						<div className="recipient-address">
							<input size="100"
								border-radius="15"
								type="text"
								placeholder="Enter Recipient Address"
								onChange={onRecipientInput}
								value={recipientAddress}
							/>
						</div>
						<div className="token-value">
							<input size="100"
								border-radius="15"
								type="text"
								placeholder="Enter Amount to Send"
								onChange={onValueInput}
								value={tokenValue}
							/>
						</div>
						<div className="reward-value">
							<input size="100"
								border-radius="15"
								type="text"
								placeholder="Enter Amount to give relayer"
								onChange={onRewardInput}
								value={tokenReward}
							/>
						</div>
						<button type="button" className="button" onClick={onButtonClickMeta}>Submit</button>
					</div>
					<h4 id="Signature1">{""} </h4>
					<h4 id="Signature2">{""} </h4>
					<h4 id="Signature3">{""} </h4>
				</section>
			</header>
		</div >
	);
}
export default App;