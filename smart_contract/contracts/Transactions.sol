// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

contract Transactions {

    uint256 transactionCounter ;

    event Transfer(address from , address reciever , uint amount , string message ,  uint256 timestamp , string keyword );
    
    
    struct TransferStruct{
        address sender ;
        address reciever;
        uint amount;
        string message;
        uint256 timestamp;
        string keyword;
    }

    TransferStruct[] transactions;

    function addToBlockchain(address payable reciever , uint amount , string memory message , string memory keyword) public {
        transactionCounter += 1;
        transactions.push(TransferStruct(msg.sender , reciever , amount , message ,block.timestamp , keyword));
        emit Transfer(msg.sender , reciever, amount, message, block.timestamp, keyword);
    }

    function getAllTransactions() public view returns (TransferStruct[] memory)  {
        //  return transactions <3
        return transactions;
    }
    
    function getTransactionsCount() public view returns (uint256 ) {
        // return counts of transactions
        return transactionCounter;
    }
    }
