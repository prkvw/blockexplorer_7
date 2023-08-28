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
  const [transactionDetails, setTransactionDetails] = useState();
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    async function getBlockNumber() {
      setBlockNumber(await alchemy.core.getBlockNumber());
    }
    console.log('Latest block number:',blockNumber);
    getBlockNumber();
    blockNumber && _getBlockWithTransaction(blockNumber);
  });

  const _getBlockWithTransaction = async (_blockNumber) => {
    console.log('getting block with transaction');
    if (_blockNumber > blockNumber || _blockNumber === undefined ) {
      alert("You can't get transactions for this");
    } else {
      try {
        console.log('_blocknumber:',_blockNumber);
      const response = await alchemy.core.getBlockWithTransactions(
        _blockNumber
      );
      console.log("transactions in block", response);
      setTransactions(() => response.transactions);
      } catch (error) {
        alert(error);
      }
      
    }
  };

  const getDetails = async (_txnhash) => {
    console.log("getting deatails for :", _txnhash);
    const response = await alchemy.core.getTransactionReceipt(_txnhash);
    if (response != null) {
      setTransactionDetails(response);
      setShowDetails(true);
      console.log("transaction details:", response.to);
      setTimeout(() => { 
        setShowDetails(false);
        setTransactionDetails();
      }, 9000);
    } else {
      alert("error occured getting details");
    }
  };
  //const _getNFTMetadat = async () => {};
  //const _getNFTFloorPrice = async () => {};

  const handleChange=(e)=>{
    console.log(e.target.value);
    setInputBlockNumber(e.target.value)
  }

  if (!blockNumber) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          placeItems: "center",
        }}
      >
        <p>Loading.....</p>
      </div>
    );
  }
  return (
    <div className="App">
      <h1>Welcome To Web3 Explorer</h1>
      <p>Block Number: {blockNumber}</p>
      <p>
        Enter a <strong>block number</strong> to get transactions:
      </p>
      <div className="search-container">
        <input
          type="text"
          value={inputBlockNumber}
          placeholder="Enter block number"
          onChange={handleChange}
        />
        <button
          className="search-button"
          onClick={() => _getBlockWithTransaction(inputBlockNumber)}
        >
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
            <div key={index}
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
                <button
                  className="list-button"
                  onClick={() => getDetails(transaction.hash)}
                >
                  Details
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No transactions for this block</p>
        )}
      </div>
      {showDetails===true && (
        <div
          style={{
            margin:'5px',
            padding:'5px',
            position: "absolute",
            border: "black 1px solid",
            zIndex: "9999999",
            top: "0px",
            display:'flex',
            flexDirection:'column',
          justifyContent:'left',
          backgroundColor:'white',
          borderRadius:'10px',
          textAlign:'left',
          boxShadow:'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px',
          }}
        >
          <strong>Details</strong>
          <p className="details-list"><strong>To: </strong>{transactionDetails.to}</p>
          <p className="details-list"><strong>From: </strong>{transactionDetails.from}</p>
          <p className="details-list"><strong>Contract Adress: </strong>{transactionDetails.contractAddress}</p>
          <p className="details-list"><strong>Transaction Index: </strong>{transactionDetails.transactionIndex}</p>
          <p className="details-list"><strong>gasUsed: </strong>{transactionDetails.gasUsed.toString()}</p>
          {/* <p><strong>Logs Bloom</strong>{transactionDetails.logsBloom}</p> */}
          <p className="details-list"><strong>Block hash: </strong>{transactionDetails.blockHash}</p>
          <p className="details-list"><strong>transactionHash: </strong>{transactionDetails.transactionHash}</p>
          <p className="details-list"><strong>logs: </strong>{transactionDetails.logs.length}</p>
          <p className="details-list"><strong>Block Number: </strong>{transactionDetails.blockNumber}</p>
          <p className="details-list"><strong>confirmations: </strong>{transactionDetails.confirmations}</p>
          <p className="details-list"><strong>cumulativeGasUsed: </strong>{transactionDetails.cumulativeGasUsed.toString()}</p>
          <p className="details-list"><strong>Effective Gas Price: </strong>{transactionDetails.effectiveGasPrice.toString()}</p>
          <p className="details-list"><strong>Status: </strong>{transactionDetails.status}</p>
          <p className="details-list"><strong>type: </strong>{transactionDetails.type}</p>
          <p className="details-list"><strong>byzantium: </strong>{transactionDetails.byzantium}</p>
        </div>
      )}
    </div>
  );
}



//const main = async () => {
  //Assign the hash from the block number property above , then assign to a variable
  //let txHash = "0x92fc42b9642023f2ee2e88094df80ce87e15d91afa812fef383e6e5cd96e2ed3";
  //Response would return the block for provided hash
  // let response = await alchemy.core.getBlockWithTransactions(txHash);
  //Logging the response to the console
  //console.log(response)
  //return <div className="App">Block: {Block}</div>;
  //};
  //main();
//};
export default App;

// //header ScopeSevenScan Tab  Home - Tokens - FAQ -
//search bar - placeholder = address/transaction hash/block
//autoGenerateBlockNumber


//table
//getHash || Method || Block || Age || getAddress || getDestination || Value || gas Fee

//overview - getAddress
// getBalance
