import { Alchemy, Network } from "alchemy-sdk";
import { useEffect, useState } from "react";

import "./App.css";

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.POLYGON_MUMBAI,
};

const alchemy = new Alchemy(settings);

function App() {
  const [blockNumber, setBlockNumber] = useState();
  const [inputBlockNumber, setInputBlockNumber] = useState();
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    async function getBlockNumber() {
      setBlockNumber(await alchemy.core.getBlockNumber());
    }

    getBlockNumber();
    blockNumber && _getBlockWithTransaction(blockNumber);
  });

  const _getBlockWithTransaction = async (_blockNumber) => {
    if (_blockNumber > blockNumber) {
      alert("You can't get transactions for this");
    } else {
      const response = await alchemy.core.getBlockWithTransactions(
        _blockNumber
      );
      console.log("transactions in block", response.transactions[0]);
      setTransactions(() => response.transactions);
    }
  };

  const getDetails=async(_txnhash)=>{
    console.log('getting deatails for :',_txnhash)
    const response= await alchemy.core.getTransactionReceipt(_txnhash)
    console.log('transaction details:',response);

  }

  if (!blockNumber) {
    return (
      <div style={{display:'flex',justifyContent:'center',alignItems:'center',placeItems:'center'}}>
        <p>Loading.....</p>
      </div>
    );
  }
  return (
    <div className="App">
      <h1>Welcome To Web</h1>
      <p>Block Number: {blockNumber}</p>
      <p>Enter a <strong>block number</strong> to get transactions:</p>
      <div className="search-container">
        <input
          type="text"
          value={inputBlockNumber}
          placeholder="Enter block number"
          onChange={(e) => setInputBlockNumber(e.target.value)}
        />
        <button className="search-button" onClick={() => _getBlockWithTransaction(inputBlockNumber)}>
          Transactions
        </button>
      </div>
      <h4>Transactions in recent Block</h4>
      <div className="table-container">
        <div className="transaction-heading">
          <div>From</div>
          <div>To</div>
          <div>Value</div>
          <div>BlockNumber</div>
          <div>Action</div>
        </div>
        {transactions.length > 0 ? (
          transactions.map((transaction, index) => (
            <div
              className={
                index % 2 == 0
                  ? "transaction-list even-background"
                  : "transaction-list"
              }
            >
              <div className="transaction-list-text">{transaction.from}</div>
              <div className="transaction-list-text">{transaction.to}</div>
              <div className="transaction-list-text">
                {transaction.value.toString()}
              </div>
              <div className="transaction-list-text">
                {transaction.blockNumber}
              </div>
              <div>
                <button className="list-button" onClick={()=>getDetails(transaction.hash)}>Details</button>
              </div>
            </div>
          ))
        ) : (
          <p>No transactions for this block</p>
        )}
      </div>
    </div>
  );
}

const gain = async () => {
  // This response fetches the balance of the given address in the paramter as of the provided block.
  let response = await alchemy.core.getBalance("fiyin.eth", "latest");

  //Logging the response to the console
  console.log(response);
  //return <div className="App">Block: {Block}</div>;
};

const pain = async () => {
  //Call the method
  let response = await alchemy.core.getGasPrice();
  //Logging the response to the console
  console.log(response);
};

const main = async () => {
  //Assign the hash from the block number property above , then assign to a variable
  //let txHash = "0x92fc42b9642023f2ee2e88094df80ce87e15d91afa812fef383e6e5cd96e2ed3";
  //Response would return the block for provided hash
  // let response = await alchemy.core.getBlockWithTransactions(txHash);
  //Logging the response to the console
  //console.log(response)
  //return <div className="App">Block: {Block}</div>;
  //};
  //main();
};
export default App;

// //header ScopeSevenScan Tab  Home - Tokens - FAQ -
//search bar - placeholder = address/transaction hash/block
//autoGenerateBlockNumber

//getHash - getBlock
//page/address

//table
//getHash || Method || Block || Age || getAddress || getDestination || Value || gas Fee

//overview - getAddress
// getBalance
