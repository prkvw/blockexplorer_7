import { Alchemy, Network } from 'alchemy-sdk';
import { useEffect, useState } from 'react';

import './App.css';


const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.POLYGON_MUMBAI,
};

const alchemy = new Alchemy(settings);

function App() {
  const [blockNumber, setBlockNumber] = useState();

  useEffect(() => {
    async function getBlockNumber() {
      setBlockNumber(await alchemy.core.getBlockNumber());
    }

    getBlockNumber();
  });

  return <div className="App">Block Number: {blockNumber}</div>;
}

const main = async () => {
  //Assign the hash from the block number property above , then assign to a variable
  //let txHash = "0x92fc42b9642023f2ee2e88094df80ce87e15d91afa812fef383e6e5cd96e2ed3";

  //Response would return the block for provided hash
  let response = await alchemy.core.getBlockWithTransactions(txHash);

  //Logging the response to the console
  //console.log(response)
  //return <div className="App">Block: {Block}</div>;
//};

//main();
const gain = async () => {
  // This response fetches the balance of the given address in the paramter as of the provided block.
  let response = await alchemy.core.getBalance("fiyin.eth", "latest")

  //Logging the response to the console
  console.log(response)
  //return <div className="App">Block: {Block}</div>;
};
gain();

const pain = async () => {

  //Call the method
  let response = await alchemy.core.getGasPrice()

  //Logging the response to the console
  console.log(response)
};

pain();
}
//export default App;

// //header ScopeSevenScan Tab  Home - Tokens - FAQ - 
//search bar - placeholder = address/transaction hash/block
//autoGenerateBlockNumber

//getHash - getBlock
//page/address


//table
//getHash || Method || Block || Age || getAddress || getDestination || Value || gas Fee

//overview - getAddress
// getBalance