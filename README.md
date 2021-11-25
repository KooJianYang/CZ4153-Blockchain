# Gasless Token Transfer
This project allows users to transfer tokens without possessing any ether by relying on third party relayers to call the contract on our behalf.

# Biconomy
We made used of Biconomy SDK (Mexa) and its relayer network to enable gasless transaction. Our Dapp will take necessary inputs from users and required contract calls and convey it to relayers, letting them call the contract on our behalf. 

# ERC20 Tokens
Our Dapp works only with ERC20 tokens that inherits from ERC20Permit such as Dai Stablecoin and USD Coin on Ethereum Mainnet. This is because for a true gasless token transaction experience, users need to allow our smart contract to transfer token on users' behalf. In other words, users need to either "approve" or "permit" our smart contract to transfer their token. Since "approve" requires the user to call the token contract itself, it requires ether and is therefore not truely considered "gasless". Hence, "permit" is a necessary function for our Dapp to work. 

# TryDaiToken (TDT)
To test out our Dapp, an ERC20 token of our own is deployed on Rinkeby Testnet. This token inherits from ERC20Permit and fully functions with our Dapp. Full token contract codes are inside contracts folder.

Token Address: 0x01b40844C0C72fa43f981d15F3A875B801eD7e5C

# Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

In the project directory, run:

### `yarn start`
or
### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
