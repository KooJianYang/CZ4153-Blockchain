# Gasless Token Transfer
This project allows users to transfer tokens without possessing any ether by relying on third party relayers to call the contract on our behalf.

# Biconomy
We made used of [Biconomy](https://github.com/bcnmy/mexa) and its relayer network to enable gasless transaction. Our Dapp will take necessary inputs from users and required contract calls and convey it to relayers, letting them call the contract on our behalf. 

# Smart Contract
Our smart contracts are deployed using [Remix - Ethereum IDE](https://remix.ethereum.org/) onto the Rinkeby Testnet. Contract code can be found in contracts/GaslessTokenTransfer.sol. Note that a compatible ERC20 token address is required when deploying the smart contract. 

# ERC20 Tokens
Our Dapp works only with ERC20 tokens that inherits from ERC20Permit such as Dai Stablecoin and USD Coin on Ethereum Mainnet. This is because for a true gasless token transaction experience, users need to allow our smart contract to transfer token on users' behalf. In other words, users need to either "approve" or "permit" our smart contract to transfer their token. Since "approve" requires the user to call the token contract itself, it requires ether and is therefore not truely considered "gasless". Hence, "permit" is a necessary function for our Dapp to work. 

# ChickenRiceToken (CRT)
To test out our Dapp, an ERC20 token of our own is deployed on Rinkeby Testnet. This token inherits from ERC20Permit and fully functions with our Dapp. Full token contract codes can be found in contracts/ChickenRiceToken.sol. Take note that the Dapp as it is only works with ChickenRiceToken. Should you be using another ERC20 token that inherits permit, you need to redeploy the smart contract with your chosen token address and change the three constants "tokencontractAddress", "tokencontractAbi" and "domainData" in src/App.js

Token: [ChickenRiceToken](https://rinkeby.etherscan.io/token/0x782963da2d963631bc75b2940bbcab6b2ff3975b)

Token Address: 0x782963dA2D963631bC75b2940bbCAB6B2ff3975B

# Create React App
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

In the project directory, run:

### `yarn start`
or
### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

# Dapp Usage Instructions
1. Once the Dapp is started and you are at the screen titled "Gasless Token Transfer", connect your Metamask wallet (Rinkeby Test Network) to the site and ensure that User Address and User Token reflects your account accurately. Refresh the page if necessary to see if the page is loading your account info properly.  
2. Enter the three inputs of Recipient Address, Amount to Send and Amount to give relayer. 
3. Click submit button after verifying inputs are correct. 
4. Check signature message details and sign.
5. Sign message hash to be sent to relayer.
6. Wait while transaction is process. It can take up to 1-2 minutes.
7. Once transaction is completed, token balance is updated and you can verify it on your Metamask wallet. 
